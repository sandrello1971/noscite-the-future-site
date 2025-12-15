import { useState, useEffect, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { CommentariumPost as CommentariumPostType } from "@/types/database";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, ArrowLeft, Clock } from "lucide-react";
import { format } from "date-fns";
import { it } from "date-fns/locale";
import DOMPurify from "dompurify";

// Configure DOMPurify to allow safe image attributes while blocking XSS
const SANITIZE_CONFIG = {
  ALLOWED_TAGS: [
    'p', 'br', 'strong', 'em', 'u', 's', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'ul', 'ol', 'li', 'blockquote', 'pre', 'code', 'a', 'img', 'span', 'div',
    'table', 'thead', 'tbody', 'tr', 'th', 'td', 'hr', 'sub', 'sup'
  ],
  ALLOWED_ATTR: [
    'href', 'target', 'rel', 'src', 'alt', 'title', 'width', 'height',
    'style', 'class', 'id', 'colspan', 'rowspan'
  ],
  FORBID_ATTR: ['onerror', 'onclick', 'onload', 'onmouseover', 'onfocus', 'onblur'],
  ALLOW_DATA_ATTR: false,
};

export default function CommentariumPost() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<CommentariumPostType | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState<CommentariumPostType[]>([]);

  useEffect(() => {
    if (slug) {
      loadPost(slug);
    }
  }, [slug]);

  const loadPost = async (postSlug: string) => {
    try {
      const nowIso = new Date().toISOString();
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', postSlug)
        .eq('published', true)
        .not('published_at', 'is', null)
        .lte('published_at', nowIso)
        .single();

      if (error) throw error;
      
      if (!data) {
        navigate('/commentarium');
        return;
      }

      setPost(data);
      
      // Load related posts
      if (data.category) {
        const nowIso = new Date().toISOString();
        const { data: related } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('published', true)
          .not('published_at', 'is', null)
          .lte('published_at', nowIso)
          .eq('category', data.category)
          .neq('id', data.id)
          .limit(3);
        
        setRelatedPosts(related || []);
      }
    } catch (error) {
      console.error('Error loading commentarium post:', error);
      navigate('/commentarium');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <div className="min-h-screen flex flex-col bg-background">
          <Header />
          <main className="flex-grow pt-20">
            <div className="container mx-auto px-4 py-16">
              <div className="max-w-4xl mx-auto">
                <div className="animate-pulse space-y-8">
                  <div className="h-12 bg-muted rounded w-3/4"></div>
                  <div className="h-4 bg-muted rounded w-1/2"></div>
                  <div className="space-y-4">
                    <div className="h-4 bg-muted rounded"></div>
                    <div className="h-4 bg-muted rounded"></div>
                    <div className="h-4 bg-muted rounded w-5/6"></div>
                  </div>
                </div>
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </>
    );
  }

  if (!post) return null;

  const getExcerpt = (content: string, maxLength: number = 150) => {
    const text = content.replace(/<[^>]*>/g, '');
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  return (
    <>
      <SEO 
        title={`${post.title} - Commentarium Noscite`}
        description={post.excerpt || getExcerpt(post.content)}
        ogImage={post.featured_image_url}
      />
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-grow pt-20">
          <article className="container mx-auto px-4 py-16">
            <div className="max-w-4xl mx-auto">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/commentarium')}
                className="mb-8"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Torna al Commentarium
              </Button>

              {post.featured_image_url && (
                <div className="mb-8 rounded-lg overflow-hidden">
                  <img 
                    src={post.featured_image_url} 
                    alt={post.title}
                    className="w-full h-auto max-h-[500px] object-cover"
                  />
                </div>
              )}

              <div className="mb-8">
                {post.category && (
                  <Badge variant="secondary" className="mb-4">
                    {post.category}
                  </Badge>
                )}
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                  {post.title}
                </h1>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  {post.published_at && (
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {format(new Date(post.published_at), 'dd MMMM yyyy', { locale: it })}
                    </div>
                  )}
                </div>
              </div>

              {post.excerpt && (
                <div className="text-xl text-muted-foreground mb-8 pb-8 border-b">
                  {post.excerpt}
                </div>
              )}

              {/* Sanitize HTML content to prevent XSS while preserving image styling */}
              <div 
                className="commentarium-content prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-foreground prose-a:text-primary prose-strong:text-foreground prose-ul:text-foreground prose-ol:text-foreground"
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content, SANITIZE_CONFIG) }}
              />

              {post.tags && post.tags.length > 0 && (
                <div className="mt-12 pt-8 border-t">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {relatedPosts.length > 0 && (
              <div className="max-w-6xl mx-auto mt-16">
                <h2 className="text-2xl font-bold text-foreground mb-8">
                  Articoli Correlati
                </h2>
                <div className="grid gap-6 md:grid-cols-3">
                  {relatedPosts.map((related) => (
                    <Link key={related.id} to={`/commentarium/${related.slug}`}>
                      <Card className="h-full hover:shadow-lg transition-all duration-300 group">
                        {related.featured_image_url && (
                          <div className="overflow-hidden">
                            <img 
                              src={related.featured_image_url} 
                              alt={related.title}
                              className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        )}
                        <CardContent className="p-4">
                          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
                            {related.title}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {related.excerpt || getExcerpt(related.content)}
                          </p>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </article>
        </main>
        <Footer />
      </div>
    </>
  );
}
