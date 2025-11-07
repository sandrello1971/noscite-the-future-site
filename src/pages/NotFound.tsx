import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <>
      <Helmet>
        <title>404 - Pagina Non Trovata | Noscite</title>
        <meta name="description" content="La pagina che stai cercando non esiste. Torna alla homepage di Noscite per esplorare i nostri servizi di trasformazione digitale." />
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="text-center max-w-2xl px-4">
          <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-3xl font-semibold text-foreground mb-4">Pagina Non Trovata</h2>
          <p className="text-xl text-muted-foreground mb-8">
            La pagina che stai cercando non esiste o è stata spostata.
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild size="lg" variant="default">
              <a href="/">
                <Home className="mr-2 h-5 w-5" />
                Torna alla Home
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" onClick={() => window.history.back()}>
              <span>
                <ArrowLeft className="mr-2 h-5 w-5" />
                Torna Indietro
              </span>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
