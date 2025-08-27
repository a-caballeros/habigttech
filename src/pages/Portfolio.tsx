import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Building, MapPin, Calendar, Phone, Mail, Globe, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Navigation from "@/components/Navigation";

const Portfolio = () => {
  const navigate = useNavigate();
  const { profile } = useAuth();

  const stats = [
    { label: "Propiedades Vendidas", value: "0", icon: Building },
    { label: "Clientes Satisfechos", value: "0", icon: Star },
    { label: "Años de Experiencia", value: "0", icon: Calendar },
    { label: "Área de Especialización", value: "Guatemala", icon: MapPin },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/profile')}
            >
              <ArrowLeft className="h-4 w-4" />
              Regresar al Perfil
            </Button>
            <h1 className="text-3xl font-bold">Mi Portfolio Profesional</h1>
          </div>

          {/* Agent Profile Card */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Perfil del Agente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                  <img
                    src={profile?.avatar_url || "/lovable-uploads/59b800a3-685e-4cd5-9971-d6f04b97c304.png"}
                    alt="Foto del agente"
                    className="w-32 h-32 rounded-lg object-cover"
                  />
                </div>
                
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-2">{profile?.full_name || "Nombre del Agente"}</h2>
                  <p className="text-muted-foreground mb-4">
                    {profile?.bio || "Especialista en bienes raíces con experiencia en el mercado guatemalteco."}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-muted-foreground" />
                      <span>{profile?.agency || "Agencia Inmobiliaria"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{profile?.phone || "Teléfono no disponible"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{profile?.email || "Email no disponible"}</span>
                    </div>
                    {profile?.license_number && (
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-muted-foreground" />
                        <span>Licencia: {profile.license_number}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                    </div>
                    <stat.icon className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Recent Properties */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Propiedades Destacadas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Building className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No hay propiedades aún</h3>
                <p className="text-muted-foreground mb-6">
                  Comienza agregando propiedades para mostrar en tu portfolio
                </p>
                <Button onClick={() => navigate('/add-property')}>
                  Agregar Primera Propiedad
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Testimonials */}
          <Card>
            <CardHeader>
              <CardTitle>Testimonios de Clientes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Star className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No hay testimonios aún</h3>
                <p className="text-muted-foreground">
                  Los testimonios de tus clientes aparecerán aquí cuando completes ventas
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;