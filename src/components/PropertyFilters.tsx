import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Filter, X } from "lucide-react";

interface PropertyFiltersProps {
  onFiltersChange?: (filters: any) => void;
}

const PropertyFilters = ({ onFiltersChange }: PropertyFiltersProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 2000000]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  const departments = [
    "Guatemala", "Sacatepéquez", "Chimaltenango", "Escuintla", 
    "Santa Rosa", "Sololá", "Quetzaltenango", "Retalhuleu"
  ];

  const propertyTypes = [
    "Casa", "Apartamento", "Terreno", "Oficina", "Local Comercial", "Bodega"
  ];

  const features = [
    "Piscina", "Gimnasio", "Jardín", "Balcón", "Terraza",
    "Seguridad 24/7", "Parqueo Techado", "Amueblado", "Pet Friendly"
  ];

  const toggleFeature = (feature: string) => {
    setSelectedFeatures(prev => 
      prev.includes(feature) 
        ? prev.filter(f => f !== feature)
        : [...prev, feature]
    );
  };

  if (!isOpen) {
    return (
      <Button 
        variant="outline" 
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2"
      >
        <Filter className="h-4 w-4" />
        Filtros
      </Button>
    );
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg">Filtros de Búsqueda</CardTitle>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => setIsOpen(false)}
        >
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Tipo de Propiedad */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Tipo de Propiedad</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar tipo" />
            </SelectTrigger>
            <SelectContent>
              {propertyTypes.map(type => (
                <SelectItem key={type} value={type.toLowerCase()}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Departamento */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Departamento</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar departamento" />
            </SelectTrigger>
            <SelectContent>
              {departments.map(dept => (
                <SelectItem key={dept} value={dept.toLowerCase()}>{dept}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Rango de Precio */}
        <div className="space-y-4">
          <Label className="text-sm font-medium">Rango de Precio</Label>
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            max={5000000}
            min={0}
            step={50000}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Q{priceRange[0].toLocaleString()}</span>
            <span>Q{priceRange[1].toLocaleString()}</span>
          </div>
        </div>

        {/* Habitaciones */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium">Habitaciones</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Min" />
              </SelectTrigger>
              <SelectContent>
                {[1,2,3,4,5,6].map(num => (
                  <SelectItem key={num} value={num.toString()}>{num}+</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label className="text-sm font-medium">Baños</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Min" />
              </SelectTrigger>
              <SelectContent>
                {[1,2,3,4,5].map(num => (
                  <SelectItem key={num} value={num.toString()}>{num}+</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Características */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Características</Label>
          <div className="grid grid-cols-1 gap-3">
            {features.map(feature => (
              <div key={feature} className="flex items-center space-x-2">
                <Checkbox 
                  id={feature}
                  checked={selectedFeatures.includes(feature)}
                  onCheckedChange={() => toggleFeature(feature)}
                />
                <Label 
                  htmlFor={feature} 
                  className="text-sm font-normal cursor-pointer"
                >
                  {feature}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col space-y-2 pt-4">
          <Button className="w-full">
            Aplicar Filtros
          </Button>
          <Button variant="outline" className="w-full">
            Limpiar Filtros
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyFilters;