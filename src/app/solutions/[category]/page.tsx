'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import PageContainer from '@/components/PageContainer';

// This should match the structure in Header.tsx
const solutionCategories = {
  'bundling-wrapping': {
    title: 'Bundling and Wrapping Machines',
    description: 'Advanced solutions for secondary packaging and wrapping applications.',
    models: [
      {
        name: 'Secondary Packaging for Pouches (BP-120)',
        href: '/solutions/bundling-wrapping/bp-120',
        description: 'High-speed secondary packaging solution for pouches.',
        image: '/images/products/bp-120.jpg'
      },
      {
        name: 'Secondary Packaging for Strip of Pouches (BSS-200)',
        href: '/solutions/bundling-wrapping/bss-200',
        description: 'Efficient packaging solution for strip pouches.',
        image: '/images/products/bss-200.jpg'
      },
      {
        name: 'Automatic Shrink Wrapping Machine for Pouches (BP-120)',
        href: '/solutions/bundling-wrapping/bp-120-shrink',
        description: 'Automated shrink wrapping system for pouch packaging.',
        image: '/images/products/bp-120-shrink.jpg'
      },
      {
        name: 'Secondary Packaging for Multitrack VFFS (MS-800/MS-600)',
        href: '/solutions/bundling-wrapping/ms-800',
        description: 'High-capacity packaging for vertical form fill seal applications.',
        image: '/images/products/ms-800.jpg'
      },
      {
        name: 'Automatic Shrink Wrapping Machine for Bottles (WB-200)',
        href: '/solutions/bundling-wrapping/wb-200',
        description: 'Advanced shrink wrapping solution for bottle packaging.',
        image: '/images/products/wb-200.jpg'
      }
    ]
  },
  'pouch-baler': {
    title: 'Automatic Pouch Baler Systems',
    description: 'Efficient baling and bagging solutions for various pouch applications.',
    models: [
      {
        name: 'Automatic Baler Machine for Pouches (BBL-500)',
        href: '/solutions/pouch-baler/bbl-500',
        description: 'High-capacity baling system for pouches.',
        image: '/images/products/bbl-500.jpg'
      },
      {
        name: 'Automatic Bagging Machine (ACM-100)',
        href: '/solutions/pouch-baler/acm-100',
        description: 'Versatile automatic bagging solution.',
        image: '/images/products/acm-100.jpg'
      }
    ]
  },
  // Add other categories here...
};

export default function SolutionCategoryPage() {
  const params = useParams();
  const category = params?.category as string;
  const categoryData = solutionCategories[category as keyof typeof solutionCategories];

  if (!categoryData) {
    return (
      <PageContainer title="Category Not Found">
        <div className="text-center py-12">
          <h1 className="text-2xl font-semibold text-gray-900">Category not found</h1>
          <p className="mt-4 text-gray-600">The requested solution category does not exist.</p>
          <Link 
            href="/"
            className="mt-6 inline-block text-blue-600 hover:text-blue-800 font-medium"
          >
            Return to Home
          </Link>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer title={categoryData.title}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{categoryData.title}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{categoryData.description}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categoryData.models.map((model, index) => (
            <motion.div
              key={model.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:border-blue-500/50 transition-all duration-300 group"
            >
              <div className="relative h-64">
                <Image
                  src={model.image}
                  alt={model.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {model.name}
                </h2>
                <p className="text-gray-600 mb-4">{model.description}</p>
                <Link
                  href={model.href}
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                >
                  Learn More
                  <svg
                    className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </PageContainer>
  );
} 