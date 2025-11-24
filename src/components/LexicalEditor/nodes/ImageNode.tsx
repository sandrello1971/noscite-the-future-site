import type {
  DOMConversionMap,
  DOMConversionOutput,
  DOMExportOutput,
  EditorConfig,
  LexicalEditor,
  LexicalNode,
  NodeKey,
  SerializedLexicalNode,
  Spread,
} from 'lexical';

import { $applyNodeReplacement, DecoratorNode } from 'lexical';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

export interface ImagePayload {
  altText: string;
  src: string;
  key?: NodeKey;
  width?: number;
  height?: number;
  maxWidth?: number;
}

export type SerializedImageNode = Spread<
  {
    altText: string;
    src: string;
    width?: number;
    height?: number;
    maxWidth?: number;
  },
  SerializedLexicalNode
>;

function convertImageElement(domNode: Node): null | DOMConversionOutput {
  if (domNode instanceof HTMLImageElement) {
    const { alt: altText, src, width, height } = domNode;
    const node = $createImageNode({ altText, src, width, height });
    return { node };
  }
  return null;
}

export class ImageNode extends DecoratorNode<JSX.Element> {
  __src: string;
  __altText: string;
  __width?: number;
  __height?: number;
  __maxWidth: number;

  static getType(): string {
    return 'image';
  }

  static clone(node: ImageNode): ImageNode {
    return new ImageNode(
      node.__src,
      node.__altText,
      node.__width,
      node.__height,
      node.__maxWidth,
      node.__key
    );
  }

  static importJSON(serializedNode: SerializedImageNode): ImageNode {
    const { altText, src, width, height, maxWidth } = serializedNode;
    const node = $createImageNode({
      altText,
      src,
      width,
      height,
      maxWidth,
    });
    return node;
  }

  exportDOM(): DOMExportOutput {
    const element = document.createElement('img');
    element.setAttribute('src', this.__src);
    element.setAttribute('alt', this.__altText);
    if (this.__width) element.setAttribute('width', String(this.__width));
    if (this.__height) element.setAttribute('height', String(this.__height));
    return { element };
  }

  static importDOM(): DOMConversionMap | null {
    return {
      img: (node: Node) => ({
        conversion: convertImageElement,
        priority: 0,
      }),
    };
  }

  constructor(
    src: string,
    altText: string,
    width?: number,
    height?: number,
    maxWidth: number = 800,
    key?: NodeKey
  ) {
    super(key);
    this.__src = src;
    this.__altText = altText;
    this.__width = width;
    this.__height = height;
    this.__maxWidth = maxWidth;
  }

  exportJSON(): SerializedImageNode {
    return {
      altText: this.getAltText(),
      src: this.getSrc(),
      width: this.__width,
      height: this.__height,
      maxWidth: this.__maxWidth,
      type: 'image',
      version: 1,
    };
  }

  setWidthAndHeight(width: number, height: number): void {
    const writable = this.getWritable();
    writable.__width = width;
    writable.__height = height;
  }

  createDOM(config: EditorConfig): HTMLElement {
    const span = document.createElement('span');
    const className = config.theme.image;
    if (className !== undefined) {
      span.className = className;
    }
    span.style.display = 'inline-block';
    return span;
  }

  updateDOM(): false {
    return false;
  }

  getSrc(): string {
    return this.__src;
  }

  getAltText(): string {
    return this.__altText;
  }

  decorate(): JSX.Element {
    return (
      <ImageComponent
        src={this.__src}
        altText={this.__altText}
        width={this.__width}
        height={this.__height}
        maxWidth={this.__maxWidth}
        nodeKey={this.getKey()}
      />
    );
  }
}

export function $createImageNode({
  altText,
  src,
  width,
  height,
  maxWidth = 800,
  key,
}: ImagePayload): ImageNode {
  return $applyNodeReplacement(new ImageNode(src, altText, width, height, maxWidth, key));
}

export function $isImageNode(
  node: LexicalNode | null | undefined
): node is ImageNode {
  return node instanceof ImageNode;
}

// Component with resize functionality
interface ImageComponentProps {
  src: string;
  altText: string;
  width?: number;
  height?: number;
  maxWidth: number;
  nodeKey: NodeKey;
}

