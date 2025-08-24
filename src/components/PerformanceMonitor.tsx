import { useEffect } from 'react';

const PerformanceMonitor = () => {
  useEffect(() => {
    // Monitor Core Web Vitals
    const observePerformance = () => {
      // Largest Contentful Paint (LCP)
      if ('PerformanceObserver' in window) {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          console.log('LCP:', lastEntry.startTime);
          
          // Send to analytics if needed
          if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('event', 'timing_complete', {
              name: 'LCP',
              value: Math.round(lastEntry.startTime)
            });
          }
        });
        
        try {
          lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        } catch (e) {
          // LCP may not be supported
        }

        // First Input Delay (FID)
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            const fid = entry.processingStart - entry.startTime;
            console.log('FID:', fid);
            
            if (typeof window !== 'undefined' && (window as any).gtag) {
              (window as any).gtag('event', 'timing_complete', {
                name: 'FID',
                value: Math.round(fid)
              });
            }
          });
        });

        try {
          fidObserver.observe({ entryTypes: ['first-input'] });
        } catch (e) {
          // FID may not be supported
        }

        // Cumulative Layout Shift (CLS)
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!(entry as any).hadRecentInput) {
              clsValue += (entry as any).value;
            }
          }
          console.log('CLS:', clsValue);
          
          if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('event', 'timing_complete', {
              name: 'CLS',
              value: Math.round(clsValue * 1000)
            });
          }
        });

        try {
          clsObserver.observe({ entryTypes: ['layout-shift'] });
        } catch (e) {
          // CLS may not be supported
        }
      }

      // Monitor page load times
      window.addEventListener('load', () => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        const loadTime = navigation.loadEventEnd - navigation.fetchStart;
        
        console.log('Page Load Time:', loadTime);
        
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'timing_complete', {
            name: 'page_load_time',
            value: Math.round(loadTime)
          });
        }
      });
    };

    observePerformance();
  }, []);

  return null;
};

export default PerformanceMonitor;