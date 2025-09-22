import { Heart, MapPin, Bed, Bath, Square, Car, Eye, Star, MessageCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

interface PropertyCardProps {
  id: string;
  title: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  property_type: string;
  images: string[];
  agent: {
    full_name: string;
    avatar_url: string | null;
  } | null;
  promoted?: boolean;
  isFavorite?: boolean;
  onClick?: () => void;
}

const PropertyCard = ({ 
  title, 
  price, 
  location, 
  bedrooms, 
  bathrooms, 
  area, 
  property_type,
  images,
  agent,
  promoted = false,
  isFavorite = false,
  onClick
}: PropertyCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [favorite, setFavorite] = useState(isFavorite);

  const handleAgentContact = () => {
    if (agent) {
      toast({
        title: "Contactar agente",
        description: `Iniciando contacto con ${agent.full_name}...`,
      });
    }
  };

  return (
    <Card className="group cursor-pointer transition-all duration-300 hover:shadow-medium border border-border overflow-hidden" onClick={onClick}>
      <div className="relative overflow-hidden">
        {/* Image Carousel */}
        <div className="aspect-[4/3] bg-muted relative">
          <img 
            src={images && Array.isArray(images) && images.length > 0 ? images[currentImageIndex] : '/placeholder.svg'} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.src = '/placeholder.svg';
            }}
          />
          
          {/* Navigation Arrows */}
          {images && Array.isArray(images) && images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImageIndex(currentImageIndex > 0 ? currentImageIndex - 1 : images.length - 1);
                }}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-1 rounded-full transition-colors opacity-0 group-hover:opacity-100"
              >
                <span className="text-xs">‹</span>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImageIndex(currentImageIndex < images.length - 1 ? currentImageIndex + 1 : 0);
                }}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-1 rounded-full transition-colors opacity-0 group-hover:opacity-100"
              >
                <span className="text-xs">›</span>
              </button>
            </>
          )}
          
          {/* Promoted Badge */}
          {promoted && (
            <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground shadow-soft">
              Destacada
            </Badge>
          )}
          
          {/* Image Counter */}
          {images && Array.isArray(images) && images.length > 1 && (
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-2 py-1 rounded text-xs">
              {currentImageIndex + 1}/{images.length}
            </div>
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
            <Heart className={`h-4 w-4 transition-colors ${favorite ? 'fill-red-500 text-red-500' : 'text-muted-foreground hover:text-red-400'}`} fill={favorite ? '#ef4444' : 'none'} />
          </Button>
          
          {/* Image Navigation Dots */}
          {images && Array.isArray(images) && images.length > 1 && (
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
        </div>
        
        <CardContent className="p-5">
          {/* Price */}
          <div className="flex justify-between items-start mb-3">
            <h3 className="font-bold text-xl text-foreground">Q{price?.toLocaleString()}</h3>
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
            <div className="flex items-center space-x-1 text-muted-foreground text-sm">
              <span className="capitalize">{property_type}</span>
            </div>
          </div>
          
          {/* Agent Info */}
          {agent && (
            <div className="flex items-center justify-between pt-4">
              <div className="flex items-center space-x-2">
                <img 
                  src={agent.avatar_url || '/placeholder.svg'} 
                  alt={agent.full_name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-medium text-foreground">{agent.full_name}</p>
                  <span className="text-xs text-muted-foreground">Agente</span>
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
          )}
        </CardContent>
      </div>
    </Card>
  );
};

export default PropertyCard;