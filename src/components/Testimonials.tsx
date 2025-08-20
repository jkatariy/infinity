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
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Vasant Masala',
    role: 'Production Manager',
    company: 'Vasant Masala',
    quote: 'As We Celebrate 50 Years Of Purity, We Appreciate Your Continued Support Which Has Helped Us Grow \'Stronger Together\'. You Are Truly Our \'Partner In Progress\'.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Gandhi Spices Pvt. Ltd.',
    role: 'Operations Director',
    company: 'Hathi Masala',
    quote: 'We are completely satisfied with their technologically advanced products and also with their service... We wish Team Infinity all the very best and look forward to a long-term association with them.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Everest Spices Pvt. Ltd.',
    role: 'Plant Manager',
    company: 'Everest Spices Pvt. Ltd.',
    quote: 'We greatly value the innovative solutions and reliable support provided by Infinity Automated Solutions Pvt. Ltd., looking forward to continued success together.',
    rating: 5,
  },
];

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, index) => (
        <svg
          key={index}
          className={`w-4 h-4 ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

const Testimonials = () => {
  return (
    <section className="py-20 bg-gray-50 font-product-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Client Testimonials
          </h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto mb-6" />
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
            What our partners say about working with us
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white p-8 rounded-lg shadow-sm border border-gray-100"
            >
              <div className="mb-6">
                <StarRating rating={testimonial.rating} />
              </div>

              <blockquote className="text-gray-700 leading-relaxed mb-6 text-lg">
                "{testimonial.quote}"
              </blockquote>

              <div className="border-t border-gray-100 pt-6">
                <p className="font-semibold text-gray-900 mb-1">
                  {testimonial.company}
                </p>
                <p className="text-sm text-gray-600">
                  {testimonial.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 