'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import PageContainer from '@/components/PageContainer';

const solutions = [
  {
    name: 'Secondary Packaging (IBP-120)',
    description: 'High-speed secondary packaging solution for food pouches with speeds up to 120 pouches per minute.',
    features: [
      'Hygienic design with SS-304 construction',
      'Tool-less changeover system',
      'Advanced HMI with recipe management',
      'Integrated quality control'
    ],
    image: '/images/products/ibp-120.jpg',
    href: '/products/bundling-wrapping/ibp-120'
  },
  {
    name: 'Shrink Wrapping (ISP-120)',
    description: 'Automatic shrink wrapping system for food products with precise temperature control.',
    features: [
      'Controlled shrink tunnel temperature',
      'Energy-efficient heating system',
      'Quick format change capability',
      'Integrated cooling zone'
    ],
    image: '/images/products/isp-120.jpg',
    href: '/products/bundling-wrapping/isp-120'
  },
  {
    name: 'Cartoning (ACM-100)',
    description: 'Fully automatic cartoning machine for food packaging with high efficiency.',
    features: [
      'FDA compliant materials',
      'Easy cleaning access',
      'Multiple carton size handling',
      'Automatic carton feeding'
    ],
    image: '/images/products/acm-100.jpg',
    href: '/products/cartoning/acm-100'
  },
  {
    name: 'Case Packing (ICP-120)',
    description: 'Automated case packing solution for food products with gentle handling.',
    features: [
      'Product integrity protection',
      'Multiple pack patterns',
      'Easy maintenance design',
      'Quick size changeover'
    ],
    image: '/images/products/icp-120.jpg',
    href: '/products/case-packers/icp-120'
  },
  {
    name: 'Checkweighing & Inspection',
    description: 'Comprehensive quality control systems including checkweighing and vision inspection for food safety and compliance.',
    features: [
      'IP65 washdown protection',
      'Multiple rejection systems',
      'Data logging and reporting',
      'Foreign object detection',
      'Label verification',
      'Seal inspection'
    ],
    image: '/images/products/icw-series.jpg',
    href: '/products/checkweighers-inspection'
  }
];

const applications = [
  {
    name: 'Snack Foods',
    examples: ['Chips', 'Nuts', 'Dried Fruits', 'Candies'],
    icon: '🍿'
  },
  {
    name: 'Beverages',
    examples: ['Tea', 'Coffee', 'Drink Mixes', 'Supplements'],
    icon: '🥤'
  },
  {
    name: 'Frozen Foods',
    examples: ['Ready Meals', 'Vegetables', 'Ice Cream', 'Meat Products'],
    icon: '❄️'
  },
  {
    name: 'Dairy Products',
    examples: ['Cheese', 'Butter', 'Yogurt', 'Milk Powder'],
    icon: '🥛'
  },
  {
    name: 'Bakery',
    examples: ['Bread', 'Cookies', 'Pastries', 'Crackers'],
    icon: '🥖'
  },
  {
    name: 'Confectionery',
    examples: ['Chocolates', 'Candies', 'Gummies', 'Energy Bars'],
    icon: '🍫'
  }
];

export default function FoodBeveragePage() {
  return (
    <PageContainer title="Food & Beverage Industry Solutions">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-50 to-green-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Food & Beverage Packaging Solutions
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive end-to-end packaging solutions designed specifically for the food and beverage industry,
              ensuring product safety, quality, and compliance with industry standards.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Solutions Grid */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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

      {/* Applications Section */}
      <div className="bg-gray-50 py-20">
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
              Our solutions cater to various segments within the food and beverage industry
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
              Ready to Optimize Your Food Packaging?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Our experts can help you select the perfect combination of solutions for your specific needs.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors duration-300"
            >
              Contact Our Team
            </Link>
          </motion.div>
        </div>
      </div>
    </PageContainer>
  );
} 