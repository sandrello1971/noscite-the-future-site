-- Miglioramenti ulteriori alle policy di sicurezza RLS

-- 1. Miglioriamo la policy per i documenti per essere più specifica
DROP POLICY IF EXISTS "Authenticated users can view documents" ON public.documents;
CREATE POLICY "Verified authenticated users can view documents"
ON public.documents
FOR SELECT
TO authenticated
USING (
  auth.uid() IS NOT NULL AND 
  auth.email() IS NOT NULL AND
  NOT has_role(auth.uid(), 'banned'::app_role)
);

-- 2. Aggiungiamo policy più stringenti per knowledge_base
DROP POLICY IF EXISTS "Authenticated users can read knowledge base" ON public.knowledge_base;
CREATE POLICY "Verified users can read knowledge base"
ON public.knowledge_base
FOR SELECT
TO authenticated
USING (
  auth.uid() IS NOT NULL AND 
  auth.email() IS NOT NULL
);

-- 3. Miglioriamo la policy per chat_conversations per essere più sicura
DROP POLICY IF EXISTS "Anonymous users can insert their own conversation" ON public.chat_conversations;
CREATE POLICY "Anonymous users can create conversations with valid session"
ON public.chat_conversations
FOR INSERT
TO anon, authenticated
WITH CHECK (
  user_id IS NULL AND 
  session_id = current_setting('request.session_id'::text, true) AND
  char_length(session_id) >= 8 AND
  char_length(session_id) <= 100
);

-- 4. Aggiungiamo policy per prevenire accesso ai profili non autorizzati
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
CREATE POLICY "Users can view only their verified profile"
ON public.profiles
FOR SELECT
TO authenticated
USING (
  auth.uid() = user_id AND
  auth.uid() IS NOT NULL
);

-- 5. Miglioriamo la policy per blog_posts per essere più specifica
DROP POLICY IF EXISTS "Blog posts sono visibili a tutti" ON public.blog_posts;
CREATE POLICY "Published blog posts are publicly visible"
ON public.blog_posts
FOR SELECT
TO anon, authenticated
USING (
  published = true AND
  published_at IS NOT NULL AND
  published_at <= NOW()
);

-- 6. Aggiungiamo controllo per evitare spam nei blog posts
DROP POLICY IF EXISTS "Solo autori autenticati possono creare blog posts" ON public.blog_posts;
CREATE POLICY "Verified authors can create blog posts"
ON public.blog_posts
FOR INSERT
TO authenticated
WITH CHECK (
  auth.uid() = author_id AND
  auth.uid() IS NOT NULL AND
  has_role(auth.uid(), 'admin'::app_role) -- Solo admin possono creare blog posts
);

-- 7. Aggiungiamo trigger di sicurezza per logging
CREATE OR REPLACE FUNCTION public.log_security_changes()
RETURNS trigger AS $$
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
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- 8. Applichiamo il trigger a tutte le tabelle sensibili
DROP TRIGGER IF EXISTS security_audit_trigger ON public.profiles;
CREATE TRIGGER security_audit_trigger
    AFTER INSERT OR UPDATE OR DELETE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.log_security_changes();

DROP TRIGGER IF EXISTS security_audit_trigger ON public.user_roles;
CREATE TRIGGER security_audit_trigger
    AFTER INSERT OR UPDATE OR DELETE ON public.user_roles
    FOR EACH ROW EXECUTE FUNCTION public.log_security_changes();

DROP TRIGGER IF EXISTS security_audit_trigger ON public.newsletter_subscriptions;
CREATE TRIGGER security_audit_trigger
    AFTER INSERT OR UPDATE OR DELETE ON public.newsletter_subscriptions
    FOR EACH ROW EXECUTE FUNCTION public.log_security_changes();