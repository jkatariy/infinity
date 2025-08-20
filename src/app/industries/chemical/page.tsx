'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import PageContainer from '@/components/PageContainer';

const solutions = [
  {
    name: 'Pouch Baling (IBL-500)',
    description: 'High-capacity baling system for chemical pouches with safety features.',
    features: [
      'Chemical-resistant materials',
      'Safety interlocks',
      'Dust extraction system',
      'Heavy-duty construction'
    ],
    image: '/images/products/ibl-500.jpg',
    href: '/products/pouch-baler/ibl-500'
  },
  {
    name: 'Case Packing (ICP-120)',
    description: 'Automated case packing solution for chemical products with safety features.',
    features: [
      'Explosion-proof options',
      'Chemical resistance',
      'Safety barriers',
      'Emergency systems'
    ],
    image: '/images/products/icp-120.jpg',
    href: '/products/case-packers/icp-120'
  },
  {
    name: 'Checkweighing & Inspection',
    description: 'Comprehensive quality control systems for chemical products including heavy-duty checkweighing and inspection.',
    features: [
      'High capacity weighing',
      'Corrosion resistance',
      'IP67 protection',
      'Data logging',
      'Quality inspection',
      'Defect detection'
    ],
    image: '/images/products/icw-series.jpg',
    href: '/products/checkweighers-inspection'
  },
  {
    name: 'Industrial Conveyors',
    description: 'Heavy-duty conveying solutions for chemical industry applications.',
    features: [
      'Chemical-resistant belts',
      'Safety guards',
      'Emergency stops',
      'Washdown design'
    ],
    image: '/images/products/conveying.jpg',
    href: '/products/conveying'
  }
];

const applications = [
  {
    name: 'Industrial Chemicals',
    examples: ['Acids', 'Bases', 'Solvents', 'Reagents'],
    icon: '⚗️'
  },
  {
    name: 'Cleaning Products',
    examples: ['Detergents', 'Sanitizers', 'Bleaches', 'Disinfectants'],
    icon: '🧼'
  },
  {
    name: 'Agricultural',
    examples: ['Fertilizers', 'Pesticides', 'Soil Treatments', 'Plant Nutrients'],
    icon: '🌱'
  },
  {
    name: 'Specialty Chemicals',
    examples: ['Coatings', 'Adhesives', 'Sealants', 'Catalysts'],
    icon: '🧪'
  }
];

const safetyFeatures = [
  {
    name: 'Chemical Resistance',
    description: 'Equipment constructed with materials resistant to chemical exposure and corrosion.',
    icon: '🛡️'
  },
  {
    name: 'Safety Systems',
    description: 'Comprehensive safety features including emergency stops, barriers, and interlocks.',
    icon: '⚠️'
  },
  {
    name: 'Environmental Protection',
    description: 'Systems for containing spills and managing chemical exposure risks.',
    icon: '🌍'
  },
  {
    name: 'Compliance',
    description: 'Equipment designed to meet chemical industry safety standards and regulations.',
    icon: '📋'
  }
];

export default function ChemicalPage() {
  return (
    <PageContainer title="Chemical Industry Solutions">
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
              Chemical Industry Packaging Solutions
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Heavy-duty packaging solutions designed for the chemical industry,
              with emphasis on safety, durability, and regulatory compliance.
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

      {/* Safety Features Section */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Safety First Design
            </h2>
            <p className="text-xl text-gray-600">
              Our solutions incorporate comprehensive safety features for chemical handling
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {safetyFeatures.map((feature, index) => (
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
              Solutions for various chemical industry segments
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
              Need Chemical-Safe Packaging Solutions?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Our experts can help you design a safe and efficient packaging line for your chemical products.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors duration-300"
            >
              Discuss Your Requirements
            </Link>
          </motion.div>
        </div>
      </div>
    </PageContainer>
  );
} 