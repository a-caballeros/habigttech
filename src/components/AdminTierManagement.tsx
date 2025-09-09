import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { Crown, Users, Settings } from 'lucide-react';

interface Agent {
  id: string;
  email: string;
  full_name: string;
  currentTier?: {
    id: string;
    name: string;
    property_limit: number | null;
  };
}

interface SubscriptionTier {
  id: string;
  name: string;
  description: string;
  property_limit: number | null;
  monthly_price: number;
}

const AdminTierManagement = () => {
  const { profile } = useAuth();
  const { toast } = useToast();
  const [agents, setAgents] = useState<Agent[]>([]);
  const [tiers, setTiers] = useState<SubscriptionTier[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAgent, setSelectedAgent] = useState<string>('');
  const [selectedTier, setSelectedTier] = useState<string>('');

  useEffect(() => {
    if (profile?.role === 'admin') {
      fetchAgents();
      fetchTiers();
    }
  }, [profile?.role]);

  const fetchAgents = async () => {
    try {
      const { data: agentsData, error: agentsError } = await supabase
        .from('profiles')
        .select('id, email, full_name')
        .eq('user_type', 'agent');

      if (agentsError) throw agentsError;

      // Obtener tiers asignados para cada agente
      const agentsWithTiers = await Promise.all(
        (agentsData || []).map(async (agent) => {
          const { data: tierData } = await supabase
            .from('agent_tier_assignments')
            .select(`
              tier_id,
              subscription_tiers (
                id,
                name,
                property_limit
              )
            `)
            .eq('agent_id', agent.id)
            .eq('is_active', true)
            .single();

          return {
            ...agent,
            currentTier: tierData?.subscription_tiers || null,
          };
        })
      );

      setAgents(agentsWithTiers);
    } catch (error) {
      console.error('Error fetching agents:', error);
      toast({
        title: 'Error',
        description: 'No se pudieron cargar los agentes',
        variant: 'destructive',
      });
    }
  };

  const fetchTiers = async () => {
    try {
      const { data, error } = await supabase
        .from('subscription_tiers')
        .select('*')
        .order('monthly_price', { ascending: true });

      if (error) throw error;
      setTiers(data || []);
    } catch (error) {
      console.error('Error fetching tiers:', error);
      toast({
        title: 'Error',
        description: 'No se pudieron cargar los tiers',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const assignTier = async (agentId: string, tierId: string) => {
    try {
      const { data: userData } = await supabase.auth.getUser();
      
      // Desactivar tier anterior si existe
      await supabase
        .from('agent_tier_assignments')
        .update({ is_active: false })
        .eq('agent_id', agentId)
        .eq('is_active', true);

      // Asignar nuevo tier
      const { error } = await supabase
        .from('agent_tier_assignments')
        .insert({
          agent_id: agentId,
          tier_id: tierId,
          assigned_by: userData.user?.id,
        });

      if (error) throw error;

      toast({
        title: 'Tier Asignado',
        description: 'El tier ha sido asignado exitosamente',
      });

      fetchAgents();
      setSelectedAgent('');
      setSelectedTier('');
    } catch (error) {
      console.error('Error assigning tier:', error);
      toast({
        title: 'Error',
        description: 'No se pudo asignar el tier',
        variant: 'destructive',
      });
    }
  };

  const removeTier = async (agentId: string) => {
    try {
      const { error } = await supabase
        .from('agent_tier_assignments')
        .update({ is_active: false })
        .eq('agent_id', agentId)
        .eq('is_active', true);

      if (error) throw error;

      toast({
        title: 'Tier Removido',
        description: 'El tier ha sido removido exitosamente',
      });

      fetchAgents();
    } catch (error) {
      console.error('Error removing tier:', error);
      toast({
        title: 'Error',
        description: 'No se pudo remover el tier',
        variant: 'destructive',
      });
    }
  };

  const getTierBadgeVariant = (tierName: string) => {
    switch (tierName?.toLowerCase()) {
      case 'bronce': return 'secondary';
      case 'plata': return 'outline';
      case 'oro': return 'default';
      case 'platino': return 'destructive';
      default: return 'secondary';
    }
  };

  if (profile?.role !== 'admin') {
    return null;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Crown className="h-6 w-6" />
        <h2 className="text-2xl font-bold">Gestión de Tiers</h2>
      </div>

      {/* Asignar Tier */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="h-5 w-5" />
            <span>Asignar Tier a Agente</span>
          </CardTitle>
          <CardDescription>
            Asigna tiers específicos a agentes para controlar sus límites de propiedades
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4 items-end">
            <div className="flex-1">
              <label className="text-sm font-medium">Agente</label>
              <Select value={selectedAgent} onValueChange={setSelectedAgent}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar agente" />
                </SelectTrigger>
                <SelectContent>
                  {agents.map((agent) => (
                    <SelectItem key={agent.id} value={agent.id}>
                      {agent.email} - {agent.full_name || 'Sin nombre'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <label className="text-sm font-medium">Tier</label>
              <Select value={selectedTier} onValueChange={setSelectedTier}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar tier" />
                </SelectTrigger>
                <SelectContent>
                  {tiers.map((tier) => (
                    <SelectItem key={tier.id} value={tier.id}>
                      {tier.name} - {tier.property_limit ? `${tier.property_limit} propiedades` : 'Ilimitado'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button
              onClick={() => selectedAgent && selectedTier && assignTier(selectedAgent, selectedTier)}
              disabled={!selectedAgent || !selectedTier}
            >
              Asignar Tier
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Agentes con Tiers */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <span>Agentes y sus Tiers</span>
            <Badge variant="secondary">{agents.length}</Badge>
          </CardTitle>
          <CardDescription>
            Lista de todos los agentes y sus tiers asignados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Tier Actual</TableHead>
                <TableHead>Límite de Propiedades</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {agents.map((agent) => (
                <TableRow key={agent.id}>
                  <TableCell>{agent.email}</TableCell>
                  <TableCell>{agent.full_name || 'Sin nombre'}</TableCell>
                  <TableCell>
                    {agent.currentTier ? (
                      <Badge variant={getTierBadgeVariant(agent.currentTier.name)}>
                        {agent.currentTier.name}
                      </Badge>
                    ) : (
                      <Badge variant="outline">Sin tier</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {agent.currentTier?.property_limit ? (
                      `${agent.currentTier.property_limit} propiedades`
                    ) : agent.currentTier ? (
                      'Ilimitado'
                    ) : (
                      'Sin límite asignado'
                    )}
                  </TableCell>
                  <TableCell>
                    {agent.currentTier && (
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button size="sm" variant="outline">
                            Remover Tier
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Remover Tier</AlertDialogTitle>
                            <AlertDialogDescription>
                              ¿Estás seguro de que quieres remover el tier de {agent.email}?
                              El agente volverá al sistema de suscripciones normal.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => removeTier(agent.id)}
                            >
                              Remover
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Información de Tiers */}
      <Card>
        <CardHeader>
          <CardTitle>Tiers Disponibles</CardTitle>
          <CardDescription>
            Información sobre los tiers y sus límites
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {tiers.map((tier) => (
              <Card key={tier.id} className="border-2">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">
                    <Badge variant={getTierBadgeVariant(tier.name)} className="mb-2">
                      {tier.name}
                    </Badge>
                  </CardTitle>
                  <CardDescription className="text-sm">
                    {tier.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm font-medium">
                    Límite: {tier.property_limit ? `${tier.property_limit} propiedades` : 'Ilimitado'}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    ${tier.monthly_price}/mes
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminTierManagement;