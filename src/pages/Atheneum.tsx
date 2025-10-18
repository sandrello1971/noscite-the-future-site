import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Lightbulb, Users, Target, ArrowRight, BookOpen, CheckCircle2, TrendingUp, Link2, Map, Award, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 bg-beige rounded-lg hover:bg-beige/80 transition-colors"
      >
        <span className="text-lg font-semibold text-antracite text-left">{question}</span>
        <ChevronDown className={`h-5 w-5 text-turchese transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="p-6 bg-white border-l-4 border-turchese mt-2 rounded-lg">
          <p className="text-antracite/80 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
};

const Atheneum = () => {
  const percorsi = [
    {
      icon: Lightbulb,
      title: "Innovatio",
      subtitle: "Tecnologie emergenti", 
      description: "Esploriamo insieme le frontiere dell'innovazione tecnologica, dalle AI generative alle blockchain, dall'IoT alla realtà aumentata. Non solo strumenti, ma comprensione profonda del loro impatto strategico.",
      focus: ["Intelligenza Artificiale", "Blockchain & Web3", "IoT e Smart Systems", "Extended Reality"]
    },
    {
      icon: Target,
      title: "Strategia", 
      subtitle: "Pensiero e visione",
      description: "La strategia digitale non è solo tecnologia, ma visione sistemica. Sviluppiamo insieme la capacità di leggere i cambiamenti, anticipare le tendenze e costruire roadmap sostenibili.",
      focus: ["Digital Strategy", "Innovation Management", "Change Management", "Future Thinking"]
    },
    {
      icon: Users,
      title: "Humanitas",
      subtitle: "Impatto sulle persone",
      description: "Il digitale trasforma le organizzazioni, ma sono le persone che guidano il cambiamento. Esploriamo l'impatto umano della tecnologia e come costruire culture digitali inclusive.",
      focus: ["Digital Culture", "Leadership Digitale", "User Experience", "Organizational Design"]
    }
  ];

  return (
    <div className="min-h-screen bg-beige">
      <SEO 
        title="Atheneum - Noscite | Percorsi di Conoscenza"
        description="Scientia potentia est. L'Atheneum di Noscite è lo spazio dove sapere e pratica si incontrano. Percorsi di apprendimento: Innovatio, Strategia, Humanitas."
        canonical="https://noscite.it/atheneum"
      />
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative py-32 bg-gradient-to-br from-antracite via-antracite to-turchese/20 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '40px 40px'
            }}></div>
          </div>
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl lg:text-7xl font-serif-elegant font-bold text-white mb-8 animate-fade-in">
                <span className="font-latin-italic">Atheneum</span>
              </h1>
              <p className="text-2xl lg:text-3xl text-white leading-relaxed mb-8 animate-fade-in font-medium">
                Trasforma la tua PMI con la conoscenza digitale. Scopri i percorsi Noscite per innovare, semplificare e crescere.
              </p>
              <div className="flex justify-center gap-4 animate-fade-in">
                <a 
                  href="#percorsi"
                  className="inline-flex items-center px-8 py-4 bg-arancio text-white font-medium rounded-lg hover:bg-arancio/90 transition-colors duration-300"
                >
                  Scopri i percorsi
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-16 bg-beige">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-lg text-antracite leading-relaxed mb-8">
                Non una lista di servizi, ma <strong>percorsi di apprendimento e trasformazione</strong>, 
                pensati per accompagnare le organizzazioni nella comprensione del digitale e dei suoi impatti.
              </p>
              <div className="flex justify-center">
                <BookOpen className="h-12 w-12 text-turchese/60" />
              </div>
            </div>
          </div>
        </section>

        {/* Infografica Vantaggi */}
        <section className="py-16 bg-beige">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
                <div className="bg-white rounded-xl p-6 text-center hover-lift">
                  <CheckCircle2 className="h-12 w-12 text-turchese mx-auto mb-4" />
                  <p className="text-antracite font-medium">Meno tool, più efficienza</p>
                </div>
                <div className="bg-white rounded-xl p-6 text-center hover-lift">
                  <TrendingUp className="h-12 w-12 text-arancio mx-auto mb-4" />
                  <p className="text-antracite font-medium">Crescita del know-how digitale</p>
                </div>
                <div className="bg-white rounded-xl p-6 text-center hover-lift">
                  <Link2 className="h-12 w-12 text-turchese mx-auto mb-4" />
                  <p className="text-antracite font-medium">Collaborazione potenziata</p>
                </div>
                <div className="bg-white rounded-xl p-6 text-center hover-lift">
                  <Map className="h-12 w-12 text-arancio mx-auto mb-4" />
                  <p className="text-antracite font-medium">Roadmap personalizzata</p>
                </div>
                <div className="bg-white rounded-xl p-6 text-center hover-lift">
                  <Award className="h-12 w-12 text-turchese mx-auto mb-4" />
                  <p className="text-antracite font-medium">Certificazione finale</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tabella Comparativa */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl lg:text-4xl font-serif-elegant font-bold text-antracite mb-12 text-center">
                Confronta i percorsi
              </h2>
              <div className="bg-beige rounded-xl p-8 overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-bold text-antracite w-[15%]">Percorso</TableHead>
                      <TableHead className="font-bold text-antracite w-[22%]">Focus</TableHead>
                      <TableHead className="font-bold text-antracite w-[23%]">Output finale</TableHead>
                      <TableHead className="font-bold text-antracite w-[18%]">Modalità</TableHead>
                      <TableHead className="font-bold text-antracite w-[22%]">Certificazione</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-semibold text-turchese w-[15%]">Initium</TableCell>
                      <TableCell className="w-[22%]">AI operativa, ChatGPT, Copilot</TableCell>
                      <TableCell className="w-[23%]">Produttività + Second Brain</TableCell>
                      <TableCell className="w-[18%]">Online/In presenza</TableCell>
                      <TableCell className="w-[22%]">Certified AI Productivity</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-semibold text-arancio w-[15%]">Structura</TableCell>
                      <TableCell className="w-[22%]">Second Brain aziendale</TableCell>
                      <TableCell className="w-[23%]">Knowledge management scalabile</TableCell>
                      <TableCell className="w-[18%]">Online/In presenza</TableCell>
                      <TableCell className="w-[22%]">Certified Second Brain Impl.</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-semibold text-turchese w-[15%]">Communitas</TableCell>
                      <TableCell className="w-[22%]">Collaborazione intelligente</TableCell>
                      <TableCell className="w-[23%]">Project & team management</TableCell>
                      <TableCell className="w-[18%]">Online/In presenza</TableCell>
                      <TableCell className="w-[22%]">Certified Collaboration Hub</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-semibold text-antracite w-[15%]">Transforma</TableCell>
                      <TableCell className="w-[22%]">Ecosistema integrato</TableCell>
                      <TableCell className="w-[23%]">Roadmap personalizzata, ROI</TableCell>
                      <TableCell className="w-[18%]">Su misura</TableCell>
                      <TableCell className="w-[22%]">Ecosistema digitale Noscite</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </section>

        {/* Percorsi Section */}
        <section id="percorsi" className="py-20 bg-beige">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl lg:text-4xl font-serif-elegant font-bold text-antracite mb-16 text-center">
                Percorsi Formativi
              </h2>
              
              <div className="grid gap-12">
                {/* Initium */}
                <div className="animate-slide-up">
                  <div className="bg-gradient-to-r from-turchese/10 to-turchese/5 rounded-xl p-8 lg:p-12 border border-turchese/20">
                    <div className="flex items-start mb-8">
                      <div className="w-16 h-16 bg-turchese rounded-full flex items-center justify-center mr-6">
                        <span className="text-white font-bold text-xl">1</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-3xl font-serif-elegant font-bold text-antracite font-latin-italic mb-2">
                          Initium
                        </h3>
                        <p className="text-xl text-turchese font-medium mb-4">
                          Fondamenta AI Operativa
                        </p>
                        <div className="grid md:grid-cols-2 gap-4 mb-6">
                          <div className="flex items-center">
                            <BookOpen className="h-5 w-5 text-turchese mr-2" />
                            <span className="text-antracite font-medium">20 ore (5 moduli × 4h)</span>
                          </div>
                          <div className="flex items-center">
                            <Target className="h-5 w-5 text-arancio mr-2" />
                            <span className="text-antracite font-medium">Certified AI Productivity User</span>
                          </div>
                        </div>
                        <p className="text-antracite/80 leading-relaxed text-lg mb-6">
                          Acquisire competenze pratiche per usare ChatGPT e Copilot 365 nelle attività quotidiane e introdurre il concetto di Second Brain.
                        </p>
                        
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                          <div className="bg-white p-4 rounded-lg">
                            <h4 className="font-semibold text-antracite mb-2">Intro AI e Prompt Engineering</h4>
                            <p className="text-sm text-antracite/70">AI conversazionale e prompt efficaci</p>
                          </div>
                          <div className="bg-white p-4 rounded-lg">
                            <h4 className="font-semibold text-antracite mb-2">AI per il Business</h4>
                            <p className="text-sm text-antracite/70">Applicazioni in PMI e automazioni</p>
                          </div>
                          <div className="bg-white p-4 rounded-lg">
                            <h4 className="font-semibold text-antracite mb-2">Copilot 365</h4>
                            <p className="text-sm text-antracite/70">Integrazione e produttività</p>
                          </div>
                          <div className="bg-white p-4 rounded-lg">
                            <h4 className="font-semibold text-antracite mb-2">Funzionalità Avanzate</h4>
                            <p className="text-sm text-antracite/70">Workflow e automazioni Teams</p>
                          </div>
                          <div className="bg-white p-4 rounded-lg">
                            <h4 className="font-semibold text-antracite mb-2">Second Brain Intro</h4>
                            <p className="text-sm text-antracite/70">Knowledge management e metodo CODE</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Structura */}
                <div className="animate-slide-up" style={{ animationDelay: '200ms' }}>
                  <div className="bg-gradient-to-r from-arancio/10 to-arancio/5 rounded-xl p-8 lg:p-12 border border-arancio/20">
                    <div className="flex items-start mb-8">
                      <div className="w-16 h-16 bg-arancio rounded-full flex items-center justify-center mr-6">
                        <span className="text-white font-bold text-xl">2</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-3xl font-serif-elegant font-bold text-antracite font-latin-italic mb-2">
                          Structura
                        </h3>
                        <p className="text-xl text-arancio font-medium mb-4">
                          Second Brain Aziendale
                        </p>
                        <div className="grid md:grid-cols-2 gap-4 mb-6">
                          <div className="flex items-center">
                            <BookOpen className="h-5 w-5 text-arancio mr-2" />
                            <span className="text-antracite font-medium">24 ore (6 moduli × 4h)</span>
                          </div>
                          <div className="flex items-center">
                            <Target className="h-5 w-5 text-turchese mr-2" />
                            <span className="text-antracite font-medium">Certified Second Brain Implementer</span>
                          </div>
                        </div>
                        <p className="text-antracite/80 leading-relaxed text-lg mb-6">
                          Creare un sistema scalabile di gestione della conoscenza con Obsidian, integrato con AI e processi aziendali.
                        </p>
                        
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                          <div className="bg-white p-4 rounded-lg">
                            <h4 className="font-semibold text-antracite mb-2">Metodo CODE</h4>
                            <p className="text-sm text-antracite/70">Capture, Organize, Distill, Express</p>
                          </div>
                          <div className="bg-white p-4 rounded-lg">
                            <h4 className="font-semibold text-antracite mb-2">Setup Vault Aziendale</h4>
                            <p className="text-sm text-antracite/70">Creazione e struttura base</p>
                          </div>
                          <div className="bg-white p-4 rounded-lg">
                            <h4 className="font-semibold text-antracite mb-2">Template Avanzati</h4>
                            <p className="text-sm text-antracite/70">Dashboard e organizzazione</p>
                          </div>
                          <div className="bg-white p-4 rounded-lg">
                            <h4 className="font-semibold text-antracite mb-2">AI & Automazioni</h4>
                            <p className="text-sm text-antracite/70">Plugin AI e workflow automatici</p>
                          </div>
                          <div className="bg-white p-4 rounded-lg">
                            <h4 className="font-semibold text-antracite mb-2">Collaborazione</h4>
                            <p className="text-sm text-antracite/70">Ruoli, permessi e governance</p>
                          </div>
                          <div className="bg-white p-4 rounded-lg">
                            <h4 className="font-semibold text-antracite mb-2">Certificazione</h4>
                            <p className="text-sm text-antracite/70">Piano implementazione</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Communitas */}
                <div className="animate-slide-up" style={{ animationDelay: '400ms' }}>
                  <div className="bg-gradient-to-r from-turchese/10 to-turchese/5 rounded-xl p-8 lg:p-12 border border-turchese/20">
                    <div className="flex items-start mb-8">
                      <div className="w-16 h-16 bg-turchese rounded-full flex items-center justify-center mr-6">
                        <span className="text-white font-bold text-xl">3</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-3xl font-serif-elegant font-bold text-antracite font-latin-italic mb-2">
                          Communitas
                        </h3>
                        <p className="text-xl text-turchese font-medium mb-4">
                          Collaborazione Intelligente
                        </p>
                        <div className="grid md:grid-cols-2 gap-4 mb-6">
                          <div className="flex items-center">
                            <BookOpen className="h-5 w-5 text-turchese mr-2" />
                            <span className="text-antracite font-medium">24 ore (6 moduli × 4h)</span>
                          </div>
                          <div className="flex items-center">
                            <Target className="h-5 w-5 text-arancio mr-2" />
                            <span className="text-antracite font-medium">Certified Collaboration Hub User</span>
                          </div>
                        </div>
                        <p className="text-antracite/80 leading-relaxed text-lg mb-6">
                          Creare un sistema di collaborazione e project management integrato, basato su Obsidian come Collaboration Hub.
                        </p>
                        
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                          <div className="bg-white p-4 rounded-lg">
                            <h4 className="font-semibold text-antracite mb-2">Fondamenti Collaborazione</h4>
                            <p className="text-sm text-antracite/70">Governance e flussi comunicazione</p>
                          </div>
                          <div className="bg-white p-4 rounded-lg">
                            <h4 className="font-semibold text-antracite mb-2">Obsidian Hub</h4>
                            <p className="text-sm text-antracite/70">Vault condiviso e dashboard team</p>
                          </div>
                          <div className="bg-white p-4 rounded-lg">
                            <h4 className="font-semibold text-antracite mb-2">Gestione Progetti</h4>
                            <p className="text-sm text-antracite/70">Bases, Kanban e task management</p>
                          </div>
                          <div className="bg-white p-4 rounded-lg">
                            <h4 className="font-semibold text-antracite mb-2">Task & Automazioni</h4>
                            <p className="text-sm text-antracite/70">Plugin e workflow automatici</p>
                          </div>
                          <div className="bg-white p-4 rounded-lg">
                            <h4 className="font-semibold text-antracite mb-2">Integrazione Esterna</h4>
                            <p className="text-sm text-antracite/70">Teams/Slack e calendari</p>
                          </div>
                          <div className="bg-white p-4 rounded-lg">
                            <h4 className="font-semibold text-antracite mb-2">Playbook Aziendale</h4>
                            <p className="text-sm text-antracite/70">Setup completo e certificazione</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Transforma */}
                <div className="animate-slide-up" style={{ animationDelay: '600ms' }}>
                  <div className="bg-gradient-to-r from-antracite to-antracite/90 rounded-xl p-8 lg:p-12 text-white">
                    <div className="flex items-start mb-8">
                      <div className="w-16 h-16 bg-arancio rounded-full flex items-center justify-center mr-6">
                        <span className="text-white font-bold text-xl">∞</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-3xl font-serif-elegant font-bold text-white font-latin-italic mb-2">
                          Transforma
                        </h3>
                        <p className="text-xl text-arancio font-medium mb-4">
                          Percorso Integrato Completo
                        </p>
                        <div className="grid md:grid-cols-2 gap-4 mb-6">
                          <div className="flex items-center">
                            <BookOpen className="h-5 w-5 text-arancio mr-2" />
                            <span className="text-white font-medium">68 ore totali (Initium + Structura + Communitas)</span>
                          </div>
                          <div className="flex items-center">
                            <Target className="h-5 w-5 text-turchese mr-2" />
                            <span className="text-white font-medium">Ecosistema digitale integrato</span>
                          </div>
                        </div>
                        <p className="text-white/90 leading-relaxed text-lg mb-8">
                          Il percorso completo per trasformare l'organizzazione con un ecosistema digitale integrato, roadmap personalizzata e ROI misurabile.
                        </p>
                        
                        <div className="bg-white/10 rounded-lg p-6 mb-6">
                          <h4 className="font-bold text-white mb-4">Benefici Sinergici</h4>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="flex items-start">
                              <div className="w-2 h-2 bg-turchese rounded-full mt-2 mr-3 flex-shrink-0"></div>
                              <div>
                                <p className="text-white font-medium">Unificazione in Obsidian</p>
                                <p className="text-white/70 text-sm">Knowledge + progetti + task</p>
                              </div>
                            </div>
                            <div className="flex items-start">
                              <div className="w-2 h-2 bg-arancio rounded-full mt-2 mr-3 flex-shrink-0"></div>
                              <div>
                                <p className="text-white font-medium">Riduzione tool-fatigue</p>
                                <p className="text-white/70 text-sm">Meno strumenti, più valore</p>
                              </div>
                            </div>
                            <div className="flex items-start">
                              <div className="w-2 h-2 bg-turchese rounded-full mt-2 mr-3 flex-shrink-0"></div>
                              <div>
                                <p className="text-white font-medium">Processi scalabili</p>
                                <p className="text-white/70 text-sm">Dal team a tutta l'azienda</p>
                              </div>
                            </div>
                            <div className="flex items-start">
                              <div className="w-2 h-2 bg-arancio rounded-full mt-2 mr-3 flex-shrink-0"></div>
                              <div>
                                <p className="text-white font-medium">Allineamento consulenziale</p>
                                <p className="text-white/70 text-sm">Coerenza con AI Sprint & Evolution</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="bg-white/10 rounded-lg p-6">
                          <h4 className="font-bold text-white mb-4">Timeline Implementazione</h4>
                          <div className="grid md:grid-cols-4 gap-4">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-turchese mb-1">M1</div>
                              <p className="text-white/80 text-sm">Initium</p>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-arancio mb-1">M3-4</div>
                              <p className="text-white/80 text-sm">Structura</p>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-turchese mb-1">M6-7</div>
                              <p className="text-white/80 text-sm">Communitas</p>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-arancio mb-1">M12</div>
                              <p className="text-white/80 text-sm">ROI Review</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline Grafica */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl lg:text-4xl font-serif-elegant font-bold text-antracite mb-12 text-center">
                Il percorso del cambiamento
              </h2>
              <div className="relative">
                <div className="absolute top-1/2 left-0 right-0 h-1 bg-turchese/20 -translate-y-1/2 hidden lg:block"></div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
                  <div className="bg-beige rounded-xl p-8 text-center hover-lift">
                    <div className="w-16 h-16 bg-turchese rounded-full flex items-center justify-center mx-auto mb-4 relative z-10">
                      <span className="text-white font-bold text-xl">1</span>
                    </div>
                    <h3 className="text-xl font-bold text-antracite mb-2">Mese 1</h3>
                    <p className="text-turchese font-semibold mb-2">AI operativa per tutti</p>
                    <p className="text-antracite/70 text-sm">Initium</p>
                  </div>
                  <div className="bg-beige rounded-xl p-8 text-center hover-lift">
                    <div className="w-16 h-16 bg-arancio rounded-full flex items-center justify-center mx-auto mb-4 relative z-10">
                      <span className="text-white font-bold text-xl">2</span>
                    </div>
                    <h3 className="text-xl font-bold text-antracite mb-2">Mesi 3-4</h3>
                    <p className="text-arancio font-semibold mb-2">Second Brain aziendale</p>
                    <p className="text-antracite/70 text-sm">Structura</p>
                  </div>
                  <div className="bg-beige rounded-xl p-8 text-center hover-lift">
                    <div className="w-16 h-16 bg-turchese rounded-full flex items-center justify-center mx-auto mb-4 relative z-10">
                      <span className="text-white font-bold text-xl">3</span>
                    </div>
                    <h3 className="text-xl font-bold text-antracite mb-2">Mesi 6-7</h3>
                    <p className="text-turchese font-semibold mb-2">Hub di collaborazione</p>
                    <p className="text-antracite/70 text-sm">Communitas</p>
                  </div>
                  <div className="bg-beige rounded-xl p-8 text-center hover-lift">
                    <div className="w-16 h-16 bg-arancio rounded-full flex items-center justify-center mx-auto mb-4 relative z-10">
                      <span className="text-white font-bold text-xl">12</span>
                    </div>
                    <h3 className="text-xl font-bold text-antracite mb-2">Mese 12</h3>
                    <p className="text-arancio font-semibold mb-2">ROI e crescita misurabile</p>
                    <p className="text-antracite/70 text-sm">Transforma</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Second Brain Section */}
        <section className="py-20 bg-gradient-to-br from-turchese/10 to-beige">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-white rounded-xl p-12 shadow-lg">
                <BookOpen className="h-16 w-16 text-turchese mx-auto mb-6" />
                <h2 className="text-3xl font-serif-elegant font-bold text-antracite mb-6">
                  Il Second Brain aziendale: l'asset strategico
                </h2>
                <p className="text-lg text-antracite/80 leading-relaxed">
                  Il Second Brain aziendale è il sistema che trasforma il know-how disperso in una risorsa accessibile e scalabile, 
                  permettendo alle PMI di innovare, semplificare e crescere con il supporto dell'AI.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Note di rassicurazione */}
        <section className="py-16 bg-beige">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-r from-arancio/10 to-turchese/10 rounded-xl p-8 border-l-4 border-arancio">
                <p className="text-lg text-antracite leading-relaxed text-center">
                  <strong>Ogni percorso è modulabile e adattabile</strong> alle esigenze specifiche della tua organizzazione. 
                  Nessun prezzo fisso: costruiamo insieme la soluzione più efficace.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl lg:text-4xl font-serif-elegant font-bold text-antracite mb-12 text-center">
                Domande frequenti
              </h2>
              <FAQItem 
                question="Quanto dura ogni percorso?"
                answer="Initium: 20h, Structura/Communitas: 24h ciascuno, Transforma: 68h se completo."
              />
              <FAQItem 
                question="I corsi sono personalizzabili?"
                answer="Sì, costruiamo percorsi su misura per ogni realtà aziendale."
              />
              <FAQItem 
                question="È prevista la formazione in gruppo?"
                answer="Certo, massima efficacia per team fino a 12 partecipanti."
              />
              <FAQItem 
                question="Serve esperienza tecnica?"
                answer="No, i percorsi sono pensati per manager e responsabili senza background digitale."
              />
              <FAQItem 
                question="Come posso avere una demo?"
                answer="Basta compilare il form di contatto o richiedere una call gratuita."
              />
            </div>
          </div>
        </section>

        {/* CTA Intermedia */}
        <section className="py-16 bg-gradient-to-r from-turchese to-arancio">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h3 className="text-3xl font-bold text-white mb-6">
                Vuoi saperne di più?
              </h3>
              <p className="text-xl text-white/90 mb-8">
                Prenota una consulenza gratuita e scopri il percorso su misura per te e la tua azienda.
              </p>
              <a 
                href="/contactus"
                className="inline-flex items-center px-8 py-4 bg-white text-turchese font-medium rounded-lg hover:bg-beige transition-colors duration-300"
              >
                Prenota ora
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-antracite">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl lg:text-4xl font-serif-elegant font-bold text-white mb-8">
                Inizia il tuo percorso di conoscenza
              </h2>
              <p className="text-xl text-grigio-chiaro leading-relaxed mb-12">
                La trasformazione digitale inizia dalla comprensione. Costruiamo insieme il percorso più adatto alle tue esigenze.
              </p>
              <a 
                href="/contactus"
                className="inline-flex items-center px-8 py-4 bg-arancio text-white font-medium rounded-lg hover:bg-turchese transition-colors duration-300"
              >
                Contattaci
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Atheneum;