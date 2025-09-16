import { Heart, Mail, Phone, MapPin } from "lucide-react";
const Footer = () => {
  return <footer className="bg-background border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <img src="/habi-logo-professional.png" alt="Habi.gt" className="h-12 w-auto" />
            <p className="text-muted-foreground text-sm leading-relaxed">La plataforma líder de bienes raíces en Guatemala, conectando sueños con realidades desde 2025.</p>
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
                <a href="mailto:webmaster@habigt.tech" className="hover:text-primary transition-colors">
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

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Síguenos</h3>
            <div className="space-y-2">
              <a href="https://www.facebook.com/habigt" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </a>
              <a href="/about" className="block text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                Acerca de Nosotros
              </a>
              <a href="/terms" className="block text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                Términos y Condiciones
              </a>
              <a href="/support" className="block text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                Soporte
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-6 mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground">
            © 2025 Habi.gt. Por{' '}
            <a href="mailto:webmaster@habigt.tech" className="text-electric hover:text-electric-glow transition-colors">
              IntelyaGT™
            </a>
          </div>
          <div className="text-sm text-muted-foreground">
            Plataforma desarrollada con ❤️ para Guatemala
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;