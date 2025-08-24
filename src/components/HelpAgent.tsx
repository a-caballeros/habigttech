import React, { useState } from 'react';
import { MessageCircle, X, Phone, Mail, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const HelpAgent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const whatsappNumber = "+50242457829";
  const email = "webmaster@habigt.tech";

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Hola, necesito ayuda con la plataforma de bienes raíces. ¿Podrían asistirme?");
    window.open(`https://wa.me/${whatsappNumber.replace('+', '')}?text=${message}`, '_blank');
  };

  const handleEmailClick = () => {
    const subject = encodeURIComponent("Solicitud de ayuda - Plataforma de Bienes Raíces");
    const body = encodeURIComponent("Hola,\n\nNecesito ayuda con la plataforma. Por favor, contáctenme para resolver mis dudas.\n\nGracias.");
    window.open(`mailto:${email}?subject=${subject}&body=${body}`, '_blank');
  };

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          <Button
            onClick={() => setIsOpen(true)}
            className="relative h-14 w-14 rounded-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <MessageCircle className="h-6 w-6 text-white" />
            <div className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full animate-pulse" />
          </Button>
        )}
      </div>

      {/* Chat Widget */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-80 max-w-[calc(100vw-2rem)]">
          <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-primary to-primary/80 text-white pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-8 bg-white/20 rounded-full flex items-center justify-center">
                    <MessageCircle className="h-4 w-4" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-semibold">Agente de Ayuda</CardTitle>
                    <Badge variant="secondary" className="bg-green-500/20 text-green-100 border-green-400/30">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-1 animate-pulse" />
                      En línea
                    </Badge>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8 p-0 text-white hover:bg-white/20"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="p-6 space-y-4">
              <div className="text-center">
                <CardDescription className="text-base mb-4">
                  ¡Hola! 👋 Estoy aquí para ayudarte con cualquier duda sobre nuestra plataforma de bienes raíces.
                </CardDescription>
                
                <div className="space-y-3">
                  <Button
                    onClick={handleWhatsAppClick}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 h-auto transition-colors duration-200"
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <Phone className="h-5 w-5" />
                      <div className="text-left">
                        <div className="font-semibold">WhatsApp</div>
                        <div className="text-xs opacity-90">{whatsappNumber}</div>
                      </div>
                      <ExternalLink className="h-4 w-4 ml-auto" />
                    </div>
                  </Button>

                  <Button
                    onClick={handleEmailClick}
                    variant="outline"
                    className="w-full border-primary text-primary hover:bg-primary hover:text-white py-3 h-auto transition-colors duration-200"
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <Mail className="h-5 w-5" />
                      <div className="text-left">
                        <div className="font-semibold">Email</div>
                        <div className="text-xs opacity-70">{email}</div>
                      </div>
                      <ExternalLink className="h-4 w-4 ml-auto" />
                    </div>
                  </Button>
                </div>

                <div className="mt-4 p-3 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    📞 <strong>Horario de atención:</strong><br />
                    Lunes a Viernes: 8:00 AM - 6:00 PM<br />
                    Sábados: 9:00 AM - 2:00 PM
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default HelpAgent;