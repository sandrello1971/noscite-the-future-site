import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { StructuredData } from "@/components/StructuredData";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Users, Target, Lightbulb, ArrowRight, Heart, Brain, Zap } from "lucide-react";

const Identitas = () => {
  const teamValues = [
    {
      icon: Heart,
      title: "Humanitas",
      subtitle: "Le persone al centro",
      description: "Ogni trasformazione digitale inizia dalle persone. Crediamo che la tecnologia debba servire l'umanità, non dominarla. Per questo mettiamo sempre al centro del nostro lavoro le esigenze, le aspirazioni e il benessere delle persone che vivono il cambiamento."
    },
    {
      icon: Brain,
      title: "Rationis Ordo", 
      subtitle: "L'ordine della ragione",
      description: "Approccio metodico e razionale ad ogni sfida. Non improvvisiamo: ogni nostra azione è guidata da analisi approfondite, dati concreti e una strategia chiara. L'ordine della ragione è la bussola che orienta le nostre scelte."
    },
    {
      icon: Zap,
      title: "Virtus",
      subtitle: "L'eccellenza nell'agire", 
      description: "La virtù come ricerca continua dell'eccellenza. Non ci accontentiamo del 'buono abbastanza': puntiamo sempre al risultato migliore possibile, con integrità, passione e dedizione assoluta verso i nostri partner."
    }
  ];

  const teamMembers = [
    {
      name: "Marco Fondatore",
      role: "CEO & Digital Strategist", 
      description: "15+ anni nell'innovazione digitale. Filosofia antica, visione contemporanea.",
      expertise: ["Digital Strategy", "AI Implementation", "Change Management"]
    },
    {
      name: "Laura Technologia",
      role: "CTO & AI Specialist",
      description: "Esperta in intelligenza artificiale e architetture digitali scalabili.",
      expertise: ["Machine Learning", "Cloud Architecture", "Data Science"]
    },
    {
      name: "Alessandro Consultans", 
      role: "Senior Consultant",
      description: "Specialista in trasformazione dei processi aziendali e adoption digitale.",
      expertise: ["Process Optimization", "Training & Adoption", "Project Management"]
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Noscite",
    "description": "Noscite accompagna imprese e organizzazioni nella complessità del digitale con approccio umano-centrico",
    "url": "https://noscite.it",
    "logo": "https://noscite.it/logo.png",
    "foundingDate": "2024",
    "employees": "3-10",
    "knowsAbout": [
      "Trasformazione Digitale",
      "Intelligenza Artificiale", 
      "Consulenza Strategica",
      "Change Management"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Servizi Noscite",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Metodo Noscite",
            "description": "Trasformazione digitale strutturata per PMI"
          }
        }
      ]
    }
  };

  return (
    <div className="min-h-screen">
      <SEO 
        title="Identitas - Chi Siamo | Noscite - Il Team di Esperti Digitali"
        description="Scopri il team Noscite: Humanitas, Rationis Ordo, Virtus. Esperti in trasformazione digitale che mettono le persone al centro dell'innovazione tecnologica."
        keywords="chi siamo noscite, team esperti digitali, humanitas rationis ordo virtus, consulenti trasformazione digitale, filosofia aziendale"
        canonical="https://noscite.it/identitas"
        structuredData={structuredData}
      />
      <StructuredData schema={structuredData} />
      <Header />
      <Breadcrumbs />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-antracite">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl lg:text-7xl font-serif-elegant font-bold text-white mb-8">
                <span className="font-latin-italic">Identitas</span>
              </h1>
              <p className="text-2xl text-arancio font-latin-italic mb-8">
                In digitali nova virtus
              </p>
              <p className="text-xl text-grigio-chiaro leading-relaxed max-w-3xl mx-auto">
                Noscite nasce per accompagnare imprese e organizzazioni nella complessità del digitale. 
                Non siamo semplici consulenti: siamo partner di trasformazione che credono nel potere 
                dell'innovazione umano-centrica.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 gradient-hero">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-serif-elegant font-bold text-antracite mb-6">
                  La Nostra Missione
                </h2>
                <p className="text-xl text-antracite/80 leading-relaxed max-w-4xl mx-auto">
                  Trasformare la complessità del digitale in opportunità concrete, 
                  guidati da tre principi fondamentali che ispirano ogni nostro progetto.
                </p>
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                {teamValues.map((value, index) => {
                  const IconComponent = value.icon;
                  
                  return (
                    <div 
                      key={value.title}
                      className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
                    >
                      <div className="w-16 h-16 bg-turchese/10 rounded-full flex items-center justify-center mb-6 mx-auto">
                        <IconComponent className="h-8 w-8 text-turchese" />
                      </div>
                      
                      <h3 className="text-2xl font-serif-elegant font-bold text-antracite mb-2 text-center font-latin-italic">
                        {value.title}
                      </h3>
                      
                      <p className="text-lg text-arancio font-medium text-center mb-4">
                        {value.subtitle}
                      </p>
                      
                      <p className="text-antracite/80 leading-relaxed text-center">
                        {value.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-beige">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-serif-elegant font-bold text-antracite mb-6">
                  Il Nostro Team
                </h2>
                <p className="text-xl text-antracite/80 leading-relaxed max-w-4xl mx-auto">
                  Un gruppo di professionisti accomunati dalla passione per l'innovazione 
                  e dalla convinzione che il futuro si costruisce insieme.
                </p>
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                {teamMembers.map((member, index) => (
                  <div 
                    key={member.name}
                    className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300 text-center"
                  >
                    <div className="w-24 h-24 bg-gradient-to-br from-turchese to-arancio rounded-full mx-auto mb-6 flex items-center justify-center">
                      <span className="text-2xl font-bold text-white">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-antracite mb-2">
                      {member.name}
                    </h3>
                    
                    <p className="text-arancio font-medium mb-4">
                      {member.role}
                    </p>
                    
                    <p className="text-antracite/80 leading-relaxed mb-6">
                      {member.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 justify-center">
                      {member.expertise.map((skill) => (
                        <span 
                          key={skill}
                          className="px-3 py-1 bg-turchese/10 text-turchese text-sm font-medium rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Approach Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div>
                  <h2 className="text-3xl lg:text-4xl font-serif-elegant font-bold text-antracite mb-8">
                    Il Nostro Approccio
                  </h2>
                  
                  <div className="space-y-8">
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-turchese/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0 mt-1">
                        <span className="text-lg font-bold text-turchese">1</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-antracite mb-2">Ascoltiamo</h3>
                        <p className="text-antracite/80 leading-relaxed">
                          Prima di proporre soluzioni, comprendiamo profondamente le vostre sfide, 
                          i vostri obiettivi e il contesto in cui operate.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-arancio/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0 mt-1">
                        <span className="text-lg font-bold text-arancio">2</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-antracite mb-2">Progettiamo</h3>
                        <p className="text-antracite/80 leading-relaxed">
                          Costruiamo insieme una strategia su misura, bilanciando innovazione tecnologica 
                          e sostenibilità organizzativa.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-turchese/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0 mt-1">
                        <span className="text-lg font-bold text-turchese">3</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-antracite mb-2">Trasformiamo</h3>
                        <p className="text-antracite/80 leading-relaxed">
                          Accompagniamo l'implementazione step by step, garantendo che ogni cambiamento 
                          sia ben accolto e pienamente integrato.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-turchese/10 to-arancio/10 rounded-2xl p-8 lg:p-12">
                  <blockquote className="text-center">
                    <p className="text-xl lg:text-2xl text-antracite leading-relaxed mb-6 font-latin-italic">
                      "La vera innovazione non sta nella tecnologia, 
                      ma nella capacità di utilizzarla per creare valore autentico."
                    </p>
                    <footer className="text-arancio font-medium">
                      — Filosofia Noscite
                    </footer>
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-antracite">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl lg:text-4xl font-serif-elegant font-bold text-white mb-8">
                Iniziamo Insieme un Nuovo Percorso
              </h2>
              <p className="text-xl text-grigio-chiaro leading-relaxed mb-12">
                Ogni grande trasformazione inizia con una conversazione. 
                Raccontaci la tua vision e scopriamo insieme come realizzarla.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/contactus"
                  className="inline-flex items-center justify-center px-8 py-4 bg-arancio text-white font-medium rounded-lg hover:bg-turchese transition-colors duration-300"
                >
                  Conosciamoci
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
                <a 
                  href="/servizi"
                  className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white text-white font-medium rounded-lg hover:bg-white hover:text-antracite transition-colors duration-300"
                >
                  Scopri il Metodo Noscite
                  <Target className="ml-2 h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Identitas;
