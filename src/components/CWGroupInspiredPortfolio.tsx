import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CWGroupInspiredPortfolio = () => {
  const navigate = useNavigate();

  const portfolioItems = [
    {
      id: 1,
      title: "Multifamiliar",
      description: "Desarrollos residenciales modernos con amenidades de primera clase",
      image: "/lovable-uploads/8318aa21-95da-4ba0-aefd-4f2098429658.png",
      category: "multifamily"
    },
    {
      id: 2,
      title: "Comercial",
      description: "Espacios comerciales estratégicamente ubicados",
      image: "/lovable-uploads/a83901e8-d00d-4314-89b1-03972da3680d.png",
      category: "retail"
    },
    {
      id: 3,
      title: "Residencial",
      description: "Casas familiares con diseños contemporáneos",
      image: "/lovable-uploads/aa964ad8-c21e-46ab-835a-ec030029deff.png",
      category: "homebuilding"
    },
    {
      id: 4,
      title: "Desarrollo de Terrenos",
      description: "Proyectos de urbanización integral",
      image: "/lovable-uploads/f1417da8-41e1-449e-b4c4-a0323e83c55e.png",
      category: "land"
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-light tracking-wide mb-6">
            Nuestra Experiencia
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-light leading-relaxed">
            Especializados en desarrollos que transforman comunidades y mejoran la calidad de vida
          </p>
        </div>

        {/* Portfolio Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {portfolioItems.map((item, index) => (
            <Card 
              key={item.id} 
              className="group overflow-hidden border-0 shadow-none bg-transparent cursor-pointer"
              onClick={() => navigate('/auth')}
            >
              <div className="relative overflow-hidden">
                <img 
                  src={item.image}
                  alt={item.title}
                  className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
                
                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <h3 className="text-2xl font-light mb-3 tracking-wide">{item.title}</h3>
                  <p className="text-sm opacity-90 mb-4 font-light leading-relaxed">
                    {item.description}
                  </p>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-white hover:bg-white/10 p-0 h-auto font-light tracking-wide"
                  >
                    Ver todos los {item.title}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Featured Projects */}
        <div className="border-t border-border pt-16">
          <h3 className="text-3xl font-light tracking-wide mb-12 text-center">
            Construimos en:
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Zona 10 Premium", location: "Ciudad de Guatemala", price: "Desde $250,000" },
              { name: "Antigua Residencial", location: "Antigua Guatemala", price: "Desde $180,000" },
              { name: "Carretera a El Salvador", location: "Santa Catarina Pinula", price: "Desde $120,000" }
            ].map((project, index) => (
              <Card key={index} className="border border-border hover:border-primary/20 transition-colors duration-300 cursor-pointer group">
                <CardContent className="p-6">
                  <div className="w-full h-48 bg-muted rounded-lg mb-4 overflow-hidden">
                    <img 
                      src={portfolioItems[index % portfolioItems.length].image}
                      alt={project.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h4 className="text-xl font-light mb-2 tracking-wide">{project.name}</h4>
                  <div className="flex items-center text-sm text-muted-foreground mb-3">
                    <MapPin className="h-4 w-4 mr-1" />
                    {project.location}
                  </div>
                  <div className="text-lg font-medium text-primary">{project.price}</div>
                  <Button 
                    variant="link" 
                    className="p-0 h-auto mt-2 text-primary font-light"
                    onClick={() => navigate('/auth')}
                  >
                    Ver proyecto
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CWGroupInspiredPortfolio;