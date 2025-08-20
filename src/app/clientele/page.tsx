'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import PageContainer from '@/components/PageContainer';

const clients = [
  {
    category: 'FMCG & Food',
    companies: ['Unilever', 'ITC', 'MARS', 'Britannia', 'EVEREST', 'MARICO'],
  },
  {
    category: 'Industrial & Manufacturing',
    companies: ['TATA', 'ADANI', 'WELSPUN'],
  },
  {
    category: 'Pharmaceuticals',
    companies: ['GSK', 'Leading Pharma Companies'],
  },
  {
    category: 'Consumer Goods',
    companies: ['GCPL', 'Major FMCG Brands'],
  },
];



export default function Clientele() {
  return (
    <PageContainer
      title="Our Clientele"
      subtitle="Trusted by industry leaders worldwide"
    >
      {/* Key Statistics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
      >
        <div className="bg-gray-50 rounded-2xl p-8 text-center">
          <h3 className="text-4xl font-bold text-blue-600 mb-2">400+</h3>
          <p className="text-gray-600">Global Clients</p>
        </div>
        <div className="bg-gray-50 rounded-2xl p-8 text-center">
          <h3 className="text-4xl font-bold text-blue-600 mb-2">800+</h3>
          <p className="text-gray-600">Installations Completed</p>
        </div>
        <div className="bg-gray-50 rounded-2xl p-8 text-center">
          <h3 className="text-4xl font-bold text-blue-600 mb-2">10+</h3>
          <p className="text-gray-600">Years of Innovation</p>
        </div>
      </motion.div>

      {/* Client Logos Gallery */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mb-20"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 relative inline-block">
            Our Trusted Partners
            <div className="absolute -top-2 left-0 right-0 h-0.5 bg-brand-blue-500/30"></div>
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Leading global brands trust Infinity for their packaging automation needs
          </p>
        </div>

        <div className="relative bg-white border-2 border-gray-200 p-8 rounded-lg">
          {/* Engineering corner accents */}
          <div className="absolute -top-1 -left-1 w-8 h-8 border-t-4 border-l-4 border-brand-blue-500"></div>
          <div className="absolute -top-1 -right-1 w-8 h-8 border-t-4 border-r-4 border-brand-blue-500"></div>
          <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b-4 border-l-4 border-brand-blue-500"></div>
          <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-4 border-r-4 border-brand-blue-500"></div>
          
          {/* Top accent line */}
          <div className="absolute top-0 left-8 right-8 h-1 bg-gradient-to-r from-transparent via-brand-blue-500 to-transparent"></div>
          <div className="absolute bottom-0 left-8 right-8 h-1 bg-gradient-to-r from-transparent via-brand-blue-500 to-transparent"></div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6">
            {[
              "https://res.cloudinary.com/dbogkgabu/image/upload/v1752950542/clients1_kquq9t.jpg",
              "https://res.cloudinary.com/dbogkgabu/image/upload/v1752950542/clients2_ztnmxr.png",
              "https://res.cloudinary.com/dbogkgabu/image/upload/v1752950542/clients3_vdtct2.png",
              "https://res.cloudinary.com/dbogkgabu/image/upload/v1752950542/clients4_uppzyn.png",
              "https://res.cloudinary.com/dbogkgabu/image/upload/v1752950543/clients5_qfyugt.jpg",
              "https://res.cloudinary.com/dbogkgabu/image/upload/v1752950543/clients6_lk5lx5.jpg",
              "https://res.cloudinary.com/dbogkgabu/image/upload/v1752950543/clients7_s7g9ri.jpg",
              "https://res.cloudinary.com/dbogkgabu/image/upload/v1752950543/clients8_xxlir6.png",
              "https://res.cloudinary.com/dbogkgabu/image/upload/v1752950544/clients9_vk1twu.png",
              "https://res.cloudinary.com/dbogkgabu/image/upload/v1752950542/clients_10_pmr8k9.png",
              "https://res.cloudinary.com/dbogkgabu/image/upload/v1752950543/clients11_fk21g0.png",
              "https://res.cloudinary.com/dbogkgabu/image/upload/v1752950543/clients12_exqc92.jpg",
              "https://res.cloudinary.com/dbogkgabu/image/upload/v1752950543/clients13_suluse.jpg",
              "https://res.cloudinary.com/dbogkgabu/image/upload/v1752950543/clients14_vgecqj.png",
              "https://res.cloudinary.com/dbogkgabu/image/upload/v1752950544/clients15_fn2wrl.jpg",
              "https://res.cloudinary.com/dbogkgabu/image/upload/v1752950544/clients16_tyb2aw.jpg",
              "https://res.cloudinary.com/dbogkgabu/image/upload/v1752950544/clients19_ffcyah.jpg",
              "https://res.cloudinary.com/dbogkgabu/image/upload/v1752950544/clients20_rdappn.jpg",
              "https://res.cloudinary.com/dbogkgabu/image/upload/v1752950544/clients21_phekt2.png"
            ].map((clientLogo, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group relative"
              >
                <div className="relative bg-white border border-gray-200 p-4 rounded-lg hover:border-brand-blue-500 hover:shadow-lg transition-all duration-300">
                  {/* Corner accents */}
                  <div className="absolute -top-0.5 -left-0.5 w-3 h-3 border-t-2 border-l-2 border-brand-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute -top-0.5 -right-0.5 w-3 h-3 border-t-2 border-r-2 border-brand-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute -bottom-0.5 -left-0.5 w-3 h-3 border-b-2 border-l-2 border-brand-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 border-b-2 border-r-2 border-brand-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <Image
                    src={clientLogo}
                    alt={`Client ${index + 1}`}
                    width={120}
                    height={80}
                    className="w-full h-16 object-contain filter group-hover:grayscale transition-all duration-300"
                  />
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Client summary */}
          <div className="mt-8 pt-8 border-t border-gray-200 text-center">
            <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-brand-blue-500 rounded-full"></div>
                <span className="text-gray-700 font-medium">Global Fortune 500 Companies</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-brand-green-500 rounded-full"></div>
                <span className="text-gray-700 font-medium">Leading FMCG & Manufacturing Brands</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-brand-blue-400 rounded-full"></div>
                <span className="text-gray-700 font-medium">International Market Leaders</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>


    </PageContainer>
  );
} 