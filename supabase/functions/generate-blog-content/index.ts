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
      systemPrompt = 'You are an expert Italian blog writer. Given a topic, create a complete blog article for a business consultancy site. Respond ONLY with compact JSON using this exact structure and no markdown or explanations: {"title":"...","excerpt":"...","content":"..."}. The "content" field must be valid HTML using <p>, <h2>, <ul>, <li>, <strong>, <em>, and similar tags.';
    }

    const body: any = {
      model: 'gpt-5-nano-2025-08-07',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt }
      ],
      max_completion_tokens: type === 'content' || type === 'complete' ? 2000 : 200,
    };

    if (type === 'complete') {
      body.tools = [
        {
          type: 'function',
          function: {
            name: 'create_article',
            description: 'Genera un articolo di blog completo per il sito di consulenza aziendale.',
            parameters: {
              type: 'object',
              properties: {
                title: {
                  type: 'string',
                  description: "Titolo dell'articolo in italiano, accattivante e SEO-friendly.",
                },
                excerpt: {
                  type: 'string',
                  description: "Estratto di 2-3 frasi che riassume e invoglia alla lettura.",
                },
                content: {
                  type: 'string',
                  description: 'Contenuto HTML completo (<p>, <h2>, <ul>, <li>, <strong>, <em>, ...).',
                },
                slug: {
                  type: 'string',
                  description: "Slug URL-friendly basato sul titolo, minuscolo con trattini.",
                },
              },
              required: ['title', 'excerpt', 'content'],
              additionalProperties: false,
            },
          },
        },
      ];
      body.tool_choice = { type: 'function', function: { name: 'create_article' } };
    }

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
      const choice = data.choices?.[0];

      let article: any = null;

      // 1) Prova a usare i tool calls se il modello li ha usati
      const toolCall = choice?.message?.tool_calls?.[0];
      if (toolCall?.function?.arguments) {
        const args = toolCall.function.arguments as string;
        try {
          article = JSON.parse(args);
        } catch (e) {
          console.error('Failed to parse tool arguments JSON:', e, args);
          throw new Error('Failed to parse AI tool response as JSON');
        }
      } else {
        // 2) Fallback: prova a parsare il contenuto del messaggio come JSON "sporco"
        let jsonText = (choice?.message?.content as string | undefined)?.trim() ?? '';

        if (!jsonText) {
          console.error('AI did not return content or tool call for article generation:', JSON.stringify(data));
          throw new Error('AI response did not contain article data');
        }

        // Rimuovi eventuali code fences ```
        if (jsonText.startsWith('```')) {
          const firstNewline = jsonText.indexOf('\n');
          if (firstNewline !== -1) {
            jsonText = jsonText.slice(firstNewline + 1);
          }
          if (jsonText.endsWith('```')) {
            jsonText = jsonText.slice(0, -3);
          }
          jsonText = jsonText.trim();
        }

        // Estrai solo l'oggetto JSON più esterno
        const firstBrace = jsonText.indexOf('{');
        const lastBrace = jsonText.lastIndexOf('}');
        if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
          jsonText = jsonText.slice(firstBrace, lastBrace + 1);
        }

        try {
          article = JSON.parse(jsonText);
        } catch (e) {
          console.error('Failed to parse article JSON from message content:', e, jsonText);
          throw new Error('Failed to parse AI response as JSON');
        }
      }

      // Supporta strutture tipo { "article": { ... } }
      if (article && article.article) {
        article = article.article;
      }

      if (!article || typeof article !== 'object') {
        console.error('AI article object invalid:', article);
        throw new Error('AI response did not contain a valid article object');
      }

      // Se manca lo slug, generarlo dal titolo
      if (!article.slug && article.title) {
        const slugSource = String(article.title)
          .toLowerCase()
          .normalize('NFD')
          .replace(/\p{Diacritic}/gu, '');

        article.slug = slugSource
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '');
      }

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
