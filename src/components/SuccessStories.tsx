'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface Story {
  id: string;
  title: string;
  company: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string[];
  testimonial: string;
  clientName: string;
  clientPosition: string;
  logo: string;
  image: string;
}

const SuccessStories = () => {
  // Sample success stories data
  const stories: Story[] = [
    {
      id: '1',
      title: 'Increasing Production Efficiency by 40%',
      company: 'Global Foods Inc.',
      industry: 'Food & Beverage',
      challenge: 'Global Foods Inc. was facing production bottlenecks with their existing packaging line, resulting in delayed orders and increased labor costs. Their manual packaging process was unable to keep up with growing demand.',
      solution: 'We implemented a fully-automated bundling and wrapping solution with integrated conveying systems. The solution included our high-speed cartoning machine and case packer, customized to handle their specific product range.',
      results: [
        '40% increase in production efficiency',
        'Reduced labor costs by 35%',
        'Decreased product waste by 25%',
        'ROI achieved in just 14 months'
      ],
      testimonial: 'The packaging solution from Infinity Automated Solutions transformed our production capability. We are now able to meet increasing demand while reducing costs and improving product quality. The team\'s expertise and support throughout implementation was exceptional.',
      clientName: 'Sarah Johnson',
      clientPosition: 'Operations Director, Global Foods Inc.',
      logo: '/images/success/global-foods-logo.png',
      image: '/images/success/food-packaging.jpg'
    },
    {
      id: '2',
      title: 'Streamlining Pharmaceutical Packaging Compliance',
      company: 'MediPharm Labs',
      industry: 'Pharmaceuticals',
      challenge: 'MediPharm Labs needed to ensure 100% accuracy in their pharmaceutical packaging while meeting strict regulatory requirements. Their existing equipment had limitations in tracking and verification.',
      solution: 'We designed an integrated inspection and checkweighing system with advanced vision technology. The solution included serialization capabilities, label verification, and automated rejection of non-compliant packages.',
      results: [
        'Achieved 100% packaging accuracy',
        'Seamless compliance with FDA and EU regulations',
        'Reduced quality control staff by 50%',
        'Enhanced traceability throughout the supply chain'
      ],
      testimonial: 'In an industry where precision and compliance are non-negotiable, Infinity Automated Solutions delivered a system that exceeded our expectations. The implementation was smooth, and their ongoing support has been invaluable.',
      clientName: 'Dr. Michael Chen',
      clientPosition: 'Quality Assurance Manager, MediPharm Labs',
      logo: '/images/success/medipharm-logo.png',
      image: '/images/success/pharma-packaging.jpg'
    },
    {
      id: '3',
      title: 'Revolutionizing E-commerce Fulfillment Speed',
      company: 'ShopDirect',
      industry: 'E-commerce',
      challenge: 'ShopDirect was struggling to handle the massive surge in online orders during peak seasons. Their manual packaging process was causing shipping delays and customer satisfaction issues.',
      solution: 'We implemented a custom high-speed packaging solution with automated case packing and integrated conveying systems. The system included intelligent sorting and custom-sized packaging capability.',
      results: [
        'Increased packaging speed by 300%',
        'Reduced packaging material usage by 20%',
        'Improved order accuracy to 99.9%',
        'Cut fulfillment time from 48 hours to just 6 hours'
      ],
      testimonial: 'The automation solution from Infinity transformed our fulfillment capability. During our last holiday season, we processed triple the volume with faster delivery times and fewer errors. Their team understood our unique challenges and designed a solution that scaled with our growth.',
      clientName: 'Robert Williams',
      clientPosition: 'Head of Fulfillment, ShopDirect',
      logo: '/images/success/shopdirect-logo.png',
      image: '/images/success/ecommerce-packaging.jpg'
    }
  ];

  const [activeStory, setActiveStory] = useState<Story>(stories[0]);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Customer Success Stories</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            See how our packaging solutions have helped businesses across industries
            improve efficiency, reduce costs, and achieve their goals
          </p>
        </div>

        {/* Story Selector */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {stories.map((story) => (
            <motion.button
              key={story.id}
              onClick={() => setActiveStory(story)}
              whileHover={{ y: -4 }}
              className={`p-6 rounded-xl text-left transition-all ${
                activeStory.id === story.id
                  ? 'bg-white shadow-lg border-2 border-blue-500'
                  : 'bg-white border border-gray-200 hover:shadow-md'
              }`}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 relative bg-gray-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">{story.industry === 'Food & Beverage' ? '🍽️' : story.industry === 'Pharmaceuticals' ? '💊' : '📦'}</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 text-lg">{story.company}</h3>
                  <p className="text-sm text-gray-500">{story.industry}</p>
                </div>
              </div>
              <h4 className="text-base font-medium text-gray-900 mb-2">{story.title}</h4>
              <p className="text-sm text-gray-600 line-clamp-2">{story.challenge.substring(0, 100)}...</p>
            </motion.button>
          ))}
        </div>

        {/* Active Story Detail */}
        <motion.div
          key={activeStory.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Image Section */}
            <div className="relative h-64 lg:h-full">
              <div className="absolute inset-0 bg-blue-700 opacity-10"></div>
              <div className="relative w-full h-full">
                <Image
                  src={activeStory.image}
                  alt={activeStory.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Content Section */}
            <div className="p-8 lg:p-12">
              <div className="flex flex-col h-full">
                <div>
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{activeStory.title}</h3>
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                      <span>{activeStory.company}</span>
                      <span>•</span>
                      <span>{activeStory.industry}</span>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-medium text-gray-900 mb-2">The Challenge</h4>
                      <p className="text-gray-600">{activeStory.challenge}</p>
                    </div>

                    <div>
                      <h4 className="text-lg font-medium text-gray-900 mb-2">Our Solution</h4>
                      <p className="text-gray-600">{activeStory.solution}</p>
                    </div>

                    <div>
                      <h4 className="text-lg font-medium text-gray-900 mb-2">Results</h4>
                      <ul className="space-y-2">
                        {activeStory.results.map((result, index) => (
                          <li key={index} className="flex items-start gap-2 text-gray-600">
                            <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>{result}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="mt-auto pt-8">
                  <blockquote className="italic text-gray-700 border-l-4 border-blue-500 pl-4 py-2">
                    &ldquo;{activeStory.testimonial}&rdquo;
                  </blockquote>
                  <div className="mt-4 flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 font-medium">
                      {activeStory.clientName.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{activeStory.clientName}</p>
                      <p className="text-sm text-gray-500">{activeStory.clientPosition}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="text-center mt-12">
          <a
            href="/contact"
            className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            Discuss your project with us
          </a>
        </div>
      </div>
    </section>
  );
};

export default SuccessStories; 