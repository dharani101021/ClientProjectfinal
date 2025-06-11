import React from 'react';
import Navigation from '../components/common/Navigation';
import WhatsAppButton from '../components/common/WhatsAppButton';
import Footer from '../components/common/Footer';


const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-100  mt-[5%] ">
      <Navigation />
      
      <main className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 text-gray-900 pt-16 sm:pt-20 lg:pt-24 pb-8">
        <div className="max-w-7xl w-full">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16 pt-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-wide mb-4 sm:mb-6 lg:mb-8 animate-fade-in-up leading-tight">
              GET IN TOUCH
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-900 tracking-wide animate-fade-in-up px-2 max-w-2xl mx-auto" style={{animationDelay: '0.2s'}}>
              Let's discuss your next project
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 xl:gap-20">
            {/* Contact Information */}
            <div className="space-y-8 sm:space-y-10 animate-fade-in-up order-2 lg:order-1" style={{animationDelay: '0.4s'}}>
              <div>
                {/* <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-wide mb-6 sm:mb-8">Contact Information</h2> */}
                <div className="space-y-6 sm:space-y-8 text-base sm:text-lg lg:text-xl">
                  <div>
                    <p className="text-gray-900 text-xs sm:text-sm tracking-wider mb-2">EMAIL</p>
                    <a href="mailto:hello@precht.at" className="hover:text-gray-900 transition-colors break-all block">
                      hello@precht.at
                    </a>
                  </div>
                  <div>
                    <p className="text-gray-900 text-xs sm:text-sm tracking-wider mb-2">PHONE</p>
                    <a href="tel:+4312345678" className="hover:text-gray-900 transition-colors block">
                      +43 1 234 5678
                    </a>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-wide mb-6 sm:mb-8">Locations</h2>
                <div className="space-y-6 sm:space-y-8">
                  <div>
                    <p className="text-gray-900 text-xs sm:text-sm tracking-wider mb-3">SALZBURG OFFICE</p>
                    <p className="text-base sm:text-lg lg:text-xl leading-relaxed">
                      Getreidegasse 15<br/>
                      5020 Salzburg<br/>
                      Austria
                    </p>
                  </div>
                  {/* <div>
                    <p className="text-gray-900 text-xs sm:text-sm tracking-wider mb-3">VIENNA OFFICE</p>
                    <p className="text-base sm:text-lg lg:text-xl leading-relaxed">
                      Kärntner Straße 12<br/>
                      1010 Vienna<br/>
                      Austria
                    </p>
                  </div> */}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="animate-fade-in-up order-1 lg:order-2" style={{animationDelay: '0.6s'}}>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-wide mb-6 sm:mb-8">Send us a Message</h2>
              <form className="space-y-6 sm:space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-gray-900 text-xs sm:text-sm tracking-wider mb-3">
                      FIRST NAME
                    </label>
                    <input
                      type="text"
                      className="w-full bg-transparent border-b border-gray-600 py-3 sm:py-4 text-gray-900 placeholder-gray-500 focus:border-black focus:outline-none transition-colors text-base sm:text-lg"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-900 text-xs sm:text-sm tracking-wider mb-3">
                      LAST NAME
                    </label>
                    <input
                      type="text"
                      className="w-full bg-transparent border-b border-gray-600 py-3 sm:py-4 text-gray-900 placeholder-gray-500 focus:border-black focus:outline-none transition-colors text-base sm:text-lg"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-900 text-xs sm:text-sm tracking-wider mb-3">
                    EMAIL ADDRESS
                  </label>
                  <input
                    type="email"
                    className="w-full bg-transparent border-b border-gray-600 py-3 sm:py-4 text-gray-900 placeholder-gray-500 focus:border-black focus:outline-none transition-colors text-base sm:text-lg"
                    placeholder="john.doe@example.com"
                  />
                </div>

                <div>
                  <label className="block text-gray-900 text-xs sm:text-sm tracking-wider mb-3">
                    PROJECT TYPE
                  </label>
                  <select className="w-full bg-transparent border-b border-gray-600 py-3 sm:py-4 text-gray-900 focus:border-black focus:outline-none transition-colors text-base sm:text-lg appearance-none cursor-pointer">
                    <option value="" className="bg-gray-100">Select project type</option>
                    <option value="residential" className="bg-gray-100">Residential</option>
                    <option value="commercial" className="bg-gray-100">Commercial</option>
                    <option value="hospitality" className="bg-gray-100">Hospitality</option>
                    <option value="public" className="bg-gray-100">Public Space</option>
                    <option value="other" className="bg-gray-100">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-900 text-xs sm:text-sm tracking-wider mb-3">
                    MESSAGE
                  </label>
                  <textarea
                    rows="5"
                    className="w-full bg-transparent border-b border-gray-600 py-3 sm:py-4 text-gray-900 placeholder-gray-500 focus:border-black focus:outline-none transition-colors resize-none text-base sm:text-lg"
                    placeholder="Tell us about your project..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gray-100 text-gray-100 py-4 sm:py-5 tracking-wider font-medium hover:bg-gray-800 transition-colors text-base sm:text-lg touch-manipulation rounded-full border-2 border-gray-100 hover:border-gray-800"
                >
                  SEND MESSAGE
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>

      
      <Footer/>
      <WhatsAppButton />
    </div>
  );
};

export default Contact;