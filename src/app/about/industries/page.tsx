'use client';

import { motion } from 'framer-motion';
import PageContainer from '@/components/PageContainer';

const industries = [
  {
    name: 'Food & Spices',
    description: 'Plug-and-play systems that integrate your primary line (VFFS/HFFS). Perfect for pouches from 100 g to 5 kg—either single or in strips—to be packed in bags or cartons, helping you reduce labour and boost production.',
    icon: '🌶️',
    features: [
      'Plug-and-play integration with primary lines',
      'Handles pouches from 100g to 5kg',
      'Single or strip packaging options',
      'Bag and carton packing capabilities',
      'Labour reduction and production boost'
    ],
    color: 'from-red-500 to-orange-500'
  },
  {
    name: 'Tea & Coffee',
    description: 'Same reliable automation for tea and coffee brands. Our machines work right with your existing line, whether you\'re packing small pouches or large ones, smoothly and efficiently.',
    icon: '🫖',
    features: [
      'Reliable automation for tea and coffee brands',
      'Seamless integration with existing lines',
      'Handles small to large pouches',
      'Smooth and efficient operations',
      'Consistent quality packaging'
    ],
    color: 'from-green-500 to-emerald-500'
  },
  {
    name: 'FMCG',
    description: 'Ideal for personal care, beverages, toiletries, food, and other consumer goods. Our systems handle single or strip packs, cutting down manpower and maintaining smooth operations.',
    icon: '🛍️',
    features: [
      'Personal care and beverage packaging',
      'Toiletries and consumer goods',
      'Single or strip pack handling',
      'Manpower reduction',
      'Smooth operational efficiency'
    ],
    color: 'from-blue-500 to-indigo-500'
  },
  {
    name: 'Pharmaceuticals',
    description: 'Fully integrated solutions—from collating, feeding, taping to inspection, weighing, and labelling—ensure safe and compliant packaging for sachets, bottles, or pouch products.',
    icon: '💊',
    features: [
      'Fully integrated packaging solutions',
      'Collating, feeding, and taping',
      'Inspection, weighing, and labelling',
      'Safe and compliant packaging',
      'Sachets, bottles, and pouch products'
    ],
    color: 'from-purple-500 to-pink-500'
  },
  {
    name: 'Textiles',
    description: 'Custom case-packing systems for bath linens, towels, and more. With inline feeding, bundling, strapping, weighing, and labelling—all set for safe, neat shipping.',
    icon: '👕',
    features: [
      'Custom case-packing systems',
      'Bath linens and towels packaging',
      'Inline feeding and bundling',
      'Strapping, weighing, and labelling',
      'Safe and neat shipping solutions'
    ],
    color: 'from-teal-500 to-cyan-500'
  },
  {
    name: 'Tea & Spices',
    description: 'From loose tea to spice powders and masalas, our machines handle delicate and dusty products with care, ensuring accurate counting, stacking, and clean packaging in LD, BOPP, or HDPE bags.',
    icon: '🍃',
    features: [
      'Loose tea and spice powder handling',
      'Delicate and dusty product care',
      'Accurate counting and stacking',
      'Clean packaging solutions',
      'LD, BOPP, or HDPE bag options'
    ],
    color: 'from-amber-500 to-yellow-500'
  },
  {
    name: 'Biscuits & Snacks',
    description: 'For packed biscuits, cookies, or dry snacks, our systems offer perfect alignment, collation, and bundling for further case packing or bagging—helping brands maintain shape and freshness.',
    icon: '🍪',
    features: [
      'Perfect alignment and collation',
      'Biscuits, cookies, and dry snacks',
      'Bundling for case packing',
      'Shape and freshness maintenance',
      'Brand quality preservation'
    ],
    color: 'from-orange-500 to-red-500'
  },
  {
    name: 'Electronics & Consumer Goods',
    description: 'We support efficient case packing and bundling of items like chargers, cables, and boxed gadgets—ensuring neat handling, safe sealing, and smooth dispatch-ready packing.',
    icon: '🔌',
    features: [
      'Efficient case packing solutions',
      'Chargers, cables, and gadgets',
      'Neat handling and safe sealing',
      'Dispatch-ready packing',
      'Consumer electronics expertise'
    ],
    color: 'from-gray-500 to-slate-500'
  },
  {
    name: 'Healthcare & Pharma',
    description: 'For strips, sachets, bottles, or medical kits, our machines offer secure folding, stacking, and secondary packing with high hygiene standards. Add-ons like checkweighers and metal detectors ensure quality control.',
    icon: '🏥',
    features: [
      'Strips, sachets, and bottles',
      'Medical kit packaging',
      'Secure folding and stacking',
      'High hygiene standards',
      'Checkweighers and metal detectors'
    ],
    color: 'from-indigo-500 to-blue-500'
  }
];

