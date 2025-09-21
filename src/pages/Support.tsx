import { HelpCircle, MessageCircle, Mail, Book, Users, Zap } from "lucide-react";
import MinimalistNavigation from "@/components/MinimalistNavigation";
import Footer from "@/components/Footer";
import BackButton from "@/components/BackButton";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Support = () => {
  const supportOptions = [
    {
      icon: Mail,
      title: "Soporte por Email",
      description: "Envíanos tus consultas y nuestro equipo te responderá en menos de 24 horas.",
      action: "Contactar vía Email",
      link: "mailto:webmaster@habigt.tech"
    },
    {
      icon: Book,
      title: "Centro de Ayuda",
      description: "Consulta nuestras guías y tutoriales para resolver dudas comunes.",
      action: "Ver Guías",
      link: "/faq"
    },
    {
      icon: MessageCircle,
      title: "Chat en Vivo",
      description: "Chatea directamente con nuestro equipo de soporte técnico.",
      action: "Iniciar Chat",
      link: "#"
    }
  ];

  const commonIssues = [
    {
      title: "¿Cómo registro una propiedad?",
      description: "Guía paso a paso para publicar tu primera propiedad en HabiGT."
    },
    {
      title: "Problemas de acceso a la cuenta",
      description: "Soluciones para recuperar tu contraseña o resolver problemas de login."
    },
    {
      title: "Gestión de suscripciones",
      description: "Información sobre planes, pagos y actualizaciones de cuenta."
    },
    {
      title: "Optimización de anuncios",
      description: "Consejos para mejorar la visibilidad de tus propiedades."
    }
  ];

  return (
    <>
      <SEOHead 
        title="Soporte - HabiGT | Centro de Ayuda Plataforma Inmobiliaria"
        description="Centro de soporte de HabiGT. Encuentra ayuda, guías y asistencia técnica para usar nuestra plataforma inmobiliaria en Guatemala."
        keywords="soporte HabiGT, ayuda técnica, centro de ayuda, plataforma inmobiliaria Guatemala"
      />
      <div className="min-h-screen bg-background flex flex-col">
        <MinimalistNavigation />
        
        <main className="flex-1 container mx-auto px-4 py-12">
          <BackButton />
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-foreground mb-4">
                Centro de Soporte
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Estamos aquí para ayudarte. Encuentra respuestas rápidas o contacta directamente con nuestro equipo de soporte.
              </p>
            </div>

            {/* Support Options */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {supportOptions.map((option, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="text-center">
                    <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <option.icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{option.title}</CardTitle>
                    <CardDescription>{option.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <Button asChild className="w-full">
                      <a href={option.link}>{option.action}</a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Quick Help Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Common Issues */}
              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
                  <HelpCircle className="h-6 w-6 text-primary" />
                  Problemas Comunes
                </h2>
                <div className="space-y-4">
                  {commonIssues.map((issue, index) => (
                    <Card key={index} className="hover:bg-muted/50 transition-colors cursor-pointer">
                      <CardContent className="p-4">
                        <h3 className="font-medium text-foreground mb-2">{issue.title}</h3>
                        <p className="text-sm text-muted-foreground">{issue.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
                  <Users className="h-6 w-6 text-primary" />
                  Contacto Directo
                </h2>
                
                <Card>
                  <CardContent className="p-6 space-y-6">
                    <div>
                      <h3 className="font-medium text-foreground mb-2 flex items-center gap-2">
                        <Mail className="h-4 w-4 text-primary" />
                        Email de Soporte
                      </h3>
                      <a 
                        href="mailto:webmaster@habigt.tech"
                        className="text-primary hover:text-primary/80 transition-colors"
                      >
                        webmaster@habigt.tech
                      </a>
                      <p className="text-sm text-muted-foreground mt-1">
                        Respuesta en menos de 24 horas
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-foreground mb-2 flex items-center gap-2">
                        <Zap className="h-4 w-4 text-primary" />
                        Soporte Técnico
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        Para problemas técnicos urgentes, incluye en tu mensaje:
                      </p>
                      <ul className="text-sm text-muted-foreground mt-2 list-disc list-inside space-y-1">
                        <li>Descripción detallada del problema</li>
                        <li>Navegador que estás usando</li>
                        <li>Capturas de pantalla si es posible</li>
                      </ul>
                    </div>

                    <div className="bg-primary/5 p-4 rounded-lg">
                      <h4 className="font-medium text-foreground mb-2">Horario de Atención</h4>
                      <p className="text-sm text-muted-foreground">
                        Lunes a Viernes: 8:00 AM - 6:00 PM (GMT-6)<br />
                        Sábados: 9:00 AM - 2:00 PM (GMT-6)
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Support;