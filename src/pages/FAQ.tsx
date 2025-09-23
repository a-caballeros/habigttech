import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import BackButton from "@/components/BackButton";

const FAQ = () => {
  const faqs = [
    {
      question: "¿Cómo me registro como agente inmobiliario?",
      answer: "Para registrarte como agente, selecciona la opción 'Registrarme como Agente' en la página principal. Completa tu perfil con información profesional y espera la aprobación del administrador."
    },
    {
      question: "¿Cuáles son los planes de suscripción disponibles?",
      answer: "Ofrecemos cuatro planes: Bronce (3 propiedades, Q299/mes o Q2,988/año), Plata (5 propiedades, Q499/mes o Q4,988/año), Oro (7 propiedades, Q799/mes o Q7,988/año) y Platino (propiedades ilimitadas, Q1,299/mes o Q12,988/año). Cada plan incluye diferentes beneficios y límites de publicación."
    },
    {
      question: "¿Cómo publico una propiedad?",
      answer: "Como agente con suscripción activa, ve a tu dashboard y selecciona 'Agregar Nueva Propiedad'. Completa todos los campos requeridos y sube hasta 10 fotos de alta calidad."
    },
    {
      question: "¿Puedo promocionar mis propiedades?",
      answer: "Sí, dependiendo de tu plan de suscripción puedes promocionar ciertas propiedades. El plan Plata permite 1 promoción, Oro permite 3 y Platino permite 5 promociones simultáneas."
    },
    {
      question: "¿Cómo contacto con otros agentes o clientes?",
      answer: "Puedes contactar directamente a través de los botones de llamada, mensaje o agendar visita disponibles en cada propiedad. También tenemos un sistema de mensajería interno."
    },
    {
      question: "¿Qué hacer si tengo problemas técnicos?",
      answer: "Si experimentas problemas técnicos, contacta nuestro soporte en webmaster@habigt.tech o al +502 42457829. También puedes visitar la sección de soporte."
    },
    {
      question: "¿Cómo actualizo mi información de perfil?",
      answer: "Ve a tu perfil desde el menú de usuario. Allí podrás actualizar tu información personal, profesional y foto de perfil."
    },
    {
      question: "¿Habi.gt cobra comisiones por ventas?",
      answer: "No, Habi.gt no cobra comisiones por ventas. Solo cobramos la suscripción mensual según el plan elegido. Todas las comisiones de venta son entre el agente y su cliente."
    },
    {
      question: "¿Habi.gt vende, alquila o compra propiedades?",
      answer: "No, Habi.gt es únicamente una plataforma digital que conecta agentes inmobiliarios con potenciales clientes. No vendemos, alquilamos ni compramos propiedades directamente. Somos el intermediario tecnológico que facilita que los agentes promocionen sus propiedades y se conecten con interesados."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <BackButton />
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">Preguntas Frecuentes</h1>
            <p className="text-muted-foreground">
              Encuentra respuestas a las preguntas más comunes sobre Habi.gt
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>FAQs</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent>
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default FAQ;