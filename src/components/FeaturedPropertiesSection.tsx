import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, MapPin, Bed, Bath, Square, Car,
  Eye, MessageCircle, Star, Building
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface FeaturedProperty {
  id: string;
  title: string;
  price: number;
  location: string;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  images: string[] | null;
  agent_id: string;
  promoted: boolean;
  description?: string;
  amenities?: string[];
  agent: {
    id: string;
    full_name: string;
    avatar_url: string | null;
    agency: string | null;
  } | null;
}

interface FeaturedPropertiesSectionProps {
  onPropertyClick?: (propertyId: string) => void;
}

const FeaturedPropertiesSection = ({ onPropertyClick }: FeaturedPropertiesSectionProps) => {
  const [featuredProperties, setFeaturedProperties] = useState<FeaturedProperty[]>([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchFeaturedProperties = async () => {
      try {
        const { data, error } = await supabase
          .from('properties')
          .select(`
            *,
            profiles!properties_agent_id_fkey(
              id,
              full_name,
              avatar_url,
              agency
            )
          `)
          .eq('promoted', true)
          .eq('status', 'active')
          .order('promoted_at', { ascending: false })
          .limit(6);

        if (error) throw error;

        console.log('Featured properties raw data:', data); // Debug log
        const processedData = (data || []).map(property => ({
          ...property,
          agent: property.profiles || null
        }));
        setFeaturedProperties(processedData);
      } catch (error) {
        console.error('Error fetching featured properties:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProperties();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Propiedades Destacadas
            </h2>
            <p className="text-muted-foreground">
              Descubre las mejores oportunidades inmobiliarias
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-muted animate-pulse rounded-lg h-80" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (featuredProperties.length === 0) {
    return (
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Propiedades Destacadas
            </h2>
            <p className="text-muted-foreground">
              Próximamente tendremos propiedades destacadas
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Propiedades Destacadas
          </h2>
          <p className="text-muted-foreground">
            Descubre las mejores oportunidades inmobiliarias
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProperties.map((property) => (
            <Card 
              key={property.id} 
              className="group hover:shadow-lg transition-all duration-300 cursor-pointer"
              onClick={() => onPropertyClick?.(property.id)}
            >
              <div className="relative overflow-hidden rounded-t-lg">
                  {property.images && Array.isArray(property.images) && property.images.length > 0 ? (
                    <img 
                      src={property.images[0]}
                      alt={property.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        console.log('Image load error for:', property.images[0]);
                        e.currentTarget.src = "/placeholder.svg";
                      }}
                    />
                  ) : (
                    <div className="w-full h-48 bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                      <Building className="h-12 w-12 text-muted-foreground/50" />
                    </div>
                  )}
                <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
                  <Star className="h-3 w-3 mr-1" />
                  Destacada
                </Badge>
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
                        src={property.agent.avatar_url || '/placeholder.svg'}
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
      </div>
    </section>
  );
};

export default FeaturedPropertiesSection;