-- Update the user that was registered incorrectly to agent for testing
-- This is just an example, in production you would verify the intended user type
UPDATE public.profiles 
SET user_type = 'agent', role = 'agent' 
WHERE email = 'sfemultiservicios@gmail.com' AND user_type = 'client';