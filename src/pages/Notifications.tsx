import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { Bell, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";

const Notifications = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

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
            <h1 className="text-3xl font-bold">Notificaciones</h1>
          </div>

          <Card className="text-center py-16">
            <CardContent>
              <Bell className="h-16 w-16 mx-auto text-muted-foreground mb-6" />
              <h3 className="text-xl font-semibold mb-3">No hay notificaciones</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Te mantendremos informado sobre nuevas propiedades, cambios de precio 
                y mensajes importantes.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Notifications;