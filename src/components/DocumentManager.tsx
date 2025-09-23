import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, FileText, Download, Trash2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

interface DocumentManagerProps {
  onDocumentChange: () => void;
}

const DocumentManager = ({ onDocumentChange }: DocumentManagerProps) => {
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    tags: ''
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // Auto-fill title from filename
      if (!formData.title) {
        const nameWithoutExtension = file.name.replace(/\.[^/.]+$/, "");
        setFormData(prev => ({ ...prev, title: nameWithoutExtension }));
      }
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !formData.title) {
      toast({
        title: "Errore",
        description: "Seleziona un file e inserisci il titolo",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      // Upload file to storage
      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random()}.${fileExt}`;
      const filePath = `${user.id}/${fileName}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('documents')
        .upload(filePath, selectedFile);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('documents')
        .getPublicUrl(filePath);

      // Save document metadata
      const tags = formData.tags.split(',').map(tag => tag.trim()).filter(Boolean);
      
      const { data, error } = await supabase
        .from('documents')
        .insert([{
          title: formData.title,
          description: formData.description,
          file_name: selectedFile.name,
          file_url: publicUrl,        
          file_type: selectedFile.type || 'application/octet-stream',
          file_size: selectedFile.size,
          mime_type: selectedFile.type || 'application/octet-stream',
          uploaded_by: user.id,
        }])
        .select();

      if (error) throw error;

      // Process content for knowledge base if it's a text document
      if (selectedFile.type.includes('text') || selectedFile.type.includes('pdf')) {
        await supabase.functions.invoke('process-content', {
          body: {
            content: formData.description,
            contentType: 'document',
            sourceId: data[0].id,
            title: formData.title
          }
        });
      }

      toast({
        title: "Successo",
        description: "Documento caricato con successo",
      });

      // Reset form
      setFormData({ title: '', description: '', category: '', tags: '' });
      setSelectedFile(null);
      onDocumentChange();

    } catch (error) {
      console.error('Error uploading document:', error);
      toast({
        title: "Errore",
        description: "Errore nel caricamento del documento",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Gestione Documenti</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Upload className="h-5 w-5" />
            <span>Carica Nuovo Documento</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="file">File *</Label>
            <div className="mt-2">
              <input
                id="file"
                type="file"
                onChange={handleFileSelect}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                accept=".pdf,.doc,.docx,.txt,.md"
              />
            </div>
            {selectedFile && (
              <p className="text-sm text-muted-foreground mt-1">
                File selezionato: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="doc-title">Titolo *</Label>
            <Input
              id="doc-title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Titolo del documento"
            />
          </div>

          <div>
            <Label htmlFor="doc-description">Descrizione</Label>
            <Textarea
              id="doc-description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Descrizione del contenuto del documento"
              rows={3}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="doc-category">Categoria</Label>
              <Input
                id="doc-category"
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                placeholder="es. Guide, Whitepaper"
              />
            </div>

            <div>
              <Label htmlFor="doc-tags">Tag (separati da virgola)</Label>
              <Input
                id="doc-tags"
                value={formData.tags}
                onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                placeholder="tag1, tag2, tag3"
              />
            </div>
          </div>

          <Button 
            onClick={handleUpload} 
            disabled={uploading || !selectedFile || !formData.title}
            className="w-full"
          >
            <Upload className="h-4 w-4 mr-2" />
            {uploading ? 'Caricamento...' : 'Carica Documento'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentManager;