import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Save, Eye, Upload, Sparkles, Image } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { BlogPost } from '@/types/database';
import DOMPurify from 'dompurify';
import LexicalEditor from '@/components/LexicalEditor';

interface BlogEditorProps {
  post?: BlogPost | null;
  onSave: () => void;
  onCancel: () => void;
}

const BlogEditor = ({ post, onSave, onCancel }: BlogEditorProps) => {
  const { toast } = useToast();
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
  const [aiLoading, setAiLoading] = useState(false);
  const [imagePrompt, setImagePrompt] = useState('');
  const [showImagePrompt, setShowImagePrompt] = useState(false);
  const [topicPrompt, setTopicPrompt] = useState('');
  const [articleAiLoading, setArticleAiLoading] = useState(false);

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

  const generateCompleteArticle = async () => {
    if (!topicPrompt.trim()) {
      toast({
        title: "Argomento mancante",
        description: "Scrivi prima l'argomento dell'articolo che vuoi generare",
        variant: "destructive",
      });
      return;
    }

    setArticleAiLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-blog-content', {
        body: { prompt: topicPrompt.trim(), type: 'complete' }
      });

      if (error) throw error;
      if (!data) {
        throw new Error('Risposta vuota dalla funzione generate-blog-content');
      }

      const { title, excerpt, content } = data as { title?: string; excerpt?: string; content?: string };

      setFormData(prev => ({
        ...prev,
        title: title?.trim() || prev.title,
        excerpt: excerpt?.trim() || prev.excerpt,
        content: content?.trim() || prev.content,
      }));

      toast({
        title: "Articolo generato",
        description: "Titolo, estratto e contenuto sono stati compilati dall'AI",
      });
    } catch (error) {
      console.error('Error generating complete article:', error);
      toast({
        title: "Errore",
        description: "Impossibile generare l'articolo con l'AI",
        variant: "destructive",
      });
    } finally {
      setArticleAiLoading(false);
    }
  };

  const generateAIImage = async () => {
    if (!imagePrompt) {
      toast({
        title: "Prompt mancante",
        description: "Inserisci una descrizione per l'immagine",
        variant: "destructive",
      });
      return;
    }

    setAiLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-blog-image', {
        body: { prompt: imagePrompt }
      });

      if (error) throw error;

      setFormData(prev => ({ ...prev, featured_image_url: data.imageUrl }));
      setShowImagePrompt(false);
      setImagePrompt('');
      toast({
        title: "Immagine generata",
        description: "L'immagine è stata generata con successo",
      });
    } catch (error) {
      console.error('Error generating image:', error);
      toast({
        title: "Errore",
        description: "Impossibile generare l'immagine",
        variant: "destructive",
      });
    } finally {
      setAiLoading(false);
    }
  };

  const escapeHtml = (unsafe: string): string => {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
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

    // Sanitize all user input to prevent XSS
    const sanitizedTitle = escapeHtml(formData.title || 'Titolo non definito');
    const sanitizedCategory = formData.category ? escapeHtml(formData.category) : '';
    const sanitizedExcerpt = formData.excerpt ? escapeHtml(formData.excerpt) : '';
    
    // For content, use DOMPurify for more sophisticated sanitization
    const sanitizedContent = DOMPurify.sanitize(formData.content, {
      ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'blockquote', 'img', 'a'],
      ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'target', 'rel'],
      ALLOW_DATA_ATTR: false
    });

    // Apri una nuova finestra con l'anteprima sicura
    const previewWindow = window.open('', '_blank');
    if (previewWindow) {
      const htmlContent = `<!DOCTYPE html>
        <html>
        <head>
          <title>${sanitizedTitle}</title>
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
          <h1>${sanitizedTitle}</h1>
          <div class="meta">
            ${sanitizedCategory ? `Categoria: ${sanitizedCategory} | ` : ''}
            ${sanitizedExcerpt ? `Estratto: ${sanitizedExcerpt}` : ''}
          </div>
          <div class="content">${sanitizedContent}</div>
        </body>
        </html>`;
      
      previewWindow.document.write(htmlContent);
      previewWindow.document.close();
    }
  };

  const validateAndSanitizeInput = (input: string, maxLength: number = 1000): string => {
    if (!input) return '';
    
    // Remove potentially dangerous content
    const sanitized = DOMPurify.sanitize(input.trim(), {
      ALLOWED_TAGS: input === formData.content ? 
        ['p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'blockquote', 'img', 'a', 'table', 'tr', 'td', 'th', 'tbody', 'thead'] : 
        [],
      ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'target', 'rel'],
      ALLOW_DATA_ATTR: false
    });
    
    return sanitized.length > maxLength ? sanitized.substring(0, maxLength) : sanitized;
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

    // Validate title length
    if (formData.title.length > 200) {
      toast({
        title: "Errore",
        description: "Il titolo non può superare i 200 caratteri",
        variant: "destructive",
      });
      return;
    }

    // Validate and sanitize all inputs
    const sanitizedTitle = validateAndSanitizeInput(formData.title, 200);
    const sanitizedSlug = validateAndSanitizeInput(formData.slug, 100);
    const sanitizedExcerpt = validateAndSanitizeInput(formData.excerpt, 500);
    const sanitizedCategory = validateAndSanitizeInput(formData.category, 50);
    const sanitizedContent = validateAndSanitizeInput(formData.content, 50000);
    const sanitizedImageUrl = formData.featured_image_url ? 
      DOMPurify.sanitize(formData.featured_image_url, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] }) : '';

    // Validate URL if provided
    if (sanitizedImageUrl) {
      try {
        new URL(sanitizedImageUrl);
      } catch {
        toast({
          title: "Errore",
          description: "L'URL dell'immagine in evidenza non è valido",
          variant: "destructive",
        });
        return;
      }
    }

    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const tags = tagsInput.split(',')
        .map(tag => validateAndSanitizeInput(tag, 30))
        .filter(Boolean)
        .slice(0, 10); // Limit to 10 tags

      const dataToSave = {
        title: sanitizedTitle,
        slug: sanitizedSlug || sanitizedTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        excerpt: sanitizedExcerpt,
        category: sanitizedCategory,
        content: sanitizedContent,
        featured_image_url: sanitizedImageUrl || null,
        tags,
        author_id: user.id,
        published: formData.published,
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
                <div className="rounded-lg border border-dashed border-muted-foreground/40 bg-muted/30 p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="topic">Argomento per l'articolo (AI)</Label>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={generateCompleteArticle}
                      disabled={articleAiLoading}
                    >
                      <Sparkles className="h-4 w-4 mr-2" />
                      {articleAiLoading ? 'Generando...' : 'Genera articolo completo'}
                    </Button>
                  </div>
                  <Textarea
                    id="topic"
                    value={topicPrompt}
                    onChange={(e) => setTopicPrompt(e.target.value)}
                    placeholder="Scrivi qui l'argomento o alcune indicazioni per l'articolo..."
                    rows={3}
                  />
                  <p className="text-xs text-muted-foreground">
                    L'AI genererà titolo, estratto, contenuto e aggiornerà automaticamente lo slug.
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label htmlFor="title">Titolo *</Label>
                  </div>
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
                  <div className="flex items-center justify-between mb-2">
                    <Label htmlFor="excerpt">Estratto</Label>
                  </div>
                  <Textarea
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                    placeholder="Breve descrizione dell'articolo"
                    rows={3}
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label>Contenuto *</Label>
                  </div>
                  <div className="mt-2">
                    <LexicalEditor
                      initialContent={formData.content}
                      onChange={(html) => setFormData(prev => ({ ...prev, content: html }))}
                    />
                  </div>
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
                  <div className="flex items-center justify-between mb-2">
                    <Label htmlFor="featured_image">URL Immagine in evidenza</Label>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowImagePrompt(!showImagePrompt)}
                    >
                      <Image className="h-4 w-4 mr-2" />
                      Genera con AI
                    </Button>
                  </div>
                  {showImagePrompt && (
                    <div className="space-y-2 mb-2">
                      <Input
                        value={imagePrompt}
                        onChange={(e) => setImagePrompt(e.target.value)}
                        placeholder="Descrivi l'immagine da generare..."
                      />
                      <Button
                        type="button"
                        onClick={generateAIImage}
                        disabled={aiLoading}
                        size="sm"
                        className="w-full"
                      >
                        {aiLoading ? 'Generando...' : 'Genera Immagine'}
                      </Button>
                    </div>
                  )}
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