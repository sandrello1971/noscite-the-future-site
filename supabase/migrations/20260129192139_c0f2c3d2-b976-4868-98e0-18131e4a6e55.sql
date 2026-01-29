-- Create business_cards table for digital business cards
CREATE TABLE public.business_cards (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  title TEXT,
  company TEXT,
  tagline TEXT,
  vat_number TEXT,
  email TEXT,
  phone TEXT,
  mobile TEXT,
  website TEXT,
  address TEXT,
  photo_url TEXT,
  linkedin_url TEXT,
  whatsapp_number TEXT,
  facebook_url TEXT,
  instagram_url TEXT,
  twitter_url TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create index on username for fast lookups
CREATE INDEX idx_business_cards_username ON public.business_cards(username);

-- Enable RLS
ALTER TABLE public.business_cards ENABLE ROW LEVEL SECURITY;

-- Public can view active business cards (no auth required)
CREATE POLICY "Public can view active business cards"
ON public.business_cards
FOR SELECT
USING (is_active = true);

-- Only admins can manage business cards
CREATE POLICY "Admins can manage business cards"
ON public.business_cards
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_business_cards_updated_at
BEFORE UPDATE ON public.business_cards
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert initial data for sandrello profile
INSERT INTO public.business_cards (
  username,
  first_name,
  last_name,
  title,
  company,
  tagline,
  vat_number,
  email,
  phone,
  website,
  is_active
) VALUES (
  'sandrello',
  'Stefano',
  'Andrello',
  'CEO & CO-founder',
  'Noscite',
  'L''AI non cambia ciò che facciamo. Cambia ciò che possiamo immaginare di fare.',
  '14385240966',
  'sandrello@noscite.it',
  '3476859801',
  'noscite.it',
  true
);