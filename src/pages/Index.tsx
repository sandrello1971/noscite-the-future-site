import Header from "@/components/Header";
import Hero from "@/components/Hero";
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
        title="Noscite - In Digitali Nova Virtus | Metodo di Trasformazione Digitale"
        description="Il digitale non è solo tecnologia, ma capacità di creare valore attraverso metodo, visione e innovazione. Scopri il nostro approccio in 5 fasi."
        keywords="noscite, digitale, trasformazione, metodo, innovazione, consulenza, auditio, analytica, co-creatio, implementatio, evolutio"
        canonical="https://noscite.it/"
        structuredData={organizationSchema}
      />
      <StructuredData schema={organizationSchema} />
      <Header />
      <main id="main-content" tabIndex={-1}>
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
