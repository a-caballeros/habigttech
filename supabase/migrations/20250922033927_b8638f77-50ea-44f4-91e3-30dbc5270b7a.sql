-- Ensure the foreign key relationship exists between properties and profiles
-- Drop existing foreign key if it exists
ALTER TABLE properties DROP CONSTRAINT IF EXISTS properties_agent_id_fkey;

-- Add the foreign key constraint
ALTER TABLE properties 
ADD CONSTRAINT properties_agent_id_fkey 
FOREIGN KEY (agent_id) REFERENCES profiles(id) ON DELETE CASCADE;

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_properties_agent_id ON properties(agent_id);