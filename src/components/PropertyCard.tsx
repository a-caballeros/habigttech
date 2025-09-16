import { Heart, MapPin, Bed, Bath, Square, Car, Eye, Star, MessageCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

interface PropertyCardProps {
  id: string;
  title: string;
  price: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  parking?: number;
  images: string[];
  agent: {
    name: string;
    photo: string;
    tier: 'bronze' | 'silver' | 'gold';
  };
  views: number;
  isFavorite?: boolean;
  isPromoted?: boolean;
  onClick?: () => void;
}

const PropertyCard = ({ 
  title, 
  price, 
  location, 
  bedrooms, 
  bathrooms, 
  area, 
  parking = 0,
  images,
  agent,
  views,
  isFavorite = false,
  isPromoted = false,
  onClick
}: PropertyCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [favorite, setFavorite] = useState(isFavorite);

  const handleAgentContact = () => {
    toast({
      title: "Contactar agente",
      description: `Iniciando contacto con ${agent.name}...`,
    });
  };

  const tierColors = {
    bronze: 'tier-bronze',
    silver: 'tier-silver', 
    gold: 'tier-gold'
  };

  const tierLabels = {
    bronze: 'Bronce',
    silver: 'Plata',
    gold: 'Oro'
  };

  return (
    <Card className="group cursor-pointer transition-all duration-300 hover:shadow-medium border border-border overflow-hidden" onClick={onClick}>
      <div className="relative overflow-hidden">
        {/* Image Carousel */}
        <div className="aspect-[4/3] bg-muted relative">
          <img 
            src={images[currentImageIndex]} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          
          {/* Image Navigation Dots */}
          {images.length > 1 && (
            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1">
              {images.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImageIndex(index);
                  }}
                />
              ))}
            </div>
          )}
          
          {/* Promoted Badge */}
          {isPromoted && (
            <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground shadow-soft">
              Destacada
            </Badge>
          )}
          
          {/* Favorite Button */}
          <Button
            variant="secondary"
            size="sm"
            className="absolute top-3 right-3 h-8 w-8 rounded-full shadow-soft bg-white/90 p-0"
            onClick={(e) => {
              e.stopPropagation();
              setFavorite(!favorite);
            }}
          >
            <Heart className={`h-4 w-4 transition-colors ${favorite ? 'fill-red-500 text-red-500' : 'text-muted-foreground hover:text-red-400'}`} />
          </Button>
        </div>
        
        <CardContent className="p-5">
          {/* Price and Views */}
          <div className="flex justify-between items-start mb-3">
            <h3 className="font-bold text-xl text-foreground">{price}</h3>
            <div className="flex items-center text-sm text-muted-foreground">
              <Eye className="h-4 w-4 mr-1" />
              {views}
            </div>
          </div>
          
          {/* Title */}
          <h4 className="font-semibold text-foreground mb-2 line-clamp-2 leading-tight">{title}</h4>
          
          {/* Location */}
          <div className="flex items-center text-muted-foreground mb-4">
            <MapPin className="h-4 w-4 mr-2" />
            <span className="text-sm">{location}</span>
          </div>
          
          {/* Property Features */}
          <div className="flex items-center justify-between py-3 border-t border-border">
            <div className="flex items-center space-x-1 text-muted-foreground text-sm">
              <Bed className="h-4 w-4" />
              <span>{bedrooms}</span>
            </div>
            <div className="flex items-center space-x-1 text-muted-foreground text-sm">
              <Bath className="h-4 w-4" />
              <span>{bathrooms}</span>
            </div>
            <div className="flex items-center space-x-1 text-muted-foreground text-sm">
              <Square className="h-4 w-4" />
              <span>{area}m²</span>
            </div>
            {parking > 0 && (
              <div className="flex items-center space-x-1 text-muted-foreground text-sm">
                <Car className="h-4 w-4" />
                <span>{parking}</span>
              </div>
            )}
          </div>
          
          {/* Agent Info */}
          <div className="flex items-center justify-between pt-4">
            <div className="flex items-center space-x-2">
              <img 
                src={agent.photo} 
                alt={agent.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-medium text-foreground">{agent.name}</p>
                <div className="flex items-center">
                  <Star className={`h-3 w-3 mr-1 ${tierColors[agent.tier]}`} />
                  <span className={`text-xs ${tierColors[agent.tier]}`}>
                    {tierLabels[agent.tier]}
                  </span>
                </div>
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              className="text-xs px-3 py-1"
              onClick={(e) => {
                e.stopPropagation();
                handleAgentContact();
              }}
            >
              Contactar
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default PropertyCard;