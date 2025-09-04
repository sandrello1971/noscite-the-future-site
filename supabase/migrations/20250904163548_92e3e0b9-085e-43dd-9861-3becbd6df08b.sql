-- Fix role escalation vulnerability by preventing users from updating their own roles
DROP POLICY IF EXISTS "Admins can manage all roles" ON public.user_roles;

-- Create more restrictive policies for user_roles
CREATE POLICY "Users can view their own roles" 
ON public.user_roles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Only admins can insert roles" 
ON public.user_roles 
FOR INSERT 
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Only admins can update roles" 
ON public.user_roles 
FOR UPDATE 
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Only admins can delete roles" 
ON public.user_roles 
FOR DELETE 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Add audit logging for sensitive admin operations
CREATE TABLE IF NOT EXISTS public.security_audit_log (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
    action text NOT NULL,
    table_name text NOT NULL,
    record_id text,
    old_values jsonb,
    new_values jsonb,
    ip_address inet,
    user_agent text,
    created_at timestamp with time zone DEFAULT now()
);

-- Enable RLS on audit log
ALTER TABLE public.security_audit_log ENABLE ROW LEVEL SECURITY;

-- Only admins can view audit logs
CREATE POLICY "Only admins can view security audit logs" 
ON public.security_audit_log 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role));

-- System can insert audit logs (for triggers)
CREATE POLICY "System can insert audit logs" 
ON public.security_audit_log 
FOR INSERT 
WITH CHECK (true);

-- Create trigger function for audit logging
CREATE OR REPLACE FUNCTION public.log_security_changes()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    -- Only log changes to sensitive tables
    IF TG_TABLE_NAME IN ('user_roles', 'profiles', 'contact_messages', 'newsletter_subscriptions') THEN
        INSERT INTO public.security_audit_log (
            user_id,
            action,
            table_name,
            record_id,
            old_values,
            new_values,
            ip_address
        ) VALUES (
            auth.uid(),
            TG_OP,
            TG_TABLE_NAME,
            COALESCE(NEW.id::text, OLD.id::text),
            CASE WHEN TG_OP = 'DELETE' THEN row_to_json(OLD) ELSE NULL END,
            CASE WHEN TG_OP IN ('INSERT', 'UPDATE') THEN row_to_json(NEW) ELSE NULL END,
            inet_client_addr()
        );
    END IF;
    
    RETURN COALESCE(NEW, OLD);
END;
$$;

-- Add audit triggers to sensitive tables
DROP TRIGGER IF EXISTS security_audit_user_roles ON public.user_roles;
CREATE TRIGGER security_audit_user_roles
    AFTER INSERT OR UPDATE OR DELETE ON public.user_roles
    FOR EACH ROW EXECUTE FUNCTION public.log_security_changes();

DROP TRIGGER IF EXISTS security_audit_profiles ON public.profiles;
CREATE TRIGGER security_audit_profiles
    AFTER INSERT OR UPDATE OR DELETE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.log_security_changes();

DROP TRIGGER IF EXISTS security_audit_contact_messages ON public.contact_messages;
CREATE TRIGGER security_audit_contact_messages
    AFTER INSERT OR UPDATE OR DELETE ON public.contact_messages
    FOR EACH ROW EXECUTE FUNCTION public.log_security_changes();

-- Strengthen contact messages access (only specific admin operations)
DROP POLICY IF EXISTS "Only admins can view contact messages" ON public.contact_messages;
CREATE POLICY "Only verified admins can view contact messages" 
ON public.contact_messages 
FOR SELECT 
USING (
    has_role(auth.uid(), 'admin'::app_role) AND 
    auth.uid() IS NOT NULL
);

-- Add rate limiting table for security
CREATE TABLE IF NOT EXISTS public.security_rate_limit (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
    ip_address inet NOT NULL,
    action text NOT NULL,
    attempts integer DEFAULT 1,
    blocked_until timestamp with time zone,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);

-- Enable RLS on rate limiting table
ALTER TABLE public.security_rate_limit ENABLE ROW LEVEL SECURITY;

-- Only system can access rate limiting table
CREATE POLICY "System only rate limit access" 
ON public.security_rate_limit 
FOR ALL 
USING (false)
WITH CHECK (false);