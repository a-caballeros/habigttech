-- Create user profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  user_type TEXT NOT NULL CHECK (user_type IN ('client', 'agent')),
  email TEXT,
  full_name TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create subscription tiers table
CREATE TABLE public.subscription_tiers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  monthly_price DECIMAL(10,2) NOT NULL,
  annual_price DECIMAL(10,2) NOT NULL,
  property_limit INTEGER, -- NULL means unlimited
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create agent subscriptions table
CREATE TABLE public.agent_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  tier_id UUID NOT NULL REFERENCES public.subscription_tiers(id),
  billing_cycle TEXT NOT NULL CHECK (billing_cycle IN ('monthly', 'annual')),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'cancelled')),
  properties_used_this_month INTEGER DEFAULT 0,
  current_period_start TIMESTAMPTZ NOT NULL DEFAULT now(),
  current_period_end TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(agent_id)
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscription_tiers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agent_subscriptions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- RLS Policies for subscription tiers (publicly readable)
CREATE POLICY "Subscription tiers are publicly readable" ON public.subscription_tiers
  FOR SELECT USING (true);

-- RLS Policies for agent subscriptions
CREATE POLICY "Agents can view their own subscription" ON public.agent_subscriptions
  FOR SELECT USING (auth.uid() = agent_id);

CREATE POLICY "Agents can insert their own subscription" ON public.agent_subscriptions
  FOR INSERT WITH CHECK (auth.uid() = agent_id);

CREATE POLICY "Agents can update their own subscription" ON public.agent_subscriptions
  FOR UPDATE USING (auth.uid() = agent_id);

-- Insert subscription tiers
INSERT INTO public.subscription_tiers (name, monthly_price, annual_price, property_limit, description) VALUES
('Bronce', 250.00, 2500.00, 5, 'Plan básico para agentes principiantes'),
('Plata', 450.00, 4900.00, 10, 'Plan intermedio con más propiedades'),
('Oro', 650.00, 6500.00, 15, 'Plan avanzado para agentes experimentados'),
('Platino', 850.00, 8000.00, NULL, 'Plan premium con propiedades ilimitadas');

-- Function to update updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_agent_subscriptions_updated_at
  BEFORE UPDATE ON public.agent_subscriptions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, user_type, email, full_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'user_type', 'client'),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();