function ImageComponent({
  src,
  altText,
  width,
  height,
  maxWidth,
  nodeKey,
}: ImageComponentProps): JSX.Element {
  const imageRef = useRef<HTMLImageElement>(null);
  const [editor] = useLexicalComposerContext();
  const [isResizing, setIsResizing] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [currentWidth, setCurrentWidth] = useState<number | undefined>(width);
  const [currentHeight, setCurrentHeight] = useState<number | undefined>(height);
  const resizeStartRef = useRef<{ x: number; y: number; width: number; height: number } | null>(null);

  useEffect(() => {
    const image = imageRef.current;
    if (image && !width && !height) {
      // Set initial dimensions from natural image size
      const updateDimensions = () => {
        setCurrentWidth(Math.min(image.naturalWidth, maxWidth));
        setCurrentHeight(Math.min(image.naturalHeight, maxWidth * (image.naturalHeight / image.naturalWidth)));
      };
      
      if (image.complete) {
        updateDimensions();
      } else {
        image.addEventListener('load', updateDimensions);
        return () => image.removeEventListener('load', updateDimensions);
      }
    }
  }, [width, height, maxWidth]);

  const onResizeStart = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!imageRef.current) return;
    
    setIsResizing(true);
    resizeStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      width: currentWidth || imageRef.current.width,
      height: currentHeight || imageRef.current.height,
    };

    const onMouseMove = (moveEvent: MouseEvent) => {
      if (!resizeStartRef.current) return;
      
      const deltaX = moveEvent.clientX - resizeStartRef.current.x;
      const aspectRatio = resizeStartRef.current.height / resizeStartRef.current.width;
      
      const newWidth = Math.max(100, Math.min(maxWidth, resizeStartRef.current.width + deltaX));
      const newHeight = newWidth * aspectRatio;
      
      setCurrentWidth(newWidth);
      setCurrentHeight(newHeight);
    };

    const onMouseUp = () => {
      setIsResizing(false);
      
      if (resizeStartRef.current && currentWidth && currentHeight) {
        editor.update(() => {
          const node = editor.getEditorState()._nodeMap.get(nodeKey);
          if ($isImageNode(node)) {
            node.setWidthAndHeight(currentWidth, currentHeight);
          }
        });
      }
      
      resizeStartRef.current = null;
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }, [currentWidth, currentHeight, editor, maxWidth, nodeKey]);

  return (
    <div
      style={{
        position: 'relative',
        display: 'inline-block',
        margin: '1rem 0',
        cursor: 'default',
      }}
      onMouseEnter={() => setIsSelected(true)}
      onMouseLeave={() => !isResizing && setIsSelected(false)}
    >
      <img
        ref={imageRef}
        src={src}
        alt={altText}
        style={{
          display: 'block',
          maxWidth: `${maxWidth}px`,
          width: currentWidth ? `${currentWidth}px` : 'auto',
          height: currentHeight ? `${currentHeight}px` : 'auto',
          objectFit: 'contain',
          border: isSelected ? '2px solid hsl(var(--primary))' : '1px solid hsl(var(--border))',
          borderRadius: '8px',
          transition: isResizing ? 'none' : 'border-color 0.2s',
        }}
        draggable={false}
      />
      {isSelected && (
        <>
          {/* Resize handle - bottom right */}
          <div
            onMouseDown={onResizeStart}
            style={{
              position: 'absolute',
              right: '-6px',
              bottom: '-6px',
              width: '16px',
              height: '16px',
              background: 'hsl(var(--primary))',
              border: '2px solid white',
              borderRadius: '50%',
              cursor: 'nwse-resize',
              zIndex: 10,
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
            }}
          />
          {/* Resize handle - bottom left */}
          <div
            onMouseDown={(e) => {
              // Mirror the resize behavior for left handle
              e.preventDefault();
              e.stopPropagation();
              // TODO: Implement left-side resize if needed
            }}
            style={{
              position: 'absolute',
              left: '-6px',
              bottom: '-6px',
              width: '16px',
              height: '16px',
              background: 'hsl(var(--primary))',
              border: '2px solid white',
              borderRadius: '50%',
              cursor: 'nesw-resize',
              zIndex: 10,
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
            }}
          />
        </>
      )}
      {isResizing && (
        <div
          style={{
            position: 'absolute',
            top: '-24px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'hsl(var(--popover))',
            color: 'hsl(var(--popover-foreground))',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '12px',
            whiteSpace: 'nowrap',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          }}
        >
          {Math.round(currentWidth || 0)} × {Math.round(currentHeight || 0)} px
        </div>
      )}
    </div>
  );
}