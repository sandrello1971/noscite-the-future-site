import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, 
  Video, 
  Download, 
  FileText, 
  Calendar,
  Clock,
  ArrowRight,
  Play,
  Eye,
  Users,
  Star
} from "lucide-react";
import { Link } from "react-router-dom";
import NewsletterSubscription from "@/components/NewsletterSubscription";

const Risorse = () => {
  const blogPosts: any[] = [];

  const videos: any[] = [];

  const guides: any[] = [];

  const whitepapers: any[] = [];

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="gradient-hero py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center max-w-4xl mx-auto animate-fade-in">
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
                Centro Risorse
                <span className="block text-primary">Digitali</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Guide pratiche, video formativi e contenuti esclusivi per accelerare 
                la tua trasformazione digitale e padroneggiare l'intelligenza artificiale.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <NewsletterSubscription />
              </div>
            </div>
          </div>
        </section>

        {/* Content Tabs */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <Tabs defaultValue="blog" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-12">
                <TabsTrigger value="blog" className="flex items-center space-x-2">
                  <BookOpen className="h-4 w-4" />
                  <span>Blog</span>
                </TabsTrigger>
                <TabsTrigger value="video" className="flex items-center space-x-2">
                  <Video className="h-4 w-4" />
                  <span>Video</span>
                </TabsTrigger>
                <TabsTrigger value="guide" className="flex items-center space-x-2">
                  <Download className="h-4 w-4" />
                  <span>Guide</span>
                </TabsTrigger>
                <TabsTrigger value="whitepaper" className="flex items-center space-x-2">
                  <FileText className="h-4 w-4" />
                  <span>Whitepaper</span>
                </TabsTrigger>
              </TabsList>

              {/* Blog Content */}
              <TabsContent value="blog" className="space-y-8">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-foreground mb-4">Blog Formativo</h2>
                  <p className="text-lg text-muted-foreground">
                    Articoli pratici e insights per implementare l'AI nella tua azienda
                  </p>
                </div>

                <div className="text-center py-12">
                  <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Nessun articolo pubblicato</h3>
                  <p className="text-muted-foreground">
                    I contenuti del blog verranno visualizzati qui una volta pubblicati.
                  </p>
                </div>
              </TabsContent>

              {/* Video Content */}
              <TabsContent value="video" className="space-y-8">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-foreground mb-4">Video e Webinar</h2>
                  <p className="text-lg text-muted-foreground">
                    Contenuti video on-demand per imparare velocemente
                  </p>
                </div>

                <div className="text-center py-12">
                  <Video className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Nessun video disponibile</h3>
                  <p className="text-muted-foreground">
                    I contenuti video verranno visualizzati qui una volta pubblicati.
                  </p>
                </div>
              </TabsContent>

              {/* Guide Content */}
              <TabsContent value="guide" className="space-y-8">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-foreground mb-4">Guide Scaricabili</h2>
                  <p className="text-lg text-muted-foreground">
                    Risorse pratiche in formato PDF per implementazioni immediate
                  </p>
                </div>

                <div className="text-center py-12">
                  <Download className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Nessuna guida disponibile</h3>
                  <p className="text-muted-foreground">
                    Le guide scaricabili verranno visualizzate qui una volta pubblicate.
                  </p>
                </div>
              </TabsContent>

              {/* Whitepaper Content */}
              <TabsContent value="whitepaper" className="space-y-8">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-foreground mb-4">Whitepaper e Ricerche</h2>
                  <p className="text-lg text-muted-foreground">
                    Approfondimenti strategici e analisi di mercato
                  </p>
                </div>

                <div className="text-center py-12">
                  <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Nessun whitepaper disponibile</h3>
                  <p className="text-muted-foreground">
                    I whitepaper e le ricerche verranno visualizzate qui una volta pubblicate.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-20 gradient-hero">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <div className="max-w-3xl mx-auto animate-fade-in">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
                Non Perdere Nessun Aggiornamento
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Ricevi i nostri contenuti esclusivi, case study e le ultime novità 
                sull'intelligenza artificiale direttamente nella tua inbox.
              </p>
              <NewsletterSubscription />
              <p className="text-sm text-muted-foreground mt-4">
                Niente spam. Puoi annullare l'iscrizione in qualsiasi momento.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Risorse;