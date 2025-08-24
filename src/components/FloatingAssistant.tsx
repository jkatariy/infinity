'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { BRAND_COLORS } from '@/lib/theme';

type CategoryKey =
  | 'bundling-wrapping'
  | 'pouch-baler'
  | 'cartoning'
  | 'case-packers'
  | 'checkweighers-inspection'
  | 'conveying';

type ModelLink = { name: string; href: string; label: string };

const categories: { id: CategoryKey; name: string }[] = [
  { id: 'bundling-wrapping', name: 'Bundling & Wrapping' },
  { id: 'pouch-baler', name: 'Pouch Baler & Bagging' },
  { id: 'cartoning', name: 'Cartoning' },
  { id: 'case-packers', name: 'Case Packers' },
  { id: 'checkweighers-inspection', name: 'Checkweighers & Inspection' },
  { id: 'conveying', name: 'Conveying' },
];

// Exact models from the ExploreByIndustry component
const models: Record<CategoryKey, ModelLink[]> = {
  'bundling-wrapping': [
    { name: 'IBP-120', href: '/products/bundling-wrapping/ibp-120', label: 'IBP-120 – High Speed Bundler' },
    { name: 'IBS-200', href: '/products/bundling-wrapping/ibs-200', label: 'IBS-200 – Strip Packaging Machine' },
    { name: 'IMS-800', href: '/products/bundling-wrapping/ims-800', label: 'IMS-800/600 – Multitrack VFFS Integration' },
    { name: 'ISP-120', href: '/products/bundling-wrapping/isp-120', label: 'ISP-120 – Shrink Wrapping for Pouches' },
    { name: 'IWB-200', href: '/products/bundling-wrapping/iwb-200', label: 'IWB-200 – Shrink Wrapping for Bottles' },
    { name: 'ISB-120', href: '/products/bundling-wrapping/isb-120', label: 'ISB-120 – Shrink Wrapping for Bottles' },
  ],
  'pouch-baler': [
    { name: 'IBG-H8-V8', href: '/products/pouch-baler/ibg-h8-v8', label: 'IBG-H8-V8 – Combined Bagging Machines' },
    { name: 'IBL-500', href: '/products/pouch-baler/ibl-500', label: 'IBL-500 – Automatic Baler' },
    { name: 'IBG-8', href: '/products/pouch-baler/ibg-8', label: 'IBG-8 – Bagging Machine' },
  ],
  'cartoning': [
    { name: 'ACM-100', href: '/products/cartoning/acm-100', label: 'ACM-100 – Automatic Cartoning Machine' },
    { name: 'ACM-40', href: '/products/cartoning/acm-40', label: 'ACM-40 – Semi-Automatic Cartoning Machine' },
  ],
  'case-packers': [
    { name: 'ICP-120', href: '/products/case-packers/icp-120', label: 'ICP-120 – Robotic Case Packer for Pouches' },
    { name: 'ICS-200', href: '/products/case-packers/ics-200', label: 'ICS-200 – Case Packer for Strip of Pouches' },
    { name: 'ICB-120', href: '/products/case-packers/icb-120', label: 'ICB-120 – Case Packer for Bottles' },
    { name: 'Case Sealer', href: '/products/case-packers/case-sealer', label: 'Case Sealer' },
    { name: 'Case Erector', href: '/products/case-packers/case-erector', label: 'Case Erector' },
  ],
  'checkweighers-inspection': [
    { name: 'ICW-600', href: '/products/checkweighers-inspection', label: 'ICW-600 – Light Duty Checkweigher' },
    { name: 'ICW-1200', href: '/products/checkweighers-inspection', label: 'ICW-1200 – Standard Checkweigher' },
    { name: 'ICW-6000', href: '/products/checkweighers-inspection', label: 'ICW-6000 – Heavy Duty Checkweigher' },
    { name: 'ICW-25K', href: '/products/checkweighers-inspection', label: 'ICW-25K – Industrial Checkweigher' },
    { name: 'ICW-50K', href: '/products/checkweighers-inspection', label: 'ICW-50K – Extra Heavy Checkweigher' },
    { name: 'Vision Pro', href: '/products/checkweighers-inspection', label: 'Vision Pro – Advanced Vision System' },
    { name: 'Vision Compact', href: '/products/checkweighers-inspection', label: 'Vision Compact – Compact Vision System' },
  ],
  'conveying': [
    { name: 'CVM-100', href: '/products/conveying/cvm-100', label: 'CVM-100 Belt Conveyor' },
    { name: 'CVM-200', href: '/products/conveying/cvm-200', label: 'CVM-200 Chain Conveyor' },
    { name: 'CVM-300', href: '/products/conveying/cvm-300', label: 'CVM-300 Screw Conveyor' },
  ],
};

