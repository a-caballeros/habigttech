import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Bell, User, Heart, MessageCircle, LogOut } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";
// Using direct path to logo

const Navigation = () => {
  const navigate = useNavigate();
  const { user, userType, signOut } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center justify-between">{/* Increased height from h-16 to h-20 */}
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <img 
            src="/lovable-uploads/f1417da8-41e1-449e-b4c4-a0323e83c55e.png"
            alt="Habi.gt"
            className="h-12 w-auto sm:h-14 md:h-16 lg:h-18 xl:h-20 cursor-pointer max-w-[140px] sm:max-w-[160px] md:max-w-[180px] lg:max-w-[200px] xl:max-w-[220px] object-contain"
            onClick={() => navigate('/')}
          />
        </div>


        {/* Navigation Actions */}
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              {/* Client Actions */}
              {userType === 'client' && (
                <>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => navigate('/favorites')}
                  >
                    <Heart className="h-4 w-4" />
                    Favoritos
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => navigate('/messages')}
                  >
                    <MessageCircle className="h-4 w-4" />
                    Mensajes
                  </Button>
                </>
              )}
              
              {/* Agent Actions */}
              {userType === 'agent' && (
                <>
                  <Button 
                    variant="default" 
                    size="sm" 
                    className="hidden lg:flex"
                    onClick={() => navigate('/add-property')}
                  >
                    + Nueva Propiedad
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="hidden lg:flex"
                    onClick={() => navigate('/dashboard')}
                  >
                    Dashboard
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => navigate('/messages')}
                  >
                    <MessageCircle className="h-4 w-4" />
                    Consultas
                  </Button>
                </>
              )}
              
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate('/notifications')}
              >
                <Bell className="h-4 w-4" />
                Alertas
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <User className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
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
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" onClick={() => navigate('/auth')}>
                Iniciar Sesión
              </Button>
              <Button variant="default" size="sm" onClick={() => navigate('/auth')}>
                Registrarse
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navigation;