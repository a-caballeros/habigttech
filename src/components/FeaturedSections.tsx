import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Star, Users, Building } from "lucide-react";
import { useNavigate } from "react-router-dom";
import property1 from "@/assets/property1.jpg";
import property2 from "@/assets/property2.jpg";
import property3 from "@/assets/property3.jpg";

const FeaturedSections = () => {
  const navigate = useNavigate();

  const featuredProperties = [
    {
      id: 1,
      image: property1,
      title: "Casa Moderna con Piscina",
      location: "Zona 16, Ciudad de Guatemala",
      price: "Q1,200,000",
      bedrooms: 4,
      bathrooms: 3,
      area: 250,
      isNew: true
    },
    {
      id: 2,
      image: property2,
      title: "Apartamento Céntrico",
      location: "Zona 10, Ciudad de Guatemala",
      price: "Q750,000",
      bedrooms: 2,
      bathrooms: 2,
      area: 120,
      isNew: false
    },
    {
      id: 3,
      image: property3,
      title: "Penthouse de Lujo",
      location: "Zona 14, Ciudad de Guatemala",
      price: "Q2,500,000",
      bedrooms: 3,
      bathrooms: 3,
      area: 180,
      isNew: true
    }
  ];

  const latestProperties = [
    {
      id: 4,
      image: property1,
      title: "Casa Colonial Restaurada",
      location: "Antigua Guatemala",
      price: "Q1,800,000",
      bedrooms: 5,
      bathrooms: 4,
      area: 320
    },
    {
      id: 5,
      image: property2,
      title: "Apartamento con Vista",
      location: "Zona 15, Ciudad de Guatemala",
      price: "Q650,000",
      bedrooms: 2,
      bathrooms: 1,
      area: 95
    },
    {
      id: 6,
      image: property3,
      title: "Casa en Condominio",
      location: "Mixco, Guatemala",
      price: "Q950,000",
      bedrooms: 3,
      bathrooms: 2,
      area: 160
    }
  ];

  const PropertyCard = ({ property, showNewBadge = false }: { property: any; showNewBadge?: boolean }) => (
    <Card className="overflow-hidden hover:shadow-medium transition-all duration-300 cursor-pointer group">
      <div className="relative">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {showNewBadge && property.isNew && (
          <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground">
            Nuevo
          </Badge>
        )}
      </div>
      <CardContent className="p-4">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">{property.location}</p>
          <h3 className="font-semibold text-lg leading-tight">{property.title}</h3>
          <p className="text-2xl font-bold text-primary">{property.price}</p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>{property.bedrooms} hab</span>
            <span>{property.bathrooms} baños</span>
            <span>{property.area}m²</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Featured Properties Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Propiedades Destacadas</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Descubre las mejores opciones seleccionadas especialmente para ti
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} showNewBadge />
            ))}
          </div>
          
          <div className="text-center">
            <Button variant="outline" size="lg" className="px-8">
              Ver Todas las Propiedades
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </section>

        {/* Latest Properties Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Últimas en el Mercado</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Las propiedades más recientes publicadas por nuestros agentes
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {latestProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
          
          <div className="text-center">
            <Button variant="outline" size="lg" className="px-8">
              Ver Más Propiedades
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </section>

        {/* Registration Sections */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Agent Registration */}
            <Card className="p-8 text-center bg-gradient-to-br from-primary to-primary-light text-primary-foreground">
              <Building className="h-12 w-12 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">Registro Agente</h3>
              <p className="mb-6 opacity-90">
                Únete a nuestra plataforma como agente inmobiliario y conecta con miles de clientes potenciales
              </p>
              <Button 
                variant="secondary" 
                size="lg" 
                className="w-full"
                onClick={() => navigate('/auth?type=agent')}
              >
                Registrarse como Agente
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Card>

            {/* Client Registration */}
            <Card className="p-8 text-center bg-gradient-to-br from-accent to-accent/80 text-accent-foreground">
              <Users className="h-12 w-12 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">Registro Cliente</h3>
              <p className="mb-6 opacity-90">
                Crea tu cuenta gratuita y accede a funciones exclusivas para encontrar tu hogar ideal
              </p>
              <Button 
                variant="secondary" 
                size="lg" 
                className="w-full"
                onClick={() => navigate('/auth?type=client')}
              >
                Registrarse como Cliente
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
};

export default FeaturedSections;