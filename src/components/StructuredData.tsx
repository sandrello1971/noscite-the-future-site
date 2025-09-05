import { Helmet } from 'react-helmet-async';

// Organization Schema
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Noscite",
  "alternateName": "In Digitali Nova Virtus",
  "url": "https://noscite.it",
  "logo": "https://noscite.it/lovable-uploads/fd1247fa-7a39-4fc0-8672-f86c15e7ff9d.png",
  "description": "Trasformiamo le aziende attraverso l'intelligenza artificiale e la formazione digitale. AI Academy, Launchpad, Sprint e consulenza strategica.",
  "foundingDate": "2023",
  "founder": {
    "@type": "Person",
    "name": "Noscite Team"
  },
  "areaServed": "Italy",
  "serviceType": [
    "Intelligenza Artificiale",
    "Trasformazione Digitale", 
    "Consulenza Tecnologica",
    "Formazione AI"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "url": "https://noscite.it/contatti"
  },
  "sameAs": []
};

// Services Schema
export const servicesSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "provider": {
    "@type": "Organization",
    "name": "Noscite"
  },
  "serviceType": "Digital Transformation Consulting",
  "description": "Servizi completi di trasformazione digitale e implementazione AI per aziende",
  "offers": [
    {
      "@type": "Offer",
      "name": "Athenaeum AI",
      "description": "Percorso formativo di 68 ore: Initium (AI Operativa), Structura (Second Brain), Communitas (Collaborazione)",
      "category": "Training"
    },
    {
      "@type": "Offer", 
      "name": "AI Launchpad",
      "description": "Il trampolino perfetto per lanciare la tua trasformazione digitale in modo strutturato",
      "category": "Consulting"
    },
    {
      "@type": "Offer",
      "name": "AI Sprint", 
      "description": "Implementazione rapida di soluzioni AI con risultati misurabili in tempi ridotti",
      "category": "Implementation"
    },
    {
      "@type": "Offer",
      "name": "AI Evolution Partner",
      "description": "Partnership strategica per una trasformazione digitale completa e sostenibile", 
      "category": "Partnership"
    },
    {
      "@type": "Offer",
      "name": "Fractional CIO",
      "description": "Consulenza strategica di alto livello per guidare la tua evoluzione tecnologica",
      "category": "Strategic Consulting"
    }
  ]
};

// Course Schema for Training Pages
export const courseSchema = {
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Athenaeum AI - Percorsi Formativi",
  "description": "Percorsi formativi completi per la trasformazione digitale: Initium, Structura, Communitas",
  "provider": {
    "@type": "Organization",
    "name": "Noscite"
  },
  "courseCode": "NOSCITE-AI-2024",
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
  "inLanguage": "it-IT"
};

// FAQ Schema
export const faqSchema = {
  "@context": "https://schema.org", 
  "@type": "FAQPage",
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
  ]
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