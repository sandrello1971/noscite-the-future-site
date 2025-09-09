import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  Clock, 
  Target, 
  BarChart3, 
  CheckCircle, 
  Zap,
  Phone
} from "lucide-react";
import { Link } from "react-router-dom";

const Services = () => {
  const caratteristiche = [
    {
      title: "Su misura",
      description: "Ogni azienda ha processi, persone e vincoli diversi.",
      icon: Target
    },
    {
      title: "Misurabile", 
      description: "Definiamo KPI prima di iniziare, li monitoriamo lungo il percorso.",
      icon: BarChart3
    },
    {
      title: "Chiavi in mano",
      description: "Strategia, implementazione, adozione e governance con un unico team.",
      icon: CheckCircle
    },
    {
      title: "Risultati rapidi",
      description: "Pilot funzionante e KPI misurabili in 30 giorni.",
      icon: Zap
    }
  ];

  const timeline = [
    {
      giorno: 30,
      fase: "Pilot",
      risultati: "1 processo critico automatizzato + dashboard KPI + manuali operativi",
      color: "text-primary"
    },
    {
      giorno: 60,
      fase: "Adoptio", 
      risultati: "Team formati, metriche di adozione stabili, riduzione errori/tempi",
      color: "text-secondary"
    },
    {
      giorno: 90,
      fase: "Scala",
      risultati: "Estensione a più reparti, governance attiva, ROI iniziale misurato",
      color: "text-primary"
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
            Il Metodo Noscite
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Non vendiamo pacchetti. Progettiamo, implementiamo e governiamo trasformazioni digitali misurabili, 
            su misura per le PMI.
          </p>
          <div className="flex justify-center">
            <Badge variant="outline" className="px-6 py-2 text-lg">
              Metodo &gt; Pacchetti
            </Badge>
          </div>
        </div>

        {/* Caratteristiche del metodo */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {caratteristiche.map((caratteristica, index) => {
            const IconComponent = caratteristica.icon;
            return (
              <Card key={caratteristica.title} className="text-center hover-lift animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                <CardContent className="p-6">
                  <IconComponent className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">{caratteristica.title}</h3>
                  <p className="text-sm text-muted-foreground">{caratteristica.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Timeline 30/60/90 giorni */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-12">Cosa ottenete in 30 / 60 / 90 giorni</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {timeline.map((milestone, index) => (
              <Card key={milestone.giorno} className="text-center hover-lift animate-slide-up" style={{ animationDelay: `${index * 150}ms` }}>
                <CardContent className="p-8">
                  <div className={`text-4xl font-bold mb-4 ${milestone.color}`}>
                    Giorno {milestone.giorno}
                  </div>
                  <h4 className="text-xl font-semibold mb-4">{milestone.fase}</h4>
                  <p className="text-muted-foreground">{milestone.risultati}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Actions */}
        <div className="text-center space-y-6">
          <h3 className="text-2xl font-bold mb-6">Pronti a iniziare?</h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="cta" size="lg" asChild>
              <Link to="/contatti">
                <Phone className="mr-2 h-5 w-5" />
                Prenota Discovery (30')
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/servizi">
                Scopri il Metodo Completo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;