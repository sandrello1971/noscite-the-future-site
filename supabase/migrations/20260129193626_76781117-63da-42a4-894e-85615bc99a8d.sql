-- Aggiorna foto profilo e link social per sandrello
UPDATE public.business_cards 
SET 
  photo_url = '/images/sandrello-profile.png',
  linkedin_url = 'https://www.linkedin.com/in/stefanoandrello/',
  whatsapp_number = '+393476859801',
  facebook_url = 'https://www.facebook.com/Noscite/',
  instagram_url = 'https://www.instagram.com/noscite',
  mobile = '+393476859801',
  updated_at = now()
WHERE username = 'sandrello';