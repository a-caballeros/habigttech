import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Trash2, Plus, Edit, ExternalLink, Image } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import LogoUpload from './LogoUpload';

interface Sponsor {
  id: string;
  name: string;
  logo_url: string;
  website_url: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
}

const AdminSponsorsManagement = () => {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingSponsor, setEditingSponsor] = useState<Sponsor | null>(null);
  const [newSponsor, setNewSponsor] = useState({
    name: '',
    logo_url: '',
    website_url: '',
    display_order: 0,
  });
  const [useManualUrl, setUseManualUrl] = useState(false);
  const { toast } = useToast();

  const fetchSponsors = async () => {
    try {
      const { data, error } = await supabase
        .from('sponsors')
        .select('*')
        .order('display_order', { ascending: true })
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching sponsors:', error);
        toast({
          title: "Error",
          description: "No se pudieron cargar los patrocinadores",
          variant: "destructive"
        });
        return;
      }

      setSponsors(data || []);
    } catch (error) {
      console.error('Error fetching sponsors:', error);
      toast({
        title: "Error",
        description: "Error al conectar con la base de datos",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSponsors();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newSponsor.name || !newSponsor.logo_url || !newSponsor.website_url) {
      toast({
        title: "Error",
        description: "Todos los campos son requeridos",
        variant: "destructive"
      });
      return;
    }

    try {
      if (editingSponsor) {
        // Update existing sponsor
        const { error } = await supabase
          .from('sponsors')
          .update({
            name: newSponsor.name,
            logo_url: newSponsor.logo_url,
            website_url: newSponsor.website_url,
            display_order: newSponsor.display_order,
          })
          .eq('id', editingSponsor.id);

        if (error) throw error;
        
        toast({
          title: "Éxito",
          description: "Patrocinador actualizado correctamente"
        });
      } else {
        // Create new sponsor
        const { error } = await supabase
          .from('sponsors')
          .insert([{
            name: newSponsor.name,
            logo_url: newSponsor.logo_url,
            website_url: newSponsor.website_url,
            display_order: newSponsor.display_order,
          }]);

        if (error) throw error;
        
        toast({
          title: "Éxito",
          description: "Patrocinador creado correctamente"
        });
      }

      // Reset form and close dialog
      setNewSponsor({ name: '', logo_url: '', website_url: '', display_order: 0 });
      setEditingSponsor(null);
      setIsAddDialogOpen(false);
      setUseManualUrl(false);
      fetchSponsors();
    } catch (error) {
      console.error('Error saving sponsor:', error);
      toast({
        title: "Error",
        description: "No se pudo guardar el patrocinador",
        variant: "destructive"
      });
    }
  };

  const handleEdit = (sponsor: Sponsor) => {
    setEditingSponsor(sponsor);
    setNewSponsor({
      name: sponsor.name,
      logo_url: sponsor.logo_url,
      website_url: sponsor.website_url,
      display_order: sponsor.display_order,
    });
    setUseManualUrl(true); // Default to manual URL when editing
    setIsAddDialogOpen(true);
  };

  const handleDelete = async (sponsorId: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este patrocinador?')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('sponsors')
        .delete()
        .eq('id', sponsorId);

      if (error) throw error;

      toast({
        title: "Éxito",
        description: "Patrocinador eliminado correctamente"
      });
      
      fetchSponsors();
    } catch (error) {
      console.error('Error deleting sponsor:', error);
      toast({
        title: "Error",
        description: "No se pudo eliminar el patrocinador",
        variant: "destructive"
      });
    }
  };

  const toggleActiveStatus = async (sponsor: Sponsor) => {
    try {
      const { error } = await supabase
        .from('sponsors')
        .update({ is_active: !sponsor.is_active })
        .eq('id', sponsor.id);

      if (error) throw error;

      toast({
        title: "Éxito",
        description: `Patrocinador ${sponsor.is_active ? 'desactivado' : 'activado'} correctamente`
      });
      
      fetchSponsors();
    } catch (error) {
      console.error('Error updating sponsor status:', error);
      toast({
        title: "Error",
        description: "No se pudo actualizar el estado del patrocinador",
        variant: "destructive"
      });
    }
  };

  const resetForm = () => {
    setNewSponsor({ name: '', logo_url: '', website_url: '', display_order: 0 });
    setEditingSponsor(null);
    setUseManualUrl(false);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
        <div>
          <CardTitle className="text-2xl font-bold">Gestión de Patrocinadores</CardTitle>
          <p className="text-muted-foreground">
            Administra los patrocinadores que aparecen en el carousel de la página principal
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={(open) => {
          setIsAddDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Agregar Patrocinador
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>
                {editingSponsor ? 'Editar Patrocinador' : 'Agregar Nuevo Patrocinador'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Nombre del Patrocinador</Label>
                <Input
                  id="name"
                  value={newSponsor.name}
                  onChange={(e) => setNewSponsor({ ...newSponsor, name: e.target.value })}
                  placeholder="Empresa XYZ"
                  required
                />
              </div>
              
              {/* Logo Upload Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Logo del Patrocinador</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setUseManualUrl(!useManualUrl)}
                  >
                    {useManualUrl ? 'Subir Archivo' : 'Ingresar URL'}
                  </Button>
                </div>
                
                {useManualUrl ? (
                  <div>
                    <Label htmlFor="logo_url">URL del Logo</Label>
                    <Input
                      id="logo_url"
                      value={newSponsor.logo_url}
                      onChange={(e) => setNewSponsor({ ...newSponsor, logo_url: e.target.value })}
                      placeholder="https://ejemplo.com/logo.png"
                      required
                    />
                  </div>
                ) : (
                  <LogoUpload
                    onLogoUploaded={(url) => setNewSponsor({ ...newSponsor, logo_url: url })}
                    currentLogoUrl={newSponsor.logo_url}
                  />
                )}
              </div>
              
              <div>
                <Label htmlFor="website_url">URL del Sitio Web</Label>
                <Input
                  id="website_url"
                  value={newSponsor.website_url}
                  onChange={(e) => setNewSponsor({ ...newSponsor, website_url: e.target.value })}
                  placeholder="https://www.empresa.com"
                  required
                />
              </div>
              <div>
                <Label htmlFor="display_order">Orden de Visualización</Label>
                <Input
                  id="display_order"
                  type="number"
                  value={newSponsor.display_order}
                  onChange={(e) => setNewSponsor({ ...newSponsor, display_order: parseInt(e.target.value) || 0 })}
                  placeholder="0"
                  min="0"
                />
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsAddDialogOpen(false)}
                >
                  Cancelar
                </Button>
                <Button type="submit">
                  {editingSponsor ? 'Actualizar' : 'Crear'} Patrocinador
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : sponsors.length === 0 ? (
          <div className="text-center py-8">
            <Image className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              No hay patrocinadores registrados. Agrega el primer patrocinador para comenzar.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {sponsors.map((sponsor) => (
              <div 
                key={sponsor.id} 
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <img 
                    src={sponsor.logo_url}
                    alt={sponsor.name}
                    className="w-16 h-16 object-contain border rounded"
                    onError={(e) => {
                      e.currentTarget.src = '/placeholder.svg';
                    }}
                  />
                  <div>
                    <h3 className="font-semibold">{sponsor.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Orden: {sponsor.display_order}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant={sponsor.is_active ? "default" : "secondary"}>
                        {sponsor.is_active ? "Activo" : "Inactivo"}
                      </Badge>
                      <a 
                        href={sponsor.website_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:underline text-sm flex items-center gap-1"
                      >
                        <ExternalLink className="h-3 w-3" />
                        Visitar sitio
                      </a>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleActiveStatus(sponsor)}
                  >
                    {sponsor.is_active ? 'Desactivar' : 'Activar'}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(sponsor)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(sponsor.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AdminSponsorsManagement;