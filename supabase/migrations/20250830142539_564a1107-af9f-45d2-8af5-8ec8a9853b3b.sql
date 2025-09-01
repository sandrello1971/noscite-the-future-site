-- Update RLS policies for public chatbot access
-- Drop existing policies first
DROP POLICY IF EXISTS "Accesso limitato alle conversazioni anonime per session_id" ON public.chat_conversations;
DROP POLICY IF EXISTS "Aggiornamento conversazioni proprie" ON public.chat_conversations;
DROP POLICY IF EXISTS "Inserimento conversazioni anonime" ON public.chat_conversations;
DROP POLICY IF EXISTS "Utenti autenticati possono vedere le proprie conversazioni" ON public.chat_conversations;

-- Create new policies for public anonymous chatbot access
CREATE POLICY "Allow public read for anonymous conversations" 
ON public.chat_conversations 
FOR SELECT 
USING (user_id IS NULL);

CREATE POLICY "Allow public insert for anonymous conversations" 
ON public.chat_conversations 
FOR INSERT 
WITH CHECK (user_id IS NULL);

CREATE POLICY "Allow public update for anonymous conversations" 
ON public.chat_conversations 
FOR UPDATE 
USING (user_id IS NULL);

-- Allow authenticated users to manage their own conversations (if they want to use the chatbot while logged in)
CREATE POLICY "Authenticated users can manage their own conversations" 
ON public.chat_conversations 
FOR ALL 
USING (auth.uid() = user_id);