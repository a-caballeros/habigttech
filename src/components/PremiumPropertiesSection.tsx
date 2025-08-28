import { useState } from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { PropertyIcon, SearchIcon, LocationIcon } from "@/components/icons/PremiumIcons";
import { Filter, SortAsc, Grid3X3, List, ArrowRight, Heart, Eye } from "lucide-react";

const PremiumPropertiesSection = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sampleProperties] = useState<any[]>([]); // Will be populated from database

  return (
    <section className="py-24 bg-gradient-to-b from-muted/30 to-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-primary/3 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-accent/3 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <Badge 
            variant="outline" 
            className="mb-6 bg-primary/5 text-primary border-primary/20 px-4 py-2"
          >
            <PropertyIcon className="w-4 h-4 mr-2" variant="filled" />
            Propiedades Destacadas
          </Badge>
          
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-8 leading-tight">
            <span className="text-foreground">Descubre las</span>
            <br />
            <span className="gradient-text">Mejores Propiedades</span>
          </h2>
          
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
            Propiedades cuidadosamente seleccionadas y verificadas por nuestros agentes expertos
          </p>
        </div>

        {/* Advanced Filters & Search */}
        <div className="mb-12 max-w-6xl mx-auto">
          <div className="glass-card p-6 rounded-2xl border border-white/20">
            {/* Search Bar */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-6">
              <div className="lg:col-span-2 relative">
                <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary w-5 h-5" variant="gradient" />
                <Input 
                  placeholder="Buscar por ubicación, tipo o código..."
                  className="pl-12 h-12 border-0 bg-white/50 backdrop-blur-sm focus:bg-white/70 transition-all"
                />
              </div>
              
              <div className="relative">
                <LocationIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary w-5 h-5" variant="gradient" />
                <Input 
                  placeholder="Departamento"
                  className="pl-12 h-12 border-0 bg-white/50 backdrop-blur-sm focus:bg-white/70 transition-all"
                />
              </div>
              
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary font-semibold">Q</span>
                <Input 
                  placeholder="Precio máximo"
                  className="pl-12 h-12 border-0 bg-white/50 backdrop-blur-sm focus:bg-white/70 transition-all"
                />
              </div>
              
              <Button 
                size="lg" 
                className="h-12 bg-gradient-to-r from-primary to-primary-glow hover:from-primary-glow hover:to-primary text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <SearchIcon className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" variant="filled" />
                Buscar
              </Button>
            </div>

            {/* Filter Tags */}
            <div className="flex flex-wrap gap-3">
              {['Casas', 'Apartamentos', 'Terrenos', 'Oficinas', 'Locales', 'Bodegas'].map((filter) => (
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

        {/* Controls Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex items-center gap-4">
            <p className="text-muted-foreground font-medium">
              <span className="text-primary font-semibold">{sampleProperties.length}</span> propiedades encontradas
            </p>
            
            {sampleProperties.length > 0 && (
              <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                Todas verificadas
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* View Mode Toggle */}
            <div className="flex bg-muted/50 rounded-lg p-1">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="rounded-md"
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="rounded-md"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>

            {/* Sort & Filter */}
            <Button variant="outline" size="sm" className="gap-2">
              <SortAsc className="w-4 h-4" />
              Ordenar
            </Button>
            
            <Button variant="outline" size="sm" className="gap-2 lg:hidden">
              <Filter className="w-4 h-4" />
              Filtros
            </Button>
          </div>
        </div>

        {/* Properties Grid/List */}
        <div className="flex gap-8">
          {/* Advanced Filters Sidebar - Desktop */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <Card className="sticky top-6">
              <CardHeader>
                <h3 className="font-semibold flex items-center gap-2">
                  <Filter className="w-5 h-5 text-primary" />
                  Filtros Avanzados
                </h3>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Price Range */}
                <div>
                  <h4 className="font-medium mb-3">Rango de Precio</h4>
                  <div className="space-y-2">
                    <Input placeholder="Precio mínimo" className="h-10" />
                    <Input placeholder="Precio máximo" className="h-10" />
                  </div>
                </div>

                {/* Property Type */}
                <div>
                  <h4 className="font-medium mb-3">Tipo de Propiedad</h4>
                  <div className="space-y-2">
                    {['Casa', 'Apartamento', 'Terreno', 'Oficina', 'Local'].map((type) => (
                      <label key={type} className="flex items-center gap-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Bedrooms */}
                <div>
                  <h4 className="font-medium mb-3">Habitaciones</h4>
                  <div className="grid grid-cols-4 gap-2">
                    {['1+', '2+', '3+', '4+'].map((bed) => (
                      <Button key={bed} variant="outline" size="sm" className="h-10">
                        {bed}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div>
                  <h4 className="font-medium mb-3">Características</h4>
                  <div className="space-y-2">
                    {['Piscina', 'Jardín', 'Garage', 'Seguridad', 'Gym'].map((feature) => (
                      <label key={feature} className="flex items-center gap-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">{feature}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-primary to-primary-glow text-white">
                  Aplicar Filtros
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Properties Content */}
          <div className="flex-1">
            {sampleProperties.length === 0 ? (
              <div className="text-center py-20">
                <div className="glass-card max-w-2xl mx-auto p-12 rounded-2xl border border-white/20">
                  <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full flex items-center justify-center">
                    <PropertyIcon className="w-12 h-12 text-primary" variant="gradient" />
                  </div>
                  
                  <h3 className="font-display text-2xl font-semibold text-foreground mb-4">
                    Propiedades Exclusivas Próximamente
                  </h3>
                  
                  <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                    Nuestros agentes están trabajando para traerte las mejores propiedades de Guatemala. 
                    ¡Pronto tendrás acceso a una selección excepcional!
                  </p>

                  <div className="space-y-4">
                    <Button 
                      size="lg"
                      className="bg-gradient-to-r from-primary to-primary-glow hover:from-primary-glow hover:to-primary text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group"
                    >
                      <Heart className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                      Recibir Notificaciones
                      <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    
                    <p className="text-sm text-muted-foreground">
                      Sé el primero en ver las nuevas propiedades
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
                {/* Properties will be rendered here when available */}
              </div>
            )}

            {/* Load More */}
            {sampleProperties.length > 0 && (
              <div className="text-center mt-12">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="px-8 py-4 rounded-xl font-semibold border-2 border-primary/20 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 group"
                >
                  <Eye className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                  Ver Más Propiedades
                  <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PremiumPropertiesSection;