'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import ProductSpecifications from '@/components/ProductSpecifications';
import TechnicalFeatures from '@/components/TechnicalFeatures';
import ApplicationsList from '@/components/ApplicationsList';
import RequestQuote from '@/components/RequestQuote';

const IBP120Page = () => {
  const specifications = [
    { label: "Model", value: "IBP-120" },
    { label: "Machine Speed", value: "Up to 120", unit: "pouches/min" },
    { label: "Pouch Size Range", value: "50-200mm", unit: "width" },
    { label: "Pouch Weight", value: "10-500", unit: "grams" },
    { label: "Power Consumption", value: "3.5", unit: "kW" },
    { label: "Air Pressure", value: "6", unit: "bar" },
    { label: "Machine Dimensions", value: "4000 x 1200 x 1800", unit: "mm (L x W x H)" },
    { label: "Weight", value: "1200", unit: "kg" },
    { label: "Material", value: "SS-304 Construction" },
    { label: "Control System", value: "PLC with HMI" },
    { label: "Safety Features", value: "Emergency Stop, Safety Guards" },
    { label: "Compliance", value: "ISO 9001:2015" }
  ];

  const features: Array<{
    title: string;
    description: string;
    icon: 'check' | 'star' | 'shield';
  }> = [
    {
      title: "High-Speed Operation",
      description: "Capable of handling up to 120 pouches per minute with precision and reliability, maximizing your production throughput.",
      icon: "star"
    },
    {
      title: "RACETRACK System",
      description: "Revolutionary pouch collation system that efficiently organizes and aligns pouches for optimal secondary packaging.",
      icon: "check"
    },
    {
      title: "Flexible Pouch Handling",
      description: "Accommodates various pouch sizes and weights, from small sachets to larger food pouches with automatic adjustment.",
      icon: "check"
    },
    {
      title: "Stainless Steel Construction",
      description: "Built with SS-304 grade stainless steel for durability, hygiene, and compliance with food industry standards.",
      icon: "shield"
    },
    {
      title: "Advanced Control System",
      description: "User-friendly PLC with HMI interface for easy operation, monitoring, and troubleshooting.",
      icon: "check"
    },
    {
      title: "Quick Changeover",
      description: "Rapid format changes with minimal downtime, allowing for efficient production of different pouch sizes.",
      icon: "star"
    }
  ];

  const applications: Array<{
    industry: string;
    description: string;
    examples: string[];
    icon: 'office' | 'beaker' | 'cube' | 'globe';
  }> = [
    {
      industry: "Food Industry",
      description: "Perfect for secondary packaging of various food solutions in flexible pouches.",
      examples: [
        "Snack foods and chips",
        "Instant noodles and ready meals",
        "Spices and seasonings",
        "Tea and coffee sachets",
        "Frozen food solutions"
      ],
      icon: "cube"
    },
    {
      industry: "FMCG Products",
      description: "Ideal for fast-moving consumer goods requiring efficient secondary packaging.",
      examples: [
        "Personal care products",
        "Detergent pods and sachets",
        "Shampoo and soap pouches",
        "Cosmetic sample packets",
        "Household cleaning products"
      ],
      icon: "office"
    },
    {
      industry: "Pharmaceutical",
      description: "Suitable for pharmaceutical products requiring precise and hygienic packaging.",
      examples: [
        "Medicine sachets",
        "Powder medications",
        "Supplement packets",
        "Medical device pouches",
        "Sterile product packaging"
      ],
      icon: "beaker"
    },
    {
      industry: "Pet Food",
      description: "Efficient packaging solution for pet food and treat manufacturers.",
      examples: [
        "Dry pet food portions",
        "Pet treat pouches",
        "Nutritional supplements",
        "Training treat packets",
        "Specialty pet food"
      ],
      icon: "globe"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="mb-4">
                <span className="inline-block px-4 py-2 bg-blue-500/30 rounded-full text-sm font-medium backdrop-blur-sm">
                  Bundling & Wrapping Machines
                </span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                IBP-120
                <span className="block text-2xl lg:text-3xl font-normal text-blue-200 mt-2">
                  Secondary Packaging for Pouches
                </span>
              </h1>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                High-speed automated secondary packaging solution for flexible pouches, 
                featuring our revolutionary RACETRACK system for efficient pouch collation 
                and packaging up to 120 pouches per minute.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
                  <span className="text-sm font-medium">Speed:</span>
                  <span className="text-sm">120 pouches/min</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
                  <span className="text-sm font-medium">Construction:</span>
                  <span className="text-sm">SS-304</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
                  <span className="text-sm font-medium">Certification:</span>
                  <span className="text-sm">ISO 9001:2015</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
                <Image
                  src="/images/products/ibp-120-hero.jpg"
                  alt="IBP-120 Secondary Packaging Machine"
                  fill
                  className="object-cover"
                  priority
                  onError={(e) => {
                    // Fallback to placeholder if image doesn't exist
                    const target = e.target as HTMLImageElement;
                    target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'%3E%3Crect width='800' height='600' fill='%23f3f4f6'/%3E%3Ctext x='400' y='300' font-family='Arial, sans-serif' font-size='24' fill='%236b7280' text-anchor='middle' dy='0.3em'%3EIBP-120 Machine%3C/text%3E%3C/svg%3E";
                  }}
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg">
                <p className="font-bold">Trusted by 400+ Companies</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {/* Product Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Product Overview</h2>
              <div className="prose prose-lg max-w-none text-gray-700">
                <p className="mb-4">
                  The IBP-120 Secondary Packaging Machine represents the pinnacle of automated pouch packaging technology. 
                  Engineered by Infinity Automated Solutions, this machine is specifically designed to handle the secondary 
                  packaging needs of flexible pouches across various industries including food, FMCG, pharmaceuticals, and pet food.
                </p>
                <p className="mb-4">
                  At the heart of the IBP-120 is our proprietary <strong>RACETRACK system</strong>, which revolutionizes 
                  pouch collation by efficiently organizing and aligning pouches for optimal secondary packaging. This 
                  innovative technology ensures consistent product flow and minimizes handling damage while maximizing throughput.
                </p>
                <p>
                  With a processing speed of up to 120 pouches per minute, the IBP-120 significantly enhances production 
                  efficiency while maintaining the highest standards of quality and reliability. The machine's robust 
                  SS-304 stainless steel construction ensures durability and compliance with stringent hygiene requirements.
                </p>
              </div>
            </motion.div>

            {/* Technical Specifications */}
            <ProductSpecifications specifications={specifications} />

            {/* Key Features */}
            <TechnicalFeatures features={features} />

            {/* Applications */}
            <ApplicationsList applications={applications} />

            {/* Benefits Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl shadow-xl border border-gray-200 p-8"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Why Choose IBP-120?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">120</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">High Speed</h3>
                  <p className="text-gray-600">Process up to 120 pouches per minute with consistent quality</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold text-white">SS304</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Durable Build</h3>
                  <p className="text-gray-600">Stainless steel construction for long-lasting performance</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold text-white">ISO</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Certified Quality</h3>
                  <p className="text-gray-600">ISO 9001:2015 certified for quality compliance</p>
                </div>
              </div>
            </motion.div>

            {/* Request Quote */}
            <RequestQuote productName="IBP-120 Secondary Packaging Machine" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default IBP120Page; 