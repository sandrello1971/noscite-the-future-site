import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const url = new URL(req.url);
  const resourcePath = url.searchParams.get('resource');
  
  if (!resourcePath) {
    console.error('Missing resource parameter');
    return new Response('Missing resource parameter', { 
      status: 400, 
      headers: corsHeaders 
    });
  }

  console.log(`Proxying Kipin resource: ${resourcePath}`);

  try {
    const kipinUrl = `https://kipin.app${resourcePath}`;
    console.log(`Fetching from: ${kipinUrl}`);
    
    const response = await fetch(kipinUrl);
    
    if (!response.ok) {
      console.error(`Kipin responded with status: ${response.status}`);
      return new Response(`Kipin error: ${response.status}`, { 
        status: response.status, 
        headers: corsHeaders 
      });
    }
    
    const contentType = response.headers.get('content-type') || 'application/octet-stream';
    const body = await response.arrayBuffer();
    
    console.log(`Successfully fetched ${resourcePath}, content-type: ${contentType}, size: ${body.byteLength} bytes`);
    
    return new Response(body, {
      status: 200,
      headers: {
        ...corsHeaders,
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error) {
    console.error('Error fetching from Kipin:', error);
    return new Response(`Error fetching resource: ${error.message}`, { 
      status: 500, 
      headers: corsHeaders 
    });
  }
});
