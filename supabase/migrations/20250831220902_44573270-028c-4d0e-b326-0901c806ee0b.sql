-- Corregir el perfil de caballerosalfonso@gmail.com para que tenga permisos de admin
UPDATE public.profiles 
SET 
  role = 'admin',
  user_type = 'admin'
WHERE email = 'caballerosalfonso@gmail.com';