import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowLeft, Heart, Search, Bell } from "lucide-react";
import { PropertyIcon } from "@/components/icons/ProfessionalIcons";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

// Form validation schema for client
const clientProfileSchema = z.object({
  full_name: z.string().min(2, "El nombre debe tener al menos 2 caracteres").max(100, "El nombre es muy largo"),
  phone: z.string().optional().refine((val) => !val || /^\+?[1-9]\d{1,14}$/.test(val), "Formato de teléfono inválido"),
  budget_max: z.string().optional(),
  preferred_location: z.string().optional(),
  preferred_property_type: z.string().optional(),
});

type ClientProfileForm = z.infer<typeof clientProfileSchema>;

const ClientProfile = () => {
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ClientProfileForm>({
    resolver: zodResolver(clientProfileSchema),
    defaultValues: {
      full_name: profile?.full_name || "",
      phone: profile?.phone || "",
      budget_max: profile?.budget_max?.toString() || "",
      preferred_location: profile?.preferred_location || "",
      preferred_property_type: profile?.preferred_property_type || "",
    },
  });

  const onSubmit = async (data: ClientProfileForm) => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: data.full_name,
          phone: data.phone,
          budget_max: data.budget_max ? parseFloat(data.budget_max) : null,
          preferred_location: data.preferred_location,
          preferred_property_type: data.preferred_property_type,
        })
        .eq('id', user.id);

      if (error) throw error;

      toast({
        title: "Perfil actualizado",
        description: "Tus datos han sido guardados correctamente.",
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error",
        description: "No se pudo actualizar el perfil. Intenta de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="h-4 w-4" />
            Volver
          </Button>
          <h1 className="text-2xl font-bold">Mi Perfil - Cliente</h1>
        </div>

        <div className="grid gap-6">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle>Información Personal</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Correo electrónico</Label>
                  <Input
                    id="email"
                    type="email"
                    value={user?.email || ''}
                    disabled
                    className="bg-muted"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="full_name">Nombre completo</Label>
                  <Input
                    id="full_name"
                    type="text"
                    placeholder="Ingresa tu nombre completo"
                    {...form.register("full_name")}
                  />
                  {form.formState.errors.full_name && (
                    <p className="text-sm text-destructive">{form.formState.errors.full_name.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Ingresa tu número de teléfono"
                    {...form.register("phone")}
                  />
                  {form.formState.errors.phone && (
                    <p className="text-sm text-destructive">{form.formState.errors.phone.message}</p>
                  )}
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isLoading}
                >
                  {isLoading ? "Guardando..." : "Guardar Cambios"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Client-specific features */}
          <Card>
            <CardHeader>
              <CardTitle>Preferencias de Búsqueda</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="budget_max">Presupuesto máximo</Label>
                <Input
                  id="budget_max"
                  type="number"
                  placeholder="500000"
                  {...form.register("budget_max")}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="preferred_location">Ubicación preferida</Label>
                <Input
                  id="preferred_location"
                  type="text"
                  placeholder="Ej: Zona 10, Ciudad de Guatemala"
                  {...form.register("preferred_location")}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="preferred_property_type">Tipo de propiedad</Label>
                <Input
                  id="preferred_property_type"
                  type="text"
                  placeholder="Ej: Casa, Apartamento, Terreno"
                  {...form.register("preferred_property_type")}
                />
              </div>
              
              <Button 
                variant="outline" 
                className="w-full"
                onClick={form.handleSubmit(onSubmit)}
                disabled={isLoading}
              >
                {isLoading ? "Guardando..." : "Guardar Preferencias"}
              </Button>
            </CardContent>
          </Card>

          {/* Quick Actions for Clients */}
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20 border-blue-200 dark:border-blue-800">
            <CardHeader>
              <CardTitle className="text-blue-700 dark:text-blue-300 flex items-center gap-2">
                <PropertyIcon className="h-5 w-5 text-blue-600" />
                Panel de Cliente
                <Badge className="bg-blue-600 text-white">CLIENTE</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Button 
                  size="lg"
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 h-12"
                  onClick={() => navigate('/')}
                >
                  <Search className="h-5 w-5" />
                  Buscar Propiedades
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg"
                  className="flex items-center gap-2 border-blue-300 text-blue-700 hover:bg-blue-50 dark:border-blue-700 dark:text-blue-300 dark:hover:bg-blue-950/20 h-12"
                >
                  <Heart className="h-5 w-5" />
                  💙 Propiedades Guardadas
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg"
                  className="flex items-center gap-2 border-blue-300 text-blue-700 hover:bg-blue-50 dark:border-blue-700 dark:text-blue-300 dark:hover:bg-blue-950/20 h-12"
                >
                  📞 Consultas Enviadas
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg"
                  className="flex items-center gap-2 border-blue-300 text-blue-700 hover:bg-blue-50 dark:border-blue-700 dark:text-blue-300 dark:hover:bg-blue-950/20 h-12"
                >
                  🔔 Recibir Notificaciones
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ClientProfile;