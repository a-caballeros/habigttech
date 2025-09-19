import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/contexts/AuthContext";
import { Mail, Eye, EyeOff, AlertCircle, Users, Building2 } from "lucide-react";
import { PropertyIcon, BusinessIcon } from "@/components/icons/ProfessionalIcons";

const Auth = () => {
  const navigate = useNavigate();
  const { signUp, signIn, signInWithProvider, user, userType: authUserType } = useAuth();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [userType, setUserType] = useState<'client' | 'agent'>(() => {
    const urlParams = new URLSearchParams(window.location.search);
    return (urlParams.get('userType') as 'client' | 'agent') || 'client';
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [loading, setLoading] = useState(false);

  // Redirect if already authenticated
  if (user) {
    if (authUserType === 'admin') {
      navigate('/admin-users');
    } else {
      navigate('/');
    }
    return null;
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }
    
    setLoading(true);
    
    try {
      // Create user account first, then redirect to subscription for agents
      const { error } = await signUp(email, password, {
        full_name: fullName,
        user_type: userType
      });
      
      if (error) {
        setError(error.message || "Error al crear la cuenta");
      } else {
        if (userType === 'agent') {
          // For agents, redirect to subscription page after successful signup
          navigate('/subscription');
        } else {
          // For clients, go to home page
          navigate('/');
        }
      }
    } catch (err) {
      setError("Error inesperado al crear la cuenta");
    }
    
    setLoading(false);
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    try {
      const { error } = await signIn(email, password);
      
      if (error) {
        setError(error.message || "Error al iniciar sesión");
      } else {
        // Check if it's the super admin email and redirect appropriately
        if (email === 'caballerosalfonso@gmail.com') {
          navigate('/admin-users');
        } else {
          navigate('/');
        }
      }
    } catch (err) {
      setError("Error inesperado al iniciar sesión");
    }
    
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    setError(null);
    setLoading(true);
    
    try {
      // Store user type in localStorage for after OAuth redirect
      localStorage.setItem('pending_user_type', userType);
      
      const { error } = await signInWithProvider('google', userType);
      if (error) {
        localStorage.removeItem('pending_user_type');
        setError(error.message || "Error al conectar con Google");
      }
    } catch (err) {
      localStorage.removeItem('pending_user_type');
      setError("Error inesperado al conectar con Google");
    }
    
    setLoading(false);
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted/20 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Premium Header */}
        <div className="text-center mb-8">
          <div className="relative inline-block">
            <img 
              src="/lovable-uploads/f1417da8-41e1-449e-b4c4-a0323e83c55e.png"
              alt="Habi.gt"
              className="h-20 w-auto mx-auto mb-6 filter drop-shadow-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-xl blur-2xl -z-10"></div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-3">
            Bienvenido a Habi.gt
          </h1>
          <p className="text-muted-foreground text-lg">
            La plataforma líder de bienes raíces en Guatemala
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto mt-4 rounded-full"></div>
        </div>

        <Card className="w-full shadow-elegant border-border/50 bg-card/95 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-semibold">Acceso a tu cuenta</CardTitle>
            <CardDescription className="text-base">
              Únete a la comunidad inmobiliaria más confiable
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <Tabs defaultValue="google" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="google">Google</TabsTrigger>
                <TabsTrigger value="email">Email</TabsTrigger>
              </TabsList>

              {/* Google Login Tab */}
              <TabsContent value="google" className="space-y-4">
                <div className="space-y-3">
                  <div className="space-y-3">
                    <Label className="text-base font-medium">Selecciona tu perfil</Label>
                    <div className="grid grid-cols-1 gap-3">
                      <Button
                        type="button"
                        variant={userType === 'client' ? 'default' : 'outline'}
                        className="h-16 p-6 flex items-center gap-3 text-left transition-all hover:scale-[1.02]"
                        onClick={() => setUserType('client')}
                      >
                        <PropertyIcon className="h-6 w-6" />
                        <div>
                          <span className="font-semibold text-base">Cliente</span>
                          <p className="text-xs text-muted-foreground">Encuentra tu hogar ideal</p>
                        </div>
                      </Button>
                      <Button
                        type="button"
                        variant={userType === 'agent' ? 'default' : 'outline'}
                        className="h-16 p-6 flex items-center gap-3 text-left transition-all hover:scale-[1.02]"
                        onClick={() => setUserType('agent')}
                      >
                        <BusinessIcon className="h-6 w-6" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-base">Agente Inmobiliario</span>
                            <Badge variant="secondary" className="text-xs">Pro</Badge>
                          </div>
                          <p className="text-xs text-muted-foreground">Gestiona propiedades profesionalmente</p>
                        </div>
                      </Button>
                    </div>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="w-full h-12 text-base font-medium bg-card hover:bg-accent/10 border-2 border-border/50 hover:border-primary/50 transition-all duration-300"
                    onClick={handleGoogleLogin}
                    disabled={loading}
                  >
                    <svg className="mr-3 h-5 w-5" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    {loading ? "Procesando..." : `Continuar como ${userType === 'client' ? 'Cliente' : 'Agente'} con Google`}
                  </Button>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      O usar email
                    </span>
                  </div>
                </div>

                  <Button 
                    variant="ghost" 
                    className="w-full"
                    onClick={() => (document.querySelector('[value="email"]') as HTMLElement)?.click()}
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    Usar email y contraseña
                  </Button>
              </TabsContent>

              {/* Email Login Tab */}
              <TabsContent value="email" className="space-y-4">
                <Tabs defaultValue="signin" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="signin">Iniciar Sesión</TabsTrigger>
                    <TabsTrigger value="signup">Crear Cuenta</TabsTrigger>
                  </TabsList>

                  <TabsContent value="signin" className="space-y-4 mt-4">
                    <form onSubmit={handleSignIn} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="signin-email">Email</Label>
                        <Input
                          id="signin-email"
                          type="email"
                          placeholder="tu@email.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signin-password">Contraseña</Label>
                        <div className="relative">
                          <Input
                            id="signin-password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Tu contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                      <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
                      </Button>
                    </form>
                  </TabsContent>

                  <TabsContent value="signup" className="space-y-4 mt-4">
                    <form onSubmit={handleSignUp} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullname">Nombre completo</Label>
                        <Input
                          id="fullname"
                          type="text"
                          placeholder="Tu nombre completo"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          required
                        />
                      </div>
                      
                      <div className="space-y-3">
                        <Label className="text-base font-medium">Selecciona tu perfil</Label>
                        <div className="grid grid-cols-1 gap-3">
                          <Button
                            type="button"
                            variant={userType === 'client' ? 'default' : 'outline'}
                            className="h-16 p-6 flex items-center gap-3 text-left transition-all hover:scale-[1.02]"
                            onClick={() => setUserType('client')}
                          >
                            <PropertyIcon className="h-6 w-6" />
                            <div>
                              <span className="font-semibold text-base">Cliente</span>
                              <p className="text-xs text-muted-foreground">Encuentra tu hogar ideal</p>
                            </div>
                          </Button>
                          <Button
                            type="button"
                            variant={userType === 'agent' ? 'default' : 'outline'}
                            className="h-16 p-6 flex items-center gap-3 text-left transition-all hover:scale-[1.02]"
                            onClick={() => setUserType('agent')}
                          >
                            <BusinessIcon className="h-6 w-6" />
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-base">Agente Inmobiliario</span>
                                <Badge variant="secondary" className="text-xs">Pro</Badge>
                              </div>
                              <p className="text-xs text-muted-foreground">Gestiona propiedades profesionalmente</p>
                            </div>
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="signup-email">Email</Label>
                        <Input
                          id="signup-email"
                          type="email"
                          placeholder="tu@email.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="signup-password">Contraseña</Label>
                        <div className="relative">
                          <Input
                            id="signup-password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Mínimo 6 caracteres"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength={6}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirmar contraseña</Label>
                        <div className="relative">
                          <Input
                            id="confirm-password"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirma tu contraseña"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                      
                      <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? "Registrando..." : "Crear Cuenta"}
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>
              </TabsContent>

            </Tabs>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <Button variant="ghost" onClick={() => navigate('/')}>
            Volver al inicio
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Auth;