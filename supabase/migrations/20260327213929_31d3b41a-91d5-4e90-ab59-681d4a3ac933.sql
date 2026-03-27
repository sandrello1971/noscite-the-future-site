CREATE POLICY "Public can read active business cards"
ON public.business_cards
FOR SELECT
TO anon, authenticated
USING (is_active = true);