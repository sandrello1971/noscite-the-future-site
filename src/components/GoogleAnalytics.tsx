import { useEffect, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

const GA_MEASUREMENT_ID = 'G-TXD0XHC4P8';

const getAnalyticsConsent = (): boolean => {
  try {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) return false;
    return JSON.parse(consent).analytics === true;
  } catch {
    return false;
  }
};

export const GoogleAnalytics = () => {
  const location = useLocation();
  const [hasConsent, setHasConsent] = useState(getAnalyticsConsent);

  const loadGA = useCallback(() => {
    if (document.getElementById('ga-script')) return;

    const script1 = document.createElement('script');
    script1.id = 'ga-script';
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script1);

    const script2 = document.createElement('script');
    script2.id = 'ga-config-script';
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA_MEASUREMENT_ID}', {
        page_path: window.location.pathname,
      });
    `;
    document.head.appendChild(script2);
  }, []);

  const removeGA = useCallback(() => {
    document.getElementById('ga-script')?.remove();
    document.getElementById('ga-config-script')?.remove();
    delete (window as any).gtag;
    delete (window as any).dataLayer;
  }, []);

  // Listen for consent changes (CookieBanner writes to localStorage)
  useEffect(() => {
    const handleStorage = () => {
      setHasConsent(getAnalyticsConsent());
    };

    // Listen for cross-tab changes
    window.addEventListener('storage', handleStorage);

    // Also poll on the same tab since storage event doesn't fire for same-tab writes
    const originalSetItem = localStorage.setItem;
    localStorage.setItem = function (key: string, value: string) {
      originalSetItem.call(this, key, value);
      if (key === 'cookie-consent') {
        handleStorage();
      }
    };

    return () => {
      window.removeEventListener('storage', handleStorage);
      localStorage.setItem = originalSetItem;
    };
  }, []);

  // Load or remove GA based on consent
  useEffect(() => {
    if (hasConsent) {
      loadGA();
    } else {
      removeGA();
    }
  }, [hasConsent, loadGA, removeGA]);

  // Track page views on route change (only if consent given)
  useEffect(() => {
    if (hasConsent && typeof window.gtag !== 'undefined') {
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: location.pathname + location.search,
      });
    }
  }, [location, hasConsent]);

  return null;
};

// Extend Window interface for TypeScript
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}
