-- Crear tabla para asignar tiers a agentes por el admin
CREATE TABLE public.agent_tier_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  tier_id UUID NOT NULL REFERENCES public.subscription_tiers(id) ON DELETE CASCADE,
  assigned_by UUID NOT NULL REFERENCES auth.users(id),
  assigned_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  is_active BOOLEAN NOT NULL DEFAULT true,
  notes TEXT,
  UNIQUE(agent_id, is_active) -- Solo un tier activo por agente
);

-- Enable RLS
ALTER TABLE public.agent_tier_assignments ENABLE ROW LEVEL SECURITY;

-- Policies para agent_tier_assignments
CREATE POLICY "Agents can view their own tier assignment" 
ON public.agent_tier_assignments 
FOR SELECT 
USING (auth.uid() = agent_id);

CREATE POLICY "Admin can view all tier assignments" 
ON public.agent_tier_assignments 
FOR SELECT 
USING (get_current_user_role() = 'admin');

CREATE POLICY "Admin can insert tier assignments" 
ON public.agent_tier_assignments 
FOR INSERT 
WITH CHECK (get_current_user_role() = 'admin');

CREATE POLICY "Admin can update tier assignments" 
ON public.agent_tier_assignments 
FOR UPDATE 
USING (get_current_user_role() = 'admin');

-- Crear función para verificar el límite de propiedades por tier
CREATE OR REPLACE FUNCTION public.check_property_limit()
RETURNS TRIGGER AS $$
DECLARE
  current_properties INTEGER;
  property_limit INTEGER;
  agent_tier_limit INTEGER;
BEGIN
  -- Solo verificar para operaciones INSERT
  IF TG_OP = 'INSERT' THEN
    -- Contar propiedades actuales del agente
    SELECT COUNT(*) INTO current_properties
    FROM public.properties
    WHERE agent_id = NEW.agent_id AND status = 'active';
    
    -- Obtener límite del tier asignado por admin
    SELECT st.property_limit INTO agent_tier_limit
    FROM public.agent_tier_assignments ata
    JOIN public.subscription_tiers st ON ata.tier_id = st.id
    WHERE ata.agent_id = NEW.agent_id AND ata.is_active = true
    LIMIT 1;
    
    -- Si no tiene tier asignado por admin, verificar suscripción normal
    IF agent_tier_limit IS NULL THEN
      SELECT st.property_limit INTO property_limit
      FROM public.agent_subscriptions asub
      JOIN public.subscription_tiers st ON asub.tier_id = st.id
      WHERE asub.agent_id = NEW.agent_id AND asub.status = 'active'
      LIMIT 1;
    ELSE
      property_limit := agent_tier_limit;
    END IF;
    
    -- Si no hay límite (tier platino o sin límite), permitir
    IF property_limit IS NULL THEN
      RETURN NEW;
    END IF;
    
    -- Verificar si excede el límite
    IF current_properties >= property_limit THEN
      RAISE EXCEPTION 'Has alcanzado el límite de % propiedades para tu plan actual. Contacta al administrador para actualizar tu tier.', property_limit;
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Crear trigger para verificar límite antes de insertar propiedades
CREATE TRIGGER check_property_limit_trigger
  BEFORE INSERT ON public.properties
  FOR EACH ROW
  EXECUTE FUNCTION public.check_property_limit();