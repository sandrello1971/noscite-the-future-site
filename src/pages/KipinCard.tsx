import { useEffect } from 'react';

const KipinCard = () => {
  useEffect(() => {
    const ts = new Date().getTime();
    
    // Load Kipin CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = `https://kipin.app/_css/custom-domain.css?ts=${ts}`;
    link.media = 'all';
    document.head.appendChild(link);
    
    // Load Kipin JS
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = `https://kipin.app/_js/custom-domain.js?ts=${ts}`;
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
