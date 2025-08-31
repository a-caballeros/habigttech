-- Primero actualizar la restricción para permitir 'admin' como user_type
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_user_type_check;
ALTER TABLE public.profiles ADD CONSTRAINT profiles_user_type_check 
CHECK (user_type IN ('client', 'agent', 'admin'));

-- Ahora crear el perfil de super usuario para caballerosalfonso@gmail.com
INSERT INTO public.profiles (
  id, 
  user_type, 
  role, 
  full_name, 
  email
)
VALUES (
  '884e1f47-bbe4-4dd6-97d7-6e2efd5f0883'::uuid,
  'admin',
  'admin',
  'Alfonso Caballeros',
  'caballerosalfonso@gmail.com'
)
ON CONFLICT (id) DO UPDATE SET
  user_type = 'admin',
  role = 'admin',
  full_name = 'Alfonso Caballeros',
  email = 'caballerosalfonso@gmail.com';