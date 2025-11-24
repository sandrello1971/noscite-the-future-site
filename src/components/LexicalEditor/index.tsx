import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { ListItemNode, ListNode } from '@lexical/list';
import { LinkNode, AutoLinkNode } from '@lexical/link';
import { CodeNode, CodeHighlightNode } from '@lexical/code';
import ToolbarPlugin from './ToolbarPlugin';
import ImagePlugin, { INSERT_IMAGE_COMMAND } from './ImagePlugin';
import { ImageNode } from './nodes/ImageNode';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { EditorState } from 'lexical';
import { $generateHtmlFromNodes, $generateNodesFromDOM } from '@lexical/html';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useEffect, forwardRef, useImperativeHandle } from 'react';
import { $getRoot, $insertNodes } from 'lexical';

export interface LexicalEditorRef {
  insertImage: (imageUrl: string, altText?: string) => void;
}

interface LexicalEditorProps {
  initialContent?: string;
  onChange: (html: string) => void;
}

function InitialContentPlugin({ html }: { html: string }) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!html) return;

    editor.update(() => {
      const parser = new DOMParser();
      const dom = parser.parseFromString(html, 'text/html');
      const nodes = $generateNodesFromDOM(editor, dom);
      const root = $getRoot();
      root.clear();
      root.select();
      $insertNodes(nodes);
    });
  }, [editor, html]);

  return null;
}

function EditorWithCommands({ onEditorReady }: { onEditorReady: (editor: any) => void }) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    onEditorReady(editor);
  }, [editor, onEditorReady]);

  return null;
}

const LexicalEditor = forwardRef<LexicalEditorRef, LexicalEditorProps>(({ initialContent, onChange }, ref) => {
  let editorInstance: any = null;

  useImperativeHandle(ref, () => ({
    insertImage: (imageUrl: string, altText = 'Generated image') => {
      if (editorInstance) {
        editorInstance.dispatchCommand(INSERT_IMAGE_COMMAND, {
          src: imageUrl,
          altText: altText,
        });
      }
    },
  }));

  const handleEditorReady = (editor: any) => {
    editorInstance = editor;
  };
  const initialConfig = {
    namespace: 'BlogEditor',
    theme: {
      paragraph: 'mb-2',
      heading: {
        h1: 'text-4xl font-bold mb-4 mt-6',
        h2: 'text-3xl font-bold mb-3 mt-5',
        h3: 'text-2xl font-bold mb-2 mt-4',
      },
      list: {
        ol: 'list-decimal ml-6 mb-2',
        ul: 'list-disc ml-6 mb-2',
      },
      quote: 'border-l-4 border-primary pl-4 italic my-4',
      link: 'text-primary underline hover:text-primary/80',
      image: 'my-4',
      text: {
        bold: 'font-bold',
        italic: 'italic',
        underline: 'underline',
        strikethrough: 'line-through',
        code: 'bg-muted px-1 py-0.5 rounded font-mono text-sm',
      },
    },
    onError: (error: Error) => {
      console.error(error);
    },
    nodes: [
      HeadingNode,
      ListNode,
      ListItemNode,
      QuoteNode,
      CodeNode,
      CodeHighlightNode,
      LinkNode,
      AutoLinkNode,
      ImageNode,
    ],
  };

  const handleChange = (editorState: EditorState, editor: any) => {
    editorState.read(() => {
      const html = $generateHtmlFromNodes(editor);
      onChange(html);
    });
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="relative border rounded-lg bg-background">
        <ToolbarPlugin />
        <div className="relative">
          <RichTextPlugin
            contentEditable={
              <ContentEditable className="min-h-[400px] outline-none p-4 prose prose-sm max-w-none focus:ring-0" />
            }
            placeholder={
              <div className="absolute top-4 left-4 text-muted-foreground pointer-events-none">
                Inizia a scrivere il tuo articolo...
              </div>
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
        </div>
        <HistoryPlugin />
        <AutoFocusPlugin />
        <ImagePlugin />
        <OnChangePlugin onChange={handleChange} />
        {initialContent && <InitialContentPlugin html={initialContent} />}
        <EditorWithCommands onEditorReady={handleEditorReady} />
      </div>
    </LexicalComposer>
  );
});

LexicalEditor.displayName = 'LexicalEditor';

export default LexicalEditor;
