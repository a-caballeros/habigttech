-- Give super admin privileges to caballerosalfonso@gmail.com
UPDATE public.profiles 
SET 
  user_type = 'admin',
  role = 'admin'
WHERE email = 'caballerosalfonso@gmail.com';

-- If the user doesn't exist yet, they will get admin privileges when they sign up
-- Update the handle_new_user function to include the new admin email
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  user_role text := 'client';
  user_type_val text := 'client';
BEGIN
  -- Check if this is an admin email
  IF NEW.email = 'webmaster@habigt.tech' OR NEW.email = 'caballerosalfonso@gmail.com' THEN
    user_role := 'admin';
    user_type_val := 'admin';
  ELSE
    -- Use metadata or default to client
    user_role := COALESCE(NEW.raw_user_meta_data ->> 'user_type', 'client');
    user_type_val := COALESCE(NEW.raw_user_meta_data ->> 'user_type', 'client');
  END IF;

  INSERT INTO public.profiles (
    id, 
    user_type, 
    role, 
    full_name, 
    email
  )
  VALUES (
    NEW.id,
    user_type_val,
    user_role,
    NEW.raw_user_meta_data ->> 'full_name',
    NEW.email
  );
  RETURN NEW;
END;
$function$;

-- Create a table to track pending user registrations if it doesn't exist
CREATE TABLE IF NOT EXISTS public.pending_registrations (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  full_name text,
  user_type text NOT NULL DEFAULT 'client',
  status text NOT NULL DEFAULT 'pending',
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  approved_by uuid REFERENCES auth.users(id),
  approved_at timestamp with time zone
);

-- Enable RLS on pending registrations
ALTER TABLE public.pending_registrations ENABLE ROW LEVEL SECURITY;

-- Create policies for pending registrations
CREATE POLICY "Admins can view all pending registrations" 
ON public.pending_registrations 
FOR SELECT 
USING (get_current_user_role() = 'admin');

CREATE POLICY "Admins can update pending registrations" 
ON public.pending_registrations 
FOR UPDATE 
USING (get_current_user_role() = 'admin');

CREATE POLICY "System can insert pending registrations" 
ON public.pending_registrations 
FOR INSERT 
WITH CHECK (true);