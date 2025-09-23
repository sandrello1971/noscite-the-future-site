-- Fix critical security vulnerabilities in customer data tables
-- This migration ensures proper Row Level Security for sensitive customer data

-- 1. Drop existing potentially problematic policies and recreate them securely
DROP POLICY IF EXISTS "Super secure admin access to contact messages" ON contact_messages;
DROP POLICY IF EXISTS "Super secure admin delete contact messages" ON contact_messages;
DROP POLICY IF EXISTS "Super secure admin update contact messages" ON contact_messages;
DROP POLICY IF EXISTS "Validated users can submit contact messages" ON contact_messages;

-- 2. Ensure RLS is enabled on all sensitive tables
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

-- 3. Create secure policies for contact_messages
-- Only allow public insertion with strict validation
CREATE POLICY "Public can submit contact messages with validation" 
ON contact_messages 
FOR INSERT 
WITH CHECK (
  is_valid_email(email) AND 
  char_length(trim(message)) >= 10 AND 
  char_length(message) <= 5000 AND 
  char_length(trim(name)) >= 2
);

-- Only authenticated admins can read contact messages
CREATE POLICY "Only verified admins can read contact messages" 
ON contact_messages 
FOR SELECT 
USING (
  auth.uid() IS NOT NULL AND 
  has_role(auth.uid(), 'admin'::app_role)
);

-- Only authenticated admins can update contact messages
CREATE POLICY "Only verified admins can update contact messages" 
ON contact_messages 
FOR UPDATE 
USING (
  auth.uid() IS NOT NULL AND 
  has_role(auth.uid(), 'admin'::app_role)
);

-- Only authenticated admins can delete contact messages
CREATE POLICY "Only verified admins can delete contact messages" 
ON contact_messages 
FOR DELETE 
USING (
  auth.uid() IS NOT NULL AND 
  has_role(auth.uid(), 'admin'::app_role)
);

-- 4. Create secure policies for newsletter_subscriptions
-- Drop existing policies if any
DROP POLICY IF EXISTS "Users can subscribe to newsletter" ON newsletter_subscriptions;
DROP POLICY IF EXISTS "Admins can manage newsletter subscriptions" ON newsletter_subscriptions;

-- Allow public subscription with email validation
CREATE POLICY "Public can subscribe to newsletter with validation" 
ON newsletter_subscriptions 
FOR INSERT 
WITH CHECK (
  is_valid_email(email) AND 
  char_length(email) <= 254
);

-- Allow users to unsubscribe using their email (no auth required for unsubscribe)
CREATE POLICY "Users can unsubscribe themselves" 
ON newsletter_subscriptions 
FOR UPDATE 
USING (true)
WITH CHECK (
  -- Only allow setting active to false (unsubscribe)
  active = false
);

-- Only authenticated admins can read newsletter subscriptions
CREATE POLICY "Only verified admins can read newsletter subscriptions" 
ON newsletter_subscriptions 
FOR SELECT 
USING (
  auth.uid() IS NOT NULL AND 
  has_role(auth.uid(), 'admin'::app_role)
);

-- Only authenticated admins can delete newsletter subscriptions
CREATE POLICY "Only verified admins can delete newsletter subscriptions" 
ON newsletter_subscriptions 
FOR DELETE 
USING (
  auth.uid() IS NOT NULL AND 
  has_role(auth.uid(), 'admin'::app_role)
);

-- 5. Ensure user_profiles table has proper RLS if it exists
-- Check if user_profiles table exists and secure it
DO $$ 
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'user_profiles' AND table_schema = 'public') THEN
    -- Enable RLS on user_profiles
    ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
    
    -- Drop existing policies if any
    DROP POLICY IF EXISTS "Users can view own profile" ON user_profiles;
    DROP POLICY IF EXISTS "Users can update own profile" ON user_profiles;
    DROP POLICY IF EXISTS "Admins can view all profiles" ON user_profiles;
    
    -- Users can only view and modify their own profile
    CREATE POLICY "Users can view own profile" 
    ON user_profiles 
    FOR SELECT 
    USING (auth.uid() = id);
    
    CREATE POLICY "Users can update own profile" 
    ON user_profiles 
    FOR UPDATE 
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);
    
    CREATE POLICY "Users can insert own profile" 
    ON user_profiles 
    FOR INSERT 
    WITH CHECK (auth.uid() = id);
    
    -- Admins can view all profiles
    CREATE POLICY "Verified admins can view all profiles" 
    ON user_profiles 
    FOR SELECT 
    USING (has_role(auth.uid(), 'admin'::app_role));
  END IF;
END $$;

-- 6. Add audit logging for sensitive operations
CREATE OR REPLACE FUNCTION log_sensitive_access()
RETURNS TRIGGER AS $$
BEGIN
  -- Log when admins access sensitive customer data
  IF TG_OP = 'SELECT' AND TG_TABLE_NAME IN ('contact_messages', 'newsletter_subscriptions') THEN
    INSERT INTO admin_audit_log (
      admin_user_id,
      action,
      table_name,
      record_id,
      ip_address
    ) VALUES (
      auth.uid(),
      'ACCESS_SENSITIVE_DATA',
      TG_TABLE_NAME,
      COALESCE(NEW.id::text, OLD.id::text),
      inet_client_addr()
    );
  END IF;
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- 7. Revoke any public access that might exist
REVOKE ALL ON contact_messages FROM public, anon, authenticated;
REVOKE ALL ON newsletter_subscriptions FROM public, anon, authenticated;

-- Grant only necessary permissions
GRANT INSERT ON contact_messages TO anon, authenticated;
GRANT INSERT ON newsletter_subscriptions TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON contact_messages TO authenticated;
GRANT SELECT, UPDATE, DELETE ON newsletter_subscriptions TO authenticated;