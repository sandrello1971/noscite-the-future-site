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

import { $applyNodeReplacement, DecoratorNode, $getNodeByKey } from 'lexical';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { ArrowUp, ArrowDown } from 'lucide-react';

export type ImageAlignment = 'left' | 'right' | 'center' | 'full';

export interface ImagePayload {
  altText: string;
  src: string;
  key?: NodeKey;
  width?: number;
  height?: number;
  maxWidth?: number;
  alignment?: ImageAlignment;
}

export type SerializedImageNode = Spread<
  {
    altText: string;
    src: string;
    width?: number;
    height?: number;
    maxWidth?: number;
    alignment?: ImageAlignment;
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
  __alignment: ImageAlignment;

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
      node.__alignment,
      node.__key
    );
  }

  static importJSON(serializedNode: SerializedImageNode): ImageNode {
    const { altText, src, width, height, maxWidth, alignment } = serializedNode;
    const node = $createImageNode({
      altText,
      src,
      width,
      height,
      maxWidth,
      alignment,
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
    alignment: ImageAlignment = 'center',
    key?: NodeKey
  ) {
    super(key);
    this.__src = src;
    this.__altText = altText;
    this.__width = width;
    this.__height = height;
    this.__maxWidth = maxWidth;
    this.__alignment = alignment;
  }

  exportJSON(): SerializedImageNode {
    return {
      altText: this.getAltText(),
      src: this.getSrc(),
      width: this.__width,
      height: this.__height,
      maxWidth: this.__maxWidth,
      alignment: this.__alignment,
      type: 'image',
      version: 1,
    };
  }

  setWidthAndHeight(width: number, height: number): void {
    const writable = this.getWritable();
    writable.__width = width;
    writable.__height = height;
  }

  setAlignment(alignment: ImageAlignment): void {
    const writable = this.getWritable();
    writable.__alignment = alignment;
  }

  getAlignment(): ImageAlignment {
    return this.__alignment;
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
        alignment={this.__alignment}
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
  alignment = 'center',
  key,
}: ImagePayload): ImageNode {
  return $applyNodeReplacement(new ImageNode(src, altText, width, height, maxWidth, alignment, key));
}

export function $isImageNode(
  node: LexicalNode | null | undefined
): node is ImageNode {
  return node instanceof ImageNode;
}

// Component with resize and drag functionality
interface ImageComponentProps {
  src: string;
  altText: string;
  width?: number;
  height?: number;
  maxWidth: number;
  alignment: ImageAlignment;
  nodeKey: NodeKey;
}

function ImageComponent({
  src,
  altText,
  width,
  height,
  maxWidth,
  alignment,
  nodeKey,
}: ImageComponentProps): JSX.Element {
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [editor] = useLexicalComposerContext();
  const [isResizing, setIsResizing] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [currentWidth, setCurrentWidth] = useState<number | undefined>(width);
  const [currentHeight, setCurrentHeight] = useState<number | undefined>(height);
  const [currentAlignment, setCurrentAlignment] = useState<ImageAlignment>(alignment);
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

  const changeAlignment = (newAlignment: ImageAlignment) => {
    setCurrentAlignment(newAlignment);
    editor.update(() => {
      const node = editor.getEditorState()._nodeMap.get(nodeKey);
      if ($isImageNode(node)) {
        node.setAlignment(newAlignment);
      }
    });
  };

  const moveNodeUp = () => {
    editor.update(() => {
      const node = $getNodeByKey(nodeKey);
      if (!node) return;
      
      const parent = node.getParent();
      if (!parent) return;
      
      const siblings = parent.getChildren();
      const index = siblings.indexOf(node);
      
      if (index > 0) {
        const previousSibling = siblings[index - 1];
        // Remove node and insert it before the previous sibling
        node.remove();
        previousSibling.insertBefore(node);
      }
    });
  };

  const moveNodeDown = () => {
    editor.update(() => {
      const node = $getNodeByKey(nodeKey);
      if (!node) return;
      
      const parent = node.getParent();
      if (!parent) return;
      
      const siblings = parent.getChildren();
      const index = siblings.indexOf(node);
      
      if (index < siblings.length - 1) {
        const nextSibling = siblings[index + 1];
        // Remove node and insert it after the next sibling
        node.remove();
        nextSibling.insertAfter(node);
      }
    });
  };

  const getContainerStyle = (): React.CSSProperties => {
    const baseStyle: React.CSSProperties = {
      position: 'relative',
      display: 'block',
      margin: '1rem 0',
      cursor: 'default',
    };

    if (currentAlignment === 'left') {
      return {
        ...baseStyle,
        float: 'left',
        marginRight: '1rem',
        maxWidth: '50%',
      };
    } else if (currentAlignment === 'right') {
      return {
        ...baseStyle,
        float: 'right',
        marginLeft: '1rem',
        maxWidth: '50%',
      };
    } else if (currentAlignment === 'center') {
      return {
        ...baseStyle,
        display: 'flex',
        justifyContent: 'center',
        margin: '1.5rem auto',
      };
    } else {
      // full width
      return {
        ...baseStyle,
        width: '100%',
        margin: '1.5rem 0',
      };
    }
  };

  return (
    <div
      ref={containerRef}
      style={getContainerStyle()}
      onMouseEnter={() => setIsSelected(true)}
      onMouseLeave={() => !isResizing && setIsSelected(false)}
    >
      <img
        ref={imageRef}
        src={src}
        alt={altText}
        style={{
          display: 'block',
          maxWidth: currentAlignment === 'full' ? '100%' : `${maxWidth}px`,
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
          {/* Alignment and Move controls - top bar */}
          <div
            style={{
              position: 'absolute',
              top: '-36px',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: '4px',
              background: 'hsl(var(--popover))',
              padding: '4px',
              borderRadius: '6px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              zIndex: 20,
            }}
          >
            <button
              onClick={moveNodeUp}
              style={{
                padding: '4px 6px',
                background: 'transparent',
                color: 'hsl(var(--foreground))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '4px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              title="Sposta su"
            >
              <ArrowUp size={14} />
            </button>
            <button
              onClick={moveNodeDown}
              style={{
                padding: '4px 6px',
                background: 'transparent',
                color: 'hsl(var(--foreground))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '4px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              title="Sposta giù"
            >
              <ArrowDown size={14} />
            </button>
            <div style={{ width: '1px', background: 'hsl(var(--border))', margin: '0 4px' }} />

            <button
              onClick={() => changeAlignment('left')}
              style={{
                padding: '4px 8px',
                background: currentAlignment === 'left' ? 'hsl(var(--primary))' : 'transparent',
                color: currentAlignment === 'left' ? 'white' : 'hsl(var(--foreground))',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: '500',
              }}
              title="Sinistra con testo a fianco"
            >
              ← Sinistra
            </button>
            <button
              onClick={() => changeAlignment('center')}
              style={{
                padding: '4px 8px',
                background: currentAlignment === 'center' ? 'hsl(var(--primary))' : 'transparent',
                color: currentAlignment === 'center' ? 'white' : 'hsl(var(--foreground))',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: '500',
              }}
              title="Centro"
            >
              Centro
            </button>
            <button
              onClick={() => changeAlignment('right')}
              style={{
                padding: '4px 8px',
                background: currentAlignment === 'right' ? 'hsl(var(--primary))' : 'transparent',
                color: currentAlignment === 'right' ? 'white' : 'hsl(var(--foreground))',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: '500',
              }}
              title="Destra con testo a fianco"
            >
              Destra →
            </button>
            <button
              onClick={() => changeAlignment('full')}
              style={{
                padding: '4px 8px',
                background: currentAlignment === 'full' ? 'hsl(var(--primary))' : 'transparent',
                color: currentAlignment === 'full' ? 'white' : 'hsl(var(--foreground))',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: '500',
              }}
              title="Larghezza completa"
            >
              Piena
            </button>
          </div>

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