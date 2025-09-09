-- Miglioramenti policy di sicurezza RLS (corretti)

-- 1. Miglioriamo la policy per i documenti
DROP POLICY IF EXISTS "Authenticated users can view documents" ON public.documents;
CREATE POLICY "Verified authenticated users can view documents"
ON public.documents
FOR SELECT
TO authenticated
USING (
  auth.uid() IS NOT NULL AND 
  auth.email() IS NOT NULL
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

-- 3. Miglioriamo la policy per chat_conversations
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

-- 4. Miglioriamo la policy per i profili
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
CREATE POLICY "Users can view only their verified profile"
ON public.profiles
FOR SELECT
TO authenticated
USING (
  auth.uid() = user_id AND
  auth.uid() IS NOT NULL
);

-- 5. Miglioriamo la policy per blog_posts
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

-- 6. Solo admin possono creare blog posts
DROP POLICY IF EXISTS "Solo autori autenticati possono creare blog posts" ON public.blog_posts;
CREATE POLICY "Verified authors can create blog posts"
ON public.blog_posts
FOR INSERT
TO authenticated
WITH CHECK (
  auth.uid() = author_id AND
  auth.uid() IS NOT NULL AND
  has_role(auth.uid(), 'admin'::app_role)
);