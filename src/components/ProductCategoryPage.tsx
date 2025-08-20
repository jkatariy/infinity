'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import PageContainer from './PageContainer';
import ProductSelector from './ProductSelector';

// Category-specific color schemes (elegant, professional colors)
const categoryColors = {
  'bundling-wrapping': {
    accent: '#4F46E5', // Indigo
    light: '#EEF2FF',
    medium: '#E0E7FF'
  },
  'pouch-baler': {
    accent: '#0891B2', // Cyan
    light: '#ECFEFF',
    medium: '#CFFAFE'
  },
  'cartoning': {
    accent: '#059669', // Emerald
    light: '#ECFDF5',
    medium: '#D1FAE5'
  },
  'case-packers': {
    accent: '#9333EA', // Purple
    light: '#F3E8FF',
    medium: '#E9D5FF'
  },
  'checkweighers': {
    accent: '#0EA5E9', // Sky
    light: '#F0F9FF',
    medium: '#E0F2FE'
  },
  'checkweighers-inspection': {
    accent: '#DC2626', // Red
    light: '#FEF2F2',
    medium: '#FEE2E2'
  },
  'inspection': {
    accent: '#DC2626', // Red
    light: '#FEF2F2',
    medium: '#FEE2E2'
  },
  'conveying': {
    accent: '#2563EB', // Blue
    light: '#EFF6FF',
    medium: '#DBEAFE'
  }
} as const;

type CategoryKey = keyof typeof categoryColors;

const getColorScheme = (category: string) => {
  const key = category as CategoryKey;
  return categoryColors[key] || categoryColors['bundling-wrapping'];
};

// Model interface
interface ProductModel {
  name: string;
  title: string;
  subtitle?: string;
  href: string;
  image: string;
  highlight?: string;
}

