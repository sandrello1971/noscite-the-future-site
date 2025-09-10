import { Sparkles, Users, Lightbulb } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Valor = () => {
  const values = [
    {
      icon: Sparkles,
      title: "Unicitas",
      description: "Personalizzazione assoluta di ogni soluzione per le specifiche esigenze del cliente"
    },
    {
      icon: Lightbulb,
      title: "Innovatio", 
      description: "Ricerca continua e sperimentazione delle migliori tecnologie emergenti"
    },
    {
      icon: Users,
      title: "Societas",
      description: "Partnership durature basate sulla fiducia e la crescita reciproca"
    }
  ];

  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl lg:text-6xl font-serif-elegant font-bold text-foreground mb-6">
              <span className="font-latin-italic">Valor</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
              Il nostro valore nasce da come lavoriamo: <strong>Unicitas – Innovatio – Societas</strong>
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <Card key={value.title} className="border-border hover-lift animate-slide-up bg-card/50 backdrop-blur-sm" style={{ animationDelay: `${index * 100}ms` }}>
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <IconComponent className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-2xl font-serif-elegant font-bold text-foreground mb-4 font-latin-italic">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="text-center animate-fade-in">
            <p className="text-lg text-muted-foreground italic">
              Non si tratta solo di strumenti, ma di come trasformiamo insieme sfide in opportunità.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Valor;