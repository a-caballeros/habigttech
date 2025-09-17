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
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
            <img 
              src="/lovable-uploads/favicon-isotipo.png"
              alt="Habi.gt"
              className="h-8 w-8 object-contain"
            />
            <span className="text-2xl font-bold text-foreground tracking-tight">HABI.GT</span>
          </div>
        </div>


        {/* Navigation Actions */}
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              {/* Client Panel */}
              {userType === 'client' && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => navigate('/profile')}
                >
                  <User className="h-4 w-4" />
                  Panel Cliente
                </Button>
              )}
              
              {/* Agent Panel */}
              {userType === 'agent' && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => navigate('/dashboard')}
                >
                  <User className="h-4 w-4" />
                  Panel Agente
                </Button>
              )}
              
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