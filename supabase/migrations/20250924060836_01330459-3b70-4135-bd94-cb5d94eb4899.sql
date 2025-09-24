-- Fix security issues with RLS policies by removing problematic policies

-- 1. Remove the insecure policy that allows public updates
DROP POLICY IF EXISTS "Users can unsubscribe themselves" ON public.newsletter_subscriptions;

-- 2. Remove duplicate/conflicting policies  
DROP POLICY IF EXISTS "Only admins can view newsletter subscriptions" ON public.newsletter_subscriptions;
DROP POLICY IF EXISTS "Only admins can update newsletter subscriptions" ON public.newsletter_subscriptions;
DROP POLICY IF EXISTS "Only admins can delete newsletter subscriptions" ON public.newsletter_subscriptions;

-- 3. Fix blog_posts to prevent access to unpublished drafts
DROP POLICY IF EXISTS "Published blog posts are publicly visible" ON public.blog_posts;

CREATE POLICY "Only published blog posts are publicly visible" 
ON public.blog_posts
FOR SELECT 
TO anon, authenticated
USING (published = true AND published_at IS NOT NULL AND published_at <= now());

CREATE POLICY "Authors and admins can view all their blog posts" 
ON public.blog_posts
FOR SELECT 
TO authenticated
USING (auth.uid() = author_id OR has_role(auth.uid(), 'admin'::app_role));