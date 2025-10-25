import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  PlusCircle, 
  FileText, 
  Upload, 
  Eye, 
  Edit, 
  Trash2,
  Calendar,
  Users,
  Shield,
  AlertTriangle,
  RefreshCw,
  Database,
  CheckCircle2
} from "lucide-react";
import BlogEditor from "@/components/BlogEditor";
import DocumentManager from "@/components/DocumentManager";
import { BlogPost, Document } from "@/types/database";


const AdminDashboard = () => {
  const { user, loading: authLoading, isAdmin, signOut } = useAuth();
  const [loading, setLoading] = useState(true);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [showBlogEditor, setShowBlogEditor] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [newsletters, setNewsletters] = useState<Array<{
    id: string;
    email: string;
    subscribed_at: string;
    active: boolean;
  }>>([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        toast({
          title: "Authentication Required",
          description: "Please sign in to access the admin dashboard.",
          variant: "destructive",
        });
        navigate("/auth");
        return;
      }
      
      if (!isAdmin()) {
        toast({
          title: "Access Denied",
          description: "You don't have permission to access the admin dashboard.",
          variant: "destructive",
        });
        navigate("/");
        return;
      }
      
      loadBlogPosts();
      loadDocuments();
      loadNewsletters();
      setLoading(false);
    }
  }, [user, authLoading, isAdmin, navigate, toast]);

  const loadBlogPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBlogPosts(data || []);
    } catch (error) {
      console.error('Error loading blog posts:', error);
    }
  };

  const loadDocuments = async () => {
    try {
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDocuments(data || []);
    } catch (error) {
      console.error('Error loading documents:', error);
    }
  };

  const loadNewsletters = async () => {
    try {
      const { data, error } = await supabase
        .from('newsletter_subscriptions')
        .select('*')
        .order('subscribed_at', { ascending: false });

      if (error) throw error;
      setNewsletters(data || []);
    } catch (error) {
      console.error('Error loading newsletters:', error);
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  const handleDeletePost = async (id: string) => {
    if (!confirm('Sei sicuro di voler eliminare questo post?')) return;

    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);

      if (error) throw error;
      loadBlogPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleTogglePublish = async (post: BlogPost) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .update({
          published: !post.published,
          published_at: !post.published ? new Date().toISOString() : null
        })
        .eq('id', post.id);

      if (error) throw error;
      loadBlogPosts();
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  const handleSyncKnowledgeBase = async () => {
    if (!confirm('Vuoi sincronizzare il knowledge base con i contenuti aggiornati del sito? Questa operazione potrebbe richiedere alcuni minuti.')) {
      return;
    }

    setIsSyncing(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('sync-knowledge-base');

      if (error) throw error;

      toast({
        title: "Sincronizzazione completata",
        description: `${data.synced} contenuti sincronizzati su ${data.total} totali.`,
      });

      if (data.errors && data.errors.length > 0) {
        console.error('Sync errors:', data.errors);
        toast({
          title: "Alcuni errori durante la sincronizzazione",
          description: `${data.errors.length} contenuti non sono stati sincronizzati.`,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error syncing knowledge base:', error);
      toast({
        title: "Errore durante la sincronizzazione",
        description: error instanceof Error ? error.message : "Errore sconosciuto",
        variant: "destructive",
      });
    } finally {
      setIsSyncing(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              <span>Authentication Required</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Alert>
              <AlertDescription>
                Please sign in to access the admin dashboard.
              </AlertDescription>
            </Alert>
            <div className="mt-4 space-y-2">
              <Button className="w-full" asChild>
                <a href="/auth">Sign In</a>
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <a href="/">Back to Home</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!isAdmin()) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-destructive" />
              <span>Access Denied</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Alert variant="destructive">
              <AlertDescription>
                You don't have permission to access the admin dashboard. Please contact an administrator.
              </AlertDescription>
            </Alert>
            <div className="mt-4">
              <Button variant="outline" className="w-full" asChild>
                <a href="/">Back to Home</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (showBlogEditor) {
    return (
      <BlogEditor
        post={editingPost}
        onSave={() => {
          setShowBlogEditor(false);
          setEditingPost(null);
          loadBlogPosts();
        }}
        onCancel={() => {
          setShowBlogEditor(false);
          setEditingPost(null);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <img 
                src="/lovable-uploads/b5b25fd0-a304-47db-ada5-41413f8c2da0.png" 
                alt="Noscite Logo" 
                className="h-8 w-auto"
              />
              <h1 className="text-xl font-bold">Pannello Amministrazione</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">
                {user?.email}
              </span>
              <Button variant="outline" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 lg:px-8 py-8">
        <Tabs defaultValue="blog" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="blog">Gestione Blog</TabsTrigger>
            <TabsTrigger value="documents">Gestione Documenti</TabsTrigger>
            <TabsTrigger value="newsletter">Newsletter</TabsTrigger>
            <TabsTrigger value="knowledge">Knowledge Base</TabsTrigger>
          </TabsList>

          {/* Blog Management */}
          <TabsContent value="blog" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Articoli del Blog</h2>
              <Button 
                onClick={() => setShowBlogEditor(true)}
                className="flex items-center space-x-2"
              >
                <PlusCircle className="h-4 w-4" />
                <span>Nuovo Articolo</span>
              </Button>
            </div>

            <div className="grid gap-6">
              {blogPosts.map((post) => (
                <Card key={post.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <CardTitle className="text-lg">{post.title}</CardTitle>
                        <CardDescription>{post.excerpt}</CardDescription>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(post.created_at).toLocaleDateString()}</span>
                          </div>
                          <Badge variant={post.published ? "default" : "secondary"}>
                            {post.published ? "Pubblicato" : "Bozza"}
                          </Badge>
                          {post.category && (
                            <Badge variant="outline">{post.category}</Badge>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setEditingPost(post);
                            setShowBlogEditor(true);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleTogglePublish(post)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeletePost(post.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Documents Management */}
          <TabsContent value="documents" className="space-y-6">
            <DocumentManager onDocumentChange={loadDocuments} />
          </TabsContent>

          {/* Newsletter Management */}
          <TabsContent value="newsletter" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Iscritti alla Newsletter</h2>
              <Badge variant="secondary">
                {newsletters.filter(n => n.active).length} iscritti attivi
              </Badge>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Lista Iscritti</CardTitle>
                <CardDescription>
                  Gestisci gli iscritti alla newsletter
                </CardDescription>
              </CardHeader>
              <CardContent>
                {newsletters.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Nessun iscritto alla newsletter</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {newsletters.map((newsletter) => (
                      <div key={newsletter.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="space-y-1">
                          <p className="font-medium">{newsletter.email}</p>
                          <p className="text-sm text-muted-foreground">
                            Iscritto il {new Date(newsletter.subscribed_at).toLocaleDateString('it-IT')}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={newsletter.active ? "default" : "secondary"}>
                            {newsletter.active ? "Attivo" : "Disattivato"}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Knowledge Base Management */}
          <TabsContent value="knowledge" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Knowledge Base Chatbot</h2>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Database className="h-5 w-5" />
                  <span>Sincronizzazione Automatica</span>
                </CardTitle>
                <CardDescription>
                  Aggiorna il knowledge base del chatbot con i contenuti più recenti del sito
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <AlertDescription>
                    La sincronizzazione estrae automaticamente i contenuti dalle pagine principali del sito (Atheneum, Profilum Societatis, Servizi, Contatti) 
                    e aggiorna il knowledge base utilizzato dal chatbot per rispondere alle domande degli utenti.
                  </AlertDescription>
                </Alert>

                <div className="bg-muted p-6 rounded-lg space-y-4">
                  <h3 className="font-semibold text-lg">Contenuti sincronizzati:</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary mr-2 mt-0.5" />
                      <span><strong>Atheneum:</strong> Tutti i percorsi formativi (Initium, Structura, Communitas, Transforma)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary mr-2 mt-0.5" />
                      <span><strong>Profilum Societatis:</strong> Informazioni aziendali, mission, vision, valori</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary mr-2 mt-0.5" />
                      <span><strong>Servizi:</strong> Consulenza, formazione, implementazione, supporto</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary mr-2 mt-0.5" />
                      <span><strong>Contatti:</strong> Informazioni di contatto e modalità</span>
                    </li>
                  </ul>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Sincronizza ora</p>
                    <p className="text-sm text-muted-foreground">L'operazione richiede circa 1-2 minuti</p>
                  </div>
                  <Button
                    onClick={handleSyncKnowledgeBase}
                    disabled={isSyncing}
                    className="flex items-center space-x-2"
                  >
                    <RefreshCw className={`h-4 w-4 ${isSyncing ? 'animate-spin' : ''}`} />
                    <span>{isSyncing ? 'Sincronizzazione...' : 'Sincronizza Knowledge Base'}</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Come funziona</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ol className="space-y-3 list-decimal list-inside text-sm">
                  <li>Il sistema estrae il contenuto testuale dalle pagine principali del sito</li>
                  <li>Genera embeddings AI per ogni contenuto usando OpenAI</li>
                  <li>Salva i contenuti nel database knowledge_base</li>
                  <li>Il chatbot usa questi contenuti per rispondere alle domande in modo preciso</li>
                </ol>
                <Alert>
                  <AlertDescription>
                    <strong>Quando sincronizzare:</strong> Esegui la sincronizzazione ogni volta che aggiorni contenuti importanti 
                    sulle pagine del sito (nuovi percorsi formativi, modifiche ai servizi, aggiornamenti aziendali, ecc.).
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;