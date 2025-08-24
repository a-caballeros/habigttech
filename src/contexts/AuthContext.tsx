import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Profile {
  id: string;
  user_type: string;
  full_name: string | null;
  phone: string | null;
  email: string | null;
  avatar_url: string | null;
  role: string;
  agency?: string | null;
  bio?: string | null;
  license_number?: string | null;
  budget_max?: number | null;
  preferred_location?: string | null;
  preferred_property_type?: string | null;
  created_at: string;
  updated_at: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  userType: 'client' | 'agent';
  loading: boolean;
  signUp: (email: string, password: string, userData?: any) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  signInWithProvider: (provider: 'facebook' | 'twitter' | 'google', userType?: string) => Promise<{ error: any }>;
  sendOTP: (phone: string) => Promise<{ error: any }>;
  verifyOTP: (phone: string, token: string) => Promise<{ error: any }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const userType: 'client' | 'agent' = profile?.user_type === 'agent' ? 'agent' : 'client';
  
  // Debug log to see what's happening
  console.log('AuthContext Debug:', {
    user: user ? { id: user.id, email: user.email } : null,
    profile: profile ? { id: profile.id, user_type: profile.user_type, full_name: profile.full_name } : null,
    userType,
    profileUserType: profile?.user_type,
    loading
  });

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (error) {
        console.error('Error fetching profile:', error);
        return;
      }

      // If no profile exists and we have a pending user type from OAuth
      if (!data) {
        const pendingUserType = localStorage.getItem('pending_user_type');
        if (pendingUserType) {
          console.log('Creating profile with pending user type:', pendingUserType);
          
          // Create the profile with the correct user type
          const { data: newProfile, error: createError } = await supabase
            .from('profiles')
            .insert({
              id: userId,
              user_type: pendingUserType,
              role: pendingUserType,
              full_name: user?.user_metadata?.full_name || user?.user_metadata?.name || null,
              email: user?.email || null
            })
            .select()
            .maybeSingle();
            
          localStorage.removeItem('pending_user_type');
          
          if (createError) {
            console.error('Error creating profile:', createError);
          } else {
            setProfile(newProfile);
            return;
          }
        }
      } else {
        // If profile exists but we have a pending user type, update it
        const pendingUserType = localStorage.getItem('pending_user_type');
        if (pendingUserType && data.user_type !== pendingUserType) {
          console.log('Updating existing profile with pending user type:', pendingUserType);
          
          const { data: updatedProfile, error: updateError } = await supabase
            .from('profiles')
            .update({
              user_type: pendingUserType,
              role: pendingUserType
            })
            .eq('id', userId)
            .select()
            .maybeSingle();
            
          localStorage.removeItem('pending_user_type');
          
          if (updateError) {
            console.error('Error updating profile:', updateError);
            setProfile(data);
          } else {
            setProfile(updatedProfile);
            return;
          }
        }
      }

      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Defer profile fetching to avoid deadlock
          setTimeout(() => {
            fetchProfile(session.user.id);
          }, 0);
        } else {
          setProfile(null);
        }
        
        setLoading(false);
      }
    );

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        setTimeout(() => {
          fetchProfile(session.user.id);
        }, 0);
      }
      
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, userData = {}) => {
    const redirectUrl = `${window.location.origin}/`;
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: userData,
        captchaToken: null // Disable captcha temporarily
      }
    });

    if (error) {
      toast({
        title: "Error de registro",
        description: error.message,
        variant: "destructive",
      });
    } else if (data?.user && !data?.user?.email_confirmed_at) {
      toast({
        title: "Registro exitoso",
        description: "Revisa tu email para verificar tu cuenta",
      });
    } else if (data?.user) {
      toast({
        title: "Bienvenido",
        description: "Tu cuenta ha sido creada exitosamente",
      });
    }

    return { error };
  };

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast({
        title: "Error de inicio de sesión",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Bienvenido",
        description: "Has iniciado sesión correctamente",
      });
      
      // Fetch profile immediately to determine user type for redirection
      if (data.user) {
        await fetchProfile(data.user.id);
      }
    }

    return { error };
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      toast({
        title: "Error",
        description: "No se pudo cerrar sesión",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Sesión cerrada",
        description: "Has cerrado sesión correctamente",
      });
    }
  };

  const signInWithProvider = async (provider: 'facebook' | 'twitter' | 'google', userType?: string) => {
    const redirectUrl = `${window.location.origin}/`;
    
    const { error } = await supabase.auth.signInWithOAuth({
      provider: provider === 'twitter' ? 'twitter' : provider,
      options: {
        redirectTo: redirectUrl,
        ...(userType && {
          data: {
            user_type: userType
          }
        })
      }
    });

    if (error) {
      toast({
        title: "Error de autenticación social",
        description: error.message,
        variant: "destructive",
      });
    }

    return { error };
  };

  const sendOTP = async (phone: string) => {
    const { error } = await supabase.auth.signInWithOtp({
      phone: phone,
    });

    if (error) {
      toast({
        title: "Error enviando SMS",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "SMS enviado",
        description: "Revisa tu teléfono para el código de verificación",
      });
    }

    return { error };
  };

  const verifyOTP = async (phone: string, token: string) => {
    const { error } = await supabase.auth.verifyOtp({
      phone: phone,
      token: token,
      type: 'sms'
    });

    if (error) {
      toast({
        title: "Error verificando código",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Verificación exitosa",
        description: "Has iniciado sesión correctamente",
      });
    }

    return { error };
  };

  const value = {
    user,
    session,
    profile,
    userType,
    loading,
    signUp,
    signIn,
    signOut,
    signInWithProvider,
    sendOTP,
    verifyOTP,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};