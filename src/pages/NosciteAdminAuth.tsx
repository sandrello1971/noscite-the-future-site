import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export default function NosciteAdminAuth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is already logged in
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        console.log("🔍 Found existing session, checking admin role...");
        // Check if user has admin role before redirecting
        const { data: userRole } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', session.user.id)
          .single();
        
        console.log("👤 User role check result:", userRole);
        
        if (userRole?.role === 'admin') {
          console.log("✅ Existing admin session found, redirecting...");
          navigate("/nosciteadmin");
        }
      }
    };
    
    checkUser();
  }, [navigate]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 6;
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!validateEmail(email)) {
      setError("Inserisci un indirizzo email valido");
      return;
    }
    
    if (!validatePassword(password)) {
      setError("La password deve contenere almeno 6 caratteri");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        if (error.message.includes("Invalid login credentials")) {
          setError("Email o password non validi. Riprova.");
        } else if (error.message.includes("Email not confirmed")) {
          setError("Controlla la tua email e clicca sul link di conferma prima di accedere.");
        } else {
          setError(error.message);
        }
        return;
      }

      if (data.user) {
        console.log('✅ User logged in successfully:', data.user.email);
        console.log('🔍 Starting role check for user ID:', data.user.id);
        
        // Check if user has admin role
        const { data: userRole, error: roleError } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', data.user.id)
          .single();

        console.log('📋 Role query result:', { 
          userRole, 
          roleError,
          roleValue: userRole?.role,
          hasRole: !!userRole,
          isAdmin: userRole?.role === 'admin'
        });

        if (roleError) {
          console.log('❌ Role error occurred:', roleError);
          // If role error but user exists, check if no role found (PGRST116)
          if (roleError.code === 'PGRST116') {
            console.log('⚠️ No role found for user - access denied');
            setError("Accesso negato. Non hai i permessi di amministratore.");
            await supabase.auth.signOut();
            return;
          }
          setError("Errore nel controllo dei permessi. Contatta l'amministratore.");
          await supabase.auth.signOut();
          return;
        }

        if (userRole?.role !== 'admin') {
          console.log('🚫 Access denied - user role is:', userRole?.role);
          setError("Accesso negato. Non hai i permessi di amministratore.");
          await supabase.auth.signOut();
          return;
        }

        console.log('✅ Admin access granted! Role:', userRole.role);
        console.log('🔄 Attempting navigation to /nosciteadmin');
        
        toast({
          title: "Accesso effettuato",
          description: "Benvenuto nell'area amministrazione!",
        });

        // Navigate immediately
        navigate("/nosciteadmin");
      }
    } catch (err) {
      setError("Si è verificato un errore imprevisto. Riprova più tardi.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!validateEmail(email)) {
      setError("Inserisci un indirizzo email valido");
      return;
    }
    
    if (!validatePassword(password)) {
      setError("La password deve contenere almeno 6 caratteri");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/nosciteadmin/auth`
        }
      });

      if (error) {
        if (error.message.includes("User already registered")) {
          setError("Utente già registrato. Prova ad accedere.");
        } else {
          setError(error.message);
        }
        return;
      }

      if (data.user) {
        toast({
          title: "Registrazione effettuata",
          description: "Controlla la tua email per confermare l'account.",
        });
      }
    } catch (err) {
      setError("Si è verificato un errore imprevisto. Riprova più tardi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-6">
          <Button variant="ghost" asChild>
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Torna al Sito
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Noscite Admin</CardTitle>
            <CardDescription>
              Accedi all'area di amministrazione
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">Accedi</TabsTrigger>
                <TabsTrigger value="signup">Registrati</TabsTrigger>
              </TabsList>
              
              <TabsContent value="signin">
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signin-email">Email Amministratore</Label>
                    <Input
                      id="signin-email"
                      type="email"
                      placeholder="admin@noscite.it"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      autoComplete="email"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signin-password">Password</Label>
                    <div className="relative">
                      <Input
                        id="signin-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Inserisci la password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoComplete="current-password"
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
                    {loading ? "Accesso in corso..." : "Accedi"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email Amministratore</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="admin@noscite.it"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      autoComplete="email"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <div className="relative">
                      <Input
                        id="signup-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Crea una password (min. 6 caratteri)"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoComplete="new-password"
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
                    {loading ? "Registrazione in corso..." : "Registrati"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              <p>Area riservata agli amministratori di Noscite</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}