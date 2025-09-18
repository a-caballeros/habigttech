import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AdminUserManagement from "@/components/AdminUserManagement";
import AdminTierManagement from "@/components/AdminTierManagement";
import AdminPropertyManagement from "@/components/AdminPropertyManagement";

const AdminUsers = () => {
  const { profile } = useAuth();
  const navigate = useNavigate();

  // Only allow admin access
  if (!profile || profile.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/profile')}
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al Perfil
          </Button>
          <h1 className="text-2xl font-bold">Administración del Sistema</h1>
        </div>
        
        <Tabs defaultValue="users" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="users">Gestión de Usuarios</TabsTrigger>
            <TabsTrigger value="tiers">Gestión de Tiers</TabsTrigger>
            <TabsTrigger value="properties">Gestión de Propiedades</TabsTrigger>
          </TabsList>
          <TabsContent value="users" className="mt-6">
            <AdminUserManagement />
          </TabsContent>
          <TabsContent value="tiers" className="mt-6">
            <AdminTierManagement />
          </TabsContent>
          <TabsContent value="properties" className="mt-6">
            <AdminPropertyManagement />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminUsers;