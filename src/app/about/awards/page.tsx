'use client';

import { motion } from 'framer-motion';
import PageContainer from '@/components/PageContainer';
import Image from 'next/image';
import { useEffect, useState } from 'react';



const certifications = [
  {
    title: 'ISO 9001:2015',
    description: 'Quality Management Systems certification demonstrating our commitment to consistent quality and customer satisfaction.',
    year: '2016',
    category: 'Quality Management',
    icon: (
      <svg className="h-8 w-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    )
  },
  {
    title: 'CE Marking',
    description: 'European Conformity marking indicating compliance with health, safety, and environmental protection standards.',
    year: 'Current',
    category: 'Safety Standards',
    icon: (
      <svg className="h-8 w-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },

];

const currentAchievements = [
  { label: '40,000 Sq. Ft Plant', value: '1', icon: '🏭' },
  { label: 'Years of Innovation', value: '10+', icon: '📅' },
  { label: 'Designers', value: '25+', icon: '👨‍💻' },
  { label: 'Total Installations', value: '800+', icon: '⚙️' },
  { label: 'Solutions', value: '20+', icon: '🚀' },
  { label: 'Engineering Professionals', value: '125+', icon: '👥' },
];

export default function Awards() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <PageContainer
        title="Our Evolution & Achievements"
        subtitle="Eight years of innovation, growth, and industry leadership in packaging automation"
      >
        <div className="animate-pulse">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-20">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-gray-200 h-32 rounded"></div>
            ))}
          </div>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer
      title="Our Evolution & Achievements"
      subtitle="Eight years of innovation, growth, and industry leadership in packaging automation"
    >
      {/* Current Status Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-20"
      >
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 relative inline-block">
            Current Status (2024)
            <div className="absolute -top-2 left-0 right-0 h-0.5 bg-blue-500/30"></div>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Today, Infinity stands as a leading provider of secondary packaging automation with a strong foundation built over eight years
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {currentAchievements.map((achievement, index) => (
            <motion.div
              key={achievement.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white border border-gray-200 p-6 text-center relative group hover:shadow-lg transition-all duration-300"
            >
              {/* Engineering corner accents */}
              <div className="absolute top-0 left-0 w-12 h-12 pointer-events-none">
                <div className="absolute top-0 left-0 w-0.5 h-6 bg-blue-500 transform origin-top scale-y-0 transition-transform group-hover:scale-y-100"></div>
                <div className="absolute top-0 left-0 h-0.5 w-6 bg-blue-500 transform origin-left scale-x-0 transition-transform group-hover:scale-x-100"></div>
              </div>
              <div className="absolute bottom-0 right-0 w-12 h-12 pointer-events-none">
                <div className="absolute bottom-0 right-0 w-0.5 h-6 bg-blue-500 transform origin-bottom scale-y-0 transition-transform group-hover:scale-y-100"></div>
                <div className="absolute bottom-0 right-0 h-0.5 w-6 bg-blue-500 transform origin-right scale-x-0 transition-transform group-hover:scale-x-100"></div>
              </div>
              
              <div className="text-2xl mb-2">{achievement.icon}</div>
              <div className="text-2xl font-bold text-blue-600 mb-2">{achievement.value}</div>
              <p className="text-gray-600 text-sm font-medium">{achievement.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Awards Gallery Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="mb-20"
      >
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 relative inline-block">
            Awards & Recognition
            <div className="absolute -top-2 left-0 right-0 h-0.5 bg-brand-blue-500/30"></div>
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Celebrating our achievements and industry recognition for innovation and excellence in packaging automation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[
            { 
              src: "https://res.cloudinary.com/dbogkgabu/image/upload/v1752950540/awards1_hfng2r.png",
              title: "Industry Excellence Award",
              year: "2023"
            },
            { 
              src: "https://res.cloudinary.com/dbogkgabu/image/upload/v1752950540/awards2_xjrfgu.png",
              title: "Innovation Leadership",
              year: "2022"
            },
            { 
              src: "https://res.cloudinary.com/dbogkgabu/image/upload/v1752950540/awards3_fj5rac.png",
              title: "Best Entrepreneur Award",
              year: "2021"
            },
            { 
              src: "https://res.cloudinary.com/dbogkgabu/image/upload/v1752950541/awards5_nlbjim.png",
              title: "Technology Innovation",
              year: "2020"
            },
            { 
              src: "https://res.cloudinary.com/dbogkgabu/image/upload/v1752950541/awards6_idydwb.jpg",
              title: "Quality Excellence",
              year: "2019"
            },
            { 
              src: "https://res.cloudinary.com/dbogkgabu/image/upload/v1752950541/awards7_nvgtep.png",
              title: "Business Leadership",
              year: "2018"
            },
            { 
              src: "https://res.cloudinary.com/dbogkgabu/image/upload/v1752950541/awards8_vcrsqw.jpg",
              title: "Outstanding Achievement",
              year: "2017"
            },
            { 
              src: "https://res.cloudinary.com/dbogkgabu/image/upload/v1752950542/awards9_vezyun.png",
              title: "Industry Recognition",
              year: "2016"
            }
          ].map((award, index) => (
            <motion.div
              key={award.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="relative bg-white border-2 border-gray-200 p-4 hover:border-brand-blue-500 transition-all duration-300 hover:shadow-xl">
                {/* Engineering corner accents */}
                <div className="absolute -top-1 -left-1 w-6 h-6 border-t-2 border-l-2 border-brand-blue-500 group-hover:border-brand-green-500 transition-colors duration-300"></div>
                <div className="absolute -top-1 -right-1 w-6 h-6 border-t-2 border-r-2 border-brand-blue-500 group-hover:border-brand-green-500 transition-colors duration-300"></div>
                <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-2 border-l-2 border-brand-blue-500 group-hover:border-brand-green-500 transition-colors duration-300"></div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-2 border-r-2 border-brand-blue-500 group-hover:border-brand-green-500 transition-colors duration-300"></div>
                
                {/* Award image */}
                <div className="relative overflow-hidden rounded-lg mb-4">
                  <Image
                    src={award.src}
                    alt={award.title}
                    width={300}
                    height={400}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-blue-500/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <div className="flex items-center justify-center space-x-2">
                        <svg className="h-5 w-5 text-brand-green-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
                        </svg>
                        <span className="text-sm font-medium">Award</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Award details */}
                <div className="text-center">
                  <h3 className="text-sm font-semibold text-gray-900 mb-2 group-hover:text-brand-blue-500 transition-colors duration-300">
                    {award.title}
                  </h3>
                  <div className="flex items-center justify-center space-x-2">
                    <span className="inline-block w-2 h-2 bg-brand-green-500 rounded-full"></span>
                    <span className="text-xs text-gray-600 font-medium">{award.year}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Awards summary */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-brand-blue-50 to-brand-green-50 border border-brand-blue-200 rounded-lg">
            <svg className="h-5 w-5 text-brand-green-500 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
            </svg>
            <span className="text-brand-blue-700 font-medium">8+ Industry Awards for Excellence & Innovation</span>
          </div>
        </div>
      </motion.div>



      {/* Certifications Section */}
      <div className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 relative inline-block">
            Certifications & Standards
            <div className="absolute -top-2 left-0 right-0 h-0.5 bg-blue-500/30"></div>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our commitment to quality and safety is demonstrated through rigorous certifications and compliance with international standards
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="bg-white border border-gray-200 p-8 text-center relative group hover:shadow-lg transition-all duration-300"
            >
              {/* Engineering corner accents */}
              <div className="absolute top-0 left-0 w-16 h-16 pointer-events-none">
                <div className="absolute top-0 left-0 w-0.5 h-8 bg-blue-500 transform origin-top scale-y-0 transition-transform group-hover:scale-y-100"></div>
                <div className="absolute top-0 left-0 h-0.5 w-8 bg-blue-500 transform origin-left scale-x-0 transition-transform group-hover:scale-x-100"></div>
              </div>
              <div className="absolute bottom-0 right-0 w-16 h-16 pointer-events-none">
                <div className="absolute bottom-0 right-0 w-0.5 h-8 bg-blue-500 transform origin-bottom scale-y-0 transition-transform group-hover:scale-y-100"></div>
                <div className="absolute bottom-0 right-0 h-0.5 w-8 bg-blue-500 transform origin-right scale-x-0 transition-transform group-hover:scale-x-100"></div>
              </div>
              
              <div className="flex justify-center mb-6">
                {cert.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{cert.title}</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">{cert.description}</p>
              <div className="flex justify-between items-center">
                <span className="inline-block bg-gray-50 text-gray-700 text-sm px-3 py-1 rounded border border-gray-200">
                  {cert.category}
                </span>
                <span className="text-sm font-medium text-blue-600">Since {cert.year}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quality Commitment Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="relative bg-white border border-gray-200 p-12 text-center group"
      >
        {/* Engineering corner accents */}
        <div className="absolute top-0 left-0 w-16 h-16 pointer-events-none">
          <div className="absolute top-0 left-0 w-0.5 h-8 bg-blue-500"></div>
          <div className="absolute top-0 left-0 h-0.5 w-8 bg-blue-500"></div>
        </div>
        <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none">
          <div className="absolute top-0 right-0 w-0.5 h-8 bg-blue-500"></div>
          <div className="absolute top-0 right-0 h-0.5 w-8 bg-blue-500"></div>
        </div>
        <div className="absolute bottom-0 left-0 w-16 h-16 pointer-events-none">
          <div className="absolute bottom-0 left-0 w-0.5 h-8 bg-blue-500"></div>
          <div className="absolute bottom-0 left-0 h-0.5 w-8 bg-blue-500"></div>
        </div>
        <div className="absolute bottom-0 right-0 w-16 h-16 pointer-events-none">
          <div className="absolute bottom-0 right-0 w-0.5 h-8 bg-blue-500"></div>
          <div className="absolute bottom-0 right-0 h-0.5 w-8 bg-blue-500"></div>
        </div>
        
        {/* Top accent line */}
        <div className="absolute top-0 left-0 w-full h-0.5 bg-blue-500/30"></div>

        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Excellence Through Evolution</h2>
          <p className="text-gray-700 text-lg mb-8 leading-relaxed">
            From our foundation in 2015 to becoming a trusted partner for global leaders like Unilever and MARS, 
            our journey reflects unwavering commitment to innovation, quality, and customer success. 
            Every milestone represents our dedication to enhancing manufacturing efficiency through cutting-edge automation solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors border border-blue-600 hover:border-blue-700 group"
            >
              Partner With Us
              <svg className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
            <a
              href="/about/profile"
              className="inline-flex items-center px-8 py-4 border border-gray-300 text-gray-700 font-semibold hover:border-gray-400 hover:text-gray-900 transition-colors"
            >
              Learn More About Our Company
            </a>
          </div>
        </div>
      </motion.div>
    </PageContainer>
  );
} 