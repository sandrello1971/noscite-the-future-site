import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Linkedin, Twitter, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import NewsletterSubscription from "@/components/NewsletterSubscription";

const Footer = () => {
  const services = [
    { name: "Athenaeum AI", href: "/servizi#academy" },
    { name: "AI Launchpad", href: "/servizi#launchpad" },
    { name: "AI Sprint", href: "/servizi#sprint" },
    { name: "AI Evolution Partner", href: "/servizi#evolution" },
    { name: "Fractional CIO", href: "/servizi#cio" }
  ];

  const resources = [
    { name: "Blog", href: "/risorse#blog" },
    { name: "Webinar", href: "/risorse#webinar" },
    { name: "Guide PDF", href: "/risorse#guide" },
    { name: "Whitepaper", href: "/risorse#whitepaper" },
    { name: "Case Studies", href: "/risorse#case-studies" }
  ];

  const company = [
    { name: "Chi Siamo", href: "/chi-siamo" },
    { name: "Il Team", href: "/chi-siamo#team" },
    { name: "Carriere", href: "/carriere" },
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Cookie Policy", href: "/cookie-policy" }
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div>
              <img 
                src="/lovable-uploads/7f64c294-dc5c-48e4-90c8-f6a2bcc8e1bf.png" 
                alt="Noscite Logo" 
                className="h-24 w-auto mb-4 brightness-0 invert"
              />
              <p className="text-primary-foreground/80 leading-relaxed">
                Il tuo partner per l'evoluzione digitale. Trasformiamo le aziende attraverso 
                l'intelligenza artificiale e la formazione digitale.
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-secondary" />
                <span>notitiae@noscite.it</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-secondary" />
                <span>+39 02 1234 5678</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-secondary" />
                <span>Milano, Italia</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Servizi</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <Link 
                    to={service.href}
                    className="text-primary-foreground/80 hover:text-secondary transition-colors duration-200"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Risorse</h4>
            <ul className="space-y-3">
              {resources.map((resource) => (
                <li key={resource.name}>
                  <Link 
                    to={resource.href}
                    className="text-primary-foreground/80 hover:text-secondary transition-colors duration-200"
                  >
                    {resource.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company & Newsletter */}
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-lg mb-6">Azienda</h4>
              <ul className="space-y-3">
                {company.map((item) => (
                  <li key={item.name}>
                    <Link 
                      to={item.href}
                      className="text-primary-foreground/80 hover:text-secondary transition-colors duration-200"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="font-semibold text-lg mb-4">Newsletter</h4>
              <p className="text-primary-foreground/80 text-sm mb-4">
                Ricevi le ultime novità sull'AI e la trasformazione digitale
              </p>
              <NewsletterSubscription variant="footer" />
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-primary-foreground/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-primary-foreground/80 text-sm">
              © 2024 Noscite. Tutti i diritti riservati.
            </div>
            
            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <a 
                href="#" 
                className="text-primary-foreground/80 hover:text-secondary transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-primary-foreground/80 hover:text-secondary transition-colors duration-200"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-primary-foreground/80 hover:text-secondary transition-colors duration-200"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;