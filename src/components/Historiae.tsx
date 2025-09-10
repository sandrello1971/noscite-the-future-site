import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, CheckCircle } from "lucide-react";

const Historiae = () => {
  const esempi = [
    {
      title: "Exemplum I",
      sfida: "Processi interni complessi e frammentati che rallentavano le operazioni quotidiane",
      percorso: "Auditio approfondita, analisi dei flussi esistenti, co-creazione di nuovi processi integrati",
      risultato: "Riduzione del 40% dei tempi operativi e miglioramento significativo dell'efficienza"
    },
    {
      title: "Exemplum II", 
      sfida: "Difficoltà nel gestire la relazione con i clienti e bassa fidelizzazione",
      percorso: "Revisione completa dei touchpoint digitali e implementazione di nuovi strumenti CRM",
      risultato: "Incremento del 60% nella soddisfazione clienti e aumento della retention rate"
    }
  ];

  return (
    <section className="py-20 bg-antracite">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl lg:text-5xl font-serif-elegant font-bold text-white mb-6">
            <span className="font-latin-italic">Historiae</span>
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Ogni progetto racconta un percorso di cambiamento. Ecco alcuni esempi narrativi 
            di come trasformiamo le sfide in successi concreti.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {esempi.map((esempio, index) => (
            <Card key={esempio.title} className="bg-card/10 backdrop-blur-sm border-white/20 hover-lift animate-slide-up" style={{ animationDelay: `${index * 200}ms` }}>
              <CardContent className="p-8 space-y-6">
                <h3 className="text-2xl font-serif-elegant font-bold text-white font-latin-italic mb-6">
                  {esempio.title}
                </h3>
                
                {/* Sfida */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                    <h4 className="font-semibold text-secondary uppercase tracking-wide text-sm">Sfida</h4>
                  </div>
                  <p className="text-white/80 pl-4">{esempio.sfida}</p>
                </div>

                {/* Percorso */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <ArrowRight className="w-4 h-4 text-primary" />
                    <h4 className="font-semibold text-primary uppercase tracking-wide text-sm">Percorso</h4>
                  </div>
                  <p className="text-white/80 pl-6">{esempio.percorso}</p>
                </div>

                {/* Risultato */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    <h4 className="font-semibold text-primary uppercase tracking-wide text-sm">Risultato</h4>
                  </div>
                  <p className="text-white pl-6 font-medium">{esempio.risultato}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Historiae;