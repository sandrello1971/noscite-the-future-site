import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

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
      value: "Via Monte Grappa 13, Corsico (MI)",
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
    <section className="py-20 bg-antracite">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-16 animate-fade-in">
            <h2 className="text-3xl lg:text-5xl font-serif-elegant font-bold text-white mb-6">
              <span className="font-latin-italic">Contactus</span>
            </h2>
            <p className="text-2xl text-white/90 font-serif-elegant font-latin-italic mb-8">
              Ogni trasformazione nasce da un incontro.
            </p>
            <p className="text-lg text-white/80">
              Contattateci per iniziare il vostro percorso di trasformazione digitale.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {contatti.map((contatto, index) => {
              const IconComponent = contatto.icon;
              const content = (
                <Card className="bg-card/10 backdrop-blur-sm border-white/20 hover-lift animate-slide-up h-full" style={{ animationDelay: `${index * 100}ms` }}>
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-white mb-2">{contatto.label}</h3>
                    <p className="text-white/80 whitespace-pre-line">{contatto.value}</p>
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

          <div className="animate-fade-in">
            <Button variant="secondary" size="lg" asChild className="hover:bg-primary hover:border-primary transition-colors duration-300">
              <Link to="/contatti">
                <Mail className="mr-2 h-5 w-5" />
                Inizia la conversazione
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contactus;