import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import Navigation from '../components/common/Navigation';
import WhatsAppButton from '../components/common/WhatsAppButton';
import Footer from '../components/common/Footer';
import aboutData from '../data/aboutData.json';

const About = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const { scrollYProgress } = useScroll();

  // Transform for horizontal scrolling (desktop only)
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-80%']);

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Set body height for horizontal scrolling on desktop only
    const updateHeight = () => {
      if (!isMobile && containerRef.current) {
        const scrollWidth = containerRef.current.scrollWidth;
        const windowWidth = window.innerWidth;
        document.body.style.height = `${(scrollWidth - windowWidth) * 1.2 + window.innerHeight}px`;
      } else {
        document.body.style.height = 'auto';
      }
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    
    return () => {
      document.body.style.height = 'auto';
      window.removeEventListener('resize', updateHeight);
      window.removeEventListener('resize', checkMobile);
    };
  }, [isMobile]);

  const handleBackToHome = () => {
    navigate('/');
  };

  // Mobile Layout - Normal vertical scrolling
  if (isMobile) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-24">
        <Navigation />

        {/* Section 1: Hero */}
        <section className="pt-20 pb-12 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6"
              style={{ lineHeight: '1.2' }}
            >
              {aboutData.hero.title}
              <br />
              <span className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">
                {aboutData.hero.subtitle}
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-sm sm:text-base text-gray-600 leading-relaxed text-justify"
              style={{ lineHeight: '1.7' }}
            >
              {aboutData.hero.description}
            </motion.p>
          </div>
        </section>

        {/* Section 2: Our Story */}
        <section className="py-12 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-xl sm:text-2xl md:text-3xl font-bold mb-8 text-center"
            >
              {aboutData.story.title}
            </motion.h2>

            <div className="space-y-8">
              {/* Image */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="flex justify-center"
              >
                <div className="w-full max-w-sm aspect-square bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl overflow-hidden">
                  <img
                    src={aboutData.story.image.src}
                    alt={aboutData.story.image.alt}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </motion.div>

              {/* Text Content */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="space-y-4"
              >
                {aboutData.story.content.map((paragraph, index) => (
                  <p
                    key={index}
                    className={`leading-relaxed text-sm sm:text-base text-justify ${
                      index === aboutData.story.content.length - 1 ? 'text-gray-600' : 'text-gray-700'
                    }`}
                    style={{ lineHeight: '1.6' }}
                  >
                    {paragraph}
                  </p>
                ))}

                {/* Highlights */}
                <div className="grid grid-cols-2 gap-4 pt-6 mt-6 border-t border-gray-200">
                  {aboutData.story.highlights.map((highlight, index) => (
                    <div key={index} className="text-center">
                      <div className="text-lg sm:text-xl font-bold text-gray-900 mb-1">
                        {highlight.value}
                      </div>
                      <div className="text-xs text-gray-600">
                        {highlight.label}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Section 3: Meet the Architect */}
        <section className="py-12 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-xl sm:text-2xl md:text-3xl font-bold mb-8 text-center"
            >
              {aboutData.architect.title}
            </motion.h2>

            <div className="space-y-8">
              {/* Profile Image */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="flex justify-center"
              >
                <div className="w-full max-w-sm aspect-square bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg overflow-hidden">
                  <img
                    src={aboutData.architect.image.src}
                    alt={aboutData.architect.image.alt}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </motion.div>

              {/* Profile Info */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-center space-y-4"
              >
                <div>
                  <h3 className="text-lg sm:text-xl font-medium mb-2">
                    {aboutData.architect.name}
                  </h3>
                  <p className="text-gray-600 mb-3 text-sm sm:text-base">
                    {aboutData.architect.position}
                  </p>
                </div>

                <div className="space-y-3">
                  {aboutData.architect.bio.map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-gray-500 leading-relaxed text-sm sm:text-base text-justify"
                      style={{ lineHeight: '1.6' }}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Section 4: Our Philosophy & Approach */}
        <section className="py-12 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-xl sm:text-2xl md:text-3xl font-bold mb-8 text-center"
            >
              {aboutData.philosophy.title}
            </motion.h2>

            <div className="space-y-8">
              {/* Philosophy Cards */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="space-y-4"
              >
                {aboutData.philosophy.principles.map((principle, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                    <h3 className="text-sm sm:text-base font-semibold mb-2 text-gray-900">
                      {principle.title}
                    </h3>
                    <p
                      className="text-gray-600 leading-relaxed text-xs sm:text-sm text-justify"
                      style={{ lineHeight: '1.5' }}
                    >
                      {principle.description}
                    </p>
                  </div>
                ))}
              </motion.div>

              {/* Philosophy Image */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="flex justify-center"
              >
                <div className="w-full max-w-sm aspect-square bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg overflow-hidden">
                  <img
                    src={aboutData.philosophy.image.src}
                    alt={aboutData.philosophy.image.alt}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </motion.div>

              {/* Statistics */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="grid grid-cols-2 gap-4 pt-6"
              >
                {aboutData.philosophy.statistics.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
                      {stat.value}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600 uppercase tracking-wide">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Section 5: CTA */}
        <section className="py-12 px-4 bg-white">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                {aboutData.cta.title}
              </h2>
              <p
                className="text-gray-600 text-sm sm:text-base leading-relaxed text-justify"
                style={{ lineHeight: '1.7' }}
              >
                {aboutData.cta.description}
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBackToHome}
                className="bg-gray-900 text-white px-6 py-3 rounded-lg text-sm sm:text-base font-medium hover:bg-gray-800 transition-colors shadow-lg"
              >
                {aboutData.cta.buttonText}
              </motion.button>
            </motion.div>
          </div>
        </section>

        <Footer />
        <WhatsAppButton />
      </div>
    );
  }

  // Desktop Layout - Horizontal scrolling
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Main Horizontal Scrolling Content */}
      <div
        className="fixed left-0 w-full overflow-hidden"
        style={{
          top: '80px',
          height: 'calc(100vh - 160px)',
        }}
      >
        <motion.div ref={containerRef} style={{ x }} className="flex h-full w-[500vw] overflow-hidden gap-0">
          {/* Section 1: Hero */}
          <div className="w-screen h-full flex items-center justify-center bg-gray-50 px-8 py-28">
            <div className="max-w-7xl mx-auto text-center px-10 pt-28 pb-12">
              <motion.h1
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="text-4xl lg:text-6xl xl:text-7xl font-bold mb-8"
                style={{ lineHeight: '1.1' }}
              >
                {aboutData.hero.title}
                <br />
                <span className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">
                  {aboutData.hero.subtitle}
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="text-lg xl:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed text-justify"
                style={{ lineHeight: '1.8' }}
              >
                {aboutData.hero.description}
              </motion.p>
            </div>
          </div>

          {/* Section 2: Our Story */}
          <div className="w-screen h-full flex items-center justify-center bg-gray-50 px-8 py-8">
            <div className="w-full max-w-7xl mx-auto">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-3xl lg:text-4xl font-bold mb-12 text-center"
              >
                {aboutData.story.title}
              </motion.h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center h-full">
                {/* Image */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="w-full flex justify-center pt-8"
                >
                  <div className="w-[350px] h-[350px] bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl overflow-hidden">
                    <img
                      src={aboutData.story.image.src}
                      alt={aboutData.story.image.alt}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </motion.div>

                {/* Text Content */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="space-y-6"
                >
                  <div className="space-y-4">
                    {aboutData.story.content.map((paragraph, index) => (
                      <p
                        key={index}
                        className={`leading-relaxed text-lg text-justify ${
                          index === aboutData.story.content.length - 1 ? 'text-gray-600' : 'text-gray-700'
                        }`}
                        style={{ lineHeight: '1.6' }}
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  {/* Highlights */}
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                    {aboutData.story.highlights.map((highlight, index) => (
                      <div key={index} className="text-center">
                        <div className="text-2xl font-bold text-gray-900 mb-1">
                          {highlight.value}
                        </div>
                        <div className="text-xs text-gray-600">
                          {highlight.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Section 3: Meet the Architect */}
          <div className="w-screen h-full flex items-center bg-gray-50 px-8 py-8">
            <div className="max-w-7xl mx-auto w-full">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-2xl lg:text-3xl font-bold mb-8 text-center"
              >
                {aboutData.architect.title}
              </motion.h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center h-full">
                {/* Profile Image */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="flex justify-center lg:justify-start pt-12"
                >
                  <div className="w-[350px] h-[350px] bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg overflow-hidden">
                    <img
                      src={aboutData.architect.image.src}
                      alt={aboutData.architect.image.alt}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </motion.div>

                {/* Profile Info */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="text-center lg:text-left space-y-4"
                >
                  <div>
                    <h3 className="text-xl font-medium mb-2">
                      {aboutData.architect.name}
                    </h3>
                    <p className="text-gray-600 mb-3 text-lg">
                      {aboutData.architect.position}
                    </p>
                  </div>

                  <div className="space-y-3">
                    {aboutData.architect.bio.map((paragraph, index) => (
                      <p
                        key={index}
                        className="text-gray-500 leading-relaxed text-base text-justify"
                        style={{ lineHeight: '1.6' }}
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Section 4: Our Philosophy & Approach */}
          <div className="w-screen h-full flex items-center bg-white px-8 py-8">
            <div className="max-w-7xl mx-auto w-full">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-2xl lg:text-3xl font-bold mb-8 text-center"
              >
                {aboutData.philosophy.title}
              </motion.h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {/* Philosophy Cards */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="space-y-4 px-10 pt-8 pb-4"
                >
                  {aboutData.philosophy.principles.map((principle, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-base font-semibold mb-2 text-gray-900">
                        {principle.title}
                      </h3>
                      <p
                        className="text-gray-600 leading-relaxed text-sm text-justify"
                        style={{ lineHeight: '1.5' }}
                      >
                        {principle.description}
                      </p>
                    </div>
                  ))}
                </motion.div>

                {/* Feature Image with Statistics */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="flex items-center justify-center gap-6 pt-12"
                >
                  {/* Philosophy Image */}
                  <div className="w-[350px] h-[350px] bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg overflow-hidden">
                    <img
                      src={aboutData.philosophy.image.src}
                      alt={aboutData.philosophy.image.alt}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  
                  {/* Statistics */}
                  <div className="flex flex-col space-y-6">
                    {aboutData.philosophy.statistics.map((stat, index) => (
                      <div key={index} className="text-center">
                        <div className="text-3xl font-bold text-gray-900 mb-1">
                          {stat.value}
                        </div>
                        <div className="text-sm text-gray-600 uppercase tracking-wide">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Section 5: Back to Home */}
          <div className="w-screen h-full flex items-center justify-center bg-gray-50 px-8 py-28">
            <div className="text-center max-w-3xl mx-auto px-10 pt-28 pb-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {aboutData.cta.title}
                </h2>
                <p
                  className="text-gray-600 mb-6 max-w-xl mx-auto text-lg leading-relaxed text-justify"
                  style={{ lineHeight: '1.8' }}
                >
                  {aboutData.cta.description}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleBackToHome}
                  className="bg-gray-900 text-white px-6 py-3 rounded-lg text-base font-medium hover:bg-gray-800 transition-colors shadow-lg"
                >
                  {aboutData.cta.buttonText}
                </motion.button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 w-full z-10">
        <Footer />
      </div>

      <WhatsAppButton />
    </div>
  );
};

export default About;