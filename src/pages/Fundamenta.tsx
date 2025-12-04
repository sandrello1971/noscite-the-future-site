import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { 
  Brain, 
  BookOpen, 
  Building2, 
  GraduationCap, 
  Users, 
  Fingerprint,
  Target,
  Eye,
  Heart,
  Scroll
} from "lucide-react";

const Fundamenta = () => {
  const fundamentaSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Fundamenta – Manifestum Noscite",
    "description": "I principi fondativi dell'Umanesimo Digitale e della Governance dell'Innovazione. Il manifesto di Noscite.",
    "mainEntity": {
      "@type": "Organization",
      "name": "Noscite",
      "description": "Struttura culturale e organizzativa per l'Umanesimo Digitale"
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title="Fundamenta – Manifestum Noscite | Umanesimo Digitale"
        description="I principi fondativi dell'Umanesimo Digitale e della Governance dell'Innovazione. Il manifesto di Noscite per un futuro in cui la tecnologia amplifica l'umanità."
        keywords="manifesto noscite, umanesimo digitale, governance innovazione, pedagogia critica, alfabetizzazione epistemica, AI responsabile"
        canonical="https://noscite.it/fundamenta"
        structuredData={fundamentaSchema}
      />
      <Header />
      <Breadcrumbs />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-antracite">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl lg:text-7xl font-serif-elegant font-bold text-white mb-6">
                <span className="font-latin-italic">Fundamenta</span>
              </h1>
              <p className="text-2xl text-secondary font-serif-elegant mb-4">
                Manifestum Noscite
              </p>
              <p className="text-xl text-grigio-chiaro leading-relaxed">
                I principi fondativi dell'Umanesimo Digitale e della Governance dell'Innovazione.
              </p>
            </div>
          </div>
        </section>

        {/* Premessa */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-turchese/10 rounded-full flex items-center justify-center mr-4">
                  <Scroll className="h-6 w-6 text-turchese" />
                </div>
                <h2 className="text-3xl font-serif-elegant font-bold text-antracite">
                  1. Perché Noscite
                </h2>
              </div>
              <div className="prose prose-lg max-w-none text-antracite/80">
                <p className="text-xl leading-relaxed mb-6">
                  Viviamo in una trasformazione senza precedenti.<br />
                  La tecnologia non è più uno strumento esterno: è diventata <strong>un ambiente cognitivo</strong>.
                </p>
                <p className="mb-4">Noscite nasce per guidare individui, imprese e istituzioni in questo nuovo contesto, offrendo:</p>
                <ul className="list-disc pl-6 space-y-2 mb-6">
                  <li>pensiero critico</li>
                  <li>visione sistemica</li>
                  <li>cultura dei processi</li>
                  <li>alfabetizzazione epistemica</li>
                  <li>governance tecnologica</li>
                </ul>
                <p className="text-lg font-medium">
                  Non per "insegnare l'AI", ma per <strong>restituire centralità al pensiero umano</strong>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* La Scelta del Latino */}
        <section className="py-16 bg-beige">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-arancio/10 rounded-full flex items-center justify-center mr-4">
                  <BookOpen className="h-6 w-6 text-arancio" />
                </div>
                <h2 className="text-3xl font-serif-elegant font-bold text-antracite">
                  2. La Scelta del Latino
                </h2>
              </div>
              <p className="text-lg text-antracite/60 mb-6">Tradizione come Struttura, Non Nostalgia</p>
              <div className="prose prose-lg max-w-none text-antracite/80">
                <p className="mb-6">
                  Il latino non è un vezzo estetico né un'operazione nostalgica.<br />
                  È una <strong>dichiarazione identitaria e metodologica</strong>.
                </p>
                <p className="mb-4">Il latino rappresenta:</p>
                <ul className="list-disc pl-6 space-y-2 mb-6">
                  <li>la radice dell'umanesimo</li>
                  <li>la disciplina del pensiero rigoroso</li>
                  <li>la chiarezza concettuale</li>
                  <li>la continuità storica della ricerca di senso</li>
                  <li>la stabilità nella complessità del presente</li>
                </ul>
                <blockquote className="border-l-4 border-turchese pl-6 py-4 bg-white/50 rounded-r-lg my-8">
                  <p className="text-xl font-serif-elegant italic text-antracite">
                    "Rallentare per capire, nominare per comprendere, dare forma per dare senso."
                  </p>
                </blockquote>
                <p>
                  È il ponte tra la profondità della tradizione critica e la responsabilità dell'innovazione contemporanea.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Fondamento Filosofico */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-turchese/10 rounded-full flex items-center justify-center mr-4">
                  <Brain className="h-6 w-6 text-turchese" />
                </div>
                <h2 className="text-3xl font-serif-elegant font-bold text-antracite">
                  3. Fondamento Filosofico
                </h2>
              </div>
              <div className="prose prose-lg max-w-none text-antracite/80">
                <p className="text-xl mb-6">
                  La tecnologia non è neutra.<br />
                  È una <em>forza trasformativa</em> che ridefinisce i modi in cui:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-6">
                  <li>percepiamo</li>
                  <li>interpretiamo</li>
                  <li>decidiamo</li>
                  <li>costruiamo senso</li>
                </ul>
                <p className="text-lg font-medium">
                  L'Umanesimo Digitale è il punto di ri-partenza.<br />
                  L'AI non va solo usata: va compresa, contestualizzata, interpretata.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Fondamento Epistemico */}
        <section className="py-16 bg-antracite text-white">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center mr-4">
                  <BookOpen className="h-6 w-6 text-secondary" />
                </div>
                <h2 className="text-3xl font-serif-elegant font-bold text-white">
                  4. Fondamento Epistemico
                </h2>
              </div>
              <div className="prose prose-lg prose-invert max-w-none">
                <p className="text-xl mb-6 text-white/90">
                  Non si può delegare alla macchina ciò che non si comprende.
                </p>
                <blockquote className="border-l-4 border-secondary pl-6 py-4 bg-white/5 rounded-r-lg my-8">
                  <p className="text-xl font-serif-elegant italic text-white">
                    "L'uso dell'AI richiede competenze cognitive più avanzate, non più semplici."
                  </p>
                </blockquote>
                <p className="text-white/80">
                  Formazione critica, verifica delle fonti, lettura dei dati, analisi dei modelli, consapevolezza dei bias, del pensiero contaminato da pregiudizio: questa è la nuova alfabetizzazione.
                </p>
                <p className="text-white/80 font-medium mt-4">
                  È la condizione di possibilità per qualunque innovazione autentica.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Fondamento Organizzativo */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-arancio/10 rounded-full flex items-center justify-center mr-4">
                  <Building2 className="h-6 w-6 text-arancio" />
                </div>
                <h2 className="text-3xl font-serif-elegant font-bold text-antracite">
                  5. Fondamento Organizzativo
                </h2>
              </div>
              <div className="prose prose-lg max-w-none text-antracite/80">
                <p className="mb-6">
                  Le aziende non falliscono perché l'AI "non funziona".<br />
                  Falliscono perché non hanno:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-6">
                  <li>processi maturi</li>
                  <li>responsabilità chiare</li>
                  <li>governance coerente</li>
                  <li>dati affidabili</li>
                  <li>cultura organizzativa solida</li>
                </ul>
                <p className="mb-4">Per questo Noscite pone al centro:</p>
                <ul className="list-disc pl-6 space-y-2 mb-6">
                  <li>mappatura processi</li>
                  <li>assessment</li>
                  <li>governance</li>
                  <li>gestione dei flussi informativi</li>
                </ul>
                <p className="text-lg font-medium">
                  <strong>Processi prima dell'AI.</strong><br />
                  Non per frenare l'innovazione, ma per renderla possibile.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Fondamento Educativo */}
        <section className="py-16 bg-beige">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-turchese/10 rounded-full flex items-center justify-center mr-4">
                  <GraduationCap className="h-6 w-6 text-turchese" />
                </div>
                <h2 className="text-3xl font-serif-elegant font-bold text-antracite">
                  6. Fondamento Educativo
                </h2>
              </div>
              <div className="prose prose-lg max-w-none text-antracite/80">
                <p className="text-xl mb-6">
                  La trasformazione digitale richiede una trasformazione educativa.
                </p>
                <p className="mb-4">Noscite sviluppa competenze per:</p>
                <ul className="list-disc pl-6 space-y-2 mb-6">
                  <li>studenti</li>
                  <li>docenti</li>
                  <li>professionisti</li>
                  <li>manager</li>
                  <li>PMI</li>
                </ul>
                <p className="text-lg font-medium">
                  L'obiettivo non è saper usare gli strumenti, ma <em>pensare con gli strumenti senza esserne dipendenti</em>.
                </p>
                <p className="mt-4">
                  Atheneum, Scuola Digitale, percorsi PCTO: tutto costruisce autonomia cognitiva.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Fondamento Sociale */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-arancio/10 rounded-full flex items-center justify-center mr-4">
                  <Users className="h-6 w-6 text-arancio" />
                </div>
                <h2 className="text-3xl font-serif-elegant font-bold text-antracite">
                  7. Fondamento Sociale
                </h2>
              </div>
              <div className="prose prose-lg max-w-none text-antracite/80">
                <p className="text-xl mb-6">
                  L'ecosistema informativo è diventato fragile: veloce, polarizzato, manipolabile, sovraccarico.
                </p>
                <p className="mb-4">Noscite si impegna a:</p>
                <ul className="list-disc pl-6 space-y-2 mb-6">
                  <li>ricostruire credibilità e fiducia</li>
                  <li>comprendere la complessità delle reti</li>
                  <li>proteggere dalla manipolazione cognitiva</li>
                  <li>educare all'interpretazione dei media digitali</li>
                </ul>
                <p className="text-lg font-medium">
                  L'obiettivo non è allarmare, ma <em>rafforzare la cittadinanza epistemica</em>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Identità Noscite */}
        <section className="py-16 bg-turchese/10">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-turchese/20 rounded-full flex items-center justify-center mr-4">
                  <Fingerprint className="h-6 w-6 text-turchese" />
                </div>
                <h2 className="text-3xl font-serif-elegant font-bold text-antracite">
                  8. Identità Noscite
                </h2>
              </div>
              <div className="prose prose-lg max-w-none text-antracite/80">
                <p className="text-xl mb-6">
                  Noscite non è una scuola, non è un fornitore tech, non è un'agenzia.<br />
                  È una <strong>struttura culturale e organizzativa</strong> che integra:
                </p>
                <div className="grid md:grid-cols-2 gap-4 my-8">
                  {[
                    "antropologia del digitale",
                    "epistemologia",
                    "processi",
                    "governance",
                    "pedagogia",
                    "educazione critica",
                    "design organizzativo",
                    "tecnologia applicata"
                  ].map((item, index) => (
                    <div key={index} className="bg-white rounded-lg p-4 shadow-sm">
                      <span className="text-antracite font-medium">{item}</span>
                    </div>
                  ))}
                </div>
                <p className="text-lg font-medium text-center mt-8">
                  Un ponte tra <strong>tecnica e senso</strong>, tra <strong>complessità e decisione</strong>, tra <strong>innovazione e responsabilità</strong>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Perché Noscite è diversa */}
        <section className="py-16 bg-antracite text-white">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-serif-elegant font-bold text-white mb-8 text-center">
                Perché Noscite è diversa
              </h2>
              <div className="space-y-6 text-lg text-white/90">
                <p>
                  Perché non mette al centro l'AI.<br />
                  Mette al centro <strong className="text-secondary">l'essere umano che usa l'AI</strong>.
                </p>
                <p>
                  Perché non vende soluzioni.<br />
                  Costruisce <em>capacità</em>.
                </p>
                <p>
                  Perché non semplifica il mondo.<br />
                  Insegna a leggerlo.
                </p>
                <p>
                  Perché non segue la moda tecnologica.<br />
                  Segue una visione:
                </p>
                <blockquote className="border-l-4 border-secondary pl-6 py-4 bg-white/5 rounded-r-lg">
                  <p className="text-xl font-serif-elegant italic">
                    "Un futuro in cui la tecnologia amplifica la nostra umanità, non la sostituisce."
                  </p>
                </blockquote>
              </div>
            </div>
          </div>
        </section>

        {/* Missione */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-arancio/10 rounded-full flex items-center justify-center">
                  <Target className="h-8 w-8 text-arancio" />
                </div>
              </div>
              <h2 className="text-3xl font-serif-elegant font-bold text-antracite mb-6">
                Missione
              </h2>
              <blockquote className="text-xl text-antracite/80 leading-relaxed">
                "Rendere individui, imprese e istituzioni capaci di comprendere, governare e utilizzare l'AI con <strong>autonomia critica</strong>, <strong>responsabilità</strong> e <strong>maturità organizzativa</strong>."
              </blockquote>
            </div>
          </div>
        </section>

        {/* Visione */}
        <section className="py-16 bg-beige">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-turchese/10 rounded-full flex items-center justify-center">
                  <Eye className="h-8 w-8 text-turchese" />
                </div>
              </div>
              <h2 className="text-3xl font-serif-elegant font-bold text-antracite mb-6">
                Visione
              </h2>
              <blockquote className="text-xl text-antracite/80 leading-relaxed">
                "Costruire una società <strong>digitalmente consapevole</strong>, <strong>epistemicamente competente</strong> e capace di orientarsi nella complessità dell'era algoritmica."
              </blockquote>
            </div>
          </div>
        </section>

        {/* Valori */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="flex justify-center mb-8">
                <div className="w-16 h-16 bg-arancio/10 rounded-full flex items-center justify-center">
                  <Heart className="h-8 w-8 text-arancio" />
                </div>
              </div>
              <h2 className="text-3xl font-serif-elegant font-bold text-antracite mb-8 text-center">
                Valori
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  "Umanesimo",
                  "Complessità",
                  "Responsabilità",
                  "Autonomia",
                  "Trasparenza",
                  "Pensiero critico",
                  "Educazione permanente",
                  "Governance",
                  "Cura del contesto"
                ].map((value, index) => (
                  <div 
                    key={index} 
                    className="bg-gradient-to-br from-turchese/5 to-arancio/5 rounded-xl p-4 text-center border border-antracite/10"
                  >
                    <span className="font-medium text-antracite">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Conclusione */}
        <section className="py-20 bg-antracite text-white">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-serif-elegant font-bold text-white mb-8">
                L'impegno di Noscite
              </h2>
              <div className="space-y-6 text-lg text-white/90">
                <p>
                  Noscite non ha l'obiettivo di "accompagnare" le persone nel digitale.<br />
                  Vuole <strong className="text-secondary">attrezzarle</strong>, <strong className="text-secondary">rafforzarle</strong>, <strong className="text-secondary">risvegliarle</strong>.
                </p>
                <p>
                  È un progetto culturale, prima ancora che tecnologico.
                </p>
                <p className="text-xl font-serif-elegant italic mt-8">
                  Un progetto che unisce filosofia, educazione, organizzazione e innovazione per restituire dignità e potenza all'intelligenza umana.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Fundamenta;
