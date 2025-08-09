'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const faqData = [
    {
      category: 'General',
      question: 'What is a secondary packaging machine?',
      answer: 'A secondary packaging machine packs products that are already in their first layer of packaging into boxes, cartons, or shrink wrap for easier shipping and storage. It helps organize multiple items together, protect them during transport, and make handling more efficient.',
      color: 'blue'
    },
    {
      category: 'Industries',
      question: 'What industries do you serve?',
      answer: 'We work with many industries including food, Spice, Tea, Biscuits, FMCG, personal care, Healthcare & pharmaceuticals, and textiles. And engg industry',
      color: 'green'
    },
    {
      category: 'Customization',
      question: 'Can your machines be customized for my product?',
      answer: 'Yes, our machines are fully customizable to fit different product sizes, shapes, and packaging styles.',
      color: 'purple'
    },
    {
      category: 'Support',
      question: 'Do you offer support after installation?',
      answer: 'Yes, we provide full after-sales support, including training, service, and spare parts. In india and abroad.',
      color: 'blue'
    },
    {
      category: 'Selection',
      question: 'How do I know which machine is right for me?',
      answer: 'Our team will help you choose the best machine based on your product type, packing specification, production speed, and budget.',
      color: 'green'
    },
    {
      category: 'Technology',
      question: 'Is your technology user-friendly?',
      answer: 'Yes, our machines come with easy-to-use touchscreens and clear instructions for smooth operation.',
      color: 'purple'
    },
    {
      category: 'Delivery',
      question: 'What is the delivery time for your machines?',
      answer: 'Delivery time depends on the model and customization, but usually takes between 6 to 14 weeks',
      color: 'blue'
    },
    {
      category: 'Demo',
      question: 'Can I see a live demo of the machine before buying?',
      answer: 'Yes, we can arrange a demo at our Pune facility or share a video of our machines in action.',
      color: 'green'
    },
    {
      category: 'Maintenance',
      question: 'Do you provide AMC (Annual Maintenance Contracts)?',
      answer: 'Yes, we offer AMC packages to ensure hassle-free operation and long-term reliability.',
      color: 'purple'
    },
    {
      category: 'Training',
      question: 'Do you Provide operator training ?',
      answer: 'Yes, we provide full training for machine operators. Our team will show your staff how to safely and efficiently run the machines, so you get the best performance from day one.',
      color: 'blue'
    },
    {
      category: 'Advantages',
      question: 'What makes your machines different from others?',
      answer: 'We offer fast changeover, compact designs, top-quality components and strong after-sales support – all focused on making your packaging line efficient and future-ready.',
      color: 'green'
    }
  ];

  const colorVariants = {
    blue: { bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-600', accent: 'bg-gray-200' },
    green: { bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-600', accent: 'bg-gray-200' },
    purple: { bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-600', accent: 'bg-gray-200' },
    orange: { bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-600', accent: 'bg-gray-200' },
    emerald: { bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-600', accent: 'bg-gray-200' },
  };

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-white font-product-sans relative overflow-hidden">
      {/* Subtle background dots - much less visible */}
      <div className="absolute inset-0 opacity-12">
        <motion.div 
          className="absolute inset-0"
          animate={{ 
            backgroundPosition: ['0px 0px', '100px 100px'],
          }}
          transition={{
            duration: 50,
            ease: "linear",
            repeat: Infinity,
          }}
          style={{
            backgroundImage: `radial-gradient(circle, #3b82f6 1px, transparent 1px)`,
            backgroundSize: '100px 100px'
          }}>
        </motion.div>
      </div>

      {/* Minimal floating element */}
      <motion.div 
        className="absolute top-24 right-20 w-6 h-6 border border-blue-300 rotate-45 opacity-10"
        animate={{ 
          rotate: [45, 135, 45],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 15,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-4xl font-bold text-gray-900 mb-4"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.div 
            className="w-20 h-1 bg-blue-500 mx-auto mb-6"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
          />
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light">
            Get answers to the most common questions about our packaging machines and services
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqData.map((faq, index) => {
            const colors = colorVariants[faq.color as keyof typeof colorVariants];
            const isActive = activeIndex === index;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="border border-gray-200 hover:border-blue-300 transition-all duration-300 bg-white overflow-hidden"
              >
                {/* Blue accent line */}
                <motion.div 
                  className="h-1 bg-blue-500"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
                  style={{ originX: 0 }}
                />
                
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-6 text-left focus:outline-none group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <motion.span 
                        className={`px-3 py-1 text-xs font-medium border ${colors.bg} ${colors.border} ${colors.text}`}
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {faq.category}
                      </motion.span>
                      <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-900 transition-colors duration-300">
                        {faq.question}
                      </h3>
                    </div>
                    
                    <motion.div
                      animate={{ rotate: isActive ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="ml-4 flex-shrink-0"
                    >
                      <svg
                        className="w-5 h-5 text-gray-500 group-hover:text-blue-500 transition-colors duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </motion.div>
                  </div>
                </button>

                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6">
                        <motion.div
                          initial={{ y: -10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -10, opacity: 0 }}
                          transition={{ duration: 0.3, delay: 0.1 }}
                          className="p-4 bg-gray-50 border-l-2 border-l-gray-300"
                        >
                          <p className="text-gray-700 leading-relaxed font-light">
                            {faq.answer}
                          </p>
                        </motion.div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 font-light mb-6">
            Have more questions? Our team is here to help you find the right packaging solution.
          </p>
          <motion.button
            whileHover={{ 
              scale: 1.05, 
              backgroundColor: '#2563eb',
              boxShadow: "0 10px 25px rgba(37, 99, 235, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-500 text-white px-8 py-3 font-medium hover:bg-blue-600 transition-all duration-300 border border-blue-500 hover:border-blue-600"
          >
            Contact Our Team
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ; 