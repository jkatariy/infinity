'use client';

import { motion } from 'framer-motion';
import Breadcrumbs from './Breadcrumbs';

interface PageContainerProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  hideTitle?: boolean;
  breadcrumbLabel?: string; // override last segment label (e.g., blog title)
}

export default function PageContainer({ children, title, subtitle, hideTitle = false, breadcrumbLabel }: PageContainerProps) {
  return (
    <div id="main-content" role="main" tabIndex={-1} className="pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-12 sm:pb-16 md:pb-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs currentLabel={breadcrumbLabel}
          />
        {!hideTitle && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8 sm:mb-12 md:mb-16"
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 tracking-tight leading-tight">
              {title}
            </h1>
            {subtitle && (
              <p className="text-base sm:text-lg md:text-xl text-gray-500 max-w-3xl mx-auto font-light leading-relaxed px-4 sm:px-0">
                {subtitle}
              </p>
            )}
          </motion.div>
        )}
        {children}
      </div>
    </div>
  );
} 