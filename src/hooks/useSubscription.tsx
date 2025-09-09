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
      // First check for active subscription
      const { data: subscriptionData, error: subscriptionError } = await supabase
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

      if (subscriptionError) {
        console.error('Error checking subscription:', subscriptionError);
      }

      // Also check for admin-assigned tier
      const { data: tierAssignmentData, error: tierError } = await supabase
        .from('agent_tier_assignments')
        .select(`
          tier_id,
          is_active,
          subscription_tiers (
            name
          )
        `)
        .eq('agent_id', user.id)
        .eq('is_active', true)
        .maybeSingle();

      if (tierError) {
        console.error('Error checking tier assignment:', tierError);
      }

      const hasSubscription = !!subscriptionData;
      const hasTierAssignment = !!tierAssignmentData;
      const hasActiveAccess = hasSubscription || hasTierAssignment;

      let currentTierName = null;
      if (tierAssignmentData?.subscription_tiers?.name) {
        currentTierName = tierAssignmentData.subscription_tiers.name;
      } else if (subscriptionData?.subscription_tiers?.name) {
        currentTierName = subscriptionData.subscription_tiers.name;
      }

      console.log('Subscription check result:', { 
        hasSubscription, 
        hasTierAssignment, 
        hasActiveAccess,
        currentTierName 
      });
      
      setSubscription({
        hasActiveSubscription: hasActiveAccess,
        currentTier: currentTierName,
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
    console.log('useSubscription useEffect triggered:', { user: user?.id, userType });
    checkSubscription();
  }, [user, userType]);

  return {
    ...subscription,
    refetch: checkSubscription,
  };
};