const whyChooseInfinity = [
  {
    title: 'Plug-and-Play Integration',
    description: 'Systems that integrate seamlessly with your existing packaging line',
    icon: (
      <svg className="h-8 w-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  },
  {
    title: 'Reduced Manual Work',
    description: 'Automation that cuts down manpower and maintains smooth operations',
    icon: (
      <svg className="h-8 w-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    title: 'Wide Industry Coverage',
    description: 'From food and FMCG to pharma and textiles - we serve all sectors',
    icon: (
      <svg className="h-8 w-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    )
  }
];

export default function Industries() {
  return (
    <PageContainer
      title="Industries We Serve"
    >
      {/* Main Industries Grid */}
      <div className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 relative inline-block">
            Industries We Serve
            <div className="absolute -top-2 left-0 right-0 h-0.5 bg-blue-500/30"></div>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((industry, index) => (
            <motion.div
              key={industry.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="relative group"
            >
              {/* Industry Card */}
              <div className={`relative bg-gradient-to-r ${industry.color} rounded-2xl p-8 text-white h-full`}>
                <div className="absolute top-0 left-0 w-16 h-16 pointer-events-none">
                  <div className="absolute top-0 left-0 w-0.5 h-8 bg-white/30"></div>
                  <div className="absolute top-0 left-0 h-0.5 w-8 bg-white/30"></div>
                </div>
                <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none">
                  <div className="absolute top-0 right-0 w-0.5 h-8 bg-white/30"></div>
                  <div className="absolute top-0 right-0 h-0.5 w-8 bg-white/30"></div>
                </div>
                
                <div className="flex items-center mb-4">
                  <span className="text-4xl mr-4">{industry.icon}</span>
                  <div>
                    <h3 className="text-xl font-bold">{industry.name}</h3>
                  </div>
                </div>
                
                <p className="text-white/90 mb-6 leading-relaxed">{industry.description}</p>
                
                <div className="space-y-2">
                  {industry.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start">
                      <span className="text-white/80 mr-2 mt-1">•</span>
                      <span className="text-white/90 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Why Choose Infinity */}
      <div className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 relative inline-block">
            Why Customers Choose Infinity
            <div className="absolute -top-2 left-0 right-0 h-0.5 bg-blue-500/30"></div>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {whyChooseInfinity.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="bg-white border border-gray-200 p-8 relative group hover:shadow-lg transition-all duration-300"
            >
              <div className="absolute top-0 left-0 w-16 h-16 pointer-events-none">
                <div className="absolute top-0 left-0 w-0.5 h-8 bg-blue-500 transform origin-top scale-y-0 transition-transform group-hover:scale-y-100"></div>
                <div className="absolute top-0 left-0 h-0.5 w-8 bg-blue-500 transform origin-left scale-x-0 transition-transform group-hover:scale-x-100"></div>
              </div>
              <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none">
                <div className="absolute top-0 right-0 w-0.5 h-8 bg-blue-500 transform origin-top scale-y-0 transition-transform group-hover:scale-y-100"></div>
                <div className="absolute top-0 right-0 h-0.5 w-8 bg-blue-500 transform origin-right scale-x-0 transition-transform group-hover:scale-x-100"></div>
              </div>
              
              <div className="flex items-center mb-6">
                {item.icon}
                <h3 className="text-xl font-bold text-gray-900 ml-3">{item.title}</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Conclusion Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="relative bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-12 text-center text-white"
      >
        <div className="absolute top-0 left-0 w-16 h-16 pointer-events-none">
          <div className="absolute top-0 left-0 w-0.5 h-8 bg-white/30"></div>
          <div className="absolute top-0 left-0 h-0.5 w-8 bg-white/30"></div>
        </div>
        <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none">
          <div className="absolute top-0 right-0 w-0.5 h-8 bg-white/30"></div>
          <div className="absolute top-0 right-0 h-0.5 w-8 bg-white/30"></div>
        </div>
        <div className="absolute bottom-0 left-0 w-16 h-16 pointer-events-none">
          <div className="absolute bottom-0 left-0 w-0.5 h-8 bg-white/30"></div>
          <div className="absolute bottom-0 left-0 h-0.5 w-8 bg-white/30"></div>
        </div>
        <div className="absolute bottom-0 right-0 w-16 h-16 pointer-events-none">
          <div className="absolute bottom-0 right-0 w-0.5 h-8 bg-white/30"></div>
          <div className="absolute bottom-0 right-0 h-0.5 w-8 bg-white/30"></div>
        </div>

        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Conclusion</h2>
          <p className="text-white/90 text-lg mb-8 leading-relaxed">
            From start to finish, we make packaging simple and efficient. Trusted by top Indian brands, our solutions save time, reduce labour, and deliver consistent quality across industries. Whatever you pack, Infinity helps you do it smarter.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold hover:bg-gray-100 transition-colors group"
            >
              Get Industry-Specific Solution
              <svg className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
            <a
              href="/products"
              className="inline-flex items-center px-8 py-4 border border-white/30 text-white font-semibold hover:border-white hover:bg-white/10 transition-colors"
            >
              Explore Our Products
            </a>
          </div>
        </div>
      </motion.div>
    </PageContainer>
  );
}