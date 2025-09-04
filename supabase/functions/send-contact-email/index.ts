import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

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
    const { name, email, phone, company, message }: ContactEmailRequest = await req.json();

    console.log('Sending contact email from:', email, 'to: notitiae@noscite.it');

    // Send email to notitiae@noscite.it
    const emailResponse = await resend.emails.send({
      from: "Noscite Contact Form <onboarding@resend.dev>",
      to: ["notitiae@noscite.it"],
      subject: `Nuova richiesta di contatto da ${name}`,
      html: `
        <h2>Nuova richiesta di contatto</h2>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Telefono:</strong> ${phone}</p>` : ''}
        ${company ? `<p><strong>Azienda:</strong> ${company}</p>` : ''}
        <h3>Messaggio:</h3>
        <p>${message.replace(/\n/g, '<br>')}</p>
        
        <hr>
        <p><small>Questa email è stata inviata dal form di contatto del sito Noscite.</small></p>
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