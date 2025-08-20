'use client';

import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const productCategories = {
  'bundling-wrapping': {
    title: 'Bundling & Wrapping Solutions',
    models: [
      { name: 'IBP-120 High Speed Bundler', href: '/products/bundling-wrapping/ibp-120', shortName: 'IBP-120' },
      { name: 'IBS-200 Strip Packaging Machine', href: '/products/bundling-wrapping/ibs-200', shortName: 'IBS-200' },
      { name: 'ISP-120 Shrink Wrapping for Pouches', href: '/products/bundling-wrapping/isp-120', shortName: 'ISP-120' },
      { name: 'IMS-800/600 Multitrack VFFS Integration', href: '/products/bundling-wrapping/ims-800', shortName: 'IMS-800/600' },
      { name: 'IWB-200 Shrink Wrapping for Bottles', href: '/products/bundling-wrapping/iwb-200', shortName: 'IWB-200' },
      { name: 'ISB-120 Shrink Wrapping for Bottles', href: '/products/bundling-wrapping/isb-120', shortName: 'ISB-120' }
    ]
  },
  'pouch-baler': {
    title: 'Pouch Baler Systems',
    models: [
      { name: 'IBL-500 Automatic Baler', href: '/products/pouch-baler/ibl-500', shortName: 'IBL-500' },
      { name: 'IBG-H8 & IBG-V8 Bagging Machines', href: '/products/pouch-baler/ibg-h8-v8', shortName: 'IBG-H8/V8' }
    ]
  },
  'cartoning': {
    title: 'Cartoning Machines',
    models: [
      { name: 'ACM-100 Automatic Cartoning Machine', href: '/products/cartoning/acm-100', shortName: 'ACM-100' },
      { name: 'ACM-40 Semi-Automatic Cartoning Machine', href: '/products/cartoning/acm-40', shortName: 'ACM-40' }
    ]
  },
  'case-packers': {
    title: 'Case Packers',
    models: [
      { name: 'ICP-120 Robotic Case Packer for Pouches', href: '/products/case-packers/icp-120', shortName: 'ICP-120' },
      { name: 'ICS-200 Case Packer for Strip of Pouches', href: '/products/case-packers/ics-200', shortName: 'ICS-200' },
      { name: 'ICB-120 Case Packer for Bottles', href: '/products/case-packers/icb-120', shortName: 'ICB-120' },
      { name: 'Case Erector', href: '/products/case-packers/case-erector', shortName: 'Case Erector' },
      { name: 'Case Sealer', href: '/products/case-packers/case-sealer', shortName: 'Case Sealer' }
    ]
  },
  'checkweighers-inspection': {
    title: 'Checkweighers & Inspection Systems',
    models: [
      { name: 'ICW-600 Light Duty Checkweigher', href: '/products/checkweighers-inspection', shortName: 'ICW-600' },
      { name: 'ICW-1200 Standard Checkweigher', href: '/products/checkweighers-inspection', shortName: 'ICW-1200' },
      { name: 'ICW-6000 Heavy Duty Checkweigher', href: '/products/checkweighers-inspection', shortName: 'ICW-6000' },
      { name: 'ICW-25K Industrial Checkweigher', href: '/products/checkweighers-inspection', shortName: 'ICW-25K' },
      { name: 'ICW-50K Extra Heavy Checkweigher', href: '/products/checkweighers-inspection', shortName: 'ICW-50K' },
      { name: 'Vision Pro Standard', href: '/products/checkweighers-inspection', shortName: 'Vision Pro' },
      { name: 'Vision Compact', href: '/products/checkweighers-inspection', shortName: 'Vision Compact' }
    ]
  },
  'conveying': {
    title: 'Conveying Solutions',
    models: [
      { name: 'Flat Belt Conveyor', href: '/products/conveying', shortName: 'Flat Belt' },
      { name: 'Modular Conveyor', href: '/products/conveying', shortName: 'Modular' },
      { name: 'Roller Conveyor', href: '/products/conveying', shortName: 'Roller' },
      { name: 'Compression Conveyor', href: '/products/conveying', shortName: 'Compression' },
      { name: 'Z Type Bucket Elevator', href: '/products/conveying', shortName: 'Z-Bucket' },
      { name: 'Crate Lifter', href: '/products/conveying', shortName: 'Crate Lifter' },
      { name: 'Box Lifter', href: '/products/conveying', shortName: 'Box Lifter' },
      { name: 'Spiral Conveyor', href: '/products/conveying', shortName: 'Spiral' }
    ]
  }
};

interface ProductSelectorProps {
  currentProduct: string;
}

