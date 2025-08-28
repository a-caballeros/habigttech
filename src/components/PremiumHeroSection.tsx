import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { SearchIcon, LocationIcon, PropertyIcon } from "@/components/icons/PremiumIcons";
import { ArrowRight, Play, TrendingUp, Shield, Award } from "lucide-react";

const PremiumHeroSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentStatIndex, setCurrentStatIndex] = useState(0);

  const dynamicStats = [
    { label: "Propiedades Activas", value: "2,847", change: "+12%" },
    { label: "Ventas este Mes", value: "184", change: "+8%" },
    { label: "Clientes Satisfechos", value: "4,392", change: "+15%" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStatIndex((prev) => (prev + 1) % dynamicStats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-muted/30 to-primary/5">
      {/* Premium Background Effects */}
      <div className="absolute inset-0">
        {/* Floating Geometric Shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-40 right-20 w-48 h-48 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-primary-glow/15 rounded-full blur-2xl animate-float" style={{ animationDelay: '4s' }}></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--primary)) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-5xl mx-auto">
          {/* Premium Badge */}
          <div className="mb-8 flex justify-center">
            <Badge 
              variant="outline" 
              className="glass-card border-primary/20 text-primary hover:bg-primary/5 px-6 py-2 text-sm font-medium"
            >
              <Award className="w-4 h-4 mr-2" />
              Plataforma Inmobiliaria #1 en Guatemala
            </Badge>
          </div>

          {/* Main Headline */}
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
            <span className="gradient-text">Tu Hogar Ideal</span>
            <br />
            <span className="text-foreground">Te Está Esperando</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            Descubre más de <span className="font-semibold text-primary">2,847 propiedades exclusivas</span> en toda Guatemala. 
            Conectamos personas con sus hogares perfectos a través de tecnología de vanguardia.
          </p>

          {/* Premium Search Bar */}
          <div className="mb-12 max-w-4xl mx-auto">
            <div className="glass-card p-6 rounded-2xl shadow-2xl border border-white/20">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                {/* Location Input */}
                <div className="relative">
                  <LocationIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary w-5 h-5" variant="gradient" />
                  <Input 
                    placeholder="¿Dónde quieres vivir?"
                    className="pl-12 h-14 border-0 bg-white/50 backdrop-blur-sm focus:bg-white/70 transition-all text-lg"
                  />
                </div>

                {/* Property Type */}
                <div className="relative">
                  <PropertyIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary w-5 h-5" variant="gradient" />
                  <Input 
                    placeholder="Tipo de propiedad"
                    className="pl-12 h-14 border-0 bg-white/50 backdrop-blur-sm focus:bg-white/70 transition-all text-lg"
                  />
                </div>

                {/* Price Range */}
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary font-semibold">Q</span>
                  <Input 
                    placeholder="Presupuesto"
                    className="pl-12 h-14 border-0 bg-white/50 backdrop-blur-sm focus:bg-white/70 transition-all text-lg"
                  />
                </div>

                {/* Search Button */}
                <Button 
                  size="lg" 
                  className="h-14 bg-gradient-to-r from-primary to-primary-glow hover:from-primary-glow hover:to-primary text-white font-semibold text-lg px-8 shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <SearchIcon className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" variant="filled" />
                  Buscar
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>

              {/* Quick Filters */}
              <div className="flex flex-wrap gap-3 mt-6 justify-center">
                {['Casas', 'Apartamentos', 'Terrenos', 'Comercial', 'Vacacionales'].map((filter) => (
                  <Button 
                    key={filter}
                    variant="outline" 
                    size="sm"
                    className="bg-white/30 border-white/40 hover:bg-primary/10 hover:border-primary/30 backdrop-blur-sm transition-all"
                  >
                    {filter}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary-glow text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group"
            >
              <PropertyIcon className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" variant="filled" />
              Explorar Propiedades
              <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
            </Button>

            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-primary/20 hover:border-primary/40 text-primary hover:bg-primary/5 px-8 py-4 rounded-xl text-lg font-semibold backdrop-blur-sm transition-all duration-300 group"
            >
              <Play className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
              Ver Demo
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {/* Dynamic Stat */}
            <div className="glass-card p-6 rounded-xl border border-white/20 hover-lift group">
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-primary to-primary-glow rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="text-3xl font-bold gradient-text mb-2 group-hover:scale-110 transition-transform">
                {dynamicStats[currentStatIndex].value}
              </div>
              <div className="text-sm text-muted-foreground mb-1">
                {dynamicStats[currentStatIndex].label}
              </div>
              <div className="text-xs text-success font-semibold">
                {dynamicStats[currentStatIndex].change} este mes
              </div>
            </div>

            {/* Verification */}
            <div className="glass-card p-6 rounded-xl border border-white/20 hover-lift">
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-success to-primary-glow rounded-full flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="text-3xl font-bold text-success mb-2">100%</div>
              <div className="text-sm text-muted-foreground mb-1">Propiedades Verificadas</div>
              <div className="text-xs text-success font-semibold">Garantía total</div>
            </div>

            {/* Awards */}
            <div className="glass-card p-6 rounded-xl border border-white/20 hover-lift">
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-accent to-primary rounded-full flex items-center justify-center">
                  <Award className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="text-3xl font-bold text-accent mb-2">4.9</div>
              <div className="text-sm text-muted-foreground mb-1">Rating de Clientes</div>
              <div className="text-xs text-accent font-semibold">+4,000 reseñas</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default PremiumHeroSection;