import { supabase } from '@/integrations/supabase/client';

export const forceLogout = async () => {
  await supabase.auth.signOut();
  window.location.reload();
};