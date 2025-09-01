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
    console.log('Initializing knowledge base...');

    const pageContents = [
      {
        title: "Servizi Noscite",
        content: `
        AI Academy: Percorso formativo completo di 68 ore diviso in 3 corsi sequenziali per PMI che vogliono trasformare la produttività attraverso AI, knowledge management e strumenti di collaborazione digitale.
        
        AI Launchpad: Il pacchetto perfetto per partire subito con l'Intelligenza Artificiale nella tua attività. In poche settimane scoprirai cosa può fare l'AI per te e imparerai a usarla sul campo, con risultati tangibili e immediati.
        
        AI Sprint: Pacchetto progettuale per sviluppare un caso d'uso AI ad alto impatto. Ti accompagniamo dall'analisi alla realizzazione, formando il tuo team per garantire che la soluzione venga adottata e generi valore.
        
        AI Evolution Partner: Programma annuale che ti affianca nella trasformazione digitale completa della tua azienda. Uniamo formazione continua, implementazione e governance strategica, grazie alla presenza del Fractional CIO.
        
        Fractional CIO: Il tuo Chief Information Officer a tempo parziale: un esperto che ti aiuta a prendere le decisioni giuste, pianificare investimenti e garantire che la tecnologia lavori davvero per il tuo business.
        `,
        sourceId: "servizi",
        contentType: "page"
      },
      {
        title: "Percorsi Formativi",
        content: `
        Digital Productivity Transformation per PMI - 68 ore totali divise in 3 corsi:
        
        Corso 1: Intelligenza Artificiale Operativa (20 ore) - Competenze fondamentali per usare ChatGPT e Copilot 365, con certificazione Certified AI Productivity User. Riduzione 40-60% tempo stesura documenti.
        
        Corso 2: Second Brain in Azienda (24 ore) - Sistema scalabile di knowledge management con metodologia CODE e tool Obsidian. Riduzione 70% tempo ricerca informazioni.
        
        Corso 3: Collaborazione Intelligente (24 ore) - Microsoft Teams, Trello, Asana, Slack per migliorare comunicazione e produttività. Riduzione 30-50% tempo coordinamento team.
        
        ROI medio +300% in 12 mesi. Target: PMI 5-50 dipendenti. Modalità: In presenza o online.
        `,
        sourceId: "percorsi",
        contentType: "page"
      },
      {
        title: "Chi Siamo - Noscite",
        content: `
        Noscite è il tuo partner per l'evoluzione digitale. Trasformiamo le aziende attraverso l'intelligenza artificiale e la formazione digitale, dall'analisi iniziale all'implementazione e governance continua.
        
        Vision: Democratizzare l'accesso alle tecnologie AI per le PMI italiane.
        Mission: Fornire formazione, strumenti e consulenza per accelerare la trasformazione digitale.
        
        Statistiche: 200+ aziende servite, 95% tasso di successo, 300% ROI medio.
        `,
        sourceId: "chi-siamo",
        contentType: "page"
      }
    ];

    let processedCount = 0;

    for (const pageContent of pageContents) {
      // Genera embeddings
      const embeddingResponse = await fetch('https://api.openai.com/v1/embeddings', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'text-embedding-ada-002',
          input: pageContent.content,
        }),
      });

      if (!embeddingResponse.ok) {
        console.error('OpenAI Embedding API error for', pageContent.title);
        continue;
      }

      const embeddingData = await embeddingResponse.json();
      const embedding = embeddingData.data[0].embedding;

      // Salva nel knowledge base
      const { error } = await supabase
        .from('knowledge_base')
        .upsert({
          content: pageContent.content.trim(),
          content_type: pageContent.contentType,
          source_id: pageContent.sourceId,
          title: pageContent.title,
          embeddings: embedding
        });

      if (error) {
        console.error('Error saving to knowledge base:', pageContent.title, error);
      } else {
        processedCount++;
        console.log('Processed:', pageContent.title);
      }
    }

    return new Response(JSON.stringify({
      success: true,
      message: `Knowledge base initialized with ${processedCount} pages`
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error initializing knowledge base:', error);
    return new Response(JSON.stringify({
      error: 'Failed to initialize knowledge base',
      details: error.message
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});