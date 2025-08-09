'use client';

import { motion } from 'framer-motion';
import { BuildingOfficeIcon, BeakerIcon, CubeIcon, GlobeAltIcon } from '@heroicons/react/24/outline';

interface Application {
  industry: string;
  description: string;
  examples: string[];
  icon?: 'office' | 'beaker' | 'cube' | 'globe';
}

interface ApplicationsListProps {
  applications: Application[];
  title?: string;
  subtitle?: string;
}

const ApplicationsList: React.FC<ApplicationsListProps> = ({ 
  applications, 
  title = "Industry Applications", 
  subtitle = "Versatile Solutions Across Industries"
}) => {
  const getIcon = (iconType?: string) => {
    switch (iconType) {
      case 'office':
        return <BuildingOfficeIcon className="h-6 w-6" />;
      case 'beaker':
        return <BeakerIcon className="h-6 w-6" />;
      case 'cube':
        return <CubeIcon className="h-6 w-6" />;
      case 'globe':
        return <GlobeAltIcon className="h-6 w-6" />;
      default:
        return <CubeIcon className="h-6 w-6" />;
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
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-8 py-6">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
          <p className="text-purple-100">{subtitle}</p>
        </div>
      </div>

      {/* Applications Grid */}
      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {applications.map((application, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="group relative"
            >
              <div className="h-full p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all duration-300">
                {/* Industry Header */}
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors duration-300">
                    <div className="text-purple-600 group-hover:text-purple-700 transition-colors duration-300">
                      {getIcon(application.icon)}
                    </div>
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 group-hover:text-purple-900 transition-colors duration-300">
                    {application.industry}
                  </h4>
                </div>

                {/* Description */}
                <p className="text-gray-600 mb-4 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  {application.description}
                </p>

                {/* Examples */}
                <div className="space-y-2">
                  <h5 className="text-sm font-semibold text-gray-700 mb-2 group-hover:text-purple-800 transition-colors duration-300">
                    Applications:
                  </h5>
                  <div className="space-y-1">
                    {application.examples.map((example, exampleIndex) => (
                      <div key={exampleIndex} className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full group-hover:bg-purple-500 transition-colors duration-300"></div>
                        <span className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                          {example}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Global Reach Badge */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-4 border-t border-gray-200">
        <div className="flex items-center justify-center space-x-2 text-gray-600">
          <GlobeAltIcon className="h-5 w-5 text-purple-600" />
          <span className="text-sm font-medium">Trusted by Leading Brands Worldwide</span>
        </div>
      </div>
    </motion.div>
  );
};

export default ApplicationsList; 