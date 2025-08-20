import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Plus, Eye, Heart, MessageCircle, MoreHorizontal,
  TrendingUp, Home, Users, DollarSign,
  Edit3, Pause, Trash2, Megaphone, Search, Filter
} from "lucide-react";
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

interface Property {
  id: string;
  title: string;
  price: string;
  location: string;
  image: string;
  status: 'active' | 'pending' | 'paused' | 'sold';
  views: number;
  favorites: number;
  messages: number;
  datePosted: string;
}

const AgentDashboard = () => {
  const [properties] = useState<Property[]>([
    {
      id: '1',
      title: 'Casa Colonial en Antigua',
      price: 'Q1,500,000',
      location: 'Antigua Guatemala',
      image: '/api/placeholder/300/200',
      status: 'active',
      views: 245,
      favorites: 12,
      messages: 5,
      datePosted: '2024-01-15'
    },
    {
      id: '2', 
      title: 'Apartamento Moderno Zona 14',
      price: 'Q850,000',
      location: 'Ciudad de Guatemala',
      image: '/api/placeholder/300/200',
      status: 'active',
      views: 189,
      favorites: 8,
      messages: 3,
      datePosted: '2024-01-10'
    },
    {
      id: '3',
      title: 'Villa con Piscina',
      price: 'Q2,200,000',
      location: 'Escuintla',
      image: '/api/placeholder/300/200',
      status: 'pending',
      views: 156,
      favorites: 15,
      messages: 7,
      datePosted: '2024-01-08'
    }
  ]);

  const [searchQuery, setSearchQuery] = useState("");

  const statusColors = {
    active: 'bg-green-100 text-green-800 border-green-200',
    pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    paused: 'bg-gray-100 text-gray-800 border-gray-200',
    sold: 'bg-blue-100 text-blue-800 border-blue-200'
  };

  const statusLabels = {
    active: 'Publicada',
    pending: 'Pendiente',
    paused: 'Pausada', 
    sold: 'Vendida'
  };

  // Calculate totals
  const totalViews = properties.reduce((sum, prop) => sum + prop.views, 0);
  const totalMessages = properties.reduce((sum, prop) => sum + prop.messages, 0);
  const activeProperties = properties.filter(p => p.status === 'active').length;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            ¡Hola, María González!
          </h1>
          <p className="text-muted-foreground">
            Revisa el rendimiento de tus propiedades y gestiona tus listados.
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Propiedades Activas</p>
                  <p className="text-2xl font-bold text-foreground">{activeProperties}</p>
                </div>
                <Home className="h-8 w-8 text-primary" />
              </div>
              <div className="flex items-center mt-2 text-sm text-success">
                <TrendingUp className="h-4 w-4 mr-1" />
                +2 este mes
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Vistas Totales</p>
                  <p className="text-2xl font-bold text-foreground">{totalViews.toLocaleString()}</p>
                </div>
                <Eye className="h-8 w-8 text-primary" />
              </div>
              <div className="flex items-center mt-2 text-sm text-success">
                <TrendingUp className="h-4 w-4 mr-1" />
                +15% vs mes anterior
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Consultas Nuevas</p>
                  <p className="text-2xl font-bold text-foreground">{totalMessages}</p>
                </div>
                <MessageCircle className="h-8 w-8 text-primary" />
              </div>
              <div className="flex items-center mt-2 text-sm text-success">
                <TrendingUp className="h-4 w-4 mr-1" />
                +5 esta semana
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Ingresos Mes</p>
                  <p className="text-2xl font-bold text-foreground">Q15,000</p>
                </div>
                <DollarSign className="h-8 w-8 text-primary" />
              </div>
              <div className="flex items-center mt-2 text-sm text-success">
                <TrendingUp className="h-4 w-4 mr-1" />
                +8% vs mes anterior
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Properties Management */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl">Gestión de Propiedades</CardTitle>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Agregar Nueva Propiedad
              </Button>
            </div>
            
            {/* Search and Filters */}
            <div className="flex gap-4 mt-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Buscar propiedades..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filtros
              </Button>
            </div>
          </CardHeader>

          <CardContent>
            <div className="space-y-4">
              {properties.map((property) => (
                <div key={property.id} className="flex items-center gap-4 p-4 border rounded-lg transition-smooth hover:shadow-soft">
                  {/* Property Image */}
                  <img 
                    src={property.image}
                    alt={property.title}
                    className="w-20 h-20 rounded-lg object-cover"
                  />

                  {/* Property Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-foreground truncate">{property.title}</h3>
                        <p className="text-sm text-muted-foreground">{property.location}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg text-foreground">{property.price}</p>
                        <Badge className={statusColors[property.status]}>
                          {statusLabels[property.status]}
                        </Badge>
                      </div>
                    </div>

                    {/* Statistics */}
                    <div className="flex items-center gap-6 text-sm">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Eye className="h-4 w-4" />
                        {property.views} vistas
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Heart className="h-4 w-4" />
                        {property.favorites} favoritos
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <MessageCircle className="h-4 w-4" />
                        {property.messages} mensajes
                      </div>
                      <span className="text-muted-foreground">
                        Publicado: {new Date(property.datePosted).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="flex items-center gap-2">
                        <Edit3 className="h-4 w-4" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex items-center gap-2">
                        <Pause className="h-4 w-4" />
                        {property.status === 'paused' ? 'Reactivar' : 'Pausar'}
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex items-center gap-2">
                        <Megaphone className="h-4 w-4" />
                        Promocionar
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex items-center gap-2 text-destructive">
                        <Trash2 className="h-4 w-4" />
                        Eliminar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AgentDashboard;