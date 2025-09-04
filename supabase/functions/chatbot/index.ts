import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabase = createClient(
  'https://cpopaqguywwaqprrvony.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNwb3BhcWd1eXd3YXFwcnJ2b255Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY0ODkyMDUsImV4cCI6MjA3MjA2NTIwNX0.PsCw2vuHS3wHTVhRrtB30Txuu6Js1tdjLNw3wBCzCvE'
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
      .or(`content.ilike.%${keywords[0] || 'noscite'}%,title.ilike.%${keywords[0] || 'noscite'}%`)
      .limit(5);

    if (knowledgeError) {
      console.error('Error fetching knowledge base:', knowledgeError);
    }

    // Cerca anche nei documenti caricati
    const { data: documentsData, error: documentsError } = await supabase
      .from('documents')
      .select('title, description, file_url, category')
      .or(`title.ilike.%${keywords[0] || ''}%,description.ilike.%${keywords[0] || ''}%`)
      .limit(3);

    if (documentsError) {
      console.error('Error fetching documents:', documentsError);
    }

    // Costruisci il contesto dal knowledge base
    const knowledgeContext = knowledgeData?.map(item => 
      `FONTE SITO WEB - ${item.title ? item.title + ': ' : ''}${item.content}`
    ).join('\n\n') || '';

    // Costruisci il contesto dai documenti
    const documentsContext = documentsData?.map(item => 
      `FONTE DOCUMENTO - "${item.title}": ${item.description || 'Documento disponibile'} (Categoria: ${item.category || 'Non specificata'})`
    ).join('\n\n') || '';

    // Combina tutti i contesti
    const context = [knowledgeContext, documentsContext].filter(c => c.length > 0).join('\n\n---\n\n');

    console.log('Retrieved context length:', context.length);

    // Chiama OpenAI con il contesto
    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `Sei un assistente AI per Noscite, un'azienda che offre servizi di trasformazione digitale e formazione sull'intelligenza artificiale. 
            
            Usa le seguenti informazioni per rispondere alle domande sui servizi e sui contenuti di Noscite:
            
            ${context}
            
             ISTRUZIONI IMPORTANTI:
             - Fornisci sempre risposte dettagliate e specifiche basate sulle informazioni fornite
             - IMPORTANTE: Quando usi informazioni da documenti, indica SEMPRE chiaramente il nome del documento come fonte
             - Quando usi informazioni dal sito web, puoi menzionare "dalle informazioni sul sito Noscite"
             - Formato per citare documenti: "Come indicato nel documento '[Nome Documento]'..." 
             - Quando parli di percorsi formativi, menziona sempre di visitare la pagina /percorsi per maggiori dettagli
             - Quando parli di servizi, rimanda alla pagina /servizi 
             - Per informazioni aziendali, rimanda a /chi-siamo
             - Per contatti, rimanda a /contatti
             - Per documenti specifici, suggerisci di consultare la sezione risorse su /risorse
             - Includi sempre link utili nelle tue risposte quando appropriato
             - Solo DOPO aver fornito informazioni specifiche, suggerisci di contattare Noscite per dettagli personalizzati
             
             Rispondi sempre in modo professionale, dettagliato e utile, citando sempre le fonti.
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
      throw new Error(`OpenAI API error: ${openaiResponse.status}`);
    }

    const responseData = await openaiResponse.json();
    const aiResponse = responseData.choices[0].message.content;

    console.log('Generated AI response length:', aiResponse.length);

    // Salva la conversazione
    const { data: existingConversation } = await supabase
      .from('chat_conversations')
      .select('messages')
      .eq('session_id', sessionId)
      .maybeSingle();

    const messages = existingConversation?.messages || [];
    messages.push(
      { role: 'user', content: message, timestamp: new Date().toISOString() },
      { role: 'assistant', content: aiResponse, timestamp: new Date().toISOString() }
    );

    await supabase
      .from('chat_conversations')
      .upsert({
        session_id: sessionId,
        messages: messages
      });

    return new Response(JSON.stringify({ 
      response: aiResponse,
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