import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Cookie } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Breadcrumbs } from "@/components/Breadcrumbs";

const CookiePolicy = () => {
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
        title="Cookie Policy | Noscite - Informativa sui Cookie"
        description="Informativa dettagliata sui cookie utilizzati dal sito Noscite. Scopri come gestiamo i cookie e le tue preferenze."
        keywords="cookie policy, informativa cookie, gestione cookie, privacy web, consenso cookie"
        canonical="https://noscite.it/cookie-policy"
      />
      <Header />
      <Breadcrumbs />
      
      <main className="pt-20">
        <section className="py-16 bg-gradient-to-br from-primary/5 to-secondary/5">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex items-center justify-center mb-6">
                <Cookie className="h-12 w-12 text-primary" />
              </div>
              <h1 className="text-4xl font-bold mb-4">Cookie Policy</h1>
              <p className="text-xl text-muted-foreground">
                Informazioni dettagliate sui cookie utilizzati dal nostro sito web.
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
                  href="https://www.iubenda.com/privacy-policy/63014802/cookie-policy" 
                  className="iubenda-white iubenda-noiframe iubenda-embed iubenda-noiframe" 
                  title="Cookie Policy"
                >
                  Cookie Policy
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

export default CookiePolicy;