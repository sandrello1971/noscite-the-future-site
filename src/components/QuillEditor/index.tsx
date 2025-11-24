import { forwardRef, useImperativeHandle, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './quill-custom.css';

console.log('QuillEditor component loaded');

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

    const modules = {
      toolbar: {
        container: [
          [{ header: [1, 2, 3, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ align: [] }],
          ['blockquote', 'code-block'],
          ['link', 'image'],
          [{ color: [] }, { background: [] }],
          ['clean'],
        ],
        handlers: {
          image: imageHandler,
        },
      },
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

    console.log('QuillEditor rendering with content:', initialContent?.substring(0, 50));
    
    return (
      <div className="quill-editor-wrapper" style={{ minHeight: '500px', border: '1px solid red' }}>
        <ReactQuill
          ref={quillRef}
          theme="snow"
          defaultValue={initialContent}
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
