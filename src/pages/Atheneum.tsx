import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Lightbulb, Users, Target, ArrowRight, BookOpen } from "lucide-react";

const Atheneum = () => {
  const percorsi = [
    {
      icon: Lightbulb,
      title: "Innovatio",
      subtitle: "Tecnologie emergenti", 
      description: "Esploriamo insieme le frontiere dell'innovazione tecnologica, dalle AI generative alle blockchain, dall'IoT alla realtà aumentata. Non solo strumenti, ma comprensione profonda del loro impatto strategico.",
      focus: ["Intelligenza Artificiale", "Blockchain & Web3", "IoT e Smart Systems", "Extended Reality"]
    },
    {
      icon: Target,
      title: "Strategia", 
      subtitle: "Pensiero e visione",
      description: "La strategia digitale non è solo tecnologia, ma visione sistemica. Sviluppiamo insieme la capacità di leggere i cambiamenti, anticipare le tendenze e costruire roadmap sostenibili.",
      focus: ["Digital Strategy", "Innovation Management", "Change Management", "Future Thinking"]
    },
    {
      icon: Users,
      title: "Humanitas",
      subtitle: "Impatto sulle persone",
      description: "Il digitale trasforma le organizzazioni, ma sono le persone che guidano il cambiamento. Esploriamo l'impatto umano della tecnologia e come costruire culture digitali inclusive.",
      focus: ["Digital Culture", "Leadership Digitale", "User Experience", "Organizational Design"]
    }
  ];

  return (
    <div className="min-h-screen bg-beige">
      <SEO 
        title="Atheneum - Noscite | Percorsi di Conoscenza"
        description="Scientia potentia est. L'Atheneum di Noscite è lo spazio dove sapere e pratica si incontrano. Percorsi di apprendimento: Innovatio, Strategia, Humanitas."
        canonical="https://noscite.it/atheneum"
      />
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-antracite">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl lg:text-7xl font-serif-elegant font-bold text-white mb-8">
                <span className="font-latin-italic">Atheneum</span>
              </h1>
              <p className="text-2xl text-arancio font-latin-italic mb-6">
                Scientia potentia est
              </p>
              <p className="text-xl text-grigio-chiaro leading-relaxed">
                La conoscenza è potere, soprattutto quando condivisa. L'Atheneum di Noscite è lo spazio dove sapere e pratica si incontrano.
              </p>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-16 bg-beige">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-lg text-antracite leading-relaxed mb-8">
                Non una lista di servizi, ma <strong>percorsi di apprendimento e trasformazione</strong>, 
                pensati per accompagnare le organizzazioni nella comprensione del digitale e dei suoi impatti.
              </p>
              <div className="flex justify-center">
                <BookOpen className="h-12 w-12 text-turchese/60" />
              </div>
            </div>
          </div>
        </section>

        {/* Percorsi Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl lg:text-4xl font-serif-elegant font-bold text-antracite mb-16 text-center">
                Percorsi tematici
              </h2>
              
              <div className="grid gap-12">
                {percorsi.map((percorso, index) => {
                  const IconComponent = percorso.icon;
                  
                  return (
                    <div key={percorso.title} className="animate-slide-up" style={{ animationDelay: `${index * 200}ms` }}>
                      <div className="bg-beige rounded-xl p-8 lg:p-12 hover:shadow-lg transition-all duration-300 group">
                        {/* Header */}
                        <div className="flex items-start mb-8">
                          <div className="w-16 h-16 bg-turchese rounded-full flex items-center justify-center mr-6 group-hover:bg-arancio transition-colors duration-300">
                            <IconComponent className="h-8 w-8 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-3xl font-serif-elegant font-bold text-antracite font-latin-italic mb-2 group-hover:text-arancio transition-colors duration-300">
                              {percorso.title}
                            </h3>
                            <p className="text-xl text-turchese font-medium mb-4">
                              {percorso.subtitle}
                            </p>
                            <p className="text-antracite/80 leading-relaxed text-lg">
                              {percorso.description}
                            </p>
                          </div>
                        </div>

                        {/* Focus Areas */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                          {percorso.focus.map((area, idx) => (
                            <div key={idx} className="bg-white px-4 py-3 rounded-lg text-center">
                              <span className="text-antracite font-medium text-sm">{area}</span>
                            </div>
                          ))}
                        </div>

                        {/* CTA */}
                        <div className="flex justify-end">
                          <button className="inline-flex items-center px-6 py-3 text-turchese font-medium hover:text-arancio transition-colors duration-300 group">
                            Esplora il percorso
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="py-20 bg-beige">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-white p-12 rounded-xl">
                <h2 className="text-2xl font-serif-elegant font-bold text-antracite mb-8">
                  La nostra filosofia
                </h2>
                <div className="space-y-6 text-lg text-antracite/80 leading-relaxed">
                  <p><em>Atheneum è la casa del sapere digitale.</em></p>
                  <p><em>Ogni percorso è un invito a riflettere e a trasformare.</em></p>
                  <p><strong>Conoscenza, metodo, visione:</strong> le tre virtù che guidano la nostra formazione.</p>
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
                Inizia il tuo percorso di conoscenza
              </h2>
              <p className="text-xl text-grigio-chiaro leading-relaxed mb-12">
                La trasformazione digitale inizia dalla comprensione. Costruiamo insieme il percorso più adatto alle tue esigenze.
              </p>
              <a 
                href="/contactus"
                className="inline-flex items-center px-8 py-4 bg-arancio text-white font-medium rounded-lg hover:bg-turchese transition-colors duration-300"
              >
                Contattaci
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

export default Atheneum;