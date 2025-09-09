import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  GraduationCap, 
  Brain, 
  BookOpen, 
  Users,
  Clock,
  Award,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";

const Atheneum = () => {
  const corsi = [
    {
      title: "Initium – Fondamenta AI Operativa",
      description: "Acquisire competenze pratiche per usare ChatGPT e Copilot 365 nelle attività quotidiane e introdurre il concetto di Second Brain",
      icon: Brain,
      duration: "20 ore",
      modules: 5,
      participants: "max 12",
      certification: "Certified AI Productivity User"
    },
    {
      title: "Structura – Second Brain Aziendale",
      description: "Creare un sistema scalabile di gestione della conoscenza con Obsidian, integrato con AI e processi aziendali",
      icon: BookOpen,
      duration: "24 ore", 
      modules: 6,
      participants: "max 12",
      certification: "Certified Second Brain Implementer"
    },
    {
      title: "Communitas – Collaborazione Intelligente",
      description: "Creare un sistema di collaborazione e project management integrato, basato su Obsidian come Collaboration Hub",
      icon: Users,
      duration: "24 ore",
      modules: 6,
      participants: "max 12",
      certification: "Certified Collaboration Hub User"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <div className="flex justify-center mb-6">
            <Link 
              to="/percorsi"
              className="inline-flex items-center px-4 py-2 text-sm bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors rounded-full cursor-pointer"
              onClick={() => {
                setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
              }}
            >
              <GraduationCap className="mr-2 h-4 w-4" />
              Noscite Atheneum
            </Link>
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
            La formazione è il <span className="text-primary">cuore</span> della trasformazione
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            68 ore di formazione completa per trasformare la produttività della tua PMI attraverso 
            intelligenza artificiale, knowledge management e collaborazione digitale. I vostri team 
            devono padroneggiare i nuovi processi e sviluppare le competenze per governare il cambiamento.
          </p>
        </div>

        {/* Percorsi formativi */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {corsi.map((corso, index) => {
            const IconComponent = corso.icon;
            return (
              <Card key={corso.title} className="hover-lift animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                <CardHeader className="text-center">
                  <IconComponent className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle className="text-xl">{corso.title}</CardTitle>
                  <CardDescription className="text-base">{corso.description}</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                    <div className="flex items-center justify-center space-x-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{corso.duration}</span>
                    </div>
                    <div className="flex items-center justify-center space-x-1">
                      <BookOpen className="h-4 w-4 text-muted-foreground" />
                      <span>{corso.modules} moduli</span>
                    </div>
                    <div className="flex items-center justify-center space-x-1">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{corso.participants}</span>
                    </div>
                    <div className="flex items-center justify-center space-x-1">
                      <Award className="h-4 w-4 text-muted-foreground" />
                      <span>Certificazione</span>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {corso.certification}
                  </Badge>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Approccio integrato */}
        <Card className="bg-muted/30 mb-16">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-6">Formazione integrata nel Metodo</h3>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div>
                <h4 className="font-semibold mb-2 text-primary">Durante la Cognitio</h4>
                <p className="text-sm text-muted-foreground">Coinvolgiamo i team nell'analisi dei processi attuali, creando consapevolezza e ownership del cambiamento.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-secondary">Durante l'Adoptio</h4>
                <p className="text-sm text-muted-foreground">Formazione pratica sui nuovi strumenti e processi, con coaching on-the-job per garantire l'adozione.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-primary">Durante la Governantia</h4>
                <p className="text-sm text-muted-foreground">Sviluppo delle competenze di governance e miglioramento continuo per rendere autonomi i vostri team.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-6">Investire nelle persone è investire nel successo</h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            La tecnologia da sola non basta. I progetti di trasformazione digitale hanno successo quando 
            le persone sono formate, coinvolte e rese protagoniste del cambiamento.
          </p>
          <Button variant="outline" size="lg" asChild>
            <Link to="/percorsi">
              Scopri i Percorsi Formativi
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Atheneum;