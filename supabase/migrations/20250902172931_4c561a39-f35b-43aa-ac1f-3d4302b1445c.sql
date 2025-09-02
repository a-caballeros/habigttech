-- Recrear la función get_current_user_role para solucionar el problema
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS text
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COALESCE(role, 'client') FROM public.profiles WHERE id = auth.uid();
$$;