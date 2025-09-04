import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') || '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
);

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, sessionId } = await req.json();
    
    if (!message || !sessionId) {
      return new Response(JSON.stringify({ error: 'Message and sessionId are required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log('Processing chat message:', message);

    // Cerca nel knowledge base con filtro per keyword rilevanti
    const keywords = message.toLowerCase().split(' ').filter(word => word.length > 3);
    
    const { data: knowledgeData, error: knowledgeError } = await supabase
      .from('knowledge_base')
      .select('content, title, source_id')
      .or('content.ilike.%' + (keywords[0] || 'noscite') + '%,title.ilike.%' + (keywords[0] || 'noscite') + '%')
      .limit(5);

    if (knowledgeError) {
      console.error('Error fetching knowledge base:', knowledgeError);
    }

    // Cerca anche nei documenti caricati
    const { data: documentsData, error: documentsError } = await supabase
      .from('documents')
      .select('title, description, file_url, category')
      .or('title.ilike.%' + (keywords[0] || '') + '%,description.ilike.%' + (keywords[0] || '') + '%')
      .limit(3);

    if (documentsError) {
      console.error('Error fetching documents:', documentsError);
    }

    // Costruisci il contesto dal knowledge base
    const knowledgeContext = knowledgeData?.map(item => 
      'FONTE SITO WEB - ' + (item.title ? item.title + ': ' : '') + item.content
    ).join('\n\n') || '';

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
            "- Quando parli di percorsi formativi, menziona sempre di visitare la pagina /percorsi per maggiori dettagli\n" +
            "- Quando parli di servizi, rimanda alla pagina /servizi\n" +
            "- Per informazioni aziendali, rimanda a /chi-siamo\n" +
            "- Per contatti, rimanda a /contatti\n" +
            "- Per documenti specifici, suggerisci di consultare la sezione risorse su /risorse\n" +
            "- Includi sempre link utili nelle tue risposte quando appropriato\n" +
            "- Solo DOPO aver fornito informazioni specifiche, suggerisci di contattare Noscite per dettagli personalizzati\n\n" +
            "Rispondi sempre in modo professionale, dettagliato e utile, citando sempre le fonti."
          },
          {
            role: 'user',
            content: message
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

    // Salva la conversazione
    const { data: existingConversation } = await supabase
      .from('chat_conversations')
      .select('messages')
      .eq('session_id', sessionId)
      .maybeSingle();

    const messages = existingConversation?.messages || [];
    messages.push(
      { role: 'user', content: message, timestamp: new Date().toISOString() },
      { role: 'assistant', content: finalResponse, timestamp: new Date().toISOString() }
    );

    await supabase
      .from('chat_conversations')
      .upsert({
        session_id: sessionId,
        messages: messages
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