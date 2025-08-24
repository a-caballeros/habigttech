-- Check if our function exists and recreate it with better logic
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;

-- Create the improved function to handle user_type from metadata
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
DECLARE
    user_type_value text;
    full_name_value text;
BEGIN
    -- Get user_type from raw_user_meta_data, default to 'client'
    user_type_value := COALESCE(NEW.raw_user_meta_data ->> 'user_type', 'client');
    full_name_value := NEW.raw_user_meta_data ->> 'full_name';
    
    -- Debug log
    RAISE LOG 'Creating profile for user % with user_type: % and full_name: %', 
        NEW.id, user_type_value, full_name_value;
    
    -- Insert the profile with the correct user_type
    INSERT INTO public.profiles (
        id, 
        user_type, 
        role,
        full_name, 
        email
    ) VALUES (
        NEW.id, 
        user_type_value,
        user_type_value, -- role should match user_type
        full_name_value,
        NEW.email
    );
    
    RETURN NEW;
EXCEPTION WHEN OTHERS THEN
    RAISE LOG 'Error in handle_new_user: %', SQLERRM;
    RETURN NEW; -- Don't block user creation if profile creation fails
END;
$$;

-- Recreate the trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();