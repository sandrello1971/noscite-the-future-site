-- Create HNSW index for embeddings (cosine)
CREATE INDEX IF NOT EXISTS knowledge_base_embeddings_hnsw
ON public.knowledge_base
USING hnsw (embeddings vector_cosine_ops);

-- Function for semantic search in knowledge_base
CREATE OR REPLACE FUNCTION public.match_knowledge_base(
  query_embedding vector,
  match_threshold double precision DEFAULT 0.5,
  match_count integer DEFAULT 5
)
RETURNS TABLE (
  id uuid,
  title text,
  content text,
  content_type text,
  source_id text,
  distance double precision
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT kb.id, kb.title, kb.content, kb.content_type, kb.source_id,
         (kb.embeddings <=> query_embedding) AS distance
  FROM public.knowledge_base kb
  WHERE kb.embeddings IS NOT NULL
    AND (kb.embeddings <=> query_embedding) <= match_threshold
  ORDER BY kb.embeddings <=> query_embedding
  LIMIT match_count;
END;
$$;

-- Remove outdated IoT mention from percorsi content if present
UPDATE public.knowledge_base
SET content = regexp_replace(content, E'\n?-?\s*Industry 4\.0\s*&\s*IoT:.*(\n|$)', '', 'gi')
WHERE source_id = 'percorsi_page';