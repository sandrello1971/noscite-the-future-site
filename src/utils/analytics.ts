// Google Analytics Event Tracking Utilities

export const trackEvent = (
  eventName: string,
  eventParams?: Record<string, any>
) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', eventName, eventParams);
  }
};

// Pre-defined event trackers for common actions
export const analytics = {
  // Contact form submission
  trackContactForm: (method: 'email' | 'form') => {
    trackEvent('contact_submit', {
      contact_method: method,
    });
  },

  // Newsletter subscription
  trackNewsletterSignup: () => {
    trackEvent('newsletter_signup', {
      location: window.location.pathname,
    });
  },

  // Navigation clicks
  trackNavigation: (destination: string) => {
    trackEvent('navigation_click', {
      destination,
    });
  },

  // CTA button clicks
  trackCTA: (ctaName: string, section: string) => {
    trackEvent('cta_click', {
      cta_name: ctaName,
      section,
    });
  },

  // Video interactions
  trackVideoPlay: (videoId: string) => {
    trackEvent('video_play', {
      video_id: videoId,
    });
  },

  // Document downloads
  trackDownload: (fileName: string, fileType: string) => {
    trackEvent('file_download', {
      file_name: fileName,
      file_type: fileType,
    });
  },

  // Service/Product interest
  trackServiceInterest: (serviceName: string) => {
    trackEvent('service_interest', {
      service_name: serviceName,
    });
  },

  // Scroll depth tracking
  trackScrollDepth: (percentage: number) => {
    trackEvent('scroll_depth', {
      depth_percentage: percentage,
    });
  },
};
