'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const ExploreBySolutions = () => {
  const router = useRouter();

  return (
    <section className="bg-gray-50 py-20 font-product-sans">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-6 text-4xl font-bold text-gray-900">
            Find Your Solution
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-600">
            Whether you're looking for specific machinery or exploring solutions for your industry, 
            we have the expertise to guide you to the perfect automation solution.
          </p>
        </motion.div>

        <div className="mx-auto max-w-2xl">
          {/* Explore by Solutions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="group relative h-full border border-gray-200 bg-white p-8 transition-all duration-300 hover:border-brand-blue-500/50 block cursor-pointer"
            onClick={() => router.push('/products')}
          >
            {/* Engineering corner accents */}
            <div className="absolute top-0 left-0 h-4 w-4 border-l-2 border-t-2 border-gray-300 transition-colors duration-300 group-hover:border-brand-blue-500"></div>
            <div className="absolute top-0 right-0 h-4 w-4 border-r-2 border-t-2 border-gray-300 transition-colors duration-300 group-hover:border-brand-blue-500"></div>
            <div className="absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-gray-300 transition-colors duration-300 group-hover:border-brand-blue-500"></div>
            <div className="absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-gray-300 transition-colors duration-300 group-hover:border-brand-blue-500"></div>
            {/* Top accent line */}
            <div className="absolute top-0 left-0 h-0.5 w-full bg-gray-200 transition-colors duration-300 group-hover:bg-brand-blue-500"></div>
            <div className="text-center">
              <div className="mb-6 text-5xl text-gray-700 transition-colors duration-300 group-hover:text-brand-blue-500">
                ⚙️
              </div>
              <h3 className="mb-4 text-2xl font-semibold text-gray-900 transition-colors duration-300 group-hover:text-brand-blue-500">
                Browse by Solution
              </h3>
              <p className="mb-6 text-gray-600">
                Explore our comprehensive range of packaging automation machinery and find the perfect solution for your production needs.
              </p>
              {/* Call to action */}
              <div className="inline-flex items-center font-medium text-brand-blue-500 group-hover:text-brand-blue-600">
                <span>View All Products</span>
                <svg className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ExploreBySolutions; 