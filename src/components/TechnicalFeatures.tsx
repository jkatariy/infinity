'use client';

import { motion } from 'framer-motion';
import { CheckCircleIcon, StarIcon, ShieldCheckIcon } from '@heroicons/react/24/solid';

interface Feature {
  title: string;
  description: string;
  icon?: 'check' | 'star' | 'shield';
}

interface TechnicalFeaturesProps {
  features: Feature[];
  title?: string;
  subtitle?: string;
}

const TechnicalFeatures: React.FC<TechnicalFeaturesProps> = ({ 
  features, 
  title = "Key Features", 
  subtitle = "Advanced Engineering Solutions"
}) => {
  const getIcon = (iconType?: string) => {
    switch (iconType) {
      case 'star':
        return <StarIcon className="h-6 w-6" />;
      case 'shield':
        return <ShieldCheckIcon className="h-6 w-6" />;
      default:
        return <CheckCircleIcon className="h-6 w-6" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 px-8 py-6">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
          <p className="text-green-100">{subtitle}</p>
        </div>
      </div>

      {/* Features Grid */}
      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="h-full p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 hover:border-green-300 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors duration-300">
                    <div className="text-green-600 group-hover:text-green-700 transition-colors duration-300">
                      {getIcon(feature.icon)}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-green-900 transition-colors duration-300">
                      {feature.title}
                    </h4>
                    <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Engineering Excellence Badge */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-4 border-t border-gray-200">
        <div className="flex items-center justify-center space-x-2 text-gray-600">
          <ShieldCheckIcon className="h-5 w-5 text-green-600" />
          <span className="text-sm font-medium">ISO 9001:2015 Certified Quality</span>
        </div>
      </div>
    </motion.div>
  );
};

export default TechnicalFeatures; 