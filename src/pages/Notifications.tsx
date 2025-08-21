import { useState } from "react";
import { Bell, Check, X, Heart, MessageCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "message",
      title: "Nuevo mensaje",
      description: "Juan Pérez te ha enviado un mensaje sobre la propiedad en Zona 14",
      time: "Hace 2 horas",
      read: false,
      icon: MessageCircle
    },
    {
      id: 2,
      type: "favorite",
      title: "Propiedad favorita disponible",
      description: "La casa en Antigua Guatemala que agregaste a favoritos tiene nuevo precio",
      time: "Hace 1 día",
      read: false,
      icon: Heart
    },
    {
      id: 3,
      type: "alert",
      title: "Precio reducido",
      description: "El apartamento en Zona 11 redujo su precio en Q50,000",
      time: "Hace 2 días",
      read: true,
      icon: AlertCircle
    }
  ]);

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const removeNotification = (id: number) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'message': return 'text-blue-500';
      case 'favorite': return 'text-red-500';
      case 'alert': return 'text-yellow-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Notificaciones</h1>
              <p className="text-muted-foreground">
                {notifications.filter(n => !n.read).length} notificaciones sin leer
              </p>
            </div>
            
            <Button 
              variant="outline" 
              onClick={markAllAsRead}
              disabled={notifications.every(n => n.read)}
            >
              <Check className="h-4 w-4 mr-2" />
              Marcar todas como leídas
            </Button>
          </div>

          <div className="space-y-4">
            {notifications.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <Bell className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No hay notificaciones</h3>
                  <p className="text-muted-foreground">
                    Te mantendremos informado cuando haya nuevas actualizaciones
                  </p>
                </CardContent>
              </Card>
            ) : (
              notifications.map((notification) => {
                const IconComponent = notification.icon;
                return (
                  <Card 
                    key={notification.id} 
                    className={`transition-all ${!notification.read ? 'border-primary bg-primary/5' : ''}`}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <div className={`p-2 rounded-full bg-background ${getIconColor(notification.type)}`}>
                            <IconComponent className="h-4 w-4" />
                          </div>
                          <div className="flex-1">
                            <CardTitle className="text-base flex items-center gap-2">
                              {notification.title}
                              {!notification.read && (
                                <Badge variant="secondary" className="text-xs">Nuevo</Badge>
                              )}
                            </CardTitle>
                            <p className="text-sm text-muted-foreground mt-1">
                              {notification.description}
                            </p>
                            <p className="text-xs text-muted-foreground mt-2">
                              {notification.time}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          {!notification.read && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => markAsRead(notification.id)}
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeNotification(notification.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;