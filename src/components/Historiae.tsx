import { Target, Users, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Historiae = () => {
  const stories = [
    {
      title: "Exemplum I",
      challenge: "Processi interni complessi e comunicazione frammentata",
      path: "Auditio, analisi, co-creatio di nuovi workflow",
      result: "Più efficienza e competitività aziendale",
      icon: Target
    },
    {
      title: "Exemplum II", 
      challenge: "Migliorare la relazione con i clienti",
      path: "Revisione touchpoint digitali e customer journey",
      result: "Fidelizzazione e soddisfazione clienti",
      icon: Users
    },
    {
      title: "Exemplum III",
      challenge: "Necessità di scalare rapidamente i servizi",
      path: "Analisi architettura, progettazione scalabile, evolutio",
      result: "Crescita sostenibile mantenendo la qualità",
      icon: TrendingUp
    }
  ];

  return (
    <section className="py-20 bg-antracite">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl lg:text-6xl font-serif-elegant font-bold text-white mb-6">
              <span className="font-latin-italic">Historiae</span>
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Ogni progetto racconta un percorso di cambiamento: <strong>Sfida → Percorso → Risultato</strong>
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {stories.map((story, index) => {
              const IconComponent = story.icon;
              return (
                <div key={story.title} className="relative animate-slide-up" style={{ animationDelay: `${index * 150}ms` }}>
                  {/* Background image placeholder with overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-muted/20 to-antracite/40 rounded-xl"></div>
                  <div className="absolute inset-0 bg-secondary/20 rounded-xl opacity-60"></div>
                  
                  <Card className="relative bg-card/10 backdrop-blur-sm border-white/20 hover-lift">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-3 mb-6">
                        <div className="w-12 h-12 bg-secondary/30 rounded-full flex items-center justify-center">
                          <IconComponent className="h-6 w-6 text-secondary" />
                        </div>
                        <h3 className="text-xl font-serif-elegant font-bold text-white font-latin-italic">
                          {story.title}
                        </h3>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-semibold text-secondary mb-2">SFIDA</h4>
                          <p className="text-white/80 text-sm leading-relaxed">{story.challenge}</p>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-semibold text-primary mb-2">PERCORSO</h4>
                          <p className="text-white/80 text-sm leading-relaxed">{story.path}</p>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-semibold text-white mb-2">RISULTATO</h4>
                          <p className="text-white/90 text-sm leading-relaxed font-medium">{story.result}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-16 animate-fade-in">
            <p className="text-lg text-white/80 italic">
              Storie brevi, impatto concreto: ogni trasformazione ha le sue radici nell'ascolto.
            </p>
          </div>
        </div>
      </div>
    </section>
};

export default Historiae;