import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  type?: string;
  structuredData?: object;
}

const SEOHead = ({ 
  title = "Habi.gt - Encuentra tu hogar ideal en Guatemala",
  description = "🏠 La plataforma líder en bienes raíces de Guatemala. Encuentra casas, apartamentos y propiedades en venta y alquiler. +1000 propiedades verificadas en todo el país.",
  keywords = "bienes raíces Guatemala, casas en venta Guatemala, apartamentos Guatemala, propiedades Guatemala, inmobiliaria Guatemala",
  image = "https://habi.gt/og-image.jpg",
  type = "website",
  structuredData
}: SEOHeadProps) => {
  const location = useLocation();
  const currentUrl = `https://habi.gt${location.pathname}`;

  useEffect(() => {
    // Update page title
    document.title = title;

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }

    // Update meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', keywords);
    }

    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', currentUrl);

    // Update Open Graph tags
    const updateMetaProperty = (property: string, content: string) => {
      let meta = document.querySelector(`meta[property="${property}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    updateMetaProperty('og:title', title);
    updateMetaProperty('og:description', description);
    updateMetaProperty('og:image', image);
    updateMetaProperty('og:url', currentUrl);
    updateMetaProperty('og:type', type);

    // Update Twitter Card tags
    const updateTwitterMeta = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    updateTwitterMeta('twitter:title', title);
    updateTwitterMeta('twitter:description', description);
    updateTwitterMeta('twitter:image', image);

    // Add structured data if provided
    if (structuredData) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(structuredData);
      document.head.appendChild(script);

      // Cleanup function to remove the script when component unmounts
      return () => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      };
    }
  }, [title, description, keywords, image, type, currentUrl, structuredData]);

  return null;
};

export default SEOHead;