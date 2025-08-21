'use client';

import { motion } from 'framer-motion';
import PageContainer from '@/components/PageContainer';

const news = [
  {
    title: 'New Product Launch: ICW-50K Checkweigher',
    date: 'March 15, 2024',
    category: 'Product Launch',
    description: 'Introducing our latest high-capacity checkweigher with advanced precision technology.',
    image: '/news/product-launch.jpg',
  },
  {
    title: 'Expansion into Southeast Asian Markets',
    date: 'February 28, 2024',
    category: 'Company News',
    description: 'Infinity Automated Solutions strengthens its presence in Thailand and Philippines.',
    image: '/news/expansion.jpg',
  },
  {
    title: 'ISO 9001:2015 Certification Renewed',
    date: 'January 20, 2024',
    category: 'Achievement',
    description: 'Successfully completed ISO 9001:2015 recertification audit.',
    image: '/news/certification.jpg',
  },
];

const upcomingEvents = [
  {
    title: 'PackExpo India 2024',
    date: 'May 15-17, 2024',
    location: 'Mumbai, India',
    description: 'Visit us at Booth 304 to explore our latest packaging solutions.',
  },
  {
    title: 'Automation Tech Summit',
    date: 'June 8-10, 2024',
    location: 'Dubai, UAE',
    description: 'Our CEO will be speaking about innovations in packaging automation.',
  },
  {
    title: 'Industry 4.0 Conference',
    date: 'July 22-24, 2024',
    location: 'Bangkok, Thailand',
    description: 'Showcasing our smart factory solutions and IoT integration capabilities.',
  },
];

export default function News() {
  return (
    <PageContainer
      title="News & Events"
      subtitle="Stay updated with our latest developments and upcoming events"
    >
      {/* Latest News */}
      <div className="mb-20">
        <div className="relative mb-8">
          <h2 className="text-2xl font-semibold text-gray-900">Latest News</h2>
          {/* Top accent line */}
          <div className="absolute top-0 left-0 w-32 h-0.5 bg-blue-500/20"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="relative bg-white border border-gray-200 p-6 group hover:border-blue-500/50 transition-all duration-300"
            >
              {/* Engineering corner accents */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-gray-300 group-hover:border-blue-400 transition-colors duration-300"></div>
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-gray-300 group-hover:border-blue-400 transition-colors duration-300"></div>
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-gray-300 group-hover:border-blue-400 transition-colors duration-300"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-gray-300 group-hover:border-blue-400 transition-colors duration-300"></div>
              
              {/* Top accent line */}
              <div className="absolute top-0 left-0 w-full h-0.5 bg-gray-200 group-hover:bg-blue-500 transition-colors duration-300"></div>

              <div className="relative h-48 -mx-6 -mt-6 mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900" />
              </div>
              
              <div className="flex items-center mb-4">
                <span className="text-sm text-blue-600 font-medium">
                  {item.category}
                </span>
                <span className="mx-2 text-gray-300">•</span>
                <span className="text-sm text-gray-500">{item.date}</span>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 mb-4">{item.description}</p>
              
              <div className="flex justify-between items-center">
                <span className="font-medium text-blue-600">Read More</span>
                {/* Arrow indicator */}
                <div className="text-gray-400 group-hover:text-blue-500 transition-colors duration-300">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Upcoming Events */}
      <div>
        <div className="relative mb-8">
          <h2 className="text-2xl font-semibold text-gray-900">Upcoming Events</h2>
          {/* Top accent line */}
          <div className="absolute top-0 left-0 w-32 h-0.5 bg-blue-500/20"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {upcomingEvents.map((event, index) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="relative bg-white border border-gray-200 p-6 group hover:border-blue-500/50 transition-all duration-300"
            >
              {/* Engineering corner accents */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-gray-300 group-hover:border-blue-400 transition-colors duration-300"></div>
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-gray-300 group-hover:border-blue-400 transition-colors duration-300"></div>
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-gray-300 group-hover:border-blue-400 transition-colors duration-300"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-gray-300 group-hover:border-blue-400 transition-colors duration-300"></div>
              
              {/* Top accent line */}
              <div className="absolute top-0 left-0 w-full h-0.5 bg-gray-200 group-hover:bg-blue-500 transition-colors duration-300"></div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-16 text-center">
                  <div className="text-3xl font-bold text-blue-600">{event.date.split(' ')[0]}</div>
                  <div className="text-sm text-gray-500">{event.date.split(' ')[1]}</div>
                </div>
                <div className="ml-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {event.title}
                  </h3>
                  <div className="flex items-center text-gray-500 text-sm mb-4">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {event.location}
                  </div>
                  <p className="text-gray-600 mb-4">{event.description}</p>
                  <button aria-label={`Register for ${event.title}`} className="bg-blue-600 text-white px-6 py-2 hover:bg-blue-700 transition-colors duration-200 flex items-center">
                    Register Now
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </PageContainer>
  );
} 