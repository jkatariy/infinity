'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ZohoCRMForm from './ZohoCRMForm';

interface ShareProductProps {
  title: string;
  description: string;
  url: string;
  colors: {
    accent: string;
    light: string;
    medium: string;
  };
  hideQuoteButton?: boolean;
}

const ShareProduct: React.FC<ShareProductProps> = ({ title, description, url, colors, hideQuoteButton = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [showShareForm, setShowShareForm] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside, { passive: true });
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const shareData = {
    title: `${title} - Infinity Automated Solutions`,
    text: description,
    url: typeof window !== 'undefined' ? window.location.href : url,
  };

  const shareLinks = [
    {
      name: 'LinkedIn',
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareData.url)}`,
      color: '#0077B5'
    },
    {
      name: 'Twitter',
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
      ),
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareData.title)}&url=${encodeURIComponent(shareData.url)}`,
      color: '#1DA1F2'
    },
    {
      name: 'Facebook',
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareData.url)}`,
      color: '#1877F2'
    },
    {
      name: 'WhatsApp',
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
        </svg>
      ),
      url: `https://wa.me/?text=${encodeURIComponent(`${shareData.title} - ${shareData.url}`)}`,
      color: '#25D366'
    },
    {
      name: 'Email',
      icon: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      url: `mailto:?subject=${encodeURIComponent(shareData.title)}&body=${encodeURIComponent(`Check out this product: ${shareData.title}\n\n${shareData.text}\n\nView details: ${shareData.url}`)}`,
      color: '#6B7280'
    }
  ];

  const handleShare = async (platform?: string, url?: string) => {
    if (platform && url) {
      // Open specific platform
      window.open(url, '_blank', 'width=600,height=400');
      setIsOpen(false);
      return;
    }

    // Show share form instead of native share or dropdown
    setShowShareForm(true);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareData.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = shareData.url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <>
      <div className="space-y-4">
        {/* Get Detailed Quote Button - Only show if not hidden */}
        {!hideQuoteButton && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowQuoteModal(true)}
            className="relative overflow-hidden rounded-lg border border-gray-200 bg-white px-6 py-4 font-medium text-gray-900 shadow-sm transition-all duration-300 hover:border-gray-300 hover:bg-gray-50 hover:shadow-md w-full"
          >
            <div className="absolute inset-0 bg-gray-100 opacity-0 transition-opacity duration-300 hover:opacity-50"></div>
            <div className="relative flex items-center justify-center space-x-2">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Get Detailed Quote</span>
            </div>
          </motion.button>
        )}

        {/* Share Button */}
        <div className="relative" ref={dropdownRef}>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleShare()}
            className="relative overflow-hidden rounded-lg border border-gray-200 bg-white px-6 py-4 font-medium text-gray-900 shadow-sm transition-all duration-300 hover:border-gray-300 hover:bg-gray-50 hover:shadow-md w-full"
          >
            <div className="absolute inset-0 bg-gray-100 opacity-0 transition-opacity duration-300 hover:opacity-50"></div>
            <div className="relative flex items-center justify-center space-x-2">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </svg>
              <span>Share Product</span>
            </div>
          </motion.button>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 top-full mt-2 w-72 z-50"
              >
                <div 
                  className="relative rounded-xl border bg-white shadow-lg overflow-hidden"
                  style={{ borderColor: `${colors.accent}20` }}
                >
                  {/* Engineering corner accents */}
                  <div 
                    className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2"
                    style={{ borderColor: colors.accent }}
                  ></div>
                  <div 
                    className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2"
                    style={{ borderColor: colors.accent }}
                  ></div>
                  <div 
                    className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2"
                    style={{ borderColor: colors.accent }}
                  ></div>
                  <div 
                    className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2"
                    style={{ borderColor: colors.accent }}
                  ></div>
                  
                  {/* Top accent line */}
                  <div 
                    className="absolute top-0 left-0 w-full h-0.5"
                    style={{ backgroundColor: `${colors.accent}20` }}
                  ></div>

                  {/* Header */}
                  <div 
                    className="px-4 py-3 border-b"
                    style={{ 
                      borderColor: `${colors.accent}15`,
                      backgroundColor: colors.light 
                    }}
                  >
                    <h3 className="text-sm font-semibold text-gray-900">Share this product</h3>
                  </div>

                  {/* Share Options */}
                  <div className="p-4 space-y-3">
                    {/* Copy Link */}
                    <button
                      onClick={copyToClipboard}
                      className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 group"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                          <svg className="h-4 w-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                          </svg>
                        </div>
                        <span className="text-sm font-medium text-gray-900">Copy Link</span>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded ${copied ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'} transition-colors duration-200`}>
                        {copied ? 'Copied!' : 'Copy'}
                      </span>
                    </button>

                    {/* Divider */}
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200"></div>
                      </div>
                      <div className="relative flex justify-center">
                        <span className="px-2 bg-white text-xs text-gray-500">or share via</span>
                      </div>
                    </div>

                    {/* Platform Buttons */}
                    <div className="grid grid-cols-2 gap-2">
                      {shareLinks.map((platform) => (
                        <button
                          key={platform.name}
                          onClick={() => handleShare(platform.name, platform.url)}
                          className="flex items-center space-x-2 p-3 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 group"
                        >
                          <div 
                            className="w-6 h-6 rounded flex items-center justify-center"
                            style={{ backgroundColor: `${platform.color}15` }}
                          >
                            <div style={{ color: platform.color }}>
                              {platform.icon}
                            </div>
                          </div>
                          <span className="text-sm font-medium text-gray-900">{platform.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Quote Form Modal - Only show if quote button is not hidden */}
      {!hideQuoteButton && showQuoteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <ZohoCRMForm
              productName={title}
              leadSource="Product Page Share"
              title="Request Product Information"
              subtitle="Get detailed specifications, pricing, and delivery information"
              colors={colors}
              showCloseButton={true}
              onClose={() => setShowQuoteModal(false)}
              onSuccess={() => setShowQuoteModal(false)}
            />
          </div>
        </div>
      )}

      {/* Share Form Modal */}
      {showShareForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <ZohoCRMForm
                productName={title}
                leadSource="Product Share Request"
                title="Share Product Information"
                subtitle="Get detailed product information sent to your email"
                colors={colors}
                showCloseButton={true}
                onClose={() => setShowShareForm(false)}
                onSuccess={() => setShowShareForm(false)}
              />
              
              {/* Alternative Share Options */}
              <div className="mt-6 pb-4 text-center">
                <button
                  onClick={() => {
                    setShowShareForm(false);
                    setIsOpen(true);
                  }}
                  className="text-sm text-gray-500 hover:text-gray-700 hover:underline transition-colors duration-200 px-4 py-2 rounded-lg bg-gray-50 hover:bg-gray-100"
                >
                  Or share directly on social media
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ShareProduct; 