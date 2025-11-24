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
      systemPrompt = 'Sei un copywriter esperto di blog in italiano per un sito di consulenza aziendale. Dato un argomento, genera un articolo completo ma conciso (massimo ~800 parole) e rispondi SOLO in questo formato: TITOLO: [titolo su una riga]\n\nESTRATTO: [2-3 frasi riassuntive]\n\nSLUG: [slug URL-friendly minuscolo-con-trattini, opzionale]\n\nCONTENUTO_HTML: [contenuto completo in HTML usando <p>, <h2>, <ul>, <li>, <strong>, <em>...] Senza testo prima o dopo queste sezioni e senza markdown.';
    }

    const body: any = {
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt }
      ],
      max_tokens: type === 'content' || type === 'complete' ? 1024 : 200,
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

      const extractSection = (label: string): string => {
        const regex = new RegExp(`${label}:\\s*([\\s\\S]*?)(?=^[A-Z_]+:|$)`, 'mi');
        const match = text.match(regex);
        return match?.[1]?.trim() ?? '';
      };

      const title = extractSection('TITOLO');
      const excerpt = extractSection('ESTRATTO');
      let slug = extractSection('SLUG');
      const contentHtml = extractSection('CONTENUTO_HTML');

      if (!title || !contentHtml) {
        console.error('AI article missing required fields:', { title, contentHtml, text });
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
