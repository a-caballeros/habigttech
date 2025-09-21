import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import BackButton from '@/components/BackButton';
import { Shield, Save, Users, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface AdminStats {
  totalUsers: number;
  totalAgents: number;
  totalClients: number;
  pendingApprovals: number;
}

const AdminProfile = () => {
  const { user, profile, signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [fullName, setFullName] = useState(profile?.full_name || '');
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    totalAgents: 0,
    totalClients: 0,
    pendingApprovals: 0
  });

  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name || '');
    }
    fetchAdminStats();
  }, [profile]);

  const fetchAdminStats = async () => {
    try {
      // Get total users
      const { count: totalUsers } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      // Get agents count
      const { count: totalAgents } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('user_type', 'agent');

      // Get clients count
      const { count: totalClients } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('user_type', 'client');

      // Get pending approvals
      const { count: pendingApprovals } = await supabase
        .from('pending_registrations')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending');

      setStats({
        totalUsers: totalUsers || 0,
        totalAgents: totalAgents || 0,
        totalClients: totalClients || 0,
        pendingApprovals: pendingApprovals || 0
      });
    } catch (error) {
      console.error('Error fetching admin stats:', error);
    }
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: fullName
        })
        .eq('id', user?.id);

      if (error) throw error;

      toast({
        title: "Perfil actualizado",
        description: "Tu información ha sido actualizada correctamente",
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error",
        description: "No se pudo actualizar el perfil",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <BackButton />
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Shield className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold">Perfil de Administrador</h1>
              <p className="text-muted-foreground">Gestiona tu información personal y configuración</p>
            </div>
          </div>
          <Badge variant="destructive" className="flex items-center space-x-1">
            <Shield className="h-3 w-3" />
            <span>Admin</span>
          </Badge>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate('/admin-users')}>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-lg">
                <Users className="h-5 w-5" />
                <span>Gestión de Usuarios</span>
              </CardTitle>
              <CardDescription>Administrar usuarios y aprobaciones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  {stats.pendingApprovals > 0 && (
                    <Badge variant="destructive" className="mr-2">
                      {stats.pendingApprovals} pendientes
                    </Badge>
                  )}
                  {stats.totalUsers} usuarios total
                </span>
                <Button variant="ghost" size="sm">Ver →</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-lg">
                <Settings className="h-5 w-5" />
                <span>Estadísticas</span>
              </CardTitle>
              <CardDescription>Resumen de la plataforma</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Agentes:</span>
                  <div className="font-semibold">{stats.totalAgents}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Clientes:</span>
                  <div className="font-semibold">{stats.totalClients}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Profile Information */}
        <Card>
          <CardHeader>
            <CardTitle>Información Personal</CardTitle>
            <CardDescription>
              Actualiza tu información personal de administrador
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleProfileUpdate} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={user?.email || ''}
                    disabled
                    className="bg-muted"
                  />
                  <p className="text-xs text-muted-foreground">
                    El email no se puede modificar
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fullName">Nombre Completo</Label>
                  <Input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Tu nombre completo"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Rol</Label>
                <div className="flex items-center space-x-2">
                  <Badge variant="destructive">Administrador</Badge>
                  <span className="text-sm text-muted-foreground">
                    Acceso completo a todas las funciones
                  </span>
                </div>
              </div>

              <Separator />

              <div className="flex justify-between pt-4">
                <Button 
                  type="submit" 
                  disabled={loading}
                  className="flex items-center space-x-2"
                >
                  <Save className="h-4 w-4" />
                  <span>{loading ? 'Guardando...' : 'Guardar Cambios'}</span>
                </Button>

                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={handleSignOut}
                >
                  Cerrar Sesión
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminProfile;