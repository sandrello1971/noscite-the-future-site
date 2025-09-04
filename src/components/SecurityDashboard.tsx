import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Shield, AlertTriangle, Activity, Filter, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AuditLog {
  id: string;
  user_id: string | null;
  action: string;
  table_name: string;
  record_id: string | null;
  old_values: any;
  new_values: any;
  ip_address: string | null;
  user_agent: string | null;
  created_at: string;
}

const SecurityDashboard = () => {
  const { isAdmin, user } = useAuth();
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [tableFilter, setTableFilter] = useState<string>('all');
  const [actionFilter, setActionFilter] = useState<string>('all');
  const { toast } = useToast();

  const loadAuditLogs = async () => {
    if (!isAdmin()) return;

    setLoading(true);
    try {
      let query = supabase
        .from('security_audit_log')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      if (tableFilter !== 'all') {
        query = query.eq('table_name', tableFilter);
      }

      if (actionFilter !== 'all') {
        query = query.eq('action', actionFilter);
      }

      const { data, error } = await query;

      if (error) throw error;
      setAuditLogs(data || []);
    } catch (error) {
      console.error('Error loading audit logs:', error);
      toast({
        title: "Errore",
        description: "Impossibile caricare i log di sicurezza",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAuditLogs();
  }, [tableFilter, actionFilter]);

  if (!isAdmin()) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-destructive" />
            <span>Accesso Negato</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertDescription>
              Non hai i permessi per accedere al pannello di sicurezza.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  const getActionColor = (action: string) => {
    switch (action) {
      case 'INSERT': return 'default';
      case 'UPDATE': return 'secondary';
      case 'DELETE': return 'destructive';
      default: return 'outline';
    }
  };

  const getSensitivityLevel = (tableName: string) => {
    const highSensitivity = ['user_roles', 'profiles', 'contact_messages'];
    return highSensitivity.includes(tableName) ? 'high' : 'medium';
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5" />
            <span>Pannello di Sicurezza</span>
          </CardTitle>
          <CardDescription>
            Monitora tutte le operazioni sensibili nel sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Activity className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Operazioni Totali</p>
                    <p className="text-2xl font-bold">{auditLogs.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-4 w-4 text-orange-500" />
                  <div>
                    <p className="text-sm font-medium">Operazioni Sensibili</p>
                    <p className="text-2xl font-bold">
                      {auditLogs.filter(log => getSensitivityLevel(log.table_name) === 'high').length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-green-500" />
                  <div>
                    <p className="text-sm font-medium">Utenti Attivi</p>
                    <p className="text-2xl font-bold">
                      {new Set(auditLogs.map(log => log.user_id).filter(Boolean)).size}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex items-center space-x-4 mb-6">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4" />
              <span className="text-sm font-medium">Filtri:</span>
            </div>
            
            <Select value={tableFilter} onValueChange={setTableFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filtra per tabella" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tutte le tabelle</SelectItem>
                <SelectItem value="user_roles">Ruoli Utenti</SelectItem>
                <SelectItem value="profiles">Profili</SelectItem>
                <SelectItem value="contact_messages">Messaggi Contatto</SelectItem>
                <SelectItem value="newsletter_subscriptions">Newsletter</SelectItem>
              </SelectContent>
            </Select>

            <Select value={actionFilter} onValueChange={setActionFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filtra per azione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tutte le azioni</SelectItem>
                <SelectItem value="INSERT">Inserimenti</SelectItem>
                <SelectItem value="UPDATE">Modifiche</SelectItem>
                <SelectItem value="DELETE">Cancellazioni</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" onClick={loadAuditLogs} disabled={loading}>
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Aggiorna
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Log delle Operazioni di Sicurezza</CardTitle>
          <CardDescription>
            Cronologia completa delle operazioni sui dati sensibili
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <RefreshCw className="h-6 w-6 animate-spin" />
              <span className="ml-2">Caricamento...</span>
            </div>
          ) : auditLogs.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Shield className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Nessun log di sicurezza trovato</p>
            </div>
          ) : (
            <div className="space-y-4">
              {auditLogs.map((log) => (
                <div key={log.id} className="border rounded-lg p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Badge variant={getActionColor(log.action)}>
                        {log.action}
                      </Badge>
                      <Badge variant="outline">
                        {log.table_name}
                      </Badge>
                      {getSensitivityLevel(log.table_name) === 'high' && (
                        <Badge variant="destructive" className="text-xs">
                          Alta Sensibilità
                        </Badge>
                      )}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {new Date(log.created_at).toLocaleString('it-IT')}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-medium">Dettagli Operazione:</p>
                      <p>ID Record: {log.record_id || 'N/A'}</p>
                      <p>Indirizzo IP: {log.ip_address || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="font-medium">Utente:</p>
                      <p>{log.user_id || 'Sistema'}</p>
                    </div>
                  </div>

                  {(log.old_values || log.new_values) && (
                    <details className="mt-2">
                      <summary className="cursor-pointer text-sm font-medium hover:text-primary">
                        Visualizza dettagli modifiche
                      </summary>
                      <div className="mt-2 p-3 bg-muted rounded text-xs">
                        {log.old_values && (
                          <div className="mb-2">
                            <p className="font-medium">Valori precedenti:</p>
                            <pre className="whitespace-pre-wrap">
                              {JSON.stringify(log.old_values, null, 2)}
                            </pre>
                          </div>
                        )}
                        {log.new_values && (
                          <div>
                            <p className="font-medium">Nuovi valori:</p>
                            <pre className="whitespace-pre-wrap">
                              {JSON.stringify(log.new_values, null, 2)}
                            </pre>
                          </div>
                        )}
                      </div>
                    </details>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SecurityDashboard;