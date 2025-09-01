export interface BlogPost {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  featured_image_url?: string;
  published: boolean;
  author_id?: string;
  published_at?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Document {
  id?: string;
  title: string;
  description: string;
  file_url: string;
  file_type: string;
  category: string;
  tags: string[];
  download_count?: number;
  uploaded_by?: string;
  created_at?: string;
  updated_at?: string;
}

export interface KnowledgeBase {
  id?: string;
  content: string;
  content_type: 'page' | 'blog' | 'document';
  source_id?: string;
  title?: string;
  embeddings?: number[];
  created_at?: string;
  updated_at?: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface ChatConversation {
  id?: string;
  session_id: string;
  messages: ChatMessage[];
  created_at?: string;
  updated_at?: string;
}