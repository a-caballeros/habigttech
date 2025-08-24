-- Create admin user function
CREATE OR REPLACE FUNCTION create_admin_user(admin_email text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Update profile to admin if user exists
  UPDATE public.profiles 
  SET 
    user_type = 'admin',
    role = 'admin'
  WHERE email = admin_email;
  
  -- If no rows were updated, the user doesn't exist yet
  IF NOT FOUND THEN
    RAISE NOTICE 'User with email % does not exist yet. They will be granted admin privileges upon signup.', admin_email;
  END IF;
END;
$$;

-- Grant admin privileges to webmaster email
SELECT create_admin_user('webmaster@habigt.tech');

-- Update the handle_new_user function to check for admin emails
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  user_role text := 'client';
  user_type_val text := 'client';
BEGIN
  -- Check if this is an admin email
  IF NEW.email = 'webmaster@habigt.tech' THEN
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
$$;