-- Remove existing overly permissive policies for anonymous conversations
DROP POLICY IF EXISTS "Allow public read for anonymous conversations" ON public.chat_conversations;
DROP POLICY IF EXISTS "Allow public update for anonymous conversations" ON public.chat_conversations;
DROP POLICY IF EXISTS "Allow public insert for anonymous conversations" ON public.chat_conversations;

-- Create more secure policies that use session context
CREATE POLICY "Anonymous users can insert their own conversation"
ON public.chat_conversations
FOR INSERT
WITH CHECK (
  user_id IS NULL 
  AND session_id = current_setting('request.session_id', true)
);

CREATE POLICY "Anonymous users can read their own conversation"
ON public.chat_conversations
FOR SELECT
USING (
  user_id IS NULL 
  AND session_id = current_setting('request.session_id', true)
);

CREATE POLICY "Anonymous users can update their own conversation"
ON public.chat_conversations
FOR UPDATE
USING (
  user_id IS NULL 
  AND session_id = current_setting('request.session_id', true)
);