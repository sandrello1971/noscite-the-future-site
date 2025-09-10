import { Card, CardContent } from "@/components/ui/card";
import { Target, Lightbulb, Handshake } from "lucide-react";

const Valor = () => {
  const valori = [
    {
      title: "Unicitas",
      description: "Personalizzazione assoluta",
      detail: "Ogni azienda ha processi, persone e vincoli diversi. Le nostre soluzioni sono sempre su misura.",
      icon: Target
    },
    {
      title: "Innovatio",
      description: "Ricerca e sperimentazione", 
      detail: "Esploriamo costantemente nuove tecnologie e metodologie per offrire soluzioni all'avanguardia.",
      icon: Lightbulb
    },
    {
      title: "Societas",
      description: "Partnership durature",
      detail: "Non forniamo solo servizi, costruiamo relazioni di lungo termine basate sulla fiducia reciproca.",
      icon: Handshake
    }
  ];

  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl lg:text-5xl font-serif-elegant font-bold text-foreground mb-6">
            <span className="font-latin-italic text-primary">Valor</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Il nostro valore nasce da come lavoriamo. Non si tratta solo di strumenti, 
            ma di come trasformiamo insieme sfide in opportunità.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {valori.map((valore, index) => {
            const IconComponent = valore.icon;
            return (
              <Card key={valore.title} className="text-center hover-lift animate-slide-up border-primary/20" style={{ animationDelay: `${index * 150}ms` }}>
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <IconComponent className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-serif-elegant font-bold text-foreground mb-2 font-latin-italic">
                    {valore.title}
                  </h3>
                  <h4 className="text-lg font-semibold text-primary mb-4">
                    {valore.description}
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {valore.detail}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Valor;