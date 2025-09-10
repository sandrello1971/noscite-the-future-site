import { Lightbulb, Brain, Heart, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Atheneum = () => {
  const percorsi = [
    {
      icon: Lightbulb,
      title: "Innovatio",
      description: "Esplorare le tecnologie emergenti e il loro impatto trasformativo",
      content: "Percorsi di scoperta delle tecnologie emergenti che ridefiniscono il futuro del business"
    },
    {
      icon: Brain,
      title: "Strategia", 
      description: "Pensare e progettare il cambiamento con visione sistemica",
      content: "Metodologie per sviluppare strategie digitali efficaci e sostenibili"
    },
    {
      icon: Heart,
      title: "Humanitas",
      description: "L'impatto del digitale sulle persone e sull'organizzazione",
      content: "Come guidare la trasformazione culturale e il change management"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl lg:text-6xl font-serif-elegant font-bold text-foreground mb-6">
              <span className="font-latin-italic">Atheneum</span>
            </h2>
            <p className="text-2xl text-muted-foreground font-serif-elegant font-latin-italic mb-8">
              Scientia potentia est
            </p>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              L'Atheneum di Noscite è lo spazio dove sapere e pratica si incontrano. Non una lista di servizi, 
              ma percorsi di apprendimento e trasformazione, pensati per accompagnare le organizzazioni nella 
              comprensione del digitale e dei suoi impatti.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {percorsi.map((percorso, index) => {
              const IconComponent = percorso.icon;
              return (
                <Card 
                  key={percorso.title} 
                  className="border-border hover-lift animate-slide-up group cursor-pointer bg-card/50 backdrop-blur-sm" 
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                      <IconComponent className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-2xl font-serif-elegant font-bold text-foreground mb-4 font-latin-italic text-center group-hover:text-secondary transition-colors">
                      {percorso.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-center mb-4">
                      {percorso.description}
                    </p>
                    <p className="text-sm text-muted-foreground/80 leading-relaxed text-center">
                      {percorso.content}
                    </p>
                    <div className="w-0 h-0.5 bg-secondary mx-auto mt-4 group-hover:w-full transition-all duration-300"></div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="text-center space-y-6 animate-fade-in">
            <div className="space-y-2">
              <p className="text-lg text-muted-foreground italic">
                Atheneum è la casa del sapere digitale.
              </p>
              <p className="text-lg text-muted-foreground italic">
                Ogni percorso è un invito a riflettere e a trasformare.
              </p>
              <p className="text-lg text-muted-foreground italic">
                Conoscenza, metodo, visione: le tre virtù che guidano la nostra formazione.
              </p>
            </div>
            
            <Button 
              variant="outline" 
              size="lg" 
              asChild 
              className="border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
            >
              <Link to="/atheneum">
                Esplora i percorsi
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Atheneum;