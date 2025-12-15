import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { CommentariumPost } from "@/types/database";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { it } from "date-fns/locale";

export default function Commentarium() {
  const [posts, setPosts] = useState<CommentariumPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const nowIso = new Date().toISOString();
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('published', true)
        .not('published_at', 'is', null)
        .lte('published_at', nowIso)
        .order('published_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error loading commentarium posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const getExcerpt = (content: string, maxLength: number = 150) => {
    const text = content.replace(/<[^>]*>/g, '');
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  return (
    <>
      <SEO 
        title="Commentarium - Noscite"
        description="Scopri gli ultimi articoli, insights e aggiornamenti dal team di Noscite. Approfondimenti su innovazione, strategia e cultura aziendale."
      />
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-grow pt-20">
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-4xl mx-auto mb-12 text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Commentarium
              </h1>
              <p className="text-lg text-muted-foreground">
                Scopri i nostri ultimi articoli e approfondimenti
              </p>
            </div>

            {loading ? (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="animate-pulse">
                    <CardHeader>
                      <div className="h-6 bg-muted rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-muted rounded w-1/2"></div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="h-4 bg-muted rounded"></div>
                        <div className="h-4 bg-muted rounded w-5/6"></div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : posts.length === 0 ? (
              <Card className="max-w-2xl mx-auto">
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">
                    Nessun articolo pubblicato al momento. Torna presto per nuovi contenuti!
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                  <Link key={post.id} to={`/commentarium/${post.slug}`}>
                    <Card className="h-full hover:shadow-lg transition-all duration-300 group cursor-pointer">
                      {post.featured_image_url && (
                        <div className="overflow-hidden">
                          <img 
                            src={post.featured_image_url} 
                            alt={post.title}
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <CardHeader>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                          <Calendar className="h-3 w-3" />
                          {post.published_at && format(new Date(post.published_at), 'dd MMMM yyyy', { locale: it })}
                        </div>
                        {post.category && (
                          <Badge variant="secondary" className="w-fit mb-2">
                            {post.category}
                          </Badge>
                        )}
                        <CardTitle className="group-hover:text-primary transition-colors">
                          {post.title}
                        </CardTitle>
                        <CardDescription>
                          {post.excerpt || getExcerpt(post.content)}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center text-sm text-primary group-hover:translate-x-1 transition-transform">
                          Leggi di più <ArrowRight className="ml-2 h-4 w-4" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
