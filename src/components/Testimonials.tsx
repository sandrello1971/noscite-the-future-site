import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      content: "Noscite ha trasformato completamente il nostro approccio al digitale. In 6 mesi abbiamo automatizzato il 70% dei processi ripetitivi.",
      author: "Marco Rossi",
      role: "CEO",
      company: "TechInnovate SRL",
      rating: 5
    },
    {
      content: "L'AI Academy ci ha dato le competenze necessarie per rimanere competitivi. Il team è ora autonomo nell'implementazione di soluzioni AI.",
      author: "Laura Bianchi",
      role: "CTO",
      company: "Digital Solutions",
      rating: 5
    },
    {
      content: "Il supporto strategico ha trasformato la nostra visione digitale. I risultati hanno superato le nostre aspettative.",
      author: "Giuseppe Verdi",
      role: "Founder",
      company: "StartUp Innovativa",
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
            Cosa Dicono i Nostri Clienti
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            La soddisfazione dei nostri clienti è la nostra priorità. Ecco alcune testimonianze dei risultati ottenuti.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover-lift animate-slide-up" style={{ animationDelay: `${index * 150}ms` }}>
              <CardContent className="p-8">
                {/* Rating */}
                <div className="flex space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-secondary text-secondary" />
                  ))}
                </div>
                
                {/* Quote */}
                <blockquote className="text-foreground leading-relaxed mb-6">
                  "{testimonial.content}"
                </blockquote>
                
                {/* Author */}
                <div className="border-t border-border pt-4">
                  <div className="font-semibold text-foreground">{testimonial.author}</div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role} - {testimonial.company}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;