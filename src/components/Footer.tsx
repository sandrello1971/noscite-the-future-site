import { Link } from "react-router-dom";
import { Linkedin, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const menuItems = [
    { name: "Identitas", path: "/identitas" },
    { name: "Methodus", path: "/methodus" },
    { name: "Valor", path: "/valor" },
    { name: "Atheneum", path: "/atheneum" },
    { name: "Contactus", path: "/contactus" }
  ];

  return (
    <footer className="bg-antracite text-white py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-12 items-start">
          {/* Left Column - Logo and Claim */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-3">
              <img 
                src="/lovable-uploads/420a85c2-3e39-4960-a6fe-edb1cb7efb72.png" 
                alt="Noscite Logo" 
                className="h-16 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-lg font-serif-elegant font-latin-italic text-white/90">
              In Digitali nova Virtus
            </p>
          </div>

          {/* Center Column - Quick Menu */}
          <div className="lg:text-center">
            <h3 className="font-semibold text-white mb-6">Menu</h3>
            <nav className="flex flex-wrap lg:justify-center gap-x-6 gap-y-3">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="text-white/80 hover:text-secondary transition-colors duration-300 relative group"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </nav>
          </div>

          {/* Right Column - Contacts */}
          <div className="lg:text-right space-y-4">
            <h3 className="font-semibold text-white mb-6">Contatti</h3>
            <div className="space-y-3">
              <a href="mailto:info@noscite.it" className="flex items-center space-x-3 lg:justify-end text-white/80 hover:text-secondary transition-colors group">
                <Mail className="h-4 w-4" />
                <span>info@noscite.it</span>
              </a>
              <a href="tel:+393476859801" className="flex items-center space-x-3 lg:justify-end text-white/80 hover:text-secondary transition-colors group">
                <Phone className="h-4 w-4" />
                <span>+39 347 685 9801</span>
              </a>
              <div className="flex items-center space-x-3 lg:justify-end text-white/80">
                <MapPin className="h-4 w-4" />
                <span>Via Monte Grappa 13 <br />Corsico (MI), Italia</span>
              </div>
              <a href="https://linkedin.com/company/noscite" className="flex items-center space-x-3 lg:justify-end text-white/80 hover:text-secondary transition-colors group">
                <Linkedin className="h-4 w-4" />
                <span>linkedin.com/company/noscite</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section - Legal */}
        <div className="border-t border-white/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-white/60 text-sm">
              © Noscite – tutti i diritti riservati
            </p>
            <div className="flex space-x-6">
              <Link to="/privacy-policy" className="text-white/60 hover:text-secondary transition-colors text-sm">
                Privacy
              </Link>
              <Link to="/cookie-policy" className="text-white/60 hover:text-secondary transition-colors text-sm">
                Cookie policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