export default function ProductSelector({ currentProduct }: ProductSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const router = useRouter();
  const pathname = usePathname();

  // Find current category based on URL path
  const currentCategory = Object.entries(productCategories).find(([key, _]) => 
    pathname?.includes(`/products/${key}`)
  );

  // Check if we're on a specific model page
  const isModelPage = pathname ? pathname.split('/').length > 3 : false;

  const handleSelect = (href: string) => {
    setIsOpen(false);
    setExpandedCategories(new Set()); // Reset expanded state
    router.push(href);
  };

  const toggleCategory = (categoryKey: string, event: React.MouseEvent) => {
    event.stopPropagation();
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryKey)) {
      newExpanded.delete(categoryKey);
    } else {
      newExpanded.add(categoryKey);
    }
    setExpandedCategories(newExpanded);
  };

  const handleCategoryClick = (categoryKey: string, event: React.MouseEvent) => {
    // If category is already expanded, navigate to category page
    if (expandedCategories.has(categoryKey)) {
      handleSelect(`/products/${categoryKey}`);
    } else {
      // Otherwise, expand the category
      toggleCategory(categoryKey, event);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-between w-full text-4xl font-bold tracking-tight text-gray-900 group hover:text-gray-700 transition-colors duration-200"
      >
        <span>{currentProduct}</span>
        <motion.svg
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="w-8 h-8 ml-4 text-gray-400 group-hover:text-gray-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </motion.svg>
      </button>

      {/* Enhanced Hierarchical Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute z-50 w-full mt-2 bg-white rounded-lg shadow-xl border border-gray-200 min-w-[420px] max-h-[70vh] overflow-y-auto"
            >
              <div className="p-3">
                <div className="px-3 py-2 text-sm font-medium text-gray-500 mb-3 border-b border-gray-100">
                  Product Categories & Models
                </div>

                <div className="space-y-1">
                  {Object.entries(productCategories).map(([key, category]) => {
                    const isCategoryPage = pathname === `/products/${key}`;
                    const isExpanded = expandedCategories.has(key);
                    const hasCurrentModel = category.models.some(model => pathname === model.href);
                    
                    return (
                      <div key={key} className="space-y-1">
                        {/* Category Header */}
                        <div className="flex items-center">
                          <button
                            onClick={(e) => handleCategoryClick(key, e)}
                            className={`flex-1 text-left px-3 py-2.5 text-sm rounded-md transition-all duration-150 flex items-center justify-between group
                              ${isCategoryPage || hasCurrentModel
                                ? 'text-blue-700 font-semibold bg-blue-50 border border-blue-200' 
                                : 'text-gray-800 hover:bg-gray-50 hover:text-gray-900 font-medium'}`}
                          >
                            <span className="flex items-center">
                              {category.title}
                              <span className="ml-2 text-xs text-gray-500">
                                ({category.models.length} models)
                              </span>
                            </span>
                            
                            <div className="flex items-center space-x-2">
                              {(isCategoryPage || hasCurrentModel) && (
                                <span className="text-blue-500 text-xs">●</span>
                              )}
                              <motion.svg
                                animate={{ rotate: isExpanded ? 90 : 0 }}
                                transition={{ duration: 0.2 }}
                                className="w-4 h-4 text-gray-400 group-hover:text-gray-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </motion.svg>
                            </div>
                          </button>
                        </div>

                        {/* Expandable Models List */}
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="ml-4 border-l-2 border-gray-100 pl-3 space-y-1"
                            >
                              {/* Category Overview Link */}
                              <button
                                onClick={() => handleSelect(`/products/${key}`)}
                                className={`w-full text-left px-3 py-2 text-sm rounded-md transition-all duration-150 flex items-center justify-between
                                  ${isCategoryPage 
                                    ? 'text-blue-600 font-medium bg-blue-50 border border-blue-200' 
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800 italic'}`}
                              >
                                <span>← View Category Overview</span>
                                {isCategoryPage && (
                                  <span className="text-blue-500 text-xs">●</span>
                                )}
                              </button>

                              {/* Individual Models */}
                              {category.models.map((model) => {
                                const isCurrentModel = pathname === model.href;
                                return (
                                  <button
                                    key={model.href}
                                    onClick={() => handleSelect(model.href)}
                                    className={`w-full text-left px-3 py-2 text-sm rounded-md transition-all duration-150 flex items-center justify-between
                                      ${isCurrentModel 
                                        ? 'text-blue-700 font-medium bg-blue-100 border border-blue-300' 
                                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'}`}
                                  >
                                    <span className="flex items-center">
                                      <span className="w-2 h-2 rounded-full bg-gray-300 mr-2 flex-shrink-0"></span>
                                      {model.shortName}
                                    </span>
                                    {isCurrentModel && (
                                      <span className="text-blue-500 text-xs">●</span>
                                    )}
                                  </button>
                                );
                              })}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>

                {/* Quick Actions */}
                <div className="mt-4 pt-3 border-t border-gray-100">
                  <button
                    onClick={() => handleSelect('/products')}
                    className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-800 rounded-md transition-all duration-150 flex items-center"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    View All Products Overview
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
} 