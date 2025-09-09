-- Create API rate limiting table for security
CREATE TABLE public.api_rate_limits (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  identifier TEXT NOT NULL, -- IP + sessionId or email
  endpoint TEXT NOT NULL, -- function name
  window_start TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  request_count INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS but deny all public access (Edge Functions use service role)
ALTER TABLE public.api_rate_limits ENABLE ROW LEVEL SECURITY;

-- Create policy that denies all public access
CREATE POLICY "Rate limits managed by system only"
ON public.api_rate_limits
FOR ALL
TO anon, authenticated
USING (false);

-- Add index for efficient rate limit lookups
CREATE INDEX idx_api_rate_limits_lookup ON public.api_rate_limits(identifier, endpoint, window_start);

-- Create function to clean old rate limit records
CREATE OR REPLACE FUNCTION public.cleanup_rate_limits()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  DELETE FROM public.api_rate_limits 
  WHERE window_start < NOW() - INTERVAL '24 hours';
END;
$$;

-- Update chat_conversations RLS to close anonymous exposure
DROP POLICY IF EXISTS "Anonymous users can read their own conversation" ON public.chat_conversations;
DROP POLICY IF EXISTS "Anonymous users can update their own conversation" ON public.chat_conversations;
DROP POLICY IF EXISTS "Anonymous users can create conversations with valid session" ON public.chat_conversations;

-- Only allow authenticated users to manage their own conversations
-- Anonymous conversations will be managed server-side only
CREATE POLICY "Server managed conversations only"
ON public.chat_conversations
FOR ALL
TO anon
USING (false);

-- Add visibility column to documents for better access control
ALTER TABLE public.documents ADD COLUMN IF NOT EXISTS visibility TEXT DEFAULT 'authenticated' CHECK (visibility IN ('public', 'authenticated', 'admin'));

-- Update documents policy to respect visibility
DROP POLICY IF EXISTS "Verified authenticated users can view documents" ON public.documents;
CREATE POLICY "Documents visible based on visibility setting"
ON public.documents
FOR SELECT
TO anon, authenticated
USING (
  CASE 
    WHEN visibility = 'public' THEN true
    WHEN visibility = 'authenticated' THEN (auth.uid() IS NOT NULL AND auth.email() IS NOT NULL)
    WHEN visibility = 'admin' THEN has_role(auth.uid(), 'admin'::app_role)
    ELSE false
  END
);

-- Add trigger for cleanup
CREATE TRIGGER update_api_rate_limits_updated_at
BEFORE UPDATE ON public.api_rate_limits
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();