-- Update the test agent profile to have correct user_type
UPDATE profiles 
SET user_type = 'agent', role = 'agent' 
WHERE email = 'agentepruebahabi@gmail.com' AND user_type = 'client';