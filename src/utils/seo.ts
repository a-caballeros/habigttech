// SEO utility functions

export const generateMetaTags = (data: {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}) => {
  const tags = [
    { name: 'title', content: data.title },
    { name: 'description', content: data.description },
    { property: 'og:title', content: data.title },
    { property: 'og:description', content: data.description },
    { property: 'og:type', content: data.type || 'website' },
    { name: 'twitter:title', content: data.title },
    { name: 'twitter:description', content: data.description },
    { name: 'twitter:card', content: 'summary_large_image' }
  ];

  if (data.keywords) {
    tags.push({ name: 'keywords', content: data.keywords });
  }

  if (data.image) {
    tags.push(
      { property: 'og:image', content: data.image },
      { name: 'twitter:image', content: data.image }
    );
  }

  if (data.url) {
    tags.push(
      { property: 'og:url', content: data.url }
    );
  }

  return tags;
};

export const generateKeywords = (base: string[], location?: string, type?: string) => {
  const keywords = [...base];
  
  if (location) {
    keywords.push(
      `${type || 'propiedades'} ${location}`,
      `bienes raíces ${location}`,
      `inmobiliaria ${location}`
    );
  }

  if (type) {
    keywords.push(
      `${type} Guatemala`,
      `${type} en venta`,
      `${type} en alquiler`
    );
  }

  return keywords.join(', ');
};

export const optimizeImageAlt = (filename: string, context?: string) => {
  const base = filename
    .replace(/\.(jpg|jpeg|png|webp|svg)$/i, '')
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase());
  
  if (context) {
    return `${base} - ${context}`;
  }
  
  return base;
};

export const generateBreadcrumbs = (pathname: string) => {
  const paths = pathname.split('/').filter(Boolean);
  const breadcrumbs = [{ name: 'Inicio', url: '/' }];
  
  let currentPath = '';
  
  paths.forEach((path, index) => {
    currentPath += `/${path}`;
    
    const name = path
      .replace(/-/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase());
    
    breadcrumbs.push({
      name,
      url: currentPath
    });
  });
  
  return breadcrumbs;
};

// Local business schema for different locations
export const generateLocalBusinessSchema = (location: string) => {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `Habi.gt ${location}`,
    "description": `Servicios de bienes raíces en ${location}, Guatemala`,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": location,
      "addressRegion": location,
      "addressCountry": "GT"
    },
    "telephone": "+502-42457829",
    "email": "webmaster@habigt.tech",
    "url": `https://habi.gt/location/${location.toLowerCase().replace(/\s+/g, '-')}`,
    "priceRange": "$$",
    "serviceArea": {
      "@type": "Place",
      "name": `${location}, Guatemala`
    }
  };
};