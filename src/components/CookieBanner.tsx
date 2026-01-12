import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X, Cookie, Settings } from "lucide-react";
import { Link } from "react-router-dom";

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
}

const defaultPreferences: CookiePreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
  functional: false,
};

// Floating badge component - always visible after first consent
const CookieBadge = ({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    className="fixed bottom-4 left-4 z-50 bg-primary text-primary-foreground p-3 rounded-full shadow-lg hover:scale-110 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
    aria-label="Gestisci preferenze cookie"
    title="Gestisci preferenze cookie"
  >
    <Cookie className="h-5 w-5" />
  </button>
);

// Preferences panel component
const PreferencesPanel = ({
  preferences,
  onToggle,
  onSave,
  onClose,
}: {
  preferences: CookiePreferences;
  onToggle: (key: keyof CookiePreferences) => void;
  onSave: () => void;
  onClose: () => void;
}) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
    <Card className="max-w-lg w-full max-h-[90vh] overflow-y-auto">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Preferenze Cookie</h3>
            <Button variant="ghost" size="sm" onClick={onClose}>
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
                onClick={() => onToggle("analytics")}
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
                onClick={() => onToggle("marketing")}
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
                onClick={() => onToggle("functional")}
              >
                {preferences.functional ? "Attivo" : "Disattivo"}
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 text-xs pt-2">
            <Link to="/privacy-policy" className="text-primary hover:underline">
              Privacy Policy
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link to="/cookie-policy" className="text-primary hover:underline">
              Cookie Policy
            </Link>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button variant="outline" onClick={onClose}>
              Annulla
            </Button>
            <Button onClick={onSave}>Salva preferenze</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);

const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [hasConsent, setHasConsent] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>(defaultPreferences);

  useEffect(() => {
    const cookieConsent = localStorage.getItem("cookie-consent");
    if (!cookieConsent) {
      setShowBanner(true);
      setHasConsent(false);
    } else {
      const savedPreferences = JSON.parse(cookieConsent);
      setPreferences(savedPreferences);
      setHasConsent(true);
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted: CookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true,
    };
    setPreferences(allAccepted);
    localStorage.setItem("cookie-consent", JSON.stringify(allAccepted));
    setShowBanner(false);
    setHasConsent(true);
  };

  const handleAcceptSelected = () => {
    localStorage.setItem("cookie-consent", JSON.stringify(preferences));
    setShowBanner(false);
    setShowPreferences(false);
    setHasConsent(true);
  };

  const handleRejectAll = () => {
    const rejected: CookiePreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false,
    };
    setPreferences(rejected);
    localStorage.setItem("cookie-consent", JSON.stringify(rejected));
    setShowBanner(false);
    setHasConsent(true);
  };

  const togglePreference = (key: keyof CookiePreferences) => {
    if (key === "necessary") return;
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const openPreferencesFromBadge = () => {
    setShowPreferences(true);
  };

  const closePreferences = () => {
    setShowPreferences(false);
  };

  return (
    <>
      {/* Floating badge - always visible after consent */}
      {hasConsent && !showBanner && !showPreferences && (
        <CookieBadge onClick={openPreferencesFromBadge} />
      )}

      {/* Preferences panel - opened from badge */}
      {showPreferences && (
        <PreferencesPanel
          preferences={preferences}
          onToggle={togglePreference}
          onSave={handleAcceptSelected}
          onClose={closePreferences}
        />
      )}

      {/* Initial consent banner */}
      {showBanner && !showPreferences && (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-background/95 backdrop-blur border-t shadow-lg">
          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Cookie className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">
                      Utilizziamo i cookie
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Utilizziamo cookie e tecnologie simili per migliorare la
                      tua esperienza di navigazione, analizzare il traffico del
                      sito e personalizzare i contenuti. Puoi scegliere quali
                      cookie accettare.
                    </p>
                    <div className="flex flex-wrap gap-2 text-xs">
                      <Link
                        to="/privacy-policy"
                        className="text-primary hover:underline"
                      >
                        Privacy Policy
                      </Link>
                      <span className="text-muted-foreground">•</span>
                      <Link
                        to="/cookie-policy"
                        className="text-primary hover:underline"
                      >
                        Cookie Policy
                      </Link>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowBanner(false)}
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
                  <Button variant="outline" size="sm" onClick={handleRejectAll}>
                    Rifiuta tutto
                  </Button>
                  <Button size="sm" onClick={handleAcceptAll}>
                    Accetta tutto
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Preferences panel from banner */}
      {showBanner && showPreferences && (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-background/95 backdrop-blur border-t shadow-lg">
          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-6">
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
                      onClick={() => togglePreference("analytics")}
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
                      onClick={() => togglePreference("marketing")}
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
                      onClick={() => togglePreference("functional")}
                    >
                      {preferences.functional ? "Attivo" : "Disattivo"}
                    </Button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 text-xs pt-2">
                  <Link
                    to="/privacy-policy"
                    className="text-primary hover:underline"
                  >
                    Privacy Policy
                  </Link>
                  <span className="text-muted-foreground">•</span>
                  <Link
                    to="/cookie-policy"
                    className="text-primary hover:underline"
                  >
                    Cookie Policy
                  </Link>
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
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default CookieBanner;
