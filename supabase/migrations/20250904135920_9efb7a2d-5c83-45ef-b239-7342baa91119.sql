-- 1. Add email validation function to prevent invalid emails
CREATE OR REPLACE FUNCTION public.is_valid_email(email text)
RETURNS boolean AS $$
BEGIN
  RETURN email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' 
    AND char_length(email) <= 254
    AND NOT (email ~* '(disposable|temp|fake|spam|test)');
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public;

-- 2. Add rate limiting table for newsletter subscriptions
CREATE TABLE IF NOT EXISTS public.newsletter_rate_limit (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ip_address inet NOT NULL,
  email text NOT NULL,
  attempts integer DEFAULT 1,
  first_attempt timestamp with time zone DEFAULT now(),
  last_attempt timestamp with time zone DEFAULT now(),
  blocked_until timestamp with time zone,
  created_at timestamp with time zone DEFAULT now()
);

-- Enable RLS on rate limit table
ALTER TABLE public.newsletter_rate_limit ENABLE ROW LEVEL SECURITY;

-- 3. Add audit logging table for admin access to sensitive data
CREATE TABLE IF NOT EXISTS public.admin_audit_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_user_id uuid NOT NULL,
  action text NOT NULL,
  table_name text NOT NULL,
  record_id text,
  ip_address inet,
  user_agent text,
  created_at timestamp with time zone DEFAULT now()
);

-- Enable RLS on audit log table
ALTER TABLE public.admin_audit_log ENABLE ROW LEVEL SECURITY;

-- 4. Create policies for rate limit table (only system can access)
CREATE POLICY "Rate limit access only for system"
ON public.newsletter_rate_limit
FOR ALL
USING (false);

-- 5. Create policies for audit log table (only admins can view their own logs)
CREATE POLICY "Admins can view audit logs"
ON public.admin_audit_log
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "System can insert audit logs"
ON public.admin_audit_log
FOR INSERT
WITH CHECK (true);

-- 6. Improve newsletter subscription policy with better validation
DROP POLICY IF EXISTS "Anyone can subscribe to newsletter" ON public.newsletter_subscriptions;

CREATE POLICY "Validated users can subscribe to newsletter"
ON public.newsletter_subscriptions
FOR INSERT
WITH CHECK (
  is_valid_email(email) 
  AND NOT EXISTS (
    SELECT 1 FROM public.newsletter_subscriptions ns2 
    WHERE ns2.email = newsletter_subscriptions.email
  )
);

-- 7. Add function to log admin access to sensitive data
CREATE OR REPLACE FUNCTION public.log_admin_access(
  p_action text,
  p_table_name text,
  p_record_id text DEFAULT NULL
) RETURNS void AS $$
BEGIN
  IF has_role(auth.uid(), 'admin'::app_role) THEN
    INSERT INTO public.admin_audit_log (
      admin_user_id, 
      action, 
      table_name, 
      record_id,
      ip_address
    ) VALUES (
      auth.uid(),
      p_action,
      p_table_name,
      p_record_id,
      inet_client_addr()
    );
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- 8. Create function for secure newsletter export (with logging)
CREATE OR REPLACE FUNCTION public.get_newsletter_subscriptions_with_logging()
RETURNS TABLE(
  id uuid,
  email text,
  subscribed_at timestamp with time zone,
  active boolean,
  created_at timestamp with time zone,
  updated_at timestamp with time zone
) AS $$
BEGIN
  -- Log the export action
  PERFORM log_admin_access('EXPORT_NEWSLETTER_SUBSCRIPTIONS', 'newsletter_subscriptions');
  
  -- Return the data only if user is admin
  IF NOT has_role(auth.uid(), 'admin'::app_role) THEN
    RAISE EXCEPTION 'Access denied: Admin role required';
  END IF;
  
  RETURN QUERY
  SELECT 
    ns.id,
    ns.email,
    ns.subscribed_at,
    ns.active,
    ns.created_at,
    ns.updated_at
  FROM public.newsletter_subscriptions ns
  ORDER BY ns.created_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;