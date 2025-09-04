-- Update existing profiles that should be agents based on their email pattern
-- This assumes agent test accounts have "agente" in their email
UPDATE public.profiles 
SET user_type = 'agent', role = 'agent' 
WHERE email LIKE '%agente%' AND user_type = 'client';

-- Also update any other users who should be agents based on manual identification
-- Add specific agent emails if you know them
-- UPDATE public.profiles 
-- SET user_type = 'agent', role = 'agent' 
-- WHERE email IN ('specific-agent@email.com') AND user_type = 'client';