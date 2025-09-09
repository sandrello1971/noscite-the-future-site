import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';
import { validateTextInput, logSecurityEvent } from "../_shared/security-utils.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Regular client for knowledge base access
const supabase = createClient(
  Deno.env.get('SUPABASE_URL') || '',
  Deno.env.get('SUPABASE_ANON_KEY') || ''
);

// Service role client for secure operations and rate limiting
const supabaseServiceRole = createClient(
  Deno.env.get('SUPABASE_URL') || '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
);

// Rate limiting function using service role
async function checkRateLimit(identifier: string, endpoint: string): Promise<boolean> {
  const windowStart = new Date();
  windowStart.setHours(windowStart.getHours() - 1); // 1-hour window

  const { data: existingLimit, error } = await supabaseServiceRole
    .from('api_rate_limits')
    .select('*')
    .eq('identifier', identifier)
    .eq('endpoint', endpoint)
    .gte('window_start', windowStart.toISOString())
    .single();

  if (error && error.code !== 'PGRST116') { // Not found is OK
    console.error('Rate limit check error:', error);
    return true; // Allow on error to avoid blocking legitimate users
  }

  if (existingLimit) {
    if (existingLimit.request_count >= 20) { // 20 requests per hour
      return false; // Rate limited
    }
    
    // Update count
    await supabaseServiceRole
      .from('api_rate_limits')
      .update({ 
        request_count: existingLimit.request_count + 1,
        updated_at: new Date().toISOString()
      })
      .eq('id', existingLimit.id);
  } else {
    // Create new rate limit record
    await supabaseServiceRole
      .from('api_rate_limits')
      .insert({
        identifier,
        endpoint,
        window_start: windowStart.toISOString(),
        request_count: 1
      });
  }
  
  return true;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get client info for rate limiting and security logging
    const forwardedFor = req.headers.get("x-forwarded-for") || "unknown";
    const userAgent = req.headers.get("user-agent") || "unknown";
    
    const { message, sessionId } = await req.json();
    
    // Enhanced input validation using security utils
    const messageValidation = validateTextInput(message, 1, 2000, "Message");
    if (!messageValidation.isValid) {
      logSecurityEvent('INVALID_CHAT_MESSAGE', { error: messageValidation.error }, req);
      return new Response(JSON.stringify({ error: messageValidation.error }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // SessionId validation
    if (!sessionId || typeof sessionId !== 'string' || sessionId.length > 100 || !/^[a-zA-Z0-9-_]+$/.test(sessionId)) {
      logSecurityEvent('INVALID_SESSION_ID', { sessionId: sessionId?.substring(0, 8) }, req);
      return new Response(JSON.stringify({ error: 'Invalid sessionId format' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Rate limiting check
    const rateLimitIdentifier = `${forwardedFor}_${sessionId}`;
    const isAllowed = await checkRateLimit(rateLimitIdentifier, 'chatbot');
    if (!isAllowed) {
      logSecurityEvent('CHAT_RATE_LIMIT_EXCEEDED', { identifier: rateLimitIdentifier }, req);
      return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
        status: 429,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log(`Chatbot request from IP: ${forwardedFor}, UA: ${userAgent}, Session: ${sessionId.slice(0, 8)}...`);

    // Use sanitized message
    const sanitizedMessage = messageValidation.sanitized;
    console.log('Processing chat message for session:', sessionId);

    // Cerca nel knowledge base con filtro per keyword rilevanti
    const keywords = sanitizedMessage.toLowerCase().split(' ').filter(word => word.length > 3);
    
    // 1) Ricerca semantica su knowledge_base tramite embeddings
    let semanticMatches: any[] = [];
    try {
      const embedRes = await fetch('https://api.openai.com/v1/embeddings', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + Deno.env.get('OPENAI_API_KEY'),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'text-embedding-3-small',
          input: sanitizedMessage
        }),
      });
      const embedJson = await embedRes.json();
      const embedding = embedJson?.data?.[0]?.embedding || null;

      if (embedding) {
        const { data: matches, error: matchError } = await supabase
          .rpc('match_knowledge_base', {
            query_embedding: embedding,
            match_threshold: 0.4,
            match_count: 6
          });
        if (matchError) {
          console.error('Semantic match error:', matchError);
        } else {
          semanticMatches = matches || [];
        }
      }
    } catch (e) {
      console.error('Embedding search failed:', e);
    }

    // 2) Fallback: ricerca testuale
    let knowledgeData: any[] = [];
    if (semanticMatches.length === 0) {
      const { data: kbFallback, error: knowledgeError } = await supabase
        .from('knowledge_base')
        .select('content, title, source_id')
        .or('content.ilike.%' + (keywords[0] || 'noscite') + '%,title.ilike.%' + (keywords[0] || 'noscite') + '%')
        .limit(6);
      if (knowledgeError) {
        console.error('Error fetching knowledge base:', knowledgeError);
      } else {
        knowledgeData = kbFallback || [];
      }
    }

    // 3) Skip documents query for security - use only knowledge_base
    const documentsData: any[] = [];

    // 4) Costruisci il contesto completo
    const knowledgeContext = semanticMatches.length > 0 
      ? semanticMatches.map(item => 
          'FONTE SITO WEB - ' + (item.title ? item.title + ': ' : '') + item.content
        ).join('\n\n')
      : (knowledgeData || []).map(item => 
          'FONTE SITO WEB - ' + (item.title ? item.title + ': ' : '') + item.content
        ).join('\n\n');

    // Costruisci il contesto dai documenti
    const documentsContext = documentsData?.map(item => 
      'FONTE DOCUMENTO - "' + item.title + '": ' + (item.description || 'Documento disponibile') + ' (Categoria: ' + (item.category || 'Non specificata') + ')'
    ).join('\n\n') || '';

    // Combina tutti i contesti
    const context = [knowledgeContext, documentsContext].filter(c => c.length > 0).join('\n\n---\n\n');

    console.log('Retrieved context length:', context.length);

    // Chiama OpenAI con il contesto
    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + Deno.env.get('OPENAI_API_KEY'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: "Sei un assistente AI per Noscite, un'azienda che offre servizi di trasformazione digitale e formazione sull'intelligenza artificiale. \n\n" +
            "Usa le seguenti informazioni per rispondere alle domande sui servizi e sui contenuti di Noscite:\n\n" +
            context + "\n\n" +
            "ISTRUZIONI IMPORTANTI:\n" +
            "- Fornisci sempre risposte dettagliate e specifiche basate sulle informazioni fornite\n" +
            "- IMPORTANTE: Quando usi informazioni da documenti, indica SEMPRE chiaramente il nome del documento come fonte\n" +
            "- Quando usi informazioni dal sito web, puoi menzionare \"dalle informazioni sul sito Noscite\"\n" +
            "- Formato per citare documenti: \"Come indicato nel documento '[Nome Documento]'...\"\n" +
            "- Quando parli di percorsi formativi, menziona sempre di visitare [Percorsi Noscite](https://noscite.it/percorsi) per maggiori dettagli\n" +
            "- Quando parli di servizi, rimanda a [Servizi Noscite](https://noscite.it/servizi)\n" +
            "- Per informazioni aziendali, rimanda a [Chi Siamo](https://noscite.it/chi-siamo)\n" +
            "- Per contatti, rimanda a [Contatti Noscite](https://noscite.it/contatti)\n" +
            "- Per documenti specifici, suggerisci di consultare [Risorse Noscite](https://noscite.it/risorse)\n" +
            "- USA SEMPRE link completi HTTPS con formato markdown [Testo](https://noscite.it/pagina)\n" +
            "- Non usare MAI link relativi come /percorsi ma sempre https://noscite.it/percorsi\n" +
            "- Includi sempre link utili nelle tue risposte quando appropriato\n" +
            "- Solo DOPO aver fornito informazioni specifiche, suggerisci di contattare Noscite per dettagli personalizzati\n\n" +
            "Rispondi sempre in modo professionale, dettagliato e utile, citando sempre le fonti."
          },
          {
            role: 'user',
            content: sanitizedMessage
          }
        ],
        max_tokens: 1000,
        temperature: 0.7,
      }),
    });

    if (!openaiResponse.ok) {
      const errorData = await openaiResponse.text();
      console.error('OpenAI API error:', errorData);
      throw new Error('OpenAI API error: ' + openaiResponse.status);
    }

    const responseData = await openaiResponse.json();
    const aiResponse = responseData.choices[0].message.content;

    // Aggiungi fonti dai documenti trovati
    let finalResponse = aiResponse;
    if (documentsData && documentsData.length > 0) {
      const sources = documentsData.map(d => '- Documento: ' + d.title + (d.file_url ? ' (' + d.file_url + ')' : '')).join('\n');
      finalResponse = aiResponse + '\n\nFonti:\n' + sources;
    }

    console.log('Generated AI response length:', finalResponse.length);

    // Manage conversation using service role for security
    const { data: existingConversation } = await supabaseServiceRole
      .from('chat_conversations')
      .select('messages')
      .eq('session_id', sessionId)
      .maybeSingle();

    const messages = existingConversation?.messages || [];
    messages.push(
      { role: 'user', content: sanitizedMessage, timestamp: new Date().toISOString() },
      { role: 'assistant', content: finalResponse, timestamp: new Date().toISOString() }
    );

    await supabaseServiceRole
      .from('chat_conversations')
      .upsert({
        session_id: sessionId,
        messages: messages,
        user_id: null // Anonymous conversation
      });

    return new Response(JSON.stringify({ 
      response: finalResponse,
      sessionId: sessionId 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in chatbot function:', error);
    return new Response(JSON.stringify({ 
      error: 'Errore interno del server',
      details: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});