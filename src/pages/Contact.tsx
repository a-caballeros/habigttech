import { Mail, Phone, MapPin, Clock } from "lucide-react";
import MinimalistNavigation from "@/components/MinimalistNavigation";
import Footer from "@/components/Footer";
import BackButton from "@/components/BackButton";
import SEOHead from "@/components/SEOHead";

const Contact = () => {
  return (
    <>
      <SEOHead 
        title="Contacto - HabiGT | Plataforma Inmobiliaria Guatemala"
        description="Contáctanos para resolver tus dudas sobre HabiGT, la plataforma líder de bienes raíces en Guatemala. Soporte técnico y comercial disponible."
        keywords="contacto HabiGT, soporte técnico, inmobiliario, guatemala, bienes raíces, inmobiliario, casas en venta, apartamentos en alquiler, casas en alquiler, apartamentos en venta, propiedades en venta, terrenos en venta, bienes raíces de lujo, inmuebles de lujo, propiedades comerciales, oficinas en venta, invertir en bienes raíces, comprar casa, agencia inmobiliaria, asesor inmobiliario, casas de segunda mano, apartamentos nuevos, vender propiedad, avalúo de casa, hipoteca para casa, financiamiento de inmuebles, zona 10, apartamentos en venta zona 10, san miguel petapa, casas en venta san miguel petapa, mixco, apartamentos en alquiler mixco, casas con piscina, casas con jardín, propiedades frente al lago, casas en el lago de atitlán, plataforma inmobiliaria Guatemala, bienes raíces"
      />
      <div className="min-h-screen bg-background flex flex-col">
        <MinimalistNavigation />
        
        <main className="flex-1 container mx-auto px-4 py-12">
          <BackButton />
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-foreground mb-4">
                Contáctanos
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                ¿Tienes preguntas sobre HabiGT? Estamos aquí para ayudarte. Contacta con nuestro equipo de soporte.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-semibold text-foreground mb-6">
                    Información de Contacto
                  </h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-3 rounded-lg">
                        <Mail className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground mb-1">Email</h3>
                        <p className="text-muted-foreground mb-1">
                          Para consultas generales y soporte técnico
                        </p>
                        <a 
                          href="mailto:webmaster@habigt.tech"
                          className="text-primary hover:text-primary/80 transition-colors"
                        >
                          webmaster@habigt.tech
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-3 rounded-lg">
                        <Phone className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground mb-1">Teléfono</h3>
                        <p className="text-muted-foreground mb-1">
                          Atención telefónica durante horario comercial
                        </p>
                        <span className="text-foreground">+502 42457829</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-3 rounded-lg">
                        <MapPin className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground mb-1">Ubicación</h3>
                        <p className="text-muted-foreground mb-1">
                          Oficinas principales
                        </p>
                        <span className="text-foreground">Ciudad de Guatemala, Guatemala</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-3 rounded-lg">
                        <Clock className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground mb-1">Horario de Atención</h3>
                        <p className="text-muted-foreground mb-1">
                          Lunes a Viernes: 8:00 AM - 6:00 PM
                        </p>
                        <p className="text-muted-foreground">
                          Sábados: 9:00 AM - 2:00 PM
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-card border border-border rounded-lg p-8">
                <h2 className="text-2xl font-semibold text-foreground mb-6">
                  Envíanos un Mensaje
                </h2>
                
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Nombre *
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Asunto *
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Mensaje *
                    </label>
                    <textarea
                      rows={5}
                      className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                      required
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-primary text-primary-foreground py-3 px-6 rounded-md hover:bg-primary/90 transition-colors font-medium"
                  >
                    Enviar Mensaje
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Contact;
