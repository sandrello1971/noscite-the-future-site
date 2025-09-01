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
    const { content, contentType, sourceId, title } = await req.json();
    
    if (!content || !contentType) {
      return new Response(JSON.stringify({ error: 'Content and contentType are required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log('Processing content for knowledge base:', { contentType, sourceId, title });

    // Genera embeddings usando OpenAI
    const embeddingResponse = await fetch('https://api.openai.com/v1/embeddings', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'text-embedding-ada-002',
        input: content,
      }),
    });

    if (!embeddingResponse.ok) {
      const errorData = await embeddingResponse.text();
      console.error('OpenAI Embedding API error:', errorData);
      throw new Error(`OpenAI Embedding API error: ${embeddingResponse.status}`);
    }

    const embeddingData = await embeddingResponse.json();
    const embedding = embeddingData.data[0].embedding;

    console.log('Generated embedding with dimensions:', embedding.length);

    // Salva nel knowledge base
    const { data, error } = await supabase
      .from('knowledge_base')
      .upsert({
        content,
        content_type: contentType,
        source_id: sourceId,
        title,
        embeddings: embedding
      })
      .select();

    if (error) {
      console.error('Error saving to knowledge base:', error);
      throw new Error(`Database error: ${error.message}`);
    }

    console.log('Successfully saved to knowledge base:', data[0]?.id);

    return new Response(JSON.stringify({ 
      success: true,
      id: data[0]?.id 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in process-content function:', error);
    return new Response(JSON.stringify({ 
      error: 'Errore interno del server',
      details: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});