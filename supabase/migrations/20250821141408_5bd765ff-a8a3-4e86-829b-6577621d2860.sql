-- Check current role and session info
SELECT current_user, session_user;

-- Check auth.uid() to see if we're authenticated
SELECT auth.uid() as current_auth_uid;

-- The issue is that the anon role is being used to query, but our policies require 'authenticated'
-- Let's check if there are any policies that apply to anon role
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check 
FROM pg_policies 
WHERE tablename = 'profiles';

-- We need to ensure NO access for anon role
-- Let's add explicit deny policy for anon role
CREATE POLICY "Block anonymous access to profiles" 
ON public.profiles 
FOR ALL 
TO anon
USING (false);