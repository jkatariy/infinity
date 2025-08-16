'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuoteForm } from '@/hooks/useZohoIntegration';

interface ZohoCRMFormProps {
  productName?: string;
  leadSource?: string;
  className?: string;
  onSuccess?: () => void;
  onClose?: () => void;
  showCloseButton?: boolean;
  title?: string;
  subtitle?: string;
  availableModels?: ReadonlyArray<{
    readonly name: string;
    readonly title: string;
    readonly href: string;
  }>;
  currentCategory?: string;
  colors?: {
    accent: string;
    light: string;
    medium: string;
  };
}

const defaultColors = {
  accent: '#4F46E5',
  light: '#EEF2FF',
  medium: '#E0E7FF'
};

const ZohoCRMForm: React.FC<ZohoCRMFormProps> = ({
  productName,
  leadSource = 'Website',
  className = '',
  onSuccess,
  onClose,
  showCloseButton = false,
  title = 'Get In Touch',
  subtitle = 'Let our engineering experts help you find the perfect solution',
  colors = defaultColors,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  // Use the Zoho integration hook
  const { 
    submitToZoho, 
    isLoading, 
    isAuthenticated, 
    needsAuth, 
    initiateAuth,
    lastResponse 
  } = useQuoteForm({
    onSuccess: (response) => {
      console.log('Quote submitted successfully:', response.zohoId);
      setSubmitted(true);
      if (onSuccess) onSuccess();
    },
    onError: (error) => {
      console.error('Quote submission error:', error);
      setError(error);
    },
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error when user starts typing
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Check authentication if needed
    if (needsAuth) {
      const shouldAuth = window.confirm(
        'Admin authentication required for Zoho CRM integration. Would you like to authenticate now?'
      );
      if (shouldAuth) {
        initiateAuth();
      }
      return;
    }

    // Minimal data; hook will auto-transform for 'quote'
    const minimalData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
      product: productName,
      leadSource,
    };

    await submitToZoho(minimalData);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: '',
    });
    setSubmitted(false);
    setError(null);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`relative rounded-xl border bg-white shadow-lg overflow-hidden ${className}`}
        style={{ borderColor: `${colors.accent}20` }}
      >
        {/* Engineering corner accents */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2" style={{ borderColor: colors.accent }}></div>
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2" style={{ borderColor: colors.accent }}></div>
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2" style={{ borderColor: colors.accent }}></div>
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2" style={{ borderColor: colors.accent }}></div>
        
        {/* Top accent line */}
        <div className="absolute top-0 left-0 w-full h-0.5" style={{ backgroundColor: `${colors.accent}20` }}></div>

        {showCloseButton && onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}

        {/* Success Content */}
        <div className="p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ backgroundColor: colors.light }}>
            <svg className="w-8 h-8" style={{ color: colors.accent }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Quote Request Submitted!</h3>
          <p className="text-gray-600 mb-6">
            Your quote request has been successfully submitted to our Zoho CRM system. Our engineering team will contact you within 24 hours with detailed pricing and specifications.
          </p>
          {lastResponse && lastResponse.zohoId && (
            <p className="text-xs text-gray-500 mb-4">
              Reference ID: {lastResponse.zohoId}
            </p>
          )}
          <div className="space-y-3">
            <button
              onClick={resetForm}
              className="w-full px-6 py-3 rounded-lg font-medium transition-all duration-200 border border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Submit Another Inquiry
            </button>
            {onClose && (
              <button
                onClick={onClose}
                className="w-full px-6 py-3 rounded-lg font-medium transition-all duration-200 text-white hover:opacity-90"
                style={{ backgroundColor: colors.accent }}
              >
                Continue Browsing
              </button>
            )}
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative rounded-xl border bg-white shadow-lg overflow-hidden ${className}`}
      style={{ borderColor: `${colors.accent}20` }}
    >
      {/* Engineering corner accents */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2" style={{ borderColor: colors.accent }}></div>
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2" style={{ borderColor: colors.accent }}></div>
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2" style={{ borderColor: colors.accent }}></div>
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2" style={{ borderColor: colors.accent }}></div>
      
      {/* Top accent line */}
      <div className="absolute top-0 left-0 w-full h-0.5" style={{ backgroundColor: `${colors.accent}20` }}></div>

      {showCloseButton && onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}

      {/* Header */}
      <div className="px-6 py-4 border-b" style={{ borderColor: `${colors.accent}15`, backgroundColor: colors.light }}>
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-600 mt-1">{subtitle}</p>
        {productName && (
          <p className="text-sm mt-2 px-3 py-1 rounded-md inline-block" style={{ backgroundColor: colors.medium, color: colors.accent }}>
            Product: {productName}
          </p>
        )}
        
        {/* Zoho CRM Status */}
        <div className="mt-3 flex items-center space-x-2 text-xs">
          {isAuthenticated === true && (
            <div className="flex items-center text-green-600">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Connected to Zoho CRM
            </div>
          )}
          {isAuthenticated === false && (
            <div className="flex items-center text-orange-600">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              Admin authentication required
            </div>
          )}
        </div>
      </div>

      {/* Form */}
      <div className="p-6">
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-6"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200"
              style={{ '--focus-ring-color': colors.accent } as React.CSSProperties}
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200"
              style={{ '--focus-ring-color': colors.accent } as React.CSSProperties}
              placeholder="Enter your email address"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200"
              style={{ '--focus-ring-color': colors.accent } as React.CSSProperties}
              placeholder="Enter your phone number"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
              Descriptions *
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 resize-none"
              style={{ '--focus-ring-color': colors.accent } as React.CSSProperties}
              placeholder="Please describe your requirements or questions"
            />
          </div>

          <motion.button
            type="submit"
            disabled={isLoading}
            whileHover={{ scale: isLoading ? 1 : 1.02 }}
            whileTap={{ scale: isLoading ? 1 : 0.98 }}
            className={`w-full px-6 py-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
              isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:opacity-90'
            }`}
            style={{ 
              backgroundColor: colors.accent,
              color: 'white'
            }}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Submitting to Zoho CRM...</span>
              </>
            ) : needsAuth ? (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>Authenticate Zoho CRM</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                <span>Submit Quote Request</span>
              </>
            )}
          </motion.button>
        </form>

        {/* Trust Indicators */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="grid grid-cols-4 gap-3 text-center text-sm">
            <div>
              <div className="font-semibold text-gray-900">24h</div>
              <div className="text-gray-600 text-xs">Response Time</div>
            </div>
            <div>
              <div className="font-semibold text-gray-900">700+</div>
              <div className="text-gray-600 text-xs">Projects Delivered</div>
            </div>
            <div>
              <div className="font-semibold text-gray-900">ISO</div>
              <div className="text-gray-600 text-xs">9001:2015 Certified</div>
            </div>
            <div>
              <div className="font-semibold text-gray-900">CRM</div>
              <div className="text-gray-600 text-xs">Zoho Integrated</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ZohoCRMForm; 