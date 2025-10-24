import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MessageCircle, X, Send, Minimize2, Maximize2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { ChatMessage } from '@/types/database';

// Helper function to render markdown links as clickable links with XSS protection
const renderMessageWithLinks = (content: string) => {
  // Regex per individuare link markdown [text](url)
  const markdownLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = markdownLinkRegex.exec(content)) !== null) {
    // Aggiungi testo prima del link
    if (match.index > lastIndex) {
      parts.push(content.slice(lastIndex, match.index));
    }
    
    // Aggiungi il link cliccabile con protezione XSS
    const linkText = match[1];
    const linkUrl = match[2];
    
    // Security: Only allow safe URL schemes
    const isSafeUrl = /^(https?:\/\/|mailto:|tel:)/i.test(linkUrl);
    
    if (isSafeUrl) {
      parts.push(
        <a
          key={match.index}
          href={linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 underline"
        >
          {linkText}
        </a>
      );
    } else {
      // For unsafe URLs, just display as text
      parts.push(`[${linkText}](${linkUrl})`);
    }
    
    lastIndex = match.index + match[0].length;
  }
  
  // Aggiungi il testo rimanente
  if (lastIndex < content.length) {
    parts.push(content.slice(lastIndex));
  }
  
  return parts.length > 0 ? parts : content;
};

// Generate a valid sessionId that passes the regex validation
const generateSessionId = () => {
  const timestamp = Date.now().toString();
  const randomPart = Math.random().toString(36).substring(2, 8); // Remove '0.' and take 6 chars
  return `session_${timestamp}_${randomPart}`;
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => generateSessionId());

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Messaggio di benvenuto
      setMessages([{
        role: 'assistant',
        content: 'Ciao! Sono l\'assistente virtuale di Noscite. Posso aiutarti con informazioni sui nostri servizi di trasformazione digitale e formazione AI. Come posso aiutarti oggi?',
        timestamp: new Date().toISOString()
      }]);
    }
  }, [isOpen, messages.length]);

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      role: 'user',
      content: inputMessage,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('chatbot', {
        body: {
          message: inputMessage,
          sessionId: sessionId
        }
      });

      if (error) throw error;

      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: data.response,
        timestamp: new Date().toISOString()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: ChatMessage = {
        role: 'assistant',
        content: 'Mi dispiace, si è verificato un errore. Riprova più tardi o contatta il nostro supporto.',
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-14 h-14 bg-primary hover:bg-primary/90 shadow-lg border-2 border-secondary"
          size="icon"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className={`w-80 shadow-xl transition-all duration-300 ${
        isMinimized ? 'h-14' : 'h-96'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-primary text-primary-foreground rounded-t-lg">
          <div className="flex items-center space-x-2">
            <MessageCircle className="h-5 w-5" />
            <span className="font-semibold">Assistente Noscite</span>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMinimized(!isMinimized)}
              className="text-primary-foreground hover:bg-primary-foreground/20"
            >
              {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-primary-foreground hover:bg-primary-foreground/20"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Messages */}
        {!isMinimized && (
          <>
            <CardContent className="h-64 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    <div className="text-sm">
                      {typeof message.content === 'string' && message.content.includes('[') && message.content.includes('](')
                        ? renderMessageWithLinks(message.content)
                        : message.content
                      }
                    </div>
                    <div className="text-xs opacity-70 mt-1">
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-muted text-muted-foreground rounded-lg p-3">
                    <div className="flex items-center space-x-2">
                      <div className="animate-pulse">Sto pensando...</div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>

            {/* Input */}
            <div className="p-4 border-t">
              <div className="flex space-x-2">
                <textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Scrivi il tuo messaggio..."
                  className="flex-1 resize-none rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  rows={1}
                  disabled={isLoading}
                />
                <Button 
                  onClick={sendMessage} 
                  size="sm"
                  disabled={isLoading || !inputMessage.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        )}
      </Card>
    </div>
  );
};

export default Chatbot;
