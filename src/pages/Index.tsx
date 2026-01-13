import Header from "@/components/Header";
import Hero from "@/components/Hero";
import { SkipLink } from "@/components/SkipLink";
import Identitas from "@/components/Identitas";
import Methodus from "@/components/Methodus";
import Valor from "@/components/Valor";
import Historiae from "@/components/Historiae";
import Atheneum from "@/components/Atheneum";
import Partners from "@/components/Partners";
import Contactus from "@/components/Contactus";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { StructuredData, organizationSchema } from "@/components/StructuredData";

const Index = () => {
  return (
    <div className="min-h-screen">
      <SEO 
        title="Noscite - Innovazione Digitale e Trasformazione Digitale | In Digitali Nova Virtus"
        description="Innovazione digitale e trasformazione digitale per le aziende: metodo, visione e tecnologia per creare valore. Scopri il nostro approccio in 5 fasi."
        keywords="innovazione digitale, trasformazione digitale, noscite, consulenza digitale, metodo, AI, intelligenza artificiale"
        canonical="https://noscite.it/"
        structuredData={organizationSchema}
      />
      <StructuredData schema={organizationSchema} />
      <SkipLink href="#main-content">Vai al contenuto principale</SkipLink>
      <Header />
      <main id="main-content" tabIndex={-1} role="main">
        <Hero />
        <Identitas />
        <Methodus />
        <Valor />
        <Atheneum />
        <Partners />
        <Contactus />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
