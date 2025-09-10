import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ArrowRight, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
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
  const [propertyCount] = useState(0);
  const [salesCount] = useState(0);
  const [clientCount] = useState(0);

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

      {/* Search Bar Overlay */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl px-4 z-10">
        <div className="text-center mb-8">
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
            Encuentra tu hogar ideal
          </h1>
          <p className="font-body text-lg md:text-xl text-white/90 font-light max-w-2xl mx-auto">
            La plataforma inmobiliaria más avanzada de Guatemala
          </p>
        </div>

        {/* Search Form - Dark Theme */}
        <div className="bg-black/20 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-elegant">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-white/70 mb-2">
                Ubicación
              </label>
              <Input
                placeholder="Ciudad, zona o ubicación específica"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border-0 bg-white/10 placeholder:text-white/50 text-white focus:bg-white/20 backdrop-blur-sm"
              />
            </div>
            <div className="md:w-48">
              <label className="block text-sm font-medium text-white/70 mb-2">
                Tipo de propiedad
              </label>
              <select className="w-full h-10 px-3 rounded-md border-0 bg-white/10 text-white focus:bg-white/20 text-sm backdrop-blur-sm">
                <option className="bg-background text-foreground">Casa</option>
                <option className="bg-background text-foreground">Apartamento</option>
                <option className="bg-background text-foreground">Terreno</option>
                <option className="bg-background text-foreground">Comercial</option>
              </select>
            </div>
            <div className="md:w-48">
              <label className="block text-sm font-medium text-white/70 mb-2">
                Presupuesto
              </label>
              <select className="w-full h-10 px-3 rounded-md border-0 bg-white/10 text-white focus:bg-white/20 text-sm backdrop-blur-sm">
                <option className="bg-background text-foreground">Cualquiera</option>
                <option className="bg-background text-foreground">Q300K - Q500K</option>
                <option className="bg-background text-foreground">Q500K - Q1M</option>
                <option className="bg-background text-foreground">Q1M - Q2M</option>
                <option className="bg-background text-foreground">Q2M+</option>
              </select>
            </div>
            <div className="md:w-auto flex items-end">
              <Button 
                size="lg" 
                className="w-full md:w-auto px-8 bg-white text-black hover:bg-white/90 font-medium"
              >
                <Search className="h-5 w-5 mr-2" />
                Buscar
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-background py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl md:text-5xl font-bold text-primary">{propertyCount.toLocaleString()}</div>
              <p className="text-muted-foreground">Propiedades Activas</p>
            </div>
            <div className="space-y-2">
              <div className="text-4xl md:text-5xl font-bold text-primary">{salesCount.toLocaleString()}</div>
              <p className="text-muted-foreground">Ventas este Mes</p>
            </div>
            <div className="space-y-2">
              <div className="text-4xl md:text-5xl font-bold text-primary">{clientCount.toLocaleString()}</div>
              <p className="text-muted-foreground">Clientes Satisfechos</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="h-6 w-6 text-white" />
      </div>
    </section>
  );
};

export default MinimalistHeroSection;