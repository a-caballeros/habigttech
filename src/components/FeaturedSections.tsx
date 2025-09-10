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

        {/* Registration Sections - Enhanced */}
        <section>
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-semibold mb-4">Únete a Habi.gt</h2>
            <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
              Forma parte de la comunidad inmobiliaria más exclusiva de Guatemala
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Agent Registration - Enhanced */}
            <div className="group bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-3xl p-10 text-center shadow-elegant hover:shadow-strong transition-all duration-500 hover:scale-[1.02]">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-primary/30 transition-all duration-300">
                <Building className="h-10 w-10 text-white" />
              </div>
              <h3 className="font-heading text-2xl font-semibold mb-4 text-foreground">Registro de Agente</h3>
              <p className="font-body text-muted-foreground mb-6 leading-relaxed max-w-sm mx-auto">
                Únete a nuestra red de agentes profesionales. Accede a herramientas exclusivas 
                y conecta con clientes potenciales.
              </p>
              <div className="space-y-2 mb-6">
                <div className="flex items-center justify-center text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                  Herramientas profesionales
                </div>
                <div className="flex items-center justify-center text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                  Dashboard personalizado
                </div>
                <div className="flex items-center justify-center text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                  Red de clientes exclusiva
                </div>
              </div>
              <Button 
                size="lg" 
                className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg font-medium"
                onClick={() => navigate('/auth?type=agent')}
              >
                Registrarse como Agente
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            {/* Client Registration - Enhanced */}
            <div className="group bg-gradient-to-br from-accent/5 to-accent/10 border border-accent/20 rounded-3xl p-10 text-center shadow-elegant hover:shadow-strong transition-all duration-500 hover:scale-[1.02]">
              <div className="w-20 h-20 bg-gradient-to-br from-accent to-accent/80 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-accent/30 transition-all duration-300">
                <Users className="h-10 w-10 text-white" />
              </div>
              <h3 className="font-heading text-2xl font-semibold mb-4 text-foreground">Registro de Cliente</h3>
              <p className="font-body text-muted-foreground mb-6 leading-relaxed max-w-sm mx-auto">
                Descubre propiedades exclusivas y accede a alertas personalizadas. 
                Tu hogar ideal está esperándote.
              </p>
              <div className="space-y-2 mb-6">
                <div className="flex items-center justify-center text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-accent rounded-full mr-2"></div>
                  Alertas personalizadas
                </div>
                <div className="flex items-center justify-center text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-accent rounded-full mr-2"></div>
                  Propiedades exclusivas
                </div>
                <div className="flex items-center justify-center text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-accent rounded-full mr-2"></div>
                  Acceso prioritario
                </div>
              </div>
              <Button 
                size="lg" 
                variant="outline" 
                className="w-full border-accent/30 text-accent hover:bg-accent hover:text-white shadow-lg font-medium"
                onClick={() => navigate('/auth?type=client')}
              >
                Registrarse como Cliente
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default FeaturedSections;