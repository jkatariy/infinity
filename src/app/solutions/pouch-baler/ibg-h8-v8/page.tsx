'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import ProductSpecifications from '@/components/ProductSpecifications';
import TechnicalFeatures from '@/components/TechnicalFeatures';
import ApplicationsList from '@/components/ApplicationsList';
import RequestQuote from '@/components/RequestQuote';

const IBGH8V8Page = () => {
  const specifications = [
    { label: "Model", value: "IBG-H8 & IBG-V8" },
    { label: "Input Speed", value: "Up to 120", unit: "pouches/min" },
    { label: "Output Speed", value: "7-8", unit: "secondary packs/min" },
    { label: "Pouch Size Range", value: "0.2 - 5", unit: "kg" },
    { label: "Construction Material", value: "SS-304 Stainless Steel" },
    { label: "Orientation Options", value: "Horizontal (H8) / Vertical (V8)" },
    { label: "Bag Type", value: "HDPE Bags" },
    { label: "Control System", value: "Sensor-driven Controls" },
    { label: "Quality Check", value: "Check Weigher & Metal Detector" },
    { label: "Bagging Mechanism", value: "Gate Flap System" },
    { label: "Design", value: "Compact & Space Efficient" },
    { label: "Compliance", value: "ISO 9001:2015 Certified" }
  ];

  const features: Array<{
    title: string;
    description: string;
    icon: 'check' | 'star' | 'shield';
  }> = [
    {
      title: "Dual Orientation Options",
      description: "Choose horizontal (IBG-H8) or vertical (IBG-V8) model to suit your facility layout and production requirements.",
      icon: "star"
    },
    {
      title: "Seamless Pouch Collection",
      description: "Efficiently collects from VFFS or HFFS machines at up to 120 pouches per minute with minimal handling damage.",
      icon: "check"
    },
    {
      title: "Sandwich Conveyor System",
      description: "Advanced conveyor system aligns and compresses pouches to optimize bagging size and ensure consistent packaging.",
      icon: "check"
    },
    {
      title: "Integrated Quality Check",
      description: "Optional check weigher and metal detector integration ensures only quality products proceed to final packing.",
      icon: "shield"
    },
    {
      title: "Smart Bagging Mechanism",
      description: "Gate flap system forms accurate matrices for precise HDPE bag insertion and secure packaging.",
      icon: "star"
    },
    {
      title: "Accurate Count & Output",
      description: "Sensor-driven controls ensure precision counting and consistent output quality in every pack.",
      icon: "check"
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
      description: "Ideal for bulk packaging of various food products in flexible pouches.",
      examples: [
        "Grains, flour, and pulses",
        "Frozen food products",
        "Instant noodles and ready meals",
        "Snack foods and confectionery",
        "Bakery and cereal products"
      ],
      icon: "cube"
    },
    {
      industry: "Spices & Seasonings",
      description: "Perfect for packaging masala pouches and seasoning sachets in bulk quantities.",
      examples: [
        "Masala pouches and sachets",
        "Spice powder packets",
        "Seasoning mixes",
        "Curry powders",
        "Specialty spice blends"
      ],
      icon: "beaker"
    },
    {
      industry: "Dairy & Beverages",
      description: "Suitable for dairy products and beverage premixes requiring bulk secondary packaging.",
      examples: [
        "Milk powder sachets",
        "Coffee and tea premixes",
        "Protein powder packets",
        "Nutritional supplements",
        "Beverage concentrates"
      ],
      icon: "office"
    },
    {
      industry: "Pharmaceuticals",
      description: "Hygienic packaging solution for pharmaceutical products requiring precise handling.",
      examples: [
        "Bulk sachets and powder bags",
        "Medicine packets",
        "Supplement pouches",
        "Medical device packaging",
        "Sterile product pouches"
      ],
      icon: "globe"
    },
    {
      industry: "Pet Food",
      description: "Efficient packaging for pet food manufacturers dealing with various treat sizes.",
      examples: [
        "Dry feed portions",
        "Pet snacks and treats",
        "Nutritional supplements",
        "Training treat packets",
        "Specialty pet food"
      ],
      icon: "cube"
    },
    {
      industry: "FMCG Products",
      description: "Versatile solution for fast-moving consumer goods requiring efficient bulk packaging.",
      examples: [
        "Personal care products",
        "Detergent sachets",
        "Cleaning product pouches",
        "Cosmetic samples",
        "Household items"
      ],
      icon: "office"
    }
  ];

  const benefits = [
    {
      title: "Faster Bagging Process",
      description: "Automates heavy and repetitive tasks, significantly reducing manual labor requirements"
    },
    {
      title: "Improved Accuracy",
      description: "Sensor-controlled counting and QA checks ensure consistent quality and count accuracy"
    },
    {
      title: "Labor Cost Reduction",
      description: "Replaces manual packing with smart automated systems, reducing operational costs"
    },
    {
      title: "Consistent Packing Quality",
      description: "Ensures neat and uniform HDPE bag formation for professional product presentation"
    },
    {
      title: "Compact & Scalable",
      description: "Fits existing production lines and grows with your business requirements"
    },
    {
      title: "Reliable & Low Maintenance",
      description: "Built to run continuously with minimal downtime and maintenance requirements"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-green-600 to-green-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="mb-4">
                <span className="inline-block px-4 py-2 bg-green-500/30 rounded-full text-sm font-medium backdrop-blur-sm">
                  Automatic Pouch Baler Systems
                </span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                IBG-H8 & IBG-V8
                <span className="block text-2xl lg:text-3xl font-normal text-green-200 mt-2">
                  Automatic Bagging Machine
                </span>
              </h1>
              <p className="text-xl text-green-100 mb-8 leading-relaxed">
                Fully automatic bagging machine designed for bulk pouch handling with dual orientation 
                options. Features advanced sandwich conveyor system and smart bagging mechanism for 
                efficient HDPE bag packaging.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
                  <span className="text-sm font-medium">Input:</span>
                  <span className="text-sm">120 pouches/min</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
                  <span className="text-sm font-medium">Output:</span>
                  <span className="text-sm">7-8 packs/min</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
                  <span className="text-sm font-medium">Options:</span>
                  <span className="text-sm">H8 & V8</span>
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
                  src="/images/products/ibg-h8-v8-hero.jpg"
                  alt="IBG-H8 & IBG-V8 Automatic Bagging Machine"
                  fill
                  className="object-cover"
                  priority
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'%3E%3Crect width='800' height='600' fill='%23f3f4f6'/%3E%3Ctext x='400' y='300' font-family='Arial, sans-serif' font-size='24' fill='%236b7280' text-anchor='middle' dy='0.3em'%3EIBG-H8 %26 IBG-V8 Machine%3C/text%3E%3C/svg%3E";
                  }}
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-blue-500 text-white px-6 py-3 rounded-xl shadow-lg">
                <p className="font-bold">Trusted Globally</p>
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
                  At Infinity Automated Solutions, we help industries automate bulk pouch handling with our 
                  <strong> Automatic Bagging Machine (IBG-H8 & IBG-V8)</strong>. Engineered for speed, accuracy, 
                  and seamless integration with primary packaging lines, these systems simplify your secondary 
                  packaging process by efficiently collating pouches and packing them into HDPE bags.
                </p>
                <p className="mb-4">
                  The IBG-H8 and IBG-V8 offer <strong>dual orientation options</strong> - choose horizontal (IBG-H8) 
                  or vertical (IBG-V8) model to suit your layout requirements. Both models feature our advanced 
                  sandwich conveyor system that aligns and compresses pouches to optimize bagging size while 
                  maintaining product integrity.
                </p>
                <p>
                  With seamless pouch collection from VFFS or HFFS machines at up to 120 pouches per minute and 
                  output of 7-8 secondary packs per minute, these machines deliver exceptional efficiency. The 
                  integrated quality check options and sensor-driven controls ensure precision in every pack.
                </p>
              </div>
            </motion.div>

            {/* Technical Specifications */}
            <ProductSpecifications specifications={specifications} />

            {/* Key Features */}
            <TechnicalFeatures features={features} />

            {/* Benefits Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden"
            >
              <div className="bg-gradient-to-r from-orange-600 to-orange-700 px-8 py-6">
                <h3 className="text-2xl font-bold text-white text-center">Benefits of Infinity's Automatic Bagging Machine</h3>
              </div>
              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="p-6 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl border border-orange-200 hover:shadow-lg transition-all duration-300"
                    >
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">{benefit.title}</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">{benefit.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Applications */}
            <ApplicationsList applications={applications} />

            {/* Why Choose Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl shadow-xl border border-gray-200 p-8"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Why Choose Infinity Automated Solutions?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <p className="text-gray-700">Trusted by top brands: ITC, Godrej, Adani Wilmar, Britannia & more</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <p className="text-gray-700">10+ years of packaging automation experience</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <p className="text-gray-700">Tailor-made automation for every client</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <p className="text-gray-700">On-site installation, training & maintenance</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <p className="text-gray-700">Strong presence in India, Africa, Middle East & Southeast Asia</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <p className="text-gray-700">ISO 9001:2015 certified quality management</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Request Quote */}
            <RequestQuote productName="IBG-H8 & IBG-V8 Automatic Bagging Machine" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default IBGH8V8Page; 