// Complete model mapping for all categories
const allModels: Record<string, ProductModel[]> = {
  'bundling-wrapping': [
    { name: 'IBP-120', title: 'IBP-120 High-Speed Secondary Packaging Machine', subtitle: 'Single Pouches 50g-200g', href: '/products/bundling-wrapping/ibp-120', image: 'https://res.cloudinary.com/dbogkgabu/image/upload/v1755098775/hjmnoiqzl3fosroitm4q.png', highlight: 'Most Popular' },
    { name: 'IBS-200', title: 'IBS-200 High-Speed Secondary Packaging Machine', subtitle: 'Strips of Pouches 50g-200g', href: '/products/bundling-wrapping/ibs-200', image: 'https://res.cloudinary.com/dbogkgabu/image/upload/v1755098781/vmqgtzrzrbs8jiekt61w.png', highlight: 'Strip Processing' },
    { name: 'ISP-120', title: 'ISP-120 Automatic Shrink Wrapping Machine', subtitle: 'Professional Secondary Packaging', href: '/products/bundling-wrapping/isp-120', image: 'https://res.cloudinary.com/dbogkgabu/image/upload/v1755098781/vmqgtzrzrbs8jiekt61w.png', highlight: 'Premium Wrapping' },
    { name: 'IMS-800/600', title: 'IMS-800/600 Automated Secondary Packaging', subtitle: 'Multitrack VFFS Systems', href: '/products/bundling-wrapping/ims-800', image: 'https://res.cloudinary.com/dbogkgabu/image/upload/v1755098781/vmqgtzrzrbs8jiekt61w.png', highlight: 'Multi-Track' },
    { name: 'IWB-200', title: 'IWB-200 Automatic Shrink Wrapping Machine', subtitle: 'Bottles & Rigid Containers', href: '/products/bundling-wrapping/iwb-200', image: 'https://res.cloudinary.com/dbogkgabu/image/upload/v1755098781/vmqgtzrzrbs8jiekt61w.png', highlight: 'Bottle Wrapping' },
    { name: 'ISB-120', title: 'ISB-120 Shrink Wrapping for Bottles', subtitle: 'Rigid Products & PET Bottles', href: '/products/bundling-wrapping/isb-120', image: 'https://res.cloudinary.com/dbogkgabu/image/upload/v1755098781/vmqgtzrzrbs8jiekt61w.png', highlight: 'High-Speed' }
  ],
  'pouch-baler': [
    { name: 'IBL-500', title: 'IBL-500 Automatic Baler Machine for Pouches', subtitle: 'Large Pouches 200g-2kg', href: '/products/pouch-baler/ibl-500', image: 'https://res.cloudinary.com/dbogkgabu/image/upload/v1755098786/q9cecrkqu85kbd95t05o.png', highlight: 'High Volume' },
    { name: 'IBG-H8', title: 'IBG-H8 Automatic Bagging Machine', subtitle: 'Horizontal Model 0.2kg-5kg', href: '/products/pouch-baler/ibg-h8-v8', image: 'https://res.cloudinary.com/dbogkgabu/image/upload/v1755098777/pzq3lbtsywtsrulw5xgp.png', highlight: 'Horizontal' },
    { name: 'IBG-V8', title: 'IBG-V8 Automatic Bagging Machine', subtitle: 'Vertical Model 0.2kg-5kg', href: '/products/pouch-baler/ibg-h8-v8', image: 'https://res.cloudinary.com/dbogkgabu/image/upload/v1755098788/fycdkeggbzabb7ngmdje.jpg', highlight: 'Vertical' }
  ],
  'cartoning': [
    { name: 'ACM-100', title: 'ACM-100 Automatic Cartoning Machine', href: '/products/cartoning/acm-100', image: 'https://res.cloudinary.com/dbogkgabu/image/upload/v1755098774/sqcbuioldiwnkfxjxo3l.png', highlight: 'Continuous Motion' },
    { name: 'ACM-40', title: 'ACM-40 Semi Automatic Cartoning Machine', href: '/products/cartoning/acm-40', image: 'https://res.cloudinary.com/dbogkgabu/image/upload/v1755098784/qhdjxx3v1xynhdhzrj1e.png', highlight: 'Semi-Automatic' }
  ],
  'case-packers': [
    { name: 'ICP-120', title: 'ICP-120 Automated Case Packer for Pouches', href: '/products/case-packers/icp-120', image: 'https://res.cloudinary.com/dbogkgabu/image/upload/v1755098778/icqycnzcjm2caqhemj5x.png', highlight: 'Automated' },
    { name: 'ICS-200', title: 'ICS-200 Automated Case Packer for Strip Pouches', href: '/products/case-packers/ics-200', image: 'https://res.cloudinary.com/dbogkgabu/image/upload/v1755098778/icqycnzcjm2caqhemj5x.png', highlight: 'Strip Processing' },
    { name: 'ICP-B200', title: 'ICP-B200 Automated Case Packer for Bottles', href: '/products/case-packers/icp-b200', image: 'https://res.cloudinary.com/dbogkgabu/image/upload/v1755098778/icqycnzcjm2caqhemj5x.png', highlight: 'Bottle Packing' },
    { name: 'Case Erector', title: 'Automatic Case Erectors', href: '/products/case-packers/case-erector', image: 'https://res.cloudinary.com/dbogkgabu/image/upload/v1755098774/nu2tjyq4jfbjxoeisycb.png', highlight: 'Case Formation' },
    { name: 'Case Sealer', title: 'Automatic Case Sealers', href: '/products/case-packers/case-sealer', image: 'https://res.cloudinary.com/dbogkgabu/image/upload/v1755098775/lphxuwk9yeykyaojtmxx.png', highlight: 'Sealing' }
  ],
  'checkweighers': [
    { name: 'ICW-600', title: 'ICW-600 Precision Checkweigher', subtitle: 'Light Duty 50g-600g', href: '/products/checkweighers/icw-600', image: 'https://res.cloudinary.com/dbogkgabu/image/upload/v1755098780/ojxj2meqqjouthgdbncd.png', highlight: 'Light Duty' },
    { name: 'ICW-1200', title: 'ICW-1200 Standard Checkweigher', subtitle: 'Standard 600g-1200g', href: '/products/checkweighers/icw-1200', image: 'https://res.cloudinary.com/dbogkgabu/image/upload/v1755098779/nsj6z12d9kqpgeklswgq.png', highlight: 'Standard' },
    { name: 'ICW-6000', title: 'ICW-6000 Heavy Duty Checkweigher', subtitle: 'Heavy Duty 1.2kg-6kg', href: '/products/checkweighers/icw-6000', image: 'https://res.cloudinary.com/dbogkgabu/image/upload/v1755098779/nsj6z12d9kqpgeklswgq.png', highlight: 'Heavy Duty' },
    { name: 'ICW-25K', title: 'ICW-25K Industrial Checkweigher', subtitle: 'Industrial 6kg-25kg', href: '/products/checkweighers/icw-25k', image: 'https://res.cloudinary.com/dbogkgabu/image/upload/v1755098779/nsj6z12d9kqpgeklswgq.png', highlight: 'Industrial' },
    { name: 'ICW-50K', title: 'ICW-50K Extra Heavy Checkweigher', subtitle: 'Extra Heavy 25kg-50kg', href: '/products/checkweighers/icw-50k', image: 'https://res.cloudinary.com/dbogkgabu/image/upload/v1755098779/nsj6z12d9kqpgeklswgq.png', highlight: 'Extra Heavy' }
  ],
  'checkweighers-inspection': [
    { name: 'ICW-600', title: 'ICW-600 Precision Checkweigher', href: '/products/checkweighers-inspection', image: 'https://res.cloudinary.com/dbogkgabu/image/upload/v1755098780/ojxj2meqqjouthgdbncd.png', highlight: 'Light Duty' },
    { name: 'ICW-1200', title: 'ICW-1200 Standard Checkweigher', href: '/products/checkweighers-inspection', image: 'https://res.cloudinary.com/dbogkgabu/image/upload/v1755098779/nsj6z12d9kqpgeklswgq.png', highlight: 'Standard' },
    { name: 'ICW-6000', title: 'ICW-6000 Heavy Duty Checkweigher', href: '/products/checkweighers-inspection', image: 'https://res.cloudinary.com/dbogkgabu/image/upload/v1755098779/nsj6z12d9kqpgeklswgq.png', highlight: 'Heavy Duty' },
    { name: 'ICW-25K', title: 'ICW-25K Industrial Checkweigher', href: '/products/checkweighers-inspection', image: 'https://res.cloudinary.com/dbogkgabu/image/upload/v1755098779/nsj6z12d9kqpgeklswgq.png', highlight: 'Industrial' },
    { name: 'ICW-50K', title: 'ICW-50K Extra Heavy Checkweigher', href: '/products/checkweighers-inspection', image: 'https://res.cloudinary.com/dbogkgabu/image/upload/v1755098779/nsj6z12d9kqpgeklswgq.png', highlight: 'Extra Heavy' },
    { name: 'Vision Pro', title: 'Vision Pro Standard', href: '/products/checkweighers-inspection', image: 'https://res.cloudinary.com/dbogkgabu/image/upload/v1755098783/eyabelg0f9lzx5kl5hms.png', highlight: 'AI Technology' },
    { name: 'Vision Compact', title: 'Vision Compact', href: '/products/checkweighers-inspection', image: 'https://res.cloudinary.com/dbogkgabu/image/upload/v1755098783/eyabelg0f9lzx5kl5hms.png', highlight: 'Compact' }
  ],
  'conveying': [
    { name: 'Flat Belt', title: 'Flat Belt Conveyor', subtitle: 'Versatile Product Transfer and Connection System', href: '/products/conveying', image: 'https://res.cloudinary.com/dbogkgabu/image/upload/v1755098776/q3pwiyd6fgtpsmtfzk7x.png', highlight: 'Versatile' },
    { name: 'Modular', title: 'Modular Conveyor', subtitle: 'High-Capacity Interlocked Plastic Segment Conveyor', href: '/products/conveying', image: 'https://res.cloudinary.com/dbogkgabu/image/upload/v1755098787/bavrvl5lxecse2d4nsl6.png', highlight: 'Modular' },
    { name: 'Roller', title: 'Roller Conveyor', subtitle: 'Power Roller Conveyor for High-End Automation', href: '/products/conveying', image: 'https://res.cloudinary.com/dbogkgabu/image/upload/v1755098782/qxhnotoahwot8qbmshvi.png', highlight: 'Heavy Duty' },
    { name: 'Compression', title: 'Compression Conveyor', subtitle: 'Air Removal and Pouch Flattening System', href: '/products/conveying', image: 'https://res.cloudinary.com/dbogkgabu/image/upload/v1755098775/mujhcs3birsdowgnofjw.png', highlight: 'Compact' },
    { name: 'Spiral', title: 'Spiral Conveyor', subtitle: 'Space-Efficient Gravity-Driven Conveying Solution', href: '/products/conveying', image: 'https://res.cloudinary.com/dbogkgabu/image/upload/v1755098782/yzhxpcgteq0sl0rc6ugd.png', highlight: 'Vertical' },
    { name: 'Z-Bucket', title: 'Z Type Bucket Elevator', subtitle: 'Silent Operation Vertical Conveying Solution', href: '/products/conveying', image: 'https://res.cloudinary.com/dbogkgabu/image/upload/v1755098783/ca3y8dxlglvf3wrivxlz.png', highlight: 'Lifting' },
    { name: 'Crate Lifter', title: 'Vertical Crate Lifter', subtitle: 'Vertical Material Transfer Solution', href: '/products/conveying', image: 'https://res.cloudinary.com/dbogkgabu/image/upload/v1755178597/hgmojw4whm9xyqvuqjao.png', highlight: 'Container' },
    { name: 'Box Lifter', title: 'Box Lifter System', subtitle: 'High-Speed Vertical Material Transfer Solution', href: '/products/conveying', image: 'https://res.cloudinary.com/dbogkgabu/image/upload/v1755178596/lofywz27dqkb595tfhkd.png', highlight: 'Automated' }
  ]
} as const;

