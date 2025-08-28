import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  PropertyIcon, 
  AgentIcon, 
  LocationIcon, 
  VerifiedIcon, 
  CommunityIcon, 
  TechnologyIcon 
} from "@/components/icons/PremiumIcons";
import { ArrowRight, Sparkles, Zap, Globe } from "lucide-react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  value: string;
  change: string;
  gradient: string;
}

const FeatureCard = ({ icon, title, description, value, change, gradient }: FeatureCardProps) => (
  <Card className="group relative overflow-hidden hover-lift border-0 shadow-lg hover:shadow-2xl transition-all duration-500">
    <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-5 group-hover:opacity-10 transition-opacity`}></div>
    <CardContent className="relative p-8 text-center">
      {/* Icon */}
      <div className="relative mb-6">
        <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-white to-muted flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
          {icon}
        </div>
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
          <Sparkles className="w-3 h-3 text-white" />
        </div>
      </div>

      {/* Stats */}
      <div className="mb-4">
        <div className="text-4xl font-bold gradient-text mb-2 group-hover:scale-105 transition-transform">
          {value}
        </div>
        <Badge 
          variant="outline" 
          className="bg-success/10 text-success border-success/20 mb-4"
        >
          {change}
        </Badge>
      </div>

      {/* Content */}
      <h3 className="text-xl font-semibold mb-3 text-foreground font-display">
        {title}
      </h3>
      <p className="text-muted-foreground leading-relaxed">
        {description}
      </p>

      {/* Hover Effect */}
      <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-primary to-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
    </CardContent>
  </Card>
);

const PremiumFeaturesSection = () => {
  const features = [
    {
      icon: <PropertyIcon className="w-10 h-10 text-primary" variant="gradient" />,
      title: "Propiedades Verificadas",
      description: "Todas nuestras propiedades pasan por un riguroso proceso de verificación y validación por nuestro equipo de expertos.",
      value: "2,847",
      change: "+12% este mes",
      gradient: "from-primary to-primary-glow"
    },
    {
      icon: <AgentIcon className="w-10 h-10 text-accent" variant="gradient" />,
      title: "Agentes Certificados",
      description: "Trabaja con los mejores agentes inmobiliarios de Guatemala, todos certificados y con experiencia comprobada.",
      value: "184",
      change: "+8% nuevos",
      gradient: "from-accent to-primary"
    },
    {
      icon: <LocationIcon className="w-10 h-10 text-success" variant="gradient" />,
      title: "Cobertura Nacional",
      description: "Presencia en los 22 departamentos de Guatemala, conectando todo el país en una sola plataforma.",
      value: "22",
      change: "100% país",
      gradient: "from-success to-primary-glow"
    },
    {
      icon: <VerifiedIcon className="w-10 h-10 text-warning" variant="gradient" />,
      title: "Satisfacción Garantizada",
      description: "Más del 98% de nuestros clientes recomiendan nuestros servicios a familiares y amigos.",
      value: "4.9★",
      change: "+4,000 reseñas",
      gradient: "from-warning to-accent"
    },
    {
      icon: <CommunityIcon className="w-10 h-10 text-primary-glow" variant="gradient" />,
      title: "Comunidad Activa",
      description: "Una comunidad creciente de compradores, vendedores y agentes trabajando juntos por el futuro inmobiliario.",
      value: "4,392",
      change: "+15% activos",
      gradient: "from-primary-glow to-accent"
    },
    {
      icon: <TechnologyIcon className="w-10 h-10 text-accent" variant="gradient" />,
      title: "Tecnología de Vanguardia",
      description: "Plataforma moderna con tours virtuales 3D, realidad aumentada y herramientas de análisis avanzadas.",
      value: "100%",
      change: "Digital",
      gradient: "from-accent to-primary"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20 max-w-4xl mx-auto">
          <Badge 
            variant="outline" 
            className="mb-6 bg-primary/5 text-primary border-primary/20 px-4 py-2"
          >
            <Zap className="w-4 h-4 mr-2" />
            ¿Por Qué Elegir Habi.gt?
          </Badge>
          
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-8 leading-tight">
            <span className="gradient-text">Experiencia Inmobiliaria</span>
            <br />
            <span className="text-foreground">Sin Precedentes</span>
          </h2>
          
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-8">
            Combinamos tecnología de punta con el conocimiento local para ofrecerte 
            la mejor experiencia inmobiliaria de Guatemala.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-primary to-primary-glow hover:from-primary-glow hover:to-primary text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group"
            >
              <Globe className="w-5 h-5 mr-3 group-hover:rotate-12 transition-transform" />
              Explorar Plataforma
              <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-primary/20 hover:border-primary/40 text-primary hover:bg-primary/5 px-8 py-4 rounded-xl font-semibold backdrop-blur-sm transition-all duration-300"
            >
              Ver Estadísticas
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <FeatureCard {...feature} />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <div className="glass-card max-w-4xl mx-auto p-8 rounded-2xl border border-white/20">
            <h3 className="font-display text-2xl md:text-3xl font-semibold mb-4 gradient-text">
              ¿Listo para encontrar tu hogar ideal?
            </h3>
            <p className="text-muted-foreground mb-6 text-lg">
              Únete a miles de guatemaltecos que ya encontraron su hogar perfecto
            </p>
            <Button 
              size="lg"
              className="bg-gradient-to-r from-accent to-primary hover:from-primary hover:to-accent text-white px-10 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group"
            >
              <PropertyIcon className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" variant="filled" />
              Comenzar Búsqueda
              <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PremiumFeaturesSection;