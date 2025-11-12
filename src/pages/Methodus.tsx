import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Ear, Search, Users, Rocket, TrendingUp } from "lucide-react";

const Methodus = () => {
  const steps = [
    {
      icon: Ear,
      title: "Auditio",
      subtitle: "Ascolto",
      description: "Comprendiamo il contesto, le sfide e gli obiettivi attraverso un ascolto attivo e profondo."
    },
    {
      icon: Search,
      title: "Analytica", 
      subtitle: "Analisi",
      description: "Analizziamo dati, processi e opportunità per costruire una visione chiara del percorso."
    },
    {
      icon: Users,
      title: "Co-creatio",
      subtitle: "Progettazione condivisa", 
      description: "Progettiamo insieme soluzioni che nascono dalla collaborazione e dalla condivisione di competenze."
    },
    {
      icon: Rocket,
      title: "Implementatio",
      subtitle: "Realizzazione",
      description: "Realizziamo con metodo e precisione, trasformando la strategia in risultati concreti."
    },
    {
      icon: TrendingUp,
      title: "Evolutio",
      subtitle: "Miglioramento continuo",
      description: "Monitoriamo, valutiamo e miglioriamo costantemente per garantire un'evoluzione duratura."
    }
  ];

  return (
    <div className="min-h-screen bg-antracite">
      <SEO 
        title="Methodus - Noscite | Il Nostro Metodo"
        description="Il nostro approccio in 5 fasi: Auditio, Analytica, Co-creatio, Implementatio, Evolutio. Un percorso strutturato verso la trasformazione digitale."
        keywords="metodologia trasformazione digitale, approccio consulenza innovazione, Auditio Analytica, metodo strutturato digitale, processo innovazione PMI, consulenza metodo digitale, framework trasformazione"
        canonical="https://noscite.it/methodus"
      />
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-antracite">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl lg:text-7xl font-serif-elegant font-bold text-white mb-8">
                <span className="font-latin-italic">Methodus</span>
              </h1>
              <p className="text-xl text-grigio-chiaro leading-relaxed">
                Il nostro approccio segue cinque momenti essenziali per accompagnarti nella trasformazione digitale.
              </p>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-20 bg-beige">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-1/2 transform -translate-x-0.5 w-1 h-full bg-turchese/30 hidden lg:block"></div>
                
                {steps.map((step, index) => {
                  const IconComponent = step.icon;
                  const isEven = index % 2 === 0;
                  
                  return (
                    <div key={step.title} className={`relative flex items-center mb-16 lg:mb-24 ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                      {/* Timeline Circle */}
                      <div className="absolute left-1/2 transform -translate-x-1/2 w-16 h-16 bg-turchese rounded-full flex items-center justify-center z-10 hidden lg:flex">
                        <IconComponent className="h-8 w-8 text-white" />
                      </div>
                      
                      {/* Content */}
                      <div className={`lg:w-1/2 ${isEven ? 'lg:pr-16' : 'lg:pl-16'} animate-slide-up`} style={{ animationDelay: `${index * 200}ms` }}>
                        <div className="bg-white p-8 rounded-lg shadow-sm">
                          <div className="flex items-center mb-4 lg:hidden">
                            <div className="w-12 h-12 bg-turchese rounded-full flex items-center justify-center mr-4">
                              <IconComponent className="h-6 w-6 text-white" />
                            </div>
                            <div className="text-2xl font-bold text-arancio">0{index + 1}</div>
                          </div>
                          
                          <h3 className="text-2xl font-serif-elegant font-bold text-antracite mb-2 font-latin-italic">
                            {step.title}
                          </h3>
                          <h4 className="text-lg font-medium text-turchese mb-4">
                            {step.subtitle}
                          </h4>
                          <p className="text-antracite/80 leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </div>
                      
                      {/* Step Number (desktop only) */}
                      <div className={`lg:w-1/2 hidden lg:flex ${isEven ? 'justify-start pl-16' : 'justify-end pr-16'}`}>
                        <div className="text-8xl font-bold text-turchese/20">
                          0{index + 1}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Methodus;