
DROP VIEW IF EXISTS public.business_cards_public;

CREATE VIEW public.business_cards_public AS
SELECT 
  id,
  username,
  first_name,
  last_name,
  title,
  company,
  tagline,
  mobile,
  email,
  website,
  photo_url,
  linkedin_url,
  whatsapp_number,
  facebook_url,
  instagram_url,
  twitter_url,
  vat_number,
  is_active,
  created_at,
  updated_at
FROM public.business_cards
WHERE is_active = true;

GRANT SELECT ON public.business_cards_public TO anon, authenticated;
