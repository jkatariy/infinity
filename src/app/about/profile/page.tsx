'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Breadcrumbs from '@/components/Breadcrumbs';
import { BRAND_COLORS } from '@/lib/theme';

export default function Profile() {
  const stats = [
    { label: 'Years of Innovation', value: '10+', accent: '#4F46E5' },
    { label: 'Total Installations', value: '800+', accent: '#059669' },
    { label: 'Full-time Employees', value: '130+', accent: '#0891B2' },
    { label: 'Design Engineers', value: '20+', accent: '#2563EB' },
    { label: 'Product Launches', value: '30+', accent: '#9333EA' },
    { label: 'Dedicated Partners', value: '14', accent: '#DC2626' },
  ];

  const keyStrengths = [
    {
      title: "Engineering Excellence",
      description: "In-house R&D team ensuring precision in every machine design",
      accent: '#4F46E5'
    },
    {
      title: "Industry Expertise", 
      description: "Deep knowledge across Food & Beverage, FMCG, Pharmaceuticals, and more",
      accent: '#059669'
    },
    {
      title: "Innovation Leadership",
      description: "First in industry pouch-in-pouch bundling and wrapping technology",
      accent: '#0891B2'
    },
    {
      title: "Complete Solutions",
      description: "End-to-end automation for all packaging needs with unmatched accuracy",
      accent: '#9333EA'
    }
  ];

  const timeline: { year: string; points: string[] }[] = [
    { year: '2015', points: ['Company was founded', 'Infinity certified with ISO 9001:2015'] },
    { year: '2015', points: ['Engineered and deployed first secondary machine to Everest Spices'] },
    { year: '2017', points: ['Received Award for Best SIL Entrepreneur'] },
    { year: '2018', points: ['E2E Pouch-in-Bag developed and launched'] },
    { year: '2019', points: ['Installed 4 Auto Case Packers for MARS'] },
    { year: '2020', points: ['Became preferred partner for India\'s Spices & Tea brands'] },
    { year: '2021', points: ['Unilever partnered with Infinity for Secondary Packaging'] },
    { year: '2022', points: ['Expanded manufacturing base with a new factory setup'] },
    { year: '2023', points: ['Deployed first-in-India technology for string of diaper packs'] },
    { year: '2024', points: ['Largest case packer for biscuit', 'Biggest project for staple foods in Africa', 'Biggest snack brand in Thailand'] },
  ];

  // Improved AutoMarquee component with better performance and accessibility
  function AutoMarquee({ children }: { children: React.ReactNode }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isPaused, setIsPaused] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setIsVisible(entry.isIntersecting);
        },
        { threshold: 0.1 }
      );

      if (containerRef.current) {
        observer.observe(containerRef.current);
      }

      return () => observer.disconnect();
    }, []);

    useEffect(() => {
      if (!isVisible || isPaused) return;

      const el = containerRef.current;
      if (!el) return;

      let animationId: number;
      let lastTime = performance.now();
      const speed = 0.2; // Reduced speed for better performance

      const animate = (currentTime: number) => {
        if (!isPaused && isVisible) {
          const deltaTime = currentTime - lastTime;
          lastTime = currentTime;

          el.scrollLeft += speed * deltaTime;

          // Smooth loop
          if (el.scrollLeft >= el.scrollWidth / 2) {
            el.scrollLeft = 0;
          }

          animationId = requestAnimationFrame(animate);
        }
      };

      animationId = requestAnimationFrame(animate);

      return () => {
        if (animationId) {
          cancelAnimationFrame(animationId);
        }
      };
    }, [isVisible, isPaused]);

    return (
      <div 
        ref={containerRef}
        className="relative overflow-x-auto py-8 snap-x snap-mandatory scrollbar-hide"
        style={{ 
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch'
        }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocus={() => setIsPaused(true)}
        onBlur={() => setIsPaused(false)}
        role="region"
        aria-label="Company evolution timeline"
        tabIndex={0}
      >
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-20 sm:pt-24 md:pt-24 lg:pt-24">
      {/* Main */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="pt-3">
          <Breadcrumbs currentLabel="Profile" />
        </div>

        {/* About Banner - Engineering Boxed */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="relative bg-white border-2 border-gray-200 p-8 sm:p-10 lg:p-12 rounded-xl shadow-sm">
            {/* Corner accents */}
            <div className="absolute -top-1 -left-1 w-8 h-8 border-t-4 border-l-4 border-brand-blue-500" />
            <div className="absolute -top-1 -right-1 w-8 h-8 border-t-4 border-r-4 border-brand-blue-500" />
            <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b-4 border-l-4 border-brand-blue-500" />
            <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-4 border-r-4 border-brand-blue-500" />

            {/* Accent lines */}
            <div className="absolute top-0 left-8 right-8 h-1 bg-gradient-to-r from-transparent via-brand-blue-500 to-transparent" />
            <div className="absolute bottom-0 left-8 right-8 h-1 bg-gradient-to-r from-transparent via-brand-blue-500 to-transparent" />

            <div className="text-center">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">About Us</h1>
              <p className="mt-3 text-gray-600 max-w-3xl mx-auto">
                Engineering-led automation for secondary packaging and end-of-line excellence.
                Built in India. Trusted globally.
              </p>
              <div className="mt-5 inline-flex flex-wrap items-center justify-center gap-2">
                <span className="px-3 py-1 text-xs rounded-full border border-brand-blue-200 text-brand-blue-700">Engineering</span>
                <span className="px-3 py-1 text-xs rounded-full border border-brand-blue-200 text-brand-blue-700">Innovation</span>
                <span className="px-3 py-1 text-xs rounded-full border border-brand-blue-200 text-brand-blue-700">Reliability</span>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Stats */}
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-16"
        >
          <div className="rounded-2xl border border-gray-200 bg-white/80 p-6 shadow-sm backdrop-blur">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6 lg:gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.05 * index }}
                  className="rounded-xl border border-gray-100 bg-white p-4 text-center shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="text-2xl font-bold" style={{ color: stat.accent }}>
                    {stat.value}
                  </div>
                  <div className="mt-1 text-xs font-medium uppercase tracking-wide text-gray-600">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Story */}
        <section className="mb-16">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our Story</h2>
            <p className="mx-auto mt-3 max-w-2xl text-gray-600">Engineering excellence through innovation and precision</p>
          </motion.div>
          <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
            <div className="prose prose-lg max-w-none">
              <p className="mb-6 leading-relaxed text-gray-700">
                Established in 2015, <span className="font-semibold text-blue-600">Infinity Automated Solutions Pvt. Ltd.</span> has emerged as a trusted leader in the field of secondary packaging and end-of-line automation. Headquartered in Pune, India, we specialize in designing and manufacturing cutting-edge machines that serve a wide range of industries including Food & Beverage, Spice, Biscuit, FMCG, Personal Care, Healthcare & Pharmaceuticals, and Textiles.
              </p>
              <p className="mb-6 leading-relaxed text-gray-700">
                Driven by innovation and built on a foundation of engineering excellence, Infinity provides complete packaging solutions that are smart, scalable, and efficient. Our product range includes secondary packaging machines, bundling and wrapping machines, cartoning machines, case packers, bagging machines, balers, checkweighers, conveying systems, and more — all engineered for speed, flexibility, and reliability.
              </p>
              <p className="leading-relaxed text-gray-700">
                Our in-house R&D team ensures that every machine is designed with precision, keeping in mind the unique needs of modern production lines. We take pride in our <span className="rounded bg-emerald-50 px-2 py-0.5 font-semibold text-emerald-700">"first in industry pouch in pouch bundling and wrapping machine"</span>, offering compact secondary packaging and end-to-end automation for all your packaging needs with unmatched accuracy and efficiency.
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="mb-16 grid gap-6 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
            <div className="h-full rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg border border-blue-200 bg-blue-50">
                  <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="mb-3 text-xl font-bold tracking-tight text-gray-900">OUR MISSION</h3>
                  <p className="leading-relaxed text-gray-700">
                    To build a world class organisation through helping customers to achieve their business objectives by providing innovative, best in class solutions and services.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }}>
            <div className="h-full rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg border border-emerald-200 bg-emerald-50">
                  <svg className="h-6 w-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="mb-3 text-xl font-bold tracking-tight text-gray-900">OUR VISION</h3>
                  <p className="leading-relaxed text-gray-700">
                    To be the world leader in "End of Line Packaging and Conveying Solutions" through our passion for innovation with commitment and honesty.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Capabilities */}
        <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Technical Capabilities</h2>
            <p className="mx-auto mt-3 max-w-2xl text-gray-600">Engineering advantages that define our market leadership</p>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {keyStrengths.map((strength, index) => (
              <motion.div
                key={strength.title}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.05 * index }}
                className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="mb-4 h-1 w-24 rounded-full" style={{ backgroundColor: strength.accent }} />
                <h3 className="text-xl font-bold tracking-tight text-gray-900">{strength.title}</h3>
                <p className="mt-3 leading-relaxed text-gray-700">{strength.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Team */}
        <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Engineering Team</h2>
            <p className="mx-auto mt-3 max-w-3xl text-gray-600">
              Our strength lies in our passionate team of engineers, designers, technicians, and support professionals committed to solving real-world packaging challenges.
            </p>
          </div>
          <div className="mt-8 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="relative aspect-[16/9]">
              <Image
                src="https://res.cloudinary.com/dbogkgabu/image/upload/v1752950544/team_photo_xnysmd.jpg"
                alt="Infinity Automated Solutions Team"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="flex items-center justify-between border-t border-gray-200 p-6">
              <div>
                <h3 className="text-2xl font-bold tracking-tight text-gray-900">TEAM INFINITY</h3>
                <p className="mt-1 text-gray-600">125+ dedicated professionals driving innovation in packaging automation</p>
              </div>
              <div className="hidden gap-2 sm:flex">
                <div className="h-8 w-3 rounded" style={{ backgroundColor: '#9333EA' }} />
                <div className="h-8 w-3 rounded" style={{ backgroundColor: '#0891B2' }} />
                <div className="h-8 w-3 rounded" style={{ backgroundColor: BRAND_COLORS.primary.blue }} />
              </div>
            </div>
          </div>
        </motion.section>

        {/* Evolution - Improved Horizontal Timeline */}
        <motion.section initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-20">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Evolution</h2>
            <p className="mx-auto mt-2 max-w-2xl text-gray-600">Milestones that shaped our journey</p>
            <p className="text-sm text-gray-500 mt-2">Hover or focus to pause the timeline</p>
          </div>
          
          <div className="relative">
            {/* Center line */}
            <div className="pointer-events-none absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-gradient-to-r from-brand-blue-200 via-brand-blue-500 to-brand-blue-200" />
            
            <AutoMarquee>
              <div className="flex items-stretch gap-6 w-max pr-4">
                {timeline.map((item, idx) => (
                  <motion.div 
                    key={item.year} 
                    className="relative shrink-0 w-64 md:w-80 snap-start"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    {/* Dot */}
                    <div
                      className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-lg transition-all duration-300 hover:scale-125"
                      style={{ 
                        backgroundColor: idx === timeline.length - 1 ? '#2563EB' : '#06b6d4',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                      }}
                    />
                    
                    {/* Card */}
                    <div className="relative mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-lg transition-all duration-300 group">
                      {/* Top accent line */}
                      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-blue-400 to-brand-blue-600 rounded-t-xl" />
                      
                      {/* Engineering corner accents */}
                      <div className="absolute top-2 left-2 w-4 h-4 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute top-0 left-0 w-0.5 h-2 bg-blue-500 transform origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-300"></div>
                        <div className="absolute top-0 left-0 h-0.5 w-2 bg-blue-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                      </div>
                      
                      <div className="mt-2">
                        <div className="text-lg font-bold text-blue-700 mb-3">{item.year}</div>
                        <ul className="space-y-2 text-sm text-gray-700">
                          {item.points.map((point, pointIdx) => (
                            <li key={pointIdx} className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </AutoMarquee>
          </div>
        </motion.section>

        {/* Chairman Quote */}
        <motion.section initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-20">
          <div className="h-full rounded-2xl border border-gray-200 bg-gradient-to-br from-white via-white to-blue-50/30 p-8 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg" style={{ backgroundColor: BRAND_COLORS.primary.blue }}>
                <span className="font-bold text-white">AK</span>
              </div>
              <div>
                <div className="text-lg font-bold text-gray-900">Mr. Amit Katariya</div>
                <div className="text-sm uppercase tracking-wider text-gray-600">Managing Director</div>
              </div>
            </div>
            <div className="mt-6 relative">
              <div className="absolute left-0 top-0 bottom-0 w-1 rounded-full" style={{ background: `linear-gradient(${BRAND_COLORS.primary.blue}, ${BRAND_COLORS.primary.green})` }} />
              <blockquote className="pl-4 sm:pl-6 text-gray-800 leading-relaxed">
                <span className="text-3xl align-[-0.3em] text-brand-blue-700">"</span>
                At Infinity, we believe in building machines that solve problems, create value, and adapt to future needs. Every solution we offer is backed by our commitment to quality, integrity, and customer satisfaction.
                <span className="text-3xl align-[-0.4em] text-brand-blue-700">"</span>
              </blockquote>
            </div>
          </div>
        </motion.section>
      </main>
    </div>
  );
} 