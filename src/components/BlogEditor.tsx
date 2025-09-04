import { useState, useRef, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowLeft, Save, Eye, Upload, AlertTriangle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { BlogPost } from '@/types/database';

interface BlogEditorProps {
  post?: BlogPost | null;
  onSave: () => void;
  onCancel: () => void;
}

const BlogEditor = ({ post, onSave, onCancel }: BlogEditorProps) => {
  const { toast } = useToast();
  const editorRef = useRef<any>(null);
  const [formData, setFormData] = useState<BlogPost>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: '',
    tags: [],
    featured_image_url: '',
    published: false,
    ...post
  });
  const [loading, setLoading] = useState(false);
  const [tagsInput, setTagsInput] = useState(post?.tags?.join(', ') || '');
  const [apiKey, setApiKey] = useState<string>('');
  const [keyLoading, setKeyLoading] = useState(true);
  const [showKeyForm, setShowKeyForm] = useState(false);
  const [tempKey, setTempKey] = useState('');

  useEffect(() => {
    // Recupera la chiave API da localStorage oppure usa la demo key
    try {
      const saved = localStorage.getItem('tinymce_api_key');
      setApiKey(saved || 'no-api-key');
    } catch {
      setApiKey('no-api-key');
    } finally {
      setKeyLoading(false);
    }
  }, []);

  useEffect(() => {
    // Auto-generate slug from title
    if (formData.title && !post) {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .trim();
      setFormData(prev => ({ ...prev, slug }));
    }
  }, [formData.title, post]);

  const handleSaveApiKey = async () => {
    if (!tempKey.trim()) {
      toast({
        title: "Errore",
        description: "Inserisci una chiave API valida",
        variant: "destructive",
      });
      return;
    }

    // Salva la chiave in localStorage e nello stato
    const cleaned = tempKey.trim();
    try {
      localStorage.setItem('tinymce_api_key', cleaned);
    } catch {}
    setApiKey(cleaned);
    setShowKeyForm(false);
    setTempKey('');
    
    toast({
      title: "Successo",
      description: "Chiave API salvata correttamente",
    });
  };

  const handlePreview = () => {
    if (!formData.content) {
      toast({
        title: "Nessun contenuto",
        description: "Scrivi qualcosa nell'editor per vedere l'anteprima",
        variant: "destructive",
      });
      return;
    }

    // Apri una nuova finestra con l'anteprima
    const previewWindow = window.open('', '_blank');
    if (previewWindow) {
      previewWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>${formData.title || 'Anteprima Articolo'}</title>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { font-family: system-ui, -apple-system, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; line-height: 1.6; }
            h1 { color: #1a202c; margin-bottom: 10px; }
            .meta { color: #666; margin-bottom: 20px; font-size: 14px; }
            .content { margin-top: 20px; }
            img { max-width: 100%; height: auto; }
            blockquote { border-left: 4px solid #ddd; margin: 20px 0; padding-left: 16px; color: #666; }
          </style>
        </head>
        <body>
          <h1>${formData.title || 'Titolo non definito'}</h1>
          <div class="meta">
            ${formData.category ? `Categoria: ${formData.category} | ` : ''}
            ${formData.excerpt ? `Estratto: ${formData.excerpt}` : ''}
          </div>
          <div class="content">${formData.content}</div>
        </body>
        </html>
      `);
      previewWindow.document.close();
    }
  };

  const handleSave = async () => {
    if (!formData.title || !formData.content) {
      toast({
        title: "Errore",
        description: "Titolo e contenuto sono obbligatori",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const tags = tagsInput.split(',').map(tag => tag.trim()).filter(Boolean);
      const dataToSave = {
        ...formData,
        tags,
        author_id: user.id,
        published_at: formData.published ? new Date().toISOString() : null
      };

      let result;
      if (post?.id) {
        result = await supabase
          .from('blog_posts')
          .update(dataToSave)
          .eq('id', post.id)
          .select();
      } else {
        result = await supabase
          .from('blog_posts')
          .insert([dataToSave])
          .select();
      }

      if (result.error) throw result.error;

      // Processa il contenuto per il knowledge base
      await supabase.functions.invoke('process-content', {
        body: {
          content: formData.content,
          contentType: 'blog',
          sourceId: result.data[0].id,
          title: formData.title
        }
      });

      toast({
        title: "Successo",
        description: post?.id ? "Articolo aggiornato" : "Articolo creato",
      });

      onSave();
    } catch (error) {
      console.error('Error saving post:', error);
      toast({
        title: "Errore",
        description: "Errore nel salvare l'articolo",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={onCancel}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Indietro
              </Button>
              <h1 className="text-xl font-bold">
                {post?.id ? 'Modifica Articolo' : 'Nuovo Articolo'}
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" disabled={loading} onClick={handlePreview}>
                <Eye className="h-4 w-4 mr-2" />
                Anteprima
              </Button>
              <Button onClick={handleSave} disabled={loading}>
                <Save className="h-4 w-4 mr-2" />
                {loading ? 'Salvando...' : 'Salva'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Editor */}
      <div className="container mx-auto px-4 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Editor */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contenuto</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Titolo *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Inserisci il titolo dell'articolo"
                  />
                </div>

                <div>
                  <Label htmlFor="slug">Slug</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                    placeholder="url-friendly-slug"
                  />
                </div>

                <div>
                  <Label htmlFor="excerpt">Estratto</Label>
                  <Textarea
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                    placeholder="Breve descrizione dell'articolo"
                    rows={3}
                  />
                </div>

                <div>
                  <Label>Contenuto *</Label>
                  {keyLoading ? (
                    <div className="mt-2 p-4 border rounded-lg">
                      <p className="text-muted-foreground">Caricamento editor...</p>
                    </div>
                  ) : (
                    <>
                      {apiKey === 'no-api-key' && (
                        <div className="mt-2 space-y-4">
                          <Alert>
                            <AlertTriangle className="h-4 w-4" />
                            <AlertDescription>
                              Stai usando la chiave demo di TinyMCE. Inserisci la tua chiave API per rimuovere i limiti.
                              <Button
                                variant="link"
                                size="sm"
                                className="p-0 h-auto ml-1"
                                onClick={() => setShowKeyForm(!showKeyForm)}
                              >
                                {showKeyForm ? 'Annulla' : 'Inserisci chiave API'}
                              </Button>
                            </AlertDescription>
                          </Alert>

                          {showKeyForm && (
                            <div className="p-4 border rounded-lg space-y-3">
                              <Input
                                value={tempKey}
                                onChange={(e) => setTempKey(e.target.value)}
                                placeholder="Inserisci la tua chiave API TinyMCE"
                                type="password"
                              />
                              <Button onClick={handleSaveApiKey} size="sm">
                                Salva Chiave API
                              </Button>
                            </div>
                          )}
                        </div>
                      )}

                      <div className="mt-2">
                        <Editor
                          apiKey={apiKey}
                          onInit={(evt, editor) => editorRef.current = editor}
                          value={formData.content}
                          onEditorChange={(content) => setFormData(prev => ({ ...prev, content }))}
                          init={{
                            height: 500,
                            menubar: false,
                            plugins: [
                              'advlist autolink lists link image charmap print preview anchor',
                              'searchreplace visualblocks code fullscreen',
                              'insertdatetime media table paste code help wordcount'
                            ],
                            toolbar: 'undo redo | formatselect | ' +
                            'bold italic backcolor | alignleft aligncenter ' +
                            'alignright alignjustify | bullist numlist outdent indent | ' +
                            'removeformat | image link | code preview | help',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                            images_upload_handler: async (blobInfo) => {
                              return new Promise(async (resolve, reject) => {
                                try {
                                  const file = blobInfo.blob();
                                  const fileExt = file.type.split('/')[1];
                                  const fileName = `${Math.random()}.${fileExt}`;
                                  const filePath = `blog-images/${fileName}`;

                                  const { error: uploadError } = await supabase.storage
                                    .from('blog-images')
                                    .upload(filePath, file);

                                  if (uploadError) throw uploadError;

                                  const { data: { publicUrl } } = supabase.storage
                                    .from('blog-images')
                                    .getPublicUrl(filePath);

                                  resolve(publicUrl);
                                } catch (error) {
                                  reject(error);
                                }
                              });
                            }
                          }}
                        />
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Pubblicazione</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="published"
                    checked={formData.published}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, published: checked }))}
                  />
                  <Label htmlFor="published">Pubblica articolo</Label>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Metadati</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="category">Categoria</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    placeholder="es. AI, Tecnologia"
                  />
                </div>

                <div>
                  <Label htmlFor="tags">Tag (separati da virgola)</Label>
                  <Input
                    id="tags"
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                    placeholder="tag1, tag2, tag3"
                  />
                </div>

                <div>
                  <Label htmlFor="featured_image">URL Immagine in evidenza</Label>
                  <Input
                    id="featured_image"
                    value={formData.featured_image_url || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, featured_image_url: e.target.value }))}
                    placeholder="https://..."
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogEditor;