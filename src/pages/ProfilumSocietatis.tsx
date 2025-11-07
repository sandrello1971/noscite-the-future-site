import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { StructuredData } from "@/components/StructuredData";
import { Breadcrumbs } from "@/components/Breadcrumbs";

const ProfilumSocietatis = () => {
  const areeIntervento = [
    {
      title: "AI Process Automation",
      description: "Automazione intelligente di task e workflow ripetitivi."
    },
    {
      title: "Knowledge Management Hub",
      description: "Costruzione di sistemi di gestione e diffusione della conoscenza."
    },
    {
      title: "Private AI & Governance dei dati",
      description: "Implementazione sicura e conforme delle tecnologie AI in azienda."
    },
    {
      title: "Vibe Coding",
      description: "Sviluppo assistito da AI per la creazione rapida di strumenti e prototipi operativi."
    }
  ];

  const programmiFormazione = [
    {
      title: "Initium",
      subtitle: "Fondamenta AI Operativa",
      description: "Comprendere e utilizzare l'AI generativa per la produttività e la gestione sicura dei dati."
    },
    {
      title: "Structura",
      subtitle: "Second Brain Aziendale",
      description: "Implementare sistemi di knowledge management con approccio AI-driven."
    },
    {
      title: "Communitas",
      subtitle: "Collaborazione Intelligente",
      description: "Ottimizzare comunicazione e governance interna con strumenti digitali e assistenti AI."
    }
  ];

  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "Profilum Societatis - Company Profile Noscite",
    "description": "Noscite è una startup innovativa che accompagna le imprese nella trasformazione digitale consapevole, integrando l'intelligenza artificiale come leva di crescita.",
    "mainEntity": {
      "@type": "Organization",
      "name": "Noscite",
      "description": "Startup innovativa per la trasformazione digitale delle PMI attraverso AI, formazione e governance."
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Profilum Societatis | Company Profile Noscite"
        description="Noscite è una startup innovativa che accompagna le imprese nella trasformazione digitale consapevole, integrando l'intelligenza artificiale come leva di crescita."
        keywords="company profile, chi siamo, startup innovativa, trasformazione digitale, AI per PMI, accompagnamento digitale"
        canonical="https://noscite.it/profilum-societatis"
        structuredData={aboutSchema}
      />
      <StructuredData schema={aboutSchema} />
      <Header />
      <Breadcrumbs />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-primary">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl lg:text-7xl font-serif-elegant font-bold text-white mb-8">
                <span className="font-latin-italic">Profilum Societatis</span>
              </h1>
              <p className="text-2xl text-white font-medium mb-8">
                Company Profile
              </p>
            </div>
          </div>
        </section>

        {/* Chi Siamo */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <p className="text-xl text-foreground leading-relaxed mb-6">
                Noscite è una startup innovativa che accompagna le imprese nella trasformazione digitale consapevole, integrando l'intelligenza artificiale come leva di crescita e miglioramento continuo. Crediamo in un approccio collaborativo e formativo, in cui l'AI diventa uno strumento al servizio delle persone e dei processi, non una loro sostituzione.
              </p>
              <p className="text-xl text-foreground leading-relaxed">
                Il nostro obiettivo è aiutare le aziende a comprendere, adottare e governare l'AI in modo strategico: dall'analisi dei flussi operativi alla costruzione di competenze interne, per una trasformazione che sia sostenibile, efficace e misurabile.
              </p>
            </div>
          </div>
        </section>

        {/* Accompagnamento */}
        <section className="py-20 bg-beige">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl lg:text-4xl font-serif-elegant font-bold text-foreground mb-8">
                Accompagnamento alla trasformazione digitale
              </h2>
              <p className="text-lg text-foreground leading-relaxed">
                Il percorso Noscite parte sempre da un'analisi condivisa dei processi aziendali, per individuare i punti in cui l'intelligenza artificiale può generare il massimo valore. A differenza di un semplice servizio di consulenza, Noscite si propone come partner di accompagnamento: progetta insieme al cliente le fasi di evoluzione digitale, ne supporta la realizzazione e ne misura l'impatto nel tempo.
              </p>
            </div>
          </div>
        </section>

        {/* Aree di Intervento */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl lg:text-4xl font-serif-elegant font-bold text-foreground mb-12 text-center">
                Le nostre aree di intervento
              </h2>
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                {areeIntervento.map((area, index) => (
                  <div 
                    key={area.title}
                    className="bg-secondary p-8 rounded-xl animate-slide-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <h3 className="text-xl font-bold text-white mb-4">
                      {area.title}
                    </h3>
                    <p className="text-white/90 leading-relaxed">
                      {area.description}
                    </p>
                  </div>
                ))}
              </div>
              <p className="text-lg text-foreground text-center max-w-4xl mx-auto">
                Ogni progetto è accompagnato da formazione e mentoring dedicati, affinché i team possano diventare autonomi e consapevoli nell'uso degli strumenti AI.
              </p>
            </div>
          </div>
        </section>

        {/* Modello di Intervento */}
        <section className="py-20 bg-primary">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl lg:text-4xl font-serif-elegant font-bold text-white mb-8 text-center">
                Modello di intervento
              </h2>
              <div className="space-y-6 text-white/90">
                <p className="text-lg leading-relaxed">
                  Il modello di intervento Noscite si fonda su tre pilastri tecnologici — <strong className="text-white">Cloud, API e AI</strong> — che rappresentano la base per una trasformazione digitale sostenibile e scalabile.
                </p>
                <p className="text-lg leading-relaxed">
                  Partendo da queste fondamenta, Noscite adotta un approccio interoperabile e modulare, volto a integrare eventuali soluzioni SaaS già presenti in azienda e a sviluppare un ecosistema connesso tra piattaforme, processi e persone.
                </p>
                <p className="text-lg leading-relaxed">
                  Attraverso l'uso di API aperte e standardizzate, viene costruita un'architettura digitale che favorisce la comunicazione tra sistemi eterogenei, riducendo la duplicazione dei dati e semplificando le attività quotidiane.
                </p>
                <p className="text-lg leading-relaxed">
                  L'intelligenza artificiale diventa quindi un motore di efficienza, capace di analizzare i flussi, suggerire automazioni e migliorare la qualità decisionale.
                </p>
                <p className="text-lg leading-relaxed">
                  Questo approccio integrato consente alle imprese di ottenere valore immediato dalle tecnologie esistenti, accelerando al contempo la modernizzazione infrastrutturale e creando un ambiente digitale fluido, sicuro e orientato ai risultati.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Formazione */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl lg:text-4xl font-serif-elegant font-bold text-foreground mb-6 text-center">
                Formazione
              </h2>
              <p className="text-lg text-foreground leading-relaxed mb-12 max-w-4xl mx-auto text-center">
                La formazione Noscite nasce per trasformare la conoscenza in competenza operativa. Attraverso percorsi modulari e interattivi, guidiamo le persone a comprendere a fondo le potenzialità dell'intelligenza artificiale, a valutarne i rischi e ad adottarla in modo etico e strategico.
              </p>
              
              <div className="grid md:grid-cols-3 gap-8 mb-12">
                {programmiFormazione.map((programma, index) => (
                  <div 
                    key={programma.title}
                    className="bg-beige p-8 rounded-xl animate-slide-up text-center"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <h3 className="text-2xl font-bold text-secondary mb-2">
                      {programma.title}
                    </h3>
                    <h4 className="text-lg font-semibold text-foreground mb-4">
                      {programma.subtitle}
                    </h4>
                    <p className="text-foreground/80 leading-relaxed">
                      {programma.description}
                    </p>
                  </div>
                ))}
              </div>

              <p className="text-lg text-foreground text-center max-w-4xl mx-auto">
                Tutti i percorsi seguono la filosofia <em className="font-semibold">learning by doing</em> e sono costruiti su casi reali, per garantire immediata applicabilità nei processi aziendali.
              </p>
            </div>
          </div>
        </section>

        {/* Visione */}
        <section className="py-20 bg-secondary">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl lg:text-4xl font-serif-elegant font-bold text-white mb-8">
                Visione
              </h2>
              <div className="space-y-6 text-white/90">
                <p className="text-xl leading-relaxed">
                  L'intelligenza artificiale non sostituisce la persona: la potenzia. Noscite promuove un modello di innovazione centrato sull'essere umano, dove la tecnologia amplifica le capacità, libera tempo per il pensiero critico e rafforza la qualità del lavoro e delle relazioni.
                </p>
                <p className="text-xl leading-relaxed">
                  Il nostro impegno è costruire organizzazioni più consapevoli, agili e resilienti, in cui l'AI diventa un alleato per la crescita collettiva.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProfilumSocietatis;
