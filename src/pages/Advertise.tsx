import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import BackButton from "@/components/BackButton";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { CheckCircle2, TrendingUp, Users, Zap, FileImage, MessageSquare, ExternalLink } from "lucide-react";
import SEOHead from "@/components/SEOHead";

const Advertise = () => {
  return (
    <>
      <SEOHead 
        title="Anúnciate con Nosotros - Habi.gt | Publicidad en Bienes Raíces"
        description="Promociona tu negocio inmobiliario en Habi.gt. Planes desde Q250/mes. Audiencia especializada en bienes raíces y desarrollo inmobiliario en Guatemala."
        keywords="publicidad bienes raíces guatemala, anuncios inmobiliarios, marketing digital construcción, desarrollo inmobiliario guatemala"
      />
      <div className="min-h-screen bg-background">
        <Navigation />
        
        <main className="container mx-auto px-4 py-8">
          <BackButton />
          
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Anúnciate con Nosotros
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Conecta con la audiencia más especializada en bienes raíces y desarrollo inmobiliario de Guatemala
            </p>
          </div>

          {/* Propuesta de Valor */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-primary" />
                ¿Por qué anunciarse con Habi.gt?
              </CardTitle>
              <CardDescription>
                Tu plataforma ideal para alcanzar profesionales del sector inmobiliario
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Audiencia Especializada</h3>
                  <p className="text-muted-foreground">
                    Bienes raíces y desarrollo inmobiliario - público altamente calificado y especializado
                  </p>
                </div>
                <div className="text-center">
                  <Zap className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Tráfico en Crecimiento</h3>
                  <p className="text-muted-foreground">
                    Gestión con IA tanto en web como redes sociales que maximiza el rendimiento y engagement
                  </p>
                </div>
                <div className="text-center">
                  <TrendingUp className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Alto Rendimiento</h3>
                  <p className="text-muted-foreground">
                    Optimización constante con inteligencia artificial para mejores resultados de tu inversión
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabla de Precios */}
          <Card className="mb-12">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Planes de Publicidad</CardTitle>
              <CardDescription>
                Elige el plan que mejor se adapte a tus necesidades
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {/* Plan Mensual */}
                <Card className="relative">
                  <CardHeader className="text-center pb-8">
                    <CardTitle className="text-xl">Plan Básico Mensual</CardTitle>
                    <div className="text-3xl font-bold text-primary">Q250</div>
                    <p className="text-sm text-muted-foreground">por mes</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <span>Banner publicitario (300x250px)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <span>Posicionamiento estratégico</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <span>Estadísticas mensuales</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <span>Flexibilidad de cancelación</span>
                    </div>
                    <Button 
                      className="w-full mt-6" 
                      variant="outline"
                      onClick={() => window.open('https://pay.n1co.shop/pl/WdM1Rh3Ad', '_blank')}
                    >
                      Contratar Plan Básico
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>

                {/* Plan Anual */}
                <Card className="relative border-primary">
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary">
                    AHORRA 17%
                  </Badge>
                  <CardHeader className="text-center pb-8">
                    <CardTitle className="text-xl">Plan Premium Anual</CardTitle>
                    <div className="text-3xl font-bold text-primary">Q2,500</div>
                    <p className="text-sm text-muted-foreground">por año</p>
                    <p className="text-xs text-green-600 font-medium">
                      Equivale a Q208/mes - Ahorro de Q500 al año
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <span>Todo lo del plan básico</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <span>Posicionamiento premium</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <span>Reportes detallados trimestrales</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <span>Soporte prioritario</span>
                    </div>
                    <Button 
                      className="w-full mt-6"
                      onClick={() => window.open('https://pay.n1co.shop/pl/R9aK5IoO0', '_blank')}
                    >
                      Suscribirse al Plan Premium
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          {/* Especificaciones Técnicas */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <FileImage className="h-6 w-6 text-primary" />
                Especificaciones Técnicas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Requisitos del Banner</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li><strong>Tamaño:</strong> 300 × 250 píxeles (exacto)</li>
                    <li><strong>Formato:</strong> PNG únicamente</li>
                    <li><strong>Peso máximo:</strong> 2MB</li>
                    <li><strong>Resolución:</strong> 72 DPI mínimo</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Proceso de Envío
                  </h3>
                  <div className="space-y-3">
                    <p className="text-muted-foreground mb-2">Envía tu material publicitario a:</p>
                    <div className="bg-muted p-3 rounded-lg">
                      <p className="font-semibold">📧 webmaster@habigt.tech</p>
                    </div>
                    <p className="text-sm text-muted-foreground text-center">o</p>
                    <div className="bg-muted p-3 rounded-lg">
                      <p className="font-semibold">📱 WhatsApp registrado</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Términos y Condiciones */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="text-2xl">Términos y Condiciones</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Política de Cancelación</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• <strong>Plan Mensual:</strong> Cancelación con 7 días de anticipación</li>
                  <li>• <strong>Plan Anual:</strong> No reembolsable para garantizar el compromiso y continuidad del servicio</li>
                  <li>• Las cancelaciones deben solicitarse por escrito a webmaster@habigt.tech</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3">Contenido Permitido</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Marcas relacionadas con <strong>construcción</strong></li>
                  <li>• Empresas de <strong>desarrollo inmobiliario</strong></li>
                  <li>• Servicios de <strong>bienes raíces</strong></li>
                  <li>• Productos y servicios complementarios al sector inmobiliario</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Restricciones</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• No se permiten contenidos ofensivos o inapropiados</li>
                  <li>• Nos reservamos el derecho de rechazar material que no cumpla con nuestros estándares</li>
                  <li>• El contenido debe cumplir con las leyes guatemaltecas de publicidad</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* CTA Final */}
          <Card className="text-center bg-gradient-to-r from-primary/10 to-secondary/10">
            <CardContent className="py-12">
              <h2 className="text-3xl font-bold mb-4">¿Listo para empezar?</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Únete a las marcas líderes que confían en Habi.gt para conectar con su audiencia objetivo
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="text-lg px-8"
                  onClick={() => window.open('https://pay.n1co.shop/pl/R9aK5IoO0', '_blank')}
                >
                  Suscribirse al Plan Premium Anual
                  <ExternalLink className="h-5 w-5 ml-2" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-lg px-8"
                  onClick={() => window.open('https://pay.n1co.shop/pl/WdM1Rh3Ad', '_blank')}
                >
                  Contratar Plan Básico Mensual
                  <ExternalLink className="h-5 w-5 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Advertise;