import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, User, LogOut } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";

const MinimalistNavigation = () => {
  const navigate = useNavigate();
  const { user, userType, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const navigationItems = [
    { label: "Inicio", href: "/" },
    { label: "Propiedades", href: "/" },
    { label: "Sobre Nosotros", href: "/" },
    { label: "Contacto", href: "/" },
  ];

  const NavigationLinks = ({ mobile = false, onItemClick }: { mobile?: boolean; onItemClick?: () => void }) => (
    <nav className={mobile ? "flex flex-col space-y-4" : "hidden md:flex items-center space-x-8"}>
      {navigationItems.map((item) => (
        <button
          key={item.label}
          onClick={() => {
            navigate(item.href);
            onItemClick?.();
          }}
          className="text-sm font-medium text-foreground hover:text-accent transition-colors"
        >
          {item.label}
        </button>
      ))}
    </nav>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center">
          <img 
            src="/lovable-uploads/f1417da8-41e1-449e-b4c4-a0323e83c55e.png"
            alt="Habi.gt"
            className="h-12 w-auto cursor-pointer hover:scale-105 transition-transform"
            onClick={() => navigate('/')}
          />
        </div>

        {/* Desktop Navigation */}
        <NavigationLinks />

        {/* User Actions */}
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              {/* User Type Specific Buttons */}
              {userType === 'client' && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => navigate('/profile')}
                  className="hidden md:flex"
                >
                  Panel Cliente
                </Button>
              )}
              
              {userType === 'agent' && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => navigate('/dashboard')}
                  className="hidden md:flex"
                >
                  Panel Agente
                </Button>
              )}
              
              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="p-2">
                    <User className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => navigate('/profile')}>
                    Mi Perfil
                  </DropdownMenuItem>
                  {userType === 'agent' && (
                    <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                      Dashboard
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={() => signOut()}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Cerrar Sesión
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="hidden md:flex items-center space-x-2">
              <Button variant="ghost" size="sm" onClick={() => navigate('/auth')}>
                Iniciar Sesión
              </Button>
              <Button size="sm" onClick={() => navigate('/auth')}>
                Registrarse
              </Button>
            </div>
          )}

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="md:hidden p-2">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col space-y-6 mt-6">
                <NavigationLinks mobile onItemClick={() => setIsOpen(false)} />
                
                {user ? (
                  <div className="flex flex-col space-y-2 pt-4 border-t">
                    {userType === 'client' && (
                      <Button 
                        variant="ghost" 
                        className="justify-start"
                        onClick={() => {
                          navigate('/profile');
                          setIsOpen(false);
                        }}
                      >
                        Panel Cliente
                      </Button>
                    )}
                    
                    {userType === 'agent' && (
                      <Button 
                        variant="ghost" 
                        className="justify-start"
                        onClick={() => {
                          navigate('/dashboard');
                          setIsOpen(false);
                        }}
                      >
                        Panel Agente
                      </Button>
                    )}
                    
                    <Button 
                      variant="ghost" 
                      className="justify-start"
                      onClick={() => {
                        signOut();
                        setIsOpen(false);
                      }}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Cerrar Sesión
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-2 pt-4 border-t">
                    <Button 
                      variant="ghost" 
                      className="justify-start"
                      onClick={() => {
                        navigate('/auth');
                        setIsOpen(false);
                      }}
                    >
                      Iniciar Sesión
                    </Button>
                    <Button 
                      className="justify-start"
                      onClick={() => {
                        navigate('/auth');
                        setIsOpen(false);
                      }}
                    >
                      Registrarse
                    </Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default MinimalistNavigation;