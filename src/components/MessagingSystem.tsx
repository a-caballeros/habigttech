import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const MessagingSystem = () => {
  const { user, userType } = useAuth();
  const navigate = useNavigate();

  const getEmptyMessage = () => {
    if (userType === 'agent') {
      return {
        title: "No hay consultas de clientes",
        description: "Cuando los clientes se interesen en tus propiedades, podrás comunicarte con ellos aquí."
      };
    } else {
      return {
        title: "No hay conversaciones",
        description: "Cuando contactes agentes sobre propiedades, podrás ver tus conversaciones aquí."
      };
    }
  };

  const message = getEmptyMessage();

  return (
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
        <h1 className="text-3xl font-bold">Mensajes</h1>
      </div>

      <Card className="text-center py-16">
        <CardContent>
          <MessageCircle className="h-16 w-16 mx-auto text-muted-foreground mb-6" />
          <h3 className="text-xl font-semibold mb-3">{message.title}</h3>
          <p className="text-muted-foreground max-w-md mx-auto mb-6">
            {message.description}
          </p>
          {userType === 'agent' ? (
            <Button onClick={() => navigate('/add-property')}>
              Agregar Primera Propiedad
            </Button>
          ) : (
            <Button onClick={() => navigate('/')}>
              Explorar Propiedades
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MessagingSystem;