interface ProductCategoryPageProps {
  title: string;
  category: string;
  description?: string;
}

export default function ProductCategoryPage({
  title,
  category,
  description
}: ProductCategoryPageProps) {
  const colors = getColorScheme(category);
  const router = useRouter();

  // Get all models for this category
  const categoryModels = allModels[category as keyof typeof allModels] || [];

  return (
    <PageContainer title={title} subtitle="" hideTitle={true}>
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(45deg, ${colors.accent}15 25%, transparent 25%), linear-gradient(-45deg, ${colors.accent}15 25%, transparent 25%)`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          {/* Product Badge */}
          <div className="flex items-center justify-center mb-6">
            <div 
              className="inline-flex items-center px-6 py-2 rounded-full text-sm font-medium"
              style={{ 
                backgroundColor: colors.light,
                color: colors.accent,
                border: `1px solid ${colors.accent}20`
              }}
            >
              <span className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: colors.accent }}></span>
              {category.replace('-', ' ').toUpperCase()} SERIES
            </div>
          </div>

          <div className="mx-auto max-w-7xl space-y-8">
            {/* Product Selector */}
            <div className="relative">
              <ProductSelector currentProduct={title} />
              <div 
                className="absolute -top-2 left-0 h-0.5 w-32"
                style={{ backgroundColor: `${colors.accent}33` }}
              ></div>
            </div>

            {/* Optional Description */}
            {description && (
              <div className="space-y-4">
                <div 
                  className="group relative rounded-xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:shadow-lg"
                  style={{ borderColor: `${colors.accent}15` }}
                >
                  {/* Engineering corner accents */}
                  <div 
                    className="absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 transition-all duration-300 group-hover:h-4 group-hover:w-4"
                    style={{ borderColor: colors.accent }}
                  ></div>
                  <div 
                    className="absolute right-0 top-0 h-3 w-3 border-r-2 border-t-2 transition-all duration-300 group-hover:h-4 group-hover:w-4"
                    style={{ borderColor: colors.accent }}
                  ></div>
                  <div 
                    className="absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 transition-all duration-300 group-hover:h-4 group-hover:w-4"
                    style={{ borderColor: colors.accent }}
                  ></div>
                  <div 
                    className="absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 transition-all duration-300 group-hover:h-4 group-hover:w-4"
                    style={{ borderColor: colors.accent }}
                  ></div>
                  
                  <p className="text-lg leading-relaxed text-gray-900 font-medium">{description}</p>
                </div>
              </div>
            )}

            {/* Models Catalog */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                  <div 
                    className="w-8 h-8 rounded-lg mr-3 flex items-center justify-center"
                    style={{ backgroundColor: colors.light }}
                  >
                    <svg className="h-5 w-5" style={{ color: colors.accent }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  Available Models ({categoryModels.length})
                </h2>
                <div className="text-sm text-gray-500">
                  Click any model to view details
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryModels.map((model, index) => (
                  <motion.div
                    key={model.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    onClick={() => router.push(model.href)}
                    className="group cursor-pointer relative rounded-xl border border-gray-200 bg-white transition-all duration-200 hover:bg-gray-50 hover:shadow-lg hover:scale-[1.02]"
                    style={{ borderColor: `${colors.accent}15` }}
                  >
                    {/* Engineering corner accents */}
                    <div 
                      className="absolute left-0 top-0 h-2 w-2 border-l-2 border-t-2 transition-all duration-300 group-hover:h-3 group-hover:w-3"
                      style={{ borderColor: colors.accent }}
                    ></div>
                    <div 
                      className="absolute right-0 bottom-0 h-2 w-2 border-r-2 border-b-2 transition-all duration-300 group-hover:h-3 group-hover:w-3"
                      style={{ borderColor: colors.accent }}
                    ></div>
                    
                    {/* Model image with highlight badge */}
                    <div className="aspect-[4/3] bg-gray-50 rounded-t-xl flex items-center justify-center relative overflow-hidden">
                      {model.highlight && (
                        <div className="absolute top-3 right-3 z-10">
                          <div 
                            className="px-2 py-1 rounded-full text-xs font-semibold text-white"
                            style={{ backgroundColor: colors.accent }}
                          >
                            {model.highlight}
                          </div>
                        </div>
                      )}
                      
                      {/* Product Image */}
                      {model.image ? (
                        <div className="w-full h-full relative group-hover:scale-105 transition-transform duration-300">
                          <Image
                            src={model.image}
                            alt={model.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            onError={(e) => {
                              // Fallback to icon if image fails to load
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              const parent = target.parentElement;
                              if (parent) {
                                const fallback = parent.querySelector('.image-fallback') as HTMLElement;
                                if (fallback) fallback.style.display = 'flex';
                              }
                            }}
                          />
                        </div>
                      ) : null}
                      
                      {/* Fallback icon if no image or image fails to load */}
                      <div 
                        className={`image-fallback w-16 h-16 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ${model.image ? 'hidden' : ''}`}
                        style={{ backgroundColor: colors.light }}
                      >
                        <svg className="h-8 w-8" style={{ color: colors.accent }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                      </div>
                    </div>
                    
                    {/* Model info */}
                    <div className="p-6 space-y-4">
                      <div>
                        <div 
                          className="text-lg font-bold transition-colors duration-200 group-hover:text-gray-700 mb-1"
                          style={{ color: colors.accent }}
                        >
                          {model.name}
                        </div>
                        <div className="text-sm text-gray-900 font-medium leading-tight mb-2">
                          {model.title}
                        </div>
                        {model.subtitle && (
                          <div className="text-xs text-gray-500 bg-gray-50 px-3 py-1.5 rounded-lg inline-block">
                            {model.subtitle}
                          </div>
                        )}
                      </div>
                      
                      {/* Action indicator */}
                      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <div className="text-sm font-semibold" style={{ color: colors.accent }}>
                          View Details
                        </div>
                        <div className="opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200">
                          <svg className="h-5 w-5" style={{ color: colors.accent }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </PageContainer>
  );
} 