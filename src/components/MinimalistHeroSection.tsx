import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ChevronDown, Building } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { supabase } from "@/integrations/supabase/client";
import heroImage from "@/assets/hero-guatemala.jpg";

interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  images: string[] | null;
  promoted?: boolean;
}

const MinimalistHeroSection = () => {
  const navigate = useNavigate();
  const { userType } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch real properties from database
  useEffect(() => {
    const fetchFeaturedProperties = async () => {
      try {
        // First try to get promoted properties
        const { data: promotedProps } = await supabase
          .from('properties')
          .select('id, title, price, location, images, promoted')
          .eq('status', 'active')
          .eq('promoted', true)
          .order('promoted_at', { ascending: false })
          .limit(4);

        let properties = promotedProps || [];

        // If we don't have enough promoted properties, fill with recent ones
        if (properties.length < 4) {
          const { data: recentProps } = await supabase
            .from('properties')
            .select('id, title, price, location, images, promoted')
            .eq('status', 'active')
            .order('created_at', { ascending: false })
            .limit(4 - properties.length);

          properties = [...properties, ...(recentProps || [])];
        }

        // If still no properties, use fallback
        if (properties.length === 0) {
          properties = [{
            id: 'fallback',
            title: 'Bienvenido a Habi.gt',
            price: 0,
            location: 'Guatemala',
            images: [heroImage],
            promoted: false
          }];
        }

        setFeaturedProperties(properties);
      } catch (error) {
        console.error('Error fetching featured properties:', error);
        // Use fallback on error
        setFeaturedProperties([{
          id: 'fallback',
          title: 'Bienvenido a Habi.gt',
          price: 0,
          location: 'Guatemala',
          images: [heroImage],
          promoted: false
        }]);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProperties();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to a search results page or filter current properties
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  if (loading) {
    return (
      <section className="relative min-h-screen bg-background">
        <div className="relative h-screen">
          <div className="w-full h-full bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Cargando propiedades...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen bg-background">
      {/* Hero Carousel */}
      <div className="relative h-screen">
        <Carousel className="w-full h-full">
          <CarouselContent>
            {featuredProperties.map((property) => (
              <CarouselItem key={property.id} className="relative">
                <div className="relative h-screen overflow-hidden">
                  {property.images && property.images.length > 0 ? (
                    <img
                      src={property.images[0]}
                      alt={property.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                      <Building className="h-24 w-24 text-primary/30" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  
                  {/* Search Bar - Centered */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl px-4">
                    <div className="text-center mb-8">
                      <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight">
                        Encuentra tu hogar ideal
                      </h1>
                      <p className="text-lg md:text-xl text-white/90 font-light">
                        Miles de propiedades te esperan en Guatemala
                      </p>
                    </div>
                    
                    <form onSubmit={handleSearch} className="relative">
                      <div className="relative flex items-center">
                        <Input
                          type="text"
                          placeholder="Buscar por ubicación, tipo de propiedad..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full pl-12 pr-4 py-4 text-lg bg-white/95 backdrop-blur-sm border-white/20 rounded-full focus:ring-2 focus:ring-primary focus:border-transparent placeholder:text-muted-foreground/70"
                        />
                        <Search className="absolute left-4 h-5 w-5 text-muted-foreground" />
                        <Button 
                          type="submit"
                          size="lg"
                          className="absolute right-2 rounded-full px-6 bg-primary hover:bg-primary/90"
                        >
                          Buscar
                        </Button>
                      </div>
                    </form>
                  </div>
                  
                  {/* Property Info Overlay */}
                  <div className="absolute bottom-4 md:bottom-8 left-4 md:left-8 text-white max-w-sm md:max-w-md">
                    <p className="text-xs md:text-sm font-medium text-white/80 mb-1 md:mb-2">{property.location}</p>
                    <h3 className="text-lg md:text-2xl lg:text-3xl font-bold mb-1 md:mb-2 line-clamp-2">{property.title}</h3>
                    {property.price > 0 && (
                      <p className="text-base md:text-xl font-semibold">Q{property.price.toLocaleString()}</p>
                    )}
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2 md:left-4 bg-white/20 hover:bg-white/30 border-white/20 text-white" />
          <CarouselNext className="right-2 md:right-4 bg-white/20 hover:bg-white/30 border-white/20 text-white" />
        </Carousel>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="h-5 w-5 md:h-6 md:w-6 text-white drop-shadow-lg" />
      </div>
    </section>
  );
};

export default MinimalistHeroSection;