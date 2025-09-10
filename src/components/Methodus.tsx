import { Card, CardContent } from "@/components/ui/card";
import { Search, BarChart3, Users, Zap, TrendingUp } from "lucide-react";

const Methodus = () => {
  const fasi = [
    {
      numero: 1,
      title: "Auditio",
      subtitle: "Ascolto",
      description: "Comprendiamo profondamente la realtà aziendale, i processi esistenti e le sfide specifiche.",
      icon: Search,
      color: "text-primary"
    },
    {
      numero: 2,
      title: "Analytica", 
      subtitle: "Analisi",
      description: "Analizziamo dati, processi e opportunità per identificare le priorità strategiche.",
      icon: BarChart3,
      color: "text-primary"
    },
    {
      numero: 3,
      title: "Co-creatio",
      subtitle: "Progettazione condivisa", 
      description: "Costruiamo insieme la soluzione, coinvolgendo tutti gli stakeholder chiave.",
      icon: Users,
      color: "text-secondary"
    },
    {
      numero: 4,
      title: "Implementatio",
      subtitle: "Realizzazione",
      description: "Mettiamo in pratica le soluzioni progettate con un approccio agile e iterativo.",
      icon: Zap,
      color: "text-secondary"
    },
    {
      numero: 5,
      title: "Evolutio",
      subtitle: "Miglioramento continuo",
      description: "Monitoriamo i risultati e ottimizziamo costantemente per massimizzare il valore.",
      icon: TrendingUp,
      color: "text-secondary"
    }
  ];

  return (
    <section className="py-20 bg-antracite">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl lg:text-5xl font-serif-elegant font-bold text-white mb-6">
            <span className="font-latin-italic">Methodus</span>
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Il nostro approccio segue cinque momenti essenziali per trasformare le sfide in opportunità concrete.
          </p>
        </div>

        {/* Timeline delle fasi */}
        <div className="relative max-w-4xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary via-secondary to-secondary opacity-30"></div>
          
          <div className="space-y-12">
            {fasi.map((fase, index) => {
              const IconComponent = fase.icon;
              const isEven = index % 2 === 0;
              
              return (
                <div key={fase.numero} className={`flex items-center ${isEven ? 'flex-row' : 'flex-row-reverse'} animate-slide-up`} style={{ animationDelay: `${index * 200}ms` }}>
                  <div className={`w-1/2 ${isEven ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <Card className="bg-card/10 backdrop-blur-sm border-white/20 hover-lift">
                      <CardContent className="p-6">
                        <div className={`flex items-center space-x-4 ${!isEven ? 'flex-row' : 'flex-row-reverse space-x-reverse'}`}>
                          <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                            <IconComponent className={`h-8 w-8 ${fase.color}`} />
                          </div>
                          <div className={isEven ? 'text-right' : 'text-left'}>
                            <h3 className="text-2xl font-serif-elegant font-bold text-white font-latin-italic mb-1">
                              {fase.title}
                            </h3>
                            <h4 className="text-lg font-semibold text-white/80 mb-2">
                              {fase.subtitle}
                            </h4>
                            <p className="text-white/70">
                              {fase.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  {/* Timeline dot */}
                  <div className="relative z-10">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg ${fase.color === 'text-primary' ? 'bg-primary' : 'bg-secondary'}`}>
                      {fase.numero}
                    </div>
                  </div>
                  
                  <div className="w-1/2"></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Methodus;