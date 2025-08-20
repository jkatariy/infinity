'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import PageContainer from '@/components/PageContainer';

const solutions = [
  {
    name: 'Pouch Bagging (IBG-H8/V8)',
    description: 'Automated bagging solution for e-commerce fulfillment with dual orientation options.',
    features: [
      'High-speed operation',
      'Multiple bag sizes',
      'Barcode integration',
      'Label printing option'
    ],
    image: '/images/products/ibg-h8-v8.jpg',
    href: '/products/pouch-baler/ibg-h8-v8'
  },
  {
    name: 'Case Erectors & Sealers',
    description: 'Automated case handling system for e-commerce shipping boxes.',
    features: [
      'Multiple box sizes',
      'Quick size change',
      'Tape or glue sealing',
      'High throughput'
    ],
    image: '/images/products/case-erectors.jpg',
    href: '/products/case-packers/case-erectors'
  },
  {
    name: 'Conveying Solutions',
    description: 'Flexible conveying systems for e-commerce fulfillment centers.',
    features: [
      'Modular design',
      'Multiple configurations',
      'Smart routing',
      'Gentle handling'
    ],
    image: '/images/products/conveying.jpg',
    href: '/products/conveying'
  },
  {
    name: 'Checkweighing & Inspection',
    description: 'Comprehensive quality control systems for e-commerce order verification and quality assurance.',
    features: [
      'High accuracy',
      'Data integration',
      'Multiple ranges',
      'Shipping compliance',
      'Quality inspection',
      'Defect detection'
    ],
    image: '/images/products/icw-series.jpg',
    href: '/products/checkweighers-inspection'
  }
];

const applications = [
  {
    name: 'Retail Fulfillment',
    examples: ['Fashion', 'Electronics', 'Home Goods', 'Books'],
    icon: '🛍️'
  },
  {
    name: 'Marketplace Sellers',
    examples: ['Multi-Channel', 'Direct-to-Consumer', 'Dropshipping', 'FBA'],
    icon: '🏪'
  },
  {
    name: 'Subscription Boxes',
    examples: ['Beauty Boxes', 'Food Boxes', 'Lifestyle Boxes', 'Pet Supplies'],
    icon: '📦'
  },
  {
    name: 'Returns Processing',
    examples: ['Apparel Returns', 'Electronics Returns', 'Refurbishment', 'Resale'],
    icon: '↩️'
  }
];

const features = [
  {
    name: 'Speed & Efficiency',
    description: 'High-throughput solutions designed for rapid order fulfillment and shipping.',
    icon: '⚡'
  },
  {
    name: 'Flexibility',
    description: 'Adaptable systems handling various product sizes and packaging requirements.',
    icon: '🔄'
  },
  {
    name: 'Integration',
    description: 'Seamless integration with e-commerce platforms and warehouse management systems.',
    icon: '🔌'
  },
  {
    name: 'Scalability',
    description: 'Solutions that grow with your business, from startup to enterprise scale.',
    icon: '📈'
  }
];

export default function EcommercePage() {
  return (
    <PageContainer title="E-commerce Industry Solutions">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-50 to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              E-commerce Packaging Solutions
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Automated packaging solutions designed for e-commerce fulfillment,
              optimizing speed, accuracy, and customer satisfaction.
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
              E-commerce Optimized Features
            </h2>
            <p className="text-xl text-gray-600">
              Specialized capabilities for modern e-commerce operations
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
              Solutions for various e-commerce business models
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
              Scale Your E-commerce Operations
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Let us help you automate your packaging process and handle growing order volumes efficiently.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors duration-300"
            >
              Get Started
            </Link>
          </motion.div>
        </div>
      </div>
    </PageContainer>
  );
} 