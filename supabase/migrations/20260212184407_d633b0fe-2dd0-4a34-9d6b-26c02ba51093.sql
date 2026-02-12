-- Fix: Remove email from public view (PII exposure) and set security_invoker = true
DROP VIEW IF EXISTS public.business_cards_public;

CREATE VIEW public.business_cards_public
WITH (security_invoker = true)
AS
SELECT 
  id, username, first_name, last_name, title, company, tagline,
  photo_url, mobile, website, linkedin_url, whatsapp_number,
  facebook_url, instagram_url, twitter_url, vat_number, is_active, 
  created_at, updated_at
  -- NOTE: email intentionally excluded for privacy
FROM public.business_cards
WHERE is_active = true;

GRANT SELECT ON public.business_cards_public TO anon, authenticated;