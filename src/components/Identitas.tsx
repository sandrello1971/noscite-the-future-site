import { Users, Target, Lightbulb } from "lucide-react";

const Identitas = () => {
  const values = [
    {
      icon: Target,
      title: "Veritas",
      description: "La verità come fondamento di ogni relazione professionale"
    },
    {
      icon: Lightbulb, 
      title: "Innovatio",
      description: "L'innovazione come motore del cambiamento"
    },
    {
      icon: Users,
      title: "Fiducia", 
      description: "La fiducia come base di ogni partnership duratura"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text */}
            <div className="animate-fade-in">
              <h2 className="text-4xl lg:text-6xl font-serif-elegant font-bold text-foreground mb-6">
                <span className="font-latin-italic">Identitas</span>
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                Siamo Noscite: un centro di competenze che integra consulenza strategica, tecnologia e creatività.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Tre principi ci guidano: <strong>Veritas, Innovatio, Fiducia.</strong>
              </p>
            </div>

            {/* Right Column - Values */}
            <div className="space-y-6">
              {values.map((value, index) => {
                const IconComponent = value.icon;
                return (
                  <div key={value.title} className="flex items-start space-x-4 animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-serif-elegant font-bold text-foreground mb-2 font-latin-italic">
                        {value.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Identitas;