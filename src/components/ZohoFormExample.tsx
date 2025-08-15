'use client';

import { useState } from 'react';
import { useContactForm } from '@/hooks/useZohoIntegration';

// Example component showing how to integrate Zoho CRM with your forms
export default function ZohoFormExample() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    productInterest: '',
  });

  const { 
    submitToZoho, 
    isLoading, 
    isAuthenticated, 
    needsAuth, 
    initiateAuth,
    lastResponse 
  } = useContactForm({
    onSuccess: (response) => {
      console.log('Success! Zoho ID:', response.zohoId);
      alert('Thank you! Your inquiry has been submitted successfully.');
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        message: '',
        productInterest: '',
      });
    },
    onError: (error) => {
      console.error('Submission error:', error);
      alert('Sorry, there was an error submitting your form. Please try again.');
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if we need authentication first
    if (needsAuth) {
      alert('Admin authentication required. Redirecting to Zoho...');
      initiateAuth();
      return;
    }

    // Submit to Zoho CRM
    await submitToZoho(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Contact Us</h2>
      
      {/* Authentication Status */}
      <div className="mb-4 p-3 rounded-lg">
        {isAuthenticated === null && (
          <div className="text-gray-600">Checking Zoho connection...</div>
        )}
        {isAuthenticated === true && (
          <div className="text-green-600 bg-green-50 p-2 rounded">✅ Connected to Zoho CRM</div>
        )}
        {isAuthenticated === false && (
          <div className="text-orange-600 bg-orange-50 p-2 rounded">
            ⚠️ Zoho authentication required for admin
            <button 
              onClick={initiateAuth}
              className="ml-2 text-blue-600 underline"
            >
              Connect Now
            </button>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Name *
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Company
          </label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Product Interest
          </label>
          <select
            name="productInterest"
            value={formData.productInterest}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a product...</option>
            <option value="Cartoning Machines">Cartoning Machines</option>
            <option value="Case Packers">Case Packers</option>
            <option value="Bundling & Wrapping">Bundling & Wrapping</option>
            <option value="Checkweighers">Checkweighers</option>
            <option value="Conveying Systems">Conveying Systems</option>
            <option value="Complete Line Solution">Complete Line Solution</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Message
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Tell us about your packaging automation needs..."
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Submitting...' : 'Submit Inquiry'}
        </button>
      </form>

      {/* Response Display */}
      {lastResponse && (
        <div className={`mt-4 p-3 rounded-lg ${
          lastResponse.success 
            ? 'bg-green-50 text-green-800' 
            : 'bg-red-50 text-red-800'
        }`}>
          <p className="font-medium">
            {lastResponse.success ? '✅ Success!' : '❌ Error'}
          </p>
          <p className="text-sm">{lastResponse.message}</p>
          {lastResponse.zohoId && (
            <p className="text-xs mt-1">Zoho ID: {lastResponse.zohoId}</p>
          )}
        </div>
      )}
    </div>
  );
}
