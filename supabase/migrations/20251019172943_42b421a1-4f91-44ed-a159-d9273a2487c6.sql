-- Fix 1: Add RLS policies for suppliers table
-- The suppliers table exists but lacks proper RLS policies

-- Add user-scoped SELECT policy
CREATE POLICY "Users can view their suppliers"
ON public.suppliers
FOR SELECT
USING (auth.uid() = user_id);

-- Add user-scoped INSERT policy
CREATE POLICY "Users can create their suppliers"
ON public.suppliers
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Add user-scoped UPDATE policy
CREATE POLICY "Users can update their suppliers"
ON public.suppliers
FOR UPDATE
USING (auth.uid() = user_id);

-- Add user-scoped DELETE policy
CREATE POLICY "Users can delete their suppliers"
ON public.suppliers
FOR DELETE
USING (auth.uid() = user_id);

-- Add admin access policy for all operations
CREATE POLICY "Admins can manage all suppliers"
ON public.suppliers
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));