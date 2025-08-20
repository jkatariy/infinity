// Utility functions for Zoho CRM integration

export interface ZohoFormData {
  // Required fields
  email: string;
  lastName: string;
  
  // Optional personal info
  firstName?: string;
  phone?: string;
  title?: string;
  company?: string;
  
  // Lead source and classification
  leadSource?: string;
  industry?: string;
  leadStatus?: string;
  rating?: string;
  
  // Product and business info
  productInterest?: string;
  machineType?: string;
  inquiryType?: string;
  budgetRange?: string;
  timeline?: string;
  annualRevenue?: string;
  numberOfEmployees?: string;
  website?: string;
  
  // Address information
  street?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  
  // Additional details
  message?: string;
  description?: string;
  additionalRequirements?: string;
  
  // Record configuration
  recordType?: 'Leads' | 'Contacts';
}

export interface ZohoApiResponse {
  success: boolean;
  message: string;
  zohoId?: string;
  data?: any;
  error?: string;
  details?: string;
}

/**
 * Send form data to Zoho CRM
 */
export async function sendToZohoCRM(formData: ZohoFormData): Promise<ZohoApiResponse> {
  try {
    const response = await fetch('/api/sendToZoho', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || `HTTP ${response.status}`);
    }

    return result;
  } catch (error) {
    console.error('Error sending to Zoho CRM:', error);
    return {
      success: false,
      message: 'Failed to send data to CRM',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Check Zoho CRM authentication status
 */
export async function checkZohoAuth(): Promise<{ authenticated: boolean; message: string }> {
  try {
    const response = await fetch('/api/sendToZoho', {
      method: 'GET',
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error checking Zoho auth:', error);
    return {
      authenticated: false,
      message: 'Failed to check authentication status',
    };
  }
}

/**
 * Initialize Zoho OAuth flow
 */
export async function initializeZohoAuth(): Promise<string> {
  try {
    const response = await fetch('/api/oauth/authorize', {
      method: 'POST',
    });

    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.error || 'Failed to get authorization URL');
    }

    return result.authUrl;
  } catch (error) {
    console.error('Error initializing Zoho auth:', error);
    throw error;
  }
}

/**
 * Redirect to Zoho OAuth authorization
 */
export function redirectToZohoAuth(): void {
  window.location.href = '/api/oauth/authorize';
}

/**
 * Transform form data from your existing forms to Zoho format
 */
export function transformFormData(formData: any, formType: string): ZohoFormData {
  const base: ZohoFormData = {
    email: formData.email,
    lastName: formData.lastName || formData.name?.split(' ').pop() || 'Unknown',
    firstName: formData.firstName || formData.name?.split(' ')[0] || '',
    phone: formData.phone,
    company: formData.company,
    message: formData.message,
    leadSource: formData.leadSource || 'Website',
    country: 'India',
    recordType: 'Leads',
  };

  // Form-specific transformations
  switch (formType) {
    case 'contact':
      return {
        ...base,
        inquiryType: 'General Inquiry',
        leadStatus: 'Not Contacted',
      };

    case 'quote':
      return {
        ...base,
        inquiryType: 'Quote Request',
        productInterest: formData.productInterest || formData.product,
        machineType: formData.machineType || formData.model,
        budgetRange: formData.budget,
        timeline: formData.timeline,
        additionalRequirements: formData.requirements,
        leadStatus: 'Quote Requested',
        rating: 'Hot',
      };

    case 'demo':
      return {
        ...base,
        inquiryType: 'Demo Request',
        productInterest: formData.productInterest || formData.product,
        machineType: formData.machineType || formData.model,
        timeline: formData.timeline || 'ASAP',
        leadStatus: 'Demo Requested',
        rating: 'Warm',
      };

    case 'service':
      return {
        ...base,
        inquiryType: 'Service Request',
        machineType: formData.machineModel,
        description: formData.serviceType,
        additionalRequirements: formData.issue,
        leadStatus: 'Service Request',
      };

    case 'chatbot':
      return {
        ...base,
        inquiryType: 'Chatbot Inquiry',
        productInterest: undefined,
        machineType: undefined,
        budgetRange: undefined,
        timeline: undefined,
        additionalRequirements: undefined,
        leadSource: 'Chatbot',
        leadStatus: 'Chatbot Lead',
      };

    default:
      return base;
  }
}

/**
 * Validate form data before sending to Zoho
 */
export function validateZohoFormData(data: ZohoFormData): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Required fields
  if (!data.email) {
    errors.push('Email is required');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push('Invalid email format');
  }

  if (!data.lastName) {
    errors.push('Last name is required');
  }

  // Optional validations
  if (data.phone && !/^[\+]?[1-9][\d]{0,15}$/.test(data.phone.replace(/[\s\-\(\)]/g, ''))) {
    errors.push('Invalid phone number format');
  }

  if (data.website && !/^https?:\/\/.+/.test(data.website)) {
    errors.push('Website must include http:// or https://');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Format data for specific Zoho modules
 */
export function formatForZohoModule(data: ZohoFormData, module: 'Leads' | 'Contacts') {
  const formatted = { ...data };
  
  if (module === 'Contacts') {
    // Convert Lead-specific fields to Contact fields
    formatted.recordType = 'Contacts';
    // You might want to map additional fields here
  }
  
  return formatted;
}

/**
 * Get industry options for forms
 */
export const INDUSTRY_OPTIONS = [
  'Food & Beverage',
  'Pharmaceuticals',
  'Personal Care',
  'Chemical',
  'E-commerce',
  'Automotive',
  'Manufacturing',
  'Healthcare',
  'Other',
];

/**
 * Get product interest options
 */
export const PRODUCT_INTEREST_OPTIONS = [
  'Cartoning Machines',
  'Case Packers',
  'Bundling & Wrapping',
  'Checkweighers',
  'Conveying Systems',
  'Pouch Balers',
  'Vision Inspection',
  'Complete Line Solution',
  'Other',
];

/**
 * Get budget range options
 */
export const BUDGET_RANGE_OPTIONS = [
  'Under 5 Lakhs',
  '5-10 Lakhs',
  '10-25 Lakhs',
  '25-50 Lakhs',
  '50 Lakhs - 1 Crore',
  'Above 1 Crore',
  'Prefer not to say',
];

/**
 * Get timeline options
 */
export const TIMELINE_OPTIONS = [
  'Immediate (Within 1 month)',
  '1-3 months',
  '3-6 months',
  '6-12 months',
  'Beyond 12 months',
  'Just researching',
];
