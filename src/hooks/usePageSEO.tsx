import { useEffect } from 'react';

interface PageSEOConfig {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  type?: string;
  structuredData?: object;
}

export const usePageSEO = (config: PageSEOConfig) => {
  useEffect(() => {
    // Update page title
    document.title = config.title;

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', config.description);
    }

    // Update meta keywords if provided
    if (config.keywords) {
      const metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords) {
        metaKeywords.setAttribute('content', config.keywords);
      }
    }

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

    updateMetaProperty('og:title', config.title);
    updateMetaProperty('og:description', config.description);
    if (config.image) {
      updateMetaProperty('og:image', config.image);
    }
    if (config.type) {
      updateMetaProperty('og:type', config.type);
    }

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

    updateTwitterMeta('twitter:title', config.title);
    updateTwitterMeta('twitter:description', config.description);
    if (config.image) {
      updateTwitterMeta('twitter:image', config.image);
    }

    // Add structured data if provided
    let script: HTMLScriptElement | null = null;
    if (config.structuredData) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(config.structuredData);
      document.head.appendChild(script);
    }

    // Cleanup function
    return () => {
      if (script && script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [config]);
};

export default usePageSEO;