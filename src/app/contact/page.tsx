'use client';

import { motion } from 'framer-motion';
import PageContainer from '@/components/PageContainer';
import SocialLinks from '@/components/SocialLinks';

const contactInfo = [
  {
    title: 'Visit Us',
    icon: '🏢',
    details: [
      'Plot No. 7 & 16, S. No-1556/1559,',
      'Shelarwasti, Dehu-Alandi Road,',
      'Chikhali, Tal-Haveli,',
      'Pune - 412114, Maharashtra, India',
    ],
  },
  {
    title: 'Call Us',
    icon: '📞',
    details: ['+91 84849 22042', '+91 20 6718 3300'],
  },
  {
    title: 'Email Us',
    icon: '✉️',
    details: ['info@infinitysols.com'],
  },
  {
    title: 'Working Hours',
    icon: '🕒',
    details: ['Monday - Saturday', '9:00 AM - 6:00 PM IST'],
  },
];

const internationalContacts = [
  {
    title: 'India Headquarters',
    icon: '🇮🇳',
    details: ['india@infinitysols.com'],
  },
  {
    title: 'Thailand',
    icon: '🇹🇭',
    details: ['thailand@infinitysols.com'],
  },
  {
    title: 'Singapore',
    icon: '🇸🇬',
    details: ['singapore@infinitysols.com'],
  },
  {
    title: 'Malaysia',
    icon: '🇲🇾',
    details: ['malaysia@infinitysols.com'],
  },
  {
    title: 'Vietnam',
    icon: '🇻🇳',
    details: ['vietnam@infinitysols.com'],
  },
  {
    title: 'Bangladesh',
    icon: '🇧🇩',
    details: ['bangladesh@infinitysols.com'],
  },
];

export default function Contact() {
  return (
    <PageContainer
      title="Contact Us"
      subtitle="Get in touch with our team of experts"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16">
        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {contactInfo.map((info, index) => (
            <div
              key={info.title}
              className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-start space-x-4">
                <div className="text-3xl">{info.icon}</div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {info.title}
                  </h3>
                  {info.details.map((detail, i) => (
                    <p key={i} className="text-gray-600">
                      {detail}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* Social Media Section */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-start space-x-4">
              <div className="text-3xl">🌐</div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Connect With Us
                </h3>
                <SocialLinks showLabels className="flex-col space-y-3" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-gray-50 rounded-2xl p-8"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Send us a message</h2>
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="How can we help?"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your message..."
              />
            </div>
            <button
              type="submit"
              className="w-full bg-brand-blue-500 text-white py-3 rounded-xl hover:bg-brand-blue-600 transition-colors duration-200"
            >
              Send Message
            </button>
          </form>
        </motion.div>
      </div>

      {/* International Contacts Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mb-16"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">International Contacts</h2>
          <p className="text-lg text-gray-600">
            Reach out to our regional teams for localized support and services
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {internationalContacts.map((contact, index) => (
            <motion.div
              key={contact.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-md transition-shadow duration-300 text-center"
            >
              <div className="text-4xl mb-4">{contact.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {contact.title}
              </h3>
              {contact.details.map((detail, i) => (
                <a 
                  key={i} 
                  href={`mailto:${detail}`}
                  className="block text-brand-blue-500 hover:text-brand-blue-600 transition-colors duration-200"
                >
                  {detail}
                </a>
              ))}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Map Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="bg-gray-50 rounded-2xl p-8 text-center"
      >
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Our Location</h2>
        <div className="aspect-video rounded-xl overflow-hidden mb-6">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3781.5984899068823!2d73.79995007588657!3d18.69254168728844!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b79ab3bcee5d%3A0xf3b0ea586b42322d!2sInfinity%20Automated%20Solutions%20Pvt.%20Ltd.!5e0!3m2!1sen!2sin!4v1642586800000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          />
        </div>
        <a
          href="https://www.google.com/maps/dir//Infinity+Automated+Solutions+Pvt.+Ltd.+No.1556+Plot+No.6+%26+17,+Gat+1559,+Dehu+-+Alandi+Rd,+Chikhali,+Pune,+Maharashtra+412114/@18.6925416,73.8007352,16z/data=!4m5!4m4!1m0!1m2!1m1!1s0x3bc2b79ab3bcee5d:0xf3b0ea586b42322d"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-6 py-3 bg-brand-blue-600 text-white font-medium rounded-lg hover:bg-brand-blue-700 transition-colors duration-200"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
          Get Directions to Our Facility
        </a>
      </motion.div>
    </PageContainer>
  );
} 