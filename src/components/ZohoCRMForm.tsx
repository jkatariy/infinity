'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import ReCaptcha from './ReCaptchaUltimate';

interface ZohoCRMFormProps {
  productName?: string;
  productUrl?: string;
  leadSource?: string;
  title?: string;
  subtitle?: string;
  availableModels?: ReadonlyArray<{
    readonly name: string;
    readonly title: string;
    readonly href: string;
    readonly image: string;
  }>; // Accepts readonly arrays from ProductDetailPage
  currentCategory?: string;
  colors?: {
    accent: string;
    light: string;
    medium: string;
  };
  showCloseButton?: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const ZohoCRMForm: React.FC<ZohoCRMFormProps> = ({ 
  productName, 
  productUrl, 
  leadSource = 'Website',
  title = 'Request Quote',
  subtitle = 'Get detailed information about our products',
  availableModels,
  currentCategory,
  colors = {
    accent: '#4F46E5',
    light: '#EEF2FF',
    medium: '#E0E7FF'
  },
  showCloseButton = true,
  onClose,
  onSuccess 
}) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [recaptchaError, setRecaptchaError] = useState(false);
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRecaptchaVerify = (token: string | null) => {
    setRecaptchaToken(token);
    setRecaptchaError(false);
  };

  const handleRecaptchaLoad = () => {
    setRecaptchaLoaded(true);
  };

  // Check if current time is within Zoho CRM hours (9 AM - 10 AM IST)
  const isZohoCRMHours = () => {
    const now = new Date();
    const istTime = new Date(now.getTime() + (5.5 * 60 * 60 * 1000)); // Convert to IST
    const hour = istTime.getHours();
    return hour >= 9 && hour < 10;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic form validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage('Please fill in all required fields');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMessage('Please enter a valid email address');
      return;
    }

    // Check if reCAPTCHA is completed (only if it's loaded)
    if (recaptchaLoaded && !recaptchaToken) {
      setRecaptchaError(true);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');
    setRecaptchaError(false);

    try {
      // Verify reCAPTCHA token (only if we have a token)
      if (recaptchaToken) {
        const recaptchaResponse = await fetch('/api/verify-recaptcha', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token: recaptchaToken }),
        });

        const recaptchaResult = await recaptchaResponse.json();
        
        if (!recaptchaResult.success) {
          throw new Error('reCAPTCHA verification failed');
        }
      }
      const formDataToSend = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        productName: productName,
        productUrl: productUrl,
        leadSource: leadSource,
        submittedAt: new Date().toISOString()
      };

      let response;
      
      if (isZohoCRMHours()) {
        // Send directly to Zoho CRM (9 AM - 10 AM IST)
        response = await fetch('/api/sendToZoho', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formDataToSend),
        });
      } else {
        // Store in Supabase for later processing (10 AM - 9 AM IST)
        response = await fetch('/api/store-lead', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...formDataToSend,
            source: 'quote_form',
            status: 'pending_zoho_sync'
          }),
        });
      }

      const result = await response.json();

      if (result.success) {
        setSubmitStatus('success');
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: ''
        });
        setRecaptchaToken(null);
        // Close modal after 2 seconds
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        setSubmitStatus('error');
        setErrorMessage(result.error || 'Failed to submit request');
      }
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        className="bg-white rounded-lg shadow-xl max-w-md w-full p-6"
        onClick={(e) => e.stopPropagation()}
        style={{ borderColor: colors.accent }}
      >
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {title}
            </h2>
            {subtitle && (
              <p className="text-sm text-gray-600 mt-1">
                {subtitle}
              </p>
            )}
          </div>
          {showCloseButton && (
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {productName && (
          <div className="mb-4 p-3 rounded-md" style={{ backgroundColor: colors.light }}>
            <p className="text-sm" style={{ color: colors.accent }}>
              <strong>Product:</strong> {productName}
            </p>
          </div>
        )}

        {/* Available Models Section */}
        {availableModels && availableModels.length > 0 && (
          <div className="mb-4 p-3 rounded-md" style={{ backgroundColor: colors.light }}>
            <p className="text-sm font-medium mb-2" style={{ color: colors.accent }}>
              Available Models in {currentCategory || 'this category'}:
            </p>
            <div className="grid grid-cols-2 gap-2">
              {availableModels.slice(0, 4).map((model, index) => (
                <div key={index} className="text-xs p-2 rounded bg-white" style={{ color: colors.accent }}>
                  {model.name}
                </div>
              ))}
              {availableModels.length > 4 && (
                <div className="text-xs p-2 rounded bg-white text-gray-500">
                  +{availableModels.length - 4} more
                </div>
              )}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="First Last"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your email address"
              />
            </div>
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your phone number"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Tell us about your requirements..."
            />
          </div>

          {/* reCAPTCHA */}
          <div className="mt-4">
                          <ReCaptcha onVerify={handleRecaptchaVerify} onLoad={handleRecaptchaLoad} />
            {recaptchaError && (
              <p className="text-red-600 text-sm mt-2 text-center">
                Please complete the reCAPTCHA verification
              </p>
            )}
          </div>

          {submitStatus === 'success' && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-md">
              <p className="text-sm text-green-800">
                ✅ Your quote request has been submitted successfully! We'll get back to you soon.
              </p>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-800">
                ❌ {errorMessage}
              </p>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 text-white rounded-md transition-colors disabled:opacity-50"
              style={{ backgroundColor: colors.accent }}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Quote Request'}
            </button>
          </div>
        </form>

        <div className="mt-4 p-3 rounded-md" style={{ backgroundColor: colors.light }}>
          <p className="text-xs" style={{ color: colors.accent }}>
            Your information will be processed and sent to our team. We'll contact you within 24 hours.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ZohoCRMForm; 