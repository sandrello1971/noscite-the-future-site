import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";
import { validateEmail, validateTextInput, logSecurityEvent } from "../_shared/security-utils.ts";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

// Service role client for rate limiting
const supabaseServiceRole = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// HTML escape function for security
function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Rate limiting function
async function checkContactRateLimit(identifier: string, type: 'ip' | 'email'): Promise<boolean> {
  const windowStart = new Date();
  windowStart.setHours(windowStart.getHours() - 1); // 1-hour window
  
  const limit = type === 'ip' ? 10 : 3; // 10 per hour per IP, 3 per hour per email

  const { data: existingLimit, error } = await supabaseServiceRole
    .from('api_rate_limits')
    .select('*')
    .eq('identifier', `${type}_${identifier}`)
    .eq('endpoint', 'send-contact-email')
    .gte('window_start', windowStart.toISOString())
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Rate limit check error:', error);
    return true; // Allow on error
  }

  if (existingLimit) {
    if (existingLimit.request_count >= limit) {
      return false; // Rate limited
    }
    
    await supabaseServiceRole
      .from('api_rate_limits')
      .update({ 
        request_count: existingLimit.request_count + 1,
        updated_at: new Date().toISOString()
      })
      .eq('id', existingLimit.id);
  } else {
    await supabaseServiceRole
      .from('api_rate_limits')
      .insert({
        identifier: `${type}_${identifier}`,
        endpoint: 'send-contact-email',
        window_start: windowStart.toISOString(),
        request_count: 1
      });
  }
  
  return true;
}

interface ContactEmailRequest {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const userAgent = req.headers.get("user-agent") || "unknown";
    const forwardedFor = req.headers.get("x-forwarded-for") || "unknown";
    
    console.log('Contact email request from:', forwardedFor, 'User-Agent:', userAgent);

    const { name, email, phone, company, message }: ContactEmailRequest = await req.json();

    // Input validation using security utils
    const nameValidation = validateTextInput(name, 2, 100, "Nome");
    if (!nameValidation.isValid) {
      logSecurityEvent('INVALID_CONTACT_NAME', { error: nameValidation.error }, req);
      throw new Error(nameValidation.error);
    }

    const emailValidation = validateEmail(email);
    if (!emailValidation.isValid) {
      logSecurityEvent('INVALID_CONTACT_EMAIL', { error: emailValidation.error, email }, req);
      throw new Error(emailValidation.error);
    }

    const messageValidation = validateTextInput(message, 10, 5000, "Messaggio");
    if (!messageValidation.isValid) {
      logSecurityEvent('INVALID_CONTACT_MESSAGE', { error: messageValidation.error }, req);
      throw new Error(messageValidation.error);
    }

    // Rate limiting checks
    const ipAllowed = await checkContactRateLimit(forwardedFor, 'ip');
    const emailAllowed = await checkContactRateLimit(emailValidation.sanitized, 'email');
    
    if (!ipAllowed || !emailAllowed) {
      logSecurityEvent('CONTACT_RATE_LIMIT_EXCEEDED', { 
        ip: forwardedFor, 
        email: emailValidation.sanitized,
        ipAllowed,
        emailAllowed 
      }, req);
      return new Response(
        JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
        { 
          status: 429, 
          headers: { "Content-Type": "application/json", ...corsHeaders } 
        }
      );
    }

    // Require reCAPTCHA verification for security
    const recaptchaToken = req.headers.get("x-recaptcha-token");
    const recaptchaSecret = Deno.env.get("GOOGLE_RECAPTCHA_SECRET");
    
    if (!recaptchaToken || !recaptchaSecret) {
      logSecurityEvent('MISSING_RECAPTCHA', { hasToken: !!recaptchaToken, hasSecret: !!recaptchaSecret }, req);
      throw new Error("reCAPTCHA verification required");
    }

    console.log('Verifying reCAPTCHA token');
    const recaptchaResponse = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${recaptchaSecret}&response=${recaptchaToken}&remoteip=${forwardedFor}`,
    });
    
    const recaptchaData = await recaptchaResponse.json();
    if (!recaptchaData.success) {
      logSecurityEvent('RECAPTCHA_FAILED', { recaptchaData }, req);
      console.error('reCAPTCHA verification failed:', recaptchaData);
      throw new Error("Verifica reCAPTCHA fallita");
    }

    console.log('Sending contact email from:', emailValidation.sanitized, 'to: notitiae@noscite.it');

    // Escape all user input for HTML safety
    const escapedName = escapeHtml(nameValidation.sanitized);
    const escapedEmail = escapeHtml(emailValidation.sanitized);
    const escapedPhone = phone ? escapeHtml(phone.trim()) : null;
    const escapedCompany = company ? escapeHtml(company.trim()) : null;
    const escapedMessage = escapeHtml(messageValidation.sanitized).replace(/\n/g, '<br>');

    // Send email to notitiae@noscite.it
    const emailResponse = await resend.emails.send({
      from: "Noscite Contact Form <onboarding@resend.dev>",
      to: ["notitiae@noscite.it"],
      subject: `Nuova richiesta di contatto da ${escapedName}`,
      html: `
        <h2>Nuova richiesta di contatto</h2>
        <p><strong>Nome:</strong> ${escapedName}</p>
        <p><strong>Email:</strong> ${escapedEmail}</p>
        ${escapedPhone ? `<p><strong>Telefono:</strong> ${escapedPhone}</p>` : ''}
        ${escapedCompany ? `<p><strong>Azienda:</strong> ${escapedCompany}</p>` : ''}
        <h3>Messaggio:</h3>
        <p>${escapedMessage}</p>
        
        <hr>
        <p><small>Questa email è stata inviata dal form di contatto del sito Noscite.</small></p>
        <p><small>IP: ${forwardedFor}</small></p>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);