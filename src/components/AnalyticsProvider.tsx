import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '@/utils/analytics';

interface AnalyticsProviderProps {
  children: React.ReactNode;
  measurementId?: string;
}

const AnalyticsProvider = ({ children, measurementId = 'GA_MEASUREMENT_ID' }: AnalyticsProviderProps) => {
  const location = useLocation();

  useEffect(() => {
    // Load Google Analytics script
    if (typeof window !== 'undefined' && measurementId !== 'GA_MEASUREMENT_ID') {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
      document.head.appendChild(script);

      const configScript = document.createElement('script');
      configScript.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${measurementId}', {
          page_title: document.title,
          page_location: window.location.href
        });
      `;
      document.head.appendChild(configScript);

      (window as any).gtag = function() {
        (window as any).dataLayer.push(arguments);
      };
    }
  }, [measurementId]);

  useEffect(() => {
    // Track page views on route changes
    const url = window.location.origin + location.pathname + location.search;
    const title = document.title;
    
    trackPageView(url, title);
  }, [location]);

  return <>{children}</>;
};

export default AnalyticsProvider;