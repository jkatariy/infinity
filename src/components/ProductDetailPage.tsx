'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import PageContainer from './PageContainer';
import StructuredData, { generateProductSchema, generateBreadcrumbSchema } from './StructuredData';

import WatchDemo from './WatchDemo';
import ShareProduct from './ShareProduct';
import ZohoCRMForm from './ZohoCRMForm';

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

// Complete model mapping for all categories
const allModels = {
  'bundling-wrapping': [
    { name: 'IBP-120', title: 'IBP-120 High Speed Bundler', href: '/products/bundling-wrapping/ibp-120', image: 'https://res.cloudinary.com/dbogkgabu/image/upload/v1755098775/hjmnoiqzl3fosroitm4q.png' },
    { name: 'IBS-200', title: 'IBS-200 Strip Packaging Machine', href: '/products/bundling-wrapping/ibs-200', image: '/images/products/bundling-wrapping/ibs-200.jpg' },
    { name: 'ISP-120', title: 'ISP-120 Shrink Wrapping for Pouches', href: '/products/bundling-wrapping/isp-120', image: '/images/products/bundling-wrapping/isp-120.jpg' },
    { name: 'IMS-800', title: 'IMS-800/600 Multitrack VFFS Integration', href: '/products/bundling-wrapping/ims-800', image: '/images/products/bundling-wrapping/ims-800.jpg' },
    { name: 'IWB-200', title: 'IWB-200 Shrink Wrapping for Bottles', href: '/products/bundling-wrapping/iwb-200', image: 'https://res.cloudinary.com/dbogkgabu/image/upload/v1755098781/vmqgtzrzrbs8jiekt61w.png' },
    { name: 'ISB-120', title: 'ISB-120 Shrink Wrapping for Bottles', href: '/products/bundling-wrapping/isb-120', image: '/images/products/bundling-wrapping/isb-120.jpg' }
  ],
  'pouch-baler': [
    { name: 'IBL-500', title: 'IBL-500 Automatic Baler', href: '/products/pouch-baler/ibl-500', image: 'https://res.cloudinary.com/dbogkgabu/image/upload/v1755098786/q9cecrkqu85kbd95t05o.png' },
    { name: 'IBG-8', title: 'IBG-8 Bagging Machine', href: '/products/pouch-baler/ibg-8', image: '/images/products/pouch-baler/ibg-8.jpg' },
    { name: 'IBG-H8-V8', title: 'IBG-H8 & IBG-V8 Bagging Machines', href: '/products/pouch-baler/ibg-h8-v8', image: 'https://res.cloudinary.com/dbogkgabu/image/upload/v1755098788/fycdkeggbzabb7ngmdje.jpg' }
  ],
  'cartoning': [
    { name: 'ACM-100', title: 'ACM-100 Automatic Cartoning Machine', href: '/products/cartoning/acm-100', image: 'https://res.cloudinary.com/dbogkgabu/image/upload/v1755098774/sqcbuioldiwnkfxjxo3l.png' },
    { name: 'ACM-40', title: 'ACM-40 Semi-Automatic Cartoning Machine', href: '/products/cartoning/acm-40', image: 'https://res.cloudinary.com/dbogkgabu/image/upload/v1755098784/qhdjxx3v1xynhdhzrj1e.png' }
  ],
  'case-packers': [
    { name: 'ICP-120', title: 'ICP-120 Robotic Case Packer for Pouches', href: '/products/case-packers/icp-120', image: '/images/products/case-packers/icp-120.jpg' },
    { name: 'ICS-200', title: 'ICS-200 Case Packer for Strip of Pouches', href: '/products/case-packers/ics-200', image: 'https://res.cloudinary.com/dbogkgabu/image/upload/v1755098778/icqycnzcjm2caqhemj5x.png' },
    { name: 'ICB-120', title: 'ICB-120 Case Packer for Bottles', href: '/products/case-packers/icb-120', image: '/images/products/case-packers/icb-120.jpg' },
    { name: 'Case Erector', title: 'Automatic Case Erector', href: '/products/case-packers/case-erector', image: 'https://res.cloudinary.com/dbogkgabu/image/upload/v1755098774/nu2tjyq4jfbjxoeisycb.png' },
    { name: 'Case Sealer', title: 'Automatic Case Sealer', href: '/products/case-packers/case-sealer', image: 'https://res.cloudinary.com/dbogkgabu/image/upload/v1755098775/lphxuwk9yeykyaojtmxx.png' }
  ],
  'checkweighers-inspection': [
    { name: 'ICW-600', title: 'ICW-600 Light Duty Checkweigher', href: '/products/checkweighers-inspection', image: 'https://res.cloudinary.com/dbogkgabu/image/upload/v1755098780/ojxj2meqqjouthgdbncd.png' },
    { name: 'ICW-1200', title: 'ICW-1200 Standard Checkweigher', href: '/products/checkweighers-inspection', image: 'https://res.cloudinary.com/dbogkgabu/image/upload/v1755098779/nsj6z12d9kqpgeklswgq.png' },
    { name: 'ICW-6000', title: 'ICW-6000 Heavy Duty Checkweigher', href: '/products/checkweighers-inspection', image: '/images/products/checkweighers/icw-6000.jpg' },
    { name: 'ICW-25K', title: 'ICW-25K Industrial Checkweigher', href: '/products/checkweighers-inspection', image: 'https://res.cloudinary.com/dbogkgabu/image/upload/v1755098779/to7gc0wb5jq8dzm3bojs.png' },
    { name: 'ICW-50K', title: 'ICW-50K Extra Heavy Checkweigher', href: '/products/checkweighers-inspection', image: 'https://res.cloudinary.com/dbogkgabu/image/upload/v1755098779/qwdbgrhu0duvwvui6i3t.png' },
    { name: 'Vision Pro', title: 'Vision Pro Standard', href: '/products/checkweighers-inspection', image: 'https://res.cloudinary.com/dbogkgabu/image/upload/v1755098783/eyabelg0f9lzx5kl5hms.png' },
    { name: 'Vision Compact', title: 'Vision Compact', href: '/products/checkweighers-inspection', image: 'https://res.cloudinary.com/dbogkgabu/image/upload/v1755098783/eyabelg0f9lzx5kl5hms.png' }
  ],
  'conveying': [
    { name: 'Flat Belt', title: 'Flat Belt Conveyor', href: '/products/conveying', image: 'https://res.cloudinary.com/dbogkgabu/image/upload/v1755098776/q3pwiyd6fgtpsmtfzk7x.png' },
    { name: 'Modular', title: 'Modular Conveyor', href: '/products/conveying', image: 'https://res.cloudinary.com/dbogkgabu/image/upload/v1755098787/bavrvl5lxecse2d4nsl6.png' },
    { name: 'Roller', title: 'Roller Conveyor', href: '/products/conveying', image: 'https://res.cloudinary.com/dbogkgabu/image/upload/v1755098782/qxhnotoahwot8qbmshvi.png' },
    { name: 'Compression', title: 'Compression Conveyor', href: '/products/conveying', image: 'https://res.cloudinary.com/dbogkgabu/image/upload/v1755098775/mujhcs3birsdowgnofjw.png' },
    { name: 'Z-Bucket', title: 'Z Type Bucket Elevator', href: '/products/conveying', image: 'https://res.cloudinary.com/dbogkgabu/image/upload/v1755098783/ca3y8dxlglvf3wrivxlz.png' },
    { name: 'Crate Lifter', title: 'Vertical Crate Lifter', href: '/products/conveying', image: '/images/products/conveying/crate-lifter.jpg' },
    { name: 'Box Lifter', title: 'Box Lifter', href: '/products/conveying', image: '/images/products/conveying/box-lifter.jpg' },
    { name: 'Spiral', title: 'Spiral Conveyor', href: '/products/conveying', image: 'https://res.cloudinary.com/dbogkgabu/image/upload/v1755098782/yzhxpcgteq0sl0rc6ugd.png' }
  ]
} as const;

