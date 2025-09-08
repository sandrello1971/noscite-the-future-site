import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, User, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { User as SupabaseUser } from "@supabase/supabase-js";
import { SkipLink } from "@/components/SkipLink";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const navigate = useNavigate();

  // Generate unique ID for mobile menu accessibility
  const mobileMenuId = 'mobile-navigation-menu';

  useEffect(() => {
    // Get initial session
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };
    
    getSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const navigation = [
    { name: "Chi Siamo", href: "/chi-siamo" },
    { name: "Servizi", href: "/servizi" },
    { name: "Percorsi", href: "/percorsi" },
    { name: "Risorse", href: "/risorse" },
    { name: "Contatti", href: "/contatti" },
  ];

  return (
    <>
      {/* Skip Links for keyboard navigation */}
      <SkipLink href="#main-content">Salta al contenuto principale</SkipLink>
      <SkipLink href="#navigation">Salta alla navigazione</SkipLink>
      
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/lovable-uploads/32b5d629-f629-4ffe-a4ec-ccf9154b03ac.png" 
              alt="Logo Noscite - In Digitali Nova Virtus, azienda di consulenza AI e trasformazione digitale" 
              className="h-16 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav 
            id="navigation" 
            className="hidden lg:flex items-center space-x-8"
            role="navigation"
            aria-label="Navigazione principale"
          >
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-foreground hover:text-primary transition-colors duration-200 font-medium"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Chiudi menu di navigazione" : "Apri menu di navigazione"}
            aria-expanded={isMenuOpen}
            aria-controls={mobileMenuId}
            aria-haspopup="true"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div 
            id={mobileMenuId}
            className="lg:hidden py-4 border-t border-border"
            role="menu"
            aria-label="Menu di navigazione mobile"
          >
            <nav className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  role="menuitem"
                  className="text-foreground hover:text-primary transition-colors duration-200 font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md px-2 py-1"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
    </>
  );
};

export default Header;