'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useTransform } from 'framer-motion';

interface Stat {
  value: number;
  suffix: string;
  label: string;
  icon: JSX.Element;
}

interface CounterProps {
  value: number;
  suffix: string;
  duration?: number;
}

const stats: Stat[] = [
  {
    value: 10,
    suffix: '+',
    label: 'Years of Innovation',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5" className="text-green-500"/>
        <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-blue-600"/>
      </svg>
    ),
  },
  {
    value: 800,
    suffix: '+',
    label: 'Successful Installations',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" className="text-green-500"/>
      </svg>
    ),
  },
  {
    value: 125,
    suffix: '+',
    label: 'Engineering Professionals',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H6C4.93913 15 3.92172 15.4214 3.17157 16.1716C2.42143 16.9217 2 17.9391 2 19V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"/>
        <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"/>
        <path d="M22 21V19C22 18.1332 21.7275 17.2873 21.2373 16.5731C20.7471 15.8588 20.0641 15.3096 19.2762 15M16.5 3.29076C17.2897 3.78041 17.9737 4.32959 18.4648 5.04387C18.9559 5.75816 19.2287 6.60405 19.2287 7.47076C19.2287 8.33748 18.9559 9.18337 18.4648 9.89766C17.9737 10.6119 17.2897 11.1611 16.5 11.6508" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"/>
      </svg>
    ),
  },
  {
    value: 25,
    suffix: '+',
    label: 'Designers',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.75 17L9 20L20 9L17 6L8 15L9.75 17ZM9.75 17L11.25 15.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"/>
        <path d="M15 6L18 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"/>
        <path d="M3 21L9 20L20 9C20.5523 8.44772 20.5523 7.55228 20 7L17 4C16.4477 3.44772 15.5523 3.44772 15 4L4 15L3 21Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"/>
      </svg>
    ),
  },
  {
    value: 20,
    suffix: '+',
    label: 'Solutions',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"/>
        <path d="M5 17L6 20L9 19L8 16L5 17Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"/>
      </svg>
    ),
  },
  {
    value: 40000,
    suffix: '',
    label: 'Sq. Ft Plant',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"/>
      </svg>
    ),
  },
];

const Counter = ({ value, suffix, duration = 2 }: CounterProps) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref);

  useEffect(() => {
    let startTime: number | null = null;
    let animationFrame: number | null = null;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = (timestamp - startTime) / (duration * 1000);

      if (progress < 1) {
        setCount(Math.min(Math.floor(value * progress), value));
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    if (isInView) {
      animationFrame = requestAnimationFrame(animate);
    }

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [value, duration, isInView]);

  return (
    <motion.span 
      ref={ref} 
      className="text-4xl font-light text-green-600"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {count}
      <span className="text-2xl">{suffix}</span>
    </motion.span>
  );
};

const Statistics = () => {
  return (
    <section className="py-20 bg-gray-50 font-product-sans relative overflow-hidden">
      {/* Subtle background dots */}
      <div className="absolute inset-0 opacity-10">
        <motion.div 
          className="absolute inset-0"
          animate={{ 
            backgroundPosition: ['0px 0px', '120px 120px'],
          }}
          transition={{
            duration: 60,
            ease: "linear",
            repeat: Infinity,
          }}
          style={{
            backgroundImage: `radial-gradient(circle, #10b981 1px, transparent 1px)`,
            backgroundSize: '120px 120px'
          }}>
        </motion.div>
      </div>

      {/* Subtle animated background elements */}
      <motion.div 
        className="absolute top-10 left-10 w-6 h-6 border border-green-200 rotate-45 opacity-20"
        animate={{ 
          rotate: [45, 135, 225, 315, 45],
          scale: [1, 1.2, 1, 1.2, 1],
        }}
        transition={{
          duration: 12,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      />
      <motion.div 
        className="absolute bottom-16 right-16 w-4 h-4 bg-green-200 rotate-45 opacity-30"
        animate={{ 
          y: [0, -20, 0],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-2xl font-semibold text-gray-900 mb-4"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Our Impact
          </motion.h2>
          <motion.div 
            className="w-20 h-1 bg-green-500 mx-auto mb-4"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
          />
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light">
            Delivering excellence in automation engineering and global deployment
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="text-center group cursor-pointer"
            >
              <div className="border border-gray-200 bg-white p-8 hover:border-green-300 hover:shadow-lg transition-all duration-300 relative overflow-hidden">
                <motion.div 
                  className="absolute top-0 left-0 w-full h-1 bg-green-500"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 + 0.5 }}
                  style={{ originX: 0 }}
                />
                
                {/* Subtle hover background */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-50/0 to-green-100/0 group-hover:from-green-50/30 group-hover:to-green-100/10 transition-all duration-500"></div>
                
                <div className="relative">
                  <motion.div
                    className="flex justify-center mb-4"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {stat.icon}
                  </motion.div>
                  
                  <div className="mb-4">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </div>
                  
                  <p className="text-gray-600 font-light text-sm uppercase tracking-wider group-hover:text-gray-700 transition-colors duration-300">
                    {stat.label}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics; 