'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import PageContainer from '@/components/PageContainer';
import { useRouter } from 'next/navigation';

const productCategories = [
  {
    title: 'Bundling & Wrapping Solutions',
    description: 'Advanced secondary packaging machines for pouches and strips with high-speed efficiency',
    models: ['IBP-120', 'IBS-200', 'ISP-120', 'IMS-800/600', 'IWB-200', 'ISB-120'],
    href: '/products/bundling-wrapping',
    icon: '📦',
    color: '#4F46E5',
    stats: '6 Models | 50g-2kg Range',
    highlight: 'Most Popular'
  },
  {
    title: 'Automated Case Packers',
    description: 'Complete case packing solutions with robotic pick & place and quality verification',
    models: ['ICP-120', 'ICS-200', 'ICB-120', 'Case Erector', 'Case Sealer'],
    href: '/products/case-packers',
    icon: '📥',
    color: '#9333EA',
    stats: '5 Models | End-of-Line',
    highlight: 'High Performance'
  },
  {
    title: 'Cartoning Machines',
    description: 'Automatic and semi-automatic cartoning solutions for various product types',
    models: ['ACM-100', 'ACM-40'],
    href: '/products/cartoning',
    icon: '📮',
    color: '#059669',
    stats: '2 Models | Continuous & Intermittent',
    highlight: 'Precision Cartoning'
  },
  {
    title: 'Pouch Baler & Bagging',
    description: 'Automated baling and bagging systems for large pouches and high-volume operations',
    models: ['IBL-500', 'IBG-H8', 'IBG-V8'],
    href: '/products/pouch-baler',
    icon: '🎁',
    color: '#0891B2',
    stats: '3 Models | 200g-2kg Capacity',
    highlight: 'High Volume'
  },
  {
    title: 'Checkweighers & Inspection Systems',
    description: 'Comprehensive range of dynamic checkweighers and advanced vision inspection systems for precise quality control',
    models: ['ICW-600', 'ICW-1200', 'ICW-6000', 'ICW-25K', 'ICW-50K', 'Vision Pro', 'Vision Compact'],
    href: '/products/checkweighers-inspection',
    icon: '⚖️',
    color: '#DC2626',
    stats: '7 Models | Complete Quality Control',
    highlight: 'Quality Control'
  },
  {
    title: 'Conveying Solutions',
    description: 'Complete end-of-line conveying systems for seamless product movement',
    models: ['Flat Belt', 'Modular', 'Roller', 'Spiral', 'Box Lifter', 'Crate Lifter'],
    href: '/products/conveying',
    icon: '🔄',
    color: '#2563EB',
    stats: '8 Models | Complete Solutions',
    highlight: 'Material Handling'
  },
];

export default function Products() {
  const router = useRouter();
  return (
    <PageContainer
      title="Our Solutions"
    >
      {/* Enhanced Statistics Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-12 relative"
      >
        <div className="bg-gradient-to-r from-brand-blue-50 to-brand-green-50 border border-gray-200 rounded-2xl p-8 relative overflow-hidden">
          {/* Engineering corner accents */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-brand-blue-500 rounded-tl-lg"></div>
          <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-brand-blue-500 rounded-tr-lg"></div>
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-brand-blue-500 rounded-bl-lg"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-brand-blue-500 rounded-br-lg"></div>
          
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Complete Packaging Automation Solutions</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">From single pouches to complete production lines - streamlining your packaging process with speed, accuracy, and reliability</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-brand-blue-600 mb-1">30+</div>
              <div className="text-sm text-gray-600 font-medium">Product Models</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-brand-green-600 mb-1">7</div>
              <div className="text-sm text-gray-600 font-medium">Solution Categories</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-brand-blue-600 mb-1">50g-50kg</div>
              <div className="text-sm text-gray-600 font-medium">Capacity Range</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-brand-green-600 mb-1">800+</div>
              <div className="text-sm text-gray-600 font-medium">Installations</div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {productCategories.map((category, index) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="relative bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 h-full group cursor-pointer overflow-hidden"
            onClick={() => router.push(category.href)}
          >
            {/* Highlight Badge */}
            {category.highlight && (
              <div className="absolute top-4 right-4 z-10">
                <div 
                  className="px-3 py-1 rounded-full text-xs font-semibold text-white"
                  style={{ backgroundColor: category.color }}
                >
                  {category.highlight}
                </div>
              </div>
            )}
            
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div 
                className="absolute inset-0"
                style={{
                  backgroundImage: `linear-gradient(45deg, ${category.color}15 25%, transparent 25%), linear-gradient(-45deg, ${category.color}15 25%, transparent 25%)`,
                  backgroundSize: '20px 20px'
                }}
              ></div>
            </div>
            
            {/* Engineering corner accents */}
            <div 
              className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 rounded-tl-xl transition-all duration-300 group-hover:w-8 group-hover:h-8"
              style={{ borderColor: category.color }}
            ></div>
            <div 
              className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 rounded-br-xl transition-all duration-300 group-hover:w-8 group-hover:h-8"
              style={{ borderColor: category.color }}
            ></div>
            
            {/* Content */}
            <div className="relative z-10">
              {/* Icon and Title */}
              <div className="flex items-start justify-between mb-6">
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: `${category.color}15` }}
                >
                  {category.icon}
                </div>
              </div>
              
              <h3 
                className="text-xl font-bold mb-3 group-hover:scale-105 transition-transform duration-300"
                style={{ color: category.color }}
              >
                {category.title}
              </h3>
              
              <p className="text-gray-600 mb-6 leading-relaxed text-sm">
                {category.description}
              </p>
              
              {/* Stats */}
              <div className="mb-6 p-3 bg-gray-50 rounded-lg border border-gray-100">
                <div className="text-sm font-semibold text-gray-700 mb-1">Specifications</div>
                <div className="text-xs text-gray-600">{category.stats}</div>
              </div>
              
              {/* Models */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-gray-700 flex items-center">
                  <span 
                    className="w-2 h-2 rounded-full mr-2"
                    style={{ backgroundColor: category.color }}
                  ></span>
                  Available Models ({category.models.length})
                </h4>
                <div className="flex flex-wrap gap-2">
                  {category.models.slice(0, 4).map((model) => (
                    <span
                      key={model}
                      className="inline-block bg-white text-gray-700 text-xs px-3 py-1.5 border border-gray-200 rounded-lg font-medium hover:shadow-sm transition-shadow duration-200"
                    >
                      {model}
                    </span>
                  ))}
                  {category.models.length > 4 && (
                    <span className="inline-block bg-gray-100 text-gray-500 text-xs px-3 py-1.5 border border-gray-200 rounded-lg font-medium">
                      +{category.models.length - 4} more
                    </span>
                  )}
                </div>
              </div>
              
              {/* Action Indicator */}
              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                <span 
                  className="text-sm font-semibold"
                  style={{ color: category.color }}
                >
                  Explore Solutions
                </span>
                <div className="opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
                  <svg className="w-5 h-5" style={{ color: category.color }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </PageContainer>
  );
} 