-- Fix security issues with RLS policies

-- 1. Fix newsletter_subscriptions table - remove conflicting and insecure policies
DROP POLICY IF EXISTS "Users can unsubscribe themselves" ON public.newsletter_subscriptions;
DROP POLICY IF EXISTS "Only admins can view newsletter subscriptions" ON public.newsletter_subscriptions;
DROP POLICY IF EXISTS "Only admins can update newsletter subscriptions" ON public.newsletter_subscriptions;
DROP POLICY IF EXISTS "Only admins can delete newsletter subscriptions" ON public.newsletter_subscriptions;

-- Create new secure policies for newsletter_subscriptions
CREATE POLICY "Only verified admins can read newsletter subscriptions" 
ON public.newsletter_subscriptions
FOR SELECT 
TO public
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Only verified admins can update newsletter subscriptions" 
ON public.newsletter_subscriptions
FOR UPDATE 
TO public
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Only verified admins can delete newsletter subscriptions" 
ON public.newsletter_subscriptions
FOR DELETE 
TO public
USING (has_role(auth.uid(), 'admin'::app_role));

-- Keep the INSERT policies for public subscription
-- "Public can subscribe to newsletter with validation" - already exists and is secure
-- "Validated users can subscribe to newsletter" - already exists and is secure

-- 2. Fix blog_posts - ensure unpublished drafts are not accessible
DROP POLICY IF EXISTS "Published blog posts are publicly visible" ON public.blog_posts;

CREATE POLICY "Only published blog posts are publicly visible" 
ON public.blog_posts
FOR SELECT 
TO anon, authenticated
USING (published = true AND published_at IS NOT NULL AND published_at <= now());

CREATE POLICY "Authors and admins can view all their blog posts" 
ON public.blog_posts
FOR SELECT 
TO authenticated
USING (auth.uid() = author_id OR has_role(auth.uid(), 'admin'::app_role));

-- 3. Ensure contact_messages policies are properly restrictive (they already are, but let's be explicit)
-- The existing policies are already secure, no changes needed

-- 4. Add logging for sensitive data access
CREATE OR REPLACE FUNCTION public.log_sensitive_data_access()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Log when admins access sensitive customer data
  IF TG_TABLE_NAME IN ('contact_messages', 'newsletter_subscriptions') THEN
    INSERT INTO public.admin_audit_log (
      admin_user_id,
      action,
      table_name,
      record_id,
      ip_address
    ) VALUES (
      auth.uid(),
      'ACCESS_SENSITIVE_DATA',
      TG_TABLE_NAME,
      COALESCE(NEW.id::text, OLD.id::text),
      inet_client_addr()
    );
  END IF;
  
  RETURN COALESCE(NEW, OLD);
END;
$$;

-- Add triggers for audit logging on sensitive tables
DROP TRIGGER IF EXISTS audit_contact_messages_access ON public.contact_messages;
CREATE TRIGGER audit_contact_messages_access
  AFTER SELECT ON public.contact_messages
  FOR EACH ROW
  EXECUTE FUNCTION public.log_sensitive_data_access();

DROP TRIGGER IF EXISTS audit_newsletter_subscriptions_access ON public.newsletter_subscriptions;  
CREATE TRIGGER audit_newsletter_subscriptions_access
  AFTER SELECT ON public.newsletter_subscriptions
  FOR EACH ROW
  EXECUTE FUNCTION public.log_sensitive_data_access();