import { Heart, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <img 
              src="/lovable-uploads/f1417da8-41e1-449e-b4c4-a0323e83c55e.png"
              alt="Habi.gt"
              className="h-12 w-auto"
            />
            <p className="text-muted-foreground text-sm leading-relaxed">
              La plataforma líder de bienes raíces en Guatemala, conectando sueños con realidades desde 2024.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Heart className="h-4 w-4 text-red-500" />
              Construyendo el futuro inmobiliario de Guatemala
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Contacto</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" />
                <a 
                  href="mailto:webmaster@habigt.tech" 
                  className="hover:text-primary transition-colors"
                >
                  webmaster@habigt.tech
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 text-primary" />
                <span>+502 42457829</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Ciudad de Guatemala, Guatemala</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Enlaces Rápidos</h3>
            <div className="space-y-2">
              <a 
                href="/about" 
                className="block text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer"
              >
                Acerca de Nosotros
              </a>
              <a 
                href="/terms" 
                className="block text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer"
              >
                Términos y Condiciones
              </a>
              <a 
                href="/faq" 
                className="block text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer"
              >
                FAQ's
              </a>
              <a 
                href="/support" 
                className="block text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer"
              >
                Soporte
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-6 mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground">
            © 2025 Habi.gt. Por{' '}
            <a
              href="mailto:webmaster@habigt.tech"
              className="text-electric hover:text-electric-glow transition-colors"
            >
              IntelyaGT™
            </a>
          </div>
          <div className="text-sm text-muted-foreground">
            Plataforma desarrollada con ❤️ para Guatemala
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;