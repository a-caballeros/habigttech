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
      <div className="relative h-screen">
        <Carousel className="w-full h-full">
          <CarouselContent>
            {featuredProperties.map((property) => (
              <CarouselItem key={property.id} className="relative">
                <div className="relative h-screen overflow-hidden">
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


      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="h-6 w-6 text-white drop-shadow-lg" />
      </div>
    </section>
  );
};

export default MinimalistHeroSection;