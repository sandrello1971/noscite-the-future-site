import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { AccessibleVideo } from "@/components/AccessibleVideo";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
          onError={(e) => console.error('Video error:', e)}
          onLoadStart={() => console.log('Video loading started')}
          onCanPlay={() => console.log('Video can play')}
        >
          <source src="/Noscite3.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black/40"></div>
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