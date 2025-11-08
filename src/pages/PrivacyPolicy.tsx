import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Shield } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Breadcrumbs } from "@/components/Breadcrumbs";

const PrivacyPolicy = () => {
  useEffect(() => {
    // Load Iubenda script if not already loaded
    if (!document.querySelector('script[src="https://cdn.iubenda.com/iubenda.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://cdn.iubenda.com/iubenda.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);
  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Privacy Policy | Noscite - Protezione dei Tuoi Dati"
        description="Informativa sulla privacy di Noscite. Scopri come proteggiamo i tuoi dati personali e rispettiamo la normativa GDPR."
        keywords="privacy policy, GDPR, protezione dati, informativa privacy, trattamento dati personali"
        canonical="https://noscite.it/privacy-policy"
      />
      <Header />
      <Breadcrumbs />
      
      <main className="pt-20">
        <section className="py-16 bg-gradient-to-br from-primary/5 to-secondary/5">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex items-center justify-center mb-6">
                <Shield className="h-12 w-12 text-primary" />
              </div>
              <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
              <p className="text-xl text-muted-foreground">
                La tua privacy è importante per noi. Scopri come proteggiamo i tuoi dati.
              </p>
              <p className="text-sm text-muted-foreground mt-4">
                Ultimo aggiornamento: {new Date().toLocaleDateString('it-IT')}
              </p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <a 
                  href="https://www.iubenda.com/privacy-policy/63014802" 
                  className="iubenda-white iubenda-noiframe iubenda-embed iubenda-noiframe" 
                  title="Privacy Policy"
                >
                  Privacy Policy
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

export default PrivacyPolicy;