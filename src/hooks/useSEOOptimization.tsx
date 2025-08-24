import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOMetrics {
  pageLoadTime: number;
  timeToFirstByte: number;
  largestContentfulPaint: number;
  firstInputDelay: number;
  cumulativeLayoutShift: number;
}

export const useSEOOptimization = () => {
  const location = useLocation();
  const [metrics, setMetrics] = useState<SEOMetrics | null>(null);

  useEffect(() => {
    // Track Core Web Vitals for SEO
    const trackWebVitals = () => {
      // Performance metrics
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const paint = performance.getEntriesByType('paint');
      
      if (navigation) {
        const pageLoadTime = navigation.loadEventEnd - navigation.loadEventStart;
        const timeToFirstByte = navigation.responseStart - navigation.requestStart;
        
        setMetrics({
          pageLoadTime,
          timeToFirstByte,
          largestContentfulPaint: 0, // Will be updated by LCP observer
          firstInputDelay: 0, // Will be updated by FID observer
          cumulativeLayoutShift: 0 // Will be updated by CLS observer
        });
      }

      // Largest Contentful Paint
      if ('PerformanceObserver' in window) {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1] as any;
          
          setMetrics(prev => prev ? {
            ...prev,
            largestContentfulPaint: lastEntry.startTime
          } : null);
        });
        
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

        // First Input Delay
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            setMetrics(prev => prev ? {
              ...prev,
              firstInputDelay: entry.processingStart - entry.startTime
            } : null);
          });
        });
        
        fidObserver.observe({ entryTypes: ['first-input'] });

        // Cumulative Layout Shift
        const clsObserver = new PerformanceObserver((list) => {
          let clsValue = 0;
          const entries = list.getEntries();
          
          entries.forEach((entry: any) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          });
          
          setMetrics(prev => prev ? {
            ...prev,
            cumulativeLayoutShift: clsValue
          } : null);
        });
        
        clsObserver.observe({ entryTypes: ['layout-shift'] });
      }
    };

    // Track metrics after page load
    if (document.readyState === 'complete') {
      trackWebVitals();
    } else {
      window.addEventListener('load', trackWebVitals);
    }

    return () => {
      window.removeEventListener('load', trackWebVitals);
    };
  }, [location.pathname]);

  // Preload critical resources
  const preloadCriticalResources = () => {
    // Preload critical images
    const criticalImages = [
      '/og-image.jpg',
      '/src/assets/hero-guatemala.jpg'
    ];

    criticalImages.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = src;
      link.as = 'image';
      document.head.appendChild(link);
    });

    // Preconnect to external domains
    const externalDomains = [
      'https://fonts.googleapis.com',
      'https://www.google-analytics.com',
      'https://www.googletagmanager.com'
    ];

    externalDomains.forEach(domain => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = domain;
      document.head.appendChild(link);
    });
  };

  // Optimize images for SEO
  const optimizeImages = () => {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
      // Add loading="lazy" for non-critical images
      if (!img.hasAttribute('loading') && !img.closest('[data-critical]')) {
        img.setAttribute('loading', 'lazy');
      }
      
      // Ensure all images have alt text for SEO
      if (!img.hasAttribute('alt')) {
        img.setAttribute('alt', 'Propiedad en Guatemala - Habi.gt');
      }
    });
  };

  // Generate structured data for current page
  const generatePageStructuredData = (pageType: string, data?: any) => {
    const baseData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "url": `https://habi.gt${location.pathname}`,
      "name": document.title,
      "description": document.querySelector('meta[name="description"]')?.getAttribute('content'),
      "inLanguage": "es-GT",
      "isPartOf": {
        "@type": "WebSite",
        "name": "Habi.gt",
        "url": "https://habi.gt"
      }
    };

    return baseData;
  };

  return {
    metrics,
    preloadCriticalResources,
    optimizeImages,
    generatePageStructuredData
  };
};