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

const Risorse = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Come Implementare ChatGPT nella Tua PMI: Guida Pratica",
      excerpt: "Scopri i primi passi per integrare l'intelligenza artificiale nei processi quotidiani della tua azienda.",
      category: "AI Operativa",
      readTime: "8 min",
      date: "15 Gen 2024",
      featured: true
    },
    {
      id: 2,
      title: "Second Brain: Organizzare la Conoscenza Aziendale",
      excerpt: "Metodologia CODE e strumenti per creare un sistema di knowledge management efficace.",
      category: "Produttività",
      readTime: "12 min",
      date: "10 Gen 2024",
      featured: false
    },
    {
      id: 3,
      title: "ROI dell'AI: Come Misurare i Risultati della Trasformazione",
      excerpt: "Metriche e KPI essenziali per valutare l'impatto dell'intelligenza artificiale in azienda.",
      category: "Strategia",
      readTime: "10 min",
      date: "5 Gen 2024",
      featured: false
    }
  ];

  const videos = [
    {
      id: 1,
      title: "Introduzione all'AI per PMI",
      description: "Panoramica completa su opportunità e sfide dell'intelligenza artificiale per piccole e medie imprese.",
      duration: "15 min",
      views: "2.1k",
      category: "Fondamenti AI"
    },
    {
      id: 2,
      title: "Demo: ChatGPT per la Produttività",
      description: "Esempi pratici di utilizzo di ChatGPT per ottimizzare le attività quotidiane in ufficio.",
      duration: "22 min",
      views: "1.8k",
      category: "Tutorial"
    },
    {
      id: 3,
      title: "Webinar: Collaborazione Digitale Efficace",
      description: "Best practice per implementare strumenti di collaborazione in team distribuiti.",
      duration: "45 min",
      views: "950",
      category: "Webinar"
    }
  ];

  const guides = [
    {
      id: 1,
      title: "Guida Completa al Prompt Engineering",
      description: "Tecniche avanzate per ottenere il massimo da ChatGPT e altri modelli AI.",
      pages: "24 pagine",
      downloads: "1.2k",
      category: "AI Operativa"
    },
    {
      id: 2,
      title: "Checklist: Setup Obsidian Aziendale",
      description: "Passo dopo passo per configurare il tuo Second Brain professionale.",
      pages: "16 pagine",
      downloads: "890",
      category: "Knowledge Management"
    },
    {
      id: 3,
      title: "Template: Valutazione ROI AI",
      description: "Fogli di calcolo e framework per misurare l'impatto dell'AI.",
      pages: "12 pagine",
      downloads: "650",
      category: "Strategia"
    }
  ];

  const whitepapers = [
    {
      id: 1,
      title: "Il Futuro dell'AI nelle PMI Italiane",
      description: "Ricerca approfondita su trend, opportunità e barriere all'adozione dell'intelligenza artificiale.",
      pages: "32 pagine",
      date: "Dicembre 2023",
      category: "Ricerca"
    },
    {
      id: 2,
      title: "Digital Productivity: Benchmark 2024",
      description: "Analisi comparativa della produttività digitale nelle PMI prima e dopo l'implementazione AI.",
      pages: "28 pagine",
      date: "Gennaio 2024",
      category: "Benchmark"
    }
  ];

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
                <Button variant="hero" size="lg" asChild>
                  <Link to="/contatti">
                    Accedi ai Contenuti Premium
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg">
                  Newsletter Gratuita
                </Button>
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

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {blogPosts.map((post, index) => (
                    <Card key={post.id} className={`hover-lift animate-slide-up ${post.featured ? 'lg:col-span-2' : ''}`} style={{ animationDelay: `${index * 150}ms` }}>
                      <CardHeader>
                        <div className="flex items-center justify-between mb-3">
                          <Badge variant="outline">{post.category}</Badge>
                          {post.featured && <Badge className="bg-primary">In Evidenza</Badge>}
                        </div>
                        <CardTitle className="text-xl">{post.title}</CardTitle>
                        <CardDescription className="text-base">
                          {post.excerpt}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1">
                              <Clock className="h-4 w-4" />
                              <span>{post.readTime}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-4 w-4" />
                              <span>{post.date}</span>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            Leggi <ArrowRight className="ml-1 h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
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

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {videos.map((video, index) => (
                    <Card key={video.id} className="hover-lift animate-slide-up" style={{ animationDelay: `${index * 150}ms` }}>
                      <CardHeader>
                        <div className="aspect-video bg-muted rounded-lg mb-4 flex items-center justify-center">
                          <Play className="h-12 w-12 text-primary" />
                        </div>
                        <Badge variant="outline" className="w-fit">{video.category}</Badge>
                        <CardTitle className="text-xl">{video.title}</CardTitle>
                        <CardDescription className="text-base">
                          {video.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1">
                              <Clock className="h-4 w-4" />
                              <span>{video.duration}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Eye className="h-4 w-4" />
                              <span>{video.views}</span>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            Guarda <Play className="ml-1 h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
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

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {guides.map((guide, index) => (
                    <Card key={guide.id} className="hover-lift animate-slide-up" style={{ animationDelay: `${index * 150}ms` }}>
                      <CardHeader>
                        <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                          <Download className="h-8 w-8 text-primary" />
                        </div>
                        <Badge variant="outline" className="w-fit">{guide.category}</Badge>
                        <CardTitle className="text-xl">{guide.title}</CardTitle>
                        <CardDescription className="text-base">
                          {guide.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1">
                              <FileText className="h-4 w-4" />
                              <span>{guide.pages}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Download className="h-4 w-4" />
                              <span>{guide.downloads}</span>
                            </div>
                          </div>
                        </div>
                        <Button variant="cta" className="w-full">
                          Scarica Gratis
                          <Download className="ml-2 h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
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

                <div className="grid md:grid-cols-2 gap-8">
                  {whitepapers.map((paper, index) => (
                    <Card key={paper.id} className="hover-lift animate-slide-up" style={{ animationDelay: `${index * 150}ms` }}>
                      <CardHeader>
                        <div className="w-16 h-16 bg-secondary/10 rounded-xl flex items-center justify-center mb-4">
                          <FileText className="h-8 w-8 text-secondary" />
                        </div>
                        <Badge variant="outline" className="w-fit">{paper.category}</Badge>
                        <CardTitle className="text-xl">{paper.title}</CardTitle>
                        <CardDescription className="text-base">
                          {paper.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1">
                              <FileText className="h-4 w-4" />
                              <span>{paper.pages}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-4 w-4" />
                              <span>{paper.date}</span>
                            </div>
                          </div>
                        </div>
                        <Button variant="outline" className="w-full">
                          Richiedi Accesso
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
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
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="La tua email" 
                  className="flex-1 px-4 py-3 rounded-lg border border-input bg-background"
                />
                <Button variant="cta" size="lg">
                  Iscriviti
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
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