interface Specification {
  label: string;
  value: string;
}

interface Feature {
  title: string;
  description: string;
  icon: string;
}

interface Model {
  name: string;
  specifications: Specification[];
  description?: string;
  features?: string[];
}

interface ModelSelectorProps {
  selectedModel: string;
  setSelectedModel: (model: string) => void;
  models: Record<string, any>;
  currentModel: any;
}

interface ProductDetailPageProps {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  features: Feature[];
  models: Model[];
  applications: string[];
  category: string;
  image: string;
  slug: string;
  videoId?: string;
  videoIds?: string[];
  specifications?: Specification[];
  keyFeatures?: string[];
  technicalData?: {
    performance: { label: string; value: string; unit?: string }[];
    dimensions: { label: string; value: string; unit?: string }[];
    power: { label: string; value: string; unit?: string }[];
    components?: { label: string; value: string; unit?: string }[];
  };
  certifications?: string[];
  modelSelector?: ModelSelectorProps;
}

export default function ProductDetailPage({
  id,
  title,
  subtitle,
  description,
  features,
  models,
  applications,
  category,
  image,
  slug,
  videoId,
  videoIds,
  specifications = [],
  keyFeatures = [],
  technicalData,
  certifications = ['ISO 9001:2015'],
  modelSelector
}: ProductDetailPageProps) {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [selectedModelIndex, setSelectedModelIndex] = useState(0);
  const colors = getColorScheme(category);
  const router = useRouter();

  // Get all models for this category
  const categoryModels = allModels[category as keyof typeof allModels] || [];
  


  const handleGetQuote = () => {
    setShowQuoteForm(true);
  };

  const handleWatchVideo = () => {
    if (videoId) {
      setShowVideoModal(true);
    } else {
      window.open('/contact?demo=true', '_blank');
    }
  };

  const performanceMetrics = technicalData?.performance || [];
  const dimensionsData = technicalData?.dimensions || [];
  const powerData = technicalData?.power || [];

  // Ensure only ISO certifications are shown across all product pages
  const effectiveCertifications = (() => {
    const isoOnly = (certifications || []).filter((c) => /iso/i.test(c));
    return isoOnly.length > 0 ? isoOnly : ['ISO 9001:2015'];
  })();

  // Determine if there are any specifications or technical data to show the tab
  const hasSpecifications = (
    (technicalData && (
      (technicalData.performance && technicalData.performance.length > 0) ||
      (technicalData.dimensions && technicalData.dimensions.length > 0) ||
      (technicalData.power && technicalData.power.length > 0)
    )) ||
    (specifications && specifications.length > 0)
  );

  // Generate structured data
  const productData = {
    id,
    title,
    description,
    image,
    category,
    slug,
    specifications,
    applications
  };

  const breadcrumbs = [
    { name: 'Home', url: 'https://infinitysols.com' },
    { name: 'Solutions', url: 'https://infinitysols.com/products' },
    { name: category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()), url: `https://infinitysols.com/products/${category}` },
    { name: title, url: `https://infinitysols.com/${slug}` }
  ];

  return (
    <PageContainer title={title} subtitle={subtitle} hideTitle={true}>
      {/* Structured Data */}
      <StructuredData type="Product" data={generateProductSchema(productData)} />
      <StructuredData type="BreadcrumbList" data={generateBreadcrumbSchema(breadcrumbs)} />
      {/* Enhanced Hero Section with Featured Model Showcase */}
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
              className="inline-flex items-center px-6 py-2 rounded-full text-sm font-semibold tracking-wide"
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

          {/* Hero Title Section - World-Class Typography */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-center mb-12"
          >
            {/* Main Product Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-gray-900 mb-6 tracking-tight leading-[0.95] bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
              <span className="block font-light text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-gray-600 mb-2 tracking-normal">
                {title.split(' ').slice(0, -1).join(' ')}
              </span>
              <span className="font-black" style={{ color: colors.accent }}>
                {title.split(' ').slice(-1)[0]}
              </span>
            </h1>
            
            {/* Subtitle with Enhanced Typography */}
            <p className="text-xl sm:text-2xl lg:text-3xl text-gray-600 font-light leading-relaxed tracking-wide max-w-4xl mx-auto">
              {subtitle}
            </p>
            
            {/* Elegant Divider */}
            <div className="flex items-center justify-center mt-8">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-gray-300"></div>
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: colors.accent }}
                ></div>
                <div className="w-24 h-0.5" style={{ backgroundColor: colors.accent }}></div>
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: colors.accent }}
                ></div>
                <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-gray-300"></div>
              </div>
            </div>
          </motion.div>

          <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 lg:flex-row lg:gap-8">
            {/* Left: Content */}
            <div className="flex-1 space-y-4">


              {/* Category Overview */}
              <div className="space-y-6">
                <div 
                  className="group relative rounded-2xl border border-gray-200 bg-white p-8 transition-all duration-300 hover:shadow-lg"
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
                  
                  <p className="text-lg sm:text-xl leading-relaxed text-gray-700 font-normal">{description}</p>
                </div>


              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleGetQuote}
                  className="relative overflow-hidden rounded-xl px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl"
                  style={{ 
                    backgroundColor: colors.accent,
                    boxShadow: `0 4px 14px 0 ${colors.accent}40`
                  }}
                >
                  <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 hover:opacity-10"></div>
                  <div className="relative flex items-center justify-center space-x-2">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>Get Quote</span>
                  </div>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleWatchVideo}
                  className="relative overflow-hidden rounded-xl bg-gray-900 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:bg-gray-800 hover:shadow-xl"
                >
                  <div className="absolute inset-0 bg-white opacity-0 transition-opacity duration-300 hover:opacity-10"></div>
                  <div className="relative flex items-center justify-center space-x-2">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293H15M9 10v4a2 2 0 002 2h2a2 2 0 002-2v-4M9 10V9a2 2 0 012-2h2a2 2 0 012 2v1" />
                    </svg>
                    <span>Watch Demo</span>
                  </div>
                </motion.button>

                <ShareProduct
                  title={title}
                  description={description}
                  url={typeof window !== 'undefined' ? window.location.href : `/${slug}`}
                  colors={colors}
                  hideQuoteButton={true}
                />
              </div>

              {/* Certifications */}
              {effectiveCertifications.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="rounded-xl border bg-white p-4 shadow-sm mt-4"
                  style={{ borderColor: `${colors.accent}15` }}
                >
                  <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                    <svg className="h-4 w-4 mr-2" style={{ color: colors.accent }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Certifications
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {effectiveCertifications.map((cert, index) => (
                      <div
                        key={index}
                        className="text-center p-2 rounded-lg border border-gray-200 bg-gray-50 text-xs font-medium text-gray-700"
                      >
                        {cert}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Right: Product Image */}
            <div className="w-full lg:w-[450px] space-y-3">
              {/* Main Product Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="group relative aspect-[4/3] overflow-hidden bg-white"
              >
                <Image
                  src={image}
                  alt={title}
                  fill
                  className="object-contain transition-transform duration-300 group-hover:scale-105"
                  priority
                />
              </motion.div>

              {/* Quick Model Access */}
              {categoryModels.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="rounded-xl border bg-white p-4 shadow-sm"
                  style={{ borderColor: `${colors.accent}15` }}
                >
                  <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                    <svg className="h-4 w-4 mr-2" style={{ color: colors.accent }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    Quick Model Access
                  </h3>
                  {/* Responsive grid: single column on mobile, 2 columns on larger screens */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                    {categoryModels.slice(0, 4).map((model, index) => (
                      <button
                        key={model.href}
                        onClick={() => router.push(model.href)}
                        className="text-left p-3 rounded-lg border border-gray-200 bg-gray-50 hover:bg-white hover:shadow-sm transition-all duration-200 text-sm w-full"
                      >
                        <div className="font-medium text-gray-900 truncate">{model.name}</div>
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => router.push('/products')}
                    className="w-full py-3 px-4 rounded-lg border-2 transition-all duration-300 font-medium text-sm flex items-center justify-center space-x-2"
                    style={{ 
                      borderColor: colors.accent,
                      color: colors.accent
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = colors.accent;
                      e.currentTarget.style.color = 'white';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = colors.accent;
                    }}
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    <span>Explore More Models</span>
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Watch Demo Video Section - Clean, Harmonious Layout */}
      {(videoIds && videoIds.length > 0) || videoId ? (
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="my-8"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative">
              {/* Subtle accent bar */}
              <div className="absolute left-0 top-0 w-24 h-1 rounded-full" style={{ backgroundColor: colors.accent, opacity: 0.18 }}></div>
              {/* Engineering accent: top-left and bottom-right only */}
              <div className="absolute -top-3 -left-3 w-7 h-7 border-t-4 border-l-4 rounded-tl-xl" style={{ borderColor: colors.accent }}></div>
              <div className="absolute -bottom-3 -right-3 w-7 h-7 border-b-4 border-r-4 rounded-br-xl" style={{ borderColor: colors.accent }}></div>
              <div className="bg-white rounded-2xl shadow-lg px-0 py-0 sm:px-6 sm:py-6">
                {videoIds && videoIds.length >= 2 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {videoIds.slice(0, 2).map((vid) => (
                      <div key={vid} className="w-full flex justify-center">
                        <div className="max-w-xl w-full">
                          <WatchDemo videoId={vid} title={title} hideTitle={true} />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col md:flex-row md:items-center md:gap-12">
                    <div className="w-full flex justify-center">
                      <div className="max-w-2xl w-full">
                        <WatchDemo videoId={videoId} title={title} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.section>
      ) : null}

      {/* Model Selector Section - Below Video */}
      {modelSelector && (
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="my-8"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative">
              {/* Subtle accent bar */}
              <div className="absolute left-0 top-0 w-24 h-1 rounded-full" style={{ backgroundColor: colors.accent, opacity: 0.18 }}></div>
              {/* Engineering accent: top-left and bottom-right only */}
              <div className="absolute -top-3 -left-3 w-7 h-7 border-t-4 border-l-4 rounded-tl-xl" style={{ borderColor: colors.accent }}></div>
              <div className="absolute -bottom-3 -right-3 w-7 h-7 border-b-4 border-r-4 rounded-br-xl" style={{ borderColor: colors.accent }}></div>
              <div className="bg-white rounded-2xl shadow-lg px-6 py-6">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Select ICW Model</h3>
                  <p className="text-gray-600">Choose from our complete range of dynamic checkweighers</p>
                </div>
                
                <div className="flex flex-col lg:flex-row items-center justify-center gap-6">
                  <div className="flex-1 max-w-md">
                    <label htmlFor="model-select" className="block text-sm font-semibold text-gray-700 mb-3">
                      Choose Model:
                    </label>
                    <select
                      id="model-select"
                      value={modelSelector.selectedModel}
                      onChange={(e) => modelSelector.setSelectedModel(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 text-sm shadow-sm transition-all duration-200"
                    >
                      {Object.entries(modelSelector.models).map(([key, model]) => (
                        <option key={key} value={key}>
                          {key} ({model.weighingRange})
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="flex-1 max-w-md">
                    <div 
                      className="rounded-xl p-6 shadow-sm border"
                      style={{ 
                        backgroundColor: colors.light,
                        borderColor: `${colors.accent}20`
                      }}
                    >
                      <h4 className="font-bold text-gray-800 mb-3 text-lg">{modelSelector.currentModel.name}</h4>
                      <div className="grid grid-cols-1 gap-2 text-sm text-gray-700">
                        <div className="flex justify-between">
                          <span className="font-medium">Range:</span> 
                          <span className="font-semibold" style={{ color: colors.accent }}>{modelSelector.currentModel.weighingRange}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">Accuracy:</span> 
                          <span className="font-semibold" style={{ color: colors.accent }}>{modelSelector.currentModel.accuracy}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">Speed:</span> 
                          <span className="font-semibold" style={{ color: colors.accent }}>{modelSelector.currentModel.speed}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      )}

      {/* Enhanced Tab Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-8 mb-4"
      >
        <div className="rounded-2xl bg-gray-100 p-2">
          <div className="flex flex-wrap gap-1">
            <button
              key="overview"
              onClick={() => setSelectedTab('overview')}
              className={`flex-1 min-w-[140px] rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-200 ${
                selectedTab === 'overview'
                  ? 'bg-white text-gray-900 shadow-md'
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Overview
            </button>
            {hasSpecifications && (
              <button
                key="specifications"
                onClick={() => setSelectedTab('specifications')}
                className={`flex-1 min-w-[140px] rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-200 ${
                  selectedTab === 'specifications'
                    ? 'bg-white text-gray-900 shadow-md'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                Technical Specifications
              </button>
            )}
            {applications.length > 0 && (
              <button
                key="applications"
                onClick={() => setSelectedTab('applications')}
                className={`flex-1 min-w-[140px] rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-200 ${
                  selectedTab === 'applications'
                    ? 'bg-white text-gray-900 shadow-md'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                Applications & Industries
              </button>
            )}
          </div>
        </div>
      </motion.div>

      {/* Enhanced Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          {selectedTab === 'overview' && (
            <div className="space-y-8">
              {/* Product Overview Description */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 tracking-tight">Product Overview</h2>
                <div 
                  className="group relative rounded-2xl border border-gray-200 bg-white p-8 transition-all duration-300 hover:shadow-lg"
                  style={{ borderColor: `${colors.accent}15` }}
                >
                  <div 
                    className="absolute left-0 top-0 h-4 w-4 border-l-2 border-t-2"
                    style={{ borderColor: colors.accent }}
                  ></div>
                  <div 
                    className="absolute right-0 top-0 h-4 w-4 border-r-2 border-t-2"
                    style={{ borderColor: colors.accent }}
                  ></div>
                  <div className="prose prose-xl max-w-none">
                    <p className="text-gray-700 leading-relaxed text-xl font-light mb-0">
                      {description.length > 400 ? 
                        `${description.substring(0, 400).replace(/\s+\S*$/, '')}...` : 
                        description
                      }
                    </p>
                    {description.length > 400 && (
                      <div className="mt-4 text-sm">
                        <button 
                          className="text-blue-600 hover:text-blue-700 font-medium"
                          onClick={() => {
                            const element = document.querySelector('.full-description');
                            if (element) {
                              element.classList.toggle('hidden');
                              const btn = element.previousElementSibling?.querySelector('button');
                              if (btn) {
                                btn.textContent = element.classList.contains('hidden') ? 'Read more...' : 'Show less';
                              }
                            }
                          }}
                        >
                          Read more...
                        </button>
                        <div className="full-description hidden mt-4">
                          <p className="text-gray-700 leading-relaxed text-xl font-light">
                            {description.substring(400)}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Key Features Grid */}
              {/* Combined Key Features & Advanced Features */}
              {(keyFeatures.length > 0 || features.length > 0) && (
                <div className="space-y-8">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">Features & Capabilities</h2>
                    <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      Professional Grade
                    </span>
                  </div>

                  {/* Advanced Features Grid */}
                  {features.length > 0 && (
                    <div className="space-y-6">
                      <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 tracking-tight">Advanced Features</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {features.map((feature, index) => (
                          <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group relative rounded-2xl border border-gray-200 bg-white p-8 transition-all duration-300 hover:shadow-xl"
                            style={{ borderColor: `${colors.accent}15` }}
                          >
                            <div 
                              className="absolute left-0 top-0 h-4 w-4 border-l-2 border-t-2 transition-all duration-300 group-hover:h-6 group-hover:w-6"
                              style={{ borderColor: colors.accent }}
                            ></div>
                            
                            <div className="text-4xl mb-6">{feature.icon}</div>
                            <h4 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors tracking-tight">{feature.title}</h4>
                            <p className="text-gray-600 leading-relaxed text-lg font-light">{feature.description}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Key Features List */}
              {keyFeatures.length > 0 && (
                    <div className="space-y-6">
                      <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 tracking-tight">Key Highlights</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {keyFeatures.map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.05 }}
                            className="group relative rounded-xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:shadow-lg hover:border-blue-200"
                        style={{ borderColor: `${colors.accent}15` }}
                      >
                        <div 
                              className="absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 transition-all duration-300 group-hover:h-4 group-hover:w-4"
                          style={{ borderColor: colors.accent }}
                        ></div>
                            <div className="flex items-start space-x-4">
                        <div 
                                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1"
                          style={{ backgroundColor: colors.light }}
                        >
                                <svg className="h-5 w-5" style={{ color: colors.accent }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                              <p className="text-lg text-gray-700 group-hover:text-gray-900 transition-colors leading-relaxed font-light">{feature}</p>
                            </div>
                      </motion.div>
                    ))}
                  </div>
                    </div>
                  )}
                </div>
              )}

              {/* Category Models Overview */}
              {categoryModels.length > 0 && (
                <div className="space-y-6">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">Related Models in {category.replace('-', ' ')}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categoryModels.map((model, index) => (
                      <motion.div
                        key={model.href}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        onClick={() => router.push(model.href)}
                        className="group relative rounded-xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:shadow-lg cursor-pointer"
                        style={{ borderColor: `${colors.accent}15` }}
                      >
                        <div 
                          className="absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 transition-all duration-300 group-hover:h-4 group-hover:w-4"
                          style={{ borderColor: colors.accent }}
                        ></div>
                        <div 
                          className="absolute right-0 top-0 h-3 w-3 border-r-2 border-t-2 transition-all duration-300 group-hover:h-4 group-hover:w-4"
                          style={{ borderColor: colors.accent }}
                        ></div>
                        <h3 className="font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors text-xl tracking-tight">
                          {model.name}
                        </h3>
                        <p className="text-lg text-gray-600 mb-4 leading-relaxed font-light">{model.title}</p>
                        <div className="flex items-center text-sm text-blue-600 group-hover:text-blue-700 font-medium">
                          <span>View Details</span>
                          <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {selectedTab === 'specifications' && hasSpecifications && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">Technical Specifications</h2>
                <div className="flex space-x-3">
                  <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    ✓ Market Ready
                  </span>
                  <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    Professional Grade
                  </span>
                </div>
              </div>
              
              {/* Comprehensive Specifications Table */}
              {specifications.length > 0 && (
                <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm" style={{ borderColor: `${colors.accent}15` }}>
                  <div className="px-6 py-4 border-b border-gray-200" style={{ backgroundColor: colors.light }}>
                    <h3 className="text-2xl font-bold text-gray-900 flex items-center tracking-tight">
                      <div 
                        className="w-12 h-12 rounded-xl mr-4 flex items-center justify-center"
                        style={{ backgroundColor: colors.accent }}
                      >
                        <svg className="h-7 w-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      Complete Technical Specifications
                    </h3>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {specifications.map((spec, index) => (
                      <div key={index} className="px-8 py-6 flex justify-between items-start hover:bg-gray-50 transition-colors group">
                        <div className="flex-1 pr-6">
                          <span className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors text-lg tracking-tight">{spec.label}</span>
                        </div>
                        <div className="flex-1 text-right">
                          <span className="text-gray-700 font-medium text-lg">{spec.value}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Technical Data Grid */}
              {technicalData && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Performance Metrics */}
                  {performanceMetrics.length > 0 && (
                    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm" style={{ borderColor: `${colors.accent}15` }}>
                      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                        <div 
                          className="w-10 h-10 rounded-xl mr-3 flex items-center justify-center"
                          style={{ backgroundColor: colors.light }}
                        >
                          <svg className="h-6 w-6" style={{ color: colors.accent }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                        </div>
                        Performance
                      </h3>
                      <div className="space-y-3">
                        {performanceMetrics.map((spec, index) => (
                          <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                            <span className="text-sm font-medium text-gray-600">{spec.label}</span>
                            <span className="text-sm font-bold text-gray-900" style={{ color: colors.accent }}>{spec.value} {spec.unit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Dimensions & Power */}
                  {(dimensionsData.length > 0 || powerData.length > 0) && (
                    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm" style={{ borderColor: `${colors.accent}15` }}>
                      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                        <div 
                          className="w-10 h-10 rounded-xl mr-3 flex items-center justify-center"
                          style={{ backgroundColor: colors.light }}
                        >
                          <svg className="h-6 w-6" style={{ color: colors.accent }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                          </svg>
                        </div>
                        Dimensions & Power
                      </h3>
                      <div className="space-y-3">
                        {[...dimensionsData, ...powerData].map((spec, index) => (
                          <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                            <span className="text-sm font-medium text-gray-600">{spec.label}</span>
                            <span className="text-sm font-bold text-gray-900" style={{ color: colors.accent }}>{spec.value} {spec.unit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Component Specifications */}
                  {technicalData.components && technicalData.components.length > 0 && (
                    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm" style={{ borderColor: `${colors.accent}15` }}>
                      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                        <div 
                          className="w-10 h-10 rounded-xl mr-3 flex items-center justify-center"
                          style={{ backgroundColor: colors.light }}
                        >
                          <svg className="h-6 w-6" style={{ color: colors.accent }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        Premium Components
                      </h3>
                      <div className="space-y-3">
                        {technicalData.components.map((spec, index) => (
                          <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                            <span className="text-sm font-medium text-gray-600">{spec.label}</span>
                            <span className="text-sm font-bold text-gray-900" style={{ color: colors.accent }}>{spec.value} {spec.unit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Quality & Certifications */}
              {effectiveCertifications.length > 0 && (
                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm" style={{ borderColor: `${colors.accent}15` }}>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <div 
                      className="w-10 h-10 rounded-xl mr-3 flex items-center justify-center"
                      style={{ backgroundColor: colors.light }}
                    >
                      <svg className="h-6 w-6" style={{ color: colors.accent }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                  </div>
                    Quality Certifications & Standards
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {effectiveCertifications.map((cert, index) => (
                      <span 
                        key={index} 
                        className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-green-50 text-green-800 border border-green-200"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}



          {selectedTab === 'applications' && applications.length > 0 && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Applications & Industries</h2>
                <div className="flex space-x-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    ✓ Proven Solutions
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    Industry Expert
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Applications Grid */}
                <div className="lg:col-span-2">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Industry Applications</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {applications.map((application, index) => (
                  <motion.div
                        key={application}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="group relative rounded-2xl border border-gray-200 bg-white p-5 text-center transition-all duration-300 hover:shadow-lg hover:border-blue-200 cursor-pointer"
                    style={{ borderColor: `${colors.accent}15` }}
                  >
                    <div 
                          className="absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 transition-all duration-300 group-hover:h-4 group-hover:w-4"
                      style={{ borderColor: colors.accent }}
                    ></div>
                        <div 
                          className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                          style={{ backgroundColor: colors.light }}
                        >
                          <svg className="h-6 w-6" style={{ color: colors.accent }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                          </svg>
                        </div>
                        <span className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{application}</span>
                  </motion.div>
                ))}
              </div>
            </div>

                {/* Industry Benefits & Value Proposition */}
                <div className="space-y-6">
                  <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm" style={{ borderColor: `${colors.accent}15` }}>
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                      <div 
                        className="w-10 h-10 rounded-xl mr-3 flex items-center justify-center"
                        style={{ backgroundColor: colors.accent }}
                      >
                        <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      Why Choose Us?
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div 
                          className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{ backgroundColor: colors.light }}
                        >
                          <svg className="h-3 w-3" style={{ color: colors.accent }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                                </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Industry Expertise</h4>
                          <p className="text-sm text-gray-600">Deep understanding of packaging requirements across industries</p>
                            </div>
                          </div>
                      <div className="flex items-start space-x-3">
                        <div 
                          className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{ backgroundColor: colors.light }}
                        >
                          <svg className="h-3 w-3" style={{ color: colors.accent }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                      </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Proven ROI</h4>
                          <p className="text-sm text-gray-600">Measurable efficiency gains and cost reductions</p>
                              </div>
                          </div>
                      <div className="flex items-start space-x-3">
                        <div 
                          className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{ backgroundColor: colors.light }}
                        >
                          <svg className="h-3 w-3" style={{ color: colors.accent }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                      </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">24/7 Support</h4>
                          <p className="text-sm text-gray-600">Complete service and maintenance support</p>
                    </div>
              </div>
            </div>
                  </div>

                  <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm" style={{ borderColor: `${colors.accent}15` }}>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">Ready to Get Started?</h3>
                    <p className="text-sm text-gray-600 mb-4">Contact our industry experts for a customized solution</p>
                    <button
                      onClick={handleGetQuote}
                      className="w-full px-4 py-2 rounded-xl text-white font-semibold transition-all duration-200 hover:scale-105"
                      style={{ backgroundColor: colors.accent }}
                    >
                      Get Expert Consultation
                    </button>
                    </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Video Modal */}
      {showVideoModal && videoId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="relative max-w-4xl w-full mx-4">
            <button
              onClick={() => setShowVideoModal(false)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="aspect-video bg-black rounded-lg overflow-hidden">
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&rel=0&modestbranding=1&fs=1`}
                className="w-full h-full"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      )}

      {/* Quote Form Modal */}
      {showQuoteForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <ZohoCRMForm
              productName={title}
              leadSource="Product Detail Page"
              title="Request Product Quote"
              subtitle="Get detailed pricing and specifications for this product"
              availableModels={categoryModels}
              currentCategory={category}
              colors={colors}
              showCloseButton={true}
              onClose={() => setShowQuoteForm(false)}
              onSuccess={() => setShowQuoteForm(false)}
            />
          </div>
        </div>
      )}
    </PageContainer>
  );
} 