'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import ProductSpecifications from '@/components/ProductSpecifications';
import TechnicalFeatures from '@/components/TechnicalFeatures';
import ApplicationsList from '@/components/ApplicationsList';
import RequestQuote from '@/components/RequestQuote';

const ACM40Page = () => {
  const specifications = [
    { label: "Model", value: "ACM-40" },
    { label: "Operation Type", value: "Semi-Automatic" },
    { label: "Motion Type", value: "Intermittent Motion Horizontal" },
    { label: "Carton Erection", value: "From Magazine" },
    { label: "Sealing Options", value: "Tuck or Glue" },
    { label: "Control System", value: "State-of-the-art PLC with HMI" },
    { label: "Safety Features", value: "No Carton, No Product Interlock" },
    { label: "Construction", value: "Robust Materials" },
    { label: "Operator Concept", value: "Ergonomic Design" },
    { label: "Quality Check", value: "Counters & Check Weighers" },
    { label: "Compliance", value: "Industry Standards" },
    { label: "Visualization", value: "Optional Process Monitoring" }
  ];

  const features: Array<{
    title: string;
    description: string;
    icon: 'check' | 'star' | 'shield';
  }> = [
    {
      title: "Semi-Automatic Operation",
      description: "Perfect balance between manual control and automated functionality, allowing operators to oversee and intervene when necessary for precision packaging.",
      icon: "star"
    },
    {
      title: "Versatile Carton Sizes",
      description: "Accommodates a wide range of carton sizes, adaptable to various product dimensions from small items to larger packages.",
      icon: "check"
    },
    {
      title: "User-Friendly Interface",
      description: "Intuitive control panel with state-of-the-art PLC and HMI concept simplifies the packaging process and reduces downtime.",
      icon: "check"
    },
    {
      title: "High-Speed Performance",
      description: "Despite semi-automatic nature, boasts impressive speed significantly reducing packaging time without compromising quality.",
      icon: "star"
    },
    {
      title: "Durable Construction",
      description: "Crafted from robust materials and built to withstand rigorous production environments ensuring long-term reliability.",
      icon: "shield"
    },
    {
      title: "Safety & Compliance",
      description: "Integrated safety features including 'no carton, no product' interlock system adheres to industry standards and regulations.",
      icon: "shield"
    }
  ];

  const applications: Array<{
    industry: string;
    description: string;
    examples: string[];
    icon: 'office' | 'beaker' | 'cube' | 'globe';
  }> = [
    {
      industry: "Food and Beverage Industry",
      description: "Ideal for cartoning various food products ensuring efficient and precise packaging with proper sealing and protection.",
      examples: [
        "Cereal boxes and breakfast items",
        "Snack bars and confectionery",
        "Frozen meals and ready-to-eat products",
        "Bottles of sauces and condiments",
        "Canned goods and preserved foods"
      ],
      icon: "cube"
    },
    {
      industry: "Pharmaceutical Industry",
      description: "Perfect for pharmaceutical products requiring high-speed packaging with accuracy and compliance with safety standards.",
      examples: [
        "Blister packs and tablets",
        "Vials and ampoules",
        "Syringes and medical devices",
        "Medicine bottles and containers",
        "Medical equipment packaging"
      ],
      icon: "beaker"
    },
    {
      industry: "Cosmetic and Personal Care",
      description: "Suitable for cosmetic products ensuring consistent and attractive packaging while maintaining product integrity.",
      examples: [
        "Beauty creams and lotions",
        "Perfumes and fragrances",
        "Shampoo and hair care products",
        "Skincare and facial products",
        "Personal hygiene items"
      ],
      icon: "office"
    },
    {
      industry: "Household and Cleaning Products",
      description: "Efficient cartoning for household products ensuring proper packaging and improved productivity.",
      examples: [
        "Detergent boxes and pods",
        "Cleaning sprays and solutions",
        "Toiletries and bathroom products",
        "Kitchen cleaning supplies",
        "Laundry and fabric care"
      ],
      icon: "globe"
    },
    {
      industry: "Automotive and Hardware",
      description: "Precise cartoning for automotive parts, tools, and hardware accessories facilitating easy inventory management.",
      examples: [
        "Automotive spare parts",
        "Tools and equipment",
        "Hardware accessories",
        "Electronic components",
        "Industrial supplies"
      ],
      icon: "cube"
    },
    {
      industry: "Electronic and Electrical",
      description: "Secure packaging for electronic devices, batteries, and electrical components ensuring protection during handling.",
      examples: [
        "Small electronic devices",
        "Batteries and power supplies",
        "Cables and connectors",
        "Circuit boards and components",
        "Consumer electronics accessories"
      ],
      icon: "office"
    }
  ];

  const benefits = [
    {
      title: "Enhanced Efficiency",
      description: "Streamline your packaging process and increase throughput with semi-automatic cartoning capabilities"
    },
    {
      title: "Cost-Effective Solution",
      description: "Reduce labor costs and minimize errors with automated packaging capabilities, improving your bottom line"
    },
    {
      title: "Improved Product Presentation",
      description: "Achieve consistent and professional packaging results, enhancing the appeal of your products on the market"
    },
    {
      title: "Scalable Performance",
      description: "Adapt to changing production demands with ease, thanks to the versatility and performance of the machine"
    },
    {
      title: "Quality Assurance",
      description: "Built-in validation through counters and check weighers ensures only verified products are packaged"
    },
    {
      title: "Operator Safety",
      description: "Ergonomic design and safety features protect operators while maintaining high productivity levels"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-purple-600 to-purple-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="mb-4">
                <span className="inline-block px-4 py-2 bg-purple-500/30 rounded-full text-sm font-medium backdrop-blur-sm">
                  Cartoning Machines
                </span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                ACM-40
                <span className="block text-2xl lg:text-3xl font-normal text-purple-200 mt-2">
                  Semi Automatic Cartoning Machine
                </span>
              </h1>
              <p className="text-xl text-purple-100 mb-8 leading-relaxed">
                Cutting-edge intermittent motion horizontal cartoning system featuring gentle carton erection, 
                precise product insertion, and secure sealing with tuck or glue options. Perfect balance of 
                automation and operator control.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
                  <span className="text-sm font-medium">Type:</span>
                  <span className="text-sm">Semi-Automatic</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
                  <span className="text-sm font-medium">Motion:</span>
                  <span className="text-sm">Intermittent Horizontal</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
                  <span className="text-sm font-medium">Sealing:</span>
                  <span className="text-sm">Tuck or Glue</span>
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
                  src="/images/products/acm-40-hero.jpg"
                  alt="ACM-40 Semi Automatic Cartoning Machine"
                  fill
                  className="object-cover"
                  priority
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'%3E%3Crect width='800' height='600' fill='%23f3f4f6'/%3E%3Ctext x='400' y='300' font-family='Arial, sans-serif' font-size='24' fill='%236b7280' text-anchor='middle' dy='0.3em'%3EACM-40 Machine%3C/text%3E%3C/svg%3E";
                  }}
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-orange-500 text-white px-6 py-3 rounded-xl shadow-lg">
                <p className="font-bold">Precision Cartoning</p>
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
                  Infinity Automated Solutions presents the <strong>Semi Automatic Cartoning Machine (ACM-40)</strong>, 
                  a cutting-edge intermittent motion horizontal cartoning system. This innovative machine facilitates 
                  gentle carton erection from the magazine, precise product insertion, and secure carton sealing with 
                  either tuck or glue options.
                </p>
                <p className="mb-4">
                  Equipped with <strong>interlock features</strong>, the ACM-40 ensures a "no carton, no product" solution, 
                  enhancing operational efficiency and product quality. Coupled with Infinity's superior product handling 
                  capabilities, this machine excels in producing high-end products alongside folding cartons.
                </p>
                <p className="mb-4">
                  Each product undergoes meticulous validation through counters and check weighers at the final stage, 
                  ensuring only verified products are enclosed within the shipper carton. The machine offers optional 
                  visualization of the packaging process and boasts an ergonomic operator concept.
                </p>
                <p>
                  Like all Infinity machines, it incorporates state-of-the-art control technology and a user-friendly 
                  HMI concept. This machine epitomizes Infinity's commitment to unparalleled quality standards and an 
                  exceptional price/performance ratio.
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
              <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 px-8 py-6">
                <h3 className="text-2xl font-bold text-white text-center">Benefits of ACM-40 Semi Automatic Cartoning Machine</h3>
              </div>
              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl border border-indigo-200 hover:shadow-lg transition-all duration-300"
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

            {/* Why Choose Infinity Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl shadow-xl border border-gray-200 p-8"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Why Choose Infinity Automated Solutions?</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Our Commitment</h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                      <p className="text-gray-700">Delivering innovative solutions that empower businesses to thrive in today's competitive market</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                      <p className="text-gray-700">Years of industry expertise and dedication to excellence in cartoning technology</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                      <p className="text-gray-700">Perfect choice for companies seeking reliability, efficiency, and performance</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Our Promise</h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <p className="text-gray-700">Exceptional price-to-performance ratio with unparalleled quality standards</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <p className="text-gray-700">State-of-the-art control technology with user-friendly HMI concepts</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <p className="text-gray-700">Comprehensive support from installation to ongoing maintenance and training</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl shadow-xl p-8 text-white text-center"
            >
              <h2 className="text-3xl font-bold mb-4">Ready to Elevate Your Packaging Process?</h2>
              <p className="text-xl text-gray-300 mb-8">
                Get in touch with our team today to learn more about the ACM-40 and discover how it can revolutionize your operations.
              </p>
              <p className="text-lg text-gray-400">
                Unlock new levels of efficiency and productivity with Infinity Automated Solutions.
              </p>
            </motion.div>

            {/* Request Quote */}
            <RequestQuote productName="ACM-40 Semi Automatic Cartoning Machine" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ACM40Page; 