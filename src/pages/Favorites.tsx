import { useState } from "react";
import { Heart, MapPin, Bed, Bath, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";

const Favorites = () => {
  const [favorites] = useState([
    {
      id: 1,
      title: "Casa en Zona 14",
      price: "Q2,500,000",
      location: "Zona 14, Guatemala",
      bedrooms: 3,
      bathrooms: 2,
      area: 180,
      image: "/src/assets/property1.jpg",
      type: "Casa"
    },
    {
      id: 2,
      title: "Apartamento en Antigua",
      price: "Q1,800,000",
      location: "Antigua Guatemala",
      bedrooms: 2,
      bathrooms: 1,
      area: 120,
      image: "/src/assets/property2.jpg",
      type: "Apartamento"
    }
  ]);

  const removeFavorite = (id: number) => {
    console.log('Removing favorite:', id);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Mis Favoritos</h1>
          <p className="text-muted-foreground">
            {favorites.length} propiedades guardadas
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((property) => (
            <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader className="p-0">
                <div className="relative">
                  <img 
                    src={property.image}
                    alt={property.title}
                    className="w-full h-48 object-cover"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                    onClick={() => removeFavorite(property.id)}
                  >
                    <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                  </Button>
                  <Badge className="absolute top-2 left-2 bg-primary">
                    {property.type}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2">{property.title}</h3>
                <p className="text-2xl font-bold text-primary mb-2">{property.price}</p>
                
                <div className="flex items-center text-muted-foreground mb-3">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">{property.location}</span>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Bed className="h-4 w-4 mr-1" />
                    {property.bedrooms}
                  </div>
                  <div className="flex items-center">
                    <Bath className="h-4 w-4 mr-1" />
                    {property.bathrooms}
                  </div>
                  <div className="flex items-center">
                    <Square className="h-4 w-4 mr-1" />
                    {property.area}m²
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="p-4 pt-0">
                <Button className="w-full">Ver Detalles</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Favorites;