import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Users, Target, Lightbulb } from "lucide-react";

const Identitas = () => {
  const values = [
    {
      icon: Target,
      title: "Humanitas",
      description: "Al centro di ogni progetto digitale ci sono le persone"
    },
    {
      icon: Lightbulb, 
      title: "Rationis Ordo",
      description: "L'ordine della ragione guida ogni nostra decisione"
    },
    {
      icon: Users,
      title: "Virtus", 
      description: "La virtù come eccellenza nel nostro operare"
    }
  ];

  return (
    <div className="min-h-screen bg-antracite">
      <SEO 
        title="Identitas - Noscite | Chi Siamo"
        description="Noscite nasce per accompagnare imprese e organizzazioni nella complessità del digitale. Humanitas, Rationis Ordo, Virtus."
        canonical="https://noscite.it/identitas"
      />
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-antracite">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl lg:text-7xl font-serif-elegant font-bold text-white mb-8">
                <span className="font-latin-italic">Identitas</span>
              </h1>
              <p className="text-xl text-grigio-chiaro leading-relaxed mb-12">
                Noscite nasce per accompagnare imprese e organizzazioni nella complessità del digitale.
              </p>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-beige">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl lg:text-4xl font-serif-elegant font-bold text-antracite mb-16 text-center">
                Valori chiave
              </h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                {values.map((value, index) => {
                  const IconComponent = value.icon;
                  return (
                    <div key={value.title} className="text-center animate-slide-up" style={{ animationDelay: `${index * 150}ms` }}>
                      <div className="w-16 h-16 bg-turchese/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <IconComponent className="h-8 w-8 text-turchese" />
                      </div>
                      <h3 className="text-2xl font-serif-elegant font-bold text-antracite mb-4 font-latin-italic">
                        {value.title}
                      </h3>
                      <p className="text-antracite/80 leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 bg-antracite">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-xl text-grigio-chiaro leading-relaxed">
                Non si tratta solo di strumenti tecnologici, ma di come trasformiamo insieme sfide in opportunità, 
                creando valore attraverso <strong className="text-white">metodo, visione e innovazione</strong>.
              </p>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Identitas;