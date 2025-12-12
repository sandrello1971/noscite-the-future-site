import { useEffect } from 'react';

const KipinCard = () => {
  useEffect(() => {
    // Kipin Custom Domain Connector v.1.1
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

    // Cleanup on unmount
    return () => {
      if (link.parentNode) {
        link.parentNode.removeChild(link);
      }
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <div id="kipin-card-container" className="min-h-screen">
      {/* Kipin will inject content here */}
    </div>
  );
};

export default KipinCard;
