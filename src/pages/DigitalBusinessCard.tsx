import { useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { 
  Phone, 
  
  Globe, 
  Linkedin, 
  MessageCircle, 
  Facebook, 
  Instagram, 
  Twitter,
  UserPlus,
  Loader2,
  Building2
} from 'lucide-react';

interface BusinessCard {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  title: string | null;
  company: string | null;
  tagline: string | null;
  mobile: string | null;
  
  website: string | null;
  photo_url: string | null;
  linkedin_url: string | null;
  whatsapp_number: string | null;
  facebook_url: string | null;
  instagram_url: string | null;
  twitter_url: string | null;
  vat_number: string | null;
  is_active: boolean;
}

const DigitalBusinessCard = () => {
  const { username } = useParams<{ username: string }>();
  const [card, setCard] = useState<BusinessCard | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBusinessCard = useCallback(async () => {
    if (!username) {
      setError('Username non specificato');
      setLoading(false);
      return;
    }

    try {
      // Mostra lo spinner solo al primo caricamento
      if (!card) setLoading(true);

      // Use the public view that only exposes safe fields (excludes email, phone, vat_number, address)
      const { data, error: fetchError } = await supabase
        .from('business_cards_public')
        .select('*')
        .eq('username', username)
        .single();

      if (fetchError) {
        console.error('Error fetching business card:', fetchError);
        setError('Profilo non trovato');
        return;
      }

      setCard(data);
      setError(null);
    } catch (err) {
      console.error('Error:', err);
      setError('Errore nel caricamento del profilo');
    } finally {
      setLoading(false);
    }
  }, [username, card]);

  useEffect(() => {
    fetchBusinessCard();

    // Se aggiorni i link dal pannello admin, la card si aggiorna senza refresh manuale.
    const intervalId = window.setInterval(fetchBusinessCard, 30_000);
    const handleVisibility = () => {
      if (!document.hidden) fetchBusinessCard();
    };

    document.addEventListener('visibilitychange', handleVisibility);
    window.addEventListener('focus', fetchBusinessCard);

    return () => {
      window.clearInterval(intervalId);
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('focus', fetchBusinessCard);
    };
  }, [fetchBusinessCard]);

  const generateVCard = () => {
    if (!card) return;

    const vCardLines = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `N:${card.last_name};${card.first_name};;;`,
      `FN:${card.first_name} ${card.last_name}`,
    ];

    if (card.company) vCardLines.push(`ORG:${card.company}`);
    if (card.title) vCardLines.push(`TITLE:${card.title}`);
    
    if (card.mobile) vCardLines.push(`TEL;TYPE=CELL:${card.mobile}`);
    if (card.website) vCardLines.push(`URL:https://${card.website.replace(/^https?:\/\//, '')}`);
    if (card.linkedin_url) vCardLines.push(`X-SOCIALPROFILE;TYPE=linkedin:${card.linkedin_url}`);
    if (card.facebook_url) vCardLines.push(`X-SOCIALPROFILE;TYPE=facebook:${card.facebook_url}`);
    if (card.instagram_url) vCardLines.push(`X-SOCIALPROFILE;TYPE=instagram:${card.instagram_url}`);
    if (card.twitter_url) vCardLines.push(`X-SOCIALPROFILE;TYPE=twitter:${card.twitter_url}`);
    if (card.tagline) vCardLines.push(`NOTE:${card.tagline}`);

    vCardLines.push('END:VCARD');

    const vCardContent = vCardLines.join('\r\n');
    const blob = new Blob([vCardContent], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${card.first_name}_${card.last_name}.vcf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const getInitials = () => {
    if (!card) return '?';
    return `${card.first_name.charAt(0)}${card.last_name.charAt(0)}`.toUpperCase();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-primary to-primary/80 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary-foreground" />
      </div>
    );
  }

  if (error || !card) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-primary to-primary/80 flex items-center justify-center p-4">
        <Card className="max-w-md w-full rounded-3xl shadow-2xl">
          <CardContent className="p-8 text-center">
            <h1 className="text-2xl font-bold text-foreground mb-2">Profilo non trovato</h1>
            <p className="text-muted-foreground">{error || 'Il profilo richiesto non esiste o non è attivo.'}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary to-primary/80 flex items-center justify-center p-4">
      <Card className="max-w-md w-full rounded-3xl shadow-2xl overflow-hidden">
        <CardContent className="p-0">
          {/* Header con foto profilo */}
          <div className="bg-gradient-to-b from-primary/10 to-transparent pt-8 pb-4 px-6 text-center">
            <Avatar className="w-28 h-28 mx-auto mb-4 border-4 border-primary shadow-lg">
              {card.photo_url ? (
                <AvatarImage src={card.photo_url} alt={`${card.first_name} ${card.last_name}`} />
              ) : null}
              <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-bold">
                {getInitials()}
              </AvatarFallback>
            </Avatar>
            
            <h1 className="text-2xl font-bold text-foreground">
              {card.first_name} {card.last_name}
            </h1>
            
            {card.title && (
              <p className="text-muted-foreground font-medium mt-1">{card.title}</p>
            )}
            
            {card.company && (
              <p className="text-primary font-semibold">{card.company}</p>
            )}
            
            {card.tagline && (
              <p className="text-muted-foreground text-sm italic mt-3 px-4">
                "{card.tagline}"
              </p>
            )}
          </div>

          {/* Informazioni di contatto */}
          <div className="px-6 py-4 space-y-3">

            {card.mobile && (
              <a 
                href={`tel:${card.mobile}`}
                className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
              >
                <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-foreground">{card.mobile}</span>
              </a>
            )}

            {card.website && (
              <a 
                href={`https://${card.website.replace(/^https?:\/\//, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
              >
                <Globe className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-foreground">{card.website.replace(/^https?:\/\//, '')}</span>
              </a>
            )}

            {card.vat_number && (
              <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
                <Building2 className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-foreground">P.IVA: {card.vat_number}</span>
              </div>
            )}
          </div>

          {/* Social Links */}
          {(card.linkedin_url || card.whatsapp_number || card.facebook_url || card.instagram_url || card.twitter_url) && (
            <div className="px-6 py-4 flex justify-center gap-4">
              {card.linkedin_url && (
                <a 
                  href={card.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-[#0077B5] text-white hover:opacity-90 transition-opacity"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              )}

              {card.whatsapp_number && (
                <a 
                  href={`https://wa.me/${card.whatsapp_number.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-[#25D366] text-white hover:opacity-90 transition-opacity"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="h-5 w-5" />
                </a>
              )}

              {card.facebook_url && (
                <a 
                  href={card.facebook_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-[#1877F2] text-white hover:opacity-90 transition-opacity"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
              )}

              {card.instagram_url && (
                <a 
                  href={card.instagram_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white hover:opacity-90 transition-opacity"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              )}

              {card.twitter_url && (
                <a 
                  href={card.twitter_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-[#1DA1F2] text-white hover:opacity-90 transition-opacity"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </a>
              )}
            </div>
          )}

          {/* Pulsante Salva Contatto */}
          <div className="px-6 pb-8 pt-4">
            <Button 
              onClick={generateVCard}
              className="w-full py-6 text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all"
              size="lg"
            >
              <UserPlus className="mr-2 h-5 w-5" />
              Aggiungimi alla rubrica
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DigitalBusinessCard;
