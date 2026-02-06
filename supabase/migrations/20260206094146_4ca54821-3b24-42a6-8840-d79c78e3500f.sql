-- Fix: Secure business_cards table from public access to personal data
-- The business_cards table contains sensitive PII (email, phone, VAT numbers, addresses)
-- Create a public view with only display-safe fields for digital business cards

-- First, drop any existing public policy that allows unrestricted access
DROP POLICY IF EXISTS "Anyone can view active business cards" ON public.business_cards;
DROP POLICY IF EXISTS "Public can view active business cards" ON public.business_cards;

-- Create a public view with only the fields needed for public display
-- Excludes: email, phone, vat_number, address
CREATE OR REPLACE VIEW public.business_cards_public
WITH (security_invoker=on) AS
  SELECT 
    id,
    username,
    first_name,
    last_name,
    title,
    company,
    tagline,
    photo_url,
    mobile,
    website,
    linkedin_url,
    whatsapp_number,
    facebook_url,
    instagram_url,
    twitter_url,
    is_active,
    created_at,
    updated_at
  FROM public.business_cards
  WHERE is_active = true;

-- Grant SELECT on the public view to anon and authenticated roles
GRANT SELECT ON public.business_cards_public TO anon;
GRANT SELECT ON public.business_cards_public TO authenticated;

-- RLS Policy: Deny direct table access to anonymous users
-- Only admins can access the full table directly
CREATE POLICY "Only admins can access business_cards directly"
  ON public.business_cards
  FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Allow admins to manage (insert/update/delete) business cards
CREATE POLICY "Admins can manage business_cards"
  ON public.business_cards
  FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));