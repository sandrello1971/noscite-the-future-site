import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Save, Eye, Upload, Sparkles, Image as ImageIcon, FileImage } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { CommentariumPost } from '@/types/database';
import DOMPurify from 'dompurify';
import LexicalEditor, { LexicalEditorRef } from '@/components/LexicalEditor';

interface CommentariumEditorProps {
  post?: CommentariumPost | null;
  onSave: () => void;
  onCancel: () => void;
}

const CommentariumEditor = ({ post, onSave, onCancel }: CommentariumEditorProps) => {
  const { toast } = useToast();
  const editorRef = useRef<LexicalEditorRef>(null);
  const [formData, setFormData] = useState<CommentariumPost>({
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
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string>('');

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

  const generateImage = async () => {
    if (!imagePrompt.trim()) {
      toast({
        title: "Prompt mancante",
        description: "Scrivi prima una descrizione dell'immagine",
        variant: "destructive",
      });
      return;
    }

    setAiLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-blog-image', {
        body: { prompt: imagePrompt.trim() }
      });

      if (error) throw error;

      const imageUrl = data?.imageUrl;
      if (imageUrl) {
        setGeneratedImageUrl(imageUrl);
        setFormData(prev => ({ ...prev, featured_image_url: imageUrl }));
        
        // Inserisci automaticamente l'immagine nell'editor
        if (editorRef.current) {
          editorRef.current.insertImage(imageUrl, imagePrompt.trim() || 'Immagine generata');
        }
        
        toast({
          title: "Immagine generata e inserita",
          description: "Ora puoi ridimensionarla e spostarla nell'editor",
        });
      }
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

  const handleInsertGeneratedImage = () => {
    if (!generatedImageUrl) {
      toast({
        title: "Nessuna immagine",
        description: "Genera prima un'immagine",
        variant: "destructive",
      });
      return;
    }

    if (editorRef.current) {
      editorRef.current.insertImage(generatedImageUrl);
      toast({
        title: "Immagine inserita",
        description: "L'immagine è stata aggiunta al contenuto",
      });
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({
        title: "Errore",
        description: "Scegli un file immagine valido",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `commentarium/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('blog-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('blog-images').getPublicUrl(filePath);

      setFormData(prev => ({ ...prev, featured_image_url: data.publicUrl }));
      setGeneratedImageUrl(data.publicUrl);

      toast({
        title: "Caricamento completato",
        description: "Immagine caricata con successo",
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: "Errore",
        description: "Impossibile caricare l'immagine",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleContentChange = (newContent: string) => {
    const sanitized = DOMPurify.sanitize(newContent, {
      ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'ul', 'ol', 'li', 'a', 'img', 'blockquote', 'code', 'pre'],
      ALLOWED_ATTR: ['href', 'src', 'alt', 'class', 'style', 'width', 'height']
    });
    setFormData(prev => ({ ...prev, content: sanitized }));
  };

  const handleSubmit = async () => {
    if (!formData.title.trim()) {
      toast({
        title: "Errore",
        description: "Il titolo è obbligatorio",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const tags = tagsInput
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag);

      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('Utente non autenticato');
      }

      const postData = {
        ...formData,
        tags,
        author_id: user.id, // CRITICAL: Set author_id for RLS
        published_at: formData.published ? new Date().toISOString() : null,
        updated_at: new Date().toISOString(),
      };

      let error;
      if (post?.id) {
        const { error: updateError } = await supabase
          .from('blog_posts')
          .update(postData)
          .eq('id', post.id);
        error = updateError;
      } else {
        const { error: insertError } = await supabase
          .from('blog_posts')
          .insert([{
            ...postData,
            created_at: new Date().toISOString(),
          }]);
        error = insertError;
      }

      if (error) throw error;

      // Sync knowledge base with Commentarium content
      try {
        await supabase.functions.invoke('sync-knowledge-base', {
          body: {
            contentType: 'commentarium',
          }
        });
      } catch (syncError) {
        console.error('Error syncing knowledge base:', syncError);
      }

      toast({
        title: "Successo",
        description: post?.id ? "Articolo aggiornato" : "Articolo creato",
      });

      onSave();
    } catch (error) {
      console.error('Error saving post:', error);
      toast({
        title: "Errore",
        description: "Impossibile salvare l'articolo",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onCancel}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Indietro
        </Button>
        <div className="flex gap-2">
          <Button onClick={handleSubmit} disabled={loading}>
            <Save className="mr-2 h-4 w-4" />
            {loading ? 'Salvataggio...' : 'Salva'}
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Generazione Articolo con AI</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="topicPrompt">Argomento dell'articolo</Label>
            <Textarea
              id="topicPrompt"
              placeholder="Es: L'importanza della trasformazione digitale nelle PMI italiane"
              value={topicPrompt}
              onChange={(e) => setTopicPrompt(e.target.value)}
              rows={3}
            />
          </div>
          <Button 
            onClick={generateCompleteArticle} 
            disabled={articleAiLoading}
            className="w-full"
          >
            <Sparkles className="mr-2 h-4 w-4" />
            {articleAiLoading ? 'Generazione in corso...' : 'Genera Articolo Completo'}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Generazione Immagine con AI</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="imagePrompt">Descrizione immagine</Label>
            <Textarea
              id="imagePrompt"
              placeholder="Es: Un'immagine professionale che rappresenta la trasformazione digitale in un ufficio moderno"
              value={imagePrompt}
              onChange={(e) => setImagePrompt(e.target.value)}
              rows={2}
            />
          </div>
          <div className="flex gap-2">
            <Button 
              onClick={generateImage} 
              disabled={aiLoading}
              className="flex-1"
            >
              <Sparkles className="mr-2 h-4 w-4" />
              {aiLoading ? 'Generazione...' : 'Genera Immagine'}
            </Button>
            {generatedImageUrl && (
              <Button
                onClick={handleInsertGeneratedImage}
                variant="outline"
                className="flex-1"
              >
                <FileImage className="mr-2 h-4 w-4" />
                Inserisci nell'articolo
              </Button>
            )}
          </div>
          {generatedImageUrl && (
            <div className="mt-4">
              <img 
                src={generatedImageUrl} 
                alt="Immagine generata" 
                className="w-full max-h-64 object-cover rounded-lg"
              />
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="title">Titolo *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            placeholder="Inserisci il titolo dell'articolo"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="slug">Slug</Label>
          <Input
            id="slug"
            value={formData.slug}
            onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
            placeholder="url-friendly-slug"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="excerpt">Estratto</Label>
        <Textarea
          id="excerpt"
          value={formData.excerpt}
          onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
          placeholder="Breve descrizione dell'articolo"
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Contenuto</Label>
        <LexicalEditor
          ref={editorRef}
          initialContent={formData.content}
          onChange={handleContentChange}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="category">Categoria</Label>
          <Input
            id="category"
            value={formData.category}
            onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
            placeholder="Es: Tecnologia, Business, Marketing"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="tags">Tags (separati da virgola)</Label>
          <Input
            id="tags"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            placeholder="tag1, tag2, tag3"
          />
        </div>
      </div>

      <div className="space-y-4">
        <Label>Immagine in primo piano</Label>
        <div className="flex gap-2">
          <Input
            value={formData.featured_image_url}
            onChange={(e) => setFormData(prev => ({ ...prev, featured_image_url: e.target.value }))}
            placeholder="URL dell'immagine"
            className="flex-1"
          />
          <label htmlFor="file-upload">
            <Button type="button" variant="outline" asChild>
              <span>
                <Upload className="mr-2 h-4 w-4" />
                Carica
              </span>
            </Button>
          </label>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileUpload}
          />
        </div>
        {formData.featured_image_url && (
          <img 
            src={formData.featured_image_url} 
            alt="Preview" 
            className="w-full max-h-64 object-cover rounded-lg"
          />
        )}
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="published"
          checked={formData.published}
          onCheckedChange={(checked) => setFormData(prev => ({ ...prev, published: checked }))}
        />
        <Label htmlFor="published">Pubblicato</Label>
      </div>
    </div>
  );
};

export default CommentariumEditor;
