import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Partners from "@/components/Partners";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { StructuredData, organizationSchema } from "@/components/StructuredData";

const Index = () => {
  return (
    <div className="min-h-screen">
      <SEO 
        title="Noscite - In Digitali Nova Virtus | AI Academy e Consulenza Digitale"
        description="Trasformiamo le aziende attraverso l'intelligenza artificiale e la formazione digitale. Athenaeum AI Academy, AI Sprint, Launchpad e consulenza strategica per risultati concreti."
        keywords="intelligenza artificiale, AI academy, trasformazione digitale, consulenza AI, formazione aziendale, Athenaeum AI, AI Sprint, Launchpad, fractional CIO"
        canonical="https://noscite.it/"
        structuredData={organizationSchema}
      />
      <StructuredData schema={organizationSchema} />
      <Header />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <Partners />
        <Services />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
