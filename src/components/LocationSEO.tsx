import SEOHead from './SEOHead';
import { generateBreadcrumbSchema, generateOrganizationSchema } from '@/utils/schema';

interface LocationSEOProps {
  location: string;
  propertyCount: number;
  description?: string;
}

const LocationSEO = ({ location, propertyCount, description }: LocationSEOProps) => {
  const title = `Propiedades en ${location} | ${propertyCount}+ Casas y Apartamentos | Habi.gt`;
  const defaultDescription = `Encuentra las mejores propiedades en ${location} con Habi.gt. ${propertyCount}+ casas, apartamentos y terrenos en venta y alquiler en ${location}. Agentes inmobiliarios expertos te ayudan a encontrar tu hogar ideal.`;
  
  const keywords = `propiedades ${location}, casas en venta ${location}, apartamentos ${location}, bienes raíces ${location}, inmobiliaria ${location}, terrenos ${location}, condominios ${location}, alquiler ${location}, inversión inmobiliaria ${location}`;

  const breadcrumbData = generateBreadcrumbSchema([
    { name: 'Inicio', url: 'https://habi.gt' },
    { name: 'Propiedades', url: 'https://habi.gt/propiedades' },
    { name: location, url: `https://habi.gt/propiedades/${location.toLowerCase().replace(/\s+/g, '-')}` }
  ]);

  const organizationData = generateOrganizationSchema();

  const locationStructuredData = {
    "@context": "https://schema.org",
    "@type": "Place",
    "name": location,
    "description": description || defaultDescription,
    "url": `https://habi.gt/propiedades/${location.toLowerCase().replace(/\s+/g, '-')}`,
    "containsPlace": {
      "@type": "RealEstateAgent",
      "name": "Habi.gt",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": `Propiedades en ${location}`,
        "numberOfItems": propertyCount
      }
    }
  };

  const combinedStructuredData = {
    "@context": "https://schema.org",
    "@graph": [locationStructuredData, breadcrumbData, organizationData]
  };

  return (
    <SEOHead
      title={title}
      description={description || defaultDescription}
      keywords={keywords}
      image="https://habi.gt/og-image.jpg"
      type="place"
      structuredData={combinedStructuredData}
    />
  );
};

export default LocationSEO;