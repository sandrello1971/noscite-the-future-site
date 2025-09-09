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
        title="Noscite - In Digitali Nova Virtus | Metodo di Trasformazione Digitale per PMI"
        description="Non vendiamo pacchetti. Progettiamo, implementiamo e governiamo trasformazioni digitali misurabili con il Metodo Noscite in 7 fasi. ROI in 30 giorni, KPI chiari."
        keywords="metodo noscite, trasformazione digitale, PMI, discovery, pilot, ROI, KPI, governance digitale, automazione processi, consulenza digitale"
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
