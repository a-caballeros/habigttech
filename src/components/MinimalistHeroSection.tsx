import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, ChevronDown, MapPin, Home, DollarSign } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import heroMainImage from "@/assets/hero-guatemala-main.png";


const MinimalistHeroSection = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [priceRange, setPriceRange] = useState("");


  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery.trim()) params.append('search', searchQuery.trim());
    if (location) params.append('location', location);
    if (propertyType) params.append('type', propertyType);
    if (priceRange) params.append('price', priceRange);
    
    navigate(`/?${params.toString()}`);
  };


  return (
    <section className="relative min-h-screen bg-background">
      {/* Main Hero Image */}
      <div className="relative h-screen">
        <div className="relative h-screen overflow-hidden">
          <img
            src={heroMainImage}
            alt="Guatemala City skyline with Habi.gt logo"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          
          {/* Hero Content */}
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
            <div className="mb-8 md:mb-16">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight">
                Encuentra tu hogar ideal
              </h1>
              <p className="text-lg md:text-xl text-white/90 font-light max-w-2xl">
                Miles de propiedades te esperan en Guatemala
              </p>
            </div>
          </div>
          
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="h-5 w-5 md:h-6 md:w-6 text-white drop-shadow-lg" />
      </div>

      {/* Search Bar - Outside hero photo */}
      <div className="bg-background py-8 md:py-12">
        <div className="container mx-auto px-4">
          <form onSubmit={handleSearch} className="bg-card rounded-xl p-4 md:p-6 shadow-lg border max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Search Query */}
              <div className="lg:col-span-2 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Buscar propiedades..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 rounded-lg border-input bg-background"
                />
              </div>
              
              {/* Location */}
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground z-10" />
                <Select value={location} onValueChange={setLocation}>
                  <SelectTrigger className="pl-10 h-12 rounded-lg">
                    <SelectValue placeholder="Ubicación" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="zona-1">Zona 1</SelectItem>
                    <SelectItem value="zona-2">Zona 2</SelectItem>
                    <SelectItem value="zona-9">Zona 9</SelectItem>
                    <SelectItem value="zona-10">Zona 10</SelectItem>
                    <SelectItem value="zona-14">Zona 14</SelectItem>
                    <SelectItem value="zona-15">Zona 15</SelectItem>
                    <SelectItem value="carretera-salvador">Carretera a El Salvador</SelectItem>
                    <SelectItem value="antigua">Antigua Guatemala</SelectItem>
                    <SelectItem value="mixco">Mixco</SelectItem>
                    <SelectItem value="villa-nueva">Villa Nueva</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Property Type */}
              <div className="relative">
                <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground z-10" />
                <Select value={propertyType} onValueChange={setPropertyType}>
                  <SelectTrigger className="pl-10 h-12 rounded-lg">
                    <SelectValue placeholder="Tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="casa">Casa</SelectItem>
                    <SelectItem value="apartamento">Apartamento</SelectItem>
                    <SelectItem value="local_comercial">Local Comercial</SelectItem>
                    <SelectItem value="terreno">Terreno</SelectItem>
                    <SelectItem value="oficina">Oficina</SelectItem>
                    <SelectItem value="bodega">Bodega</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Price Range */}
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground z-10" />
                <Select value={priceRange} onValueChange={setPriceRange}>
                  <SelectTrigger className="pl-10 h-12 rounded-lg">
                    <SelectValue placeholder="Precio" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-100000">GTQ0 - GTQ100,000</SelectItem>
                    <SelectItem value="100000-300000">GTQ100,000 - GTQ300,000</SelectItem>
                    <SelectItem value="300000-500000">GTQ300,000 - GTQ500,000</SelectItem>
                    <SelectItem value="500000-1000000">GTQ500,000 - GTQ1,000,000</SelectItem>
                    <SelectItem value="1000000-2000000">GTQ1,000,000 - GTQ2,000,000</SelectItem>
                    <SelectItem value="2000000+">GTQ2,000,000+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Button 
              type="submit"
              size="lg"
              className="w-full mt-4 h-12 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-semibold"
            >
              <Search className="h-5 w-5 mr-2" />
              Buscar Propiedades
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default MinimalistHeroSection;