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

    // Cerca nel knowledge base usando similarità testuale (semplificata)
    const { data: knowledgeData, error: knowledgeError } = await supabase
      .from('knowledge_base')
      .select('content, title')
      .limit(5);

    if (knowledgeError) {
      console.error('Error fetching knowledge base:', knowledgeError);
    }

    // Costruisci il contesto dal knowledge base
    const context = knowledgeData?.map(item => 
      `${item.title ? item.title + ': ' : ''}${item.content}`
    ).join('\n\n') || '';

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
            
            Rispondi sempre in modo professionale e utile. Se non trovi informazioni specifiche nel contesto fornito, suggerisci di contattare Noscite per maggiori dettagli.`
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
      .single();

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