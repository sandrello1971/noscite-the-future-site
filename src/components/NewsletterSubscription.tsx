import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

interface NewsletterSubscriptionProps {
  className?: string;
  variant?: 'default' | 'footer';
}

const NewsletterSubscription = ({ className = "", variant = 'default' }: NewsletterSubscriptionProps) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const { toast } = useToast();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!privacyAccepted) {
      toast({
        title: "Consenso richiesto",
        description: "Devi accettare la Privacy Policy per iscriverti",
        variant: "destructive",
      });
      return;
    }

    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    
    if (!email || !emailRegex.test(email) || email.length > 254) {
      toast({
        title: "Email non valida",
        description: "Inserisci un indirizzo email valido",
        variant: "destructive",
      });
      return;
    }

    const suspiciousPatterns = [
      /<script/i,
      /javascript:/i,
      /on\w+\s*=/i,
      /<iframe/i,
      /data:text\/html/i
    ];
    
    if (suspiciousPatterns.some(pattern => pattern.test(email))) {
      toast({
        title: "Email non valida",
        description: "L'email contiene caratteri non consentiti",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('newsletter_subscriptions')
        .insert([{ email: email.toLowerCase().trim() }]);

      toast({
        title: "Iscrizione completata!",
        description: "Se l'email non è già iscritta, ti abbiamo aggiunto alla newsletter. Grazie!",
      });

      setEmail('');
      setPrivacyAccepted(false);
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      toast({
        title: "Iscrizione completata!",
        description: "Se l'email non è già iscritta, ti abbiamo aggiunto alla newsletter. Grazie!",
      });
      setEmail('');
      setPrivacyAccepted(false);
    } finally {
      setLoading(false);
    }
  };

  if (variant === 'footer') {
    return (
      <form onSubmit={handleSubscribe} className={className}>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col sm:flex-row gap-3">
            <Label htmlFor="newsletter-footer-email" className="sr-only">
              Indirizzo email per newsletter
            </Label>
            <Input
              id="newsletter-footer-email"
              type="email"
              placeholder="La tua email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              className="flex-1"
              aria-describedby="newsletter-footer-description"
            />
            <Button 
              type="submit" 
              variant="secondary" 
              size="sm"
              disabled={loading}
            >
              {loading ? 'Iscrizione...' : 'Iscriviti'}
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="newsletter-footer-privacy"
              checked={privacyAccepted}
              onCheckedChange={(checked) => setPrivacyAccepted(checked === true)}
            />
            <Label htmlFor="newsletter-footer-privacy" className="text-xs font-normal cursor-pointer">
              Accetto la{" "}
              <Link to="/privacy-policy" className="text-primary hover:underline" target="_blank">
                Privacy Policy
              </Link>
            </Label>
          </div>
        </div>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubscribe} className={className}>
      <div className="flex flex-col gap-4 justify-center max-w-md mx-auto">
        <div className="flex flex-col sm:flex-row gap-4">
          <Input 
            type="email" 
            placeholder="La tua email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            className="flex-1 px-4 py-3 rounded-lg border border-input bg-background"
          />
          <Button 
            type="submit" 
            variant="cta" 
            size="lg"
            disabled={loading}
          >
            {loading ? 'Iscrizione...' : 'Iscriviti'}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
        <div className="flex items-center space-x-2 justify-center">
          <Checkbox
            id="newsletter-privacy"
            checked={privacyAccepted}
            onCheckedChange={(checked) => setPrivacyAccepted(checked === true)}
          />
          <Label htmlFor="newsletter-privacy" className="text-sm font-normal cursor-pointer">
            Accetto la{" "}
            <Link to="/privacy-policy" className="text-primary hover:underline" target="_blank">
              Privacy Policy
            </Link>
          </Label>
        </div>
      </div>
    </form>
  );
};

export default NewsletterSubscription;