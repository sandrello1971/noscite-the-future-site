import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { Document } from '@/types/database';
import { 
  Download, 
  Trash2, 
  Eye, 
  Calendar,
  FileText
} from 'lucide-react';

interface DocumentsListProps {
  documents: Document[];
  onDocumentChange: () => void;
  showActions?: boolean;
}

const DocumentsList = ({ documents, onDocumentChange, showActions = true }: DocumentsListProps) => {
  const { toast } = useToast();

  const handleDeleteDocument = async (document: Document) => {
    if (!confirm(`Sei sicuro di voler eliminare "${document.title}"?`)) return;

    try {
      // Elimina il file dal storage
      if (document.file_url) {
        const filePath = document.file_url.split('/').pop();
        if (filePath) {
          await supabase.storage
            .from('documents')
            .remove([filePath]);
        }
      }

      // Elimina il record dal database
      const { error } = await supabase
        .from('documents')
        .delete()
        .eq('id', document.id);

      if (error) throw error;

      toast({
        title: "Documento eliminato",
        description: "Il documento è stato eliminato con successo",
      });

      onDocumentChange();
    } catch (error) {
      console.error('Error deleting document:', error);
      toast({
        title: "Errore",
        description: "Impossibile eliminare il documento",
        variant: "destructive",
      });
    }
  };

  const handleTogglePublish = async (document: Document) => {
    // Per ora non implementiamo la funzionalità di pubblicazione per i documenti
    toast({
      title: "Funzionalità non disponibile",
      description: "La pubblicazione dei documenti verrà implementata in futuro",
      variant: "destructive",
    });
  };

  if (documents.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">Nessun documento</h3>
          <p className="text-muted-foreground">
            Non ci sono ancora documenti caricati.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-6">
      {documents.map((document) => (
        <Card key={document.id}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <CardTitle className="text-lg">{document.title}</CardTitle>
                {document.description && (
                  <p className="text-muted-foreground">{document.description}</p>
                )}
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(document.created_at || '').toLocaleDateString()}</span>
                  </div>
                  {document.category && (
                    <Badge variant="outline">{document.category}</Badge>
                  )}
                  {document.tags && document.tags.length > 0 && (
                    <div className="flex items-center space-x-1">
                      {document.tags.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {document.tags.length > 3 && (
                        <span className="text-xs text-muted-foreground">
                          +{document.tags.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                >
                  <a href={document.file_url} target="_blank" rel="noopener noreferrer">
                    <Download className="h-4 w-4" />
                  </a>
                </Button>
                {showActions && (
                  <>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleTogglePublish(document)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteDocument(document)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </>
                )}
              </div>
            </div>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
};

export default DocumentsList;