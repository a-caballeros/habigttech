import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Plus, Eye, Heart, MessageCircle, MoreHorizontal,
  TrendingUp, Home, Users, DollarSign, ArrowLeft,
  Edit3, Pause, Trash2, Megaphone, Search, Filter
} from "lucide-react";
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

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
  const navigate = useNavigate();
  const { user } = useAuth();
  const [properties, setProperties] = useState<Property[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch properties from database
  useEffect(() => {
    const fetchProperties = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('properties')
          .select('*')
          .eq('agent_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;

        // Transform data to match our interface
        const transformedProperties: Property[] = (data || []).map(prop => ({
          id: prop.id,
          title: prop.title,
          price: `Q${prop.price?.toLocaleString()}`,
          location: prop.location,
          image: prop.images?.[0] || '/placeholder.svg',
          status: prop.status as any || 'active',
          views: 0, // This would need to be tracked separately
          favorites: 0, // This would need to be tracked separately  
          messages: 0, // This would need to be tracked separately
          datePosted: prop.created_at
        }));

        setProperties(transformedProperties);
      } catch (error) {
        console.error('Error fetching properties:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [user]);

  // Property action handlers
  const handleEditProperty = (propertyId: string) => {
    navigate(`/edit-property/${propertyId}`);
  };

  const handleToggleStatus = async (propertyId: string, currentStatus: string) => {
    try {
      const newStatus = currentStatus === 'paused' ? 'active' : 'paused';
      const { error } = await supabase
        .from('properties')
        .update({ status: newStatus })
        .eq('id', propertyId);

      if (error) throw error;

      // Refresh properties
      setProperties(prev => prev.map(p => 
        p.id === propertyId 
          ? { ...p, status: newStatus as any }
          : p
      ));
    } catch (error) {
      console.error('Error toggling property status:', error);
    }
  };

  const handlePromoteProperty = async (propertyId: string) => {
    try {
      const { error } = await supabase
        .from('properties')
        .update({ 
          promoted: true,
          promoted_at: new Date().toISOString()
        })
        .eq('id', propertyId);

      if (error) throw error;

      // Refresh properties
      const fetchProperties = async () => {
        if (!user) return;
        
        try {
          const { data, error } = await supabase
            .from('properties')
            .select('*')
            .eq('agent_id', user.id)
            .order('created_at', { ascending: false });

          if (error) throw error;

          const transformedProperties: Property[] = (data || []).map(prop => ({
            id: prop.id,
            title: prop.title,
            price: `Q${prop.price?.toLocaleString()}`,
            location: prop.location,
            image: prop.images?.[0] || '/placeholder.svg',
            status: prop.status as any || 'active',
            views: 0,
            favorites: 0,
            messages: 0,
            datePosted: prop.created_at
          }));

          setProperties(transformedProperties);
        } catch (error) {
          console.error('Error fetching properties:', error);
        }
      };

      fetchProperties();
    } catch (error: any) {
      console.error('Error promoting property:', error);
      alert(error.message || 'Error al promocionar la propiedad');
    }
  };

  const handleDeleteProperty = async (propertyId: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar esta propiedad?')) return;

    try {
      const { error } = await supabase
        .from('properties')
        .delete()
        .eq('id', propertyId);

      if (error) throw error;

      // Remove from local state
      setProperties(prev => prev.filter(p => p.id !== propertyId));
    } catch (error) {
      console.error('Error deleting property:', error);
    }
  };

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
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/profile')}
            >
              <ArrowLeft className="h-4 w-4" />
              Regresar
            </Button>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Panel de Ventas
          </h1>
          <p className="text-muted-foreground">
            Gestiona tus propiedades y revisa el rendimiento de tus listados.
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Propiedades Activas</p>
                  <p className="text-2xl font-bold text-foreground">{activeProperties}</p>
                </div>
                <Home className="h-8 w-8 text-primary" />
              </div>
              {activeProperties > 0 && (
                <div className="flex items-center mt-2 text-sm text-success">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  Propiedades activas
                </div>
              )}
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
              {totalViews > 0 && (
                <div className="flex items-center mt-2 text-sm text-success">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  Total de vistas
                </div>
              )}
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
              {totalMessages > 0 && (
                <div className="flex items-center mt-2 text-sm text-success">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  Nuevas consultas
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Ingresos Mes</p>
                  <p className="text-2xl font-bold text-foreground">Q0</p>
                </div>
                <DollarSign className="h-8 w-8 text-primary" />
              </div>
              <div className="flex items-center mt-2 text-sm text-muted-foreground">
                <span className="text-xs">Comienza agregando propiedades</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Properties Management */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <CardTitle className="text-xl">Gestión de Propiedades</CardTitle>
              <Button 
                className="flex items-center gap-2 w-full sm:w-auto"
                onClick={() => navigate('/add-property')}
              >
                <Plus className="h-4 w-4" />
                <span className="hidden sm:inline">Agregar Nueva</span>
                <span className="sm:hidden">Nueva Propiedad</span>
              </Button>
            </div>
            
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Buscar propiedades..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" className="flex items-center gap-2 w-full sm:w-auto">
                <Filter className="h-4 w-4" />
                Filtros
              </Button>
            </div>
          </CardHeader>

          <CardContent>
            <div className="space-y-4">
              {properties.length === 0 ? (
                <div className="text-center py-12">
                  <div className="mb-4">
                    <Home className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      No tienes propiedades publicadas
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Comienza agregando tu primera propiedad para empezar a recibir consultas
                    </p>
                    <Button 
                      className="flex items-center gap-2"
                      onClick={() => navigate('/add-property')}
                    >
                      <Plus className="h-4 w-4" />
                      Agregar Primera Propiedad
                    </Button>
                  </div>
                </div>
              ) : (
                properties.map((property) => (
                  <div key={property.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border rounded-lg transition-smooth hover:shadow-soft">
                    {/* Property Image */}
                    <img 
                      src={property.image}
                      alt={property.title}
                      className="w-full sm:w-20 h-40 sm:h-20 rounded-lg object-cover"
                    />

                    {/* Property Info */}
                    <div className="flex-1 min-w-0 w-full">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-2 gap-2">
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground">{property.title}</h3>
                          <p className="text-sm text-muted-foreground">{property.location}</p>
                        </div>
                        <div className="text-left sm:text-right">
                          <p className="font-bold text-lg text-foreground">{property.price}</p>
                          <Badge className={statusColors[property.status]}>
                            {statusLabels[property.status]}
                          </Badge>
                        </div>
                      </div>

                      {/* Statistics */}
                      <div className="flex flex-wrap items-center gap-3 md:gap-6 text-sm">
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
                        <span className="text-muted-foreground text-xs sm:text-sm">
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
                        <DropdownMenuItem 
                          className="flex items-center gap-2"
                          onClick={() => handleEditProperty(property.id)}
                        >
                          <Edit3 className="h-4 w-4" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="flex items-center gap-2"
                          onClick={() => handleToggleStatus(property.id, property.status)}
                        >
                          <Pause className="h-4 w-4" />
                          {property.status === 'paused' ? 'Reactivar' : 'Pausar'}
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="flex items-center gap-2"
                          onClick={() => handlePromoteProperty(property.id)}
                        >
                          <Megaphone className="h-4 w-4" />
                          Promocionar
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="flex items-center gap-2 text-destructive"
                          onClick={() => handleDeleteProperty(property.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                          Eliminar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AgentDashboard;