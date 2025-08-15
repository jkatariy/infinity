import { useState, useCallback } from 'react';
import { 
  sendToZohoCRM, 
  checkZohoAuth, 
  transformFormData, 
  validateZohoFormData,
  type ZohoFormData, 
  type ZohoApiResponse 
} from '@/utils/zohoIntegration';

interface UseZohoIntegrationOptions {
  formType?: string;
  onSuccess?: (response: ZohoApiResponse) => void;
  onError?: (error: string) => void;
  autoTransform?: boolean;
}

export function useZohoIntegration(options: UseZohoIntegrationOptions = {}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [lastResponse, setLastResponse] = useState<ZohoApiResponse | null>(null);

  // Check authentication status
  const checkAuth = useCallback(async () => {
    try {
      const result = await checkZohoAuth();
      setIsAuthenticated(result.authenticated);
      return result;
    } catch (error) {
      setIsAuthenticated(false);
      console.error('Auth check failed:', error);
      return { authenticated: false, message: 'Auth check failed' };
    }
  }, []);

  // Submit form data to Zoho CRM
  const submitToZoho = useCallback(async (
    formData: any, 
    formType?: string
  ): Promise<ZohoApiResponse> => {
    setIsLoading(true);
    
    try {
      let zohoData: ZohoFormData;

      // Transform data if autoTransform is enabled
      if (options.autoTransform !== false) {
        zohoData = transformFormData(formData, formType || options.formType || 'contact');
      } else {
        zohoData = formData as ZohoFormData;
      }

      // Validate the data
      const validation = validateZohoFormData(zohoData);
      if (!validation.isValid) {
        const errorMessage = `Validation failed: ${validation.errors.join(', ')}`;
        const errorResponse: ZohoApiResponse = {
          success: false,
          message: errorMessage,
          error: errorMessage,
        };
        
        setLastResponse(errorResponse);
        options.onError?.(errorMessage);
        return errorResponse;
      }

      // Submit to Zoho CRM
      const response = await sendToZohoCRM(zohoData);
      setLastResponse(response);

      if (response.success) {
        options.onSuccess?.(response);
      } else {
        options.onError?.(response.error || 'Submission failed');
      }

      return response;

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      const errorResponse: ZohoApiResponse = {
        success: false,
        message: errorMessage,
        error: errorMessage,
      };
      
      setLastResponse(errorResponse);
      options.onError?.(errorMessage);
      return errorResponse;
    } finally {
      setIsLoading(false);
    }
  }, [options]);

  // Start OAuth flow
  const initiateAuth = useCallback(() => {
    window.location.href = '/api/oauth/authorize';
  }, []);

  return {
    // State
    isLoading,
    isAuthenticated,
    lastResponse,
    
    // Actions
    submitToZoho,
    checkAuth,
    initiateAuth,
    
    // Helpers
    isReady: isAuthenticated === true,
    needsAuth: isAuthenticated === false,
  };
}

// Specialized hooks for different form types
export function useContactForm(options?: UseZohoIntegrationOptions) {
  return useZohoIntegration({
    ...options,
    formType: 'contact',
  });
}

export function useQuoteForm(options?: UseZohoIntegrationOptions) {
  return useZohoIntegration({
    ...options,
    formType: 'quote',
  });
}

export function useDemoForm(options?: UseZohoIntegrationOptions) {
  return useZohoIntegration({
    ...options,
    formType: 'demo',
  });
}

export function useServiceForm(options?: UseZohoIntegrationOptions) {
  return useZohoIntegration({
    ...options,
    formType: 'service',
  });
}

export function useChatbotIntegration(options?: UseZohoIntegrationOptions) {
  return useZohoIntegration({
    ...options,
    formType: 'chatbot',
  });
}
