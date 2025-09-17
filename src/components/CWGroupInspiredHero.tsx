import { Button } from "@/components/ui/button";
import { ArrowRight, Play, MapPin, Building, Users, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CWGroupInspiredHero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/lovable-uploads/59b800a3-685e-4cd5-9971-d6f04b97c304.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="max-w-4xl mx-auto">
          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-wider mb-8">
            Construimos
            <br />
            <em className="italic font-light">Comunidad.</em>
            <span className="text-sm align-top ml-2">®</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl font-light mb-12 max-w-3xl mx-auto leading-relaxed opacity-90">
            Habi.gt es un grupo de desarrollo inmobiliario guatemalteco, de propiedad local, 
            operado y de capital privado. Nos enfocamos en proyectos multifamiliares, 
            vivienda residencial, uso mixto, terrenos y desarrollos comerciales.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button 
              size="lg" 
              variant="outline"
              className="bg-white/10 border-white/30 text-white hover:bg-white hover:text-black backdrop-blur-sm px-8 py-6 text-lg font-light tracking-wide"
              onClick={() => navigate('/auth')}
            >
              Explorar Propiedades
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="ghost"
              className="text-white hover:bg-white/10 px-8 py-6 text-lg font-light tracking-wide"
            >
              <Play className="mr-2 h-5 w-5" />
              Ver Demo
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-light mb-2">250+</div>
              <div className="text-sm opacity-80 font-light tracking-wider uppercase">Proyectos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-light mb-2">85+</div>
              <div className="text-sm opacity-80 font-light tracking-wider uppercase">Proyectos Multifamiliares</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-light mb-2">5,000+</div>
              <div className="text-sm opacity-80 font-light tracking-wider uppercase">Hogares Entregados</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-light mb-2">50+</div>
              <div className="text-sm opacity-80 font-light tracking-wider uppercase">Desarrollos Comerciales</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white opacity-60">
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CWGroupInspiredHero;