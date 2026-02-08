import { Helmet } from 'react-helmet-async';

// Base Organization Schema with @id for knowledge graph interconnection
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://noscite.it/#organization",
  "name": "Noscite",
  "alternateName": "In Digitali Nova Virtus",
  "url": "https://noscite.it",
  "logo": {
    "@type": "ImageObject",
    "@id": "https://noscite.it/#logo",
    "url": "https://noscite.it/lovable-uploads/fd1247fa-7a39-4fc0-8672-f86c15e7ff9d.png"
  },
  "description": "Trasformiamo le aziende attraverso l'intelligenza artificiale e la formazione digitale. AI Academy, Launchpad, Sprint e consulenza strategica.",
  "foundingDate": "2023",
  "areaServed": {
    "@type": "Country",
    "name": "Italy"
  },
  "knowsAbout": [
    "Intelligenza Artificiale",
    "Trasformazione Digitale", 
    "Consulenza Tecnologica",
    "Formazione AI"
  ],
  "sameAs": [
    "https://www.facebook.com/Noscite/",
    "https://www.instagram.com/noscite"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "@id": "https://noscite.it/#contactpoint",
    "contactType": "customer service",
    "url": "https://noscite.it/contatti"
  }
};

// Services Schema with speakable markup
export const servicesSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://noscite.it/#services",
  "provider": {
    "@id": "https://noscite.it/#organization"
  },
  "serviceType": "Digital Transformation Consulting",
  "description": "Servizi completi di trasformazione digitale e implementazione AI per aziende",
  "areaServed": {
    "@type": "Country",
    "name": "Italy"
  },
  "offers": [
    {
      "@type": "Offer",
      "@id": "https://noscite.it/#athenaeum",
      "name": "Athenaeum AI",
      "description": "Percorso formativo di 68 ore: Initium (AI Operativa), Structura (Second Brain), Communitas (Collaborazione)",
      "category": "Training"
    },
    {
      "@type": "Offer", 
      "@id": "https://noscite.it/#launchpad",
      "name": "AI Launchpad",
      "description": "Il trampolino perfetto per lanciare la tua trasformazione digitale in modo strutturato",
      "category": "Consulting"
    },
    {
      "@type": "Offer",
      "@id": "https://noscite.it/#sprint",
      "name": "AI Sprint", 
      "description": "Implementazione rapida di soluzioni AI con risultati misurabili in tempi ridotti",
      "category": "Implementation"
    },
    {
      "@type": "Offer",
      "@id": "https://noscite.it/#evolution",
      "name": "AI Evolution Partner",
      "description": "Partnership strategica per una trasformazione digitale completa e sostenibile", 
      "category": "Partnership"
    },
    {
      "@type": "Offer",
      "@id": "https://noscite.it/#fractional-cio",
      "name": "Fractional CIO",
      "description": "Consulenza strategica di alto livello per guidare la tua evoluzione tecnologica",
      "category": "Strategic Consulting"
    }
  ]
};

// Course Schema for Training Pages with speakable
export const courseSchema = {
  "@context": "https://schema.org",
  "@type": "Course",
  "@id": "https://noscite.it/#course-athenaeum",
  "name": "Athenaeum AI - Percorsi Formativi",
  "description": "Percorsi formativi completi per la trasformazione digitale: Initium, Structura, Communitas",
  "provider": {
    "@id": "https://noscite.it/#organization"
  },
  "courseCode": "NOSCITE-AI-2024",
  "educationalLevel": "Professional",
  "hasCourseInstance": [
    {
      "@type": "CourseInstance", 
      "name": "Initium - Produttività Digitale",
      "description": "Fondamenti di produttività digitale e gestione del workflow",
      "courseMode": "blended"
    },
    {
      "@type": "CourseInstance",
      "name": "Structura - Second Brain", 
      "description": "Costruzione di un sistema di knowledge management personale",
      "courseMode": "blended"
    },
    {
      "@type": "CourseInstance",
      "name": "Communitas - Collaborazione",
      "description": "Metodologie avanzate per la collaborazione e il team building",
      "courseMode": "blended"
    }
  ],
  "timeRequired": "P68H",
  "inLanguage": "it-IT",
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector": [".course-description", ".course-modules"]
  }
};

// FAQ Schema with speakable for AI citation
export const faqSchema = {
  "@context": "https://schema.org", 
  "@type": "FAQPage",
  "@id": "https://noscite.it/#faq",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Quanto tempo richiede un progetto di trasformazione digitale?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "I nostri progetti variano da 4 settimane per gli AI Sprint fino a 12 mesi per trasformazioni complete. Ogni progetto è personalizzato in base alle esigenze specifiche del cliente."
      }
    },
    {
      "@type": "Question", 
      "name": "Offrite formazione per i team interni?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sì, l'Athenaeum AI include percorsi formativi completi per i team interni, con 68 ore di formazione strutturata in tre moduli: Initium, Structura e Communitas."
      }
    },
    {
      "@type": "Question",
      "name": "Come misurate il ROI dei progetti AI?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Utilizziamo KPI specifici e metodologie di misurazione definite fin dall'inizio del progetto, con reporting periodici sui risultati ottenuti e l'impatto sulle performance aziendali."
      }
    }
  ],
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector": [".faq-question", ".faq-answer"]
  }
};

// BlogPosting Schema generator for Commentarium articles
export const generateBlogPostingSchema = (post: {
  title: string;
  excerpt?: string;
  content: string;
  slug: string;
  published_at?: string;
  updated_at?: string;
  featured_image_url?: string;
  category?: string;
  tags?: string[];
}) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "@id": `https://noscite.it/commentarium/${post.slug}#article`,
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": `https://noscite.it/commentarium/${post.slug}`
  },
  "headline": post.title,
  "description": post.excerpt || post.content.replace(/<[^>]*>/g, '').substring(0, 160),
  "image": post.featured_image_url || "https://noscite.it/lovable-uploads/fd1247fa-7a39-4fc0-8672-f86c15e7ff9d.png",
  "datePublished": post.published_at,
  "dateModified": post.updated_at || post.published_at,
  "author": {
    "@type": "Organization",
    "@id": "https://noscite.it/#organization"
  },
  "publisher": {
    "@id": "https://noscite.it/#organization"
  },
  "inLanguage": "it-IT",
  "keywords": post.tags?.join(", ") || post.category,
  "articleSection": post.category,
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector": [".commentarium-content h1", ".commentarium-content p:first-of-type"]
  }
});

// Homepage speakable schema for AI citations
export const homepageSpeakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://noscite.it/#webpage",
  "url": "https://noscite.it",
  "name": "Noscite - In Digitali Nova Virtus | Trasformazione Digitale con AI",
  "description": "Trasformiamo le PMI italiane attraverso l'intelligenza artificiale: formazione Athenaeum AI, consulenza strategica, implementazione.",
  "isPartOf": {
    "@id": "https://noscite.it/#website"
  },
  "about": {
    "@id": "https://noscite.it/#organization"
  },
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector": [
      ".hero-title",
      ".hero-description",
      ".services-description",
      ".about-description"
    ]
  }
};

interface StructuredDataProps {
  schema: object;
}

export const StructuredData = ({ schema }: StructuredDataProps) => {
  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};
