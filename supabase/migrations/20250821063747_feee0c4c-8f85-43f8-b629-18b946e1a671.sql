-- Create security definer function to safely retrieve user roles
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS TEXT AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid();
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- Update profiles RLS policies to prevent users from updating their own role
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;

-- Create separate policies for different update operations
CREATE POLICY "Users can update their own profile basic info" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = id)
WITH CHECK (
  auth.uid() = id AND 
  -- Prevent users from updating their role - only allow updating other fields
  (OLD.role IS NOT DISTINCT FROM NEW.role)
);

-- Create admin-only policy for role updates
CREATE POLICY "Admins can update any profile role" 
ON public.profiles 
FOR UPDATE 
USING (public.get_current_user_role() = 'admin')
WITH CHECK (public.get_current_user_role() = 'admin');

-- Add policy to allow admins to view all profiles
CREATE POLICY "Admins can view all profiles" 
ON public.profiles 
FOR SELECT 
USING (
  auth.uid() = id OR 
  public.get_current_user_role() = 'admin'
);