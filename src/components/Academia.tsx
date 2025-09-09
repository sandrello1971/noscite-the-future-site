import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  GraduationCap, 
  Users, 
  BookOpen, 
  Trophy,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";

const Academia = () => {
  const programmi = [
    {
      title: "Digital Leadership",
      description: "Per CEO e manager che guidano la trasformazione",
      icon: Trophy,
      durata: "4 settimane",
      formato: "Blended"
    },
    {
      title: "AI Operations",
      description: "Formazione operativa per team e responsabili di processo",
      icon: Users,
      durata: "6 settimane", 
      formato: "Pratico"
    },
    {
      title: "Change Management",
      description: "Metodologie per gestire il cambiamento organizzativo",
      icon: BookOpen,
      durata: "3 settimane",
      formato: "Workshop"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <div className="flex justify-center mb-6">
            <Badge variant="secondary" className="px-4 py-2 text-sm">
              <GraduationCap className="mr-2 h-4 w-4" />
              Noscite Academia
            </Badge>
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
            La formazione è il <span className="text-primary">cuore</span> della trasformazione
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Non basta implementare la tecnologia. I vostri team devono padroneggiare i nuovi processi 
            e sviluppare le competenze per governare il cambiamento. La Noscite Academia accompagna 
            ogni fase del Metodo con percorsi formativi mirati.
          </p>
        </div>

        {/* Programmi formativi */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {programmi.map((programma, index) => {
            const IconComponent = programma.icon;
            return (
              <Card key={programma.title} className="hover-lift animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                <CardHeader className="text-center">
                  <IconComponent className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle className="text-xl">{programma.title}</CardTitle>
                  <CardDescription className="text-base">{programma.description}</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="flex justify-center gap-4 mb-4">
                    <Badge variant="outline">{programma.durata}</Badge>
                    <Badge variant="outline">{programma.formato}</Badge>
                  </div>
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
            <Link to="/servizi">
              Scopri i Percorsi Formativi
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Academia;