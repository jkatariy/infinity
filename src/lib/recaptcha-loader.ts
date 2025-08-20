// reCAPTCHA Script Loader Utility
let scriptLoaded = false;
let scriptLoading = false;
let loadCallbacks: (() => void)[] = [];

export const loadReCaptchaScript = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    // If already loaded, resolve immediately
    if (scriptLoaded && window.grecaptcha) {
      resolve();
      return;
    }

    // If already loading, add to callbacks
    if (scriptLoading) {
      loadCallbacks.push(resolve);
      return;
    }

    scriptLoading = true;

    // Check if script is already in the DOM
    const existingScript = document.querySelector('script[src*="recaptcha/api.js"]');
    if (existingScript) {
      console.log('ReCaptchaLoader: Script already in DOM, waiting for load...');
      const checkLoaded = () => {
        if (window.grecaptcha) {
          scriptLoaded = true;
          scriptLoading = false;
          resolve();
          loadCallbacks.forEach(cb => cb());
          loadCallbacks = [];
        } else {
          setTimeout(checkLoaded, 100);
        }
      };
      checkLoaded();
      return;
    }

    // Create and load script
    const script = document.createElement('script');
    script.src = 'https://www.google.com/recaptcha/api.js';
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      console.log('ReCaptchaLoader: Script loaded successfully');
      scriptLoaded = true;
      scriptLoading = false;
      resolve();
      loadCallbacks.forEach(cb => cb());
      loadCallbacks = [];
    };

    script.onerror = () => {
      console.error('ReCaptchaLoader: Failed to load script');
      scriptLoading = false;
      reject(new Error('Failed to load reCAPTCHA script'));
    };

    document.head.appendChild(script);
  });
};

export const isReCaptchaReady = (): boolean => {
  return scriptLoaded && typeof window !== 'undefined' && !!window.grecaptcha;
};

export const waitForReCaptcha = (): Promise<void> => {
  if (isReCaptchaReady()) {
    return Promise.resolve();
  }
  return loadReCaptchaScript();
};
