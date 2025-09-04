import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Target, Award, Lightbulb } from "lucide-react";

const ChiSiamo = () => {
  const team = [
    {
      name: "Marco Tecnologia",
      role: "CEO & Founder",
      bio: "Esperto in trasformazione digitale con 15 anni di esperienza nel settore tech.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
    },
    {
      name: "Laura AI",
      role: "CTO & AI Specialist", 
      bio: "PhD in Machine Learning, ex-Google. Leader nell'implementazione di soluzioni AI enterprise.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=400&h=400&fit=crop&crop=face"
    },
    {
      name: "Giuseppe Strategia",
      role: "Chief Strategy Officer",
      bio: "Ex-consulente McKinsey, specializzato in digital transformation e change management.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face"
    }
  ];

  const stats = [
    { icon: Users, label: "Team di Esperti", value: "10+" },
    { icon: Award, label: "Progetti Innovativi", value: "Molti" },
    { icon: Target, label: "Focus Cliente", value: "100%" },
    { icon: Lightbulb, label: "Anni di Esperienza", value: "15+" }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="gradient-hero py-20">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
              Chi Siamo
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Siamo un team di esperti appassionati di tecnologia e innovazione, 
              dedicati a guidare le aziende verso il futuro digitale.
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-foreground">La Nostra Mission</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Crediamo che ogni azienda abbia il potenziale per trasformarsi attraverso la tecnologia. 
                  La nostra missione è rendere l'intelligenza artificiale accessibile e implementabile, 
                  accompagnando le organizzazioni in un percorso di crescita sostenibile e misurabile.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Non ci limitiamo a fornire consulenza: creiamo partnership durature che portano 
                  a risultati concreti e alla crescita delle competenze interne.
                </p>
              </div>
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-foreground">La Nostra Vision</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Immaginiamo un futuro dove ogni azienda italiana sia leader nell'innovazione digitale, 
                  capace di competere a livello globale grazie all'utilizzo intelligente della tecnologia.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Vogliamo essere il catalizzatore di questa trasformazione, creando un ecosistema 
                  di eccellenza dove conoscenza, tecnologia e visione strategica si incontrano.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <Card key={stat.label} className="text-center hover-lift">
                    <CardContent className="p-8">
                      <IconComponent className="h-12 w-12 text-primary mx-auto mb-4" />
                      <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
                      <div className="text-muted-foreground">{stat.label}</div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
                Il Nostro Team
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Un team multidisciplinare di esperti uniti dalla passione per l'innovazione 
                e dalla volontà di creare valore concreto per i nostri clienti.
              </p>
            </div>

            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">
                Presto presenteremo il nostro team di esperti.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ChiSiamo;