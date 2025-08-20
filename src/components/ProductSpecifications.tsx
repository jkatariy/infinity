'use client';

import { motion } from 'framer-motion';
import { Cog6ToothIcon, WrenchScrewdriverIcon } from '@heroicons/react/24/outline';

interface Specification {
  label: string;
  value: string;
  unit?: string;
}

interface ProductSpecificationsProps {
  specifications: Specification[];
  title?: string;
}

const ProductSpecifications: React.FC<ProductSpecificationsProps> = ({ 
  specifications, 
  title = "Technical Specifications" 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-white/20 rounded-lg">
            <Cog6ToothIcon className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-white">{title}</h3>
        </div>
      </div>

      {/* Specifications Grid */}
      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {specifications.map((spec, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full group-hover:bg-blue-700 transition-colors duration-300"></div>
                  <span className="font-medium text-gray-700 group-hover:text-blue-900 transition-colors duration-300">
                    {spec.label}
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-gray-900 group-hover:text-blue-900 transition-colors duration-300">
                    {spec.value}
                  </span>
                  {spec.unit && (
                    <span className="text-sm text-gray-500 ml-1 group-hover:text-blue-700 transition-colors duration-300">
                      {spec.unit}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Engineering Badge */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-4 border-t border-gray-200">
        <div className="flex items-center justify-center space-x-2 text-gray-600">
          <WrenchScrewdriverIcon className="h-5 w-5" />
          <span className="text-sm font-medium">Engineered for Excellence</span>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductSpecifications; 