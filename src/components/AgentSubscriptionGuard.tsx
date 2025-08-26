import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useSubscription } from '@/hooks/useSubscription';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface AgentSubscriptionGuardProps {
  children: React.ReactNode;
}

const AgentSubscriptionGuard = ({ children }: AgentSubscriptionGuardProps) => {
  const { user, userType, loading: authLoading } = useAuth();
  const { hasActiveSubscription, loading: subscriptionLoading } = useSubscription();
  const navigate = useNavigate();
  const [showPricing, setShowPricing] = useState(false);

  // Check if user is super admin
  const isSuperAdmin = user?.email === 'caballerosalfonso@gmail.com';

  useEffect(() => {
    // Only check for agents (not admins or super admin) and when not loading
    if (!authLoading && !subscriptionLoading && userType === 'agent' && !isSuperAdmin && !hasActiveSubscription) {
      console.log('Agent without subscription detected, showing pricing');
      setShowPricing(true);
    }
  }, [userType, hasActiveSubscription, authLoading, subscriptionLoading, isSuperAdmin]);

  // Show loading while checking
  if (authLoading || subscriptionLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Show pricing screen overlay if agent needs subscription
  if (showPricing) {
    return (
      <div className="relative">
        {children}
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-background p-8 rounded-lg max-w-md mx-4 relative">
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2"
              onClick={() => setShowPricing(false)}
            >
              <X className="h-4 w-4" />
            </Button>
            <h2 className="text-2xl font-bold mb-4">Suscripción Requerida</h2>
            <p className="text-muted-foreground mb-6">
              Necesitas una suscripción activa para acceder a las funciones de agente.
            </p>
            <div className="flex gap-3">
              <Button onClick={() => navigate('/subscription')} className="flex-1">
                Ver Planes
              </Button>
              <Button variant="outline" onClick={() => {
                setShowPricing(false);
                navigate('/');
              }}>
                Cerrar
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default AgentSubscriptionGuard;