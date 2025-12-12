import { useEffect } from 'react';

const KipinConnector = () => {
  useEffect(() => {
    // Pulisci il body per Kipin
    document.body.innerHTML = '';
    document.body.style.margin = '0';
    document.body.style.overflow = 'hidden';
    
    const ts = new Date().getTime();
    
    // Load CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = `https://kipin.app/_css/custom-domain.css?ts=${ts}`;
    link.media = 'all';
    document.head.appendChild(link);
    
    // Load JS
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = `https://kipin.app/_js/custom-domain.js?ts=${ts}`;
    document.head.appendChild(script);
  }, []);

  return null;
};

export default KipinConnector;
