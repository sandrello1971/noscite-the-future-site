import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Trash2, UserPlus, Shield, User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

interface UserWithRole {
  id: string;
  email: string;
  created_at: string;
  role: 'admin' | 'user';
}

export default function UserManager() {
  const [users, setUsers] = useState<UserWithRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [inviteEmail, setInviteEmail] = useState("");
  const [invitePassword, setInvitePassword] = useState("");
  const [inviteRole, setInviteRole] = useState<'admin' | 'user'>('user');
  const [useManualCreation, setUseManualCreation] = useState(true);
  const [requirePasswordChange, setRequirePasswordChange] = useState(true);
  const [inviting, setInviting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      
      // Ottieni tutti i profili con i loro ruoli
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('user_id, email');

      if (profilesError) throw profilesError;

      // Ottieni i ruoli
      const { data: roles, error: rolesError } = await supabase
        .from('user_roles')
        .select('user_id, role');

      if (rolesError) throw rolesError;

      // Combina i dati
      const usersWithRoles = profiles?.map(profile => {
        const userRole = roles?.find(role => role.user_id === profile.user_id);
        return {
          id: profile.user_id,
          email: profile.email || '',
          created_at: '',
          role: (userRole?.role || 'user') as 'admin' | 'user'
        };
      }) || [];

      setUsers(usersWithRoles);
    } catch (error) {
      console.error('Errore nel caricamento utenti:', error);
      toast({
        title: "Errore",
        description: "Impossibile caricare gli utenti",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInviteUser = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inviteEmail) {
      toast({
        title: "Errore",
        description: "Inserisci un indirizzo email",
        variant: "destructive",
      });
      return;
    }

    if (useManualCreation && !invitePassword) {
      toast({
        title: "Errore",
        description: "Inserisci una password",
        variant: "destructive",
      });
      return;
    }

    setInviting(true);

    try {
      // Use secure admin operations edge function
      const { data, error } = await supabase.functions.invoke('admin-operations', {
        body: {
          action: useManualCreation ? 'createUser' : 'invite',
          email: inviteEmail,
          password: invitePassword,
          role: inviteRole,
          requirePasswordChange: useManualCreation ? requirePasswordChange : false
        }
      });

      if (error) throw error;

      toast({
        title: useManualCreation ? "Utente creato" : "Invito inviato",
        description: useManualCreation 
          ? `Utente ${inviteEmail} creato con successo`
          : `Invito inviato a ${inviteEmail}`,
      });

      setInviteEmail("");
      setInvitePassword("");
      loadUsers();
    } catch (error: any) {
      console.error("Errore nell'operazione:", error);
      toast({
        title: "Errore",
        description: error.message || "Impossibile completare l'operazione",
        variant: "destructive",
      });
    } finally {
      setInviting(false);
    }
  };

  const handleChangeRole = async (userId: string, newRole: 'admin' | 'user') => {
    try {
      // Use secure admin operations edge function
      const { data, error } = await supabase.functions.invoke('admin-operations', {
        body: {
          action: 'changeRole',
          userId: userId,
          role: newRole
        }
      });

      if (error) throw error;

      toast({
        title: "Ruolo aggiornato",
        description: `Ruolo cambiato in ${newRole}`,
      });

      loadUsers();
    } catch (error: any) {
      console.error("Errore nel cambio ruolo:", error);
      toast({
        title: "Errore",
        description: "Impossibile cambiare il ruolo",
        variant: "destructive",
      });
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      // Use secure admin operations edge function
      const { data, error } = await supabase.functions.invoke('admin-operations', {
        body: {
          action: 'deleteUser',
          userId: userId
        }
      });

      if (error) throw error;

      toast({
        title: "Utente eliminato",
        description: "Utente eliminato con successo",
      });

      loadUsers();
    } catch (error: any) {
      console.error("Errore nell'eliminazione:", error);
      toast({
        title: "Errore",
        description: "Impossibile eliminare l'utente",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">Caricamento utenti...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Form per invitare nuovi utenti */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            {useManualCreation ? "Crea Nuovo Utente" : "Invita Nuovo Utente"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-4 border-b">
              <div className="space-y-1">
                <Label htmlFor="manual-creation">Creazione Manuale</Label>
                <p className="text-sm text-muted-foreground">
                  {useManualCreation 
                    ? "Crea utente con password senza inviare email"
                    : "Invia email di invito all'utente"}
                </p>
              </div>
              <Switch
                id="manual-creation"
                checked={useManualCreation}
                onCheckedChange={setUseManualCreation}
              />
            </div>
            
            {useManualCreation && (
              <div className="flex items-center justify-between pb-4 border-b">
                <div className="space-y-1">
                  <Label htmlFor="require-password-change">Richiedi Cambio Password</Label>
                  <p className="text-sm text-muted-foreground">
                    L'utente riceverà una email per cambiare la password al primo accesso
                  </p>
                </div>
                <Switch
                  id="require-password-change"
                  checked={requirePasswordChange}
                  onCheckedChange={setRequirePasswordChange}
                />
              </div>
            )}
            
            <form onSubmit={handleInviteUser} className="flex flex-col gap-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <Label htmlFor="invite-email">Email</Label>
                  <Input
                    id="invite-email"
                    type="email"
                    placeholder="utente@esempio.com"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    required
                  />
                </div>
                
                {useManualCreation && (
                  <div className="flex-1">
                    <Label htmlFor="invite-password">Password</Label>
                    <Input
                      id="invite-password"
                      type="password"
                      placeholder="Password"
                      value={invitePassword}
                      onChange={(e) => setInvitePassword(e.target.value)}
                      required={useManualCreation}
                      minLength={6}
                    />
                  </div>
                )}
                
                <div className="w-32">
                  <Label htmlFor="invite-role">Ruolo</Label>
                  <Select value={inviteRole} onValueChange={(value: 'admin' | 'user') => setInviteRole(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user">Utente</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Button type="submit" disabled={inviting} className="w-fit">
                {inviting ? "Elaborazione..." : (useManualCreation ? "Crea Utente" : "Invia Invito")}
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>

      {/* Lista utenti */}
      <Card>
        <CardHeader>
          <CardTitle>Utenti Registrati</CardTitle>
        </CardHeader>
        <CardContent>
          {users.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              Nessun utente trovato
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Ruolo</TableHead>
                  <TableHead>Azioni</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge variant={user.role === 'admin' ? 'default' : 'secondary'} className="flex items-center gap-1 w-fit">
                        {user.role === 'admin' ? <Shield className="h-3 w-3" /> : <User className="h-3 w-3" />}
                        {user.role === 'admin' ? 'Admin' : 'Utente'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Select
                          value={user.role}
                          onValueChange={(value: 'admin' | 'user') => handleChangeRole(user.id, value)}
                        >
                          <SelectTrigger className="w-24">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="user">Utente</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
                          </SelectContent>
                        </Select>
                        
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Elimina Utente</AlertDialogTitle>
                              <AlertDialogDescription>
                                Sei sicuro di voler eliminare l'utente {user.email}? Questa azione non può essere annullata.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Annulla</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={() => handleDeleteUser(user.id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Elimina
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}