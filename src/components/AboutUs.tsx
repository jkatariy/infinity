'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const AboutUs = () => {
  const router = useRouter();

  const impactStats = [
    {
      number: '800+',
      label: 'Installations Worldwide',
      description: 'Successful deployments across diverse industries',
      icon: (
        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 7.172V5L8 4z" />
        </svg>
      )
    },
    {
      number: '125+',
      label: 'Engineering Professionals',
      description: 'Dedicated team of automation experts',
      icon: (
        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M15 7a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      )
    },
    {
      number: '10+',
      label: 'Years of Innovation',
      description: 'Consistent growth since 2015',
      icon: (
        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      number: '25+',
      label: 'Designers',
      description: 'Specialized in packaging automation',
      icon: (
        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    },
    {
      number: '20+',
      label: 'Solutions',
      description: 'Innovative solutions for packaging challenges',
      icon: (
        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      number: '40,000',
      label: 'Sq. Ft Plant',
      description: 'State-of-the-art manufacturing facility',
      icon: (
        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    }
  ];

  return (
    <section className="relative overflow-hidden bg-white py-20">
      {/* Background geometric pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-20 h-20 border-2 border-blue-500 rotate-45"></div>
        <div className="absolute top-40 right-20 w-16 h-16 border-2 border-blue-500"></div>
        <div className="absolute bottom-40 left-20 w-12 h-12 border-2 border-blue-500 rotate-45"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 border-2 border-blue-500"></div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        {/* Engineering corner accents */}
        <div className="absolute top-0 left-0 w-32 h-32 pointer-events-none">
          <div className="absolute top-0 left-0 w-2 h-16 bg-blue-500/20"></div>
          <div className="absolute top-0 left-0 h-2 w-16 bg-blue-500/20"></div>
        </div>
        <div className="absolute top-0 right-0 w-32 h-32 pointer-events-none">
          <div className="absolute top-0 right-0 w-2 h-16 bg-blue-500/20"></div>
          <div className="absolute top-0 right-0 h-2 w-16 bg-blue-500/20"></div>
        </div>

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <div className="relative inline-block mb-6">
            <motion.h2 
              className="mb-2 text-4xl font-bold text-gray-900"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Our Impact
            </motion.h2>
            {/* Animated accent line */}
            <motion.div 
              className="absolute bottom-0 left-1/2 h-1 bg-green-500 -translate-x-1/2 transform"
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
            ></motion.div>
          </div>
          <motion.p 
            className="mx-auto max-w-3xl text-xl text-gray-600 leading-relaxed"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Transforming packaging automation across industries with innovative engineering solutions and unwavering commitment to excellence
          </motion.p>
        </motion.div>

        {/* Impact Statistics Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-20"
        >
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {impactStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="relative group"
              >
                <div className="bg-white border-2 border-gray-100 p-6 text-center relative hover:shadow-xl transition-all duration-300 hover:border-green-200 overflow-hidden">
                  {/* Top accent line */}
                  <motion.div 
                    className="absolute top-0 left-0 w-full h-1 bg-green-500"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.2 + 0.5 }}
                    style={{ originX: 0 }}
                  />
                  
                  {/* Hover background effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Engineering corner accents */}
                  <div className="absolute top-0 left-0 w-12 h-12 pointer-events-none">
                    <div className="absolute top-0 left-0 w-0.5 h-6 bg-green-500 transform origin-top scale-y-0 transition-transform group-hover:scale-y-100 duration-300"></div>
                    <div className="absolute top-0 left-0 h-0.5 w-6 bg-green-500 transform origin-left scale-x-0 transition-transform group-hover:scale-x-100 duration-300"></div>
                  </div>
                  <div className="absolute bottom-0 right-0 w-12 h-12 pointer-events-none">
                    <div className="absolute bottom-0 right-0 w-0.5 h-6 bg-green-500 transform origin-bottom scale-y-0 transition-transform group-hover:scale-y-100 duration-300"></div>
                    <div className="absolute bottom-0 right-0 h-0.5 w-6 bg-green-500 transform origin-right scale-x-0 transition-transform group-hover:scale-x-100 duration-300"></div>
                  </div>
                  
                  <div className="relative z-10">
                    <div className="flex justify-center mb-4 text-green-600 group-hover:text-green-700 transition-colors duration-300">
                      {stat.icon}
                    </div>
                    <motion.div 
                      className="text-3xl font-bold text-green-600 mb-2 group-hover:text-green-700 transition-colors duration-300"
                      initial={{ scale: 1 }}
                      whileInView={{ scale: [1, 1.1, 1] }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 + 0.8 }}
                    >
                      {stat.number}
                    </motion.div>
                    <p className="text-gray-800 font-semibold mb-2 text-sm">{stat.label}</p>
                    <p className="text-gray-600 text-xs leading-relaxed">{stat.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-blue-50 to-blue-100/50 p-8 relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-4 left-4 w-8 h-8 border border-blue-500 rotate-45"></div>
              <div className="absolute top-4 right-4 w-6 h-6 border border-blue-500"></div>
              <div className="absolute bottom-4 left-4 w-6 h-6 border border-blue-500 rotate-45"></div>
              <div className="absolute bottom-4 right-4 w-8 h-8 border border-blue-500"></div>
            </div>
            
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Ready to Transform Your Packaging Line?
              </h3>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                Join 800+ successful installations worldwide. Discover our complete company story and engineering excellence.
              </p>
              
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 25px rgba(59, 130, 246, 0.15)"
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push('/about/profile')}
                className="bg-white text-blue-600 px-10 py-4 font-semibold border-2 border-blue-500 hover:bg-blue-50 transition-all duration-300 relative group overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Discover Our Journey
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
                
                {/* Engineering corner accents */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-blue-500 group-hover:w-6 group-hover:h-6 transition-all duration-300"></div>
                <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-blue-500 group-hover:w-6 group-hover:h-6 transition-all duration-300"></div>
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-blue-500 group-hover:w-6 group-hover:h-6 transition-all duration-300"></div>
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-blue-500 group-hover:w-6 group-hover:h-6 transition-all duration-300"></div>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs; 