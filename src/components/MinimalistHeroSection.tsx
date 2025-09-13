import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import heroImage from "@/assets/hero-guatemala.jpg";
import property1 from "@/assets/property1.jpg";
import property2 from "@/assets/property2.jpg";
import property3 from "@/assets/property3.jpg";

const MinimalistHeroSection = () => {
  const navigate = useNavigate();
  const { userType } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");

  // Featured properties for carousel
  const featuredProperties = [
    { id: 1, image: heroImage, title: "Casa Colonial Premium", location: "Antigua Guatemala", price: "Q1,500,000" },
    { id: 2, image: property1, title: "Apartamento Moderno", location: "Zona 14", price: "Q850,000" },
    { id: 3, image: property2, title: "Casa en Condominio", location: "Zona 16", price: "Q1,200,000" },
    { id: 4, image: property3, title: "Penthouse Exclusivo", location: "Zona 10", price: "Q2,800,000" },
  ];

  return (
    <section className="relative min-h-screen bg-background">
      {/* Hero Carousel */}
      <div className="relative h-[70vh]">
        <Carousel className="w-full h-full">
          <CarouselContent>
            {featuredProperties.map((property) => (
              <CarouselItem key={property.id} className="relative">
                <div className="relative h-[70vh] overflow-hidden">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  
                  {/* Property Info Overlay */}
                  <div className="absolute bottom-8 left-8 text-white max-w-md">
                    <p className="text-sm font-medium text-white/80 mb-2">{property.location}</p>
                    <h3 className="text-2xl md:text-3xl font-bold mb-2">{property.title}</h3>
                    <p className="text-xl font-semibold">{property.price}</p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </Carousel>
      </div>

      {/* Search Bar Overlay - Fixed positioning for mobile/tablet */}
      <div className="absolute inset-x-0 bottom-8 md:bottom-16 px-4 z-10">
        <div className="max-w-4xl mx-auto">
          {/* Search Form - Professional glassmorphism design */}
          <div className="bg-card/95 dark:bg-card/80 backdrop-blur-xl border border-border/50 rounded-xl lg:rounded-2xl p-3 md:p-6 shadow-elegant">
            <div className="flex flex-col gap-3 md:gap-4">
              {/* Responsive grid layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4">
                <div className="space-y-1 md:space-y-2">
                  <label className="block text-xs md:text-sm font-medium text-foreground/80">
                    Ubicación
                  </label>
                  <Input
                    placeholder="Ciudad, zona..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-9 md:h-10 text-sm bg-background/50 border-border/50 focus:bg-background"
                  />
                </div>
                
                <div className="space-y-1 md:space-y-2">
                  <label className="block text-xs md:text-sm font-medium text-foreground/80">
                    Tipo
                  </label>
                  <select className="w-full h-9 md:h-10 px-3 rounded-md bg-background/50 border border-border/50 text-foreground text-sm focus:bg-background focus:border-border">
                    <option value="">Seleccionar</option>
                    <option value="casa">Casa</option>
                    <option value="apartamento">Apartamento</option>
                    <option value="terreno">Terreno</option>
                    <option value="comercial">Comercial</option>
                  </select>
                </div>
                
                <div className="space-y-1 md:space-y-2">
                  <label className="block text-xs md:text-sm font-medium text-foreground/80">
                    Presupuesto
                  </label>
                  <select className="w-full h-9 md:h-10 px-3 rounded-md bg-background/50 border border-border/50 text-foreground text-sm focus:bg-background focus:border-border">
                    <option value="">Cualquiera</option>
                    <option value="300-500">Q300K - Q500K</option>
                    <option value="500-1000">Q500K - Q1M</option>
                    <option value="1000-2000">Q1M - Q2M</option>
                    <option value="2000+">Q2M+</option>
                  </select>
                </div>
                
                <div className="flex items-end md:col-span-2 lg:col-span-1">
                  <Button 
                    size="sm" 
                    className="w-full h-9 md:h-10 bg-primary text-primary-foreground hover:bg-primary/90 font-medium text-sm shadow-md"
                  >
                    <Search className="h-4 w-4 mr-2" />
                    Buscar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - Hidden on mobile */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 animate-bounce hidden sm:block">
        <ChevronDown className="h-6 w-6 text-white" />
      </div>
    </section>
  );
};

export default MinimalistHeroSection;