import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Bell, User, Heart, MessageCircle, LogOut } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";
import logoHorizontal from "@/assets/logo-horizontal.svg";

const Navigation = () => {
  const navigate = useNavigate();
  const { user, userType, signOut } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <img 
            src={logoHorizontal}
            alt="Habi.gt"
            className="h-12 w-auto sm:h-16 md:h-20 lg:h-24 cursor-pointer max-w-[180px] sm:max-w-[220px] md:max-w-[280px] lg:max-w-[320px]"
            onClick={() => navigate('/')}
          />
        </div>

        {/* Search Bar - Only for clients */}
        {userType === 'client' && user && (
          <div className="flex-1 max-w-lg mx-4 md:mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                placeholder="Buscar por ubicación, tipo de propiedad..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 transition-smooth focus:shadow-soft"
              />
            </div>
          </div>
        )}

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
                    className="relative" 
                    onClick={() => navigate('/favorites')}
                  >
                    <Heart className="h-4 w-4" />
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs bg-accent">
                      3
                    </Badge>
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="relative" 
                    onClick={() => navigate('/messages')}
                  >
                    <MessageCircle className="h-4 w-4" />
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs bg-primary">
                      2
                    </Badge>
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
                    variant="ghost" 
                    size="sm" 
                    className="relative" 
                    onClick={() => navigate('/messages')}
                  >
                    <MessageCircle className="h-4 w-4" />
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs bg-primary">
                      5
                    </Badge>
                  </Button>
                </>
              )}
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="relative" 
                onClick={() => navigate('/notifications')}
              >
                <Bell className="h-4 w-4" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs bg-accent">
                  1
                </Badge>
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