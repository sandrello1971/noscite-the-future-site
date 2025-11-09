import { useEffect } from "react";

const IubendaCookieBadge = () => {
  useEffect(() => {
    // Ensure Iubenda script is loaded
    if (!document.querySelector('script[src="https://cdn.iubenda.com/iubenda.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://cdn.iubenda.com/iubenda.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <a
      href="https://www.iubenda.com/privacy-policy/63014802/cookie-policy"
      className="iubenda-cs-preferences-link"
      title="Cookie Policy"
      target="_blank"
      rel="noopener noreferrer"
    >
      Cookie Policy
    </a>
  );
};

export default IubendaCookieBadge;
