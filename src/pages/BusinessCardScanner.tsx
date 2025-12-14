import { useState, useRef, useCallback } from "react";
import { Camera, Upload, RotateCcw, Download, UserPlus, Check, X, Loader2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { SEO } from "@/components/SEO";

interface ExtractedData {
  firstName: string;
  lastName: string;
  company: string;
  position: string;
  email: string;
  phone: string;
  mobile: string;
  website: string;
  address: string;
}

const emptyData: ExtractedData = {
  firstName: "",
  lastName: "",
  company: "",
  position: "",
  email: "",
  phone: "",
  mobile: "",
  website: "",
  address: "",
};

export default function BusinessCardScanner() {
  const [frontImage, setFrontImage] = useState<string | null>(null);
  const [backImage, setBackImage] = useState<string | null>(null);
  const [extractedData, setExtractedData] = useState<ExtractedData>(emptyData);
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState<"capture" | "preview" | "edit">("capture");
  const [captureSide, setCaptureSide] = useState<"front" | "back">("front");
  
  const frontInputRef = useRef<HTMLInputElement>(null);
  const backInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleImageCapture = useCallback((
    event: React.ChangeEvent<HTMLInputElement>,
    side: "front" | "back"
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      if (side === "front") {
        setFrontImage(base64);
        setCaptureSide("back");
      } else {
        setBackImage(base64);
      }
    };
    reader.readAsDataURL(file);
  }, []);

  const processImages = async () => {
    if (!frontImage) {
      toast({
        title: "Errore",
        description: "Scansiona almeno il fronte del biglietto",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    try {
      const { data, error } = await supabase.functions.invoke("scan-business-card", {
        body: { 
          frontImage: frontImage.split(",")[1], // Remove data:image prefix
          backImage: backImage?.split(",")[1] || null 
        },
      });

      if (error) throw error;

      setExtractedData(data.extractedData);
      setStep("edit");
    } catch (error) {
      console.error("Error processing images:", error);
      toast({
        title: "Errore",
        description: "Impossibile elaborare le immagini. Riprova.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const generateVCard = (): string => {
    const lines = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      `N:${extractedData.lastName};${extractedData.firstName};;;`,
      `FN:${extractedData.firstName} ${extractedData.lastName}`,
      extractedData.company && `ORG:${extractedData.company}`,
      extractedData.position && `TITLE:${extractedData.position}`,
      extractedData.email && `EMAIL:${extractedData.email}`,
      extractedData.phone && `TEL;TYPE=WORK:${extractedData.phone}`,
      extractedData.mobile && `TEL;TYPE=CELL:${extractedData.mobile}`,
      extractedData.website && `URL:${extractedData.website}`,
      extractedData.address && `ADR:;;${extractedData.address};;;;`,
      "END:VCARD",
    ].filter(Boolean);

    return lines.join("\r\n");
  };

  const downloadVCard = () => {
    const vcard = generateVCard();
    const blob = new Blob([vcard], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${extractedData.firstName}_${extractedData.lastName}.vcf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast({
      title: "Contatto scaricato",
      description: "Apri il file .vcf per aggiungere il contatto",
    });
  };

  const saveToCRM = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Accedi per salvare",
          description: "Effettua il login per salvare nel CRM",
          variant: "destructive",
        });
        return;
      }

      // First create company if exists
      let companyId = null;
      if (extractedData.company) {
        const { data: company, error: companyError } = await supabase
          .from("crm_companies")
          .insert({
            name: extractedData.company,
            website: extractedData.website || null,
            user_id: user.id,
          })
          .select("id")
          .single();

        if (companyError && !companyError.message.includes("duplicate")) {
          throw companyError;
        }
        companyId = company?.id || null;
      }

      // Create contact
      const { error: contactError } = await supabase
        .from("crm_contacts")
        .insert({
          first_name: extractedData.firstName || "Sconosciuto",
          last_name: extractedData.lastName || "Sconosciuto",
          company_id: companyId,
          position: extractedData.position || null,
          email: extractedData.email || null,
          phone: extractedData.phone || null,
          mobile: extractedData.mobile || null,
          user_id: user.id,
        });

      if (contactError) throw contactError;

      toast({
        title: "Salvato nel CRM",
        description: "Contatto aggiunto con successo",
      });
    } catch (error) {
      console.error("Error saving to CRM:", error);
      toast({
        title: "Errore",
        description: "Impossibile salvare nel CRM",
        variant: "destructive",
      });
    }
  };

  const resetScanner = () => {
    setFrontImage(null);
    setBackImage(null);
    setExtractedData(emptyData);
    setStep("capture");
    setCaptureSide("front");
  };

  return (
    <>
      <SEO 
        title="Scanner Biglietti da Visita | Noscite"
        description="Scansiona i biglietti da visita e salva i contatti"
      />
      <div className="min-h-screen bg-background flex flex-col">
        {/* Header */}
        <header className="bg-primary text-primary-foreground p-4 flex items-center gap-3">
          {step !== "capture" && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setStep(step === "edit" ? "capture" : "capture")}
              className="text-primary-foreground hover:bg-primary/80"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          )}
          <h1 className="text-lg font-semibold flex-1">Scanner Biglietti</h1>
          {(frontImage || backImage) && step === "capture" && (
            <Button
              variant="ghost"
              size="icon"
              onClick={resetScanner}
              className="text-primary-foreground hover:bg-primary/80"
            >
              <RotateCcw className="h-5 w-5" />
            </Button>
          )}
        </header>

        <main className="flex-1 p-4 space-y-4">
          {step === "capture" && (
            <>
              {/* Front Card */}
              <Card 
                className={`cursor-pointer transition-all ${frontImage ? "ring-2 ring-green-500" : ""}`}
                onClick={() => frontInputRef.current?.click()}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium">Fronte</span>
                    {frontImage && <Check className="h-5 w-5 text-green-500" />}
                  </div>
                  {frontImage ? (
                    <img 
                      src={frontImage} 
                      alt="Fronte biglietto" 
                      className="w-full h-40 object-cover rounded-lg"
                    />
                  ) : (
                    <div className="h-40 bg-muted rounded-lg flex flex-col items-center justify-center gap-2 text-muted-foreground">
                      <Camera className="h-10 w-10" />
                      <span>Tocca per scattare</span>
                    </div>
                  )}
                  <input
                    ref={frontInputRef}
                    type="file"
                    accept="image/*"
                    capture="environment"
                    className="hidden"
                    onChange={(e) => handleImageCapture(e, "front")}
                  />
                </CardContent>
              </Card>

              {/* Back Card */}
              <Card 
                className={`cursor-pointer transition-all ${backImage ? "ring-2 ring-green-500" : ""}`}
                onClick={() => backInputRef.current?.click()}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium">Retro (opzionale)</span>
                    {backImage && <Check className="h-5 w-5 text-green-500" />}
                  </div>
                  {backImage ? (
                    <img 
                      src={backImage} 
                      alt="Retro biglietto" 
                      className="w-full h-40 object-cover rounded-lg"
                    />
                  ) : (
                    <div className="h-40 bg-muted rounded-lg flex flex-col items-center justify-center gap-2 text-muted-foreground">
                      <Camera className="h-10 w-10" />
                      <span>Tocca per scattare</span>
                    </div>
                  )}
                  <input
                    ref={backInputRef}
                    type="file"
                    accept="image/*"
                    capture="environment"
                    className="hidden"
                    onChange={(e) => handleImageCapture(e, "back")}
                  />
                </CardContent>
              </Card>

              {/* Process Button */}
              {frontImage && (
                <Button 
                  className="w-full h-12 text-lg"
                  onClick={processImages}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Elaborazione...
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-5 w-5" />
                      Estrai dati
                    </>
                  )}
                </Button>
              )}
            </>
          )}

          {step === "edit" && (
            <>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Dati estratti</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="firstName">Nome</Label>
                      <Input
                        id="firstName"
                        value={extractedData.firstName}
                        onChange={(e) => setExtractedData(prev => ({ ...prev, firstName: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Cognome</Label>
                      <Input
                        id="lastName"
                        value={extractedData.lastName}
                        onChange={(e) => setExtractedData(prev => ({ ...prev, lastName: e.target.value }))}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="company">Azienda</Label>
                    <Input
                      id="company"
                      value={extractedData.company}
                      onChange={(e) => setExtractedData(prev => ({ ...prev, company: e.target.value }))}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="position">Ruolo</Label>
                    <Input
                      id="position"
                      value={extractedData.position}
                      onChange={(e) => setExtractedData(prev => ({ ...prev, position: e.target.value }))}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={extractedData.email}
                      onChange={(e) => setExtractedData(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="phone">Telefono</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={extractedData.phone}
                        onChange={(e) => setExtractedData(prev => ({ ...prev, phone: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="mobile">Cellulare</Label>
                      <Input
                        id="mobile"
                        type="tel"
                        value={extractedData.mobile}
                        onChange={(e) => setExtractedData(prev => ({ ...prev, mobile: e.target.value }))}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="website">Sito web</Label>
                    <Input
                      id="website"
                      type="url"
                      value={extractedData.website}
                      onChange={(e) => setExtractedData(prev => ({ ...prev, website: e.target.value }))}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="address">Indirizzo</Label>
                    <Input
                      id="address"
                      value={extractedData.address}
                      onChange={(e) => setExtractedData(prev => ({ ...prev, address: e.target.value }))}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  variant="outline" 
                  className="h-14 flex-col gap-1"
                  onClick={downloadVCard}
                >
                  <Download className="h-5 w-5" />
                  <span className="text-xs">Salva su telefono</span>
                </Button>
                <Button 
                  className="h-14 flex-col gap-1"
                  onClick={saveToCRM}
                >
                  <UserPlus className="h-5 w-5" />
                  <span className="text-xs">Aggiungi al CRM</span>
                </Button>
              </div>

              <Button 
                variant="ghost" 
                className="w-full"
                onClick={resetScanner}
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Nuovo biglietto
              </Button>
            </>
          )}
        </main>

        {/* Install prompt for PWA */}
        <footer className="p-4 text-center text-sm text-muted-foreground">
          Aggiungi alla home per accesso rapido
        </footer>
      </div>
    </>
  );
}
