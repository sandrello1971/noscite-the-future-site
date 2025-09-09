import { Button } from "@/components/ui/button";
import { ArrowRight, Search, BarChart3, Zap, Phone, Users, TrendingUp, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { AccessibleVideo } from "@/components/AccessibleVideo";
import { Badge } from "@/components/ui/badge";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Accessible Video Background */}
      <AccessibleVideo
        src="/noscitelogo.mp4"
        className="absolute inset-0 w-full h-full z-0"
        ariaLabel="Video promozionale Noscite - trasformazione digitale e intelligenza artificiale per le aziende"
      >
        Scopri i nostri servizi di trasformazione digitale e intelligenza artificiale.
      </AccessibleVideo>
      
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
              <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
                Non vendiamo pacchetti. Progettiamo, implementiamo e governiamo trasformazioni digitali misurabili, 
                su misura per le PMI.
              </p>
            </div>
            
            {/* Key differentiators */}
            <div className="flex flex-wrap gap-3">
              <Badge variant="secondary" className="px-4 py-2">
                Metodo strutturato in 7 fasi
              </Badge>
              <Badge variant="secondary" className="px-4 py-2">
                ROI in 30 giorni
              </Badge>
              <Badge variant="secondary" className="px-4 py-2">
                KPI misurabili
              </Badge>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="cta" size="lg" asChild>
                <Link to="/contatti">
                  <Phone className="mr-2 h-5 w-5" />
                  Prenota Discovery (30')
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/servizi">
                  Scopri il Metodo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>

          </div>

          {/* Right Column - Metodo Noscite Preview */}
          <div className="relative animate-slide-up">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-card p-4 rounded-xl shadow-lg hover-lift">
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">1</div>
                    <Search className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-sm mb-1">Cognitio</h3>
                  <p className="text-xs text-muted-foreground">
                    Discovery & Allineamento
                  </p>
                </div>
                <div className="bg-card p-4 rounded-xl shadow-lg hover-lift">
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">2</div>
                    <BarChart3 className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-sm mb-1">Diagnostica</h3>
                  <p className="text-xs text-muted-foreground">
                    Assessment & Priorità
                  </p>
                </div>
                <div className="bg-card p-4 rounded-xl shadow-lg hover-lift">
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">3</div>
                    <Settings className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-sm mb-1">Design</h3>
                  <p className="text-xs text-muted-foreground">
                    Blueprint Operativo
                  </p>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="bg-card p-4 rounded-xl shadow-lg hover-lift">
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="w-6 h-6 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center text-xs font-bold">4</div>
                    <Zap className="h-6 w-6 text-secondary" />
                  </div>
                  <h3 className="font-semibold text-sm mb-1">Experimentum</h3>
                  <p className="text-xs text-muted-foreground">
                    Pilot in 30 giorni
                  </p>
                </div>
                <div className="bg-card p-4 rounded-xl shadow-lg hover-lift">
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="w-6 h-6 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center text-xs font-bold">5</div>
                    <Users className="h-6 w-6 text-secondary" />
                  </div>
                  <h3 className="font-semibold text-sm mb-1">Adoptio</h3>
                  <p className="text-xs text-muted-foreground">
                    Adozione & Formazione
                  </p>
                </div>
                <div className="bg-card p-4 rounded-xl shadow-lg hover-lift">
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="w-6 h-6 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center text-xs font-bold">7</div>
                    <TrendingUp className="h-6 w-6 text-secondary" />
                  </div>
                  <h3 className="font-semibold text-sm mb-1">Governantia</h3>
                  <p className="text-xs text-muted-foreground">
                    PMO & Miglioramento
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