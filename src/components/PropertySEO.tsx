import SEOHead from './SEOHead';
import { generatePropertySchema, generateBreadcrumbSchema } from '@/utils/schema';

interface PropertySEOProps {
  property: {
    id: string;
    title: string;
    description: string;
    price: number;
    location: string;
    rooms?: number;
    area?: number;
    images?: string[];
    agent?: {
      name: string;
      agency: string;
      phone: string;
      email?: string;
      photo?: string;
      tier: string;
    };
  };
}

const PropertySEO = ({ property }: PropertySEOProps) => {
  const propertyTitle = `${property.title} - ${property.location} | Habi.gt`;
  const propertyDescription = `${property.description} Precio: $${property.price.toLocaleString()} ${property.rooms ? `- ${property.rooms} habitaciones` : ''} ${property.area ? `- ${property.area}m²` : ''} en ${property.location}. Contáctanos para más información.`;
  
  const keywords = `${property.title}, ${property.location}, propiedades ${property.location}, bienes raíces ${property.location}, inmobiliaria Guatemala, casas en venta Guatemala, apartamentos Guatemala`;
  
  const structuredData = generatePropertySchema({
    id: property.id,
    title: property.title,
    description: property.description,
    price: property.price.toString(),
    location: property.location,
    bedrooms: property.rooms || 0,
    bathrooms: 1,
    area: property.area || 0,
    images: property.images || [],
    agent: {
      name: property.agent?.name || '',
      agency: property.agent?.agency || 'Habi.gt',
      phone: property.agent?.phone || ''
    }
  });

  const breadcrumbData = generateBreadcrumbSchema([
    { name: 'Inicio', url: 'https://habi.gt' },
    { name: 'Propiedades', url: 'https://habi.gt/propiedades' },
    { name: property.location, url: `https://habi.gt/propiedades/${property.location.toLowerCase().replace(/\s+/g, '-')}` },
    { name: property.title, url: `https://habi.gt/propiedad/${property.id}` }
  ]);

  const combinedStructuredData = {
    "@context": "https://schema.org",
    "@graph": [structuredData, breadcrumbData]
  };

  return (
    <SEOHead
      title={propertyTitle}
      description={propertyDescription}
      keywords={keywords}
      image={property.images?.[0] || 'https://habi.gt/og-image.jpg'}
      type="product"
      structuredData={combinedStructuredData}
    />
  );
};

export default PropertySEO;