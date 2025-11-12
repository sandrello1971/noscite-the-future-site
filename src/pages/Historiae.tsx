import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { ArrowRight, Target, Users, TrendingUp } from "lucide-react";

const Historiae = () => {
  const stories = [
    {
      title: "Exemplum I",
      subtitle: "Trasformazione dei processi interni",
      challenge: "Un'azienda manifatturiera con processi frammentati e comunicazione inefficace tra i reparti.",
      process: "Attraverso Auditio e Analytica, abbiamo mappato i flussi esistenti. Con Co-creatio abbiamo progettato una piattaforma integrata.",
      result: "40% di riduzione dei tempi di processo e miglioramento significativo della comunicazione interna.",
      icon: Target
    },
    {
      title: "Exemplum II", 
      subtitle: "Miglioramento della relazione con i clienti",
      challenge: "Una società di servizi con touchpoint digitali frammentati e bassa soddisfazione clienti.",
      process: "Revisione completa del customer journey, implementazione di soluzioni omnichannel e formazione del personale.",
      result: "Aumento del 60% della soddisfazione clienti e incremento del 35% nella fidelizzazione.",
      icon: Users
    },
    {
      title: "Exemplum III",
      subtitle: "Innovazione e crescita digitale", 
      challenge: "Startup tecnologica con necessità di scalabilità e ottimizzazione dei processi di sviluppo.",
      process: "Implementazione di metodologie agili, automazione dei processi e creazione di una cultura data-driven.",
      result: "Crescita del 200% in 18 mesi e riduzione del time-to-market del 50%.",
      icon: TrendingUp
    }
  ];

  return (
    <div className="min-h-screen bg-antracite">
      <SEO 
        title="Historiae - Noscite | Le Nostre Storie"
        description="Ogni progetto racconta un percorso di cambiamento. Scopri le storie di trasformazione: sfida, percorso, risultato."
        keywords="case study trasformazione digitale, storie successo innovazione, risultati consulenza digitale, esempi progetti AI, testimonianze PMI digitali, casi successo tecnologia"
        canonical="https://noscite.it/historiae"
      />
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-antracite">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl lg:text-7xl font-serif-elegant font-bold text-white mb-8">
                <span className="font-latin-italic">Historiae</span>
              </h1>
              <p className="text-xl text-grigio-chiaro leading-relaxed">
                Ogni progetto racconta un percorso di cambiamento. Storie di trasformazione che nascono dall'incontro tra visione e metodo.
              </p>
            </div>
          </div>
        </section>

        {/* Stories Section */}
        <section className="py-20 bg-beige">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid gap-16">
                {stories.map((story, index) => {
                  const IconComponent = story.icon;
                  
                  return (
                    <div key={story.title} className="animate-slide-up" style={{ animationDelay: `${index * 200}ms` }}>
                      <div className="bg-white rounded-xl p-8 lg:p-12 shadow-sm">
                        {/* Header */}
                        <div className="flex items-center mb-8">
                          <div className="w-16 h-16 bg-turchese rounded-full flex items-center justify-center mr-6">
                            <IconComponent className="h-8 w-8 text-white" />
                          </div>
                          <div>
                            <h2 className="text-2xl font-serif-elegant font-bold text-antracite font-latin-italic">
                              {story.title}
                            </h2>
                            <p className="text-lg text-arancio font-medium">
                              {story.subtitle}
                            </p>
                          </div>
                        </div>

                        {/* Content Grid */}
                        <div className="grid lg:grid-cols-3 gap-8">
                          {/* Challenge */}
                          <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-lg">
                            <h3 className="text-lg font-bold text-antracite mb-4 flex items-center">
                              <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                              Sfida
                            </h3>
                            <p className="text-antracite/80 leading-relaxed">
                              {story.challenge}
                            </p>
                          </div>

                          {/* Process */}
                          <div className="bg-gradient-to-br from-turchese/10 to-turchese/20 p-6 rounded-lg">
                            <h3 className="text-lg font-bold text-antracite mb-4 flex items-center">
                              <ArrowRight className="w-4 h-4 text-turchese mr-3" />
                              Percorso
                            </h3>
                            <p className="text-antracite/80 leading-relaxed">
                              {story.process}
                            </p>
                          </div>

                          {/* Result */}
                          <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg">
                            <h3 className="text-lg font-bold text-antracite mb-4 flex items-center">
                              <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                              Risultato
                            </h3>
                            <p className="text-antracite/80 leading-relaxed">
                              {story.result}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-antracite">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl lg:text-4xl font-serif-elegant font-bold text-white mb-8">
                La tua storia inizia qui
              </h2>
              <p className="text-xl text-grigio-chiaro leading-relaxed mb-12">
                Ogni trasformazione è unica. Raccontaci la tua sfida e costruiamo insieme il percorso verso il cambiamento.
              </p>
              <a 
                href="/contactus"
                className="inline-flex items-center px-8 py-4 bg-arancio text-white font-medium rounded-lg hover:bg-turchese transition-colors duration-300"
              >
                Inizia la tua storia
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Historiae;