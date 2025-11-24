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

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-5-nano-2025-08-07',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt }
        ],
        max_completion_tokens: type === 'content' || type === 'complete' ? 2000 : 200,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error:', response.status, errorText);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const rawContent = data.choices[0].message.content as string;

    console.log('Content generated successfully');

    if (type === 'complete') {
      let jsonText = rawContent.trim();

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

      let article;
      try {
        article = JSON.parse(jsonText);
      } catch (e) {
        console.error('Failed to parse article JSON:', e, jsonText);
        throw new Error('Failed to parse AI response as JSON');
      }

      return new Response(JSON.stringify(article), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

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
