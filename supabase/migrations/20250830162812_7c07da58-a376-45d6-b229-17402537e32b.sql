-- Inserisci il ruolo admin per l'utente sandrello@noscite.it
-- Nota: l'utente deve prima registrarsi tramite l'interfaccia di auth
-- Questo script sarà utilizzato dopo la registrazione

-- Funzione per assegnare ruolo admin a un utente specifico
CREATE OR REPLACE FUNCTION assign_admin_role_to_user(user_email text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  target_user_id uuid;
BEGIN
  -- Trova l'ID utente dall'email (questa query funziona solo se l'utente esiste)
  SELECT id INTO target_user_id 
  FROM auth.users 
  WHERE email = user_email;
  
  IF target_user_id IS NOT NULL THEN
    -- Inserisci o aggiorna il ruolo admin
    INSERT INTO public.user_roles (user_id, role)
    VALUES (target_user_id, 'admin'::app_role)
    ON CONFLICT (user_id, role) DO NOTHING;
  END IF;
END;
$$;

-- Commento: Dopo che l'utente sandrello@noscite.it si registra,
-- eseguire: SELECT assign_admin_role_to_user('sandrello@noscite.it');