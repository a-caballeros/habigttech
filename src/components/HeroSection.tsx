import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin } from "lucide-react";
import { useState } from "react";
import heroImage from "@/assets/hero-guatemala.jpg";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage}
          alt="Beautiful Guatemalan Properties"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        {/* Main Heading */}
        <div className="max-w-4xl mx-auto mb-8">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Encuentra tu próximo
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-glow to-accent">
              hogar en Guatemala
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 font-light leading-relaxed">
            La forma más simple de buscar, encontrar y conectar con las mejores propiedades del país
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-muted-foreground" />
            </div>
            <Input 
              placeholder="Buscar por ubicación, tipo de propiedad o palabras clave..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-6 text-lg bg-white/95 backdrop-blur border-0 shadow-strong focus:bg-white transition-smooth"
            />
            <Button 
              size="lg" 
              className="absolute inset-y-0 right-0 m-1 px-8"
            >
              Buscar
            </Button>
          </div>
        </div>

        {/* Quick Search Options */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {['Zona 14', 'Antigua', 'CAES', 'Zona 11', 'Mixco'].map((location) => (
            <Button 
              key={location}
              variant="outline" 
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur transition-smooth"
            >
              <MapPin className="h-4 w-4 mr-2" />
              {location}
            </Button>
          ))}
        </div>

      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;