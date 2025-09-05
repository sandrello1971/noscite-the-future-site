// SEO utility functions for image optimization and performance

export const optimizeImageSrc = (src: string, width?: number, height?: number): string => {
  // For external images (Unsplash, etc.), add optimization parameters
  if (src.includes('unsplash.com')) {
    const baseUrl = src.split('?')[0];
    const params = new URLSearchParams();
    if (width) params.append('w', width.toString());
    if (height) params.append('h', height.toString());
    params.append('fit', 'crop');
    params.append('crop', 'faces');
    params.append('auto', 'format,compress');
    
    return `${baseUrl}?${params.toString()}`;
  }
  
  return src;
};

export const generateImageAlt = (context: string, title?: string): string => {
  if (title && context) {
    return `${title} - ${context} | Noscite`;
  }
  if (title) {
    return `${title} | Noscite`;
  }
  return context;
};

// Generate sitemap data
export const generateSitemap = () => {
  const baseUrl = 'https://noscite.it';
  const pages = [
    { path: '', priority: 1.0, changefreq: 'weekly' },
    { path: '/chi-siamo', priority: 0.8, changefreq: 'monthly' },
    { path: '/servizi', priority: 0.9, changefreq: 'weekly' },
    { path: '/percorsi', priority: 0.8, changefreq: 'monthly' },
    { path: '/risorse', priority: 0.7, changefreq: 'weekly' },
    { path: '/contatti', priority: 0.8, changefreq: 'monthly' },
    { path: '/privacy-policy', priority: 0.3, changefreq: 'yearly' },
    { path: '/cookie-policy', priority: 0.3, changefreq: 'yearly' }
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url>
    <loc>${baseUrl}${page.path}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </url>`).join('\n')}
</urlset>`;

  return sitemap;
};