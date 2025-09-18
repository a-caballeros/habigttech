import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Plus, Crown } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useSubscription } from "@/hooks/useSubscription";
import heroImage from "@/assets/hero-guatemala.jpg";

const HeroSection = () => {
  const navigate = useNavigate();
  const { userType, profile } = useAuth();
  const { hasActiveSubscription, loading: subscriptionLoading } = useSubscription();
  const [searchQuery, setSearchQuery] = useState("");

  const handleAddProperty = () => {
    console.log('handleAddProperty called:', { userType, hasActiveSubscription, subscriptionLoading, role: profile?.role });
    
    // Super admin bypass subscription check
    if (profile?.role === 'admin') {
      navigate('/add-property');
      return;
    }
    
    if (userType === 'agent' && !subscriptionLoading && !hasActiveSubscription) {
      // Navigate to subscription page for agents without active subscription
      console.log('Redirecting agent to subscription page');
      navigate('/subscription');
    } else {
      // Navigate to add property page for subscribed agents
      console.log('Navigating to add property');
      navigate('/add-property');
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage}
          alt="Beautiful Guatemalan Properties"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        {/* Main Heading */}
        <div className="max-w-4xl mx-auto mb-8">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Únete a Habi.gt
          </h1>
          <p className="text-xl md:text-2xl text-white/90 font-light leading-relaxed">
            La forma más simple de buscar, encontrar y conectar con las mejores propiedades del país
          </p>
        </div>

        {/* Join Buttons */}
        <div className="max-w-2xl mx-auto mb-12 text-center px-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              className="flex-1 px-6 py-4 text-lg font-semibold shadow-lg bg-primary hover:bg-primary/90 text-white"
              onClick={() => navigate('/auth?type=agent')}
            >
              Registrame como Agente
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="flex-1 px-6 py-4 text-lg font-semibold shadow-lg bg-white/10 border-white/20 text-white hover:bg-white/20"
              onClick={() => navigate('/auth')}
            >
              Regístrate Ahora
            </Button>
          </div>
        </div>

      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;