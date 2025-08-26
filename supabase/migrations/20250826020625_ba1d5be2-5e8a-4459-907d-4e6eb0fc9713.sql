-- Ensure caballerosalfonso@gmail.com has full admin privileges
UPDATE public.profiles 
SET 
  user_type = 'admin',
  role = 'admin'
WHERE email = 'caballerosalfonso@gmail.com';

-- If the user doesn't exist yet, create a record for when they sign up
INSERT INTO public.profiles (id, user_type, role, email, full_name)
SELECT 
  gen_random_uuid(),
  'admin',
  'admin', 
  'caballerosalfonso@gmail.com',
  'Alfonso Caballeros'
WHERE NOT EXISTS (
  SELECT 1 FROM public.profiles WHERE email = 'caballerosalfonso@gmail.com'
);