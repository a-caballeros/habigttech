-- Asignar permisos de super usuario a caballerosalfonso@gmail.com
-- Primero intentar actualizar si existe
UPDATE public.profiles 
SET 
  user_type = 'admin',
  role = 'admin'
WHERE email = 'caballerosalfonso@gmail.com';

-- Si no existe, insertar el perfil
INSERT INTO public.profiles (
  id, 
  user_type, 
  role, 
  full_name, 
  email
)
SELECT 
  '884e1f47-bbe4-4dd6-97d7-6e2efd5f0883'::uuid,
  'admin',
  'admin',
  'Alfonso Caballeros',
  'caballerosalfonso@gmail.com'
WHERE NOT EXISTS (
  SELECT 1 FROM public.profiles WHERE email = 'caballerosalfonso@gmail.com'
);