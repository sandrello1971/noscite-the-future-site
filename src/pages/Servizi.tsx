import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Rocket, Zap, Users, Settings, ArrowRight, CheckCircle, Clock, Euro } from "lucide-react";
import { Link } from "react-router-dom";

const Servizi = () => {
  const services = [
    {
      id: "academy",
      icon: BookOpen,
      title: "AI Academy",
      subtitle: "Digital Productivity Transformation per PMI",
      description: "Percorso formativo completo di 68 ore diviso in 3 corsi sequenziali: Intelligenza Artificiale Operativa, Second Brain in Azienda e Collaborazione Intelligente. Progettato per PMI che vogliono trasformare la produttività attraverso AI, knowledge management e strumenti di collaborazione digitale.",
      duration: "6-8 mesi",
      price: "A partire da €12.000",
      features: [
        "Corso 1: IA Operativa (20h) - ChatGPT e Copilot 365",
        "Corso 2: Second Brain (24h) - Knowledge management con Obsidian",
        "Corso 3: Collaborazione Intelligente (24h) - Teams, Trello, Asana, Slack",
        "Max 12 partecipanti per corso",
        "Certificazioni: AI Productivity User, Second Brain Implementer, Collaboration Tools User",
        "Follow-up ROI a 3 mesi per ogni corso",
        "Community alumni e webinar trimestrali"
      ],
      benefits: [
        "Riduzione significativa tempo attività ripetitive",
        "Miglioramento produttività team",
        "Team autonomo e produttivo",
        "Processi digitalizzati e scalabili"
      ]
    },
    {
      id: "launchpad", 
      icon: Rocket,
      title: "AI Launchpad",
      subtitle: "Il Tuo Primo Passo nell'AI, Semplice e Rapido",
      description: "Il pacchetto perfetto per partire subito con l'Intelligenza Artificiale nella tua attività. In poche settimane scoprirai cosa può fare l'AI per te e imparerai a usarla sul campo, con risultati tangibili e immediati.",
      duration: "4-6 settimane",
      price: "Forfait accessibile",
      features: [
        "Assessment semplificato di processi e opportunità",
        "Workshop operativo (½ giornata) + Corso 1 (ChatGPT & Copilot 365)",
        "Implementazione rapida di 1 strumento AI con setup",
        "Training on the job e formazione pratica",
        "Roadmap iniziale con priorità definite",
        "Supporto remoto post-lancio: 1 mese"
      ],
      benefits: [
        "Risultati visibili in meno di 6 settimane",
        "Aumento immediato della produttività",
        "Team pronto a utilizzare l'AI in autonomia",
        "Investimento contenuto, ROI rapido"
      ]
    },
    {
      id: "sprint",
      icon: Zap,
      title: "AI Sprint", 
      subtitle: "Il Tuo Primo Progetto AI con KPI Misurabili",
      description: "Pacchetto progettuale per sviluppare un caso d'uso AI ad alto impatto. Ti accompagniamo dall'analisi alla realizzazione, formando il tuo team per garantire che la soluzione venga adottata e generi valore.",
      duration: "5-6 mesi",
      price: "Modulare (base + opzioni)",
      features: [
        "Assessment approfondito di processi e dati",
        "Scelta strategica del caso d'uso e definizione KPI",
        "Progettazione e sviluppo del pilot",
        "Formazione mirata con moduli Corso 2 e/o Corso 3",
        "Deploy, integrazione iniziale e monitoraggio",
        "Supporto operativo: 2 mesi post-avvio",
        "Opzione Fractional CIO per regia strategica"
      ],
      benefits: [
        "Output tangibile (prototipo o processo AI operativo)",
        "Adozione efficace grazie alla formazione integrata",
        "ROI e metriche chiare già dal pilot",
        "Riduzione rischi di progetti troppo estesi"
      ]
    },
    {
      id: "evolution",
      icon: Users,
      title: "AI Evolution Partner",
      subtitle: "Il Tuo Partner AI di Fiducia, Tutto l'Anno",
      description: "Programma annuale che ti affianca nella trasformazione digitale completa della tua azienda. Uniamo formazione continua, implementazione e governance strategica, grazie alla presenza del Fractional CIO.",
      duration: "Contratto annuale",
      price: "Personalizzato",
      features: [
        "Strategia AI annuale con roadmap trimestrale",
        "Formazione completa: tutti i corsi + workshop trimestrali",
        "Implementazione e ottimizzazione multiple soluzioni AI",
        "Fractional CIO incluso: governance, KPI, priorità",
        "Supporto operativo continuo e helpdesk",
        "Revisione annuale con misurazione ROI",
        "Piano evolutivo e strategia a lungo termine"
      ],
      benefits: [
        "Trasformazione digitale guidata e coerente",
        "Team formato e autonomo",
        "Ecosistema digitale integrato e scalabile",
        "ROI composto e sostenibile nel tempo"
      ]
    },
    {
      id: "cio",
      icon: Settings,
      title: "Fractional CIO",
      subtitle: "La Guida Strategica che Ti Mancava",
      description: "Il tuo Chief Information Officer a tempo parziale: un esperto che ti aiuta a prendere le decisioni giuste, pianificare investimenti e garantire che la tecnologia lavori davvero per il tuo business.",
      duration: "Flessibile",
      price: "On-demand o annuale",
      features: [
        "On-Demand: interventi spot per assessment e roadmap",
        "Light Annuale: 1 giorno/settimana o 2 mezze giornate/mese",
        "Integrato: incluso in AI Evolution Partner",
        "Governance strategica e coordinamento IT-Business",
        "Pianificazione investimenti tecnologici",
        "Revisione progetti e mitigazione rischi"
      ],
      benefits: [
        "Decisioni tecnologiche rapide e consapevoli",
        "Roadmap digitale coerente e misurabile",
        "Riduzione rischi e sprechi",
        "Coordinamento ottimale IT, AI e business"
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="gradient-hero py-20">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
              I Nostri Servizi
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Soluzioni complete e modulari per accompagnare la tua azienda nel percorso 
              di trasformazione digitale, dall'analisi iniziale all'implementazione e governance continua.
            </p>
          </div>
        </section>

        {/* Services Details */}
        <section className="py-20">
          <div className="container mx-auto px-4 lg:px-8 space-y-20">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div key={service.id} id={service.id} className="scroll-mt-20">
                  <Card className="hover-lift">
                    <CardContent className="p-0">
                      <div className="grid lg:grid-cols-2 gap-0">
                        {/* Content */}
                        <div className="p-8 lg:p-12">
                          <div className="flex items-center space-x-4 mb-6">
                            <div className="p-3 rounded-lg bg-primary/10">
                              <IconComponent className="h-8 w-8 text-primary" />
                            </div>
                            <div>
                              <h2 className="text-2xl lg:text-3xl font-bold text-foreground">
                                {service.title}
                              </h2>
                              <p className="text-lg text-primary font-medium">
                                {service.subtitle}
                              </p>
                            </div>
                          </div>
                          
                          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                            {service.description}
                          </p>

                          {/* Quick Info */}
                          <div className="grid md:grid-cols-2 gap-4 mb-8">
                            <div className="flex items-center space-x-3">
                              <Clock className="h-5 w-5 text-secondary" />
                              <span className="text-sm font-medium">{service.duration}</span>
                            </div>
                            <div className="flex items-center space-x-3">
                              <Euro className="h-5 w-5 text-secondary" />
                              <span className="text-sm font-medium">{service.price}</span>
                            </div>
                          </div>

                          <Button variant="cta" size="lg" asChild>
                            <Link to="/contatti">
                              Richiedi Informazioni
                              <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                          </Button>
                        </div>

                        {/* Features & Benefits */}
                        <div className="bg-muted/30 p-8 lg:p-12">
                          <div className="space-y-8">
                            <div>
                              <h3 className="text-xl font-semibold text-foreground mb-4">
                                Cosa Include
                              </h3>
                              <ul className="space-y-3">
                                {service.features.map((feature, featureIndex) => (
                                  <li key={featureIndex} className="flex items-start space-x-3">
                                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                                    <span className="text-muted-foreground">{feature}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            
                            <div>
                              <h3 className="text-xl font-semibold text-foreground mb-4">
                                Benefici Chiave
                              </h3>
                              <ul className="space-y-3">
                                {service.benefits.map((benefit, benefitIndex) => (
                                  <li key={benefitIndex} className="flex items-start space-x-3">
                                    <ArrowRight className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                                    <span className="text-muted-foreground font-medium">{benefit}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Pronto a Trasformare la Tua Azienda?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Contattaci per scoprire quale servizio è più adatto alle tue esigenze
            </p>
            <Button variant="secondary" size="lg" asChild>
              <Link to="/contatti">
                Contattaci
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Servizi;