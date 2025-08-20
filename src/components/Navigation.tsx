import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Bell, User, Heart, MessageCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface NavigationProps {
  userType?: 'client' | 'agent';
  isAuthenticated?: boolean;
}

const Navigation = ({ userType = 'client', isAuthenticated = false }: NavigationProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const locations = ["CAES", "Zona 10", "Zona 11", "Mixco", "Antigua Guatemala", "Zona 14", "Escuintla"];
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center">
            <span className="text-white font-bold text-sm">RG</span>
          </div>
          <h1 className="text-xl font-bold text-foreground">ResidenciasGT</h1>
        </div>

        {/* Quick Location Links */}
        <nav className="hidden md:flex items-center space-x-6">
          {locations.map((location) => (
            <button
              key={location}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {location}
            </button>
          ))}
        </nav>

        {/* Search Bar - Only for clients */}
        {userType === 'client' && (
          <div className="flex-1 max-w-lg mx-8">
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
          {isAuthenticated ? (
            <>
              {/* Client Actions */}
              {userType === 'client' && (
                <>
                  <Button variant="ghost" size="sm" className="relative">
                    <Heart className="h-4 w-4" />
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs bg-accent">
                      3
                    </Badge>
                  </Button>
                  <Button variant="ghost" size="sm" className="relative">
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
                  <Button variant="default" size="sm">
                    + Nueva Propiedad
                  </Button>
                  <Button variant="ghost" size="sm" className="relative">
                    <MessageCircle className="h-4 w-4" />
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs bg-primary">
                      5
                    </Badge>
                  </Button>
                </>
              )}
              
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-4 w-4" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs bg-accent">
                  1
                </Badge>
              </Button>
              
              <Button variant="ghost" size="sm">
                <User className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">Iniciar Sesión</Button>
              <Button variant="default" size="sm">Registrarse</Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navigation;