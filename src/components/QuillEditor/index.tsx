import { forwardRef, useImperativeHandle, useRef } from 'react';
import ReactQuill from 'react-quill';
import './quill-custom.css';

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

    const modules = {
      toolbar: false,
      clipboard: {
        matchVisual: false,
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
