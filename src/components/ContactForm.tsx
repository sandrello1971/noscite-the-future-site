import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Send, AlertCircle } from "lucide-react";
import DOMPurify from 'dompurify';
import { supabase } from "@/integrations/supabase/client";

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
  };

  const sanitizeInput = (input: string): string => {
    return DOMPurify.sanitize(input.trim());
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = "Il nome è obbligatorio";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Il nome deve contenere almeno 2 caratteri";
    }

    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = "L'email è obbligatoria";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Inserisci un indirizzo email valido";
    }

    // Validate phone (optional but if provided must be valid)
    if (formData.phone.trim() && !validatePhone(formData.phone)) {
      newErrors.phone = "Inserisci un numero di telefono valido";
    }

    // Validate message
    if (!formData.message.trim()) {
      newErrors.message = "Il messaggio è obbligatorio";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Il messaggio deve contenere almeno 10 caratteri";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    const sanitizedValue = sanitizeInput(value);
    setFormData(prev => ({ ...prev, [field]: sanitizedValue }));
    
    // Clear error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Errori nel modulo",
        description: "Correggi gli errori evidenziati prima di inviare",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // Send email via Supabase edge function
      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone || undefined,
          company: formData.company || undefined,
          message: formData.message,
        },
      });

      if (error) {
        throw new Error(error.message);
      }
      
      toast({
        title: "Messaggio inviato!",
        description: "Ti contatteremo presto. Grazie per averci scritto.",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        message: "",
      });
      setErrors({});
    } catch (error) {
      toast({
        title: "Errore nell'invio",
        description: "Si è verificato un errore. Riprova più tardi.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Contattaci
            </h2>
            <p className="text-xl text-muted-foreground">
              Siamo pronti ad aiutarti nella tua trasformazione digitale
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold mb-6">Informazioni di Contatto</h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <Mail className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <h4 className="font-medium">Email</h4>
                      <p className="text-muted-foreground">notitiae@noscite.it</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <Phone className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <h4 className="font-medium">Telefono</h4>
                      <p className="text-muted-foreground">+39 02 1234 5678</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <MapPin className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <h4 className="font-medium">Sede</h4>
                      <p className="text-muted-foreground">
                        Via dell'Innovazione 123<br />
                        20100 Milano, Italia
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Card className="bg-primary text-primary-foreground">
                <CardHeader>
                  <CardTitle>Orari di Apertura</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Lunedì - Venerdì</span>
                      <span>9:00 - 18:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sabato</span>
                      <span>9:00 - 13:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Domenica</span>
                      <span>Chiuso</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle>Invia un Messaggio</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome *</Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Il tuo nome"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className={errors.name ? "border-destructive" : ""}
                        maxLength={100}
                        required
                      />
                      {errors.name && (
                        <div className="flex items-center space-x-1 text-destructive text-sm">
                          <AlertCircle className="h-4 w-4" />
                          <span>{errors.name}</span>
                        </div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="la.tua@email.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={errors.email ? "border-destructive" : ""}
                        maxLength={254}
                        required
                      />
                      {errors.email && (
                        <div className="flex items-center space-x-1 text-destructive text-sm">
                          <AlertCircle className="h-4 w-4" />
                          <span>{errors.email}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefono</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+39 123 456 7890"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className={errors.phone ? "border-destructive" : ""}
                        maxLength={20}
                      />
                      {errors.phone && (
                        <div className="flex items-center space-x-1 text-destructive text-sm">
                          <AlertCircle className="h-4 w-4" />
                          <span>{errors.phone}</span>
                        </div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Azienda</Label>
                      <Input
                        id="company"
                        type="text"
                        placeholder="Nome azienda"
                        value={formData.company}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                        maxLength={100}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Messaggio *</Label>
                    <Textarea
                      id="message"
                      placeholder="Descrivi come possiamo aiutarti..."
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      className={errors.message ? "border-destructive" : ""}
                      rows={5}
                      maxLength={1000}
                      required
                    />
                    <div className="flex justify-between items-center text-sm text-muted-foreground">
                      {errors.message && (
                        <div className="flex items-center space-x-1 text-destructive">
                          <AlertCircle className="h-4 w-4" />
                          <span>{errors.message}</span>
                        </div>
                      )}
                      <span className="ml-auto">{formData.message.length}/1000</span>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Invio in corso...</span>
                      </div>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Invia Messaggio
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}