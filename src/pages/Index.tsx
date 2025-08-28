import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import PremiumHeroSection from "@/components/PremiumHeroSection";
import PremiumFeaturesSection from "@/components/PremiumFeaturesSection";
import PremiumPropertiesSection from "@/components/PremiumPropertiesSection";
import PropertyDetails from "@/components/PropertyDetails";
import AgentDashboard from "@/components/AgentDashboard";
import MessagingSystem from "@/components/MessagingSystem";
import SEOHead from "@/components/SEOHead";
import { useAuth } from "@/contexts/AuthContext";
import { useSubscription } from "@/hooks/useSubscription";

// Import images for property details demo
import property1 from "@/assets/property1.jpg";
import property2 from "@/assets/property2.jpg";
import property3 from "@/assets/property3.jpg";
import agent1 from "@/assets/agent1.jpg";

type ViewType = 'home' | 'property-details' | 'agent-dashboard' | 'messages';
type UserType = 'client' | 'agent';

const Index = () => {
  const navigate = useNavigate();
  const { user, userType: authUserType, loading: authLoading } = useAuth();
  const { hasActiveSubscription, loading: subscriptionLoading } = useSubscription();
  
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [userType, setUserType] = useState<UserType>('client');
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);
  const [propertyCount, setPropertyCount] = useState(0);
  const [agentCount, setAgentCount] = useState(0);

  // Real properties will be loaded from database
  const sampleProperties: any[] = [];

  // Property details data
  const propertyDetailsData = {
    id: '1',
    title: 'Casa Colonial con Jardín Privado',
    price: 'Q1,500,000',
    location: 'Antigua Guatemala, Sacatepéquez',
    bedrooms: 4,
    bathrooms: 3,
    area: 280,
    parking: 2,
    images: [property1, property2, property3],
    hasVideo: true,
    has3DTour: true,
    description: 'Hermosa casa colonial ubicada en el corazón de Antigua Guatemala. Esta propiedad única combina la arquitectura tradicional guatemalteca con comodidades modernas. Cuenta con un jardín privado exuberante, pisos de ladrillo original, techos altos con vigas de madera, y una cocina completamente equipada. La ubicación privilegiada te permite caminar a restaurantes, cafés y sitios históricos. Ideal para familias que buscan vivir rodeados de historia y cultura en una de las ciudades más bellas de Guatemala.',
    features: [
      'Piscina', 'Jardín Privado', 'Cocina Equipada', 'Terraza',
      'Seguridad 24/7', 'Parqueo Techado', 'Balcón', 'Vista al Volcán'
    ],
    agent: {
      name: 'María González',
      photo: agent1,
      tier: 'gold' as const,
      agency: 'Premium Properties GT',
      phone: '+502 1234-5678'
    },
    views: 245
  };

  const handlePropertyClick = (propertyId: string) => {
    setSelectedProperty(propertyId);
    setCurrentView('property-details');
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedProperty(null);
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
        return (
          <PropertyDetails 
            property={propertyDetailsData}
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
            <PremiumHeroSection />
            <PremiumPropertiesSection />
            <PremiumFeaturesSection />
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
      "logo": "https://habi.gt/logo-horizontal.png",
      "sameAs": [
        "https://facebook.com/habi.gt",
        "https://instagram.com/habi.gt"
      ]
    }
  };

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <SEOHead 
        title="Habi.gt - Plataforma Inmobiliaria Premium | Encuentra tu Hogar Ideal en Guatemala"
        description="🏠 Descubre la experiencia inmobiliaria más avanzada de Guatemala. +2,847 propiedades verificadas, agentes certificados y tecnología de vanguardia. Tu hogar ideal te espera en Habi.gt"
        keywords="bienes raíces Guatemala, casas premium Guatemala, apartamentos exclusivos Guatemala, propiedades verificadas Guatemala, inmobiliaria tecnología Guatemala, real estate premium Guatemala, agentes certificados Guatemala, Antigua Guatemala propiedades, Ciudad Guatemala inmobiliaria"
        structuredData={homepageStructuredData}
      />
      <Navigation />
      
      {renderCurrentView()}
    </div>
  );
};

export default Index;
