import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Star, ArrowRight, Zap, BarChart3, MessageSquare, Bot } from "lucide-react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";

// Import images
import heroImage from "@/assets/jooice/hero-marketing.png";
import keyartListings from "@/assets/jooice/keyart-listings.png";
import listingsImg from "@/assets/jooice/listings.png";
import socialPostingImg from "@/assets/jooice/social-posting.png";
import reputationImg from "@/assets/jooice/reputation.png";
import aiAssistantImg from "@/assets/jooice/ai-assistant.png";
import platformPreview from "@/assets/jooice/platform-preview.png";
import testimonialBg from "@/assets/jooice/testimonial-bg.png";

const JooiceLanding = () => {
  const features = [
    {
      title: "Listings",
      description: "Gestisci tutte le tue schede aziendali da un'unica dashboard. Sincronizza automaticamente le informazioni su Google, Facebook, Bing e oltre 40 directory.",
      image: listingsImg,
      icon: <Zap className="h-6 w-6" />,
    },
    {
      title: "Social Posting",
      description: "Pianifica e pubblica contenuti su tutti i tuoi canali social con un click. Calendario editoriale integrato e analisi delle performance.",
      image: socialPostingImg,
      icon: <MessageSquare className="h-6 w-6" />,
    },
    {
      title: "Reputation",
      description: "Monitora e rispondi alle recensioni da un'unica interfaccia. Ricevi notifiche in tempo reale e migliora la tua reputazione online.",
      image: reputationImg,
      icon: <BarChart3 className="h-6 w-6" />,
    },
    {
      title: "AI Assistant",
      description: "Lascia che l'intelligenza artificiale ti aiuti a creare contenuti, rispondere alle recensioni e ottimizzare le tue campagne marketing.",
      image: aiAssistantImg,
      icon: <Bot className="h-6 w-6" />,
    },
  ];

  const benefits = [
    "Risparmia fino a 10 ore a settimana nella gestione del marketing",
    "Aumenta la visibilità online del 40% in media",
    "Gestisci tutte le recensioni da un'unica dashboard",
    "Pubblica su tutti i social con un solo click",
    "Report automatici e insights azionabili",
    "Supporto dedicato in italiano",
  ];

  const testimonials = [
    {
      name: "Marco Rossi",
      role: "Titolare",
      company: "Ristorante La Pergola",
      content: "Jooice ha rivoluzionato il modo in cui gestiamo la nostra presenza online. Ora rispondo a tutte le recensioni in pochi minuti!",
      rating: 5,
    },
    {
      name: "Laura Bianchi",
      role: "Marketing Manager",
      company: "Studio Dentistico Bianchi",
      content: "Finalmente una piattaforma che semplifica tutto. Il risparmio di tempo è incredibile e i risultati si vedono.",
      rating: 5,
    },
    {
      name: "Giuseppe Verdi",
      role: "Proprietario",
      company: "Palestra FitLife",
      content: "L'AI Assistant è fantastico! Mi suggerisce risposte perfette per le recensioni e contenuti per i social.",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title="Jooice - Prova Gratis 30 Giorni | All Your Marketing in One Place"
        description="Prova Jooice gratis per 30 giorni. Gestisci listings, social posting, reputation e AI assistant in un'unica piattaforma. Nessuna carta di credito richiesta."
        keywords="jooice, marketing, social media, reputation management, listings, AI assistant, prova gratuita"
      />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-contain bg-right bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[hsl(220,80%,20%)] via-[hsl(220,80%,20%)]/85 to-[hsl(220,80%,20%)]/40" />
        </div>
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10 py-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-[hsl(25,95%,53%)]/20 border border-[hsl(25,95%,53%)]/30 rounded-full px-4 py-2 mb-6">
              <span className="text-[hsl(25,95%,53%)] font-medium text-sm">30 giorni gratis</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Prova Jooice Gratis per{" "}
              <span className="text-[hsl(25,95%,53%)]">30 Giorni</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-8">
              All your marketing in one place
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-[hsl(25,95%,53%)] hover:bg-[hsl(25,95%,45%)] text-white text-lg px-8 py-6 rounded-xl shadow-lg shadow-[hsl(25,95%,53%)]/30"
                asChild
              >
                <a href="https://www.jooice.com/it/checkout/account?plan=wQX0ObQK&term=month&partner=Noscite" target="_blank" rel="noopener noreferrer">
                  Inizia la prova gratuita
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/30 text-white hover:bg-white/10 text-lg px-8 py-6 rounded-xl backdrop-blur-sm"
                asChild
              >
                <Link to="/contatti">
                  Contattaci
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-b from-[hsl(220,30%,97%)] to-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="order-2 lg:order-1">
              <img 
                src={keyartListings} 
                alt="Jooice semplifica il marketing - gestione centralizzata di tutti i canali" 
                className="w-full max-w-lg mx-auto"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[hsl(220,80%,20%)] leading-tight mb-6">
                Il marketing oggi è complicato.{" "}
                <span className="text-[hsl(25,95%,53%)]">Jooice lo semplifica.</span>
              </h2>
              <p className="text-lg text-[hsl(220,20%,40%)] leading-relaxed mb-6">
                Troppe piattaforme, troppi strumenti, troppo poco tempo. Ogni giorno devi gestire Google Business, Facebook, Instagram, recensioni, contenuti... e il tempo non basta mai.
              </p>
              <p className="text-lg text-[hsl(220,20%,40%)] leading-relaxed">
                Jooice riunisce tutto in un'unica dashboard intelligente. Gestisci la tua presenza online, pubblica contenuti, rispondi alle recensioni e analizza i risultati - tutto da un solo posto.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[hsl(220,80%,20%)] mb-6">
              Tutto quello che ti serve per il{" "}
              <span className="text-[hsl(25,95%,53%)]">marketing locale</span>
            </h2>
            <p className="text-lg text-[hsl(220,20%,40%)]">
              Quattro strumenti potenti in un'unica piattaforma intuitiva
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {features.map((feature, index) => (
              <Card 
                key={feature.title}
                className="group border-0 shadow-xl shadow-[hsl(220,80%,20%)]/5 hover:shadow-2xl hover:shadow-[hsl(25,95%,53%)]/10 transition-all duration-500 overflow-hidden rounded-2xl bg-white"
              >
                <CardContent className="p-0">
                  <div className="aspect-[4/3] bg-gradient-to-br from-[hsl(45,100%,95%)] to-[hsl(45,100%,90%)] flex items-center justify-center p-8 overflow-hidden">
                    <img 
                      src={feature.image} 
                      alt={`${feature.title} - ${feature.description}`}
                      className="w-full max-w-xs object-contain group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-xl bg-[hsl(25,95%,53%)]/10 text-[hsl(25,95%,53%)]">
                        {feature.icon}
                      </div>
                      <h3 className="text-2xl font-bold text-[hsl(220,80%,20%)]">
                        {feature.title}
                      </h3>
                    </div>
                    <p className="text-[hsl(220,20%,40%)] leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 lg:py-32 bg-[hsl(220,80%,20%)]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-8">
                Perché scegliere{" "}
                <span className="text-[hsl(25,95%,53%)]">Jooice?</span>
              </h2>
              
              <ul className="space-y-4 mb-10">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[hsl(25,95%,53%)] flex items-center justify-center mt-0.5">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-lg text-white/90">{benefit}</span>
                  </li>
                ))}
              </ul>

              <Button 
                size="lg" 
                className="bg-[hsl(25,95%,53%)] hover:bg-[hsl(25,95%,45%)] text-white text-lg px-8 py-6 rounded-xl shadow-lg shadow-[hsl(25,95%,53%)]/30"
                asChild
              >
                <a href="https://www.jooice.com/it/checkout/account?plan=wQX0ObQK&term=month&partner=Noscite" target="_blank" rel="noopener noreferrer">
                  Inizia la prova gratuita
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-4 bg-[hsl(25,95%,53%)]/20 rounded-3xl blur-3xl" />
              <img 
                src={testimonialBg} 
                alt="Jooice piattaforma integrata per il marketing" 
                className="relative w-full max-w-md mx-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Platform Preview Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-b from-white to-[hsl(220,30%,97%)]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[hsl(220,80%,20%)] mb-6">
              Una piattaforma,{" "}
              <span className="text-[hsl(25,95%,53%)]">infinite possibilità</span>
            </h2>
            <p className="text-lg text-[hsl(220,20%,40%)]">
              Scopri come Jooice può trasformare il modo in cui gestisci il tuo marketing
            </p>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[hsl(25,95%,53%)]/10 via-transparent to-[hsl(220,80%,20%)]/10 rounded-3xl blur-3xl" />
            <img 
              src={platformPreview} 
              alt="Jooice - Preview della piattaforma con tutte le funzionalità" 
              className="relative w-full rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Free Trial CTA Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-[hsl(25,95%,53%)] to-[hsl(25,95%,45%)]">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Provalo gratis per 30 giorni.
          </h2>
          <p className="text-xl md:text-2xl text-white/90 mb-10">
            Nessuna carta di credito richiesta.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-[hsl(25,95%,53%)] hover:bg-white/90 text-lg px-10 py-6 rounded-xl shadow-lg"
              asChild
            >
              <a href="https://www.jooice.com/it/checkout/account?plan=wQX0ObQK&term=month&partner=Noscite" target="_blank" rel="noopener noreferrer">
                Inizia ora - È gratis
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>

          <p className="mt-6 text-white/70 text-sm">
            Attivazione immediata • Cancella quando vuoi • Supporto incluso
          </p>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[hsl(220,80%,20%)] mb-6">
              Cosa dicono i nostri{" "}
              <span className="text-[hsl(25,95%,53%)]">clienti</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={index}
                className="border-0 shadow-xl shadow-[hsl(220,80%,20%)]/5 rounded-2xl bg-white hover:shadow-2xl transition-shadow duration-300"
              >
                <CardContent className="p-8">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-[hsl(45,100%,50%)] text-[hsl(45,100%,50%)]" />
                    ))}
                  </div>
                  <p className="text-[hsl(220,20%,40%)] mb-6 leading-relaxed italic">
                    "{testimonial.content}"
                  </p>
                  <div className="border-t border-[hsl(220,20%,90%)] pt-4">
                    <p className="font-bold text-[hsl(220,80%,20%)]">{testimonial.name}</p>
                    <p className="text-sm text-[hsl(220,20%,50%)]">
                      {testimonial.role}, {testimonial.company}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-[hsl(220,80%,15%)]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="text-2xl font-bold text-white">
                <span className="text-[hsl(25,95%,53%)]">J</span>ooice
              </div>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-white/60 text-sm mb-2">
                Powered by <span className="text-white/80 font-medium">Noscite SRLS</span>
              </p>
              <div className="flex gap-6 text-sm">
                <Link to="/privacy-policy" className="text-white/60 hover:text-[hsl(25,95%,53%)] transition-colors">
                  Privacy Policy
                </Link>
                <Link to="/cookie-policy" className="text-white/60 hover:text-[hsl(25,95%,53%)] transition-colors">
                  Cookie Policy
                </Link>
                <a href="mailto:info@noscite.it" className="text-white/60 hover:text-[hsl(25,95%,53%)] transition-colors">
                  Contatti
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default JooiceLanding;
