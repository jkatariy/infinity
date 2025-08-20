'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface IndustrySubCategory {
  name: string;
  models: string[];
}

interface Industry {
  name: string;
  subCategories: IndustrySubCategory[];
}

const industries: Industry[] = [
  {
    name: 'Food & Beverage',
    subCategories: [
      {
        name: 'Tea & Spices',
        models: ['IBP-120', 'IBS-200', 'ACM-40', 'ICP-120', 'IBG-8', 'IMS-600/800']
      },
      {
        name: 'Beverage',
        models: ['IBP-120', 'ICB-200']
      },
      {
        name: 'Biscuits',
        models: ['IBP-200', 'ICP-120']
      },
      {
        name: 'Sugar/Flour/Staple Foods',
        models: ['IBL-500', 'IBG-8']
      }
    ]
  },
  {
    name: 'Pharmaceuticals',
    subCategories: [
      {
        name: 'General',
        models: ['ICP-120', 'ACM-40/100', 'Check Weighers ICW']
      }
    ]
  },
  {
    name: 'Personal Care',
    subCategories: [
      {
        name: 'General',
        models: ['IBP-120', 'ICP-120', 'ACM-40/100']
      }
    ]
  },
  {
    name: 'Chemical',
    subCategories: [
      {
        name: 'General',
        models: ['IBP-120', 'ICP-120']
      }
    ]
  },
  {
    name: 'Automotive',
    subCategories: [
      {
        name: 'General',
        models: ['ACM-40/100', 'ICP-120', 'Conveying Solutions']
      }
    ]
  },
  {
    name: 'E-commerce',
    subCategories: [
      {
        name: 'General',
        models: ['ICP-120', 'Taping System', 'Check Weigher', 'Conveying Solutions']
      }
    ]
  }
];

// Model to route mapping
const modelRoutes: { [key: string]: string } = {
  'IBP-120': '/products/bundling-wrapping/ibp-120',
  'IBS-200': '/products/bundling-wrapping/ibs-200',
  'ACM-40': '/products/cartoning/acm-40',
  'ACM-100': '/products/cartoning/acm-100',
  'ICP-120': '/products/case-packers/icp-120',
  'IBG-8': '/products/pouch-baler/ibg-8',
  'IBG-H8': '/products/pouch-baler/ibg-h8-v8',
  'IBG-V8': '/products/pouch-baler/ibg-h8-v8',
  'IBL-500': '/products/pouch-baler/ibl-500',
  'ICB-200': '/products/case-packers/icb-120', // Assuming ICB-200 maps to ICB-120
  'IBP-200': '/products/bundling-wrapping/ibp-120', // Assuming IBP-200 maps to IBP-120
  'IMS-600': '/products/bundling-wrapping/ims-800', // Assuming IMS-600 maps to IMS-800
  'IMS-800': '/products/bundling-wrapping/ims-800',
  'Check Weighers ICW': '/products/checkweighers',
  'Taping System': '/products/case-packers/case-sealer',
  'Check Weigher': '/products/checkweighers',
  'Conveying Solutions': '/products/conveying'
};

const ExploreByIndustry = () => {
  const router = useRouter();
  const [expandedIndustry, setExpandedIndustry] = useState<string | null>(null);
  const [expandedSubCategory, setExpandedSubCategory] = useState<string | null>(null);

  const handleIndustryClick = (industryName: string) => {
    if (expandedIndustry === industryName) {
      setExpandedIndustry(null);
      setExpandedSubCategory(null);
    } else {
      setExpandedIndustry(industryName);
      setExpandedSubCategory(null);
    }
  };

  const handleSubCategoryClick = (subCategoryName: string) => {
    if (expandedSubCategory === subCategoryName) {
      setExpandedSubCategory(null);
    } else {
      setExpandedSubCategory(subCategoryName);
    }
  };

  const handleModelClick = (model: string) => {
    const route = modelRoutes[model];
    if (route) {
      router.push(route);
    }
  };

  return (
    <section className="bg-white py-20 font-product-sans">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <div className="relative inline-block">
            <h2 className="mb-4 text-4xl font-bold text-gray-900">Explore by Industry</h2>
            {/* Section accent line */}
            <div className="absolute -top-2 left-1/2 h-0.5 w-32 -translate-x-1/2 transform bg-blue-500/20"></div>
          </div>
          <p className="mx-auto max-w-3xl text-xl text-gray-600">
            Discover our packaging solutions tailored for specific industries and applications.
          </p>
        </motion.div>

        {/* Industries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((industry, industryIndex) => (
            <motion.div
              key={industry.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: industryIndex * 0.1 }}
              className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
            >
              {/* Industry Header */}
              <button
                onClick={() => handleIndustryClick(industry.name)}
                className="w-full p-6 text-left hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-900">{industry.name}</h3>
                  <svg
                    className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                      expandedIndustry === industry.name ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              {/* Sub Categories */}
              <AnimatePresence>
                {expandedIndustry === industry.name && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-gray-100"
                  >
                    {industry.subCategories.map((subCategory, subIndex) => (
                      <div key={subCategory.name} className="border-b border-gray-100 last:border-b-0">
                        {/* Sub Category Header */}
                        <button
                          onClick={() => handleSubCategoryClick(subCategory.name)}
                          className="w-full p-4 text-left hover:bg-gray-50 transition-colors duration-200"
                        >
                          <div className="flex items-center justify-between">
                            <h4 className="text-lg font-medium text-gray-800">{subCategory.name}</h4>
                            <svg
                              className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                                expandedSubCategory === subCategory.name ? 'rotate-180' : ''
                              }`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </button>

                        {/* Models */}
                        <AnimatePresence>
                          {expandedSubCategory === subCategory.name && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="bg-gray-50"
                            >
                              <div className="p-4 space-y-2">
                                {subCategory.models.map((model, modelIndex) => (
                                  <motion.button
                                    key={model}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: modelIndex * 0.05 }}
                                    onClick={() => handleModelClick(model)}
                                    className="w-full text-left p-3 bg-white rounded-md border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group"
                                  >
                                    <div className="flex items-center justify-between">
                                      <span className="font-medium text-gray-700 group-hover:text-blue-700">
                                        {model}
                                      </span>
                                      <svg className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                      </svg>
                                    </div>
                                  </motion.button>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <button 
            onClick={() => router.push('/products')}
            aria-label="View all products"
            className="bg-blue-600 text-white px-8 py-3 font-medium hover:bg-blue-700 transition-all duration-300 relative group"
          >
            <span className="relative z-10">View All Products</span>
            {/* Engineering corner accents */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-blue-400 group-hover:w-4 group-hover:h-4 transition-all duration-300"></div>
            <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-blue-400 group-hover:w-4 group-hover:h-4 transition-all duration-300"></div>
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-blue-400 group-hover:w-4 group-hover:h-4 transition-all duration-300"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-blue-400 group-hover:w-4 group-hover:h-4 transition-all duration-300"></div>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default ExploreByIndustry;