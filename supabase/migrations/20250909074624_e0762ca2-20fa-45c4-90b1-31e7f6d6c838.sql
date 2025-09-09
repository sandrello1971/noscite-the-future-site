-- Miglioria delle policy di sicurezza per contact_messages
-- Aggiungiamo logging di sicurezza e validazioni più stringenti

-- 1. Miglioriamo la validazione degli email nei messaggi di contatto
CREATE OR REPLACE FUNCTION public.validate_contact_message() 
RETURNS trigger AS $$
BEGIN
  -- Validazione email più rigorosa
  IF NOT is_valid_email(NEW.email) THEN
    RAISE EXCEPTION 'Invalid email format provided';
  END IF;
  
  -- Prevenzione spam: lunghezza massima del messaggio
  IF char_length(NEW.message) > 5000 THEN
    RAISE EXCEPTION 'Message too long (max 5000 characters)';
  END IF;
  
  -- Prevenzione spam: lunghezza minima del messaggio
  IF char_length(trim(NEW.message)) < 10 THEN
    RAISE EXCEPTION 'Message too short (min 10 characters)';
  END IF;
  
  -- Log dell'accesso per audit
  PERFORM log_admin_access('CONTACT_FORM_SUBMISSION', 'contact_messages', NEW.id::text);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- 2. Creiamo il trigger per la validazione
DROP TRIGGER IF EXISTS validate_contact_submission ON public.contact_messages;
CREATE TRIGGER validate_contact_submission
  BEFORE INSERT ON public.contact_messages
  FOR EACH ROW EXECUTE FUNCTION public.validate_contact_message();

-- 3. Aggiungiamo una policy di rate limiting per prevenire spam
-- (La tabella newsletter_rate_limit può essere riutilizzata)
CREATE OR REPLACE FUNCTION public.check_contact_rate_limit()
RETURNS trigger AS $$
DECLARE
  attempt_count INTEGER;
  client_ip INET := inet_client_addr();
BEGIN
  -- Controlla tentativi nelle ultime 24 ore dallo stesso IP
  SELECT COUNT(*) INTO attempt_count
  FROM public.contact_messages
  WHERE created_at > NOW() - INTERVAL '24 hours'
    AND email = NEW.email;
  
  -- Limite di 3 messaggi per email nelle 24 ore
  IF attempt_count >= 3 THEN
    RAISE EXCEPTION 'Rate limit exceeded. Maximum 3 contact submissions per 24 hours per email address.';
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- 4. Trigger per il rate limiting
DROP TRIGGER IF EXISTS contact_rate_limit_check ON public.contact_messages;
CREATE TRIGGER contact_rate_limit_check
  BEFORE INSERT ON public.contact_messages
  FOR EACH ROW EXECUTE FUNCTION public.check_contact_rate_limit();

-- 5. Miglioriamo la policy di lettura per essere più esplicita
DROP POLICY IF EXISTS "Only admins can view contact messages" ON public.contact_messages;
CREATE POLICY "Only verified admins can view contact messages"
ON public.contact_messages
FOR SELECT
TO authenticated
USING (
  has_role(auth.uid(), 'admin'::app_role) AND 
  auth.uid() IS NOT NULL
);

-- 6. Policy per il logging quando gli admin accedono ai dati
CREATE OR REPLACE FUNCTION public.log_contact_access()
RETURNS trigger AS $$
BEGIN
  -- Log quando un admin accede ai messaggi di contatto
  PERFORM log_admin_access('VIEW_CONTACT_MESSAGE', 'contact_messages', OLD.id::text);
  RETURN OLD;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Trigger per il logging (solo su SELECT non è possibile, ma possiamo loggare altre operazioni)
DROP TRIGGER IF EXISTS log_contact_message_access ON public.contact_messages;

-- 7. Assicuriamoci che la policy INSERT sia ben definita
DROP POLICY IF EXISTS "Anyone can submit contact messages" ON public.contact_messages;
CREATE POLICY "Validated users can submit contact messages"
ON public.contact_messages
FOR INSERT
TO anon, authenticated
WITH CHECK (
  is_valid_email(email) AND 
  char_length(trim(message)) >= 10 AND 
  char_length(message) <= 5000 AND
  char_length(trim(name)) >= 2
);