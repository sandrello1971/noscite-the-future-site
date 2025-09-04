import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Download, 
  FileSpreadsheet, 
  MoreVertical,
  AlertCircle
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Papa from 'papaparse';

interface NewsletterSubscription {
  id: string;
  email: string;
  subscribed_at: string;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export default function NewsletterManager() {
  const [subscriptions, setSubscriptions] = useState<NewsletterSubscription[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadSubscriptions();
  }, []);

  const loadSubscriptions = async () => {
    try {
      const { data, error } = await supabase
        .from('newsletter_subscriptions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading newsletter subscriptions:', error);
        toast({
          title: "Errore",
          description: "Impossibile caricare le iscrizioni alla newsletter",
          variant: "destructive",
        });
        return;
      }

      setSubscriptions(data || []);
    } catch (error) {
      console.error('Error loading newsletter subscriptions:', error);
      toast({
        title: "Errore",
        description: "Errore nel caricamento dei dati",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleSubscriptionStatus = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('newsletter_subscriptions')
        .update({ active: !currentStatus })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Stato aggiornato",
        description: `Iscrizione ${!currentStatus ? 'riattivata' : 'disattivata'} con successo`,
      });

      loadSubscriptions();
    } catch (error) {
      console.error('Error updating subscription:', error);
      toast({
        title: "Errore",
        description: "Impossibile aggiornare lo stato dell'iscrizione",
        variant: "destructive",
      });
    }
  };

  const deleteSubscription = async (id: string) => {
    if (!confirm('Sei sicuro di voler eliminare questa iscrizione?')) return;

    try {
      const { error } = await supabase
        .from('newsletter_subscriptions')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Iscrizione eliminata",
        description: "L'iscrizione è stata eliminata con successo",
      });

      loadSubscriptions();
    } catch (error) {
      console.error('Error deleting subscription:', error);
      toast({
        title: "Errore",
        description: "Impossibile eliminare l'iscrizione",
        variant: "destructive",
      });
    }
  };

  const exportToCSV = () => {
    const csvData = subscriptions.map(sub => ({
      'Email': sub.email,
      'Data Iscrizione': new Date(sub.subscribed_at).toLocaleDateString('it-IT'),
      'Stato': sub.active ? 'Attivo' : 'Disattivato',
      'Data Creazione': new Date(sub.created_at).toLocaleDateString('it-IT'),
      'Ultimo Aggiornamento': new Date(sub.updated_at).toLocaleDateString('it-IT')
    }));

    const csv = Papa.unparse(csvData, {
      delimiter: ',',
      header: true
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `newsletter-iscrizioni-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Export completato",
      description: "File CSV scaricato con successo",
    });
  };

  const exportToExcel = () => {
    // Create a simple Excel-compatible format using tab-separated values
    const headers = ['Email', 'Data Iscrizione', 'Stato', 'Data Creazione', 'Ultimo Aggiornamento'];
    const rows = subscriptions.map(sub => [
      sub.email,
      new Date(sub.subscribed_at).toLocaleDateString('it-IT'),
      sub.active ? 'Attivo' : 'Disattivato',
      new Date(sub.created_at).toLocaleDateString('it-IT'),
      new Date(sub.updated_at).toLocaleDateString('it-IT')
    ]);

    const csvContent = [headers, ...rows]
      .map(row => row.join('\t'))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'application/vnd.ms-excel;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `newsletter-iscrizioni-${new Date().toISOString().split('T')[0]}.xls`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Export completato",
      description: "File Excel scaricato con successo",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const activeSubscriptions = subscriptions.filter(sub => sub.active);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Iscritti alla Newsletter</h2>
        <div className="flex items-center space-x-4">
          <Badge variant="secondary">
            {activeSubscriptions.length} / {subscriptions.length} attivi
          </Badge>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center space-x-2">
                <Download className="h-4 w-4" />
                <span>Esporta</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={exportToCSV}>
                <FileSpreadsheet className="h-4 w-4 mr-2" />
                Esporta CSV
              </DropdownMenuItem>
              <DropdownMenuItem onClick={exportToExcel}>
                <FileSpreadsheet className="h-4 w-4 mr-2" />
                Esporta Excel
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista Iscrizioni</CardTitle>
          <CardDescription>
            Gestisci tutte le iscrizioni alla newsletter. Puoi attivare/disattivare o eliminare le iscrizioni.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {subscriptions.length === 0 ? (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Nessuna iscrizione</h3>
              <p className="text-muted-foreground">
                Non ci sono ancora iscrizioni alla newsletter.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {subscriptions.map((subscription) => (
                <div 
                  key={subscription.id} 
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center space-x-2">
                      <p className="font-medium">{subscription.email}</p>
                      {!subscription.active && (
                        <AlertCircle className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Iscritto il {new Date(subscription.subscribed_at).toLocaleDateString('it-IT')} alle{' '}
                      {new Date(subscription.subscribed_at).toLocaleTimeString('it-IT', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={subscription.active ? "default" : "secondary"}>
                      {subscription.active ? "Attivo" : "Disattivato"}
                    </Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => toggleSubscriptionStatus(subscription.id, subscription.active)}
                        >
                          {subscription.active ? 'Disattiva' : 'Riattiva'}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => deleteSubscription(subscription.id)}
                          className="text-destructive"
                        >
                          Elimina
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}