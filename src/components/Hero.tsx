import { Button } from "@/components/ui/button";
import { ArrowRight, Search, BarChart3, Zap, Phone, Users, TrendingUp, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { AccessibleVideo } from "@/components/AccessibleVideo";
import { Badge } from "@/components/ui/badge";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden bg-antracite">
      {/* Accessible Video Background */}
      <AccessibleVideo
        src="/noscitelogo.mp4"
        className="absolute inset-0 w-full h-full z-0 opacity-30"
        ariaLabel="Video promozionale Noscite - trasformazione digitale e intelligenza artificiale per le aziende"
      >
        Scopri i nostri servizi di trasformazione digitale e intelligenza artificiale.
      </AccessibleVideo>
      
      {/* Overlay for text readability */}
      <div className="absolute inset-0 bg-antracite/40 z-10"></div>
      
      <div className="container mx-auto px-4 lg:px-8 relative z-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-serif-elegant font-bold text-white leading-tight">
                <span className="font-latin-italic text-primary">In Digitali</span>
                <span className="block font-latin-italic text-secondary">nova Virtus</span>
              </h1>
              <p className="text-xl text-white/90 leading-relaxed max-w-xl">
                Il digitale non è solo tecnologia, ma capacità di creare valore attraverso metodo, visione e innovazione.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="secondary" size="lg" asChild className="hover:bg-primary hover:border-primary transition-colors duration-300">
                <Link to="/servizi">
                  Scopri il nostro approccio
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="border-white text-white hover:bg-white hover:text-antracite">
                <Link to="/contatti">
                  <Phone className="mr-2 h-5 w-5" />
                  Contattaci
                </Link>
              </Button>
            </div>
          </div>

          {/* Right Column - Methodus Preview */}
          <div className="relative animate-slide-up">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-4">
                <div className="bg-card/10 backdrop-blur-sm p-4 rounded-xl shadow-lg hover-lift border border-white/20">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                    <Search className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-serif-elegant font-semibold text-white mb-1 font-latin-italic">Auditio</h3>
                  <p className="text-sm text-white/80">Ascolto e comprensione</p>
                </div>
                
                <div className="bg-card/10 backdrop-blur-sm p-4 rounded-xl shadow-lg hover-lift border border-white/20">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                    <BarChart3 className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-serif-elegant font-semibold text-white mb-1 font-latin-italic">Analytica</h3>
                  <p className="text-sm text-white/80">Analisi approfondita</p>
                </div>

                <div className="bg-card/10 backdrop-blur-sm p-4 rounded-xl shadow-lg hover-lift border border-white/20">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-8 h-8 bg-secondary text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                    <Users className="h-6 w-6 text-secondary" />
                  </div>
                  <h3 className="font-serif-elegant font-semibold text-white mb-1 font-latin-italic">Co-creatio</h3>
                  <p className="text-sm text-white/80">Progettazione condivisa</p>
                </div>

                <div className="bg-card/10 backdrop-blur-sm p-4 rounded-xl shadow-lg hover-lift border border-white/20">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-8 h-8 bg-secondary text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
                    <Zap className="h-6 w-6 text-secondary" />
                  </div>
                  <h3 className="font-serif-elegant font-semibold text-white mb-1 font-latin-italic">Implementatio</h3>
                  <p className="text-sm text-white/80">Realizzazione concreta</p>
                </div>

                <div className="bg-card/10 backdrop-blur-sm p-4 rounded-xl shadow-lg hover-lift border border-white/20">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-8 h-8 bg-secondary text-white rounded-full flex items-center justify-center text-sm font-bold">5</div>
                    <TrendingUp className="h-6 w-6 text-secondary" />
                  </div>
                  <h3 className="font-serif-elegant font-semibold text-white mb-1 font-latin-italic">Evolutio</h3>
                  <p className="text-sm text-white/80">Miglioramento continuo</p>
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