-- Add avatar_url column to profiles table
ALTER TABLE public.profiles 
ADD COLUMN avatar_url TEXT;

-- Add role column to profiles table (default to 'client')
ALTER TABLE public.profiles 
ADD COLUMN role TEXT DEFAULT 'client' CHECK (role IN ('client', 'agent', 'admin'));

-- Update the handle_new_user function to include role and avatar
CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
  INSERT INTO public.profiles (id, user_type, email, full_name, role, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'user_type', 'client'),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', ''),
    COALESCE(NEW.raw_user_meta_data->>'role', 'client'),
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$function$

-- Create trigger for automatic profile creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();