import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MinimalistNavigation from "@/components/MinimalistNavigation";
import MinimalistHeroSection from "@/components/MinimalistHeroSection";
import FeaturedSections from "@/components/FeaturedSections";
import PropertyDetails from "@/components/PropertyDetails";
import AgentDashboard from "@/components/AgentDashboard";
import MessagingSystem from "@/components/MessagingSystem";
import SEOHead from "@/components/SEOHead";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { useSubscription } from "@/hooks/useSubscription";

import { supabase } from "@/integrations/supabase/client";

type ViewType = 'home' | 'property-details' | 'agent-dashboard' | 'messages';
type UserType = 'client' | 'agent';

const Index = () => {
  const navigate = useNavigate();
  const { user, userType: authUserType, loading: authLoading } = useAuth();
  const { hasActiveSubscription, loading: subscriptionLoading } = useSubscription();
  
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [userType, setUserType] = useState<UserType>('client');
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);
  const [propertyData, setPropertyData] = useState<any>(null);
  const [agentData, setAgentData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handlePropertyClick = async (propertyId: string) => {
    setLoading(true);
    try {
      // Fetch property with agent data
      const { data: property, error } = await supabase
        .from('properties')
        .select(`
          *,
          profiles(
            id,
            full_name,
            avatar_url,
            phone,
            agency
          )
        `)
        .eq('id', propertyId)
        .single();

      if (error) throw error;

      if (property) {
        setPropertyData(property);
        setAgentData(Array.isArray(property.profiles) ? property.profiles[0] : property.profiles);
        setSelectedProperty(propertyId);
        setCurrentView('property-details');
      }
    } catch (error) {
      console.error('Error fetching property:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedProperty(null);
    setPropertyData(null);
    setAgentData(null);
  };

  // Check if user is super admin
  const isSuperAdmin = user?.email === 'caballerosalfonso@gmail.com';

  // Redirect new agents to subscription page (except super admin)
  useEffect(() => {
    if (!authLoading && !subscriptionLoading && user && authUserType === 'agent' && !isSuperAdmin) {
      console.log('Checking agent subscription status for redirect:', { 
        hasActiveSubscription, 
        userType: authUserType,
        isSuperAdmin 
      });
      
      if (!hasActiveSubscription) {
        console.log('Agent has no active subscription, but will be handled by AgentSubscriptionGuard');
        // Don't redirect here, let AgentSubscriptionGuard handle it
      }
    }
  }, [user, authUserType, authLoading, subscriptionLoading, hasActiveSubscription, isSuperAdmin]);

  // Real-time counters from database
  useEffect(() => {
    // TODO: Replace with real-time database queries when properties/agents are added
    // This will be connected to Supabase real-time subscriptions
  }, []);


  const renderCurrentView = () => {
    switch (currentView) {
      case 'property-details':
        if (loading) {
          return (
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Cargando propiedad...</p>
              </div>
            </div>
          );
        }
        if (!propertyData || !agentData) {
          return (
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                <p className="text-muted-foreground">Propiedad no encontrada</p>
                <button 
                  onClick={handleBackToHome}
                  className="mt-4 text-primary hover:underline"
                >
                  Volver al inicio
                </button>
              </div>
            </div>
          );
        }
        return (
          <PropertyDetails 
            property={propertyData}
            agent={agentData}
            onBack={handleBackToHome}
          />
        );
      case 'agent-dashboard':
        return <AgentDashboard />;
      case 'messages':
        return <MessagingSystem />;
      default:
        return (
          <>
            <MinimalistHeroSection />
            <FeaturedSections onPropertyClick={handlePropertyClick} />
          </>
        );
    }
  };

  // Enhanced structured data for homepage
  const homepageStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Habi.gt - Plataforma Inmobiliaria Premium",
    "url": "https://habi.gt",
    "description": "La plataforma líder en bienes raíces de Guatemala con tecnología de vanguardia",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://habi.gt/?search={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Habi.gt",
      "logo": "https://habi.gt/habi-isotipo-transparent.png",
      "sameAs": [
        "https://facebook.com/habi.gt",
        "https://instagram.com/habi.gt"
      ]
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead 
        title="Habi.gt - Líder en Bienes Raíces Premium Guatemala | +2,847 Propiedades Verificadas"
        description="Descubre la experiencia inmobiliaria más avanzada de Guatemala. +2,847 propiedades verificadas, agentes certificados y tecnología de vanguardia. Tu hogar ideal te espera en Habi.gt"
        keywords="bienes raíces Guatemala, casas premium Guatemala, apartamentos exclusivos Guatemala, propiedades verificadas Guatemala, inmobiliaria tecnología Guatemala, real estate premium Guatemala, agentes certificados Guatemala, Antigua Guatemala propiedades, Ciudad Guatemala inmobiliaria"
        structuredData={homepageStructuredData}
      />
      <MinimalistNavigation />
      
      
      <main className="flex-1">
        {renderCurrentView()}
      </main>
      <Footer />
    </div>
  );
};

export default Index;
