import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Sparkles, Lightbulb, Handshake } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";

const Valor = () => {
  const values = [
    {
      icon: Sparkles,
      title: "Unicitas",
      subtitle: "Personalizzazione assoluta",
      description: "Ogni progetto è unico come l'organizzazione che lo esprime. Non esistono soluzioni preconfezionate, ma percorsi su misura che rispettano identità, cultura e obiettivi specifici."
    },
    {
      icon: Lightbulb, 
      title: "Innovatio",
      subtitle: "Ricerca e sperimentazione",
      description: "L'innovazione nasce dalla curiosità e dal coraggio di esplorare nuove strade. Integriamo tecnologie emergenti con saggezza antica, creando soluzioni che guardano al futuro."
    },
    {
      icon: Handshake,
      title: "Societas", 
      subtitle: "Partnership durature",
      description: "Non forniamo solo servizi, costruiamo relazioni. La fiducia reciproca e la collaborazione continua sono i pilastri su cui edificare trasformazioni che durano nel tempo."
    }
  ];

  const valorSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Valor - I Nostri Valori",
    "description": "I valori che guidano Noscite: Unicitas, Innovatio, Societas. Personalizzazione, innovazione e partnership durature.",
    "mainEntity": {
      "@type": "Organization",
      "name": "Noscite",
      "values": ["Unicitas - Personalizzazione assoluta", "Innovatio - Ricerca e sperimentazione", "Societas - Partnership durature"]
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title="Valor | I Nostri Valori - Unicitas, Innovatio, Societas"
        description="I valori che ci distinguono: Unicitas (personalizzazione), Innovatio (ricerca), Societas (partnership). Trasformiamo insieme sfide in opportunità."
        keywords="valori aziendali, unicitas, innovatio, societas, personalizzazione, innovazione, partnership, trasformazione digitale"
        canonical="https://noscite.it/valor"
        structuredData={valorSchema}
      />
      <Header />
      <Breadcrumbs />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-antracite">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl lg:text-7xl font-serif-elegant font-bold text-white mb-8">
                <span className="font-latin-italic">Valor</span>
              </h1>
              <p className="text-xl text-grigio-chiaro leading-relaxed">
                Il nostro valore è fatto di principi che ci distinguono e ci guidano in ogni progetto.
              </p>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid gap-16">
                {values.map((value, index) => {
                  const IconComponent = value.icon;
                  const isEven = index % 2 === 0;
                  
                  return (
                    <div key={value.title} className={`grid lg:grid-cols-2 gap-12 items-center ${!isEven ? 'lg:grid-flow-col-dense' : ''}`}>
                      {/* Content */}
                      <div className={`animate-slide-up ${!isEven ? 'lg:col-start-2' : ''}`} style={{ animationDelay: `${index * 200}ms` }}>
                        <div className="flex items-center mb-6">
                          <div className="w-16 h-16 bg-turchese/10 rounded-full flex items-center justify-center mr-4">
                            <IconComponent className="h-8 w-8 text-turchese" />
                          </div>
                          <h2 className="text-3xl lg:text-4xl font-serif-elegant font-bold text-antracite font-latin-italic">
                            {value.title}
                          </h2>
                        </div>
                        
                        <h3 className="text-xl font-medium text-arancio mb-6">
                          {value.subtitle}
                        </h3>
                        
                        <p className="text-lg text-antracite/80 leading-relaxed">
                          {value.description}
                        </p>
                      </div>
                      
                      {/* Visual Element */}
                      <div className={`${!isEven ? 'lg:col-start-1' : ''} animate-fade-in`} style={{ animationDelay: `${index * 200 + 100}ms` }}>
                        <div className="aspect-square bg-gradient-to-br from-turchese/10 to-arancio/10 rounded-2xl flex items-center justify-center">
                          <IconComponent className="h-24 w-24 text-turchese/40" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Bottom Section */}
        <section className="py-20 bg-beige">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-xl text-antracite leading-relaxed">
                Non si tratta solo di strumenti, ma di <strong>come trasformiamo insieme sfide in opportunità</strong>, 
                creando valore attraverso relazioni autentiche e risultati duraturi.
              </p>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Valor;