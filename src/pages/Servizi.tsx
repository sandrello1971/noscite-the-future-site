import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { 
  Search, 
  FileText, 
  Settings, 
  Zap, 
  Users, 
  BarChart3,
  Shield,
  ArrowRight,
  Clock,
  Target,
  CheckCircle,
  Star,
  Calendar,
  TrendingUp,
  Lock,
  Database,
  Phone
} from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { StructuredData } from "@/components/StructuredData";
import { Breadcrumbs } from "@/components/Breadcrumbs";

const Servizi = () => {
  const location = useLocation();

  useEffect(() => {
    // Handle anchor links
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  const metodeFasi = [
    {
      numero: 1,
      nome: "Cognitio",
      sottotitolo: "Discovery & Allineamento",
      durata: "1–2 settimane",
      descrizione: "Interviste, mappatura dei flussi (mail, CRM, ticketing, documenti), inventario strumenti e dati.",
      output: [
        "Mappa processi \"as is\" e punti di attrito",
        "Backlog opportunità con priorità (valore/complessità)",
        "Baseline KPI (tempi, errori, costi)",
        "Note di rischio/compliance"
      ],
      icon: Search
    },
    {
      numero: 2,
      nome: "Diagnostica",
      sottotitolo: "Assessment & Priorità",
      durata: "1 settimana",
      descrizione: "Valutazione di maturità digitale/AI, analisi value stream, stima ROI.",
      output: [
        "Score di maturità (0–5) con gap e quick wins",
        "Business case dei primi interventi (benefici attesi, costi, rischi)"
      ],
      icon: BarChart3
    },
    {
      numero: 3,
      nome: "Design",
      sottotitolo: "Blueprint Operativo",
      durata: "1–2 settimane",
      descrizione: "Disegno dell'architettura (strumenti già in uso + eventuali integrazioni), responsabilità, governance, data flow.",
      output: [
        "Blueprint di processi \"to be\"",
        "Piano di sicurezza (MFA, ruoli, retention dati)",
        "Piano di migrazione/integrazione e roadmap 90 giorni"
      ],
      icon: FileText
    },
    {
      numero: 4,
      nome: "Experimentum",
      sottotitolo: "Pilot",
      durata: "30 giorni",
      descrizione: "Implementiamo 1–2 casi d'uso ad alto impatto (es. automazioni e-mail→CRM, ticketing, generazione documenti, dashboard operativa).",
      output: [
        "Soluzione funzionante in produzione limitata",
        "Manuali operativi e runbook",
        "KPI di adozione & performance"
      ],
      icon: Zap
    },
    {
      numero: 5,
      nome: "Adoptio",
      sottotitolo: "Adozione & Formazione",
      durata: "2–4 settimane",
      descrizione: "Formazione per ruolo (manager, operation, back office), coaching on the job, comunicazione interna.",
      output: [
        "Percorsi formativi e materiali \"pronti da usare\"",
        "Piano di change management e supporto"
      ],
      icon: Users
    },
    {
      numero: 6,
      nome: "Scala",
      sottotitolo: "Industrializzazione",
      durata: "3–4 settimane",
      descrizione: "Standardizziamo la soluzione su più reparti/filiali, automatizziamo controlli, introduciamo SLO.",
      output: [
        "Standard, checklist, monitoraggio",
        "Estensioni e integrazioni ulteriori"
      ],
      icon: TrendingUp
    },
    {
      numero: 7,
      nome: "Governantia",
      sottotitolo: "PMO & Miglioramento Continuo",
      durata: "Continuativo",
      descrizione: "Cadenza di review mensile, report KPI, backlog evolutivo, ottimizzazioni.",
      output: [
        "Report mensile con KPI/ROI",
        "Piano trimestrale di miglioramento"
      ],
      icon: Settings
    }
  ];

  const timeline = [
    {
      giorno: 30,
      fase: "Pilot",
      risultati: "1 processo critico automatizzato + dashboard KPI + manuali operativi"
    },
    {
      giorno: 60,
      fase: "Adoptio",
      risultati: "Team formati, metriche di adozione stabili, riduzione errori/tempi"
    },
    {
      giorno: 90,
      fase: "Scala",
      risultati: "Estensione a più reparti, governance attiva, ROI iniziale misurato"
    }
  ];

  const kpi = [
    "Tempo di ciclo (da richiesta a completamento)",
    "Tasso di errore e rielaborazioni",
    "Tempo di presa in carico ticket",
    "Adozione (utenti attivi, task automatizzati)",
    "ROI operativo (ore risparmiate, costi evitati)"
  ];

  const esempi = [
    {
      area: "Sales & Post-vendita",
      intervento: "e-mail strutturate → CRM + ticket automatici",
      risultato: "tempi di risposta −40%"
    },
    {
      area: "Ufficio Amministrazione",
      intervento: "generazione documenti e check automatizzati",
      risultato: "errori −60%"
    },
    {
      area: "Operations",
      intervento: "dashboard giornaliera su priorità e colli di bottiglia",
      risultato: "throughput +25%"
    }
  ];

  const faq = [
    {
      domanda: "Fate anche solo la consulenza?",
      risposta: "Sì. Possiamo limitarci ad assessment e blueprint, oppure portare l'intero progetto chiavi in mano fino alla governance."
    },
    {
      domanda: "Come calcolate il ROI?",
      risposta: "Prima del pilot fissiamo i KPI (tempi, errori, costi). Dopo 30/60/90 giorni confrontiamo i dati e stimiamo ore risparmiate/costi evitati."
    },
    {
      domanda: "Se abbiamo già strumenti in casa?",
      risposta: "Perfetto. Partiamo da lì: razionalizziamo, integriamo e impostiamo policy e automazioni."
    },
    {
      domanda: "Quanto dura un progetto?",
      risposta: "Un pilot dura ~30 giorni; il ciclo completo 90 giorni per avere risultati robusti e scalabili."
    },
    {
      domanda: "Usate pacchetti preconfezionati?",
      risposta: "No. Usiamo un metodo con fasi e deliverable chiari, adattato al vostro contesto."
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Metodo Noscite - Trasformazione Digitale per PMI",
    "description": "Metodo strutturato per la trasformazione digitale delle PMI con 7 fasi definite, dalla discovery alla governance continua.",
    "provider": {
      "@type": "Organization",
      "name": "Noscite",
      "url": "https://noscite.it"
    },
    "serviceType": "Trasformazione Digitale",
    "offers": {
      "@type": "Offer",
      "name": "Metodo Noscite",
      "description": "Trasformazione digitale chiavi in mano con KPI misurabili e ROI garantito"
    }
  };

  return (
    <div className="min-h-screen">
      <SEO 
        title="Metodo Noscite – Trasformazione Digitale Chiavi in Mano per PMI"
        description="Niente pacchetti: il Metodo Noscite guida la vostra trasformazione digitale con discovery, pilot in 30 giorni, adozione, scalabilità e governance. KPI chiari e ROI misurabile."
        keywords="metodo noscite, trasformazione digitale, PMI, discovery, pilot, ROI, KPI, governance digitale, automazione processi"
        canonical="https://noscite.it/servizi"
        structuredData={structuredData}
      />
      <StructuredData schema={structuredData} />
      <Header />
      <Breadcrumbs />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="gradient-hero py-20">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
              Il Metodo Noscite
            </h1>
            <p className="text-2xl text-primary font-semibold mb-6">
              In digitali nova virtus.
            </p>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto mb-8">
              Non vendiamo pacchetti. Progettiamo, implementiamo e governiamo trasformazioni digitali misurabili, 
              su misura per le PMI.
            </p>
            <Button variant="cta" size="lg" asChild className="mb-8">
              <Link to="/contatti">
                <Phone className="mr-2 h-5 w-5" />
                Contattaci
              </Link>
            </Button>
            <div className="flex justify-center items-center space-x-8 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Star className="h-4 w-4 text-primary mr-1" />
                +25% throughput medio
              </div>
              <div className="flex items-center">
                <Target className="h-4 w-4 text-primary mr-1" />
                KPI misurabili
              </div>
            </div>
          </div>
        </section>

        {/* Perché Metodo > Pacchetti */}
        <section className="py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-center mb-16">
              Perché metodo &gt; pacchetti
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="text-center">
                <CardContent className="p-6">
                  <Target className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Su misura</h3>
                  <p className="text-muted-foreground">Ogni azienda ha processi, persone e vincoli diversi.</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <BarChart3 className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Misurabile</h3>
                  <p className="text-muted-foreground">Definiamo KPI prima di iniziare, li monitoriamo lungo il percorso.</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <CheckCircle className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Chiavi in mano</h3>
                  <p className="text-muted-foreground">Strategia, implementazione, adozione e governance con un unico team.</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Sicuro e sostenibile</h3>
                  <p className="text-muted-foreground">Privacy, sicurezza e costi operativi sotto controllo.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Le 7 Fasi del Metodo */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-center mb-16">
              Il Metodo Noscite (7 fasi)
            </h2>
            <div className="space-y-8">
              {metodeFasi.map((fase, index) => {
                const IconComponent = fase.icon;
                return (
                  <Card key={fase.numero} className="hover-lift">
                    <CardContent className="p-8">
                      <div className="grid lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-1">
                          <div className="flex items-center space-x-4 mb-4">
                            <div className="flex items-center justify-center w-12 h-12 bg-primary text-primary-foreground rounded-full font-bold text-lg">
                              {fase.numero}
                            </div>
                            <div className="p-3 rounded-lg bg-primary/10">
                              <IconComponent className="h-8 w-8 text-primary" />
                            </div>
                          </div>
                          <h3 className="text-2xl font-bold mb-2">{fase.nome}</h3>
                          <p className="text-lg text-primary font-medium mb-2">{fase.sottotitolo}</p>
                          <Badge variant="secondary" className="mb-4">
                            <Clock className="h-4 w-4 mr-1" />
                            {fase.durata}
                          </Badge>
                          <p className="text-muted-foreground">{fase.descrizione}</p>
                        </div>
                        <div className="lg:col-span-2">
                          <h4 className="text-lg font-semibold mb-4">Output:</h4>
                          <ul className="space-y-3">
                            {fase.output.map((item, itemIndex) => (
                              <li key={itemIndex} className="flex items-start space-x-3">
                                <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                                <span className="text-muted-foreground">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Timeline 30/60/90 */}
        <section className="py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-center mb-16">
              Cosa ottenete in 30 / 60 / 90 giorni
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {timeline.map((milestone, index) => (
                <Card key={milestone.giorno} className="text-center">
                  <CardContent className="p-8">
                    <div className="text-4xl font-bold text-primary mb-4">
                      Giorno {milestone.giorno}
                    </div>
                    <h3 className="text-xl font-semibold mb-4">{milestone.fase}</h3>
                    <p className="text-muted-foreground">{milestone.risultati}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* KPI e Sicurezza */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16">
              {/* KPI */}
              <div>
                <h2 className="text-3xl font-bold mb-8">KPI che misuriamo</h2>
                <ul className="space-y-4">
                  {kpi.map((metrica, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <BarChart3 className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                      <span className="text-muted-foreground">{metrica}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Sicurezza & Compliance */}
              <div>
                <div className="flex items-center space-x-3 mb-8">
                  <Shield className="h-8 w-8 text-primary" />
                  <h2 className="text-3xl font-bold">Sicurezza & Compliance</h2>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-start space-x-3">
                    <Lock className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <span className="text-muted-foreground">MFA e gestione accessi per account critici</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Database className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <span className="text-muted-foreground">Cifratura & backup secondo le policy del cliente</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Users className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <span className="text-muted-foreground">Data governance (chi vede cosa, per quanto tempo)</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <FileText className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <span className="text-muted-foreground">Audit trail e log operativi</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Esempi di Intervento */}
        <section className="py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-center mb-16">
              Esempi di intervento (snapshots)
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {esempi.map((esempio, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-3">{esempio.area}</h3>
                    <p className="text-muted-foreground mb-4">{esempio.intervento}</p>
                    <div className="text-2xl font-bold text-primary">{esempio.risultato}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <p className="text-center text-sm text-muted-foreground mt-8">
              (Valori indicativi: i KPI reali vengono misurati sul vostro contesto.)
            </p>
          </div>
        </section>

        {/* Tecnologia */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-8">
              Tecnologia: vendor-neutral, pragmatica
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto mb-8">
              Lavoriamo sugli strumenti che avete già e integriamo dove serve (suite produttività, CRM, ticketing, 
              document management, knowledge base). Attiviamo MFA dove possibile, impostiamo ruoli e permessi 
              e definiamo policy di retention.
            </p>
            <p className="text-lg font-semibold text-primary">
              Obiettivo: zero lock-in, massima continuità operativa.
            </p>
          </div>
        </section>

        {/* Come lavoriamo insieme */}
        <section className="py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-center mb-16">
              Come lavoriamo insieme
            </h2>
            <div className="grid md:grid-cols-5 gap-4">
              {[
                "Call di scoperta (30') – capiamo obiettivi e vincoli",
                "Discovery on-site/online – mappa processi e baseline KPI",
                "Pilot – un caso d'uso ad alto impatto in 30 giorni",
                "Adozione – formazione, change, supporto",
                "Governance – PMO e miglioramento continuo"
              ].map((step, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    {index + 1}
                  </div>
                  <p className="text-sm text-muted-foreground">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-center mb-16">
              FAQ
            </h2>
            <div className="max-w-4xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                {faq.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border border-border rounded-lg px-6">
                    <AccordionTrigger className="text-left font-semibold">
                      {item.domanda}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {item.risposta}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Pronti a iniziare?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Contattateci per allineare obiettivi, priorità e KPI del vostro progetto.
              Preferite partire da un assessment? Vi consegniamo Blueprint + Roadmap 90 giorni.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg" asChild>
                <Link to="/contatti">
                  <Phone className="mr-2 h-5 w-5" />
                  Contattaci
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                <Link to="/contatti">
                  Richiedi Assessment
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Servizi;