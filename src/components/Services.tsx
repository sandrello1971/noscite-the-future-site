import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Rocket, Zap, Users, Settings, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Services = () => {
  const services = [
    {
      icon: BookOpen,
      title: "Athenaeum AI",
      description: "Percorso formativo di 68 ore: Initium (AI Operativa), Structura (Second Brain), Communitas (Collaborazione)",
      features: ["3 Certificazioni incluse", "Ecosistema Obsidian integrato", "ROI misurabile"],
      color: "text-primary"
    },
    {
      icon: Rocket,
      title: "AI Launchpad", 
      description: "Il trampolino perfetto per lanciare la tua trasformazione digitale in modo strutturato",
      features: ["Assessment iniziale", "Roadmap personalizzata", "Primi progetti pilota"],
      color: "text-secondary"
    },
    {
      icon: Zap,
      title: "AI Sprint",
      description: "Implementazione rapida di soluzioni AI con risultati misurabili in tempi ridotti",
      features: ["Metodologia agile", "KPI definiti", "Moduli formativi"],
      color: "text-primary"
    },
    {
      icon: Users,
      title: "AI Evolution Partner",
      description: "Partnership strategica per una trasformazione digitale completa e sostenibile",
      features: ["Governance AI", "Formazione continua", "Roadmap evolutiva"],
      color: "text-secondary"
    },
    {
      icon: Settings,
      title: "Fractional CIO",
      description: "Consulenza strategica di alto livello per guidare la tua evoluzione tecnologica",
      features: ["Strategia IT", "Team building", "Innovation roadmap"],
      color: "text-primary"
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
            I Nostri Servizi
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Soluzioni complete per accompagnare la tua azienda nel percorso di trasformazione digitale, 
            dall'analisi iniziale all'implementazione e governance continua.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card key={service.title} className="hover-lift animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-lg bg-muted ${service.color}`}>
                      <IconComponent className="h-8 w-8" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{service.title}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription className="text-base leading-relaxed">
                    {service.description}
                  </CardDescription>
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                        <ArrowRight className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <Button variant="hero" size="lg" asChild>
            <Link to="/servizi">
              Esplora Tutti i Servizi
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;