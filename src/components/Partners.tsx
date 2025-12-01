import webidooLogo from "@/assets/webidoo-logo.png";
import tibidaboLogo from "@/assets/tibidabo-logo.jpeg";
import teknetLogo from "@/assets/teknet-logo.png";

const Partners = () => {
  const partners = [
    { name: "Webidoo", logo: webidooLogo },
    { name: "Tibidabo", logo: tibidaboLogo },
    { name: "Teknet", logo: teknetLogo }
  ];

  return (
    <section className="py-16 bg-muted/20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h3 className="text-2xl font-semibold text-foreground mb-4">
            Partner Strategici
          </h3>
          <p className="text-muted-foreground">
            Collaboriamo con i leader del settore per offrire soluzioni all'avanguardia
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center max-w-4xl mx-auto">
          {partners.map((partner, index) => (
            <div 
              key={partner.name} 
              className="flex items-center justify-center p-4 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <img 
                src={partner.logo} 
                alt={`${partner.name} logo`}
                className="h-8 w-auto max-w-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;