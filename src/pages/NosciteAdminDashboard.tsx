import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { CommentariumPost, Document } from "@/types/database";
import { format } from "date-fns";
import { it } from "date-fns/locale";
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
  LogOut,
  ArrowLeft,
  RefreshCw,
  Database,
  CheckCircle2
} from "lucide-react";
import CommentariumEditor from "@/components/CommentariumEditor";
import DocumentManager from "@/components/DocumentManager";
import DocumentsList from "@/components/DocumentsList";
import UserManager from "@/components/UserManager";
import NewsletterManager from "@/components/NewsletterManager";
import SecurityDashboard from "@/components/SecurityDashboard";
import BusinessCardManager from "@/components/BusinessCardManager";

export default function NosciteAdminDashboard() {
  const { user, loading: authLoading, userRole, isAdmin, signOut } = useAuth();
  const [loading, setLoading] = useState(true);
  const [commentariumPosts, setCommentariumPosts] = useState<CommentariumPost[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [showCommentariumEditor, setShowCommentariumEditor] = useState(false);
  const [editingPost, setEditingPost] = useState<CommentariumPost | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    console.log('🎯 Dashboard useEffect triggered');
    console.log('🔄 Auth state:', { 
      authLoading, 
      hasUser: !!user, 
      userEmail: user?.email,
      userRole: userRole,
      isAdminCheck: isAdmin()
    });
    console.log('🔍 Current URL:', window.location.href);
    console.log('🔍 Current pathname:', window.location.pathname);
    
    if (!authLoading) {
      console.log('📍 Auth loading completed');
      
      if (!user) {
        console.log('❌ No user found, redirecting to auth');
        toast({
          title: "Autenticazione Richiesta",
          description: "Effettua l'accesso per accedere all'area amministrazione.",
          variant: "destructive",
        });
        navigate("/nosciteadmin/auth");
        return;
      }
      
      console.log('👤 User found:', user.email);
      console.log('🔐 Checking admin permissions...');
      
      if (!isAdmin()) {
        console.log('🚫 User is not admin, current role:', userRole);
        toast({
          title: "Accesso Negato",
          description: "Non hai i permessi per accedere all'area amministrazione.",
          variant: "destructive",
        });
        navigate("/");
        return;
      }
      
      console.log('✅ Admin access confirmed, loading dashboard data');
      loadCommentariumPosts();
      loadDocuments();
      setLoading(false);
    } else {
      console.log('⏳ Still loading auth state...');
    }
  }, [user, authLoading, userRole, navigate]);

  const loadCommentariumPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCommentariumPosts(data || []);
    } catch (error) {
      console.error('Error loading commentarium posts:', error);
      toast({
        title: "Errore",
        description: "Impossibile caricare gli articoli del commentarium",
        variant: "destructive",
      });
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
      toast({
        title: "Errore",
        description: "Impossibile caricare i documenti",
        variant: "destructive",
      });
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  const handleDeletePost = async (id: string) => {
    if (!confirm('Sei sicuro di voler eliminare questo articolo?')) return;

    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      toast({
        title: "Articolo eliminato",
        description: "L'articolo è stato eliminato con successo",
      });
      
      loadCommentariumPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
      toast({
        title: "Errore",
        description: "Impossibile eliminare l'articolo",
        variant: "destructive",
      });
    }
  };

  const handleTogglePublish = async (post: CommentariumPost) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .update({
          published: !post.published,
          published_at: !post.published ? new Date().toISOString() : null
        })
        .eq('id', post.id);

      if (error) throw error;
      
      toast({
        title: post.published ? "Articolo nascosto" : "Articolo pubblicato",
        description: post.published 
          ? "L'articolo non è più visibile pubblicamente" 
          : "L'articolo è ora visibile pubblicamente",
      });
      
      loadCommentariumPosts();
    } catch (error) {
      console.error('Error updating post:', error);
      toast({
        title: "Errore",
        description: "Impossibile aggiornare lo stato dell'articolo",
        variant: "destructive",
      });
    }
  };

  const handleSyncKnowledgeBase = async () => {
    setIsSyncing(true);
    try {
      const { data, error } = await supabase.functions.invoke('sync-knowledge-base');
      
      if (error) throw error;
      
      toast({
        title: "Sincronizzazione completata",
        description: "La knowledge base è stata aggiornata con i contenuti più recenti del sito.",
      });
    } catch (error) {
      console.error('Error syncing knowledge base:', error);
      toast({
        title: "Errore",
        description: "Impossibile sincronizzare la knowledge base",
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
          <p className="text-muted-foreground">Caricamento area amministrazione...</p>
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
              <span>Autenticazione Richiesta</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Alert>
              <AlertDescription>
                Effettua l'accesso per accedere all'area amministrazione.
              </AlertDescription>
            </Alert>
            <div className="mt-4 space-y-2">
              <Button className="w-full" asChild>
                <Link to="/nosciteadmin/auth">Accedi</Link>
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <Link to="/">Torna al Sito</Link>
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
              <span>Accesso Negato</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Alert variant="destructive">
              <AlertDescription>
                Non hai i permessi per accedere all'area amministrazione. Contatta un amministratore.
              </AlertDescription>
            </Alert>
            <div className="mt-4">
              <Button variant="outline" className="w-full" asChild>
                <Link to="/">Torna al Sito</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (showCommentariumEditor) {
    return (
      <CommentariumEditor
        post={editingPost}
        onSave={() => {
          setShowCommentariumEditor(false);
          setEditingPost(null);
          loadCommentariumPosts();
        }}
        onCancel={() => {
          setShowCommentariumEditor(false);
          setEditingPost(null);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <img 
                src="/lovable-uploads/2282fb05-d65e-4f00-a180-d1fb3bee5bdb.png" 
                alt="Noscite Logo" 
                className="h-8 w-auto"
              />
              <h1 className="text-xl font-bold">Noscite Admin</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">
                {user?.email}
              </span>
              <Button variant="outline" size="sm" asChild>
                <Link to="/">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Sito
                </Link>
              </Button>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Esci
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 lg:px-8 py-8">
        <Tabs defaultValue="blog" className="w-full">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="blog">Blog</TabsTrigger>
            <TabsTrigger value="businesscards">Biglietti</TabsTrigger>
            <TabsTrigger value="documents">Documenti</TabsTrigger>
            <TabsTrigger value="newsletter">Newsletter</TabsTrigger>
            <TabsTrigger value="users">Utenti</TabsTrigger>
            <TabsTrigger value="security">Sicurezza</TabsTrigger>
            <TabsTrigger value="knowledge">Knowledge</TabsTrigger>
          </TabsList>

          {/* Blog Management */}
          <TabsContent value="blog" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Articoli del Commentarium</h2>
              <Button 
                onClick={() => setShowCommentariumEditor(true)}
                className="flex items-center space-x-2"
              >
                <PlusCircle className="h-4 w-4" />
                <span>Nuovo Articolo</span>
              </Button>
            </div>

            <div className="grid gap-6">
              {commentariumPosts.map((post) => (
                <Card key={post.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <CardTitle className="text-lg">{post.title}</CardTitle>
                        <CardDescription>{post.excerpt}</CardDescription>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(post.created_at || '').toLocaleDateString()}</span>
                          </div>
                          {(() => {
                            const isScheduled = post.published && post.published_at && new Date(post.published_at) > new Date();
                            const isPublished = post.published && post.published_at && new Date(post.published_at) <= new Date();
                            
                            if (isScheduled) {
                              return (
                                <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-300">
                                  Pianificato: {format(new Date(post.published_at!), "d MMM yyyy 'alle' HH:mm", { locale: it })}
                                </Badge>
                              );
                            } else if (isPublished) {
                              return <Badge variant="default">Pubblicato</Badge>;
                            } else {
                              return <Badge variant="secondary">Bozza</Badge>;
                            }
                          })()}
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
                            setShowCommentariumEditor(true);
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
                          onClick={() => handleDeletePost(post.id!)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
              
              {commentariumPosts.length === 0 && (
                <Card>
                  <CardContent className="text-center py-12">
                    <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">Nessun articolo</h3>
                    <p className="text-muted-foreground mb-4">
                      Non ci sono ancora articoli nel commentarium. Creane uno!
                    </p>
                    <Button onClick={() => setShowCommentariumEditor(true)}>
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Crea Primo Articolo
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Business Cards Management */}
          <TabsContent value="businesscards" className="space-y-6">
            <BusinessCardManager />
          </TabsContent>

          {/* Documents Management */}
          <TabsContent value="documents" className="space-y-6">
            <DocumentManager onDocumentChange={loadDocuments} />
            <DocumentsList 
              documents={documents} 
              onDocumentChange={loadDocuments}
              showActions={true}
            />
          </TabsContent>

          {/* Newsletter Management */}
          <TabsContent value="newsletter" className="space-y-6">
            <NewsletterManager />
          </TabsContent>

          {/* Users Management */}
          <TabsContent value="users" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Gestione Utenti</h2>
            </div>
            <UserManager />
          </TabsContent>

          {/* Security Dashboard */}
          <TabsContent value="security" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Pannello di Sicurezza</h2>
            </div>
            <SecurityDashboard />
          </TabsContent>

          {/* Knowledge Base Management */}
          <TabsContent value="knowledge" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Database className="h-5 w-5" />
                  <span>Gestione Knowledge Base</span>
                </CardTitle>
                <CardDescription>
                  Sincronizza automaticamente i contenuti del sito con la knowledge base del chatbot
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <AlertDescription>
                    La sincronizzazione aggiornerà la knowledge base con i contenuti più recenti da:
                    Atheneum, Profilum Societatis, Servizi e Contatti.
                  </AlertDescription>
                </Alert>
                
                <Button 
                  onClick={handleSyncKnowledgeBase} 
                  disabled={isSyncing}
                  className="w-full"
                >
                  {isSyncing ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Sincronizzazione in corso...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      Sincronizza Knowledge Base
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}