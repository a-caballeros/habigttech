import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, Heart, Share2, Play, Eye, 
  Bed, Bath, Square, Car, MapPin, 
  Phone, MessageCircle, Calendar,
  Wifi, Dumbbell, Waves, Shield, 
  TreePine, PawPrint, Star
} from "lucide-react";

interface PropertyDetailsProps {
  property: {
    id: string;
    title: string;
    price: string;
    location: string;
    bedrooms: number;
    bathrooms: number;
    area: number;
    parking: number;
    images: string[];
    hasVideo?: boolean;
    has3DTour?: boolean;
    description: string;
    features: string[];
    agent: {
      name: string;
      photo: string;
      tier: 'bronze' | 'silver' | 'gold';
      agency: string;
      phone: string;
    };
    views: number;
  };
  onBack?: () => void;
}

const PropertyDetails = ({ property, onBack }: PropertyDetailsProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const tierColors = {
    bronze: 'text-amber-600',
    silver: 'text-slate-600', 
    gold: 'text-yellow-500'
  };

  const tierLabels = {
    bronze: 'Agente Bronce',
    silver: 'Agente Plata',
    gold: 'Agente Oro'
  };

  const featureIcons: { [key: string]: any } = {
    'Piscina': Waves,
    'Gimnasio': Dumbbell,
    'Wifi': Wifi,
    'Seguridad 24/7': Shield,
    'Jardín': TreePine,
    'Pet Friendly': PawPrint,
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Image Gallery */}
      <div className="relative h-96 md:h-[500px] bg-muted">
        <img 
          src={property.images[currentImageIndex]}
          alt={property.title}
          className="w-full h-full object-cover"
        />
        
        {/* Header Controls */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
          <Button 
            variant="secondary" 
            size="sm" 
            onClick={onBack}
            className="bg-white/90 hover:bg-white"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Volver
          </Button>
          
          <div className="flex space-x-2">
            <Button 
              variant="secondary" 
              size="sm"
              onClick={() => setIsFavorite(!isFavorite)}
              className="bg-white/90 hover:bg-white"
            >
              <Heart className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
            </Button>
            <Button 
              variant="secondary" 
              size="sm"
              className="bg-white/90 hover:bg-white"
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Media Controls */}
        <div className="absolute bottom-4 left-4 flex space-x-2">
          {property.hasVideo && (
            <Button variant="secondary" size="sm" className="bg-white/90 hover:bg-white">
              <Play className="h-4 w-4 mr-1" />
              Video
            </Button>
          )}
          {property.has3DTour && (
            <Badge className="bg-primary text-primary-foreground">
              <Eye className="h-3 w-3 mr-1" />
              Tour 3D
            </Badge>
          )}
        </div>

        {/* Image Navigation */}
        {property.images.length > 1 && (
          <div className="absolute bottom-4 right-4 flex space-x-1">
            {property.images.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-smooth ${
                  index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                }`}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </div>
        )}
      </div>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Essential Information */}
        <div className="mb-6">
          <div className="flex justify-between items-start mb-2">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">{property.price}</h1>
            <div className="flex items-center text-muted-foreground">
              <Eye className="h-4 w-4 mr-1" />
              <span className="text-sm">{property.views} vistas</span>
            </div>
          </div>
          
          <h2 className="text-xl font-semibold text-foreground mb-3">{property.title}</h2>
          
          <div className="flex items-center text-muted-foreground mb-4">
            <MapPin className="h-5 w-5 mr-2" />
            <span>{property.location}</span>
          </div>
          
          {/* Quick Features */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-muted rounded-lg">
            <div className="flex items-center space-x-2">
              <Bed className="h-5 w-5 text-primary" />
              <div>
                <div className="font-semibold">{property.bedrooms}</div>
                <div className="text-sm text-muted-foreground">Habitaciones</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Bath className="h-5 w-5 text-primary" />
              <div>
                <div className="font-semibold">{property.bathrooms}</div>
                <div className="text-sm text-muted-foreground">Baños</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Square className="h-5 w-5 text-primary" />
              <div>
                <div className="font-semibold">{property.area}m²</div>
                <div className="text-sm text-muted-foreground">Área</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Car className="h-5 w-5 text-primary" />
              <div>
                <div className="font-semibold">{property.parking}</div>
                <div className="text-sm text-muted-foreground">Parqueos</div>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-3">Descripción</h3>
            <p className="text-muted-foreground leading-relaxed">
              {showFullDescription ? property.description : `${property.description.substring(0, 200)}...`}
            </p>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setShowFullDescription(!showFullDescription)}
              className="mt-2 p-0 h-auto font-normal text-primary hover:text-primary-glow"
            >
              {showFullDescription ? 'Leer menos' : 'Leer más...'}
            </Button>
          </CardContent>
        </Card>

        {/* Features */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Características y Amenidades</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {property.features.map((feature, index) => {
                const Icon = featureIcons[feature] || TreePine;
                return (
                  <div key={index} className="flex items-center space-x-2 text-sm">
                    <Icon className="h-4 w-4 text-primary" />
                    <span>{feature}</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Agent Information */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Información del Agente</h3>
            <div className="flex items-start space-x-4">
              <img 
                src={property.agent.photo}
                alt={property.agent.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="flex-1">
                <h4 className="font-semibold text-foreground">{property.agent.name}</h4>
                <p className="text-sm text-muted-foreground mb-1">{property.agent.agency}</p>
                <div className="flex items-center mb-3">
                  <Star className={`h-4 w-4 mr-1 ${tierColors[property.agent.tier]}`} />
                  <span className={`text-sm ${tierColors[property.agent.tier]} font-medium`}>
                    {tierLabels[property.agent.tier]}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" className="flex items-center">
                    <Phone className="h-4 w-4 mr-1" />
                    Llamar
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center">
                    <MessageCircle className="h-4 w-4 mr-1" />
                    Mensaje
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    Agendar Visita
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Floating Contact Button */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
        <Button size="lg" className="shadow-strong">
          <MessageCircle className="h-5 w-5 mr-2" />
          Contactar Agente
        </Button>
      </div>
    </div>
  );
};

export default PropertyDetails;