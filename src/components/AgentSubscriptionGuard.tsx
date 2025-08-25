import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useSubscription } from '@/hooks/useSubscription';

interface AgentSubscriptionGuardProps {
  children: React.ReactNode;
}

const AgentSubscriptionGuard = ({ children }: AgentSubscriptionGuardProps) => {
  const { userType, loading: authLoading } = useAuth();
  const { hasActiveSubscription, loading: subscriptionLoading } = useSubscription();
  const navigate = useNavigate();

  useEffect(() => {
    // Only check for agents (not admins) and when not loading
    if (!authLoading && !subscriptionLoading && userType === 'agent' && !hasActiveSubscription) {
      console.log('Agent without subscription detected, redirecting to pricing');
      navigate('/subscription');
    }
  }, [userType, hasActiveSubscription, authLoading, subscriptionLoading, navigate]);

  // Show loading while checking
  if (authLoading || subscriptionLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return <>{children}</>;
};

export default AgentSubscriptionGuard;