-- Remove the trigger so AuthContext can handle profile creation properly
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;