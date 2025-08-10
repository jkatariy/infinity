'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface RecommendedSolution {
  name: string;
  model: string;
  category: string;
}

interface PackagingSolution {
  title: string;
  imageUrl: string;
  recommendedSolutions: RecommendedSolution[];
}

const packagingSolutions: PackagingSolution[] = [
  {
    title: 'Pouch-into-Pouch',
    imageUrl: 'https://res.cloudinary.com/dbogkgabu/image/upload/v1754746229/IBP120_edbexr.png',
    recommendedSolutions: [
      { name: 'IBP-120', model: 'ibp-120', category: 'bundling-wrapping' },
      { name: 'IBS-200', model: 'ibs-200', category: 'bundling-wrapping' },
      { name: 'ISB-120', model: 'isb-120', category: 'bundling-wrapping' }
    ]
  },
  {
    title: 'Pouch-into-Bundle',
    imageUrl: 'https://res.cloudinary.com/dbogkgabu/image/upload/v1754746230/ISP_120_lvdiwf.png',
    recommendedSolutions: [
      { name: 'IBP-120', model: 'ibp-120', category: 'bundling-wrapping' },
      { name: 'IMS-800', model: 'ims-800', category: 'bundling-wrapping' },
      { name: 'ISP-120', model: 'isp-120', category: 'bundling-wrapping' }
    ]
  },
  {
    title: 'Bottle-into-Bottle',
    imageUrl: 'https://res.cloudinary.com/dbogkgabu/image/upload/v1754746229/IBL500_jsneot.png',
    recommendedSolutions: [
      { name: 'IWB-200', model: 'iwb-200', category: 'bundling-wrapping' },
      { name: 'IBP-120', model: 'ibp-120', category: 'bundling-wrapping' },
      { name: 'ICW-600', model: 'icw-600', category: 'checkweighers' }
    ]
  },
  {
    title: 'Pouch-into-Carton',
    imageUrl: 'https://res.cloudinary.com/dbogkgabu/image/upload/v1754746229/ACM100_zoxmwz.png',
    recommendedSolutions: [
      { name: 'ACM-40', model: 'acm-40', category: 'cartoning' },
      { name: 'ACM-100', model: 'acm-100', category: 'cartoning' },
      { name: 'ICW-1200', model: 'icw-1200', category: 'checkweighers' }
    ]
  },
  {
    title: 'Bottle-into-Bundle',
    imageUrl: 'https://res.cloudinary.com/dbogkgabu/image/upload/v1754746229/IBG_H8_V8_iv4gin.png',
    recommendedSolutions: [
      { name: 'IWB-200', model: 'iwb-200', category: 'bundling-wrapping' },
      { name: 'IMS-800', model: 'ims-800', category: 'bundling-wrapping' },
      { name: 'Case Erector', model: 'case-erector', category: 'case-packers' }
    ]
  },
  {
    title: 'Blister Pack into Carton',
    imageUrl: 'https://res.cloudinary.com/dbogkgabu/image/upload/v1754746229/ACM100_zoxmwz.png',
    recommendedSolutions: [
      { name: 'ACM-40', model: 'acm-40', category: 'cartoning' },
      { name: 'ACM-100', model: 'acm-100', category: 'cartoning' },
      { name: 'Vision Systems', model: 'vision-systems', category: 'inspection' }
    ]
  },
  {
    title: 'Kit Assembly',
    imageUrl: 'https://res.cloudinary.com/dbogkgabu/image/upload/v1754746230/ICP120_moud1x.png',
    recommendedSolutions: [
      { name: 'ICP-120', model: 'icp-120', category: 'case-packers' },
      { name: 'ICB-120', model: 'icb-120', category: 'case-packers' },
      { name: 'Modular Conveyor', model: 'modular-conveyor', category: 'conveying' }
    ]
  },
  {
    title: 'Case Packing and Palletizing',
    imageUrl: 'https://res.cloudinary.com/dbogkgabu/image/upload/v1754746229/ICS200_ibzmih.png',
    recommendedSolutions: [
      { name: 'ICS-200', model: 'ics-200', category: 'case-packers' },
      { name: 'Case Sealer', model: 'case-sealer', category: 'case-packers' },
      { name: 'IBG-H8-V8', model: 'ibg-h8-v8', category: 'pouch-baler' }
    ]
  }
];

const ExploreByIndustry = () => {
  const router = useRouter();
  const [selectedSolution, setSelectedSolution] = useState<PackagingSolution | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const itemsPerSlide = 4;
  const totalSlides = Math.ceil(packagingSolutions.length / itemsPerSlide);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const openModal = (solution: PackagingSolution) => {
    setSelectedSolution(solution);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedSolution(null);
  };

  const redirectToModel = (model: string, category: string) => {
    router.push(`/products/${category}/${model}`);
    closeModal();
  };

  return (
    <section className="bg-white py-20 font-product-sans">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <div className="relative inline-block">
            <h2 className="mb-4 text-4xl font-bold text-gray-900">Packaging Solutions</h2>
            {/* Section accent line */}
            <div className="absolute -top-2 left-1/2 h-0.5 w-32 -translate-x-1/2 transform bg-blue-500/20"></div>
          </div>
          <p className="mx-auto max-w-3xl text-xl text-gray-600">
            Explore our comprehensive packaging automation solutions designed for various product types and industry requirements.
          </p>
        </motion.div>

        {/* Packaging Solutions Slider */}
        {/* Mobile: single-line horizontal slider */}
        <div className="md:hidden">
          <div className="overflow-x-auto no-scrollbar">
            <div className="flex gap-4 px-1 snap-x snap-mandatory">
              {packagingSolutions.map((solution, index) => (
                <motion.div
                  key={solution.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="relative bg-white border border-gray-200 p-6 h-56 min-w-[260px] snap-start group hover:border-blue-500/50 transition-all duration-300 cursor-pointer"
                  onClick={() => openModal(solution)}
                >
                  {/* Engineering corner accents */}
                  <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-gray-300 group-hover:border-blue-400 transition-colors duration-300" />
                  <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-gray-300 group-hover:border-blue-400 transition-colors duration-300" />
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-gray-300 group-hover:border-blue-400 transition-colors duration-300" />
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-gray-300 group-hover:border-blue-400 transition-colors duration-300" />
                  {/* Top accent line */}
                  <div className="absolute top-0 left-0 w-full h-0.5 bg-gray-200 group-hover:bg-blue-500 transition-colors duration-300" />

                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <div className="relative w-full h-32 mb-3 overflow-hidden">
                      <Image
                        src={solution.imageUrl}
                        alt={solution.title}
                        fill
                        sizes="(max-width: 768px) 260px, 320px"
                        className="object-contain scale-110 origin-center"
                      />
                    </div>
                    <span className="sr-only">{solution.title}</span>
                  </div>

                  {/* Click indicator */}
                  {/* Bottom label near info icon */}
                  <div className="absolute bottom-3 right-9 text-[10px] sm:text-xs font-medium text-gray-600 bg-white/80 backdrop-blur-sm px-2 py-0.5 rounded border border-gray-200 group-hover:text-blue-700 group-hover:border-blue-300 transition-colors duration-300">
                    {solution.title}
                  </div>
                  <div className="absolute bottom-3 right-3 text-gray-300 group-hover:text-blue-500 transition-colors duration-300">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop/Tablet: paginated grid slider */}
        <div className="relative hidden md:block">
          {/* Slider Navigation */}
          <div className="absolute top-1/2 -translate-y-1/2 -left-4 z-10">
            <button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className="w-12 h-12 bg-white border border-gray-300 rounded-full shadow-lg flex items-center justify-center hover:border-blue-500 hover:text-blue-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>
          
          <div className="absolute top-1/2 -translate-y-1/2 -right-4 z-10">
            <button
              onClick={nextSlide}
              disabled={currentSlide === totalSlides - 1}
              className="w-12 h-12 bg-white border border-gray-300 rounded-full shadow-lg flex items-center justify-center hover:border-blue-500 hover:text-blue-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Slider Container */}
          <div className="overflow-hidden">
            <motion.div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0">
                   <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {packagingSolutions
                      .slice(slideIndex * itemsPerSlide, (slideIndex + 1) * itemsPerSlide)
                      .map((solution, index) => (
                        <motion.div
                          key={solution.title}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: index * 0.1 }}
                          className="relative bg-white border border-gray-200 p-8 h-64 group hover:border-blue-500/50 transition-all duration-300 cursor-pointer"
                          onClick={() => openModal(solution)}
                        >
                          {/* Engineering corner accents */}
                          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-gray-300 group-hover:border-blue-400 transition-colors duration-300"></div>
                          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-gray-300 group-hover:border-blue-400 transition-colors duration-300"></div>
                          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-gray-300 group-hover:border-blue-400 transition-colors duration-300"></div>
                          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-gray-300 group-hover:border-blue-400 transition-colors duration-300"></div>
                          {/* Top accent line */}
                          <div className="absolute top-0 left-0 w-full h-0.5 bg-gray-200 group-hover:bg-blue-500 transition-colors duration-300"></div>
                          
                          {/* Content */}
                          <div className="flex flex-col items-center justify-center h-full text-center">
                            <div className="relative w-full h-36 mb-4 overflow-hidden">
                              <Image
                                src={solution.imageUrl}
                                alt={solution.title}
                                fill
                                sizes="(max-width: 1024px) 45vw, 25vw"
                                className="object-contain scale-110 origin-center"
                              />
                            </div>
                            <span className="sr-only">{solution.title}</span>
                          </div>
                          
                          {/* Click indicator */}
                          {/* Bottom label near info icon */}
                          <div className="absolute bottom-4 right-12 text-xs font-medium text-gray-600 bg-white/80 backdrop-blur-sm px-2 py-0.5 rounded border border-gray-200 group-hover:text-blue-700 group-hover:border-blue-300 transition-colors duration-300">
                            {solution.title}
                          </div>
                          <div className="absolute bottom-4 right-4 text-gray-400 group-hover:text-blue-500 transition-colors duration-300">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                        </motion.div>
                      ))}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-blue-600 scale-110' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Modal */}
        {showModal && selectedSolution && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={closeModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-lg shadow-2xl max-w-md w-full mx-4 p-8 relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Modal content */}
              <div className="text-center mb-6">
                <div className="relative w-full h-32 mb-4">
                  <Image
                    src={selectedSolution.imageUrl}
                    alt={selectedSolution.title}
                    fill
                    sizes="(max-width: 480px) 90vw, 420px"
                    className="object-contain"
                  />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedSolution.title}</h3>
                <p className="text-lg font-semibold text-blue-600 mb-6">Recommended Solutions</p>
              </div>

              {/* Recommended solutions */}
              <div className="space-y-3">
                {selectedSolution.recommendedSolutions.map((machine, index) => (
                  <motion.button
                    key={machine.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => redirectToModel(machine.model, machine.category)}
                    className="w-full text-left p-4 bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-300 rounded-lg transition-all duration-300 group"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900 group-hover:text-blue-900">
                          {machine.name}
                        </h4>
                        <p className="text-sm text-gray-600 capitalize">
                          {machine.category.replace('-', ' ')}
                        </p>
                      </div>
                      <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Footer */}
              <div className="mt-6 pt-4 border-t border-gray-200 text-center">
                <p className="text-sm text-gray-500">
                  Click on any machine to view detailed specifications
                </p>
              </div>
            </motion.div>
          </div>
        )}

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
            <button 
            onClick={() => router.push('/products')}
            aria-label="View all solutions"
            className="bg-blue-600 text-white px-8 py-3 font-medium hover:bg-blue-700 transition-all duration-300 relative group"
          >
            <span className="relative z-10">View All Solutions</span>
            {/* Engineering corner accents */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-blue-400 group-hover:w-4 group-hover:h-4 transition-all duration-300"></div>
            <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-blue-400 group-hover:w-4 group-hover:h-4 transition-all duration-300"></div>
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-blue-400 group-hover:w-4 group-hover:h-4 transition-all duration-300"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-blue-400 group-hover:w-4 group-hover:h-4 transition-all duration-300"></div>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default ExploreByIndustry; 