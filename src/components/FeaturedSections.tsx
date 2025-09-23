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
  images: string[] | null;
  agent_id: string;
  description?: string;
  amenities?: string[];
  agent: {
    id: string;
    full_name: string;
    avatar_url: string | null;
    agency: string | null;
  } | null;
}

interface FeaturedSectionsProps {
  onPropertyClick?: (propertyId: string) => void;
}

const FeaturedSections = ({ onPropertyClick }: FeaturedSectionsProps) => {
  const navigate = useNavigate();
  const [recentProperties, setRecentProperties] = useState<Property[]>([]);
  const [propertyCount, setPropertyCount] = useState(0);
  const [avatarCacheKey, setAvatarCacheKey] = useState(Date.now());

  useEffect(() => {
    const handleAvatarUpdate = () => {
      setAvatarCacheKey(Date.now());
    };

    window.addEventListener('avatar-updated', handleAvatarUpdate);
    return () => window.removeEventListener('avatar-updated', handleAvatarUpdate);
  }, []);
  const [agentCount, setAgentCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const handlePropertyClick = (propertyId: string) => {
    onPropertyClick?.(propertyId);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching properties for featured sections...');
        // Fetch recent properties with agents
        const { data: properties, error: propertiesError } = await supabase
          .from('properties')
          .select(`
            *,
            profiles(
              id,
              full_name,
              avatar_url,
              agency
            )
          `)
          .eq('status', 'active')
          .order('created_at', { ascending: false })
          .limit(6);

        if (propertiesError) {
          console.error('Error fetching properties:', propertiesError);
          throw propertiesError;
        }

        console.log('Fetched properties:', properties);

        const propertiesWithAgents = (properties || []).map(property => ({
          ...property,
          agent: Array.isArray(property.profiles) ? property.profiles[0] : property.profiles
        }));

        // Fetch stats
        const { count: propCount } = await supabase
          .from('properties')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'active');

        const { count: agCount } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true })
          .eq('user_type', 'agent');

        setRecentProperties(propertiesWithAgents);
        setPropertyCount(propCount || 0);
        setAgentCount(agCount || 0);
        console.log('Properties updated:', propertiesWithAgents.length);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Set up real-time subscription for new properties
    const channel = supabase
      .channel('properties-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'properties' }, 
        (payload) => {
          console.log('Property change detected:', payload);
          // Refetch data when properties change
          fetchData();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="py-16 bg-background space-y-16">
      {/* Featured Properties Section */}
      <FeaturedPropertiesSection onPropertyClick={handlePropertyClick} />
      
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
              <Card 
                key={property.id} 
                className="group hover:shadow-lg transition-all duration-300 cursor-pointer"
                onClick={() => handlePropertyClick(property.id)}
              >
                <div className="relative overflow-hidden rounded-t-lg">
                  {property.images && property.images.length > 0 ? (
                    <img 
                      src={property.images[0]}
                      alt={property.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                      <Building className="h-12 w-12 text-muted-foreground/50" />
                    </div>
                  )}
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="absolute top-3 right-3 bg-white/80 hover:bg-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      const newFavorites = new Set(favorites);
                      if (favorites.has(property.id)) {
                        newFavorites.delete(property.id);
                      } else {
                        newFavorites.add(property.id);
                      }
                      setFavorites(newFavorites);
                    }}
                  >
                    <Heart className={`h-4 w-4 transition-colors ${
                      favorites.has(property.id) 
                        ? 'fill-red-500 text-red-500' 
                        : 'text-muted-foreground hover:text-red-400'
                    }`} />
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
                  </div>
                  
                  {/* Agent Info */}
                  {property.agent && (
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                      <div className="flex items-center gap-2">
                        <img 
                          src={property.agent.avatar_url ? `${property.agent.avatar_url}?t=${avatarCacheKey}` : '/placeholder.svg'}
                          alt={property.agent.full_name || 'Agente'}
                          className="w-6 h-6 rounded-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = '/placeholder.svg';
                          }}
                        />
                        <div>
                          <p className="text-xs font-medium text-foreground">
                            {property.agent.full_name}
                          </p>
                          {property.agent.agency && (
                            <p className="text-xs text-muted-foreground">
                              {property.agent.agency}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Eye className="h-4 w-4" />
                        <MessageCircle className="h-4 w-4" />
                      </div>
                    </div>
                  )}
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
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Únete a Habi.gt</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Forma parte de la comunidad inmobiliaria líder de Guatemala
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Agent Registration */}
          <Card className="group relative overflow-hidden border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
            <CardContent className="relative p-8 text-center">
              <div className="text-6xl mb-8">🏢</div>
              <Button 
                size="lg" 
                className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => navigate('/auth?type=agent')}
              >
                Registrarme como Agente
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </CardContent>
          </Card>

          {/* Client Registration */}
          <Card className="group relative overflow-hidden border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
            <CardContent className="relative p-8 text-center">
              <div className="text-6xl mb-8">🏠</div>
              <Button 
                size="lg" 
                className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl py-6 font-semibold text-lg group-hover:scale-105"
                onClick={() => navigate('/auth?type=client')}
              >
                Registrarme como Cliente
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default FeaturedSections;