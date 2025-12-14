import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { frontImage, backImage } = await req.json();
    
    if (!frontImage) {
      return new Response(
        JSON.stringify({ error: "Front image is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Processing business card scan...");

    // Build the content array with images
    const content: any[] = [
      {
        type: "text",
        text: `Analyze this business card image(s) and extract the contact information.
Return ONLY a valid JSON object with these exact fields (use empty string if not found):
{
  "firstName": "first name",
  "lastName": "last name",
  "company": "company name",
  "position": "job title/role",
  "email": "email address",
  "phone": "office phone number",
  "mobile": "mobile phone number",
  "website": "website URL",
  "address": "full address"
}

Important:
- Extract ALL visible information from both sides if provided
- Separate first name and last name correctly
- Include country code for phone numbers if visible
- Return ONLY the JSON, no other text`
      },
      {
        type: "image_url",
        image_url: {
          url: `data:image/jpeg;base64,${frontImage}`
        }
      }
    ];

    // Add back image if provided
    if (backImage) {
      content.push({
        type: "image_url",
        image_url: {
          url: `data:image/jpeg;base64,${backImage}`
        }
      });
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "user",
            content: content
          }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please add funds." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const aiResponse = await response.json();
    const responseText = aiResponse.choices?.[0]?.message?.content || "";
    
    console.log("AI response:", responseText);

    // Parse the JSON from the response
    let extractedData;
    try {
      // Try to extract JSON from the response
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        extractedData = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("No JSON found in response");
      }
    } catch (parseError) {
      console.error("Failed to parse AI response:", parseError);
      extractedData = {
        firstName: "",
        lastName: "",
        company: "",
        position: "",
        email: "",
        phone: "",
        mobile: "",
        website: "",
        address: "",
      };
    }

    // Ensure all fields exist
    const normalizedData = {
      firstName: extractedData.firstName || "",
      lastName: extractedData.lastName || "",
      company: extractedData.company || "",
      position: extractedData.position || "",
      email: extractedData.email || "",
      phone: extractedData.phone || "",
      mobile: extractedData.mobile || "",
      website: extractedData.website || "",
      address: extractedData.address || "",
    };

    console.log("Extracted data:", normalizedData);

    return new Response(
      JSON.stringify({ extractedData: normalizedData }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error processing business card:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
