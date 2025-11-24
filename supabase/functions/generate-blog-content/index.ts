import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompt, type } = await req.json();
    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');

    if (!OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY is not configured');
    }

    console.log('Generating blog content:', { type, promptLength: prompt?.length });

    let systemPrompt = '';
    if (type === 'title') {
      systemPrompt = 'You are a creative blog title generator. Generate engaging, SEO-friendly titles. Return only the title, no quotes or extra text.';
    } else if (type === 'excerpt') {
      systemPrompt = 'You are a blog excerpt writer. Create compelling 2-3 sentence excerpts that summarize the content and encourage reading. Return only the excerpt.';
    } else if (type === 'content') {
      systemPrompt = 'You are a professional blog content writer. Write engaging, well-structured blog posts with proper formatting. Use headings, paragraphs, and maintain a professional yet approachable tone. Return only the content in HTML format with proper tags (h2, p, ul, li, etc.).';
    } else if (type === 'complete') {
      systemPrompt = `Sei un copywriter esperto per Noscite, società di consulenza aziendale che integra strategia, tecnologia e creatività.

VALORI NOSCITE da trasmettere negli articoli:
- Unicitas: personalizzazione assoluta per ogni cliente
- Innovatio: ricerca continua delle migliori tecnologie emergenti
- Societas: partnership durature basate su fiducia e crescita reciproca
- Veritas: la verità come fondamento di ogni relazione
- Fiducia: base di ogni collaborazione

METODO NOSCITE (da citare quando pertinente):
Auditio → Analytica → Co-creatio → Implementatio → Evolutio

TONO DI VOCE:
- Professionale ma accessibile
- Focalizzato su casi concreti e benefici pratici
- Evita gergo tecnico eccessivo
- Enfatizza la trasformazione delle sfide in opportunità

COMPITO:
Genera un articolo completo e approfondito (minimo 1500 parole) sull'argomento richiesto.

FORMATO DI RISPOSTA (rispetta ESATTAMENTE questa struttura):

TITOLO: [titolo accattivante su una riga]

ESTRATTO: [2-3 frasi che riassumono e invogliano alla lettura]

SLUG: [slug-url-friendly-minuscolo-con-trattini]

CONTENUTO_HTML:
[Qui scrivi il contenuto completo dell'articolo in HTML valido. Usa:
- <h2> per i sottotitoli delle sezioni principali
- <p> per ogni paragrafo
- <ul> e <li> per elenchi puntati
- <ol> e <li> per elenchi numerati
- <strong> per enfatizzare concetti chiave
- <em> per citazioni o termini tecnici

L'articolo DEVE essere strutturato con:
- Introduzione (2-3 paragrafi)
- Almeno 4-5 sezioni principali con H2
- Ogni sezione con 2-4 paragrafi ricchi di contenuto
- Conclusione con call-to-action
- Totale minimo: 1500 parole]

Non aggiungere nulla prima di "TITOLO:" o dopo la fine del contenuto HTML.`;
    }

    const body: any = {
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt }
      ],
      max_tokens: type === 'content' || type === 'complete' ? 3000 : 200,
      temperature: 0.7,
    };

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error:', response.status, errorText);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();

    console.log('Content generated successfully');

    if (type === 'complete') {
      const fullText = (data.choices?.[0]?.message?.content as string | undefined) ?? '';
      const text = fullText.trim();

      if (!text) {
        console.error('AI response did not contain article data:', JSON.stringify(data));
        throw new Error('AI response did not contain article data');
      }

      console.log('AI raw response length:', text.length);

      const extractSection = (label: string, isLastSection: boolean = false): string => {
        if (isLastSection) {
          // Per CONTENUTO_HTML, prendi tutto fino alla fine
          const regex = new RegExp(`${label}:\\s*([\\s\\S]*)$`, 'i');
          const match = text.match(regex);
          return match?.[1]?.trim() ?? '';
        } else {
          // Per le altre sezioni, prendi fino alla prossima sezione con etichetta maiuscola
          const regex = new RegExp(`${label}:\\s*([\\s\\S]*?)(?=\\n[A-Z_]+:|$)`, 'i');
          const match = text.match(regex);
          return match?.[1]?.trim() ?? '';
        }
      };

      const title = extractSection('TITOLO', false);
      const excerpt = extractSection('ESTRATTO', false);
      let slug = extractSection('SLUG', false);
      const contentHtml = extractSection('CONTENUTO_HTML', true);

      console.log('Extracted sections:', { 
        titleLength: title.length, 
        excerptLength: excerpt.length, 
        slugLength: slug.length, 
        contentLength: contentHtml.length 
      });

      if (!title || !contentHtml) {
        console.error('AI article missing required fields:', { 
          hasTitle: !!title, 
          hasContent: !!contentHtml,
          titlePreview: title.substring(0, 100),
          contentPreview: contentHtml.substring(0, 200)
        });
        throw new Error('AI response did not contain a valid article object');
      }

      if (!slug && title) {
        const slugSource = title
          .toLowerCase()
          .normalize('NFD')
          .replace(/\p{Diacritic}/gu, '');

        slug = slugSource
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '');
      }

      const article = {
        title,
        excerpt,
        slug,
        content: contentHtml,
      };

      return new Response(JSON.stringify(article), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const rawContent = data.choices[0].message.content as string;

    return new Response(JSON.stringify({ content: rawContent }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generate-blog-content:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
