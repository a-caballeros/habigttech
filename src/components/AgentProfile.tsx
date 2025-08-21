import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowLeft, Plus, BarChart3, MessageCircle, Upload } from "lucide-react";
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
  const { user, profile } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<AgentProfileForm>({
    resolver: zodResolver(agentProfileSchema),
    defaultValues: {
      full_name: profile?.full_name || "",
      phone: profile?.phone || "",
      agency: "",
      bio: "",
      license_number: "",
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
              
              <Button variant="outline" className="w-full">
                Actualizar Información Profesional
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
                <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center">
                  <span className="text-2xl">👤</span>
                </div>
                <div className="flex-1">
                  <Button variant="outline" className="flex items-center gap-2">
                    <Upload className="h-4 w-4" />
                    Subir Nueva Foto
                  </Button>
                  <p className="text-sm text-muted-foreground mt-1">
                    JPG, PNG hasta 2MB
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Agent-specific actions */}
          <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <CardHeader>
              <CardTitle className="text-primary">Panel de Agente Inmobiliario</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Button 
                  size="lg"
                  className="flex items-center gap-2 bg-primary hover:bg-primary/90"
                  onClick={() => navigate('/add-property')}
                >
                  <Plus className="h-5 w-5" />
                  Agregar Propiedad
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg"
                  className="flex items-center gap-2 border-primary text-primary hover:bg-primary/5"
                  onClick={() => navigate('/dashboard')}
                >
                  <BarChart3 className="h-5 w-5" />
                  Ver Dashboard
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg"
                  className="flex items-center gap-2"
                  onClick={() => navigate('/messages')}
                >
                  <MessageCircle className="h-5 w-5" />
                  Consultas de Clientes
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg"
                  className="flex items-center gap-2"
                  onClick={() => navigate('/subscription')}
                >
                  ⭐ Gestionar Suscripción
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AgentProfile;