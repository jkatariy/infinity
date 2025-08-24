import { useState, useCallback } from 'react';
import { unifiedZohoIntegration } from '@/utils/unifiedZohoIntegration';

interface ZohoFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message?: string;
  lead_source?: string;
  [key: string]: any;
}

interface ZohoApiResponse {
  success: boolean;
  message: string;
  error?: string;
  data?: any;
}

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
      const healthStatus = await unifiedZohoIntegration.getSystemHealth();
      const hasToken = healthStatus.token_status.has_token;
      setIsAuthenticated(hasToken);
      return { authenticated: hasToken, message: hasToken ? 'Authenticated' : 'Not authenticated' };
    } catch (error) {
      setIsAuthenticated(false);
      console.error('Auth check failed:', error);
      return { authenticated: false, message: 'Auth check failed' };
    }
  }, []);

  // Transform form data to Zoho format
  const transformFormData = useCallback((formData: any, formType: string = 'contact'): ZohoFormData => {
    const baseData: ZohoFormData = {
      name: formData.name || formData.firstName || formData.fullName || '',
      email: formData.email || '',
      phone: formData.phone || formData.telephone || '',
      company: formData.company || formData.organization || '',
      message: formData.message || formData.comments || formData.description || '',
      lead_source: formData.lead_source || 'Website Form',
    };

    // Add form-specific fields
    switch (formType) {
      case 'quote':
        baseData.inquiry_type = 'Quote Request';
        baseData.product_interest = formData.product || formData.service || '';
        break;
      case 'demo':
        baseData.inquiry_type = 'Demo Request';
        baseData.product_interest = formData.product || formData.service || '';
        break;
      case 'service':
        baseData.inquiry_type = 'Service Request';
        baseData.service_type = formData.serviceType || '';
        break;
      case 'chatbot':
        baseData.inquiry_type = 'Chatbot Lead';
        baseData.conversation_summary = formData.conversation || '';
        break;
      default:
        baseData.inquiry_type = 'General Inquiry';
    }

    return baseData;
  }, []);

  // Validate Zoho form data
  const validateZohoFormData = useCallback((data: ZohoFormData): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];

    if (!data.name || data.name.trim().length === 0) {
      errors.push('Name is required');
    }

    if (!data.email || data.email.trim().length === 0) {
      errors.push('Email is required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.push('Email format is invalid');
    }

    if (!data.lead_source) {
      errors.push('Lead source is required');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
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

      // Store lead in database (this will be processed by the cron job)
      const response = await fetch('/api/store-lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(zohoData),
      });

      if (!response.ok) {
        throw new Error(`Failed to store lead: ${response.statusText}`);
      }

      const result = await response.json();
      
      const successResponse: ZohoApiResponse = {
        success: true,
        message: 'Lead stored successfully and will be sent to Zoho CRM',
        data: result
      };

      setLastResponse(successResponse);
      options.onSuccess?.(successResponse);
      return successResponse;

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
  }, [options, transformFormData, validateZohoFormData]);

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
