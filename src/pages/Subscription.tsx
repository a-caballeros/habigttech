import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Check, Crown, Star, Award, Diamond } from 'lucide-react';

interface SubscriptionTier {
  id: string;
  name: string;
  monthly_price: number;
  annual_price: number;
  property_limit: number | null;
  description: string;
}

const Subscription = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signUp, user } = useAuth();
  const [tiers, setTiers] = useState<SubscriptionTier[]>([]);
  const [selectedTier, setSelectedTier] = useState<string>('');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Get signup data from navigation state
  const signupData = location.state as {
    email: string;
    password: string;
    fullName: string;
  } | null;

  useEffect(() => {
    // Allow existing agents to access subscription page
    if (user && !signupData) {
      // This is an existing user accessing the subscription page
      fetchSubscriptionTiers();
      return;
    }

    if (user && signupData) {
      navigate('/');
      return;
    }

    if (!signupData && !user) {
      navigate('/auth');
      return;
    }

    fetchSubscriptionTiers();
  }, [user, signupData, navigate]);

  const fetchSubscriptionTiers = async () => {
    const { data, error } = await supabase
      .from('subscription_tiers')
      .select('*')
      .order('monthly_price');

    if (error) {
      console.error('Error fetching tiers:', error);
    } else {
      setTiers(data || []);
    }
  };

  const getTierIcon = (tierName: string) => {
    switch (tierName.toLowerCase()) {
      case 'bronce':
        return <Award className="h-8 w-8 text-amber-600" />;
      case 'plata':
        return <Star className="h-8 w-8 text-gray-500" />;
      case 'oro':
        return <Crown className="h-8 w-8 text-yellow-500" />;
      case 'platino':
        return <Diamond className="h-8 w-8 text-blue-500" />;
      default:
        return <Award className="h-8 w-8" />;
    }
  };

  const getTierBadgeVariant = (tierName: string) => {
    switch (tierName.toLowerCase()) {
      case 'oro':
        return 'default';
      case 'platino':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  const handleSubscribe = async () => {
    if (!selectedTier) {
      setError('Por favor selecciona un plan');
      return;
    }

    setLoading(true);
    setError('');

    try {
      if (signupData) {
        // This is a new user registration flow - signUp with agent metadata
        const { error: signUpError } = await signUp(
          signupData.email,
          signupData.password,
          {
            user_type: 'agent',
            full_name: signupData.fullName,
            tier_id: selectedTier,
            billing_cycle: billingCycle
          }
        );

        if (signUpError) {
          setError(signUpError.message);
          setLoading(false);
          return;
        }

        // Show success message and redirect to login
        setError('');
        alert('Registro exitoso. Revisa tu correo para verificar tu cuenta antes de iniciar sesión.');
        navigate('/auth');
      } else {
        // This is an existing user subscribing
        // Create/update the subscription
        const { error: subscriptionError } = await supabase
          .from('agent_subscriptions')
          .upsert({
            agent_id: user?.id,
            tier_id: selectedTier,
            billing_cycle: billingCycle,
            status: 'active',
            current_period_end: new Date(Date.now() + (billingCycle === 'monthly' ? 30 : 365) * 24 * 60 * 60 * 1000).toISOString(),
            updated_at: new Date().toISOString()
          }, {
            onConflict: 'agent_id'
          });

        if (subscriptionError) {
          setError('Error al procesar la suscripción: ' + subscriptionError.message);
          setLoading(false);
          return;
        }

        // Update user profile to agent for all tiers
        const { error: profileError } = await supabase
          .from('profiles')
          .update({ 
            user_type: 'agent',
            role: 'agent'
          })
          .eq('id', user?.id);

        if (profileError) {
          console.error('Error updating profile:', profileError);
          setError('Error al actualizar el perfil: ' + profileError.message);
          setLoading(false);
          return;
        }

        alert('¡Suscripción activada exitosamente!');
        
        // Force reload to refresh the auth context with updated profile
        window.location.href = '/';
      }
    } catch (error) {
      setError('Error durante el proceso. Por favor intenta de nuevo.');
    }

    setLoading(false);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-GT', {
      style: 'currency',
      currency: 'GTQ',
    }).format(price);
  };

  const getPropertyLimitText = (limit: number | null) => {
    if (!limit) return 'Propiedades ilimitadas';
    
    // Convert the database limits to the display text requested
    if (limit === 5) return 'Agrega hasta 5 propiedades/mes';
    if (limit === 15) return 'Agrega hasta 10 propiedades/mes';
    if (limit === 50) return 'Agrega hasta 15 propiedades/mes';
    
    return `Agrega hasta ${limit} propiedades/mes`;
  };

  // Show loading if we're checking user state
  if (!signupData && !user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/5 p-4">
      <div className="max-w-6xl mx-auto py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Planes de Suscripción para Agentes</h1>
          <p className="text-muted-foreground">
            {signupData 
              ? "Elige el plan que mejor se adapte a tus necesidades profesionales"
              : "Actualiza tu plan para acceder a todas las funcionalidades"
            }
          </p>
        </div>

        <Tabs value={billingCycle} onValueChange={(value) => setBillingCycle(value as 'monthly' | 'annual')} className="mb-8">
          <TabsList className="grid w-full max-w-sm mx-auto grid-cols-2">
            <TabsTrigger value="monthly">Mensual</TabsTrigger>
            <TabsTrigger value="annual">Anual</TabsTrigger>
          </TabsList>

          <TabsContent value={billingCycle} className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {tiers.map((tier) => (
                <Card 
                  key={tier.id}
                  className={`relative cursor-pointer transition-all duration-300 hover:shadow-lg ${
                    selectedTier === tier.id ? 'ring-2 ring-primary shadow-lg' : ''
                  } ${tier.name.toLowerCase() === 'oro' ? 'border-yellow-500 shadow-md' : ''}`}
                  onClick={() => setSelectedTier(tier.id)}
                >
                  {tier.name.toLowerCase() === 'oro' && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-white">
                      Más Popular
                    </Badge>
                  )}
                  
                  <CardHeader className="text-center pb-4">
                    <div className="flex justify-center mb-2">
                      {getTierIcon(tier.name)}
                    </div>
                    <CardTitle className="text-xl">{tier.name}</CardTitle>
                    <CardDescription className="text-sm">
                      {tier.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <div className="text-center mb-6">
                      <div className="text-3xl font-bold">
                        {formatPrice(billingCycle === 'monthly' ? tier.monthly_price : tier.annual_price)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        por {billingCycle === 'monthly' ? 'mes' : 'año'}
                      </div>
                      {billingCycle === 'annual' && (
                        <div className="text-xs text-success mt-1">
                          Ahorra {formatPrice(tier.monthly_price * 12 - tier.annual_price)} al año
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-success flex-shrink-0" />
                        <span className="text-sm">{getPropertyLimitText(tier.property_limit)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-success flex-shrink-0" />
                        <span className="text-sm">Perfil de agente verificado</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-success flex-shrink-0" />
                        <span className="text-sm">Sistema de mensajería</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-success flex-shrink-0" />
                        <span className="text-sm">Estadísticas básicas</span>
                      </div>
                      {(tier.name.toLowerCase() === 'oro' || tier.name.toLowerCase() === 'platino') && (
                        <>
                          <div className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-success flex-shrink-0" />
                            <span className="text-sm">Promoción destacada</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-success flex-shrink-0" />
                            <span className="text-sm">Estadísticas avanzadas</span>
                          </div>
                        </>
                      )}
                      {tier.name.toLowerCase() === 'platino' && (
                        <>
                          <div className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-success flex-shrink-0" />
                            <span className="text-sm">Soporte prioritario</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-success flex-shrink-0" />
                            <span className="text-sm">API de integración</span>
                          </div>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="text-center">
          <Button 
            onClick={handleSubscribe}
            disabled={!selectedTier || loading}
            size="lg"
            className="px-8 py-3"
          >
            {loading ? 'Procesando...' : (signupData ? 'Registrarse y Suscribirse' : 'Suscribirse')}
          </Button>
          
          <div className="mt-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate(signupData ? '/auth' : '/')}
              disabled={loading}
            >
              {signupData ? 'Volver al registro' : 'Volver al inicio'}
            </Button>
          </div>
        </div>

        {error && (
          <Alert className={`mt-6 max-w-2xl mx-auto ${error.includes('exitoso') ? 'border-success text-success' : 'border-destructive'}`}>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
};

export default Subscription;