import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import PropertyCard from "@/components/PropertyCard";
import PropertyFilters from "@/components/PropertyFilters";
import PropertyDetails from "@/components/PropertyDetails";
import AgentDashboard from "@/components/AgentDashboard";
import MessagingSystem from "@/components/MessagingSystem";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Import images
import property1 from "@/assets/property1.jpg";
import property2 from "@/assets/property2.jpg";
import property3 from "@/assets/property3.jpg";
import agent1 from "@/assets/agent1.jpg";
import agent2 from "@/assets/agent2.jpg";

type ViewType = 'home' | 'property-details' | 'agent-dashboard' | 'messages';
type UserType = 'client' | 'agent';

const Index = () => {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [userType, setUserType] = useState<UserType>('client');
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);
  const [propertyCount, setPropertyCount] = useState(2);
  const [agentCount, setAgentCount] = useState(1);

  // Sample property data
  const sampleProperties = [
    {
      id: '1',
      title: 'Casa Colonial con Jardín Privado',
      price: 'Q1,500,000',
      location: 'Antigua Guatemala, Sacatepéquez',
      bedrooms: 4,
      bathrooms: 3,
      area: 280,
      parking: 2,
      images: [property1, property2, property3],
      agent: {
        name: 'María González',
        photo: agent1,
        tier: 'gold' as const
      },
      views: 245,
      isPromoted: true
    },
    {
      id: '2',
      title: 'Apartamento Moderno con Vista',
      price: 'Q850,000',
      location: 'Zona 14, Ciudad de Guatemala',
      bedrooms: 2,
      bathrooms: 2,
      area: 120,
      parking: 1,
      images: [property2, property1, property3],
      agent: {
        name: 'Carlos Mendoza',
        photo: agent2,
        tier: 'silver' as const
      },
      views: 189
    },
    {
      id: '3',
      title: 'Villa con Piscina y Terraza',
      price: 'Q2,200,000',
      location: 'Escuintla, Escuintla',
      bedrooms: 5,
      bathrooms: 4,
      area: 350,
      parking: 3,
      images: [property3, property1, property2],
      agent: {
        name: 'Ana Rodríguez',
        photo: agent1,
        tier: 'gold' as const
      },
      views: 156,
      isPromoted: false
    }
  ];

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
            <HeroSection />
            
            {/* Featured Properties Section */}
            <section className="py-16 bg-muted/30">
              <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                    Propiedades Destacadas
                  </h2>
                  <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Descubre las mejores propiedades disponibles en Guatemala, 
                    cuidadosamente seleccionadas por nuestros agentes expertos
                  </p>
                </div>

                {/* Properties Grid with Filters */}
                <div className="flex gap-8">
                  {/* Sidebar with Filters */}
                  <div className="hidden lg:block w-80 flex-shrink-0">
                    <PropertyFilters />
                  </div>

                  {/* Properties Grid */}
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-6">
                      <p className="text-muted-foreground">
                        {sampleProperties.length} propiedades encontradas
                      </p>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="lg:hidden">
                          Filtros
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                      {sampleProperties.map((property) => (
                        <PropertyCard
                          key={property.id}
                          {...property}
                          onClick={() => handlePropertyClick(property.id)}
                        />
                      ))}
                    </div>

                    {/* Load More */}
                    <div className="text-center mt-12">
                      <Button variant="outline" size="lg">
                        Ver Más Propiedades
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Features Section */}
            <section className="py-16">
              <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12">
                  ¿Por qué Habi.gt?
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-6xl mx-auto">
                  <Card className="text-center">
                    <CardContent className="p-8">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl">🏠</span>
                      </div>
                      <div className="text-3xl font-bold text-primary mb-2">{propertyCount}</div>
                      <h3 className="text-xl font-semibold mb-3">Propiedades Disponibles</h3>
                      <p className="text-muted-foreground">
                        Propiedades verificadas en todo Guatemala esperándote
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="text-center">
                    <CardContent className="p-8">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl">⭐</span>
                      </div>
                      <div className="text-3xl font-bold text-primary mb-2">{Math.floor(agentCount * 0.6)}</div>
                      <h3 className="text-xl font-semibold mb-3">Agentes Certificados</h3>
                      <p className="text-muted-foreground">
                        Trabaja con agentes profesionales y certificados en todo Guatemala
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="text-center">
                    <CardContent className="p-8">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl">📍</span>
                      </div>
                      <div className="text-3xl font-bold text-primary mb-2">22</div>
                      <h3 className="text-xl font-semibold mb-3">Departamentos Cubiertos</h3>
                      <p className="text-muted-foreground">
                        Cobertura nacional en todos los departamentos de Guatemala
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="text-center">
                    <CardContent className="p-8">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl">🔍</span>
                      </div>
                      <div className="text-3xl font-bold text-primary mb-2">{Math.floor(propertyCount * 0.8)}</div>
                      <h3 className="text-xl font-semibold mb-3">Propiedades Verificadas</h3>
                      <p className="text-muted-foreground">
                        Todas nuestras propiedades son verificadas y validadas por nuestro equipo
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="text-center">
                    <CardContent className="p-8">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl">👥</span>
                      </div>
                      <div className="text-3xl font-bold text-primary mb-2">{agentCount}</div>
                      <h3 className="text-xl font-semibold mb-3">Agentes Registrados</h3>
                      <p className="text-muted-foreground">
                        Agentes activos creciendo día a día en nuestra plataforma
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="text-center">
                    <CardContent className="p-8">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl">💬</span>
                      </div>
                      <h3 className="text-xl font-semibold mb-3">Comunicación Directa</h3>
                      <p className="text-muted-foreground">
                        Sistema de mensajería interno para comunicarte directamente con agentes
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </section>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {renderCurrentView()}
    </div>
  );
};

export default Index;
