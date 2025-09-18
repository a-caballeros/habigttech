import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { Building, Trash2, Search, Eye } from 'lucide-react';

interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  agent_id: string;
  status: string;
  created_at: string;
  profiles?: {
    full_name: string;
    email: string;
  } | null;
}

const AdminPropertyManagement = () => {
  const { profile } = useAuth();
  const { toast } = useToast();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (profile?.role === 'admin') {
      fetchProperties();
    }
  }, [profile?.role]);

  const fetchProperties = async () => {
    try {
      // First get properties
      const { data: propertiesData, error: propertiesError } = await supabase
        .from('properties')
        .select('*')
        .order('created_at', { ascending: false });

      if (propertiesError) throw propertiesError;

      // Then get agent profiles for each property
      const propertiesWithProfiles = await Promise.all(
        (propertiesData || []).map(async (property) => {
          const { data: profileData } = await supabase
            .from('profiles')
            .select('full_name, email')
            .eq('id', property.agent_id)
            .single();

          return {
            ...property,
            profiles: profileData
          };
        })
      );

      setProperties(propertiesWithProfiles);
    } catch (error) {
      console.error('Error fetching properties:', error);
      toast({
        title: 'Error',
        description: 'No se pudieron cargar las propiedades',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteProperty = async (propertyId: string, propertyTitle: string) => {
    try {
      const { error } = await supabase
        .from('properties')
        .delete()
        .eq('id', propertyId);

      if (error) throw error;

      toast({
        title: 'Propiedad eliminada',
        description: `La propiedad "${propertyTitle}" ha sido eliminada`,
      });

      fetchProperties();
    } catch (error) {
      console.error('Error deleting property:', error);
      toast({
        title: 'Error',
        description: 'No se pudo eliminar la propiedad',
        variant: 'destructive',
      });
    }
  };

  const filteredProperties = properties.filter(property =>
    property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    property.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    property.profiles?.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    property.profiles?.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (profile?.role !== 'admin') {
    return null;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Building className="h-6 w-6" />
        <h2 className="text-2xl font-bold">Gestión de Propiedades</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Todas las Propiedades</span>
            <Badge variant="secondary">{filteredProperties.length}</Badge>
          </CardTitle>
          <CardDescription>
            Administra todas las propiedades publicadas en la plataforma
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Search */}
          <div className="flex items-center space-x-2 mb-4">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por título, ubicación o agente..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-sm"
            />
          </div>

          {filteredProperties.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              {searchQuery ? 'No se encontraron propiedades que coincidan con la búsqueda' : 'No hay propiedades registradas'}
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Título</TableHead>
                  <TableHead>Ubicación</TableHead>
                  <TableHead>Precio</TableHead>
                  <TableHead>Agente</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProperties.map((property) => (
                  <TableRow key={property.id}>
                    <TableCell className="font-medium">
                      {property.title}
                    </TableCell>
                    <TableCell>{property.location}</TableCell>
                    <TableCell>Q{property.price?.toLocaleString()}</TableCell>
                    <TableCell>
                      <div>
                        <div>{property.profiles?.full_name || 'Sin nombre'}</div>
                        <div className="text-sm text-muted-foreground">{property.profiles?.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={property.status === 'active' ? 'default' : 'secondary'}>
                        {property.status === 'active' ? 'Activa' : property.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(property.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="sm">
                              <Trash2 className="h-4 w-4 mr-1" />
                              Eliminar
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Eliminar Propiedad</AlertDialogTitle>
                              <AlertDialogDescription>
                                ¿Estás seguro de que quieres eliminar la propiedad "{property.title}"? 
                                Esta acción no se puede deshacer.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => deleteProperty(property.id, property.title)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Eliminar
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPropertyManagement;