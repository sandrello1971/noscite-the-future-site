import { Search, BarChart3, Users, Zap, TrendingUp } from "lucide-react";

const Methodus = () => {
  const steps = [
    {
      icon: Search,
      title: "Auditio",
      description: "Ascolto e comprensione profonda delle esigenze",
      number: 1
    },
    {
      icon: BarChart3,
      title: "Analytica", 
      description: "Analisi dettagliata dei processi e delle opportunità",
      number: 2
    },
    {
      icon: Users,
      title: "Co-creatio",
      description: "Progettazione condivisa delle soluzioni",
      number: 3
    },
    {
      icon: Zap,
      title: "Implementatio",
      description: "Realizzazione concreta e misurata",
      number: 4
    },
    {
      icon: TrendingUp,
      title: "Evolutio",
      description: "Miglioramento continuo e adattamento",
      number: 5
    }
  ];

  return (
    <section className="py-20 bg-antracite">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl lg:text-6xl font-serif-elegant font-bold text-white mb-6">
              <span className="font-latin-italic">Methodus</span>
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Percorso in 5 fasi: <strong>Auditio, Analytica, Co-creatio, Implementatio, Evolutio</strong>
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line with Progress Animation */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary/30 hidden lg:block">
              <div className="w-full h-0 bg-gradient-to-b from-secondary to-primary animate-[timeline-progress_3s_ease-out_forwards]"></div>
            </div>
            
            <div className="space-y-12">
              {steps.map((step, index) => {
                const IconComponent = step.icon;
                const isEven = index % 2 === 0;
                
                return (
                  <div key={step.title} className={`flex items-center ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} animate-slide-up`} style={{ animationDelay: `${index * 200}ms` }}>
                    <div className={`flex-1 ${isEven ? 'lg:pr-12' : 'lg:pl-12'}`}>
                      <div className={`bg-card/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 hover-lift ${isEven ? 'lg:text-right' : 'lg:text-left'}`}>
                        <div className={`flex items-center space-x-4 mb-4 ${isEven ? 'lg:justify-end lg:flex-row-reverse lg:space-x-reverse' : ''}`}>
                          <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center shadow-lg">
                            <IconComponent className="h-6 w-6 text-white" />
                          </div>
                          <h3 className="text-2xl font-serif-elegant font-bold text-white font-latin-italic">
                            {step.title}
                          </h3>
                        </div>
                        <p className="text-white/80 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                    
                    {/* Timeline Node with Golden Color */}
                    <div className="hidden lg:block relative z-10">
                      <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                        <span className="text-antracite font-bold text-sm">{step.number}</span>
                      </div>
                    </div>
                    
                    <div className="flex-1"></div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
};

export default Methodus;