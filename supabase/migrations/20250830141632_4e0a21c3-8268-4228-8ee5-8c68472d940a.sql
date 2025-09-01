-- Creazione tabella per i contenuti del blog
CREATE TABLE public.blog_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT NOT NULL,
  author_id UUID REFERENCES auth.users(id),
  category TEXT,
  tags TEXT[],
  featured_image_url TEXT,
  published BOOLEAN DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Creazione tabella per i documenti/guide
CREATE TABLE public.documents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  file_url TEXT NOT NULL,
  file_type TEXT NOT NULL,
  category TEXT,
  tags TEXT[],
  download_count INTEGER DEFAULT 0,
  uploaded_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Creazione tabella per il knowledge base del chatbot
CREATE TABLE public.knowledge_base (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  content TEXT NOT NULL,
  content_type TEXT NOT NULL, -- 'page', 'blog', 'document'
  source_id TEXT, -- id del post/documento o nome della pagina
  title TEXT,
  embeddings vector(1536), -- per OpenAI embeddings
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Creazione tabella per le conversazioni del chatbot
CREATE TABLE public.chat_conversations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL,
  messages JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Abilitazione RLS
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.knowledge_base ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_conversations ENABLE ROW LEVEL SECURITY;

-- Policies per blog_posts
CREATE POLICY "Blog posts sono visibili a tutti" 
ON public.blog_posts 
FOR SELECT 
USING (published = true);

CREATE POLICY "Solo autori autenticati possono creare blog posts" 
ON public.blog_posts 
FOR INSERT 
WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Solo autori possono modificare i loro blog posts" 
ON public.blog_posts 
FOR UPDATE 
USING (auth.uid() = author_id);

CREATE POLICY "Solo autori possono eliminare i loro blog posts" 
ON public.blog_posts 
FOR DELETE 
USING (auth.uid() = author_id);

-- Policies per documents
CREATE POLICY "Documenti sono visibili a tutti" 
ON public.documents 
FOR SELECT 
USING (true);

CREATE POLICY "Solo utenti autenticati possono caricare documenti" 
ON public.documents 
FOR INSERT 
WITH CHECK (auth.uid() = uploaded_by);

CREATE POLICY "Solo uploader possono modificare documenti" 
ON public.documents 
FOR UPDATE 
USING (auth.uid() = uploaded_by);

CREATE POLICY "Solo uploader possono eliminare documenti" 
ON public.documents 
FOR DELETE 
USING (auth.uid() = uploaded_by);

-- Policies per knowledge_base
CREATE POLICY "Knowledge base leggibile da tutti" 
ON public.knowledge_base 
FOR SELECT 
USING (true);

CREATE POLICY "Solo utenti autenticati possono modificare knowledge base" 
ON public.knowledge_base 
FOR ALL
USING (auth.uid() IS NOT NULL);

-- Policies per chat_conversations
CREATE POLICY "Utenti possono vedere le proprie conversazioni" 
ON public.chat_conversations 
FOR ALL
USING (true); -- Le conversazioni sono identificate da session_id, non da user

-- Trigger per aggiornare updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_documents_updated_at
  BEFORE UPDATE ON public.documents
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_knowledge_base_updated_at
  BEFORE UPDATE ON public.knowledge_base
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_chat_conversations_updated_at
  BEFORE UPDATE ON public.chat_conversations
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Indici per performance
CREATE INDEX idx_blog_posts_published ON public.blog_posts(published, published_at);
CREATE INDEX idx_blog_posts_slug ON public.blog_posts(slug);
CREATE INDEX idx_documents_category ON public.documents(category);
CREATE INDEX idx_knowledge_base_content_type ON public.knowledge_base(content_type);
CREATE INDEX idx_chat_conversations_session ON public.chat_conversations(session_id);