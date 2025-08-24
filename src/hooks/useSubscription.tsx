import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface SubscriptionStatus {
  hasActiveSubscription: boolean;
  currentTier: string | null;
  loading: boolean;
}

export const useSubscription = () => {
  const { user, userType } = useAuth();
  const [subscription, setSubscription] = useState<SubscriptionStatus>({
    hasActiveSubscription: false,
    currentTier: null,
    loading: true,
  });

  const checkSubscription = async () => {
    console.log('checkSubscription called:', { user: user?.id, userType });
    
    if (!user || userType !== 'agent') {
      console.log('Not an agent or no user, setting no subscription');
      setSubscription({
        hasActiveSubscription: false,
        currentTier: null,
        loading: false,
      });
      return;
    }

    try {
      const { data, error } = await supabase
        .from('agent_subscriptions')
        .select(`
          status,
          tier_id,
          subscription_tiers (
            name
          )
        `)
        .eq('agent_id', user.id)
        .eq('status', 'active')
        .maybeSingle();

      if (error) {
        console.error('Error checking subscription:', error);
        setSubscription({
          hasActiveSubscription: false,
          currentTier: null,
          loading: false,
        });
        return;
      }

      console.log('Subscription query result:', { data, hasActive: !!data });
      
      setSubscription({
        hasActiveSubscription: !!data,
        currentTier: data?.subscription_tiers?.name || null,
        loading: false,
      });
    } catch (error) {
      console.error('Error checking subscription:', error);
      setSubscription({
        hasActiveSubscription: false,
        currentTier: null,
        loading: false,
      });
    }
  };

  useEffect(() => {
    checkSubscription();
  }, [user, userType]);

  return {
    ...subscription,
    refetch: checkSubscription,
  };
};