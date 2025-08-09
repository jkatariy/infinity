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
          text: `Check out this product: ${productName}`,
          url: productUrl,
        }).catch(err => {
          // Fallback to copy to clipboard
          navigator.clipboard.writeText(productUrl);
        });
      } else {
        // Fallback to copy to clipboard
        navigator.clipboard.writeText(productUrl);
      }
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl shadow-xl border border-blue-200 overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-2">Get Started Today</h3>
            <p className="text-blue-100">Contact our engineering experts for customized solutions</p>
          </div>
        </div>

        <div className="p-8">
          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <motion.button
              onClick={() => setShowQuoteModal(true)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center space-x-3 p-6 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <ChatBubbleLeftRightIcon className="h-6 w-6" />
              <span className="font-semibold">Request Quote</span>
            </motion.button>

            <motion.button
              onClick={handleShareProduct}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center space-x-3 p-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <ShareIcon className="h-6 w-6" />
              <span className="font-semibold">Share Product</span>
            </motion.button>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-gray-900 mb-4">Contact Information</h4>
              
              <div className="flex items-center space-x-3 text-gray-700">
                <PhoneIcon className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-sm">+91 20-67183300</p>
                  <p className="text-sm">+91 8484922042 (WhatsApp)</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 text-gray-700">
                <EnvelopeIcon className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-sm">info@infinitysols.com</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-bold text-gray-900 mb-4">Our Location</h4>
              
              <div className="flex items-start space-x-3 text-gray-700">
                <MapPinIcon className="h-5 w-5 text-blue-600 mt-1" />
                <div>
                  <p className="font-medium">Address</p>
                  <p className="text-sm">Plot No - 7 & 16, S.No-1556/1559</p>
                  <p className="text-sm">Shelarwasti, Dehu-Alandi Road</p>
                  <p className="text-sm">Chikhali, Tal-Haveli, Pune-412114</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 text-gray-700">
                <ClockIcon className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium">Business Hours</p>
                  <p className="text-sm">Mon - Fri: 9:00 AM - 6:00 PM IST</p>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-8 pt-6 border-t border-blue-200">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="text-brand-blue-500">
                <p className="text-2xl font-bold">10+</p>
                <p className="text-xs">Years Experience</p>
              </div>
              <div className="text-brand-blue-500">
                <p className="text-2xl font-bold">700+</p>
                <p className="text-xs">Projects Completed</p>
              </div>
              <div className="text-brand-blue-500">
                <p className="text-2xl font-bold">400+</p>
                <p className="text-xs">Satisfied Clients</p>
              </div>
              <div className="text-brand-blue-500">
                <p className="text-2xl font-bold">ISO</p>
                <p className="text-xs">9001:2015 Certified</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quote Form Modal */}
      {showQuoteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <ZohoCRMForm
              productName={productName}
              leadSource="Product Request Quote"
              title="Request Product Quote"
              subtitle="Get detailed pricing and specifications for your requirements"
              colors={{
                accent: '#4F46E5',
                light: '#EEF2FF',
                medium: '#E0E7FF'
              }}
              showCloseButton={true}
              onClose={() => setShowQuoteModal(false)}
              onSuccess={() => setShowQuoteModal(false)}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default RequestQuote; 