
INSERT INTO storage.buckets (id, name, public) VALUES ('business-card-photos', 'business-card-photos', true);

CREATE POLICY "Admin upload business card photos" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'business-card-photos' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admin update business card photos" ON storage.objects
  FOR UPDATE TO authenticated
  USING (bucket_id = 'business-card-photos' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admin delete business card photos" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'business-card-photos' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Public read business card photos" ON storage.objects
  FOR SELECT TO anon, authenticated
  USING (bucket_id = 'business-card-photos');
