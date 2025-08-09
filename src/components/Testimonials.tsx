'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
  avatar: JSX.Element;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'John Smith',
    role: 'Operations Director',
    company: 'Global Manufacturing Co.',
    quote: 'The end-of-line packaging solutions have transformed our production efficiency. We have seen a 40% increase in output since implementation.',
    rating: 5,
    avatar: (
      <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 text-white flex items-center justify-center font-medium text-lg">
        JS
      </div>
    ),
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    role: 'Plant Manager',
    company: 'Premium Solutions Ltd.',
    quote: 'Outstanding service and support. The team went above and beyond to ensure our packaging line was optimized for our specific needs.',
    rating: 5,
    avatar: (
      <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 text-white flex items-center justify-center font-medium text-lg">
        SJ
      </div>
    ),
  },
  {
    id: 3,
    name: 'Michael Chen',
    role: 'Technical Director',
    company: 'Innovation Industries',
    quote: 'The automation capabilities have significantly reduced our operational costs while improving product quality and consistency.',
    rating: 5,
    avatar: (
      <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 text-white flex items-center justify-center font-medium text-lg">
        MC
      </div>
    ),
  },
];

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, index) => (
        <motion.svg
          key={index}
          className={`w-4 h-4 ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          whileHover={{ scale: 1.2, rotate: 10 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </motion.svg>
      ))}
    </div>
  );
};

const Testimonials = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section className="py-20 bg-gray-50 font-product-sans relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div 
        className="absolute top-20 left-12 w-6 h-6 border border-blue-200 opacity-20"
        animate={{ 
          rotate: [0, 90, 180, 270, 360],
          scale: [1, 1.2, 1, 1.2, 1],
        }}
        transition={{
          duration: 10,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      />
      <motion.div 
        className="absolute bottom-16 right-20 w-4 h-4 bg-blue-200 opacity-30"
        animate={{ 
          x: [0, 15, 0],
          y: [0, -15, 0],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 8,
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
            className="text-4xl font-bold text-gray-900 mb-4"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Client Testimonials
          </motion.h2>
          <motion.div 
            className="w-20 h-1 bg-blue-500 mx-auto mb-4"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
          />
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light">
            What our partners say about working with us
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              onHoverStart={() => setHoveredCard(testimonial.id)}
              onHoverEnd={() => setHoveredCard(null)}
              className="bg-white border border-gray-200 p-8 hover:border-blue-300 hover:shadow-lg transition-all duration-300 group relative overflow-hidden cursor-pointer"
            >
              <motion.div
                className="absolute top-0 left-0 w-full h-1 bg-blue-500"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 + 0.3 }}
                style={{ originX: 0 }}
              />
              
              {/* Subtle hover background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 to-blue-100/0 group-hover:from-blue-50/40 group-hover:to-blue-100/20 transition-all duration-500"></div>
              
              <div className="relative">
                {/* Rating */}
                <div className="flex justify-between items-start mb-6">
                  <StarRating rating={testimonial.rating} />
                  <motion.div
                    animate={{ 
                      scale: hoveredCard === testimonial.id ? 1.1 : 1,
                      rotate: hoveredCard === testimonial.id ? 5 : 0 
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {testimonial.avatar}
                  </motion.div>
                </div>

                {/* Quote */}
                <blockquote className="text-gray-700 leading-relaxed font-light mb-6 relative">
                  <motion.div 
                    className="absolute -top-2 -left-1 text-4xl text-blue-200 font-serif"
                    animate={{ 
                      scale: hoveredCard === testimonial.id ? 1.2 : 1,
                      opacity: hoveredCard === testimonial.id ? 1 : 0.7 
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    "
                  </motion.div>
                  <div className="pl-6">{testimonial.quote}</div>
                </blockquote>

                {/* Author Info */}
                <div className="border-t border-gray-100 pt-6">
                  <motion.p 
                    className="font-medium text-gray-900 mb-1 transition-colors duration-300"
                    animate={{ 
                      color: hoveredCard === testimonial.id ? '#1e40af' : '#111827' 
                    }}
                  >
                      {testimonial.name}
                  </motion.p>
                  <p className="text-sm text-gray-600 font-light">
                    {testimonial.role}
                  </p>
                  <p className="text-sm text-blue-600 font-light">
                    {testimonial.company}
                    </p>
                  </div>

                {/* Animated accent */}
                <motion.div
                  className="absolute bottom-4 right-4 w-2 h-2 bg-blue-400 opacity-0"
                  animate={{ 
                    opacity: hoveredCard === testimonial.id ? 1 : 0,
                    scale: hoveredCard === testimonial.id ? 1 : 0.5,
                    rotate: hoveredCard === testimonial.id ? 45 : 0 
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
                </div>
              </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 