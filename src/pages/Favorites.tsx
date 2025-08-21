import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";

const Favorites = () => {
  const { user, userType } = useAuth();
  const navigate = useNavigate();

  // Redirect non-clients
  if (userType !== 'client') {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Acceso Restringido</h1>
          <p className="text-muted-foreground mb-4">Esta funcionalidad es solo para clientes.</p>
          <Button onClick={() => navigate('/')}>Volver al Inicio</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="h-4 w-4" />
              Volver
            </Button>
            <h1 className="text-3xl font-bold">Mis Favoritos</h1>
          </div>

          <Card className="text-center py-16">
            <CardContent>
              <Heart className="h-16 w-16 mx-auto text-muted-foreground mb-6" />
              <h3 className="text-xl font-semibold mb-3">No tienes propiedades favoritas</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Cuando encuentres propiedades que te gusten, podrás guardarlas aquí 
                haciendo clic en el corazón de cada propiedad.
              </p>
              <Button onClick={() => navigate('/')}>
                Explorar Propiedades
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Favorites;