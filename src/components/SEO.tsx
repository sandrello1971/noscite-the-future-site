import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  canonical?: string;
  structuredData?: object;
}

export const SEO = ({
  title = "Noscite - Trasformazione Digitale e AI per PMI | Consulenza",
  description = "Innovazione digitale e AI per PMI italiane: consulenza strategica, formazione Athenaeum AI, implementazione con ROI misurabile. Scopri il metodo Noscite.",
  keywords = "AI, intelligenza artificiale, trasformazione digitale, consulenza tecnologica, formazione AI, Athenaeum AI, AI Sprint, Launchpad",
  ogImage = "https://lovable.dev/opengraph-image-p98pqg.png",
  canonical,
  structuredData
}: SEOProps) => {
  const currentUrl = canonical || window.location.href;
  
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={currentUrl} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Noscite" />
      
      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};