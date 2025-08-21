-- Fix the security issue: Replace the existing RLS policies with properly secured ones
-- First, drop all existing policies on profiles table
DROP POLICY IF EXISTS "Admins can update any profile role" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile basic info" ON public.profiles;
DROP POLICY IF EXISTS "Users can view own profile and admins can view all" ON public.profiles;

-- Create new secure policies that require authentication
-- Policy for SELECT: Users can only view their own profile, admins can view all
CREATE POLICY "Users can view own profile and admins can view all" 
ON public.profiles 
FOR SELECT 
TO authenticated
USING ((auth.uid() = id) OR (get_current_user_role() = 'admin'));

-- Policy for INSERT: Users can only insert their own profile
CREATE POLICY "Users can insert their own profile" 
ON public.profiles 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = id);

-- Policy for UPDATE: Users can update their own profile basic info
CREATE POLICY "Users can update their own profile basic info" 
ON public.profiles 
FOR UPDATE 
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- Policy for UPDATE: Admins can update any profile role
CREATE POLICY "Admins can update any profile role" 
ON public.profiles 
FOR UPDATE 
TO authenticated
USING (get_current_user_role() = 'admin')
WITH CHECK (get_current_user_role() = 'admin');

-- Ensure RLS is enabled (it should already be, but double-check)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Test that the fix works by trying to access data without authentication
-- This should return no results now
SELECT COUNT(*) as "Should_Be_Zero_Without_Auth" FROM profiles;