import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/contexts/AuthContext';
import { Facebook, Twitter, Mail, User, Building } from 'lucide-react';

type UserTypeSelection = 'client' | 'agent' | null;

const Auth = () => {
  const navigate = useNavigate();
  const { signIn, signUp, signInWithProvider, user } = useAuth();
  const [activeTab, setActiveTab] = useState('signin');
  const [selectedUserType, setSelectedUserType] = useState<UserTypeSelection>(null);
  const [showUserTypeSelection, setShowUserTypeSelection] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: ''
  });

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error } = await signIn(formData.email, formData.password);
    
    if (error) {
      setError(error.message);
    }
    
    setLoading(false);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedUserType) {
      setShowUserTypeSelection(true);
      return;
    }

    if (selectedUserType === 'agent') {
      // Redirect to subscription page for agents
      navigate('/subscription', { 
        state: { 
          email: formData.email, 
          password: formData.password, 
          fullName: formData.fullName 
        } 
      });
      return;
    }

    setLoading(true);
    setError('');

    const { error } = await signUp(
      formData.email, 
      formData.password, 
      selectedUserType, 
      formData.fullName
    );
    
    if (error) {
      setError(error.message);
    } else {
      setError('');
      // Show success message for client registration
      setError('Registro exitoso. Revisa tu correo para confirmar tu cuenta.');
    }
    
    setLoading(false);
  };

  const handleSocialLogin = async (provider: 'facebook' | 'twitter') => {
    setLoading(true);
    setError('');

    const { error } = await signInWithProvider(provider);
    
    if (error) {
      setError(error.message);
    }
    
    setLoading(false);
  };

  const UserTypeSelection = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-center">¿Qué tipo de usuario eres?</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Button
          variant={selectedUserType === 'client' ? 'default' : 'outline'}
          className="h-20 flex flex-col items-center gap-2"
          onClick={() => setSelectedUserType('client')}
        >
          <User className="h-6 w-6" />
          <span>Cliente</span>
        </Button>
        <Button
          variant={selectedUserType === 'agent' ? 'default' : 'outline'}
          className="h-20 flex flex-col items-center gap-2"
          onClick={() => setSelectedUserType('agent')}
        >
          <Building className="h-6 w-6" />
          <span>Agente</span>
        </Button>
      </div>
      {selectedUserType && (
        <Button 
          onClick={() => setShowUserTypeSelection(false)}
          className="w-full"
        >
          Continuar como {selectedUserType === 'client' ? 'Cliente' : 'Agente'}
        </Button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Habi.gt</CardTitle>
          <CardDescription>
            Tu plataforma inmobiliaria en Guatemala
          </CardDescription>
        </CardHeader>
        <CardContent>
          {showUserTypeSelection ? (
            <UserTypeSelection />
          ) : (
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">Iniciar Sesión</TabsTrigger>
                <TabsTrigger value="signup">Registrarse</TabsTrigger>
              </TabsList>
              
              <TabsContent value="signin" className="space-y-4 mt-6">
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signin-email">Correo electrónico</Label>
                    <Input
                      id="signin-email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signin-password">Contraseña</Label>
                    <Input
                      id="signin-password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    <Mail className="mr-2 h-4 w-4" />
                    {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
                  </Button>
                </form>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      O continúa con
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-2">
                  <Button 
                    variant="outline" 
                    onClick={() => window.location.href = 'https://supabase.com/dashboard/project/yhvtpfrzlxgyiienlbuh/auth/providers'}
                    disabled={loading}
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    Gmail
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="signup" className="space-y-4 mt-6">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Nombre completo</Label>
                    <Input
                      id="signup-name"
                      name="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Correo electrónico</Label>
                    <Input
                      id="signup-email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Contraseña</Label>
                    <Input
                      id="signup-password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      minLength={6}
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? 'Registrando...' : 'Registrarse'}
                  </Button>
                </form>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      O regístrate con
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-2">
                  <Button 
                    variant="outline" 
                    onClick={() => window.location.href = 'https://supabase.com/dashboard/project/yhvtpfrzlxgyiienlbuh/auth/providers'}
                    disabled={loading}
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    Gmail
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          )}

          {error && (
            <Alert className={`mt-4 ${error.includes('exitoso') ? 'border-success text-success' : 'border-destructive'}`}>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;