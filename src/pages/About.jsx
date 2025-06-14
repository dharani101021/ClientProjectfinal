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
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-80%']);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    const updateHeight = () => {
      if (!isMobile && containerRef.current) {
        const scrollWidth = containerRef.current.scrollWidth;
        document.body.style.height = `${(scrollWidth - window.innerWidth) * 1.2 + window.innerHeight}px`;
      } else {
        document.body.style.height = 'auto';
      }
    };

    checkMobile();
    updateHeight();
    window.addEventListener('resize', checkMobile);
    window.addEventListener('resize', updateHeight);
    
    return () => {
      document.body.style.height = 'auto';
      window.removeEventListener('resize', updateHeight);
      window.removeEventListener('resize', checkMobile);
    };
  }, [isMobile]);

  const Section = ({ children, bg = "bg-gray-50", mobile = false }) => (
    <section className={`${mobile ? 'py-12 px-4' : 'w-screen h-full flex items-center justify-center px-8 py-8'} ${bg}`}>
      {children}
    </section>
  );

  const ImageContainer = ({ src, alt, isMobile = false, isDesktop = false }) => {
    if (isDesktop) {
      return (
        <div className="w-[350px] h-[350px] bg-gradient-to-br from-gray-200 to-gray-300 overflow-hidden">
          <img src={src} alt={alt} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
        </div>
      );
    }
    return (
      <div className="w-full max-w-sm aspect-square bg-gradient-to-br from-gray-200 to-gray-300 overflow-hidden">
        <img src={src} alt={alt} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
      </div>
    );
  };

  const AnimatedText = ({ children, className = "", delay = 0, ...props }) => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      {...(props.animate ? { animate: { opacity: 1, y: 0 } } : { whileInView: { opacity: 1, y: 0 } })}
      transition={{ duration: 0.8, delay }}
      viewport={{ once: true }}
      className={className}
    >
      {children}
    </motion.div>
  );

  if (isMobile) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-24">
        <Navigation />
        
        {/* Hero */}
        <Section mobile>
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedText animate delay={0.2}>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6" style={{ lineHeight: '1.2' }}>
                {aboutData.hero.title}<br />
                <span className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">
                  {aboutData.hero.subtitle}
                </span>
              </h1>
            </AnimatedText>
            <AnimatedText animate delay={0.4}>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed text-justify" style={{ lineHeight: '1.7' }}>
                {aboutData.hero.description}
              </p>
            </AnimatedText>
          </div>
        </Section>

        {/* Story */}
        <Section mobile>
          <div className="max-w-4xl mx-auto">
            <AnimatedText>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-center sm:mb-8 mb-6">
                {aboutData.story.title}
              </h2>
            </AnimatedText>
            <div className="space-y-8">
              <AnimatedText className="flex justify-center">
                <ImageContainer src={aboutData.story.image.src} alt={aboutData.story.image.alt} />
              </AnimatedText>
              <AnimatedText delay={0.2} className="space-y-4">
                {aboutData.story.content.map((paragraph, i) => (
                  <p key={i} className={`leading-relaxed text-xs sm:text-sm text-justify ${i === aboutData.story.content.length - 1 ? 'text-gray-600' : 'text-gray-700'}`} style={{ lineHeight: '1.6' }}>
                    {paragraph}
                  </p>
                ))}
                <div className="grid grid-cols-2 gap-4 pt-6 mt-6 border-t border-gray-200">
                  {aboutData.story.highlights.map((highlight, i) => (
                    <div key={i} className="text-center">
                      <div className="text-base sm:text-lg font-bold text-gray-900 mb-1">{highlight.value}</div>
                      <div className="text-xs text-gray-600">{highlight.label}</div>
                    </div>
                  ))}
                </div>
              </AnimatedText>
            </div>
          </div>
        </Section>

        {/* Architect */}
        <Section mobile bg="bg-white">
          <div className="max-w-4xl mx-auto">
            <AnimatedText>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-8 text-center">
                {aboutData.architect.title}
              </h2>
            </AnimatedText>
            <div className="space-y-8">
              <AnimatedText className="flex justify-center">
                <ImageContainer src={aboutData.architect.image.src} alt={aboutData.architect.image.alt} />
              </AnimatedText>
              <AnimatedText delay={0.2} className="text-center space-y-4">
                <div>
                  <h3 className="text-base sm:text-lg font-medium mb-2">{aboutData.architect.name}</h3>
                  <p className="text-gray-600 mb-3 text-xs sm:text-sm">{aboutData.architect.position}</p>
                </div>
                <div className="space-y-3">
                  {aboutData.architect.bio.map((paragraph, i) => (
                    <p key={i} className="text-gray-500 leading-relaxed text-xs sm:text-sm text-justify" style={{ lineHeight: '1.6' }}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              </AnimatedText>
            </div>
          </div>
        </Section>

        {/* Philosophy */}
        <Section mobile>
          <div className="max-w-4xl mx-auto">
            <AnimatedText>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-8 text-center">
                {aboutData.philosophy.title}
              </h2>
            </AnimatedText>
            <div className="space-y-8">
              <AnimatedText className="space-y-4">
                {aboutData.philosophy.principles.map((principle, i) => (
                  <div key={i} className="bg-white p-4 rounded-lg shadow-sm">
                    <h3 className="text-xs sm:text-sm font-semibold mb-2 text-gray-900">{principle.title}</h3>
                    <p className="text-gray-600 leading-relaxed text-xs text-justify" style={{ lineHeight: '1.5' }}>
                      {principle.description}
                    </p>
                  </div>
                ))}
              </AnimatedText>
              <AnimatedText delay={0.2} className="flex justify-center">
                <ImageContainer src={aboutData.philosophy.image.src} alt={aboutData.philosophy.image.alt} />
              </AnimatedText>
              <AnimatedText delay={0.4} className="grid grid-cols-2 gap-4 pt-6">
                {aboutData.philosophy.statistics.map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="text-lg sm:text-xl font-bold text-gray-900 mb-1">{stat.value}</div>
                    <div className="text-xs text-gray-600 uppercase tracking-wide">{stat.label}</div>
                  </div>
                ))}
              </AnimatedText>
            </div>
          </div>
        </Section>

        {/* CTA */}
        <Section mobile bg="bg-white">
          <div className="max-w-3xl mx-auto text-center">
            <AnimatedText className="space-y-6">
              <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-900">{aboutData.cta.title}</h2>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed text-justify" style={{ lineHeight: '1.7' }}>
                {aboutData.cta.description}
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/')}
                className="bg-gray-900 text-white px-6 py-3 rounded-lg text-xs sm:text-sm font-medium hover:bg-gray-800 transition-colors shadow-lg"
              >
                {aboutData.cta.buttonText}
              </motion.button>
            </AnimatedText>
          </div>
        </Section>

        <Footer />
        <WhatsAppButton />
      </div>
    );
  }

  // Desktop Layout
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="fixed left-0 w-full overflow-hidden" style={{ top: '80px', height: 'calc(100vh - 160px)' }}>
        <motion.div ref={containerRef} style={{ x }} className="flex h-full w-[500vw] overflow-hidden gap-0">
          
          {/* Hero */}
          <Section>
            <div className="max-w-7xl mx-auto text-center px-10 pt-28 pb-12">
              <AnimatedText animate delay={0.2}>
                <h1 className="text-3xl lg:text-5xl xl:text-6xl font-bold mb-8" style={{ lineHeight: '1.1' }}>
                  {aboutData.hero.title}<br />
                  <span className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">
                    {aboutData.hero.subtitle}
                  </span>
                </h1>
              </AnimatedText>
              <AnimatedText animate delay={0.4}>
                <p className="text-base xl:text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed text-justify" style={{ lineHeight: '1.8' }}>
                  {aboutData.hero.description}
                </p>
              </AnimatedText>
            </div>
          </Section>

          {/* Story */}
          <Section>
            <div className="w-full max-w-7xl mx-auto pt-28">
              <AnimatedText>
                <h2 className="text-2xl lg:text-3xl font-bold  text-center  ">{aboutData.story.title}</h2>
              </AnimatedText>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center h-full">
                <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="w-full flex justify-center pt-2">
                  <ImageContainer src={aboutData.story.image.src} alt={aboutData.story.image.alt} size="w-[350px] h-[350px]" aspect="" />
                </motion.div>
                <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} viewport={{ once: true }} className="space-y-6">
                  <div className="space-y-4">
                    {aboutData.story.content.map((paragraph, i) => (
                      <p key={i} className={`leading-relaxed text-base text-justify ${i === aboutData.story.content.length - 1 ? 'text-gray-600' : 'text-gray-700'}`} style={{ lineHeight: '1.6' }}>
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                    {aboutData.story.highlights.map((highlight, i) => (
                      <div key={i} className="text-center">
                        <div className="text-xl font-bold text-gray-900 mb-1">{highlight.value}</div>
                        <div className="text-xs text-gray-600">{highlight.label}</div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </Section>

          {/* Architect */}
          <Section>
            <div className="max-w-7xl mx-auto w-full pt-28">
              <AnimatedText>
                <h2 className="text-xl lg:text-2xl font-bold text-center">{aboutData.architect.title}</h2>
              </AnimatedText>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center h-full">
                <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="flex justify-center lg:justify-start pt-2">
                  <ImageContainer src={aboutData.architect.image.src} alt={aboutData.architect.image.alt} size="w-[350px] h-[350px]" aspect="" />
                </motion.div>
                <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} viewport={{ once: true }} className="text-center lg:text-left space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2">{aboutData.architect.name}</h3>
                    <p className="text-gray-600 mb-3 text-base">{aboutData.architect.position}</p>
                  </div>
                  <div className="space-y-3">
                    {aboutData.architect.bio.map((paragraph, i) => (
                      <p key={i} className="text-gray-500 leading-relaxed text-sm text-justify" style={{ lineHeight: '1.6' }}>
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </Section>

          {/* Philosophy */}
          <Section bg="bg-white">
            <div className="max-w-7xl mx-auto w-full pt-28">
              <AnimatedText>
                <h2 className="text-xl lg:text-2xl font-bold text-center">{aboutData.philosophy.title}</h2>
              </AnimatedText>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="space-y-4 px-10 pt-8 pb-4">
                  {aboutData.philosophy.principles.map((principle, i) => (
                    <div key={i} className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-sm font-semibold mb-2 text-gray-900">{principle.title}</h3>
                      <p className="text-gray-600 leading-relaxed text-xs text-justify" style={{ lineHeight: '1.5' }}>
                        {principle.description}
                      </p>
                    </div>
                  ))}
                </motion.div>
                <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} viewport={{ once: true }} className="flex items-center justify-center gap-6 pt-2">
                  <ImageContainer src={aboutData.philosophy.image.src} alt={aboutData.philosophy.image.alt} size="w-[350px] h-[350px]" aspect="" />
                  <div className="flex flex-col space-y-6">
                    {aboutData.philosophy.statistics.map((stat, i) => (
                      <div key={i} className="text-center">
                        <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                        <div className="text-xs text-gray-600 uppercase tracking-wide">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </Section>

          {/* CTA */}
          <Section>
            <div className="text-center max-w-3xl mx-auto px-10 pt-28 pb-12">
              <AnimatedText className="space-y-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">{aboutData.cta.title}</h2>
                <p className="text-gray-600 mb-6 max-w-xl mx-auto text-base leading-relaxed text-justify" style={{ lineHeight: '1.8' }}>
                  {aboutData.cta.description}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/')}
                  className="bg-gray-900 text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors shadow-lg"
                >
                  {aboutData.cta.buttonText}
                </motion.button>
              </AnimatedText>
            </div>
          </Section>
        </motion.div>
      </div>

      <div className="fixed bottom-0 left-0 w-full z-10">
        <Footer />
      </div>
      <WhatsAppButton />
    </div>
  );
};

export default About;