import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { ArrowRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface NewsletterSubscriptionProps {
  className?: string;
  variant?: 'default' | 'footer';
}

const NewsletterSubscription = ({ className = "", variant = 'default' }: NewsletterSubscriptionProps) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Enhanced email validation
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    
    if (!email || !emailRegex.test(email) || email.length > 254) {
      toast({
        title: "Email non valida",
        description: "Inserisci un indirizzo email valido",
        variant: "destructive",
      });
      return;
    }

    // Check for suspicious patterns
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
      // Save to database
      const { error } = await supabase
        .from('newsletter_subscriptions')
        .insert([{ email: email.toLowerCase().trim() }]);

      // Always show generic success message to prevent subscription enumeration
      toast({
        title: "Iscrizione completata!",
        description: "Se l'email non è già iscritta, ti abbiamo aggiunto alla newsletter. Grazie!",
      });

      setEmail('');
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      // Generic success message for security to prevent enumeration
      toast({
        title: "Iscrizione completata!",
        description: "Se l'email non è già iscritta, ti abbiamo aggiunto alla newsletter. Grazie!",
      });
      setEmail('');
    } finally {
      setLoading(false);
    }
  };

  if (variant === 'footer') {
    return (
      <form onSubmit={handleSubscribe} className={className}>
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
      </form>
    );
  }

  return (
    <form onSubmit={handleSubscribe} className={className}>
      <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
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
    </form>
  );
};

export default NewsletterSubscription;