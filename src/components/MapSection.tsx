'use client';

import { motion } from 'framer-motion';

const MapSection = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-10 lg:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Visit Our Manufacturing Facility
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto font-light">
            Experience our state-of-the-art facility in Pune and see our secondary packaging automation solutions in action
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          {/* Mobile-First Layout: Contact Info Above Map on Mobile */}
          <div className="lg:hidden mb-6">
            <div className="bg-white p-4 sm:p-6 shadow-lg border border-gray-200 rounded-lg">
              <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-4">Our Location</h3>
              <div className="space-y-3 text-gray-600">
                <div className="flex items-start">
                  <svg className="w-5 h-5 mr-3 text-blue-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div className="text-sm sm:text-base">
                    <p>Plot No. 7 & 16, S. No-1556/1559,</p>
                    <p>Shelarwasti, Dehu-Alandi Road,</p>
                    <p>Chikhali, Tal-Haveli,</p>
                    <p>Pune - 412114, Maharashtra, India</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <a 
                    href="tel:+918484922042"
                    className="text-sm sm:text-base hover:text-blue-600 transition-colors"
                  >
                    +91 84849 22042
                  </a>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a 
                    href="mailto:info@infinitysols.com"
                    className="text-sm sm:text-base hover:text-blue-600 transition-colors"
                  >
                    info@infinitysols.com
                  </a>
                </div>
              </div>
              <a
                href="https://www.google.com/maps/dir//Infinity+Automated+Solutions+Pvt.+Ltd.+No.1556+Plot+No.6+%26+17,+Gat+1559,+Dehu+-+Alandi+Rd,+Chikhali,+Pune,+Maharashtra+412114/@18.6925416,73.8007352,16z/data=!4m5!4m4!1m0!1m2!1m1!1s0x3bc2b79ab3bcee5d:0xf3b0ea586b42322d"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 w-full inline-flex items-center justify-center px-4 py-2.5 bg-brand-blue-600 text-white text-sm font-medium rounded-lg hover:bg-brand-blue-700 transition-colors duration-200 touch-manipulation"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                Get Directions
              </a>
            </div>
          </div>

          {/* Map container with engineering-style border */}
          <div className="relative p-1 sm:p-2 bg-gradient-to-br from-blue-100 via-white to-blue-50 border-2 border-blue-200 shadow-xl rounded-lg overflow-hidden">
            {/* Corner accents - responsive sizing */}
            <div className="absolute -top-1 -left-1 w-4 sm:w-6 h-4 sm:h-6 border-t-2 sm:border-t-3 border-l-2 sm:border-l-3 border-blue-500"></div>
            <div className="absolute -top-1 -right-1 w-4 sm:w-6 h-4 sm:h-6 border-t-2 sm:border-t-3 border-r-2 sm:border-r-3 border-blue-500"></div>
            <div className="absolute -bottom-1 -left-1 w-4 sm:w-6 h-4 sm:h-6 border-b-2 sm:border-b-3 border-l-2 sm:border-l-3 border-blue-500"></div>
            <div className="absolute -bottom-1 -right-1 w-4 sm:w-6 h-4 sm:h-6 border-b-2 sm:border-b-3 border-r-2 sm:border-r-3 border-blue-500"></div>

            {/* Embedded Google Map with responsive aspect ratio */}
            <div className="relative aspect-video w-full rounded-md overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3781.5984899068823!2d73.79995007588657!3d18.69254168728844!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b79ab3bcee5d%3A0xf3b0ea586b42322d!2sInfinity%20Automated%20Solutions%20Pvt.%20Ltd.!5e0!3m2!1sen!2sin!4v1642586800000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
                title="Infinity Automated Solutions Location"
              ></iframe>
            </div>

            {/* Desktop Contact Information Overlay - Hidden on Mobile */}
            <div className="hidden lg:block absolute top-4 right-4 bg-white p-6 shadow-lg border border-gray-200 rounded-lg max-w-sm xl:max-w-md">
              <h3 className="text-xl font-medium text-gray-900 mb-4">Our Location</h3>
              <div className="space-y-3 text-gray-600">
                <div className="flex items-start">
                  <svg className="w-5 h-5 mr-3 text-blue-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div className="text-sm">
                    <p>Plot No. 7 & 16, S. No-1556/1559,</p>
                    <p>Shelarwasti, Dehu-Alandi Road,</p>
                    <p>Chikhali, Tal-Haveli,</p>
                    <p>Pune - 412114, Maharashtra, India</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <a 
                    href="tel:+918484922042"
                    className="text-sm hover:text-blue-600 transition-colors"
                  >
                    +91 84849 22042
                  </a>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a 
                    href="mailto:info@infinitysols.com"
                    className="text-sm hover:text-blue-600 transition-colors"
                  >
                    info@infinitysols.com
                  </a>
                </div>
              </div>
              <a
                href="https://www.google.com/maps/dir//Infinity+Automated+Solutions+Pvt.+Ltd.+No.1556+Plot+No.6+%26+17,+Gat+1559,+Dehu+-+Alandi+Rd,+Chikhali,+Pune,+Maharashtra+412114/@18.6925416,73.8007352,16z/data=!4m5!4m4!1m0!1m2!1m1!1s0x3bc2b79ab3bcee5d:0xf3b0ea586b42322d"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 w-full inline-flex items-center justify-center px-4 py-2 bg-brand-blue-600 text-white text-sm font-medium rounded-lg hover:bg-brand-blue-700 transition-colors duration-200"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                Get Directions
              </a>
            </div>
          </div>

          {/* Tablet Layout: Contact Info Below Map */}
          <div className="hidden sm:block lg:hidden mt-6">
            <div className="bg-white p-6 shadow-lg border border-gray-200 rounded-lg">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-4">Our Location</h3>
                  <div className="flex items-start">
                    <svg className="w-5 h-5 mr-3 text-blue-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div className="text-sm text-gray-600">
                      <p>Plot No. 7 & 16, S. No-1556/1559,</p>
                      <p>Shelarwasti, Dehu-Alandi Road,</p>
                      <p>Chikhali, Tal-Haveli,</p>
                      <p>Pune - 412114, Maharashtra, India</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="text-lg font-medium text-gray-900">Contact</h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <a 
                        href="tel:+918484922042"
                        className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                      >
                        +91 84849 22042
                      </a>
                    </div>
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <a 
                        href="mailto:info@infinitysols.com"
                        className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                      >
                        info@infinitysols.com
                      </a>
                    </div>
                    <a
                      href="https://www.google.com/maps/dir//Infinity+Automated+Solutions+Pvt.+Ltd.+No.1556+Plot+No.6+%26+17,+Gat+1559,+Dehu+-+Alandi+Rd,+Chikhali,+Pune,+Maharashtra+412114/@18.6925416,73.8007352,16z/data=!4m5!4m4!1m0!1m2!1m1!1s0x3bc2b79ab3bcee5d:0xf3b0ea586b42322d"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-brand-blue-600 text-white text-sm font-medium rounded-lg hover:bg-brand-blue-700 transition-colors duration-200"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                      </svg>
                      Get Directions
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MapSection; 