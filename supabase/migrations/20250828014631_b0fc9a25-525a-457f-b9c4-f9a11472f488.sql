-- Verificar si el usuario existe y actualizarlo o crear el perfil de admin
INSERT INTO profiles (id, email, full_name, user_type, role)
VALUES (
  (SELECT id FROM auth.users WHERE email = 'caballerosalfonso@gmail.com' LIMIT 1),
  'caballerosalfonso@gmail.com',
  'Alfonso Caballero',
  'admin',
  'admin'
)
ON CONFLICT (id) DO UPDATE SET
  role = 'admin',
  user_type = 'admin'
WHERE profiles.email = 'caballerosalfonso@gmail.com';