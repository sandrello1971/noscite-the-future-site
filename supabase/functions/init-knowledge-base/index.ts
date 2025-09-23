import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Initialize Supabase client with request auth header
const getSupabaseClient = (req: Request) => {
  const authHeader = req.headers.get('Authorization');
  return createClient(
    Deno.env.get('SUPABASE_URL') || '',
    Deno.env.get('SUPABASE_ANON_KEY') || '',
    {
      global: {
        headers: authHeader ? { Authorization: authHeader } : {},
      },
    }
  );
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = getSupabaseClient(req);

    // Verify user is admin
    const { data: userRole, error: roleError } = await supabase.rpc('get_current_user_role');
    if (roleError || userRole !== 'admin') {
      return new Response(JSON.stringify({ error: 'Unauthorized - Admin access required' }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

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
        PERCORSI FORMATIVI NOSCITE - Digital Productivity
        Target: PMI 5-50 dipendenti | Modalità: In presenza o online | Max 12 partecipanti per corso | Totale: 68 ore

        1. INITIUM – FONDAMENTA AI OPERATIVA
        Durata: 20 ore (5 moduli)
        Certificazione: Certified AI Productivity User
        Descrizione: Acquisire competenze pratiche per usare ChatGPT e Copilot 365 nelle attività quotidiane e introdurre il concetto di Second Brain
        
        Moduli principali:
        • Intro AI e Prompt Engineering Base
        • AI per il Business Quotidiano  
        • Copilot 365 – Produttività immediata
        • Copilot 365 – Funzionalità Avanzate
        • Introduzione al Second Brain
        
        Benefici: Riduzione 40-60% tempo stesura documenti, struttura prompt efficaci, integrazione AI in Word/Excel/Outlook
        
        2. STRUCTURA – SECOND BRAIN AZIENDALE
        Durata: 24 ore (6 moduli)
        Prerequisito: Initium completato
        Certificazione: Certified Second Brain Implementer
        Descrizione: Creare sistema scalabile di gestione conoscenza con Obsidian, integrato con AI e processi aziendali
        
        Moduli principali:
        • Metodo CODE e fondamenti
        • Setup Vault Aziendale
        • Template e Organizzazione Avanzata
        • AI & Automazioni
        • Collaborazione e Governance
        • Certificazione e Piano d'Azione
        
        Benefici: Riduzione 70% tempo ricerca informazioni, tassonomie intelligenti, plugin AI per Obsidian
        
        3. COMMUNITAS – COLLABORAZIONE INTELLIGENTE
        Durata: 24 ore (6 moduli)
        Prerequisito: Initium (consigliato Structura)
        Certificazione: Certified Collaboration Hub User
        Descrizione: Sistema di collaborazione e project management integrato, basato su Obsidian come Collaboration Hub
        
        Moduli principali:
        • Fondamenti Collaborazione e Governance
        • Obsidian come Collaboration Hub
        • Gestione Progetti con Bases
        • Task Management e Automazioni
        • Comunicazione e Integrazione Esterna
        • Certificazione e Roadmap
        
        Benefici: Riduzione tool-fatigue, dashboard team con Dataview, task management integrato
        
        IMPLEMENTAZIONE:
        
        Approccio Sequenziale (consigliato):
        • Mese 1: Initium (Fondamenta AI)
        • Mese 3-4: Structura (Second Brain)  
        • Mese 6-7: Communitas (Collaborazione)
        
        Approccio Accelerato:
        • Initium+Structura consecutivi per team tech-savvy
        • Communitas dopo consolidamento
        
        ROI MISURABILI:
        • Tempo risposta email: -50%
        • Preparazione riunioni: -60%
        • Ricerca informazioni: -70%
        • Qualità documentazione: +80%
        • Soddisfazione team: +40%
        • Produttività generale: +25-35%
        
        Per maggiori dettagli visita /percorsi o contatta Noscite per una valutazione gratuita.
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