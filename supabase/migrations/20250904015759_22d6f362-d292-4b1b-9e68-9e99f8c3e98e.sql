-- Update the handle_new_user function to properly handle user_type from metadata
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
$function$