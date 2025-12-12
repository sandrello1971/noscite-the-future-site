import { useEffect } from 'react';

const KipinCard = () => {
  useEffect(() => {
    const ts = new Date().getTime();
    
    // Use Supabase Edge Function as proxy for Kipin resources
    const proxyBase = 'https://cpopaqguywwaqprrvony.supabase.co/functions/v1/kipin-proxy';
    
    // Load Kipin CSS via proxy
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = `${proxyBase}?resource=/_css/custom-domain.css&ts=${ts}`;
    link.media = 'all';
    document.head.appendChild(link);
    
    // Load Kipin JS via proxy
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = `${proxyBase}?resource=/_js/custom-domain.js&ts=${ts}`;
    document.head.appendChild(script);
    
    return () => {
      // Cleanup on unmount
      if (link.parentNode) {
        document.head.removeChild(link);
      }
      if (script.parentNode) {
        document.head.removeChild(script);
      }
    };
  }, []);

  return null; // Kipin populates the page content
};

export default KipinCard;
