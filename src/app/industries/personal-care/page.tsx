'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import PageContainer from '@/components/PageContainer';

const solutions = [
  {
    name: 'Secondary Packaging (IBP-120)',
    description: 'High-speed secondary packaging solution for personal care pouches and sachets.',
    features: [
      'Gentle product handling',
      'Multiple pack formats',
      'Quick changeover system',
      'Premium finish quality'
    ],
    image: '/images/products/ibp-120.jpg',
    href: '/products/bundling-wrapping/ibp-120'
  },
  {
    name: 'Bottle Wrapping (IWB-200)',
    description: 'Automatic shrink wrapping system for cosmetic and personal care bottles.',
    features: [
      'No bottle-no film feature',
      'Precise shrink control',
      'Multiple pack patterns',
      'Brand-enhancing finish'
    ],
    image: '/images/products/iwb-200.jpg',
    href: '/products/bundling-wrapping/iwb-200'
  },
  {
    name: 'Case Packing (ICP-B200)',
    description: 'Specialized case packing solution for bottles and containers.',
    features: [
      'Gentle bottle handling',
      'Multiple case sizes',
      'Quick format change',
      'Display-ready packing'
    ],
    image: '/images/products/icp-b200.jpg',
    href: '/products/case-packers/icp-b200'
  },
  {
    name: 'Checkweighing & Inspection',
    description: 'Comprehensive quality control systems for cosmetic packaging including checkweighing and vision inspection.',
    features: [
      'Label verification',
      'Cap inspection',
      'Cosmetic defect detection',
      'Code validation',
      'Weight verification',
      'Quality assurance'
    ],
    image: '/images/products/icw-series.jpg',
    href: '/products/checkweighers-inspection'
  }
];

const applications = [
  {
    name: 'Skin Care',
    examples: ['Creams', 'Lotions', 'Serums', 'Face Masks'],
    icon: '🧴'
  },
  {
    name: 'Hair Care',
    examples: ['Shampoo', 'Conditioner', 'Treatments', 'Styling Products'],
    icon: '💆'
  },
  {
    name: 'Cosmetics',
    examples: ['Makeup', 'Face Care', 'Eye Care', 'Lip Care'],
    icon: '💄'
  },
  {
    name: 'Body Care',
    examples: ['Body Wash', 'Deodorants', 'Body Lotions', 'Soaps'],
    icon: '🛁'
  }
];

const features = [
  {
    name: 'Premium Packaging',
    description: 'Solutions designed to maintain and enhance product presentation and brand value.',
    icon: '✨'
  },
  {
    name: 'Flexible Formats',
    description: 'Support for various packaging formats from sachets to luxury bottles.',
    icon: '📦'
  },
  {
    name: 'Quality Control',
    description: 'Integrated inspection systems for cosmetic and aesthetic quality.',
    icon: '🔍'
  },
  {
    name: 'Brand Protection',
    description: 'Features to ensure product authenticity and brand integrity.',
    icon: '🛡️'
  }
];

export default function PersonalCarePage() {
  return (
    <PageContainer title="Personal Care Industry Solutions">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-pink-50 to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Personal Care Packaging Solutions
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Premium packaging solutions for cosmetics and personal care products,
              designed to enhance brand value while ensuring product integrity.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Solutions Grid */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {solutions.map((solution, index) => (
              <motion.div
                key={solution.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link href={solution.href}>
                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden group hover:border-blue-500/50 transition-all duration-300">
                    <div className="relative h-48">
                      <Image
                        src={solution.image}
                        alt={solution.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                        {solution.name}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {solution.description}
                      </p>
                      <ul className="space-y-2">
                        {solution.features.map((feature, i) => (
                          <li key={i} className="flex items-center text-sm text-gray-600">
                            <span className="text-blue-500 mr-2">•</span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Industry-Specific Features
            </h2>
            <p className="text-xl text-gray-600">
              Specialized capabilities for personal care and cosmetics packaging
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg border border-gray-200"
              >
                <div className="flex items-center mb-4">
                  <span className="text-2xl mr-3">{feature.icon}</span>
                  <h3 className="text-xl font-semibold text-gray-900">{feature.name}</h3>
                </div>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Applications Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Industry Applications
            </h2>
            <p className="text-xl text-gray-600">
              Solutions for every segment of the personal care industry
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {applications.map((app, index) => (
              <motion.div
                key={app.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg border border-gray-200"
              >
                <div className="text-4xl mb-4">{app.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {app.name}
                </h3>
                <ul className="space-y-2">
                  {app.examples.map((example, i) => (
                    <li key={i} className="flex items-center text-gray-600">
                      <span className="text-blue-500 mr-2">•</span>
                      {example}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-blue-600 text-white rounded-lg p-12 text-center"
          >
            <h2 className="text-3xl font-bold mb-4">
              Elevate Your Brand Packaging
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Let us help you create packaging solutions that enhance your brand and delight your customers.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors duration-300"
            >
              Request a Demo
            </Link>
          </motion.div>
        </div>
      </div>
    </PageContainer>
  );
} 