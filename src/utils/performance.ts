// Performance monitoring utilities

export const reportWebVitals = (onPerfEntry?: (metric: any) => void) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    }).catch(() => {
      // web-vitals not available, skip metrics
    });
  }
};

// Performance budget checker
export const checkPerformanceBudget = () => {
  if ('performance' in window) {
    const perfData = window.performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    
    if (perfData) {
      const metrics = {
        domContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
        loadComplete: perfData.loadEventEnd - perfData.loadEventStart,
        domInteractive: perfData.domInteractive - perfData.fetchStart,
        transferSize: perfData.transferSize,
      };

      // Budget thresholds
      const budgets = {
        domInteractive: 3000, // 3s
        transferSize: 3145728, // 3MB
      };

      if (import.meta.env.DEV) {
        console.log('Performance Metrics:', metrics);
        console.log('Within Budget:', {
          domInteractive: metrics.domInteractive < budgets.domInteractive,
          transferSize: metrics.transferSize < budgets.transferSize,
        });
      }
    }
  }
};

