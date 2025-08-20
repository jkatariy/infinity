'use client';

import { motion } from 'framer-motion';
import { 
  ShareIcon, 
  ChatBubbleLeftRightIcon, 
  PhoneIcon, 
  EnvelopeIcon,
  MapPinIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import ZohoCRMForm from './ZohoCRMForm';
import { useState } from 'react';

interface RequestQuoteProps {
  productName: string;
  productUrl?: string;
}

const RequestQuote: React.FC<RequestQuoteProps> = ({ productName, productUrl }) => {
  const [showQuoteModal, setShowQuoteModal] = useState(false);

  const handleShareProduct = () => {
    if (productUrl) {
      // Use Web Share API if available
      if (navigator.share) {
        navigator.share({
          title: `${productName} - Infinity Automated Solutions`,
          text: `Check out this ${productName} from Infinity Automated Solutions`,
          url: productUrl,
        });
      } else {
        // Fallback to copying to clipboard
        navigator.clipboard.writeText(productUrl);
        alert('Product URL copied to clipboard!');
      }
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Left side - Product info and CTA */}
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Interested in {productName}?
            </h3>
            <p className="text-gray-600 mb-4">
              Get a detailed quote, technical specifications, and expert consultation from our engineering team.
            </p>
            
            {/* Trust indicators */}
            <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
              <div className="flex items-center gap-1">
                <ClockIcon className="w-4 h-4" />
                <span>24h Response</span>
              </div>
              <div className="flex items-center gap-1">
                <PhoneIcon className="w-4 h-4" />
                <span>Expert Support</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPinIcon className="w-4 h-4" />
                <span>India-wide Service</span>
              </div>
            </div>
          </div>

          {/* Right side - Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => setShowQuoteModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              <ChatBubbleLeftRightIcon className="w-5 h-5" />
              Request Quote
            </button>
            
            {productUrl && (
              <button
                onClick={handleShareProduct}
                className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                <ShareIcon className="w-5 h-5" />
                Share
              </button>
            )}
          </div>
        </div>

        {/* Additional info */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <div className="font-semibold text-gray-900">700+</div>
              <div className="text-gray-600">Projects Delivered</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-gray-900">ISO</div>
              <div className="text-gray-600">9001:2015 Certified</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-gray-900">15+</div>
              <div className="text-gray-600">Years Experience</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quote Modal */}
      {showQuoteModal && (
        <ZohoCRMForm
          productName={productName}
          productUrl={productUrl}
          leadSource="Product Quote Request"
          title="Request Product Quote"
          subtitle="Get detailed pricing and specifications for this product"
          colors={{
            accent: '#2563EB',
            light: '#DBEAFE',
            medium: '#BFDBFE'
          }}
          showCloseButton={true}
          onClose={() => setShowQuoteModal(false)}
          onSuccess={() => setShowQuoteModal(false)}
        />
      )}
    </>
  );
};

export default RequestQuote; 