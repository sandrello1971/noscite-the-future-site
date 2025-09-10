import { Card, CardContent } from "@/components/ui/card";
import { Heart, Brain, Shield } from "lucide-react";

const Identitas = () => {
  const principi = [
    {
      title: "Veritas",
      description: "Trasparenza e onestà in ogni processo",
      icon: Shield
    },
    {
      title: "Innovatio", 
      description: "Ricerca costante di soluzioni creative",
      icon: Brain
    },
    {
      title: "Fiducia",
      description: "Relazioni basate sulla reciproca stima",
      icon: Heart
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h2 className="text-3xl lg:text-5xl font-serif-elegant font-bold text-foreground">
                <span className="font-latin-italic text-primary">Identitas</span>
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Siamo Noscite: un centro di competenze che integra consulenza strategica, 
                tecnologia e creatività.
              </p>
              <p className="text-lg text-muted-foreground">
                Tre principi ci guidano in ogni progetto e relazione.
              </p>
            </div>
          </div>

          {/* Right Column - Principi */}
          <div className="space-y-6">
            {principi.map((principio, index) => {
              const IconComponent = principio.icon;
              return (
                <Card key={principio.title} className="hover-lift animate-slide-up border-primary/20" style={{ animationDelay: `${index * 150}ms` }}>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                        <IconComponent className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-serif-elegant font-semibold text-foreground font-latin-italic">
                          {principio.title}
                        </h3>
                        <p className="text-muted-foreground">{principio.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Identitas;