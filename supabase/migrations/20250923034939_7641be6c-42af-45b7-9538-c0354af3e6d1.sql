-- Add privacy settings to profiles table for agents
ALTER TABLE public.profiles 
ADD COLUMN hide_email boolean DEFAULT false,
ADD COLUMN hide_phone boolean DEFAULT false;