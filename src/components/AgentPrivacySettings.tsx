import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

const AgentPrivacySettings = () => {
  const { user, profile } = useAuth();
  const [hideEmail, setHideEmail] = useState(false);
  const [hidePhone, setHidePhone] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (profile) {
      setHideEmail((profile as any).hide_email || false);
      setHidePhone((profile as any).hide_phone || false);
    }
  }, [profile]);

  const handleUpdatePrivacy = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          hide_email: hideEmail,
          hide_phone: hidePhone,
        })
        .eq('id', user.id);

      if (error) throw error;

      toast({
        title: "Configuración actualizada",
        description: "Tus preferencias de privacidad han sido guardadas.",
      });
    } catch (error) {
      console.error('Error updating privacy settings:', error);
      toast({
        title: "Error",
        description: "No se pudo actualizar la configuración de privacidad.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (profile?.user_type !== 'agent') {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Configuración de Privacidad</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="hide-email">Ocultar email</Label>
            <p className="text-sm text-muted-foreground">
              Tu email no será visible para los clientes
            </p>
          </div>
          <Switch
            id="hide-email"
            checked={hideEmail}
            onCheckedChange={setHideEmail}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="hide-phone">Ocultar teléfono</Label>
            <p className="text-sm text-muted-foreground">
              Tu teléfono no será visible para los clientes
            </p>
          </div>
          <Switch
            id="hide-phone"
            checked={hidePhone}
            onCheckedChange={setHidePhone}
          />
        </div>
        
        <Button 
          onClick={handleUpdatePrivacy} 
          disabled={loading}
          className="w-full"
        >
          {loading ? "Guardando..." : "Guardar Configuración"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default AgentPrivacySettings;