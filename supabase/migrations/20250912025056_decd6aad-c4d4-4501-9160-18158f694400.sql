-- Add promoted field to properties table
ALTER TABLE public.properties ADD COLUMN promoted BOOLEAN NOT NULL DEFAULT false;

-- Add promoted_at timestamp
ALTER TABLE public.properties ADD COLUMN promoted_at TIMESTAMP WITH TIME ZONE;

-- Create function to get user's tier limits
CREATE OR REPLACE FUNCTION public.get_user_promotion_limit(user_id UUID)
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  promotion_limit INTEGER := 0;
BEGIN
  -- Check admin-assigned tier first
  SELECT 
    CASE 
      WHEN st.name = 'Plata' THEN 1
      WHEN st.name = 'Oro' THEN 3
      WHEN st.name = 'Platino' THEN 5
      ELSE 0
    END INTO promotion_limit
  FROM public.agent_tier_assignments ata
  JOIN public.subscription_tiers st ON ata.tier_id = st.id
  WHERE ata.agent_id = user_id AND ata.is_active = true
  LIMIT 1;
  
  -- If no admin tier, check subscription tier
  IF promotion_limit IS NULL THEN
    SELECT 
      CASE 
        WHEN st.name = 'Plata' THEN 1
        WHEN st.name = 'Oro' THEN 3
        WHEN st.name = 'Platino' THEN 5
        ELSE 0
      END INTO promotion_limit
    FROM public.agent_subscriptions asub
    JOIN public.subscription_tiers st ON asub.tier_id = st.id
    WHERE asub.agent_id = user_id AND asub.status = 'active'
    LIMIT 1;
  END IF;
  
  RETURN COALESCE(promotion_limit, 0);
END;
$$;

-- Create function to check promotion limit
CREATE OR REPLACE FUNCTION public.check_promotion_limit()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  current_promoted INTEGER;
  promotion_limit INTEGER;
BEGIN
  -- Only check for UPDATE operations when promoted is being set to true
  IF TG_OP = 'UPDATE' AND NEW.promoted = true AND OLD.promoted = false THEN
    -- Count current promoted properties
    SELECT COUNT(*) INTO current_promoted
    FROM public.properties
    WHERE agent_id = NEW.agent_id AND promoted = true AND status = 'active';
    
    -- Get user's promotion limit
    SELECT public.get_user_promotion_limit(NEW.agent_id) INTO promotion_limit;
    
    -- Check if limit would be exceeded
    IF current_promoted >= promotion_limit THEN
      RAISE EXCEPTION 'Has alcanzado el límite de % propiedades promocionadas para tu plan actual.', promotion_limit;
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create trigger for promotion limit check
CREATE TRIGGER check_property_promotion_limit
  BEFORE UPDATE ON public.properties
  FOR EACH ROW
  EXECUTE FUNCTION public.check_promotion_limit();