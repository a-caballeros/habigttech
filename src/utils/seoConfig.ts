export const SITE_CONFIG = {
  name: 'Habi.gt',
  title: 'Habi.gt - Inmobiliaria #1 en Guatemala',
  description: 'Inmobiliaria líder en Guatemala con +1,500 propiedades verificadas. Casas en venta, apartamentos en alquiler, terrenos y más.',
  url: 'https://habi.gt',
  ogImage: 'https://habi.gt/og-image.jpg',
  keywords: [
    'inmobiliaria Guatemala',
    'bienes raíces Guatemala', 
    'casas en venta Guatemala',
    'apartamentos en alquiler Guatemala',
    'propiedades Guatemala',
    'real estate Guatemala',
    'casas Guatemala City',
    'apartamentos Zona 10',
    'propiedades Antigua Guatemala',
    'terrenos en venta Guatemala',
    'condominios Guatemala',
    'oficinas en alquiler Guatemala',
    'locales comerciales Guatemala',
    'inversión inmobiliaria Guatemala',
    'agentes inmobiliarios Guatemala',
    'corredores de bienes raíces Guatemala'
  ]
};

export const PAGE_TYPES = {
  HOME: 'website',
  PROPERTY: 'product',
  LOCATION: 'place',
  AGENT: 'profile',
  SEARCH: 'searchresultspage'
};

export const PRIORITY_KEYWORDS = {
  PRIMARY: [
    'inmobiliaria Guatemala',
    'bienes raíces Guatemala',
    'casas en venta Guatemala',
    'apartamentos en alquiler Guatemala'
  ],
  SECONDARY: [
    'propiedades Guatemala',
    'real estate Guatemala', 
    'terrenos Guatemala',
    'condominios Guatemala'
  ],
  LONG_TAIL: [
    'mejores inmobiliarias Guatemala',
    'propiedades verificadas Guatemala',
    'agentes inmobiliarios profesionales Guatemala',
    'inversión inmobiliaria rentable Guatemala'
  ]
};

export const LOCATION_KEYWORDS = {
  GUATEMALA_CITY: [
    'propiedades Guatemala City',
    'casas Guatemala City',
    'apartamentos Guatemala City'
  ],
  ZONES: [
    'propiedades Zona 10',
    'apartamentos Zona 14', 
    'casas Zona 15',
    'oficinas Zona 9'
  ],
  CITIES: [
    'propiedades Antigua Guatemala',
    'casas Quetzaltenango',
    'apartamentos Escuintla'
  ]
};

export const CONTENT_TYPES = {
  PROPERTY_SALE: 'Venta',
  PROPERTY_RENT: 'Alquiler', 
  LAND: 'Terreno',
  COMMERCIAL: 'Comercial',
  LUXURY: 'Lujo'
};

export function generatePageTitle(type: string, location?: string, propertyType?: string): string {
  const base = SITE_CONFIG.title;
  
  if (type === 'property' && location && propertyType) {
    return `${propertyType} en ${location} | ${base}`;
  }
  
  if (type === 'location' && location) {
    return `Propiedades en ${location} | Casas y Apartamentos | ${base}`;
  }
  
  if (type === 'search') {
    return `Búsqueda de Propiedades | ${base}`;
  }
  
  return base;
}

export function generateMetaDescription(type: string, location?: string, propertyCount?: number): string {
  const base = SITE_CONFIG.description;
  
  if (type === 'location' && location) {
    const count = propertyCount ? `${propertyCount}+` : 'Múltiples';
    return `Encuentra las mejores propiedades en ${location} con Habi.gt. ${count} casas, apartamentos y terrenos en venta y alquiler. Agentes expertos te acompañan.`;
  }
  
  if (type === 'search') {
    return 'Busca y encuentra la propiedad perfecta en Guatemala. Miles de opciones verificadas en casas, apartamentos, terrenos y más con Habi.gt.';
  }
  
  return base;
}