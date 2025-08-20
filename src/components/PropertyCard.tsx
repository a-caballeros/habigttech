import { Heart, MapPin, Bed, Bath, Square, Car, Eye, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

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
    <Card className={`group cursor-pointer transition-smooth hover:shadow-medium ${isPromoted ? 'ring-2 ring-primary ring-opacity-20' : ''}`} onClick={onClick}>
      <div className="relative overflow-hidden rounded-t-lg">
        {/* Image Carousel */}
        <div className="aspect-[4/3] bg-muted relative">
          <img 
            src={images[currentImageIndex]} 
            alt={title}
            className="w-full h-full object-cover transition-smooth group-hover:scale-105"
          />
          
          {/* Image Navigation Dots */}
          {images.length > 1 && (
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
              {images.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-smooth ${
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
            <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground">
              Destacada
            </Badge>
          )}
          
          {/* Favorite Button */}
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-2 right-2 bg-white/90 hover:bg-white"
            onClick={(e) => {
              e.stopPropagation();
              setFavorite(!favorite);
            }}
          >
            <Heart className={`h-4 w-4 ${favorite ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`} />
          </Button>
        </div>
        
        <CardContent className="p-4">
          {/* Price */}
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold text-lg text-foreground">{price}</h3>
            <div className="flex items-center text-sm text-muted-foreground">
              <Eye className="h-3 w-3 mr-1" />
              {views}
            </div>
          </div>
          
          {/* Title */}
          <h4 className="font-semibold text-foreground mb-1 line-clamp-1">{title}</h4>
          
          {/* Location */}
          <div className="flex items-center text-muted-foreground mb-3">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="text-sm">{location}</span>
          </div>
          
          {/* Property Features */}
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Bed className="h-4 w-4 mr-1" />
                {bedrooms}
              </div>
              <div className="flex items-center">
                <Bath className="h-4 w-4 mr-1" />
                {bathrooms}
              </div>
              <div className="flex items-center">
                <Square className="h-4 w-4 mr-1" />
                {area}m²
              </div>
              {parking > 0 && (
                <div className="flex items-center">
                  <Car className="h-4 w-4 mr-1" />
                  {parking}
                </div>
              )}
            </div>
          </div>
          
          {/* Agent Info */}
          <div className="flex items-center justify-between pt-3 border-t">
            <div className="flex items-center space-x-3">
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
            <Button variant="outline" size="sm">
              Ver Detalles
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default PropertyCard;