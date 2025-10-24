import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Mail, Phone, MapPin, Linkedin, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Contactus = () => {
  const contatti = [
    {
      icon: Mail,
      label: "Email",
      value: "info@noscite.it",
      href: "mailto:info@noscite.it"
    },
    {
      icon: Phone,
      label: "Telefono", 
      value: "+39 347 6859 801",
      href: "tel:+3934769859801"
    },
    {
      icon: MapPin,
      label: "Indirizzo",
      value: " Via Monte Grappa 13, Corsico (MI)",
      href: "https://maps.google.com"
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "linkedin.com/company/noscite",
      href: "https://linkedin.com/company/noscite"
    }
  ];

  return (
    <div className="min-h-screen bg-antracite">
      <SEO 
        title="Contactus - Noscite | Contatti"
        description="Ogni trasformazione inizia da un dialogo. Contattaci per iniziare il tuo percorso di trasformazione digitale."
        canonical="https://noscite.it/contactus"
      />
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-antracite">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl lg:text-7xl font-serif-elegant font-bold text-white mb-8">
                <span className="font-latin-italic">Contactus</span>
              </h1>
              <p className="text-2xl text-arancio font-medium mb-8">
                Ogni trasformazione inizia da un dialogo
              </p>
              <p className="text-xl text-grigio-chiaro leading-relaxed">
                Raccontaci la tua sfida, ascoltiamo la tua visione. Insieme costruiremo il percorso verso il cambiamento.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Info Section */}
        <section className="py-20 bg-primary">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-6">
                {contatti.map((contatto, index) => {
                  const IconComponent = contatto.icon;
                  const content = (
                    <Card className="bg-secondary backdrop-blur-sm border-secondary hover-lift animate-slide-up h-full" style={{ animationDelay: `${index * 100}ms` }}>
                      <CardContent className="p-6 text-center">
                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                          <IconComponent className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="font-semibold text-white mb-2">{contatto.label}</h3>
                        <p className="text-white/90 whitespace-pre-line">{contatto.value}</p>
                      </CardContent>
                    </Card>
                  );

                  return contatto.href ? (
                    <a key={contatto.label} href={contatto.href} className="block">
                      {content}
                    </a>
                  ) : (
                    <div key={contatto.label}>
                      {content}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl lg:text-4xl font-serif-elegant font-bold text-antracite mb-12">
                Il nostro approccio
              </h2>
              
              <div className="grid md:grid-cols-3 gap-8 mb-16">
                <div className="text-center">
                  <div className="w-16 h-16 bg-turchese/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl font-bold text-turchese">1</span>
                  </div>
                  <h3 className="text-xl font-bold text-antracite mb-4">Ascoltiamo</h3>
                  <p className="text-antracite/80">
                    Comprendiamo le tue sfide, i tuoi obiettivi e il contesto in cui operi.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-arancio/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl font-bold text-arancio">2</span>
                  </div>
                  <h3 className="text-xl font-bold text-antracite mb-4">Progettiamo</h3>
                  <p className="text-antracite/80">
                    Costruiamo insieme una strategia su misura per la tua organizzazione.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-turchese/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl font-bold text-turchese">3</span>
                  </div>
                  <h3 className="text-xl font-bold text-antracite mb-4">Trasformiamo</h3>
                  <p className="text-antracite/80">
                    Accompagniamo l'implementazione e l'evoluzione continua del cambiamento.
                  </p>
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
                Pronto per iniziare?
              </h2>
              <p className="text-xl text-grigio-chiaro leading-relaxed mb-12">
                La prima conversazione è sempre gratuita. Scopriamo insieme come possiamo aiutarti a trasformare le sfide in opportunità.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="mailto:info@noscite.it"
                  className="inline-flex items-center justify-center px-8 py-4 bg-secondary text-white font-medium rounded-lg hover:bg-secondary/80 transition-colors duration-300"
                >
                  Scrivi una email
                  <Mail className="ml-2 h-5 w-5" />
                </a>
                <a 
                  href="tel:+393476859801"
                  className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white text-white font-medium rounded-lg hover:bg-white hover:text-antracite transition-colors duration-300"
                >
                  Chiamaci
                  <Phone className="ml-2 h-5 w-5" />
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

export default Contactus;
