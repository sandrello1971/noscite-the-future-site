import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

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

// Function to generate embeddings
async function generateEmbedding(text: string): Promise<number[]> {
  const response = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'text-embedding-ada-002',
      input: text,
    }),
  });

  if (!response.ok) {
    const errorData = await response.text();
    console.error('OpenAI Embedding API error:', errorData);
    throw new Error(`OpenAI Embedding API error: ${response.status}`);
  }

  const data = await response.json();
  return data.data[0].embedding;
}

// Page contents to sync
const pageContents = [
  {
    title: "Atheneum - Percorsi Formativi",
    content: `L'Atheneum di Noscite è lo spazio dove sapere e pratica si incontrano. Offriamo percorsi di apprendimento strutturati per accompagnare le organizzazioni nella comprensione del digitale e dei suoi impatti.

Percorsi formativi disponibili:

1. INITIUM - Fondamenta AI Operativa
Durata: 20 ore (5 moduli × 4h)
Certificazione: Certified AI Productivity User
Obiettivo: Acquisire competenze pratiche per usare ChatGPT e Copilot 365 nelle attività quotidiane e introdurre il concetto di Second Brain.
Moduli:
- Intro AI e Prompt Engineering: AI conversazionale e prompt efficaci
- AI per il Business: Applicazioni in PMI e automazioni
- Copilot 365: Integrazione e produttività
- Funzionalità Avanzate: Workflow e automazioni Teams
- Second Brain Intro: Knowledge management e metodo CODE

2. STRUCTURA - Second Brain Aziendale
Durata: 24 ore (6 moduli × 4h)
Certificazione: Certified Second Brain Implementer
Obiettivo: Creare un sistema scalabile di gestione della conoscenza con Obsidian, integrato con AI e processi aziendali.
Moduli:
- Metodo CODE: Capture, Organize, Distill, Express
- Setup Vault Aziendale: Creazione e struttura base
- Template Avanzati: Dashboard e organizzazione
- AI & Automazioni: Plugin AI e workflow automatici
- Collaborazione: Ruoli, permessi e governance
- Certificazione: Piano implementazione

3. COMMUNITAS - Collaborazione Intelligente
Durata: 16 ore (4 moduli × 4h)
Certificazione: Certified Collaboration Hub Manager
Obiettivo: Costruire un hub di project management collaborativo integrando Second Brain, AI e strumenti di gestione progetti.
Moduli:
- Mapping Process: Analisi e mappatura workflow
- Setup Workflow: Configurazione automazioni
- Integration & AI: Connessioni e AI assistants
- Team Adoption: Change management e training

4. TRANSFORMA - Trasformazione Completa
Durata: Su misura (analisi + implementazione)
Certificazione: Ecosistema Digitale Noscite
Obiettivo: Creare un ecosistema digitale integrato e personalizzato con roadmap, ROI tracking e governance strutturata.

Vantaggi:
- Meno tool, più efficienza
- Crescita del know-how digitale
- Collaborazione potenziata
- Roadmap personalizzata
- Certificazione finale

Per maggiori informazioni sui percorsi formativi, visita la pagina Atheneum su noscite.it/atheneum`,
    sourceId: "atheneum-page",
    contentType: "website_content"
  },
  {
    title: "Profilum Societatis - Chi Siamo",
    content: `Noscite è una società di consulenza specializzata nella trasformazione digitale delle PMI italiane. Il nostro approccio unisce competenze tecnologiche, visione strategica e attenzione alle persone.

Mission:
Accompagnare le piccole e medie imprese italiane nel loro percorso di trasformazione digitale, fornendo consulenza strategica, formazione e supporto operativo.

Vision:
Creare un ecosistema di PMI digitalmente mature, capaci di competere sui mercati globali mantenendo i propri valori e la propria identità.

Valori:
- Conoscenza come fondamento (Noscite te ipsum - Conosci te stesso)
- Approccio umano-centrico
- Eccellenza tecnica
- Trasparenza e integrità
- Innovazione sostenibile

Metodologia:
Il Metodo Noscite si basa su tre pilastri:
1. Analisi e Comprensione (Diagnostica)
2. Strategia e Pianificazione (Architectura)
3. Implementazione e Supporto (Executio)

Team:
Un gruppo multidisciplinare di esperti in tecnologia, strategia digitale, change management e formazione.

Per saperne di più sulla nostra azienda, visita la pagina Profilum Societatis su noscite.it/profilum-societatis`,
    sourceId: "profilum-societatis-page",
    contentType: "website_content"
  },
  {
    title: "Servizi Noscite",
    content: `Noscite offre servizi completi per la trasformazione digitale delle PMI:

CONSULENZA STRATEGICA:
- Digital Assessment e Gap Analysis
- Roadmap di trasformazione digitale
- Technology Advisory
- Change Management

FORMAZIONE:
- Percorsi formativi certificati (Atheneum)
- Workshop tematici
- Coaching individuale e di team
- Training on-the-job

IMPLEMENTAZIONE:
- Setup Second Brain aziendali
- Implementazione AI tools
- Integrazione sistemi
- Automazioni e workflow

SUPPORTO CONTINUO:
- Help desk tecnico
- Aggiornamenti e maintenance
- Community di pratica
- Consulenza on-demand

METODOLOGIA:
Il Metodo Noscite prevede:
1. FASE 1 (30 giorni): Diagnostica e Quick Wins
2. FASE 2 (60 giorni): Implementazione Core
3. FASE 3 (90 giorni): Scale e Governance

Per informazioni sui servizi, visita noscite.it/servizi`,
    sourceId: "servizi-page",
    contentType: "website_content"
  },
  {
    title: "Contatti Noscite",
    content: `Per contattare Noscite:

Email: info@noscite.it
Form di contatto disponibile su: noscite.it/contatti

Siamo disponibili per:
- Consulenze iniziali gratuite
- Preventivi personalizzati
- Informazioni sui percorsi formativi
- Partnership e collaborazioni

Orari:
Lun-Ven: 9:00-18:00

Per richiedere informazioni o fissare un appuntamento, compila il form di contatto sul sito o invia una email.`,
    sourceId: "contatti-page",
    contentType: "website_content"
  }
];

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

    console.log('Starting knowledge base sync...');

    const results = [];
    const errors = [];

    // Fetch published blog posts
    const { data: blogPosts, error: blogError } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('published', true);

    if (blogError) {
      console.error('Error fetching blog posts:', blogError);
    }

    // Add blog posts to pageContents
    const blogContents = (blogPosts || []).map(post => {
      // Remove HTML tags from content for better embedding
      const cleanContent = post.content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
      const excerpt = post.excerpt || cleanContent.substring(0, 500);
      
      return {
        title: `Blog: ${post.title}`,
        content: `Titolo: ${post.title}
        
Categoria: ${post.category || 'Generale'}

${post.excerpt ? `Estratto: ${post.excerpt}` : ''}

Contenuto completo:
${cleanContent}

${post.tags && post.tags.length > 0 ? `Tag: ${post.tags.join(', ')}` : ''}

Questo articolo è disponibile su noscite.it/blog/${post.slug}`,
        sourceId: `blog-post-${post.id}`,
        contentType: 'blog_post'
      };
    });

    const allContents = [...pageContents, ...blogContents];
    console.log(`Processing ${allContents.length} items (${pageContents.length} pages + ${blogContents.length} blog posts)`);


    // Process all content (pages + blog posts)
    for (const page of allContents) {
      try {
        console.log(`Processing: ${page.title}`);

        // Generate embedding
        const embedding = await generateEmbedding(page.content);

        // Upsert to knowledge base
        const { data, error } = await supabase
          .from('knowledge_base')
          .upsert({
            content: page.content,
            content_type: page.contentType,
            source_id: page.sourceId,
            title: page.title,
            embeddings: embedding
          }, {
            onConflict: 'source_id'
          })
          .select();

        if (error) {
          console.error(`Error saving ${page.title}:`, error);
          errors.push({ title: page.title, error: error.message });
        } else {
          console.log(`Successfully saved: ${page.title}`);
          results.push({ title: page.title, id: data[0]?.id });
        }

        // Small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 500));

      } catch (error) {
        console.error(`Error processing ${page.title}:`, error);
        errors.push({ title: page.title, error: error.message });
      }
    }

    console.log(`Sync completed. Success: ${results.length}, Errors: ${errors.length}`);

    return new Response(JSON.stringify({
      success: true,
      synced: results.length,
      total: allContents.length,
      pages: pageContents.length,
      blogPosts: blogContents.length,
      results,
      errors: errors.length > 0 ? errors : undefined
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in sync-knowledge-base function:', error);
    return new Response(JSON.stringify({
      error: 'Errore durante la sincronizzazione',
      details: error.message
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});