import React from 'react';
import Navigation from '../components/common/Navigation';
// import WhatsAppButton from '../components/common/WhatsAppButton';
import Footer from '../components/common/Footer';
import { output } from 'framer-motion/client';


const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      
      <main className="min-h-screen flex items-center  justify-center px-4 sm:px-6 lg:px-8 text-gray-900 pt-28 sm:pt-20 lg:pt-24 lg:pb-28 sm:pb-24 pb-16">
        <div className="max-w-7xl w-full">
          <div className="text-center sm:mb-12 lg:mb-16 mt-12">
            
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 xl:gap-20">
            {/* Contact Information */}
            <div className="space-y-8 sm:space-y-10 animate-fade-in-up order-2 lg:order-1" style={{animationDelay: '0.4s'}}>
              <div>
                <div className="space-y-6 sm:space-y-8 text-sm sm:text-base lg:text-lg">
                  <div>
                    <h2 className="text-sm sm:text-base lg:text-lg font-semibold tracking-wide mb-4 sm:mb-6">EMAIL</h2>
                    <a href="mailto:hello@precht.at" className="hover:text-gray-900 transition-colors break-all block">
                      kooduarchitecture@gmail.com
                    </a>
                  </div>
                  <div>
                    <h2 className="text-sm sm:text-base lg:text-lg font-semibold tracking-wide mb-4 sm:mb-6">PHONE</h2>
                    <a href="tel:+919940788844" className="hover:text-gray-900 transition-colors block">
                      +91 9940788844
                    </a>
                    <a href="tel:+919629298337" className="hover:text-gray-900 transition-colors block">
                      +91 9629298337
                    </a>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-sm sm:text-base lg:text-lg font-semibold tracking-wide mb-4 sm:mb-6">LOCATION</h2>
                <div className="space-y-6 sm:space-y-8">
                  <div>
                    
                    <p className="text-sm sm:text-base lg:text-lg leading-relaxed pb-6">
                      Chennai<br/>
                      Coimbatore<br/>
                      Koodu Office@ <br/>
                      No-1 Kasukkara street,<br/>
                      Mayiladuthurai - 609001
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="animate-fade-in-up order-1 lg:order-2" style={{animationDelay: '0.6s'}}>
              <form className="space-y-6 sm:space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <h2 className="text-sm sm:text-base lg:text-lg font-semibold tracking-wide mb-1 sm:mb-2">
                      FULL NAME
                    </h2>
                    <input
                      type="text"
                      className="w-full bg-transparent border-b border-gray-600 py-3 sm:py-4 text-gray-900 placeholder-gray-500 focus:border-black focus:outline-none transition-colors text-sm sm:text-base"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <h2 className="text-sm sm:text-base lg:text-lg font-semibold tracking-wide mb-1 sm:mb-2">
                      PROJECT TYPE
                    </h2>
                    <div className="relative">
                      <select className="w-full bg-transparent border-b border-gray-600 py-3 sm:py-4 text-gray-900 focus:border-black focus:outline-none transition-colors text-sm sm:text-base appearance-none cursor-pointer pr-8">
                        <option value="" className="bg-gray-100">Select project type</option>
                        <option value="residential" className="bg-gray-100">Residential</option>
                        <option value="commercial" className="bg-gray-100">Commercial</option>
                        <option value="hospitality" className="bg-gray-100">Hospitality</option>
                        <option value="public" className="bg-gray-100">Public Space</option>
                        <option value="other" className="bg-gray-100">Other</option>
                      </select>
                      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-sm sm:text-base lg:text-lg font-semibold tracking-wide mb-1 sm:mb-2">
                    EMAIL ADDRESS
                  </h2>
                  <input
                    type="email"
                    className="w-full bg-transparent border-b border-gray-600 py-3 sm:py-4 text-gray-900 placeholder-gray-500 focus:border-black focus:outline-none transition-colors text-sm sm:text-base"
                    placeholder="john.doe@example.com"
                  />
                </div>

                <div>
                  <h2 className="text-sm sm:text-base lg:text-lg font-semibold tracking-wide mb-1 sm:mb-2">
                    MESSAGE
                  </h2>
                  <textarea
                    rows="1"
                    className="w-full bg-transparent border-b border-gray-600 py-3 sm:py-4 text-gray-900 placeholder-gray-500 focus:border-black focus:outline-none transition-colors resize-none text-sm sm:text-base"
                    placeholder="Tell us about your project..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gray-900 text-gray-100 py-4 sm:py-5 tracking-wider font-medium hover:bg-gray-800 transition-colors text-sm sm:text-base touch-manipulation rounded-full border-2 border-gray-100 hover:border-gray-800"
                >
                  SEND MESSAGE
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>

      
      <Footer/>
      {/* <WhatsAppButton /> */}
    </div>
  );
};

export default Contact;

