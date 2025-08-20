// reCAPTCHA Configuration
export const RECAPTCHA_CONFIG = {
  // Site key - same for both development and production
  SITE_KEY: '6Lf8qKwrAAAAAGybd9R6bg3zeLdXOCdrGDYiYNVO',
  
  // Secret key - only used on server side
  SECRET_KEY: '6Lf8qKwrAAAAAA7XHML2pcj2tPt_6gJfJWnhiabL',
  
  // Allowed domains
  ALLOWED_DOMAINS: [
    'localhost',
    'localhost:3000',
    'localhost:3001',
    'localhost:3002',
    'infinitysols.com',
    'www.infinitysols.com',
    'vercel.app', // For Vercel preview deployments
  ]
};

// Get the current domain
export const getCurrentDomain = (): string => {
  if (typeof window !== 'undefined') {
    return window.location.hostname;
  }
  return 'localhost';
};

// Check if current domain is allowed
export const isDomainAllowed = (): boolean => {
  const currentDomain = getCurrentDomain();
  return RECAPTCHA_CONFIG.ALLOWED_DOMAINS.some(domain => 
    currentDomain === domain || currentDomain.endsWith(domain)
  );
};
