-- Add amenities column to properties table
ALTER TABLE public.properties 
ADD COLUMN amenities TEXT[] DEFAULT '{}';

-- Add a comment to document the amenities column
COMMENT ON COLUMN public.properties.amenities IS 'Array of amenities: piscina, cocina_equipada, sala_equipada, cuartos_equipados, lavanderia_equipada, seguridad_24_7, balcon, jardin, terraza, parqueo_techado';