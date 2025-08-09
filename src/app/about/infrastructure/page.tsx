'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import PageContainer from '@/components/PageContainer';

const inHouseTechnology = [
  {
    title: 'Technical Assessment Project Development',
    description: 'Comprehensive analysis and development planning for custom automation solutions',
    icon: (
      <svg className="h-8 w-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    )
  },
  {
    title: 'Equipment Design & Engineering',
    description: 'Advanced design capabilities using industry-leading software and engineering expertise',
    icon: (
      <svg className="h-8 w-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM7 21h16M5 5h14M5 9h14M5 13h14" />
      </svg>
    )
  },
  {
    title: 'Equipment Built & Software Customization',
    description: 'In-house manufacturing and software development tailored to specific requirements',
    icon: (
      <svg className="h-8 w-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    )
  },
  {
    title: 'Assembly & Testing',
    description: 'Comprehensive assembly and rigorous testing protocols ensuring quality and reliability',
    icon: (
      <svg className="h-8 w-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    title: 'Onsite Installation & Integration',
    description: 'Expert installation and seamless integration with existing production lines',
    icon: (
      <svg className="h-8 w-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    )
  },
  {
    title: 'Training/Support - Spare Parts',
    description: 'Comprehensive training programs and reliable spare parts support for optimal operations',
    icon: (
      <svg className="h-8 w-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    )
  }
];

const teams = [
  {
    title: 'PROJECT TEAM',
    description: 'Dedicated project management ensuring successful delivery and customer satisfaction',
    capabilities: [
      'DEDICATED PROJECT LEADERS',
      'PROJECT SCHEDULE/GRANT CHARTS',
      'KICK-OFF MEETINGS',
      'SITE VISIT',
      'CUSTOMER COMMUNICATION',
      'FAT & SAT'
    ],
    icon: (
      <svg className="h-12 w-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M15 7a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
    color: 'from-blue-500 to-indigo-500'
  },
  {
    title: 'DESIGN TEAM',
    description: 'Advanced design and engineering capabilities with cutting-edge technology',
    capabilities: [
      'TEAM CENTER',
      'SOLID EDGE 2023',
      'SITE ASSESSMENTS & TIMELINES',
      'VALIDATION',
      '3D CONCEPTS LAYOUT',
              '25+ DESIGNERS'
    ],
    icon: (
      <svg className="h-12 w-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    color: 'from-green-500 to-emerald-500'
  },
  {
    title: 'SCM PROCESS',
    description: 'Robust supply chain management and quality processes ensuring operational excellence',
          capabilities: [
        'SAP BUSINESS ONE 10.0',
        'ISO 9001:2015',
        'LEAN PROCESS',
      '5S',
      'STANDARD OPERATING PROCEDURE (SOP)',
      'QUALITY ANALYSIS'
    ],
    icon: (
      <svg className="h-12 w-12 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    color: 'from-purple-500 to-violet-500'
  },
  {
    title: 'SERVICE TEAM',
    description: 'Comprehensive service support ensuring maximum uptime and customer satisfaction',
    capabilities: [
      '24/7 ONLINE SUPPORT',
      'IMMEDIATE ASSISTANCE',
      'READY AVAILABILITY OF SPARE PARTS',
      'AMC CONTRACTS',
      'DEDICATED SERVICE LEADERS',
      '22+ ENGINEERS'
    ],
    icon: (
      <svg className="h-12 w-12 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    color: 'from-orange-500 to-red-500'
  }
];

const facilities = [
  {
    title: 'Manufacturing Facility',
    description: 'State-of-the-art manufacturing base with new factory setup expanding our production capabilities',
    stats: [
      { label: 'Factory Locations', value: '1' },
      { label: 'Manufacturing Space', value: '30,000+ sq.ft.' },
      { label: 'Production Lines', value: 'Multiple' }
    ],
    features: [
      'Advanced Manufacturing Equipment',
      'Precision Assembly Lines',
      'Quality Control Systems',
      'Material Handling Systems'
    ]
  },
  {
    title: 'Design Center',
    description: 'Advanced design and engineering center utilizing latest CAD/CAM technologies',
    stats: [
      { label: 'Designers', value: '25+' },
      { label: 'Software Licenses', value: 'Latest Versions' },
      { label: 'Design Capacity', value: '20+ Solutions' }
    ],
    features: [
      'Solid Edge 2023',
      'Team Center PLM',
      '3D Concept Development',
      'Virtual Prototyping'
    ]
  },
  {
    title: 'Service Infrastructure',
    description: 'Comprehensive service support infrastructure ensuring global reach and rapid response',
    stats: [
      { label: 'Service Engineers', value: '22+' },
      { label: 'Support Coverage', value: '24/7' },
      { label: 'Response Time', value: 'Immediate' }
    ],
    features: [
      'Remote Monitoring',
      'Predictive Maintenance',
      'Spare Parts Inventory',
      'Training Centers'
    ]
  }
];

const keyStats = [
  { label: 'Engineering Professionals', value: '125+', icon: '👥' },
  { label: 'Designers', value: '25+', icon: '👨‍💻' },
  { label: 'Service Engineers', value: '22+', icon: '🔧' },
  { label: '40,000 Sq. Ft Plant', value: '1', icon: '🏭' },
  { label: 'Total Installations', value: '800+', icon: '⚙️' },
  { label: 'Years of Innovation', value: '10+', icon: '📅' }
];

export default function Infrastructure() {
  return (
    <PageContainer
      title="Infrastructure & Technology"
      subtitle="World-class in-house capabilities powering innovation in packaging automation solutions"
    >
      {/* Key Statistics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-20"
      >
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 relative inline-block">
            Our Infrastructure at a Glance
            <div className="absolute -top-2 left-0 right-0 h-0.5 bg-blue-500/30"></div>
          </h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {keyStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white border border-gray-200 p-6 text-center relative group hover:shadow-lg transition-all duration-300"
            >
              <div className="absolute top-0 left-0 w-12 h-12 pointer-events-none">
                <div className="absolute top-0 left-0 w-0.5 h-6 bg-blue-500 transform origin-top scale-y-0 transition-transform group-hover:scale-y-100"></div>
                <div className="absolute top-0 left-0 h-0.5 w-6 bg-blue-500 transform origin-left scale-x-0 transition-transform group-hover:scale-x-100"></div>
              </div>
              <div className="absolute bottom-0 right-0 w-12 h-12 pointer-events-none">
                <div className="absolute bottom-0 right-0 w-0.5 h-6 bg-blue-500 transform origin-bottom scale-y-0 transition-transform group-hover:scale-y-100"></div>
                <div className="absolute bottom-0 right-0 h-0.5 w-6 bg-blue-500 transform origin-right scale-x-0 transition-transform group-hover:scale-x-100"></div>
              </div>

              <div className="text-3xl mb-3">{stat.icon}</div>
              <div className="text-2xl font-bold text-blue-600 mb-2">{stat.value}</div>
              <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
          </motion.div>
        ))}
      </div>
      </motion.div>

      {/* In-House Technology Capabilities */}
      <div className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 relative inline-block">
            In-House Technology Capabilities
            <div className="absolute -top-2 left-0 right-0 h-0.5 bg-blue-500/30"></div>
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            End-to-end technology capabilities from concept to commissioning, ensuring complete control over quality and delivery
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {inHouseTechnology.map((tech, index) => (
            <motion.div
              key={tech.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="bg-white border border-gray-200 p-8 relative group hover:shadow-lg transition-all duration-300"
            >
              <div className="absolute top-0 left-0 w-16 h-16 pointer-events-none">
                <div className="absolute top-0 left-0 w-0.5 h-8 bg-blue-500 transform origin-top scale-y-0 transition-transform group-hover:scale-y-100"></div>
                <div className="absolute top-0 left-0 h-0.5 w-8 bg-blue-500 transform origin-left scale-x-0 transition-transform group-hover:scale-x-100"></div>
              </div>
              <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none">
                <div className="absolute top-0 right-0 w-0.5 h-8 bg-blue-500 transform origin-top scale-y-0 transition-transform group-hover:scale-y-100"></div>
                <div className="absolute top-0 right-0 h-0.5 w-8 bg-blue-500 transform origin-right scale-x-0 transition-transform group-hover:scale-x-100"></div>
              </div>
              
              <div className="flex items-center mb-6">
                {tech.icon}
                <h3 className="text-xl font-bold text-gray-900 ml-4">{tech.title}</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">{tech.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Team Structure */}
      <div className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 relative inline-block">
            Our Team Structure
            <div className="absolute -top-2 left-0 right-0 h-0.5 bg-blue-500/30"></div>
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Specialized teams working in synergy to deliver exceptional results across all aspects of our operations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {teams.map((team, index) => (
            <motion.div
              key={team.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="relative"
            >
              {/* Team Header */}
              <div className={`relative bg-gradient-to-r ${team.color} rounded-2xl p-8 mb-6 text-white`}>
                <div className="absolute top-0 left-0 w-16 h-16 pointer-events-none">
                  <div className="absolute top-0 left-0 w-0.5 h-8 bg-white/30"></div>
                  <div className="absolute top-0 left-0 h-0.5 w-8 bg-white/30"></div>
                </div>
                <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none">
                  <div className="absolute top-0 right-0 w-0.5 h-8 bg-white/30"></div>
                  <div className="absolute top-0 right-0 h-0.5 w-8 bg-white/30"></div>
                </div>
                
                <div className="flex items-center mb-4">
                  {team.icon}
                  <div className="ml-6">
                    <h3 className="text-2xl font-bold">{team.title}</h3>
                    <p className="text-white/90 mt-2">{team.description}</p>
                  </div>
                </div>
              </div>

              {/* Team Capabilities */}
              <div className="bg-white border border-gray-200 p-8 relative group hover:shadow-lg transition-all duration-300">
                <div className="absolute top-0 left-0 w-16 h-16 pointer-events-none">
                  <div className="absolute top-0 left-0 w-0.5 h-8 bg-blue-500 transform origin-top scale-y-0 transition-transform group-hover:scale-y-100"></div>
                  <div className="absolute top-0 left-0 h-0.5 w-8 bg-blue-500 transform origin-left scale-x-0 transition-transform group-hover:scale-x-100"></div>
                </div>
                <div className="absolute bottom-0 right-0 w-16 h-16 pointer-events-none">
                  <div className="absolute bottom-0 right-0 w-0.5 h-8 bg-blue-500 transform origin-bottom scale-y-0 transition-transform group-hover:scale-y-100"></div>
                  <div className="absolute bottom-0 right-0 h-0.5 w-8 bg-blue-500 transform origin-right scale-x-0 transition-transform group-hover:scale-x-100"></div>
                </div>
                
                <h4 className="text-lg font-bold text-gray-900 mb-6">Key Capabilities</h4>
                <div className="grid grid-cols-1 gap-3">
                  {team.capabilities.map((capability, idx) => (
                    <div key={idx} className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      <span className="text-gray-700 font-medium">{capability}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Facilities */}
      <div className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 relative inline-block">
            Our Facilities
            <div className="absolute -top-2 left-0 right-0 h-0.5 bg-blue-500/30"></div>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Modern facilities equipped with advanced technology to support our comprehensive capabilities
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {facilities.map((facility, index) => (
            <motion.div
              key={facility.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="bg-white border border-gray-200 relative group hover:shadow-lg transition-all duration-300"
            >
              <div className="absolute top-0 left-0 w-16 h-16 pointer-events-none">
                <div className="absolute top-0 left-0 w-0.5 h-8 bg-blue-500 transform origin-top scale-y-0 transition-transform group-hover:scale-y-100"></div>
                <div className="absolute top-0 left-0 h-0.5 w-8 bg-blue-500 transform origin-left scale-x-0 transition-transform group-hover:scale-x-100"></div>
              </div>
              <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none">
                <div className="absolute top-0 right-0 w-0.5 h-8 bg-blue-500 transform origin-top scale-y-0 transition-transform group-hover:scale-y-100"></div>
                <div className="absolute top-0 right-0 h-0.5 w-8 bg-blue-500 transform origin-right scale-x-0 transition-transform group-hover:scale-x-100"></div>
              </div>
              
              <div className="p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{facility.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{facility.description}</p>
                
                {/* Stats */}
                <div className="grid grid-cols-1 gap-3 mb-6">
                  {facility.stats.map((stat, idx) => (
                    <div key={idx} className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600">{stat.label}</span>
                      <span className="font-semibold text-blue-600">{stat.value}</span>
                    </div>
                  ))}
                </div>
                
                {/* Features */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">Key Features</h4>
                  <ul className="space-y-2">
                    {facility.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-600 text-sm">
                        <svg className="w-4 h-4 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="relative bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-12 text-center text-white"
      >
        <div className="absolute top-0 left-0 w-16 h-16 pointer-events-none">
          <div className="absolute top-0 left-0 w-0.5 h-8 bg-white/30"></div>
          <div className="absolute top-0 left-0 h-0.5 w-8 bg-white/30"></div>
        </div>
        <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none">
          <div className="absolute top-0 right-0 w-0.5 h-8 bg-white/30"></div>
          <div className="absolute top-0 right-0 h-0.5 w-8 bg-white/30"></div>
        </div>
        <div className="absolute bottom-0 left-0 w-16 h-16 pointer-events-none">
          <div className="absolute bottom-0 left-0 w-0.5 h-8 bg-white/30"></div>
          <div className="absolute bottom-0 left-0 h-0.5 w-8 bg-white/30"></div>
        </div>
        <div className="absolute bottom-0 right-0 w-16 h-16 pointer-events-none">
          <div className="absolute bottom-0 right-0 w-0.5 h-8 bg-white/30"></div>
          <div className="absolute bottom-0 right-0 h-0.5 w-8 bg-white/30"></div>
        </div>

        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Experience Our Infrastructure Excellence</h2>
          <p className="text-white/90 text-lg mb-8 leading-relaxed">
            From our advanced design center with 25+ designers to our 24/7 service support with 22+ engineers, 
            our infrastructure is designed to deliver exceptional results. Visit our facility or schedule a virtual tour 
            to see our capabilities in action.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors group"
            >
              Schedule Facility Visit
              <svg className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
            <a
              href="/about/profile"
              className="inline-flex items-center px-8 py-4 border border-white/30 text-white font-semibold hover:border-white hover:bg-white/10 transition-colors"
            >
              Learn More About Us
            </a>
          </div>
        </div>
      </motion.div>
    </PageContainer>
  );
} 