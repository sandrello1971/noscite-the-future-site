import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';

const DigitalBusinessCardVCard = () => {
  const { username } = useParams<{ username: string }>();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAndDownload = async () => {
      if (!username) {
        setError('Username non specificato');
        return;
      }

      const { data: card, error: fetchError } = await supabase
        .from('business_cards_public')
        .select('*')
        .eq('username', username)
        .single();

      if (fetchError || !card) {
        setError('Profilo non trovato');
        return;
      }

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
      if (card.vat_number) vCardLines.push(`NOTE:P.IVA: ${card.vat_number}${card.tagline ? `\\n${card.tagline}` : ''}`);
      else if (card.tagline) vCardLines.push(`NOTE:${card.tagline}`);

      vCardLines.push('END:VCARD');

      const blob = new Blob([vCardLines.join('\r\n')], { type: 'text/vcard;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${card.first_name}_${card.last_name}.vcf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    };

    fetchAndDownload();
  }, [username]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  );
};

export default DigitalBusinessCardVCard;
