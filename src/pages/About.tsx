import { usePageSEO } from "@/hooks/usePageSEO";
import MinimalistNavigation from "@/components/MinimalistNavigation";
import Footer from "@/components/Footer";
import { Building2, Zap, BarChart3, Shield } from "lucide-react";

const About = () => {
  usePageSEO({
    title: "Sobre Nosotros | Habi.gt",
    description: "Conoce la historia y misión de Habi.gt, la startup guatemalteca que está revolucionando el mercado inmobiliario con inteligencia artificial.",
    keywords: "sobre nosotros, habi.gt, guatemala, startup, inmobiliaria, inteligencia artificial",
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <MinimalistNavigation />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-background to-card">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl font-bold text-foreground mb-6">Sobre Nosotros</h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Revolucionando el futuro inmobiliario de Guatemala con tecnología avanzada e inteligencia artificial
              </p>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
                <p className="text-justify text-lg leading-relaxed">
                  En un mercado inmobiliario en constante cambio, donde la tecnología se ha convertido en una herramienta esencial, nace HabiGT. Somos una startup guatemalteca que, desde 2025, está revolucionando la forma en que los agentes de bienes raíces gestionan y venden sus propiedades.
                </p>
                
                <p className="text-justify text-lg leading-relaxed">
                  La idea de HabiGT surgió en 2023, en un momento en que era evidente que los corredores de propiedades enfrentaban grandes desafíos. La gestión manual, la falta de herramientas de análisis y la dificultad para optimizar el marketing digital se estaban convirtiendo en barreras para el éxito. En 2024, esa idea se convirtió en un plan, y en 2025, HabiGT se materializó para resolver esos problemas.
                </p>
                
                <p className="text-justify text-lg leading-relaxed">
                  Hemos creado una plataforma integral que no solo facilita la venta y renta de inmuebles, sino que también potencia cada etapa del proceso. Nuestra tecnología está impulsada por inteligencia artificial (IA), lo que nos permite ofrecer soluciones de marketing de vanguardia. La IA automatiza y optimiza la gestión de redes sociales, desde la creación de contenido hasta la programación de publicaciones, garantizando una presencia digital constante y efectiva.
                </p>
                
                <p className="text-justify text-lg leading-relaxed">
                  Además, nuestro enfoque en el análisis de datos es lo que realmente nos diferencia. La IA evalúa patrones de comportamiento de los usuarios, analiza el rendimiento de las campañas y proporciona información valiosa para mejorar los leads y el alcance de las propiedades. Esto permite a los agentes de bienes raíces tomar decisiones informadas, enfocar sus esfuerzos donde más importan y, en última instancia, cerrar más tratos.
                </p>
                
                <p className="text-justify text-lg leading-relaxed">
                  En HabiGT, creemos en el poder de la tecnología para transformar el sector inmobiliario. Somos la solución que los corredores de bienes raíces necesitan para ser más eficientes, competitivos y exitosos en la era digital.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-card">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground text-center mb-12">
                Lo que nos hace únicos
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="h-8 w-8 text-accent-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Inteligencia Artificial</h3>
                  <p className="text-muted-foreground text-sm">
                    Tecnología avanzada que automatiza y optimiza cada aspecto del marketing inmobiliario
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="h-8 w-8 text-accent-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Análisis de Datos</h3>
                  <p className="text-muted-foreground text-sm">
                    Insights profundos del mercado y comportamiento de usuarios para decisiones inteligentes
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                    <Building2 className="h-8 w-8 text-accent-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Enfoque Local</h3>
                  <p className="text-muted-foreground text-sm">
                    Diseñado específicamente para el mercado inmobiliario guatemalteco
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8 text-accent-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Confianza y Seguridad</h3>
                  <p className="text-muted-foreground text-sm">
                    Plataforma segura con agentes verificados para transacciones profesionales
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-foreground mb-8">Nuestra Misión</h2>
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                Empoderar a los agentes inmobiliarios de Guatemala con las herramientas tecnológicas más avanzadas, 
                simplificando sus procesos y maximizando sus resultados en el mercado de bienes raíces.
              </p>
              
              <div className="bg-gradient-to-r from-accent/10 to-primary/10 rounded-lg p-8 border border-border">
                <h3 className="text-2xl font-semibold text-foreground mb-4">Visión 2025</h3>
                <p className="text-muted-foreground text-lg">
                  Ser la plataforma inmobiliaria líder en Guatemala, reconocida por su innovación tecnológica 
                  y su capacidad para transformar la manera en que se comercializan las propiedades en el país.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-16 bg-card">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-foreground mb-4">¿Listo para revolucionar tu negocio inmobiliario?</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Únete a HabiGT y descubre cómo la inteligencia artificial puede transformar tu éxito profesional
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/auth"
                  className="inline-flex items-center px-8 py-3 bg-accent text-accent-foreground rounded-lg hover:bg-accent/80 transition-colors font-medium"
                >
                  Comenzar Ahora
                </a>
                <a 
                  href="mailto:webmaster@habigt.tech"
                  className="inline-flex items-center px-8 py-3 border border-border text-foreground rounded-lg hover:bg-card/50 transition-colors font-medium"
                >
                  Contáctanos
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;