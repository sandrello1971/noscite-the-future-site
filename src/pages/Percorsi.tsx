import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Brain, 
  BookOpen, 
  Users, 
  Clock, 
  Award, 
  TrendingUp, 
  Target,
  CheckCircle,
  ArrowRight,
  Calendar,
  UserCheck,
  BarChart3,
  Zap
} from "lucide-react";
import { Link } from "react-router-dom";

const Percorsi = () => {
  const corsi = [
    {
      id: "corso-1",
      title: "Intelligenza Artificiale Operativa",
      duration: "20 ore",
      modules: 6,
      participants: "max 12",
      certification: "Certified AI Productivity User",
      description: "Competenze fondamentali per usare ChatGPT e Copilot 365 nelle attività quotidiane",
      icon: Brain,
      color: "text-primary",
      bgColor: "bg-primary/10",
      features: [
        "Fondamenti dell'AI conversazionale",
        "ChatGPT per il business: prompt engineering",
        "ChatGPT avanzato per PMI",
        "Microsoft Copilot 365: produttività quotidiana",
        "Microsoft Copilot 365: applicazioni avanzate",
        "Second Brain: introduzione teorica"
      ],
      benefits: [
        "Riduzione 40-60% tempo stesura documenti",
        "Miglioramento qualità comunicazioni",
        "Automazione task ripetitivi Office 365",
        "Accelerazione analisi dati e report"
      ]
    },
    {
      id: "corso-2", 
      title: "Second Brain in Azienda",
      duration: "24 ore",
      modules: 6,
      participants: "max 12",
      certification: "Certified Second Brain Implementer",
      description: "Sistema scalabile di knowledge management con metodologia CODE e tool Obsidian",
      icon: BookOpen,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
      prerequisite: "Corso 1",
      features: [
        "Fondamenti Second Brain e metodo CODE",
        "Configurazione Obsidian e Vault aziendale",
        "Organizzazione avanzata e template",
        "Integrazione AI e automazioni",
        "Collaborazione in team e governance",
        "Certificazione e piano d'azione"
      ],
      benefits: [
        "Riduzione 70% tempo ricerca informazioni",
        "Miglioramento onboarding nuovi dipendenti",
        "Standardizzazione procedure aziendali",
        "Continuità operativa e knowledge retention"
      ]
    },
    {
      id: "corso-3",
      title: "Collaborazione Intelligente", 
      duration: "24 ore",
      modules: 6,
      participants: "max 12",
      certification: "Certified Collaboration Tools User",
      description: "Comunicazione interna, gestione progetti e produttività con strumenti digitali",
      icon: Users,
      color: "text-primary",
      bgColor: "bg-primary/10",
      prerequisite: "Corso 1 (consigliato Corso 2)",
      features: [
        "Fondamenti collaborazione digitale",
        "Microsoft Teams: comunicazione e documenti",
        "Trello: Kanban digitale e automazioni",
        "Asana: pianificazione e monitoraggio",
        "Slack: comunicazione veloce e workflow",
        "Integrazione multi-tool e roadmap"
      ],
      benefits: [
        "Riduzione 30-50% tempo coordinamento team",
        "Miglioramento trasparenza progetti",
        "Eliminazione silos informativi",
        "Accelerazione processi decisionali"
      ]
    }
  ];

  const roiMetrics = [
    { metric: "Tempo risposta email", reduction: "-50%" },
    { metric: "Preparazione riunioni", reduction: "-60%" },
    { metric: "Ricerca informazioni", reduction: "-70%" },
    { metric: "Qualità documentazione", increase: "+80%" },
    { metric: "Soddisfazione team", increase: "+40%" },
    { metric: "Produttività generale", increase: "+25-35%" }
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
                Percorsi Formativi
                <span className="block text-primary">Digital Productivity</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                68 ore di formazione completa per trasformare la produttività della tua PMI attraverso 
                intelligenza artificiale, knowledge management e collaborazione digitale.
              </p>
              <div className="flex flex-wrap justify-center gap-6 text-sm">
                <div className="flex items-center space-x-2">
                  <UserCheck className="h-5 w-5 text-primary" />
                  <span>Target: PMI 5-50 dipendenti</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-primary" />
                  <span>Max 12 partecipanti per corso</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  <span>Modalità: In presenza o online</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Corsi Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
                I Tre Corsi del Percorso
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Un percorso strutturato e sequenziale per implementare una trasformazione digitale completa.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {corsi.map((corso, index) => {
                const IconComponent = corso.icon;
                return (
                  <Card key={corso.id} className="hover-lift animate-slide-up" style={{ animationDelay: `${index * 150}ms` }}>
                    <CardHeader>
                      <div className={`w-16 h-16 ${corso.bgColor} rounded-xl flex items-center justify-center mb-4`}>
                        <IconComponent className={`h-8 w-8 ${corso.color}`} />
                      </div>
                      <CardTitle className="text-2xl">{corso.title}</CardTitle>
                      <CardDescription className="text-base">
                        {corso.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Info rapide */}
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{corso.duration}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <BookOpen className="h-4 w-4 text-muted-foreground" />
                          <span>{corso.modules} moduli</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>{corso.participants}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Award className="h-4 w-4 text-muted-foreground" />
                          <span>Certificazione</span>
                        </div>
                      </div>

                      {/* Prerequisito */}
                      {corso.prerequisite && (
                        <Badge variant="outline" className="w-fit">
                          Prerequisito: {corso.prerequisite}
                        </Badge>
                      )}

                      {/* Features principali */}
                      <div>
                        <h4 className="font-semibold mb-3">Moduli principali:</h4>
                        <ul className="space-y-2">
                          {corso.features.slice(0, 3).map((feature, i) => (
                            <li key={i} className="flex items-start space-x-2 text-sm">
                              <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Certificazione */}
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <Award className="h-5 w-5 text-primary" />
                          <span className="font-semibold">Certificazione</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{corso.certification}</p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* ROI Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
                ROI Misurabile e Immediato
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Risultati concreti in termini di riduzione dei tempi e aumento della produttività.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {roiMetrics.map((metric, index) => (
                <Card key={metric.metric} className="text-center hover-lift animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                  <CardContent className="p-6">
                    <BarChart3 className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">{metric.metric}</h3>
                    <div className={`text-3xl font-bold ${metric.reduction ? 'text-green-600' : 'text-blue-600'}`}>
                      {metric.reduction || metric.increase}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Implementazione */}
            <div className="bg-card p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-center mb-8">Percorso di Implementazione</h3>
              
              <Tabs defaultValue="sequenziale" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="sequenziale">Approccio Sequenziale</TabsTrigger>
                  <TabsTrigger value="accelerato">Approccio Accelerato</TabsTrigger>
                </TabsList>
                
                <TabsContent value="sequenziale" className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 p-4 bg-muted/50 rounded-lg">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold">1</div>
                      <div>
                        <h4 className="font-semibold">Mese 1: Corso 1</h4>
                        <p className="text-sm text-muted-foreground">Implementazione ChatGPT e Copilot</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 p-4 bg-muted/50 rounded-lg">
                      <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-white font-bold">2</div>
                      <div>
                        <h4 className="font-semibold">Mese 4: Corso 2</h4>
                        <p className="text-sm text-muted-foreground">Implementazione Second Brain</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 p-4 bg-muted/50 rounded-lg">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold">3</div>
                      <div>
                        <h4 className="font-semibold">Mese 7: Corso 3</h4>
                        <p className="text-sm text-muted-foreground">Implementazione collaboration tools</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="accelerato" className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 p-4 bg-muted/50 rounded-lg">
                      <Zap className="h-8 w-8 text-secondary" />
                      <div>
                        <h4 className="font-semibold">Corsi 1+2 Consecutivi</h4>
                        <p className="text-sm text-muted-foreground">Per team più tech-savvy con supporto intensivo</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 p-4 bg-muted/50 rounded-lg">
                      <Target className="h-8 w-8 text-primary" />
                      <div>
                        <h4 className="font-semibold">Implementazione Parallela</h4>
                        <p className="text-sm text-muted-foreground">Corso 3 dopo consolidamento primi due</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 gradient-hero">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <div className="max-w-3xl mx-auto animate-fade-in">
              <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
                Inizia la Tua Trasformazione
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Contattaci per una valutazione gratuita e scopri quale percorso è più adatto alla tua azienda.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="hero" size="lg" asChild>
                  <Link to="/contatti">
                    Prenota Valutazione Gratuita
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/servizi">Scopri Tutti i Servizi</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Percorsi;