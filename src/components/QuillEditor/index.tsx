import { forwardRef, useImperativeHandle, useRef, useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import ImageResize from 'quill-image-resize-module-react';
import { AlignLeft, AlignRight, AlignCenter, Maximize } from 'lucide-react';
import './quill-custom.css';

// Register the image resize module
if (typeof window !== 'undefined') {
  const Quill = ReactQuill.Quill;
  Quill.register('modules/imageResize', ImageResize);
}

export interface QuillEditorRef {
  insertImage: (imageUrl: string, altText?: string) => void;
  getHTML: () => string;
}

interface QuillEditorProps {
  initialContent?: string;
  onChange: (html: string) => void;
  onImageUpload?: (file: File) => Promise<string>;
}

const QuillEditor = forwardRef<QuillEditorRef, QuillEditorProps>(
  ({ initialContent, onChange, onImageUpload }, ref) => {
    const quillRef = useRef<ReactQuill>(null);
    const [selectedImage, setSelectedImage] = useState<HTMLImageElement | null>(null);

    useImperativeHandle(ref, () => ({
      insertImage: (imageUrl: string, altText = 'Image') => {
        const quill = quillRef.current?.getEditor();
        if (quill) {
          const range = quill.getSelection();
          const position = range ? range.index : quill.getLength();
          quill.insertEmbed(position, 'image', imageUrl, 'user');
          quill.setSelection(position + 1, 0);
        }
      },
      getHTML: () => {
        return quillRef.current?.getEditor().root.innerHTML || '';
      },
    }));

    // Track selected image
    useEffect(() => {
      const editor = quillRef.current?.getEditor();
      if (!editor) return;

      const handleImageClick = (e: Event) => {
        const target = e.target as HTMLElement;
        if (target.tagName === 'IMG') {
          setSelectedImage(target as HTMLImageElement);
          console.log('Image selected:', target);
        } else {
          setSelectedImage(null);
        }
      };

      const editorElement = editor.root;
      editorElement.addEventListener('click', handleImageClick);
      
      // Also listen for text selection changes
      document.addEventListener('selectionchange', () => {
        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
          const range = selection.getRangeAt(0);
          const container = range.commonAncestorContainer;
          
          // Check if the selection is on an image
          if (container.nodeType === Node.ELEMENT_NODE) {
            const element = container as HTMLElement;
            if (element.tagName === 'IMG') {
              setSelectedImage(element as HTMLImageElement);
              console.log('Image selected via selection:', element);
            } else {
              const img = element.querySelector('img');
              if (img && element.contains(img)) {
                setSelectedImage(img);
                console.log('Image found in selection:', img);
              }
            }
          } else if (container.parentElement?.tagName === 'IMG') {
            setSelectedImage(container.parentElement as HTMLImageElement);
            console.log('Image parent selected:', container.parentElement);
          }
        }
      });

      return () => {
        editorElement.removeEventListener('click', handleImageClick);
      };
    }, []);

    const imageHandler = async () => {
      const input = document.createElement('input');
      input.setAttribute('type', 'file');
      input.setAttribute('accept', 'image/*');
      input.click();

      input.onchange = async () => {
        const file = input.files?.[0];
        if (file && onImageUpload) {
          try {
            const url = await onImageUpload(file);
            const quill = quillRef.current?.getEditor();
            if (quill) {
              const range = quill.getSelection();
              const position = range ? range.index : quill.getLength();
              quill.insertEmbed(position, 'image', url, 'user');
              quill.setSelection(position + 1, 0);
            }
          } catch (error) {
            console.error('Error uploading image:', error);
          }
        }
      };
    };

    const applyFormat = (format: string, value?: any) => {
      const quill = quillRef.current?.getEditor();
      if (!quill) return;

      if (format === 'link') {
        const currentFormat = quill.getFormat();
        const previousUrl = (currentFormat as any).link || '';
        const url = window.prompt("Inserisci l'URL", previousUrl);
        if (url === null) return;
        if (url === '') {
          quill.format('link', false);
        } else {
          quill.format('link', url);
        }
        return;
      }

      if (format === 'image') {
        void imageHandler();
        return;
      }

      if (format === 'clean') {
        quill.removeFormat(0, quill.getLength());
        return;
      }

      quill.format(format, value ?? true);
    };

    const alignImage = (alignment: 'left' | 'right' | 'center' | 'full') => {
      if (!selectedImage) return;

      // Reset only positioning styles, don't touch dimensions
      selectedImage.style.float = '';
      selectedImage.style.display = '';
      selectedImage.style.margin = '';

      switch (alignment) {
        case 'left':
          selectedImage.style.float = 'left';
          selectedImage.style.marginRight = '1rem';
          selectedImage.style.marginBottom = '1rem';
          break;
        case 'right':
          selectedImage.style.float = 'right';
          selectedImage.style.marginLeft = '1rem';
          selectedImage.style.marginBottom = '1rem';
          break;
        case 'center':
          selectedImage.style.display = 'block';
          selectedImage.style.margin = '1rem auto';
          break;
        case 'full':
          selectedImage.style.display = 'block';
          selectedImage.style.margin = '1rem 0';
          selectedImage.style.width = '100%';
          selectedImage.style.height = 'auto';
          break;
      }

      // Trigger onChange to save the changes
      const quill = quillRef.current?.getEditor();
      if (quill) {
        onChange(quill.root.innerHTML);
      }
      
      // Keep the image selected
      setTimeout(() => {
        setSelectedImage(selectedImage);
      }, 100);
    };

    const modules = {
      toolbar: false,
      clipboard: {
        matchVisual: false,
      },
      imageResize: {
        parchment: ReactQuill.Quill.import('parchment'),
        modules: ['Resize', 'DisplaySize'],
      },
    };
    const formats = [
      'header',
      'bold',
      'italic',
      'underline',
      'strike',
      'list',
      'bullet',
      'align',
      'blockquote',
      'code-block',
      'link',
      'image',
      'color',
      'background',
    ];

    return (
      <div className="quill-editor-wrapper">
        <div
          className="quill-custom-toolbar"
          aria-label="Strumenti di formattazione del contenuto"
        >
          <button type="button" onClick={() => applyFormat('header', 1)}>H1</button>
          <button type="button" onClick={() => applyFormat('header', 2)}>H2</button>
          <button type="button" onClick={() => applyFormat('header', 3)}>H3</button>
          <span className="quill-toolbar-separator" />
          <button type="button" onClick={() => applyFormat('bold')}><strong>B</strong></button>
          <button type="button" onClick={() => applyFormat('italic')}><em>I</em></button>
          <button type="button" onClick={() => applyFormat('underline')}><u>U</u></button>
          <button type="button" onClick={() => applyFormat('strike')}><s>S</s></button>
          <span className="quill-toolbar-separator" />
          <button type="button" onClick={() => applyFormat('list', 'ordered')}>1.</button>
          <button type="button" onClick={() => applyFormat('list', 'bullet')}>•</button>
          <span className="quill-toolbar-separator" />
          <button type="button" onClick={() => applyFormat('align', '')}>⯇</button>
          <button type="button" onClick={() => applyFormat('align', 'center')}>≡</button>
          <button type="button" onClick={() => applyFormat('align', 'right')}>⯈</button>
          <span className="quill-toolbar-separator" />
          <button type="button" onClick={() => applyFormat('blockquote')}>❝❞</button>
          <button type="button" onClick={() => applyFormat('code-block')}>{'</>'}</button>
          <span className="quill-toolbar-separator" />
          <button type="button" onClick={() => applyFormat('link')}>Link</button>
          <button type="button" onClick={() => applyFormat('image')}>Immagine</button>
          {selectedImage && (
            <>
              <span className="quill-toolbar-separator" />
              <span className="text-xs text-muted-foreground px-2 flex items-center gap-1">
                <span className="inline-block w-2 h-2 bg-primary rounded-full animate-pulse" />
                Immagine selezionata - Allinea:
              </span>
              <button 
                type="button" 
                onClick={() => alignImage('left')}
                title="Allinea a sinistra con testo a fianco"
                className="flex items-center gap-1"
              >
                <AlignLeft className="h-4 w-4" />
              </button>
              <button 
                type="button" 
                onClick={() => alignImage('center')}
                title="Centra"
                className="flex items-center gap-1"
              >
                <AlignCenter className="h-4 w-4" />
              </button>
              <button 
                type="button" 
                onClick={() => alignImage('right')}
                title="Allinea a destra con testo a fianco"
                className="flex items-center gap-1"
              >
                <AlignRight className="h-4 w-4" />
              </button>
              <button 
                type="button" 
                onClick={() => alignImage('full')}
                title="Larghezza piena"
                className="flex items-center gap-1"
              >
                <Maximize className="h-4 w-4" />
              </button>
            </>
          )}
          <span className="quill-toolbar-separator" />
          <button type="button" onClick={() => applyFormat('clean')}>Pulisci</button>
        </div>
        <ReactQuill
          ref={quillRef}
          theme="snow"
          value={initialContent}
          onChange={onChange}
          modules={modules}
          formats={formats}
          placeholder="Inizia a scrivere il tuo articolo..."
        />
      </div>
    );
  }
);

QuillEditor.displayName = 'QuillEditor';

export default QuillEditor;
