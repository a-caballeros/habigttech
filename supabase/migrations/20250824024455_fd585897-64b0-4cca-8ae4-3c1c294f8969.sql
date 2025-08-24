-- Update existing profiles to have proper user_type
UPDATE public.profiles 
SET user_type = 'client' 
WHERE user_type IS NULL;

-- Ensure user_type column is NOT NULL going forward
ALTER TABLE public.profiles ALTER COLUMN user_type SET NOT NULL;
ALTER TABLE public.profiles ALTER COLUMN user_type SET DEFAULT 'client';