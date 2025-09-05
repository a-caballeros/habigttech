-- First, let's add missing pending registrations for existing agents
INSERT INTO public.pending_registrations (user_id, email, full_name, user_type, status)
SELECT 
  id, 
  email, 
  full_name, 
  'agent'::text, 
  'pending'::text
FROM public.profiles 
WHERE user_type = 'agent' 
  AND id NOT IN (SELECT user_id FROM public.pending_registrations);

-- Update the handle_new_user function to ensure it properly creates pending registrations
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
    -- Use metadata for user_type, ensure it's properly extracted
    user_type_val := COALESCE(NEW.raw_user_meta_data ->> 'user_type', 'client');
    user_role := user_type_val;
    
    -- Debug: log what we're getting from metadata
    RAISE LOG 'User signup - email: %, metadata: %, extracted user_type: %', 
      NEW.email, NEW.raw_user_meta_data, user_type_val;
  END IF;

  -- Insert profile
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

  -- If user is an agent, create a pending registration entry
  IF user_type_val = 'agent' THEN
    INSERT INTO public.pending_registrations (
      user_id,
      email,
      full_name,
      user_type,
      status
    )
    VALUES (
      NEW.id,
      NEW.email,
      NEW.raw_user_meta_data ->> 'full_name',
      'agent',
      'pending'
    );
    
    RAISE LOG 'Created pending registration for agent: %', NEW.email;
  END IF;

  RETURN NEW;
END;
$function$;

-- Add RLS policy to allow admins to delete from pending_registrations table
CREATE POLICY "Admins can delete pending registrations" 
ON public.pending_registrations 
FOR DELETE 
USING (get_current_user_role() = 'admin');

-- Add RLS policy to allow admins to delete from profiles table
CREATE POLICY "Admins can delete profiles" 
ON public.profiles 
FOR DELETE 
USING (get_current_user_role() = 'admin' AND user_type != 'admin');