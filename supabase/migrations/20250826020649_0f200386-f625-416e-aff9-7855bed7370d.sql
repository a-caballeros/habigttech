-- Update the check constraint to allow 'admin' as a valid user_type
ALTER TABLE public.profiles 
DROP CONSTRAINT IF EXISTS profiles_user_type_check;

ALTER TABLE public.profiles 
ADD CONSTRAINT profiles_user_type_check 
CHECK (user_type IN ('client', 'agent', 'admin'));

-- Now ensure caballerosalfonso@gmail.com has full admin privileges  
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

-- Update existing record if it exists
UPDATE public.profiles 
SET 
  user_type = 'admin',
  role = 'admin'
WHERE email = 'caballerosalfonso@gmail.com';