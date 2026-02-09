-- Ricrea la vista senza security_invoker per permettere accesso pubblico
-- La sicurezza è garantita dal fatto che la vista espone solo campi non-sensibili
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

-- Concedi accesso in lettura ai ruoli anon e authenticated
GRANT SELECT ON public.business_cards_public TO anon, authenticated;