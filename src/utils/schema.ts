// Schema.org structured data utilities for SEO

export interface PropertyStructuredData {
  id: string;
  title: string;
  description: string;
  price: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  images: string[];
  agent: {
    name: string;
    agency: string;
    phone: string;
  };
}

export const generatePropertySchema = (property: PropertyStructuredData) => {
  return {
    "@context": "https://schema.org",
    "@type": "Residence",
    "name": property.title,
    "description": property.description,
    "url": `https://habi.gt/property/${property.id}`,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": property.location.split(',')[0],
      "addressRegion": property.location.split(',')[1]?.trim(),
      "addressCountry": "GT"
    },
    "floorSize": {
      "@type": "QuantitativeValue",
      "value": property.area,
      "unitCode": "MTK"
    },
    "numberOfRooms": property.bedrooms,
    "numberOfBathroomsTotal": property.bathrooms,
    "image": property.images,
    "offers": {
      "@type": "Offer",
      "price": property.price.replace('Q', '').replace(',', ''),
      "priceCurrency": "GTQ",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "RealEstateAgent",
        "name": property.agent.name,
        "telephone": property.agent.phone,
        "worksFor": {
          "@type": "Organization",
          "name": property.agent.agency
        }
      }
    }
  };
};

export const generateBreadcrumbSchema = (items: Array<{name: string, url: string}>) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
};

export const generateAgentSchema = (agent: {
  name: string;
  agency: string;
  phone: string;
  email?: string;
  photo?: string;
  tier: string;
}) => {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": agent.name,
    "telephone": agent.phone,
    "email": agent.email,
    "image": agent.photo,
    "worksFor": {
      "@type": "Organization",
      "name": agent.agency
    },
    "additionalType": `https://habi.gt/agents/${agent.tier}`,
    "areaServed": {
      "@type": "Country",
      "name": "Guatemala"
    }
  };
};

export const generateOrganizationSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Habi.gt",
    "alternateName": "Habi Guatemala",
    "url": "https://habi.gt",
    "logo": "https://habi.gt/logo-horizontal.png",
    "description": "La plataforma líder en bienes raíces de Guatemala",
    "foundingDate": "2024",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "GT",
      "addressRegion": "Guatemala"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+502-42457829",
      "email": "webmaster@habigt.tech",
      "contactType": "Customer Service",
      "availableLanguage": ["Spanish", "English"]
    },
    "sameAs": [
      "https://www.facebook.com/habigt",
      "https://www.instagram.com/habigt",
      "https://twitter.com/habigt"
    ],
    "serviceType": "Real Estate Services",
    "areaServed": {
      "@type": "Country",
      "name": "Guatemala"
    }
  };
};