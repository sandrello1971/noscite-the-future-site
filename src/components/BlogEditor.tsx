import { useState, useRef, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Save, Eye, Upload } from 'lucide-react';
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
  const quillRef = useRef<ReactQuill>(null);
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

  const handleImageUpload = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;

      try {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `blog-images/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('blog-images')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('blog-images')
          .getPublicUrl(filePath);

        const quill = quillRef.current?.getEditor();
        if (quill) {
          const range = quill.getSelection();
          quill.insertEmbed(range?.index || 0, 'image', publicUrl);
        }

        toast({
          title: "Successo",
          description: "Immagine caricata correttamente",
        });
      } catch (error) {
        console.error('Error uploading image:', error);
        toast({
          title: "Errore",
          description: "Errore nel caricamento dell'immagine",
          variant: "destructive",
        });
      }
    };
  };

  const modules = {
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'script': 'sub'}, { 'script': 'super' }],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'indent': '-1'}, { 'indent': '+1' }],
        [{ 'direction': 'rtl' }],
        [{ 'align': [] }],
        ['blockquote', 'code-block'],
        ['link', 'image', 'video'],
        ['clean']
      ],
      handlers: {
        image: handleImageUpload
      }
    },
    clipboard: {
      matchVisual: false,
    }
  };

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video',
    'color', 'background',
    'align', 'direction',
    'code-block', 'script'
  ];

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
              <Button variant="outline" disabled={loading}>
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
                  <div className="mt-2 bg-white rounded-lg">
                    <ReactQuill
                      ref={quillRef}
                      theme="snow"
                      value={formData.content}
                      onChange={(content) => setFormData(prev => ({ ...prev, content }))}
                      modules={modules}
                      formats={formats}
                      style={{
                        height: '400px',
                        marginBottom: '50px'
                      }}
                      placeholder="Inizia a scrivere il tuo articolo..."
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