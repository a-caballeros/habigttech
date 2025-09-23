import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/AuthContext";
import { 
  ArrowLeft, Heart, Share2, Play, Eye, 
  Bed, Bath, Square, Car, MapPin, 
  Phone, MessageCircle, Calendar,
  Wifi, Dumbbell, Waves, Shield, 
  TreePine, PawPrint, Star, Building
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface PropertyDetailsProps {
  property: {
    id: string;
    title: string;
    price: number;
    location: string;
    bedrooms: number;
    bathrooms: number;
    area: number;
    property_type: string;
    images: string[];
    description: string;
    amenities: string[];
    agent_id: string;
    status: string;
    created_at: string;
  };
  agent: {
    id: string;
    full_name: string;
    avatar_url: string | null;
    phone: string | null;
    agency: string | null;
    email?: string | null;
    hide_email?: boolean;
    hide_phone?: boolean;
  };
  onBack?: () => void;
}

const PropertyDetails = ({ property, agent, onBack }: PropertyDetailsProps) => {
  const { user } = useAuth();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [avatarCacheKey, setAvatarCacheKey] = useState(Date.now());

  useEffect(() => {
    const handleAvatarUpdate = () => {
      setAvatarCacheKey(Date.now());
    };

    window.addEventListener('avatar-updated', handleAvatarUpdate);
    return () => window.removeEventListener('avatar-updated', handleAvatarUpdate);
  }, []);

  const handleShare = () => {
    navigator.share?.({
      title: property.title,
      text: `${property.title} - Q${property.price?.toLocaleString()}`,
      url: window.location.href,
    }).catch(() => {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Enlace copiado",
        description: "El enlace de la propiedad ha sido copiado al portapapeles.",
      });
    });
  };

  const handleCall = () => {
    if (!user) {
      toast({
        title: "Inicia sesión requerida",
        description: "Debes iniciar sesión para contactar al agente.",
        variant: "destructive"
      });
      return;
    }
    
    if (agent?.phone && !agent.hide_phone) {
      window.open(`tel:${agent.phone}`, '_self');
      toast({
        title: "Iniciando llamada",
        description: `Llamando a ${agent.full_name}...`,
      });
    } else {
      toast({
        title: "Teléfono no disponible",
        description: "El agente ha optado por mantener su teléfono privado.",
        variant: "destructive"
      });
    }
  };

  const handleMessage = () => {
    if (!user) {
      toast({
        title: "Inicia sesión requerida",
        description: "Debes iniciar sesión para contactar al agente.",
        variant: "destructive"
      });
      return;
    }
    
    if (agent?.phone && !agent.hide_phone) {
      const whatsappUrl = `https://wa.me/${agent.phone.replace(/[^\d]/g, '')}?text=Hola, estoy interesado en la propiedad "${property.title}"`;
      window.open(whatsappUrl, '_blank');
      toast({
        title: "Abriendo WhatsApp",
        description: `Iniciando conversación con ${agent.full_name}`,
      });
    } else {
      toast({
        title: "Contacto no disponible",
        description: "El agente ha optado por mantener su información de contacto privada.",
        variant: "destructive"
      });
    }
  };

  const handleScheduleVisit = () => {
    toast({
      title: "Agendar visita",
      description: "Redirigiendo al calendario de citas...",
    });
  };

  const handleContactAgent = () => {
    handleMessage();
  };

  const amenityLabels = {
    'piscina': { label: 'Piscina', icon: Waves },
    'cocina_equipada': { label: 'Cocina Equipada', icon: Star },
    'sala_equipada': { label: 'Sala Equipada', icon: Star },
    'habitaciones_equipadas': { label: 'Habitaciones Equipadas', icon: Bed },
    'lavanderia_equipada': { label: 'Lavandería Equipada', icon: Star },
    'seguridad_24_7': { label: 'Seguridad 24/7', icon: Shield },
    'balcon': { label: 'Balcón', icon: TreePine },
    'jardin': { label: 'Jardín', icon: TreePine },
    'terraza': { label: 'Terraza', icon: TreePine },
    'parqueo_techado': { label: 'Parqueo Techado', icon: Car },
    'parqueo': { label: 'Parqueo', icon: Car },
    'cocina': { label: 'Cocina', icon: Star },
    'lavanderia': { label: 'Lavandería', icon: Star },
    'sala': { label: 'Sala', icon: Star },
    'gimnasio': { label: 'Gimnasio', icon: Dumbbell },
    'pergola': { label: 'Pérgola', icon: TreePine },
    'salon_social': { label: 'Salón Social', icon: Building },
    'fire_pit': { label: 'Fire Pit', icon: Star },
    'banos_completos': { label: 'Baños Completos', icon: Star },
    'closet': { label: 'Closet', icon: Star },
    'cuarto_servicio': { label: 'Cuarto de Servicio', icon: Building },
    'bodega': { label: 'Bodega', icon: Building },
    'walking_closet': { label: 'Walking Closet', icon: Star },
    'churrasquera': { label: 'Churrasquera', icon: Star },
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Image Gallery */}
      <div className="relative h-96 md:h-[500px] bg-muted">
        <img 
          src={property.images && Array.isArray(property.images) && property.images.length > 0 ? property.images[currentImageIndex] : '/placeholder.svg'}
          alt={property.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = '/placeholder.svg';
          }}
        />
        
        {/* Header Controls */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
          <Button 
            variant="default" 
            size="sm" 
            onClick={onBack}
            className="bg-background/90 hover:bg-background border border-border text-foreground shadow-lg"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Volver
          </Button>
          
          <div className="flex space-x-2">
            <Button 
              variant="default" 
              size="sm"
              onClick={() => setIsFavorite(!isFavorite)}
              className="bg-background/90 hover:bg-background border border-border text-foreground shadow-lg"
            >
              <Heart className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-foreground'}`} />
            </Button>
            <Button 
              variant="default" 
              size="sm"
              onClick={handleShare}
              className="bg-background/90 hover:bg-background border border-border text-foreground shadow-lg"
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Navigation Arrows */}
        {property.images && Array.isArray(property.images) && property.images.length > 1 && (
          <>
            <button
              onClick={() => setCurrentImageIndex(currentImageIndex > 0 ? currentImageIndex - 1 : property.images.length - 1)}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => setCurrentImageIndex(currentImageIndex < property.images.length - 1 ? currentImageIndex + 1 : 0)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
            >
              <ArrowLeft className="h-4 w-4 rotate-180" />
            </button>
          </>
        )}

        {/* Image Counter */}
        {property.images && Array.isArray(property.images) && property.images.length > 1 && (
          <div className="absolute top-4 right-1/2 transform translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
            {currentImageIndex + 1} / {property.images.length}
          </div>
        )}

        {/* Image Navigation Dots */}
        {property.images && Array.isArray(property.images) && property.images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {property.images.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all ${
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
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              Q{property.price?.toLocaleString()}
            </h1>
          </div>
          
          <h2 className="text-xl font-semibold text-foreground mb-3">{property.title}</h2>
          
          <div className="flex items-center text-muted-foreground mb-4">
            <MapPin className="h-5 w-5 mr-2" />
            <span>{property.location}</span>
          </div>
          
          {/* Quick Features */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-muted rounded-lg">
            {property.bedrooms > 0 && (
              <div className="flex items-center space-x-2">
                <Bed className="h-5 w-5 text-primary" />
                <div>
                  <div className="font-semibold">{property.bedrooms}</div>
                  <div className="text-sm text-muted-foreground">Habitaciones</div>
                </div>
              </div>
            )}
            {property.bathrooms > 0 && (
              <div className="flex items-center space-x-2">
                <Bath className="h-5 w-5 text-primary" />
                <div>
                  <div className="font-semibold">{property.bathrooms}</div>
                  <div className="text-sm text-muted-foreground">Baños</div>
                </div>
              </div>
            )}
            <div className="flex items-center space-x-2">
              <Square className="h-5 w-5 text-primary" />
              <div>
                <div className="font-semibold">{property.area}m²</div>
                <div className="text-sm text-muted-foreground">Área</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="font-semibold capitalize">{property.property_type}</div>
            </div>
          </div>
        </div>

        {/* Description */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-3">Descripción</h3>
            <p className="text-muted-foreground leading-relaxed">
              {property.description ? (
                showFullDescription ? property.description : 
                (property.description.length > 200 ? `${property.description.substring(0, 200)}...` : property.description)
              ) : 'Sin descripción disponible'}
            </p>
            {property.description && property.description.length > 200 && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="mt-2 p-0 h-auto font-normal text-primary hover:text-primary-glow"
              >
                {showFullDescription ? 'Leer menos' : 'Leer más...'}
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Amenities */}
        {property.amenities && property.amenities.length > 0 && (
          <Card className="mb-6">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Características y Amenidades</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {property.amenities.map((amenity, index) => {
                  const amenityInfo = amenityLabels[amenity as keyof typeof amenityLabels] || { label: amenity, icon: Star };
                  const Icon = amenityInfo.icon;
                  
                  return (
                    <div key={index} className="flex items-center space-x-2 text-sm">
                      <Icon className="h-4 w-4 text-primary" />
                      <span>{amenityInfo.label}</span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Agent Information */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Información del Agente</h3>
            <div className="flex items-start space-x-4">
              <img 
                src={agent.avatar_url ? `${agent.avatar_url}?t=${avatarCacheKey}` : '/placeholder.svg'}
                alt={agent.full_name || 'Agente'}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="flex-1">
                <h4 className="font-semibold text-foreground">{agent.full_name}</h4>
                 {agent.agency && (
                  <p className="text-sm text-muted-foreground mb-1">{agent.agency}</p>
                )}
                {user && !agent.hide_email && agent.email && (
                  <p className="text-sm text-muted-foreground mb-1">{agent.email}</p>
                )}
                {user && !agent.hide_phone && agent.phone && (
                  <p className="text-sm text-muted-foreground mb-1">{agent.phone}</p>
                )}
                 {user ? (
                   <div className="flex flex-wrap gap-2 mt-3">
                     {(!agent.hide_phone && agent.phone) ? (
                       <Button size="sm" className="flex items-center" onClick={handleCall}>
                         <Phone className="h-4 w-4 mr-1" />
                         <span className="text-white">Llamar</span>
                       </Button>
                     ) : (
                       <Button size="sm" disabled className="flex items-center opacity-50">
                         <Phone className="h-4 w-4 mr-1" />
                         <span className="text-white">Privado</span>
                       </Button>
                     )}
                     {(!agent.hide_phone && agent.phone) ? (
                       <Button variant="outline" size="sm" className="flex items-center" onClick={handleMessage}>
                         <MessageCircle className="h-4 w-4 mr-1" />
                         <span>Mensaje</span>
                       </Button>
                     ) : (
                       <Button variant="outline" size="sm" disabled className="flex items-center opacity-50">
                         <MessageCircle className="h-4 w-4 mr-1" />
                         <span>Privado</span>
                       </Button>
                     )}
                     <Button variant="outline" size="sm" className="flex items-center" onClick={handleScheduleVisit}>
                       <Calendar className="h-4 w-4 mr-1" />
                       <span>Agendar Visita</span>
                     </Button>
                   </div>
                 ) : (
                   <div className="flex flex-wrap gap-2 mt-3">
                     <Button variant="outline" size="sm" disabled className="flex items-center opacity-50">
                       <Phone className="h-4 w-4 mr-1" />
                       <span>Inicia sesión para contactar</span>
                     </Button>
                   </div>
                 )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Floating Contact Button */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
        <Button size="lg" className="shadow-lg" onClick={handleContactAgent}>
          <MessageCircle className="h-5 w-5 mr-2" />
          <span className="text-white">Contactar Agente</span>
        </Button>
      </div>
    </div>
  );
};

export default PropertyDetails;