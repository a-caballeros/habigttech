-- Add foreign key constraint between properties and profiles
ALTER TABLE public.properties 
ADD CONSTRAINT properties_agent_id_fkey 
FOREIGN KEY (agent_id) REFERENCES public.profiles(id) ON DELETE CASCADE;