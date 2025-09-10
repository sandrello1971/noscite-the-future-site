import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { AccessibleVideo } from "@/components/AccessibleVideo";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden bg-antracite">
      {/* Pattern Abstract Background */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-secondary/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-white/10 rounded-full"></div>
      </div>

      {/* Large Logo in Transparency */}
      <div className="absolute inset-0 flex items-center justify-center z-5 opacity-5">
        <div className="w-96 h-96 bg-white rounded-full flex items-center justify-center">
          <span className="text-antracite font-bold text-9xl">N</span>
        </div>
      </div>
      
      <div className="container mx-auto px-4 lg:px-8 relative z-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-7xl font-serif-elegant font-bold text-white leading-tight">
                <span className="font-latin-italic text-primary">In Digitali</span>
                <br />
                <span className="font-latin-italic text-secondary">nova Virtus</span>
              </h1>
              <p className="text-xl lg:text-2xl text-white/90 leading-relaxed max-w-3xl mx-auto">
                Il digitale non è solo tecnologia, ma capacità di creare valore attraverso metodo, visione e innovazione.
              </p>
            </div>
            
            <div className="pt-8">
              <Button 
                variant="secondary" 
                size="lg" 
                asChild 
                className="bg-secondary text-white hover:bg-primary border-secondary hover:border-primary transition-all duration-300 text-lg px-8 py-6"
              >
                <Link to="/methodus">
                  Scopri il nostro approccio
                  <ArrowRight className="ml-2 h-6 w-6" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;