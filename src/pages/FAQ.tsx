import { usePageSEO } from "@/hooks/usePageSEO";
import MinimalistNavigation from "@/components/MinimalistNavigation";
import Footer from "@/components/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQ = () => {
  usePageSEO({
    title: "Preguntas Frecuentes | Habi.gt",
    description: "Encuentra respuestas a las preguntas más frecuentes sobre Habi.gt, la plataforma líder de bienes raíces en Guatemala.",
    keywords: "faq, preguntas frecuentes, habi.gt, guatemala, inmobiliaria, bienes raices",
  });

  const faqs = [
    {
      question: "¿Qué es HabiGT?",
      answer: "HabiGT es una plataforma digital web y móvil que conecta agentes inmobiliarios registrados con potenciales compradores y arrendatarios, facilitando la promoción, venta y alquiler de propiedades en Guatemala mediante tecnología avanzada."
    },
    {
      question: "¿Cómo funciona HabiGT?",
      answer: "Los agentes autorizados registran y publican sus inmuebles con información detallada que se muestra a usuarios interesados. La plataforma permite gestionar propiedades, recibir consultas y cerrar operaciones de forma eficiente y segura."
    },
    {
      question: "¿HabiGT es solo para corredores de bienes raíces?",
      answer: "Sí, HabiGT está diseñado para agentes inmobiliarios registrados, quienes usan la plataforma para promocionar y gestionar la venta o alquiler de propiedades, asegurando profesionalismo y confianza en las transacciones."
    },
    {
      question: "¿Cómo me ayuda la IA de HabiGT a vender más propiedades?",
      answer: "La inteligencia artificial optimiza anuncios, genera descripciones atractivas, analiza datos de mercado y comportamiento de usuarios para que los agentes puedan enfocar mejor sus estrategias y captar clientes más rápidamente."
    },
    {
      question: "¿Qué tipo de análisis de datos ofrece la plataforma?",
      answer: "HabiGT proporciona reportes y métricas sobre el rendimiento de los anuncios, cantidad de visitas, intereses de los usuarios y tendencias del mercado para mejorar la toma de decisiones comerciales."
    },
    {
      question: "¿HabiGT me ayuda con la gestión de mis redes sociales?",
      answer: "La plataforma puede integrarse con redes sociales y ofrece herramientas para facilitar la difusión automática de propiedades y generación de contenidos optimizados mediante inteligencia artificial."
    },
    {
      question: "¿Es fácil de usar la plataforma?",
      answer: "Sí, HabiGT está diseñada para ser intuitiva y accesible, con interfaces claras tanto en web como en móvil, facilitando el trabajo diario de los agentes inmobiliarios."
    },
    {
      question: "¿Cómo puedo registrarme en HabiGT?",
      answer: "Para registrarse, los agentes pueden crear una cuenta en el sitio web o aplicación, proporcionando información válida para su verificación y autorización para publicar inmuebles."
    },
    {
      question: "¿Qué planes de precios ofrecen?",
      answer: "HabiGT ofrece diferentes planes que se adaptan a las necesidades del agente, desde opciones básicas para comenzar hasta planes avanzados con mayor capacidad y funcionalidades. Detalles específicos están disponibles en la plataforma."
    },
    {
      question: "¿HabiGT ofrece soporte al cliente?",
      answer: "Sí, HabiGT cuenta con un equipo de soporte que atiende consultas, problemas técnicos y asistencia general a través de correo electrónico y otros canales disponibles."
    },
    {
      question: "¿Mi información y la de mis clientes están seguras en la plataforma?",
      answer: "HabiGT aplica estrictas medidas de seguridad y políticas de privacidad para proteger los datos personales de los usuarios, cumpliendo con la legislación vigente en Guatemala."
    },
    {
      question: "¿Qué hago si tengo un problema técnico?",
      answer: "Puede contactar al equipo de soporte de HabiGT enviando un correo a webmaster@habigt.tech, donde recibirán ayuda oportuna para resolver cualquier incidencia técnica."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <MinimalistNavigation />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">Preguntas Frecuentes</h1>
            <p className="text-lg text-muted-foreground">
              Encuentra respuestas a las preguntas más comunes sobre HabiGT
            </p>
          </div>
          
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border border-border rounded-lg px-6 py-2 bg-card"
              >
                <AccordionTrigger className="text-left text-foreground font-medium hover:text-accent transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-justify pt-2">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-12 p-6 bg-card border border-border rounded-lg text-center">
            <h3 className="text-xl font-semibold text-foreground mb-2">¿No encontraste la respuesta que buscabas?</h3>
            <p className="text-muted-foreground mb-4">
              Contáctanos directamente y nuestro equipo te ayudará con cualquier consulta adicional.
            </p>
            <a 
              href="mailto:webmaster@habigt.tech"
              className="inline-flex items-center px-6 py-3 bg-accent text-accent-foreground rounded-lg hover:bg-accent/80 transition-colors font-medium"
            >
              Contactar Soporte
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FAQ;