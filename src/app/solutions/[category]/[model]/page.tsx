'use client';

import { notFound, useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import ZohoCRMForm from '@/components/ZohoCRMForm';

// Mock data - replace with actual data fetching
const solutionsData = {
  'bundling-wrapping': {
    'ibp-120': {
      name: 'IBP-120 Bundle Packer',
      description: 'High-speed automatic bundle packaging solution',
      longDescription: 'The IBP-120 is designed for high-volume packaging operations requiring reliable and consistent bundle formation. Features advanced servo-driven mechanisms for precise positioning and consistent wrap tension.',
      image: '/images/products/ibp-120.jpg',
      specifications: {
        'Speed': 'Up to 120 bundles/min',
        'Bundle Size': '50-500mm width, 30-300mm height',
        'Film Type': 'Polyethylene, Polypropylene',
        'Power': '15kW, 380V',
        'Dimensions': '4500 x 2200 x 2100mm'
      },
      applications: [
        'Food & Beverage',
        'Consumer Goods',
        'Pharmaceutical',
        'Personal Care'
      ]
    }
  },
  'cartoning': {
    'acm-40': {
      name: 'ACM-40 Cartoning Machine',
      description: 'Compact automatic cartoning solution for small to medium production',
      longDescription: 'The ACM-40 provides reliable cartoning for various product types with quick changeover capabilities. Ideal for pharmaceutical, food, and consumer goods applications.',
      image: '/images/products/acm-40.jpg',
      specifications: {
        'Speed': 'Up to 40 cartons/min',
        'Carton Size': '40-180mm length, 15-80mm width, 12-120mm height',
        'Product Types': 'Bottles, tubes, sachets, blister packs',
        'Power': '5kW, 380V',
        'Dimensions': '3200 x 1400 x 1800mm'
      },
      applications: [
        'Pharmaceutical',
        'Food & Beverage',
        'Cosmetics',
        'Consumer Goods'
      ]
    }
  },
  'pouch-baler': {
    'ibg-h8-v8': {
      name: 'IBG-H8-V8 Pouch Baler',
      description: 'Versatile horizontal and vertical baling solution',
      longDescription: 'The IBG-H8-V8 offers dual operation modes for maximum flexibility in pouch handling and baling operations. Perfect for high-volume production environments.',
      image: '/images/products/ibg-h8-v8.jpg',
      specifications: {
        'Speed': 'Up to 80 pouches/min',
        'Pouch Size': '100-300mm width, 150-400mm height',
        'Operation': 'Horizontal & Vertical',
        'Power': '12kW, 380V',
        'Dimensions': '4000 x 2000 x 2300mm'
      },
      applications: [
        'Food Processing',
        'Chemical',
        'Agricultural',
        'Industrial Materials'
      ]
    }
  }
} as const;

type SolutionsDataType = typeof solutionsData;
type CategoryType = keyof SolutionsDataType;
type ProductData = {
  name: string;
  description: string;
  longDescription: string;
  image: string;
  specifications: Record<string, string>;
  applications: string[];
};

export default function ModelPage() {
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const params = useParams();
  
  const category = params?.category as string;
  const model = params?.model as string;
  
  // Type-safe data lookup with proper fallback
  let data: ProductData | null = null;
  
  if (category && model && category in solutionsData) {
    const categoryData = solutionsData[category as CategoryType];
    if (categoryData && model in categoryData) {
      data = categoryData[model as keyof typeof categoryData] as ProductData;
    }
  }
  
  if (!data) {
    notFound();
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-5xl font-bold mb-6">{data.name}</h1>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                {data.description}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16"
          >
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{data.name}</h1>
              <p className="text-xl text-gray-600 mb-8">{data.description}</p>
              <div className="prose prose-lg text-gray-600">{data.longDescription}</div>
              <div className="mt-8 flex gap-4">
                <button
                  onClick={() => setShowQuoteModal(true)}
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Request Quote
                </button>
                <button
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: `${data.name} - Infinity Automated Solutions`,
                        text: data.description,
                        url: window.location.href,
                      });
                    } else {
                      navigator.clipboard.writeText(window.location.href);
                    }
                  }}
                  className="inline-flex items-center px-6 py-3 border-2 border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors"
                >
                  Share Product
                </button>
              </div>
            </div>
            <div className="relative h-[400px] lg:h-[500px]">
              <Image
                src={data.image}
                alt={data.name}
                fill
                className="object-cover rounded-lg"
                priority
              />
            </div>
          </motion.div>

          {/* Specifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16"
          >
            <div>
                              <h2 className="text-2xl font-bold text-gray-900 mb-8">Technical Specifications</h2>
              <div className="space-y-4">
                {Object.entries(data.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center py-3 border-b border-gray-200">
                    <span className="font-medium text-gray-900">{key}:</span>
                    <span className="text-gray-600">{value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
                              <h2 className="text-2xl font-bold text-gray-900 mb-8">Applications</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {data.applications.map((application) => (
                  <div
                    key={application}
                    className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-blue-600 rounded-full mr-3"></div>
                      <span className="font-medium text-gray-900">{application}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Features Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'High Performance',
                  description: 'Optimized for maximum throughput and efficiency',
                  icon: '⚡'
                },
                {
                  title: 'Reliable Operation',
                  description: 'Built for continuous operation with minimal downtime',
                  icon: '🔧'
                },
                {
                  title: 'Easy Integration',
                  description: 'Seamlessly integrates with existing production lines',
                  icon: '🔗'
                }
              ].map((feature, index) => (
                <div key={index} className="bg-white p-8 rounded-lg shadow-md border border-gray-200 text-center">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-blue-600 text-white rounded-lg p-12 text-center"
          >
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Contact our team to discuss your specific requirements and get a customized solution.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setShowQuoteModal(true)}
                className="px-8 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-gray-100 transition-colors"
              >
                Request Quote
              </button>
              <Link
                href="/contact"
                className="px-8 py-3 border-2 border-white text-white font-medium rounded-lg hover:bg-white hover:text-blue-600 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Quote Form Modal */}
      {showQuoteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <ZohoCRMForm
              productName={data.name}
              leadSource="Solutions Page"
              title="Request Product Quote"
              subtitle={`Get detailed information about ${data.name}`}
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
} 