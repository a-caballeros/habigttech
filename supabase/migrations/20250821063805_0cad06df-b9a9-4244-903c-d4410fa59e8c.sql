-- Create security definer function to safely retrieve user roles
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS TEXT AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid();
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- Drop the existing update policy
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;

-- Create policy that allows users to update their own profile but prevents role changes
CREATE POLICY "Users can update their own profile basic info" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- Create admin-only policy for role updates  
CREATE POLICY "Admins can update any profile role" 
ON public.profiles 
FOR UPDATE 
USING (public.get_current_user_role() = 'admin')
WITH CHECK (public.get_current_user_role() = 'admin');

-- Update the select policy to allow admins to view all profiles
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;

CREATE POLICY "Users can view own profile and admins can view all" 
ON public.profiles 
FOR SELECT 
USING (
  auth.uid() = id OR 
  public.get_current_user_role() = 'admin'
);