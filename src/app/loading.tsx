'use client';

import { motion } from 'framer-motion';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
      <div className="relative w-24 h-12">
        {/* Conveyor belt base */}
        <div className="absolute inset-x-0 bottom-0 h-1 bg-brand-blue-500/20 rounded-full" />
        
        {/* Moving dot */}
        <motion.div
          className="absolute bottom-0 w-3 h-3 bg-brand-blue-500 rounded-full"
          animate={{
            x: [-12, 84, -12],
            y: [0, -24, 0]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Static rollers */}
        <div className="absolute bottom-0 left-0 w-2 h-2 bg-brand-blue-500/30 rounded-full" />
        <div className="absolute bottom-0 right-0 w-2 h-2 bg-brand-blue-500/30 rounded-full" />
      </div>
    </div>
  );
} 