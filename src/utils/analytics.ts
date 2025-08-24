// Google Analytics and tracking utilities
export const gtag = (...args: any[]) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag(...args);
  }
};

export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

export const trackPageView = (url: string, title: string) => {
  gtag('config', 'GA_MEASUREMENT_ID', {
    page_location: url,
    page_title: title,
  });
};

// Property search tracking
export const trackPropertySearch = (searchTerm: string, location?: string) => {
  trackEvent('search', 'property', `${searchTerm}${location ? ` - ${location}` : ''}`, 1);
};

// Property view tracking
export const trackPropertyView = (propertyId: string, propertyType: string) => {
  trackEvent('view_item', 'property', `${propertyType} - ${propertyId}`, 1);
};

// Contact agent tracking
export const trackAgentContact = (agentId: string, contactMethod: 'whatsapp' | 'email' | 'phone') => {
  trackEvent('contact', 'agent', `${contactMethod} - ${agentId}`, 1);
};

// User registration tracking
export const trackUserRegistration = (userType: 'client' | 'agent') => {
  trackEvent('sign_up', 'user', userType, 1);
};

// Subscription tracking
export const trackSubscription = (plan: string, amount: number) => {
  gtag('event', 'purchase', {
    transaction_id: `sub_${Date.now()}`,
    value: amount,
    currency: 'GTQ',
    items: [{
      item_id: plan,
      item_name: `Suscripción ${plan}`,
      category: 'subscription',
      quantity: 1,
      price: amount
    }]
  });
};