export default function FloatingAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState<'welcome' | 'contact' | 'category' | 'model' | 'submitted'>('welcome');
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey | null>(null);
  const [selectedModel, setSelectedModel] = useState<ModelLink | null>(null);
  const [contactInfo, setContactInfo] = useState({ company: '', phone: '', email: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const chatRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new content is added
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [currentStep, selectedCategory, selectedModel, contactInfo]);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('/api/leads/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: contactInfo.company, // Using company name as the name field
          email: contactInfo.email,
          phone: contactInfo.phone,
          description: `Chatbot inquiry for ${selectedModel?.label || selectedCategory} from ${contactInfo.company}.`,
          industry: selectedCategory,
          category: selectedCategory,
          model_name: selectedModel?.name,
          model_label: selectedModel?.label
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus('success');
        setCurrentStep('submitted');
      } else {
        setSubmitStatus('error');
        setErrorMessage(result.error || 'Failed to submit inquiry');
      }
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCategorySelect = (category: CategoryKey) => {
    setSelectedCategory(category);
    setCurrentStep('model');
  };

  const handleModelSelect = (model: ModelLink) => {
    setSelectedModel(model);
    setCurrentStep('contact');
  };

  const handleBack = () => {
    switch (currentStep) {
      case 'category':
        setCurrentStep('welcome');
        break;
      case 'model':
        setCurrentStep('category');
        setSelectedCategory(null);
        break;
      case 'contact':
        setCurrentStep('model');
        setSelectedModel(null);
        break;
    }
  };

  const handleReset = () => {
    setCurrentStep('welcome');
    setSelectedCategory(null);
    setSelectedModel(null);
    setContactInfo({ company: '', phone: '', email: '' });
    setSubmitStatus('idle');
    setErrorMessage('');
  };

  const handleShowPage = () => {
    if (selectedModel) {
      window.open(selectedModel.href, '_blank');
    }
  };

  const handleWatchDemo = () => {
    // You can customize this to show a demo video or redirect to a demo page
    window.open('/contact', '_blank');
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </button>

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-end p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md h-96 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <h3 className="font-semibold text-gray-900">AI Assistant</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Chat Content */}
            <div ref={chatRef} className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Welcome Message */}
              {currentStep === 'welcome' && (
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-blue-900 font-medium">👋 Hello! I'm your AI assistant.</p>
                    <p className="text-blue-800 text-sm mt-1">I can help you find the perfect automation solution for your needs.</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-gray-700">Let's start by getting your contact information:</p>
                    <form onSubmit={(e) => { e.preventDefault(); setCurrentStep('category'); }} className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Company Name *</label>
                        <input
                          type="text"
                          required
                          value={contactInfo.company}
                          onChange={(e) => setContactInfo(prev => ({ ...prev, company: e.target.value }))}
                          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter your company name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                        <input
                          type="tel"
                          required
                          value={contactInfo.phone}
                          onChange={(e) => setContactInfo(prev => ({ ...prev, phone: e.target.value }))}
                          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter your phone number"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email ID *</label>
                        <input
                          type="email"
                          required
                          value={contactInfo.email}
                          onChange={(e) => setContactInfo(prev => ({ ...prev, email: e.target.value }))}
                          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter your email"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                      >
                        Continue
                      </button>
                    </form>
                  </div>
                </div>
              )}

              {/* Category Selection */}
              {currentStep === 'category' && (
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-blue-900 font-medium">Great! Now select a solution category:</p>
                    <button
                      onClick={handleBack}
                      className="text-blue-700 text-sm hover:underline mt-2"
                    >
                      ← Back to contact info
                    </button>
                  </div>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => handleCategorySelect(category.id)}
                        className="text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors w-full"
                      >
                        <span className="font-medium text-gray-900">{category.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Model Selection */}
              {currentStep === 'model' && selectedCategory && (
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-blue-900 font-medium">Perfect! Now select a specific model:</p>
                    <p className="text-blue-800 text-sm mt-1">Category: {categories.find(c => c.id === selectedCategory)?.name}</p>
                    <button
                      onClick={handleBack}
                      className="text-blue-700 text-sm hover:underline mt-2"
                    >
                      ← Back to categories
                    </button>
                  </div>
                  <div className="space-y-2">
                    {models[selectedCategory].map((model) => (
                      <button
                        key={model.name}
                        onClick={() => handleModelSelect(model)}
                        className="text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors w-full"
                      >
                        <div className="font-medium text-gray-900">{model.name}</div>
                        <div className="text-sm text-gray-600">{model.label}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Contact Form */}
              {currentStep === 'contact' && (
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-blue-900 font-medium">Almost done! Please confirm your details:</p>
                    <p className="text-blue-800 text-sm mt-1">Model: {selectedModel?.label}</p>
                    <button
                      onClick={handleBack}
                      className="text-blue-700 text-sm hover:underline mt-2"
                    >
                      ← Back to models
                    </button>
                  </div>

                  {submitStatus === 'error' && (
                    <div className="bg-red-50 p-4 rounded-lg">
                      <p className="text-red-800 font-medium">❌ Error</p>
                      <p className="text-red-700 text-sm mt-1">{errorMessage}</p>
                    </div>
                  )}

                  <div className="space-y-3">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-600">Company: <span className="font-medium text-gray-900">{contactInfo.company}</span></p>
                      <p className="text-sm text-gray-600">Phone: <span className="font-medium text-gray-900">{contactInfo.phone}</span></p>
                      <p className="text-sm text-gray-600">Email: <span className="font-medium text-gray-900">{contactInfo.email}</span></p>
                    </div>
                    <button
                      onClick={handleContactSubmit}
                      disabled={isSubmitting}
                      className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-blue-400 transition-colors"
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
                    </button>
                  </div>
                </div>
              )}

              {/* Submitted Success */}
              {currentStep === 'submitted' && (
                <div className="space-y-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-green-800 font-medium">✅ Thank you!</p>
                    <p className="text-green-700 text-sm mt-1">Your data has been sent successfully. Our team will contact you within 24 hours with detailed information about {selectedModel?.label}.</p>
                  </div>
                  
                  <div className="space-y-3">
                    <button
                      onClick={handleShowPage}
                      className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Show Page
                    </button>
                    <button
                      onClick={handleWatchDemo}
                      className="w-full bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors"
                    >
                      Watch Demo
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>Powered by Infinity Automated Solutions</span>
                <button
                  onClick={handleReset}
                  className="text-blue-600 hover:text-blue-700 hover:underline"
                >
                  Start Over
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}


