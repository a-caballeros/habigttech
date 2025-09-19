import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowLeft, Plus, BarChart3, MessageCircle, Upload } from "lucide-react";
import { BusinessIcon, StarIcon, MobileIcon, TeamIcon } from "@/components/icons/ProfessionalIcons";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

// Form validation schema for agent
const agentProfileSchema = z.object({
  full_name: z.string().min(2, "El nombre debe tener al menos 2 caracteres").max(100, "El nombre es muy largo"),
  phone: z.string().optional().refine((val) => !val || /^\+?[1-9]\d{1,14}$/.test(val), "Formato de teléfono inválido"),
  agency: z.string().optional(),
  bio: z.string().optional(),
  license_number: z.string().optional(),
});

type AgentProfileForm = z.infer<typeof agentProfileSchema>;

const AgentProfile = () => {
  const navigate = useNavigate();
  const { user, profile, refetchProfile } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleRefreshProfile = async () => {
    if (refetchProfile) {
      await refetchProfile();
      toast({
        title: "Perfil actualizado",
        description: "Los datos de tu perfil han sido refrescados.",
      });
    }
  };

  const form = useForm<AgentProfileForm>({
    resolver: zodResolver(agentProfileSchema),
    defaultValues: {
      full_name: profile?.full_name || "",
      phone: profile?.phone || "",
      agency: profile?.agency || "",
      bio: profile?.bio || "",
      license_number: profile?.license_number || "",
    },
  });

  const onSubmit = async (data: AgentProfileForm) => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: data.full_name,
          phone: data.phone,
          agency: data.agency,
          bio: data.bio,
          license_number: data.license_number,
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
          <h1 className="text-2xl font-bold">Mi Perfil - Agente</h1>
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
                
                <div className="flex gap-2">
                  <Button 
                    type="submit" 
                    className="flex-1" 
                    disabled={isLoading}
                  >
                    {isLoading ? "Guardando..." : "Guardar Cambios"}
                  </Button>
                  
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleRefreshProfile}
                    disabled={isLoading}
                  >
                    🔄 Refrescar
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Professional Information */}
          <Card>
            <CardHeader>
              <CardTitle>Información Profesional</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="agency">Agencia inmobiliaria</Label>
                <Input
                  id="agency"
                  type="text"
                  placeholder="Nombre de tu agencia"
                  {...form.register("agency")}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="license_number">Número de licencia</Label>
                <Input
                  id="license_number"
                  type="text"
                  placeholder="Tu número de licencia profesional"
                  {...form.register("license_number")}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bio">Descripción profesional</Label>
                <Textarea
                  id="bio"
                  placeholder="Cuéntanos sobre tu experiencia y especialidades..."
                  rows={4}
                  {...form.register("bio")}
                />
              </div>
              
              <Button 
                type="button" 
                variant="outline" 
                className="w-full"
                onClick={form.handleSubmit(onSubmit)}
                disabled={isLoading}
              >
                {isLoading ? "Guardando..." : "Actualizar Información Profesional"}
              </Button>
            </CardContent>
          </Card>

          {/* Profile Photo */}
          <Card>
            <CardHeader>
              <CardTitle>Foto de Perfil</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <img
                  src={profile?.avatar_url || "/lovable-uploads/59b800a3-685e-4cd5-9971-d6f04b97c304.png"}
                  alt="Avatar"
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div className="flex-1">
                <Button 
                    variant="outline" 
                    className="flex items-center gap-2"
                    onClick={async () => {
                      // Create a hidden file input
                      const input = document.createElement('input');
                      input.type = 'file';
                      input.accept = 'image/*';
                      input.onchange = async (e) => {
                        const file = (e.target as HTMLInputElement).files?.[0];
                        if (file && user) {
                          try {
                            const fileExt = file.name.split('.').pop();
                            const fileName = `${user.id}.${fileExt}`;
                            const filePath = `avatars/${fileName}`;

                            const { error: uploadError } = await supabase.storage
                              .from('avatars')
                              .upload(filePath, file, { upsert: true });

                            if (uploadError) throw uploadError;

                            const { data: { publicUrl } } = supabase.storage
                              .from('avatars')
                              .getPublicUrl(filePath);

                            const { error: updateError } = await supabase
                              .from('profiles')
                              .update({ avatar_url: publicUrl })
                              .eq('id', user.id);

                            if (updateError) throw updateError;

                            await refetchProfile?.();
                            toast({
                              title: "Foto actualizada",
                              description: "Tu foto de perfil ha sido actualizada correctamente.",
                            });
                          } catch (error) {
                            console.error('Error uploading avatar:', error);
                            toast({
                              title: "Error",
                              description: "No se pudo actualizar la foto de perfil.",
                              variant: "destructive",
                            });
                          }
                        }
                      };
                      input.click();
                    }}
                  >
                    <Upload className="h-4 w-4" />
                    Cambiar Foto
                  </Button>
                  <p className="text-sm text-muted-foreground mt-1">
                    JPG, PNG hasta 2MB
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Agent-specific actions */}
          <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950/20 dark:to-emerald-900/20 border-emerald-200 dark:border-emerald-800">
            <CardHeader>
              <CardTitle className="text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
                <BusinessIcon className="h-5 w-5 text-emerald-600" />
                Panel de Agente Inmobiliario
                <Badge className="bg-emerald-600 text-white">AGENTE</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Button 
                  size="lg"
                  className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white h-12"
                  onClick={() => navigate('/add-property')}
                >
                  <Plus className="h-5 w-5" />
                  Agregar Nueva Propiedad
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg"
                  className="flex items-center gap-2 border-emerald-300 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-700 dark:text-emerald-300 dark:hover:bg-emerald-950/20 h-12"
                  onClick={() => navigate('/dashboard')}
                >
                  <BarChart3 className="h-5 w-5" />
                  Mi Dashboard de Ventas
                </Button>
                
                {profile?.role !== 'admin' && (
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="flex items-center gap-2 border-emerald-300 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-700 dark:text-emerald-300 dark:hover:bg-emerald-950/20 h-12"
                    onClick={() => navigate('/subscription')}
                  >
                    <StarIcon className="h-4 w-4 mr-2" />
                    Gestionar Suscripción
                  </Button>
                )}
                
                <Button 
                  variant="outline" 
                  size="lg"
                  className="flex items-center gap-2 border-emerald-300 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-700 dark:text-emerald-300 dark:hover:bg-emerald-950/20 h-12"
                  onClick={() => navigate('/portfolio')}
                >
                  <MobileIcon className="h-4 w-4 mr-2" />
                  Mi Portfolio Profesional
                </Button>
                
                {profile?.role === 'admin' && (
                  <>
                    <Button 
                      variant="outline" 
                      size="lg"
                      className="flex items-center gap-2 border-red-300 text-red-700 hover:bg-red-50 dark:border-red-700 dark:text-red-300 dark:hover:bg-red-950/20 h-12"
                      onClick={() => navigate('/admin-users')}
                    >
                      🔐 Gestionar Usuarios (ADMIN)
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="lg"
                      className="flex items-center gap-2 border-blue-300 text-blue-700 hover:bg-blue-50 dark:border-blue-700 dark:text-blue-300 dark:hover:bg-blue-950/20 h-12"
                      onClick={() => navigate('/admin-users')}
                    >
                      <TeamIcon className="h-4 w-4 mr-2" />
                      Administrar Agentes
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AgentProfile;