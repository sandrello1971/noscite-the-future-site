import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import Chatbot from "@/components/Chatbot";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SEO } from "@/components/SEO";
import { StructuredData, faqSchema } from "@/components/StructuredData";
import { Breadcrumbs } from "@/components/Breadcrumbs";

const Contatti = () => {
  return (
    <div className="min-h-screen">
      <SEO 
        title="Contatti - Richiedi Consulenza AI | Noscite"
        description="Contattaci per una consulenza personalizzata sulla trasformazione digitale. Scopri come l'intelligenza artificiale può innovare la tua azienda. Consulenza gratuita."
        keywords="contatti consulenza AI, richiesta informazioni, consulenza gratuita, trasformazione digitale, contatto azienda"
        canonical="https://noscite.it/contatti"
        structuredData={faqSchema}
      />
      <StructuredData schema={faqSchema} />
      <Header />
      <Breadcrumbs />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="gradient-hero py-20">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
              Contattaci
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Siamo pronti ad ascoltare le tue sfide e trasformarle in opportunità di crescita. 
              Iniziamo insieme il tuo percorso verso il futuro digitale.
            </p>
          </div>
        </section>

        {/* Contact Form Section */}
        <ContactForm />

        {/* FAQ Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Domande Frequenti
              </h2>
              <p className="text-muted-foreground">
                Le risposte alle domande più comuni sui nostri servizi
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-3">Quanto costa una consulenza iniziale?</h3>
                  <p className="text-muted-foreground">
                    La prima consulenza di 1 ora è sempre gratuita e senza impegno. 
                    È un'opportunità per conoscerci e valutare insieme le tue esigenze.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-3">Quanto tempo richiede un progetto?</h3>
                  <p className="text-muted-foreground">
                    Dipende dal servizio: da 4 settimane per un AI Sprint fino a 12+ mesi 
                    per partnership evolutive. Ti forniremo sempre una timeline chiara.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-3">Lavorate con PMI o solo grandi aziende?</h3>
                  <p className="text-muted-foreground">
                    Lavoriamo con aziende di tutte le dimensioni. I nostri servizi sono 
                    modulari e si adattano sia a startup che a enterprise.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-3">Offrite supporto post-implementazione?</h3>
                  <p className="text-muted-foreground">
                    Sì, tutti i nostri servizi includono supporto e follow-up. 
                    Inoltre offriamo contratti di mantenimento per supporto continuativo.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
};

export default Contatti;