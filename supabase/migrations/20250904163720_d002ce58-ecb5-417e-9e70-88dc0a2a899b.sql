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