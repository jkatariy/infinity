'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import PageContainer from '@/components/PageContainer';

const solutions = [
  {
    name: 'Cartoning (ACM-100)',
    description: 'Fully automatic cartoning machine designed for pharmaceutical packaging with GMP compliance.',
    features: [
      'GMP compliant design',
      'Validation documentation',
      'Product tracking system',
      'Automatic leaflet insertion'
    ],
    image: '/images/products/acm-100.jpg',
    href: '/products/cartoning/acm-100'
  },
  {
    name: 'Checkweighing & Inspection',
    description: 'Comprehensive quality control systems for pharmaceutical compliance and safety.',
    features: [
      'High accuracy ±0.01g',
      'OCR/OCV verification',
      'Blister inspection',
      'Label verification',
      'Data logging for compliance',
      'Clean room compatible'
    ],
    image: '/images/products/icw-series.jpg',
    href: '/products/checkweighers-inspection'
  },
  {
    name: 'Case Packing (ICP-120)',
    description: 'Automated case packing solution for pharmaceutical products with track & trace capability.',
    features: [
      'Serialization ready',
      'Gentle product handling',
      'Clean room design',
      'Validation support'
    ],
    image: '/images/products/icp-120.jpg',
    href: '/products/case-packers/icp-120'
  }
];

const applications = [
  {
    name: 'Solid Dose',
    examples: ['Tablets', 'Capsules', 'Pills', 'Supplements'],
    icon: '💊'
  },
  {
    name: 'Liquid Medicines',
    examples: ['Vials', 'Ampoules', 'Bottles', 'Syrups'],
    icon: '💉'
  },
  {
    name: 'Medical Devices',
    examples: ['Syringes', 'Test Kits', 'Diagnostic Tools', 'Surgical Items'],
    icon: '🏥'
  },
  {
    name: 'Healthcare Products',
    examples: ['Bandages', 'First Aid', 'Personal Care', 'Medical Supplies'],
    icon: '🩹'
  }
];

const compliance = [
  {
    name: 'GMP Standards',
    description: 'All equipment designed and manufactured according to Good Manufacturing Practice guidelines.',
    icon: '✓'
  },
  {
    name: 'FDA Compliance',
    description: 'Machines meet FDA requirements for pharmaceutical packaging equipment.',
    icon: '✓'
  },
  {
    name: 'Validation Support',
    description: 'Comprehensive documentation and support for equipment validation.',
    icon: '✓'
  },
  {
    name: 'Data Integrity',
    description: 'Built-in systems for maintaining ALCOA+ principles of data integrity.',
    icon: '✓'
  }
];

export default function PharmaceuticalsPage() {
  return (
    <PageContainer title="Pharmaceuticals Industry Solutions">
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
              Pharmaceutical Packaging Solutions
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              GMP-compliant packaging solutions designed for the pharmaceutical industry,
              ensuring product integrity, compliance, and traceability throughout the packaging process.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Solutions Grid */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
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

      {/* Compliance Section */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Regulatory Compliance
            </h2>
            <p className="text-xl text-gray-600">
              Our solutions meet the highest standards in pharmaceutical manufacturing
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {compliance.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg border border-gray-200"
              >
                <div className="flex items-center mb-4">
                  <span className="text-2xl text-green-500 mr-3">{item.icon}</span>
                  <h3 className="text-xl font-semibold text-gray-900">{item.name}</h3>
                </div>
                <p className="text-gray-600">{item.description}</p>
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
              Specialized solutions for various pharmaceutical packaging needs
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
              Need GMP-Compliant Packaging Solutions?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Our team can help you design a validated packaging line that meets all regulatory requirements.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors duration-300"
            >
              Schedule a Consultation
            </Link>
          </motion.div>
        </div>
      </div>
    </PageContainer>
  );
} 