import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface AgentApprovalStatus {
  isApproved: boolean;
  loading: boolean;
}

export const useAgentApproval = () => {
  const { user, userType } = useAuth();
  const [approval, setApproval] = useState<AgentApprovalStatus>({
    isApproved: false,
    loading: true,
  });

  const checkApproval = async () => {
    if (!user || userType !== 'agent') {
      setApproval({
        isApproved: false,
        loading: false,
      });
      return;
    }

    try {
      const { data, error } = await supabase
        .from('pending_registrations')
        .select('status')
        .eq('user_id', user.id)
        .eq('status', 'approved')
        .maybeSingle();

      if (error) {
        console.error('Error checking agent approval:', error);
        setApproval({
          isApproved: false,
          loading: false,
        });
        return;
      }

      setApproval({
        isApproved: !!data,
        loading: false,
      });
    } catch (error) {
      console.error('Error checking agent approval:', error);
      setApproval({
        isApproved: false,
        loading: false,
      });
    }
  };

  useEffect(() => {
    checkApproval();
  }, [user, userType]);

  return {
    ...approval,
    refetch: checkApproval,
  };
};