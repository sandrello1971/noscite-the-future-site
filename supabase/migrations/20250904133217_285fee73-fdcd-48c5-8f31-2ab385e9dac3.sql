-- Remove the overly broad "ALL" policy that can create security confusion
DROP POLICY IF EXISTS "Only admins can manage newsletter subscriptions" ON public.newsletter_subscriptions;

-- Keep the existing policies but ensure they're properly restrictive
-- The SELECT policy is already correct: "Only admins can view newsletter subscriptions" 
-- The INSERT policy is already correct: "Anyone can subscribe to newsletter"

-- Add specific policies for UPDATE and DELETE operations to replace the ALL policy
CREATE POLICY "Only admins can update newsletter subscriptions"
ON public.newsletter_subscriptions
FOR UPDATE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Only admins can delete newsletter subscriptions"  
ON public.newsletter_subscriptions
FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));