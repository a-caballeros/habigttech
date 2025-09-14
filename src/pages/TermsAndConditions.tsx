import { usePageSEO } from "@/hooks/usePageSEO";
import MinimalistNavigation from "@/components/MinimalistNavigation";
import Footer from "@/components/Footer";

const TermsAndConditions = () => {
  usePageSEO({
    title: "Términos y Condiciones | Habi.gt",
    description: "Términos y condiciones de uso de la plataforma Habi.gt para agentes inmobiliarios en Guatemala.",
    keywords: "términos, condiciones, habi.gt, guatemala, inmobiliaria",
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <MinimalistNavigation />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-8">Términos y Condiciones</h1>
          
          <div className="prose prose-lg max-w-none text-muted-foreground space-y-8">
            <section>
              <p className="text-justify">
                Los presentes Términos y Condiciones regulan el uso, acceso y navegación del sitio web habigt.tech, sus servicios y contenidos digitales ofrecidos en el mismo. Al utilizar este sitio, el Usuario acepta cumplir con íntegramente estos términos, así como con las demás políticas aquí referidas.
              </p>
              
              <p className="text-justify">
                Este documento establece las reglas y pautas legales que regulan la relación entre habigt.tech como propietario y operador del sitio y los usuarios que ingresan y acceden a sus recursos.
              </p>
              
              <p className="text-justify">El alcance de estos términos comprende:</p>
              
              <ul className="list-disc pl-6 space-y-2">
                <li>La descripción de los derechos y obligaciones del Usuario en cuanto a la navegación, uso correcto y legal de la plataforma digital y los recursos ofrecidos en habigt.tech.</li>
                <li>Las condiciones sobre la propiedad intelectual del contenido, imágenes, textos, software, marcas y cualquier material disponible en el sitio, que pertenecen a habigt.tech o a sus licenciantes.</li>
                <li>Las limitaciones de uso, especificando actividades prohibidas como la alteración, copia no autorizada, distribución, explotación comercial, acceso no autorizado o automatizado (bots, scraping).</li>
                <li>La responsabilidad del usuario respecto al registro, mantenimiento de datos personales y credenciales para cuentas, en caso de que existan servicios que requieran autenticación.</li>
                <li>La autorización para habigt.tech de modificar estos términos y condiciones cuando se considere necesario, con la recomendación de que el usuario revise periódicamente las actualizaciones.</li>
                <li>La aplicación de estos términos para todos los visitantes, usuarios registrados o no registrados, y el alcance geográfico y legal aplicable.</li>
                <li>Condiciones relativas a la privacidad y protección de datos en línea, con remisión a la política de privacidad del sitio.</li>
              </ul>
              
              <p className="text-justify">
                Este alcance busca proteger tanto a habigt.tech como a sus usuarios, asegurando un ambiente digital seguro, legal y respetuoso, y definiendo las bases para el uso correcto de la plataforma.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Aceptación de los términos</h2>
              <p className="text-justify">
                Al acceder, navegar o utilizar el sitio web habigt.tech (en adelante, el "Sitio") y los servicios que ofrece, el usuario declara que ha leído, entendido y acepta cumplir de forma íntegra y sin reservas estos Términos y Condiciones, así como las demás políticas, instrucciones y normativas que se encuentren vinculadas o referidas en el Sitio.
              </p>
              
              <p className="text-justify">
                El uso del Sitio constituye aceptación expresa y vinculante de estos términos, por lo que si el usuario no está de acuerdo con alguno de ellos, deberá abstenerse de acceder y hacer uso del Sitio y sus servicios.
              </p>
              
              <p className="text-justify">
                Habigt.tech se reserva el derecho de modificar, actualizar o cambiar en cualquier momento y sin previo aviso los presentes términos, siendo responsabilidad del usuario revisar periódicamente este documento para estar al tanto de los cambios. El uso continuado del Sitio después de dichas modificaciones implica la aceptación de las mismas.
              </p>
              
              <p className="text-justify">
                En caso de que el acceso o uso del Sitio requiera la creación de una cuenta o registro, el usuario acepta proporcionar información verídica, completa y actualizada, manteniendo la confidencialidad de sus credenciales y asumiendo toda responsabilidad por el uso que se haga con ellas.
              </p>
              
              <p className="text-justify">
                Esta aceptación de los términos es indispensable para garantizar un uso adecuado, seguro y legal de habigt.tech.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Uso de la plataforma</h2>
              <p className="text-justify">
                El usuario se compromete a utilizar la plataforma habigt.tech de manera responsable, ética y conforme a la legislación vigente, evitando cualquier conducta que pueda dañar, afectar o impedir el funcionamiento adecuado de la misma.
              </p>
              
              <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Restricciones de uso</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Queda prohibido utilizar la plataforma para subir, publicar o distribuir contenidos que sean ilegales, ofensivos, difamatorios, discriminatorios, violentos, que vulneren derechos de terceros o que sean contrarios a la moral y buenas costumbres.</li>
                <li>No se permite el uso automatizado, robótico o mediante bots que pueda generar sobrecarga en el sistema o vulnerar medidas de seguridad de la plataforma.</li>
                <li>Está prohibida la reproducción, distribución, modificación o explotación comercial del contenido del sitio sin autorización previa y por escrito de habigt.tech.</li>
                <li>El usuario no podrá realizar ningún acto que pueda comprometer la seguridad, privacidad o integridad de otros usuarios, ni intentar acceder a datos o secciones restringidas de la plataforma.</li>
              </ul>
              
              <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Responsabilidades del usuario</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Mantener la veracidad, exactitud y actualización de la información proporcionada al registrarse o interactuar con la plataforma.</li>
                <li>Custodiar su información de acceso y notificar inmediatamente cualquier uso no autorizado o vulneración de seguridad.</li>
                <li>Respetar las normativas internas, políticas y cualquier regla adicional disponible en el sitio.</li>
              </ul>
              
              <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Información y datos que pueden subir</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Los usuarios solo podrán subir información, archivos y contenidos (como texto, imágenes, videos, datos) para los cuales tengan derechos o permisos legales.</li>
                <li>Está prohibida la publicación de contenido protegido por derechos de autor sin autorización expresa.</li>
                <li>Habigt.tech puede ejercer su derecho a moderar, eliminar o restringir cualquier contenido que incumpla estas condiciones o que se considere inapropiado.</li>
              </ul>
              
              <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Uso de datos personales</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>La recopilación, almacenamiento, procesamiento y uso de los datos personales proporcionados por los usuarios se realizará conforme a la Política de Privacidad de habigt.tech, respetando la legislación aplicable en materia de protección de datos.</li>
                <li>Los datos serán utilizados para la gestión de la plataforma, mejora de servicios, comunicación con los usuarios y cumplimiento de obligaciones legales.</li>
                <li>Los usuarios tienen derecho a acceder, rectificar y cancelar su información personal conforme a lo establecido en la normativa vigente.</li>
              </ul>
              
              <p className="text-justify">
                El incumplimiento de estas condiciones podrá derivar en medidas correctivas por parte de habigt.tech, incluyendo la suspensión temporal o definitiva del acceso y uso de la plataforma.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Servicios ofrecidos</h2>
              <p className="text-justify">
                Habigt.tech es una plataforma digital, accesible tanto desde la web como desde dispositivos móviles, diseñada para facilitar y potenciar la promoción, venta y alquiler de inmuebles. Su objetivo principal es conectar de manera eficiente y segura a agentes inmobiliarios registrados con potenciales compradores y arrendatarios.
              </p>
              
              <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Descripción de la plataforma y sus servicios</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Promoción de inmuebles:</strong> Agentes inmobiliarios autorizados pueden registrar y publicar sus propiedades para venta o alquiler, incluyendo detalles completos como ubicación, características, imágenes, planos y videos.</li>
                <li><strong>Visibilidad y alcance:</strong> La plataforma ofrece a los agentes un espacio optimizado para que sus anuncios lleguen a un amplio público objetivo, potenciando la comercialización de sus inmuebles de forma ágil y efectiva.</li>
                <li><strong>Interacción directa:</strong> Los usuarios interesados pueden contactar directamente con los agentes a través de la plataforma para recibir información personalizada, agendar visitas o aclarar dudas.</li>
                <li><strong>Gestión integral:</strong> Los agentes cuentan con herramientas para administrar sus publicaciones, actualizar información, gestionar consultas y llevar un control de su cartera de propiedades.</li>
                <li><strong>Datos y análisis:</strong> La plataforma provee reportes y análisis de desempeño de los anuncios, ayudando a los agentes a tomar decisiones informadas para mejorar su estrategia comercial.</li>
                <li><strong>Seguridad y confianza:</strong> Solo agentes inmobiliarios registrados y validados pueden publicar propiedades, garantizando la confiabilidad y profesionalismo en las transacciones realizadas.</li>
                <li><strong>Accesibilidad:</strong> Disponible vía web y aplicación móvil, habigt.tech permite a usuarios y agentes mantenerse conectados y gestionar sus operaciones en cualquier momento y lugar.</li>
              </ul>
              
              <p className="text-justify">
                Este conjunto de servicios está diseñado para simplificar y acelerar los procesos de comercialización inmobiliaria, promoviendo un ecosistema colaborativo y transparente que beneficia tanto a agentes como a usuarios interesados en comprar o alquilar inmuebles.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Política de privacidad</h2>
              <p className="text-justify">
                Habigt.tech se compromete a proteger la privacidad y los datos personales de sus usuarios, asegurando un tratamiento seguro, transparente y responsable conforme a la legislación aplicable en materia de protección de datos personales.
              </p>
              
              <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Recopilación y uso de datos personales</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>La plataforma recopila datos personales proporcionados directamente por los usuarios, como nombre, correo electrónico, información de contacto, y otros datos necesarios para la gestión y prestación de servicios.</li>
                <li>También puede recopilar datos de uso y navegación en el sitio mediante cookies y tecnologías similares para mejorar la experiencia del usuario y personalizar los servicios.</li>
                <li>Los datos personales se utilizan exclusivamente para fines legítimos y específicos, como la administración de cuentas, comunicación con los usuarios, gestión de publicaciones inmobiliarias, análisis estadístico, mejora continua de la plataforma y cumplimiento de obligaciones legales.</li>
              </ul>
              
              <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Protección y confidencialidad</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Habigt.tech implementa medidas técnicas y organizativas adecuadas para garantizar la seguridad, integridad y confidencialidad de los datos personales frente a accesos no autorizados, alteraciones, pérdidas o divulgaciones indebidas.</li>
                <li>El acceso a los datos está restringido únicamente a personal autorizado estrictamente necesario para las finalidades descritas.</li>
              </ul>
              
              <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Derechos del usuario</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Los usuarios tiene el derecho de acceder, rectificar, cancelar y oponerse al tratamiento de sus datos personales, así como solicitar la portabilidad o limitación del tratamiento conforme a la normativa vigente.</li>
                <li>Para ejercer estos derechos, los usuarios pueden contactar con habigt.tech a través de los medios dispuestos en la plataforma.</li>
              </ul>
              
              <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Consentimiento y cambios en la política</h3>
              <p className="text-justify">
                El uso de habigt.tech implica la aceptación expresa del tratamiento de datos personales bajo esta política. En caso de que se realicen modificaciones a esta política, habigt.tech notificará a los usuarios para que puedan conocer los cambios y decidir sobre su continuidad en el uso de la plataforma.
              </p>
              
              <p className="text-justify">
                Esta política garantiza un uso ético y responsable de la información personal, promoviendo la confianza y seguridad de todos los usuarios de habigt.tech.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Limitación de responsabilidad</h2>
              <p className="text-justify">
                Habigt.tech se compromete a mantener el correcto funcionamiento de la plataforma, haciendo esfuerzos razonables para garantizar la disponibilidad, seguridad y precisión de los servicios ofrecidos. No obstante, el usuario reconoce y acepta que:
              </p>
              
              <ul className="list-disc pl-6 space-y-2">
                <li>Habigt.tech no será responsable por interrupciones, fallos técnicos, errores, caídas del sistema, retrasos, defectos u otras incidencias que puedan afectar el acceso, uso o funcionamiento de la plataforma, siempre que estas no hayan sido causadas por negligencia grave o dolo de habigt.tech.</li>
                <li>La plataforma se provee "tal cual" y "según disponibilidad", sin garantías de cualquier tipo, expresas o implícitas, respecto a su desempeño, adecuación para fines específicos, precisión, integridad o continuidad.</li>
                <li>Habigt.tech no asume responsabilidad por los daños, pérdidas, perjuicios o inconvenientes derivados del uso incorrecto o inadecuado de la plataforma por parte del usuario, ni por las decisiones tomadas con base en la información o servicios proporcionados.</li>
                <li>Los usuarios son responsables de tomar las precauciones necesarias para proteger sus dispositivos, datos y conexiones de riesgos cibernéticos, siendo conscientes de que ninguna plataforma puede garantizar una seguridad absoluta.</li>
                <li>En caso de disputas o controversias entre usuarios, habigt.tech actuará como intermediario pero no podrá ser responsabilizada por los acuerdos o desacuerdos que surjan entre terceros.</li>
              </ul>
              
              <p className="text-justify">
                Esta limitación de responsabilidad no afectará aquellos derechos irrenunciables que reconozca la legislación vigente aplicable.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Legislación y jurisdicción aplicable</h2>
              <p className="text-justify">
                Estos Términos y Condiciones se regirán e interpretarán conforme a las leyes vigentes en la República de Guatemala. Cualquier disputa, controversia o reclamo que surja en relación con el uso de la plataforma habigt.tech, su contenido, servicios o estos términos, será sometida a la jurisdicción exclusiva de los tribunales competentes de la ciudad de Guatemala, renunciando expresamente a cualquier otro fuero que pudiera corresponderles.
              </p>
              
              <p className="text-justify">
                Este acuerdo garantiza que se aplicará la legislación guatemalteca y que cualquier conflicto será resuelto en tribunales locales, brindando claridad y seguridad jurídica a todas las partes involucradas.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Contacto</h2>
              <p className="text-justify">
                Para cualquier consulta, sugerencia, reclamo o información adicional relacionada con el uso de la plataforma habigt.tech, los usuarios pueden comunicarse directamente con el equipo de soporte y administración a través del siguiente correo electrónico:
              </p>
              
              <p className="text-center text-accent font-medium mt-4">
                Correo: <a href="mailto:webmaster@habigt.tech" className="text-electric hover:text-electric-glow transition-colors">webmaster@habigt.tech</a>
              </p>
              
              <p className="text-justify">
                El equipo de habigt.tech se compromete a responder a los mensajes recibidos en el menor tiempo posible, brindando asistencia y atención adecuada para resolver cualquier situación relacionada con el servicio.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TermsAndConditions;