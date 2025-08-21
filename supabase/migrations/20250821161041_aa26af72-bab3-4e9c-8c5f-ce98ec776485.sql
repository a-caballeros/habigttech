-- Create properties table for real estate listings
CREATE TABLE public.properties (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  agent_id UUID NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  price DECIMAL(12,2) NOT NULL,
  location TEXT NOT NULL,
  property_type TEXT NOT NULL,
  bedrooms INTEGER,
  bathrooms DECIMAL(3,1),
  area INTEGER,
  images TEXT[],
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on properties
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;

-- Policies for properties
CREATE POLICY "Properties are publicly viewable" 
ON public.properties 
FOR SELECT 
USING (status = 'active');

CREATE POLICY "Agents can insert their own properties" 
ON public.properties 
FOR INSERT 
WITH CHECK (auth.uid() = agent_id);

CREATE POLICY "Agents can update their own properties" 
ON public.properties 
FOR UPDATE 
USING (auth.uid() = agent_id);

CREATE POLICY "Agents can delete their own properties" 
ON public.properties 
FOR DELETE 
USING (auth.uid() = agent_id);

-- Add columns to profiles for agent-specific data
ALTER TABLE public.profiles 
ADD COLUMN agency TEXT,
ADD COLUMN bio TEXT,
ADD COLUMN license_number TEXT,
ADD COLUMN budget_max DECIMAL(12,2),
ADD COLUMN preferred_location TEXT,
ADD COLUMN preferred_property_type TEXT;

-- Create trigger for updating timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_properties_updated_at
  BEFORE UPDATE ON public.properties
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Add index for better performance
CREATE INDEX idx_properties_agent_id ON public.properties(agent_id);
CREATE INDEX idx_properties_location ON public.properties(location);
CREATE INDEX idx_properties_property_type ON public.properties(property_type);
CREATE INDEX idx_properties_price ON public.properties(price);