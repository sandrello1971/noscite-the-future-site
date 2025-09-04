import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X, Cookie, Settings } from "lucide-react";
import { Link } from "react-router-dom";

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true, // Always true, cannot be disabled
    analytics: false,
    marketing: false,
    functional: false,
  });

  useEffect(() => {
    const cookieConsent = localStorage.getItem('cookie-consent');
    if (!cookieConsent) {
      setIsVisible(true);
    } else {
      const savedPreferences = JSON.parse(cookieConsent);
      setPreferences(savedPreferences);
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true,
    };
    setPreferences(allAccepted);
    localStorage.setItem('cookie-consent', JSON.stringify(allAccepted));
    setIsVisible(false);
  };

  const handleAcceptSelected = () => {
    localStorage.setItem('cookie-consent', JSON.stringify(preferences));
    setIsVisible(false);
  };

  const handleRejectAll = () => {
    const rejected = {
      necessary: true, // Always true
      analytics: false,
      marketing: false,
      functional: false,
    };
    setPreferences(rejected);
    localStorage.setItem('cookie-consent', JSON.stringify(rejected));
    setIsVisible(false);
  };

  const togglePreference = (key: keyof typeof preferences) => {
    if (key === 'necessary') return; // Cannot disable necessary cookies
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-background/95 backdrop-blur border-t shadow-lg">
      <Card className="max-w-4xl mx-auto">
        <CardContent className="p-6">
          {!showPreferences ? (
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Cookie className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">Utilizziamo i cookie</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Utilizziamo cookie e tecnologie simili per migliorare la tua esperienza di navigazione, 
                    analizzare il traffico del sito e personalizzare i contenuti. Puoi scegliere quali cookie accettare.
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <Link to="/privacy-policy" className="text-primary hover:underline">
                      Privacy Policy
                    </Link>
                    <span className="text-muted-foreground">•</span>
                    <Link to="/cookie-policy" className="text-primary hover:underline">
                      Cookie Policy
                    </Link>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsVisible(false)}
                  className="flex-shrink-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowPreferences(true)}
                  className="flex items-center space-x-2"
                >
                  <Settings className="h-4 w-4" />
                  <span>Gestisci preferenze</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRejectAll}
                >
                  Rifiuta tutto
                </Button>
                <Button
                  size="sm"
                  onClick={handleAcceptAll}
                >
                  Accetta tutto
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Preferenze Cookie</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPreferences(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg bg-muted/50">
                  <div>
                    <h4 className="font-medium">Cookie necessari</h4>
                    <p className="text-sm text-muted-foreground">
                      Essenziali per il funzionamento del sito
                    </p>
                  </div>
                  <div className="text-sm font-medium text-muted-foreground">
                    Sempre attivi
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Cookie analitici</h4>
                    <p className="text-sm text-muted-foreground">
                      Ci aiutano a capire come viene utilizzato il sito
                    </p>
                  </div>
                  <Button
                    variant={preferences.analytics ? "default" : "outline"}
                    size="sm"
                    onClick={() => togglePreference('analytics')}
                  >
                    {preferences.analytics ? "Attivo" : "Disattivo"}
                  </Button>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Cookie di marketing</h4>
                    <p className="text-sm text-muted-foreground">
                      Utilizzati per personalizzare la pubblicità
                    </p>
                  </div>
                  <Button
                    variant={preferences.marketing ? "default" : "outline"}
                    size="sm"
                    onClick={() => togglePreference('marketing')}
                  >
                    {preferences.marketing ? "Attivo" : "Disattivo"}
                  </Button>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Cookie funzionali</h4>
                    <p className="text-sm text-muted-foreground">
                      Migliorano l'esperienza utente
                    </p>
                  </div>
                  <Button
                    variant={preferences.functional ? "default" : "outline"}
                    size="sm"
                    onClick={() => togglePreference('functional')}
                  >
                    {preferences.functional ? "Attivo" : "Disattivo"}
                  </Button>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setShowPreferences(false)}
                >
                  Annulla
                </Button>
                <Button onClick={handleAcceptSelected}>
                  Salva preferenze
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CookieBanner;