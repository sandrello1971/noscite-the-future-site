-- 1. Restrict the dangerous assign_admin_role_to_user function
REVOKE EXECUTE ON FUNCTION public.assign_admin_role_to_user(text) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.assign_admin_role_to_user(text) FROM anon;
REVOKE EXECUTE ON FUNCTION public.assign_admin_role_to_user(text) FROM authenticated;

-- 2. Make documents storage bucket private
UPDATE storage.buckets SET public = false WHERE id = 'documents';

-- 3. Add storage policies for private document access
CREATE POLICY "Authenticated users can upload documents"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'documents');

CREATE POLICY "Users can view their own documents"
ON storage.objects
FOR SELECT
TO authenticated
USING (bucket_id = 'documents' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update their own documents"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'documents' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own documents"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'documents' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Admins can view all documents"
ON storage.objects
FOR SELECT
TO authenticated
USING (bucket_id = 'documents' AND has_role(auth.uid(), 'admin'::app_role));

-- 4. Allow admins to view all profiles (optional improvement)
CREATE POLICY "Admins can view all profiles"
ON public.profiles
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));