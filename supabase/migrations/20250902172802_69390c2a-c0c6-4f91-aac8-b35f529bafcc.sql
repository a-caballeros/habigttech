-- Actualizar el perfil de Alfonso a admin
UPDATE public.profiles 
SET 
  role = 'admin',
  user_type = 'admin'
WHERE email = 'caballerosalfonso@gmail.com';