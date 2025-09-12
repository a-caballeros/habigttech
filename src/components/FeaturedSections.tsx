import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, MapPin, Bed, Bath, Square, 
  Eye, MessageCircle, Users, TrendingUp, ArrowRight, Star, Building
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import FeaturedPropertiesSection from "./FeaturedPropertiesSection";

interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  images: string[];
  agent_id: string;
}

const FeaturedSections = () => {
  const navigate = useNavigate();
  const [recentProperties, setRecentProperties] = useState<Property[]>([]);
  const [propertyCount, setPropertyCount] = useState(0);
  const [agentCount, setAgentCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch recent properties
        const { data: properties, error: propertiesError } = await supabase
          .from('properties')
          .select('*')
          .eq('status', 'active')
          .order('created_at', { ascending: false })
          .limit(6);

        if (propertiesError) throw propertiesError;

        // Fetch stats
        const { count: propCount } = await supabase
          .from('properties')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'active');

        const { count: agCount } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true })
          .eq('user_type', 'agent');

        setRecentProperties(properties || []);
        setPropertyCount(propCount || 0);
        setAgentCount(agCount || 0);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="py-16 bg-background space-y-16">
      {/* Featured Properties Section */}
      <FeaturedPropertiesSection />
      
      {/* Recent Properties Section */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Propiedades Recientes
          </h2>
          <p className="text-muted-foreground">
            Las últimas propiedades añadidas a nuestra plataforma
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-muted animate-pulse rounded-lg h-80" />
            ))}
          </div>
        ) : recentProperties.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No hay propiedades disponibles en este momento
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentProperties.map((property) => (
              <Card key={property.id} className="group hover:shadow-lg transition-all duration-300">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img 
                    src={property.images?.[0] || '/placeholder.svg'}
                    alt={property.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="absolute top-3 right-3 bg-white/80 hover:bg-white"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
                
                <CardContent className="p-4">
                  <div className="flex items-center gap-1 text-muted-foreground text-sm mb-2">
                    <MapPin className="h-4 w-4" />
                    {property.location}
                  </div>
                  
                  <h3 className="font-semibold text-lg text-foreground mb-2 line-clamp-2">
                    {property.title}
                  </h3>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    {property.bedrooms && (
                      <div className="flex items-center gap-1">
                        <Bed className="h-4 w-4" />
                        {property.bedrooms}
                      </div>
                    )}
                    {property.bathrooms && (
                      <div className="flex items-center gap-1">
                        <Bath className="h-4 w-4" />
                        {property.bathrooms}
                      </div>
                    )}
                    {property.area && (
                      <div className="flex items-center gap-1">
                        <Square className="h-4 w-4" />
                        {property.area}m²
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">
                      Q{property.price?.toLocaleString()}
                    </span>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Eye className="h-4 w-4" />
                      <MessageCircle className="h-4 w-4" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Statistics Section */}
      <section className="bg-muted py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Nuestra Plataforma en Números
            </h2>
            <p className="text-muted-foreground">
              Creciendo junto a la comunidad inmobiliaria de Guatemala
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-3xl font-bold text-foreground mb-2">
                {propertyCount.toLocaleString()}
              </h3>
              <p className="text-muted-foreground">Propiedades Activas</p>
            </div>

            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-3xl font-bold text-foreground mb-2">
                {agentCount.toLocaleString()}
              </h3>
              <p className="text-muted-foreground">Agentes Registrados</p>
            </div>

            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-3xl font-bold text-foreground mb-2">
                98%
              </h3>
              <p className="text-muted-foreground">Satisfacción de Clientes</p>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Sections */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-semibold mb-4">Únete a Habi.gt</h2>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            Forma parte de la comunidad inmobiliaria más exclusiva de Guatemala
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Agent Registration */}
          <div className="group bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-3xl p-10 text-center shadow-elegant hover:shadow-strong transition-all duration-500 hover:scale-[1.02]">
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-primary/30 transition-all duration-300">
              <Building className="h-10 w-10 text-white" />
            </div>
            <h3 className="font-heading text-2xl font-semibold mb-4 text-foreground">Registro de Agente</h3>
            <p className="font-body text-muted-foreground mb-6 leading-relaxed max-w-sm mx-auto">
              Únete a nuestra red de agentes profesionales. Accede a herramientas exclusivas 
              y conecta con clientes potenciales.
            </p>
            <div className="space-y-2 mb-6">
              <div className="flex items-center justify-center text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                Herramientas profesionales
              </div>
              <div className="flex items-center justify-center text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                Dashboard personalizado
              </div>
              <div className="flex items-center justify-center text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                Red de clientes exclusiva
              </div>
            </div>
            <Button 
              size="lg" 
              className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg font-medium"
              onClick={() => navigate('/auth?type=agent')}
            >
              Registrarse como Agente
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          {/* Client Registration */}
          <div className="group bg-gradient-to-br from-accent/5 to-accent/10 border border-accent/20 rounded-3xl p-10 text-center shadow-elegant hover:shadow-strong transition-all duration-500 hover:scale-[1.02]">
            <div className="w-20 h-20 bg-gradient-to-br from-accent to-accent/80 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-accent/30 transition-all duration-300">
              <Users className="h-10 w-10 text-white" />
            </div>
            <h3 className="font-heading text-2xl font-semibold mb-4 text-foreground">Registro de Cliente</h3>
            <p className="font-body text-muted-foreground mb-6 leading-relaxed max-w-sm mx-auto">
              Descubre propiedades exclusivas y accede a alertas personalizadas. 
              Tu hogar ideal está esperándote.
            </p>
            <div className="space-y-2 mb-6">
              <div className="flex items-center justify-center text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-accent rounded-full mr-2"></div>
                Alertas personalizadas
              </div>
              <div className="flex items-center justify-center text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-accent rounded-full mr-2"></div>
                Propiedades exclusivas
              </div>
              <div className="flex items-center justify-center text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-accent rounded-full mr-2"></div>
                Acceso prioritario
              </div>
            </div>
            <Button 
              size="lg" 
              variant="outline" 
              className="w-full border-accent/30 text-accent hover:bg-accent hover:text-white shadow-lg font-medium"
              onClick={() => navigate('/auth?type=client')}
            >
              Registrarse como Cliente
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeaturedSections;