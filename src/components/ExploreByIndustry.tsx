'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

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
    title: 'Pouch into Pouch',
    imageUrl: 'https://res.cloudinary.com/dbogkgabu/image/upload/v1755605362/cijazcw4q8omrgihklrn.png',
    recommendedSolutions: [
      { name: 'IBP-120 – High Speed Bundler', model: 'ibp-120', category: 'bundling-wrapping' },
      { name: 'IBS-200 – Strip Packaging Machine', model: 'ibs-200', category: 'bundling-wrapping' }
    ]
  },
  {
    title: 'Pouch into Bag',
    imageUrl: 'https://res.cloudinary.com/dbogkgabu/image/upload/v1755086734/mvqwctriwg6aslhkktgx.png',
    recommendedSolutions: [
      { name: 'IBG-H8 – Horizontal Baler', model: 'ibg-h8-v8', category: 'pouch-baler' },
      { name: 'IBG-V8 – Vertical Baler', model: 'ibg-h8-v8', category: 'pouch-baler' },
      { name: 'IBG-H8-V8 – Combined Bagging Machines', model: 'ibg-h8-v8', category: 'pouch-baler' }
    ]
  },
  {
    title: 'Pouch into Bale',
    imageUrl: 'https://res.cloudinary.com/dbogkgabu/image/upload/v1755086734/lrgipcq21vhydfnrrrlw.png',
    recommendedSolutions: [
      { name: 'IBL-500 – Automatic Baler', model: 'ibl-500', category: 'pouch-baler' }
    ]
  },
  {
    title: 'Strip into Pouch',
    imageUrl: 'https://res.cloudinary.com/dbogkgabu/image/upload/v1755605363/twapfjgmctqsclpejdz4.png',
    recommendedSolutions: [
      { name: 'IBS-200 – Strip Packaging Machine', model: 'ibs-200', category: 'bundling-wrapping' },
      { name: 'IMS-800/600 – Multitrack VFFS Integration', model: 'ims-800', category: 'bundling-wrapping' }
    ]
  },
  {
    title: 'Pouch into Carton',
    imageUrl: 'https://res.cloudinary.com/dbogkgabu/image/upload/v1755086734/qrj4n9yks1hdlbkm0g9g.png',
    recommendedSolutions: [
      { name: 'ICP-120 – Robotic Case Packer for Pouches', model: 'icp-120', category: 'case-packers' }
    ]
  },
  {
    title: 'Product into Carton',
    imageUrl: 'https://res.cloudinary.com/dbogkgabu/image/upload/v1755086734/rgoqtzs5cxl9joyva9ry.png',
    recommendedSolutions: [
      { name: 'ACM-100 – Automatic Cartoning Machine', model: 'acm-100', category: 'cartoning' },
      { name: 'ACM-40 – Semi-Automatic Cartoning Machine', model: 'acm-40', category: 'cartoning' }
    ]
  },
  {
    title: 'Strip into Carton',
    imageUrl: 'https://res.cloudinary.com/dbogkgabu/image/upload/v1755086735/rv3yfohc5ghnwom8zzjc.png',
    recommendedSolutions: [
      { name: 'ICS-200 – Case Packer for Strip of Pouches', model: 'ics-200', category: 'case-packers' }
    ]
  },
  {
    title: 'Bottle into Carton',
    imageUrl: 'https://res.cloudinary.com/dbogkgabu/image/upload/v1755086735/uyph9ght8mxfopcxjaf6.png',
    recommendedSolutions: [
      { name: 'ICB-120 – Case Packer for Bottles', model: 'icb-120', category: 'case-packers' }
    ]
  },
  {
    title: 'Shrink Wrapping',
    imageUrl: 'https://res.cloudinary.com/dbogkgabu/image/upload/v1755099163/xkq0ua5zarxplallh51w.png',
    recommendedSolutions: [
      { name: 'ISP-120 – Shrink Wrapping for Pouches', model: 'isp-120', category: 'bundling-wrapping' },
      { name: 'IWB-200 – Shrink Wrapping for Bottles', model: 'iwb-200', category: 'bundling-wrapping' },
      { name: 'ISB-120 – Shrink Wrapping for Bottles', model: 'isb-120', category: 'bundling-wrapping' }
    ]
  }
];

// Modal Component using Portal
const Modal = ({ 
  isOpen, 
  onClose, 
  solution, 
  onRedirect 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  solution: PackagingSolution | null; 
  onRedirect: (model: string, category: string) => void;
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      // Store the currently focused element
      previouslyFocusedElement.current = document.activeElement as HTMLElement;
      
      // Focus the modal
      if (modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstFocusableElement = focusableElements[0] as HTMLElement;
        if (firstFocusableElement) {
          firstFocusableElement.focus();
        }
      }
    } else {
      // Restore focus when modal closes
      if (previouslyFocusedElement.current) {
        previouslyFocusedElement.current.focus();
      }
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  const handleTabKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Tab' && modalRef.current) {
      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    }
  };

  if (!isOpen || !solution) return null;

  // Create portal to render modal outside normal DOM hierarchy
  return createPortal(
    <div 
      className="portal-modal"
      style={{ 
        overscrollBehavior: 'contain',
        touchAction: 'none'
      }}
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="portal-modal-backdrop"
        onClick={onClose}
        style={{ touchAction: 'none' }}
      />
      
      {/* Modal Content */}
      <motion.div
        ref={modalRef}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="portal-modal-content"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleTabKey}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        style={{ 
          willChange: 'transform',
          touchAction: 'manipulation'
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all duration-200 z-10"
          aria-label="Close modal"
          style={{ touchAction: 'manipulation' }}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Modal content */}
        <div className="p-6">
          <div className="text-center mb-6">
            <div className="relative w-full h-32 mb-4">
              <Image
                src={solution.imageUrl}
                alt={solution.title}
                fill
                sizes="(max-width: 480px) 90vw, 420px"
                className="object-contain"
              />
            </div>
            <h3 id="modal-title" className="text-2xl font-bold text-gray-900 mb-2">{solution.title}</h3>
            <p className="text-lg font-semibold text-blue-600 mb-6">Recommended Solutions</p>
          </div>

          {/* Recommended solutions */}
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {solution.recommendedSolutions.map((machine, index) => (
              <motion.button
                key={machine.name}
                type="button"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => onRedirect(machine.model, machine.category)}
                className="w-full text-left p-4 bg-gray-50 hover:bg-blue-50 focus:bg-blue-50 border border-gray-200 hover:border-blue-300 focus:border-blue-400 rounded-lg transition-all duration-300 group"
                aria-label={`Go to ${machine.name}`}
                style={{ touchAction: 'manipulation' }}
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
        </div>
      </motion.div>
    </div>,
    document.body
  );
};

const ExploreByIndustry = () => {
  const router = useRouter();
  const [selectedSolution, setSelectedSolution] = useState<PackagingSolution | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const pointerStartRef = useRef<{ x: number; y: number } | null>(null);
  const [mounted, setMounted] = useState(false);

  const itemsPerSlide = 4;
  const totalSlides = Math.ceil(packagingSolutions.length / itemsPerSlide);
  // Build a cyclic list so the last slide is filled by looping from the start
  const fullItemCount = totalSlides * itemsPerSlide;
  const cyclicSolutions = Array.from({ length: fullItemCount }, (_, i) => packagingSolutions[i % packagingSolutions.length]);

  // Ensure component is mounted before rendering portal
  useEffect(() => {
    setMounted(true);
  }, []);

  // Simple scroll lock when modal is open
  useEffect(() => {
    if (showModal) {
      // Store current scroll position
      const scrollY = window.scrollY;
      
      // Prevent scroll
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      
      return () => {
        // Restore scroll
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [showModal]);

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
  };

  // Mobile slider: treat as a click only if the finger didn't move (avoid accidental taps during horizontal swipe)
  const handlePointerDown = (e: React.PointerEvent) => {
    pointerStartRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = (solution: PackagingSolution) => (e: React.PointerEvent) => {
    const start = pointerStartRef.current;
    pointerStartRef.current = null;
    if (!start) return;
    const dx = Math.abs(e.clientX - start.x);
    const dy = Math.abs(e.clientY - start.y);
    // Only treat as click if movement is minimal (threshold: 10px)
    if (dx < 10 && dy < 10) {
      e.preventDefault();
      e.stopPropagation();
      openModal(solution);
    }
  };

  const handlePointerCancel = () => {
    pointerStartRef.current = null;
  };

  // Desktop click handler - cleaner separation from mobile
  const handleDesktopClick = (solution: PackagingSolution) => (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openModal(solution);
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
          <div className="overflow-x-auto no-scrollbar" style={{ touchAction: 'pan-x', WebkitOverflowScrolling: 'touch' as any }}>
            <div className="flex gap-4 px-1 snap-x snap-mandatory">
              {packagingSolutions.map((solution, index) => (
                <motion.div
                  key={solution.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="relative bg-white border border-gray-200 p-6 h-56 min-w-[260px] snap-start group hover:border-blue-500/50 hover:shadow-md transition-all duration-300 cursor-pointer touch-manipulation"
                  onPointerDown={handlePointerDown}
                  onPointerUp={handlePointerUp(solution)}
                  onPointerCancel={handlePointerCancel}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      openModal(solution);
                    }
                  }}
                  aria-label={`View solutions for ${solution.title}`}
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
                        className="object-contain scale-125 origin-center"
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
              className="w-12 h-12 bg-white border border-gray-300 rounded-full shadow-lg flex items-center justify-center hover:border-blue-500 hover:text-blue-600 focus:border-blue-500 focus:text-blue-600 transition-all duration-300"
              aria-label="Previous solutions"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>
          
          <div className="absolute top-1/2 -translate-y-1/2 -right-4 z-10">
            <button
              onClick={nextSlide}
              className="w-12 h-12 bg-white border border-gray-300 rounded-full shadow-lg flex items-center justify-center hover:border-blue-500 hover:text-blue-600 focus:border-blue-500 focus:text-blue-600 transition-all duration-300"
              aria-label="Next solutions"
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
                   <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
                    {cyclicSolutions
                      .slice(slideIndex * itemsPerSlide, (slideIndex + 1) * itemsPerSlide)
                      .map((solution, index) => (
                        <motion.div
                          key={solution.title}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: index * 0.1 }}
                          className="relative bg-white border border-gray-200 p-4 md:p-6 lg:p-8 h-56 md:h-64 group hover:border-blue-500/50 hover:shadow-lg transition-all duration-300 cursor-pointer"
                          onClick={handleDesktopClick(solution)}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              openModal(solution);
                            }
                          }}
                          aria-label={`View solutions for ${solution.title}`}
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
                            <div className="relative w-full h-32 md:h-36 mb-3 md:mb-4 overflow-hidden">
                              <Image
                                src={solution.imageUrl}
                                alt={solution.title}
                                fill
                                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 45vw, 25vw"
                                className="object-contain scale-125 md:scale-150 origin-center"
                              />
                            </div>
                            <span className="sr-only">{solution.title}</span>
                          </div>
                          
                          {/* Click indicator */}
                          {/* Bottom label near info icon */}
                          <div className="absolute bottom-3 md:bottom-4 right-10 md:right-12 text-xs font-medium text-gray-600 bg-white/80 backdrop-blur-sm px-2 py-0.5 rounded border border-gray-200 group-hover:text-blue-700 group-hover:border-blue-300 transition-colors duration-300">
                            {solution.title}
                          </div>
                          <div className="absolute bottom-3 md:bottom-4 right-3 md:right-4 text-gray-400 group-hover:text-blue-500 transition-colors duration-300">
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

        {/* Modal using Portal */}
        {mounted && (
          <AnimatePresence>
            <Modal
              isOpen={showModal}
              onClose={closeModal}
              solution={selectedSolution}
              onRedirect={redirectToModel}
            />
          </AnimatePresence>
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