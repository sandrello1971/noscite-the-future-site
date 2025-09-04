import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, Target, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Video Background */}
      <video 
        autoPlay 
        muted 
        loop 
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/noscitelogo.mp4" type="video/mp4" />
      </video>
      
      {/* Overlay for text readability */}
      <div className="absolute inset-0 bg-background/60 z-10"></div>
      
      <div className="container mx-auto px-4 lg:px-8 relative z-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                <span className="text-primary">In Digitali</span>
                <span className="block text-secondary">Nova Virtus</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Innovazione human-centric: consulenza, implementazione e academy integrate per risultati concreti e sostenibili.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg" asChild>
                <Link to="/servizi">
                  Scopri i Servizi
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>

          </div>

          {/* Right Column - Visual Elements */}
          <div className="relative animate-slide-up">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="bg-card p-6 rounded-xl shadow-lg hover-lift">
                  <Brain className="h-12 w-12 text-primary mb-4" />
                  <h3 className="font-semibold text-lg mb-2">Athenaeum AI</h3>
                  <p className="text-sm text-muted-foreground">
                    Formazione completa sull'intelligenza artificiale
                  </p>
                </div>
                <div className="bg-card p-6 rounded-xl shadow-lg hover-lift">
                  <Zap className="h-12 w-12 text-secondary mb-4" />
                  <h3 className="font-semibold text-lg mb-2">AI Sprint</h3>
                  <p className="text-sm text-muted-foreground">
                    Implementazione rapida e misurabile
                  </p>
                </div>
              </div>
              <div className="space-y-6 pt-12">
                <div className="bg-card p-6 rounded-xl shadow-lg hover-lift">
                  <Target className="h-12 w-12 text-primary mb-4" />
                  <h3 className="font-semibold text-lg mb-2">Launchpad</h3>
                  <p className="text-sm text-muted-foreground">
                    Il tuo trampolino verso l'innovazione
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;