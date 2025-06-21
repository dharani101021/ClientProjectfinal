import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import Navigation from '../components/common/Navigation';
// import WhatsAppButton from '../components/common/WhatsAppButton';
import Footer from '../components/common/Footer';
import aboutData from '../data/aboutData.js';

const About = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const { scrollYProgress } = useScroll();
  // Updated for 7 sections: (7-1)/7 = 6/7 ≈ 0.857 => -85.7%
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-85.7%']); 

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

  const Section = ({ children, mobile = false }) => (
    <section className={`${mobile ? 'py-12 px-4' : 'w-screen h-full flex items-center justify-center px-8 py-8'}`}>
      {children}
    </section>
  );

  const ImageContainer = ({ src, alt, isMobile = false, isDesktop = false }) => {
    if (isDesktop) {
      return (
        <div className="w-[300px] h-[300px] bg-gradient-to-br from-gray-200 to-gray-300 overflow-hidden">
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

  

  // Team Member Component for reusability
  const TeamMemberSection = ({ member, sectionTitle, mobile = false }) => (
    <Section mobile={mobile}>
      <div className="max-w-4xl mx-auto">
        <div className="space-y-4">
          <AnimatedText>
            <h2 className={`${mobile ? 'text-2xl sm:text-3xl md:text-4xl' : 'text-xl lg:text-2xl'} font-bold text-center text-gray-900 tracking-wide mb-2`}>
              {sectionTitle}
            </h2>
          </AnimatedText>
          <AnimatedText className="flex justify-center" delay={0.2}>
            <ImageContainer src={member.image.src} alt={member.image.alt} isDesktop={!mobile} />
          </AnimatedText>
          <AnimatedText delay={0.4} className="text-center space-y-4">
            <div>
              <h3 className={`${mobile ? 'text-lg sm:text-xl md:text-2xl' : 'text-lg'} font-bold mb-2 text-gray-700`}>
                {member.title}
              </h3>
              <h4 className={`${mobile ? 'text-base sm:text-lg' : 'text-lg'} font-medium mb-2`}>{member.name}</h4>
              <p className={`text-gray-600 mb-3 ${mobile ? 'text-xs sm:text-sm' : 'text-base xl:text-lg'}`}>{member.position}</p>
            </div>
            <div className="space-y-3">
              {member.bio.map((paragraph, i) => (
                <p key={i} className={`text-gray-500 leading-relaxed ${mobile ? 'text-xs sm:text-sm' : 'text-base xl:text-lg'} text-justify`} style={{ lineHeight: '1.6' }}>
                  {paragraph}
                </p>
              ))}
            </div>
          </AnimatedText>
        </div>
      </div>
    </Section>
  );

  // Desktop Team Member Component
  const DesktopTeamMemberSection = ({ member, sectionTitle }) => (
    <Section>
      <div className="w-full max-w-7xl mx-auto ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center h-full">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="w-full flex flex-col items-center space-y-4">
            <AnimatedText>
              <h2 className="text-xl lg:text-2xl font-bold text-center">{sectionTitle}</h2>
            </AnimatedText>
            <ImageContainer src={member.image.src} alt={member.image.alt} isDesktop={true} />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} viewport={{ once: true }} className="space-y-6">
            <div className="space-y-4 pt-20">
              <div>
                <h4 className="text-lg font-medium mb-2">{member.name}</h4>
                <p className="text-gray-600 mb-3 text-base xl:text-lg">{member.position}</p>
              </div>
              {member.bio.map((paragraph, i) => (
                <p key={i} className="text-gray-500 leading-relaxed text-base xl:text-lg text-justify" style={{ lineHeight: '1.5' }}>
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );

  if (isMobile) {
    return (
      <div className="min-h-screen pt-28 pb-24">
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
            <div className="space-y-4">
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

        {/* First Team Member */}
        <TeamMemberSection 
          member={aboutData.architect} 
          sectionTitle="MEET TEAM" 
          mobile={true}
        />

        {/* Second Team Member (Duplicate) */}
        <TeamMemberSection 
          member={aboutData.architect2} 
          // sectionTitle="MEET TEAM MEMBER 2" 
          mobile={true}
        />

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
                  <div key={i} className="p-4 rounded-lg shadow-sm">
                    <h3 className="text-lg font-medium mb-2 text-gray-900">{principle.title}</h3>
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

        {/* --- OUR JOURNEY (MOBILE) --- */}
        <Section mobile>
  <div className="max-w-4xl mx-auto">
    <AnimatedText>
      <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-center sm:mb-8 mb-6">
        {aboutData.ourJourney.title}
      </h2>
    </AnimatedText>
    <div className="space-y-6">
      <AnimatedText className="flex justify-center" delay={0.4}>
        <ImageContainer src={aboutData.ourJourney.image.src} alt={aboutData.ourJourney.image.alt} />
      </AnimatedText>
      <AnimatedText delay={0.2} className="space-y-4">
        {aboutData.ourJourney.bio.map((paragraph, i) => (
          <p
            key={i}
            className={`text-xs sm:text-sm text-gray-600 leading-relaxed text-justify${i !== aboutData.ourJourney.bio.length - 1 ? ' mb-4' : ''}`}
            style={{ lineHeight: '1.7' }}
          >
            {paragraph}
          </p>
        ))}
      </AnimatedText>
     
    </div>
  </div>
</Section>


        {/* CTA */}
        <Section mobile>
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
        {/* <WhatsAppButton /> */}
      </div>
    );
  }

  // Desktop Layout
  return (
    <div className="min-h-screen">
      <Navigation />
      {/* Updated width to 700vw for 7 sections */}
      <div className="fixed left-0 w-full overflow-hidden" style={{ top: '80px', height: 'calc(100vh - 160px)' }}>
        <motion.div ref={containerRef} style={{ x }} className="flex h-full w-[700vw] overflow-hidden gap-0">
          
          {/* Hero */}
          <Section>
            <div className="max-w-7xl mx-auto text-center px-10 h-full flex flex-col justify-center items-center">
              <AnimatedText animate delay={0.2}>
                <h1 className="text-3xl lg:text-5xl xl:text-6xl font-bold mb-6" style={{ lineHeight: '1.1' }}>
                  {aboutData.hero.title}<br />
                  <span className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">
                    {aboutData.hero.subtitle}
                  </span>
                </h1>
              </AnimatedText>
              <AnimatedText animate delay={0.4}>
                <p className="text-base xl:text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed text-center" style={{ lineHeight: '1.8' }}>
                  {aboutData.hero.description}
                </p>
              </AnimatedText>
            </div>
          </Section>

          {/* Story */}
          <Section>
            <div className="w-full max-w-7xl mx-auto ">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center h-full">
                <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="w-full flex flex-col items-center space-y-4">
                  <AnimatedText>
                    <h2 className="text-xl lg:text-2xl font-bold text-center">{aboutData.story.title}</h2>
                  </AnimatedText>
                  <ImageContainer src={aboutData.story.image.src} alt={aboutData.story.image.alt} isDesktop={true} />
                </motion.div>
                <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} viewport={{ once: true }} className="space-y-6">
                  <div className="space-y-4 pt-36">
                    {aboutData.story.content.map((paragraph, i) => (
                      <p key={i} className={`leading-relaxed text-base xl:text-lg text-justify ${i === aboutData.story.content.length - 1 ? 'text-gray-600' : 'text-gray-700'}`} style={{ lineHeight: '1.6' }}>
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

          {/* First Team Member */}
          <DesktopTeamMemberSection 
            member={aboutData.architect} 
            sectionTitle="MEET TEAM"
          />

          {/* Second Team Member (Duplicate) */}
          <DesktopTeamMemberSection 
            member={aboutData.architect2} 
            // sectionTitle="MEET TEAM MEMBER 2"
          />
          
          {/* Philosophy */}
          <Section>
            <div className="max-w-7xl mx-auto w-full ">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="space-y-4 px-10">
                  {aboutData.philosophy.principles.map((principle, i) => (
                    <div key={i} className="p-1 rounded-lg mt-10">
                      <h3 className="text-lg font-medium  text-gray-900 text-center ">{principle.title}</h3>
                      <p className="text-gray-600 leading-relaxed text-base xl:text-lg text-justify " style={{ lineHeight: '1.5' }}>
                        {principle.description}
                      </p>
                    </div>
                  ))}
                </motion.div>
                <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} viewport={{ once: true }} className="flex flex-col items-center justify-center gap-6">
                  <AnimatedText>
                    <h2 className="text-xl lg:text-2xl font-bold mr-20">{aboutData.philosophy.title}</h2>
                  </AnimatedText>
                  <div className="flex items-center gap-6">
                    <ImageContainer src={aboutData.philosophy.image.src} alt={aboutData.philosophy.image.alt} isDesktop={true} />
                    <div className="flex flex-col space-y-6">
                      {aboutData.philosophy.statistics.map((stat, i) => (
                        <div key={i} className="text-center">
                          <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                          <div className="text-xs text-gray-600 uppercase tracking-wide">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </Section>

          {/* --- OUR JOURNEY (DESKTOP) --- MODIFIED: H2 above image on the left --- */}
          <Section>
            <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center justify-center gap-12 px-10">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="w-full lg:w-1/2 flex flex-col items-center space-y-4"
              >
                <AnimatedText>
                  <h2 className="text-xl lg:text-2xl font-bold text-gray-900 text-center">{aboutData.ourJourney.title}</h2>
                </AnimatedText>
                <ImageContainer src={aboutData.ourJourney.image.src} alt={aboutData.ourJourney.image.alt} isDesktop={true} />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="w-full lg:w-1/2 flex flex-col justify-center space-y-6"
              >
                <AnimatedText delay={0.2}>
                  {aboutData.ourJourney.bio.map((paragraph, i) => (
                    <p
                      key={i}
                      className={`text-base xl:text-lg text-gray-600 leading-relaxed text-justify${i !== aboutData.ourJourney.bio.length - 1 ? ' mb-4' : ''}`}
                      style={{ lineHeight: '1.8' }}
                    >
                      {paragraph}
                    </p>
                  ))}
                </AnimatedText>
              </motion.div>
            </div>
          </Section>

          {/* CTA */}
          <Section>
            <div className="text-center max-w-3xl mx-auto px-10 pt-28 pb-12">
              <AnimatedText className="space-y-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">{aboutData.cta.title}</h2>
                <p className="text-gray-600 mb-6 max-w-xl mx-auto text-base xl:text-lg leading-relaxed text-justify" style={{ lineHeight: '1.8' }}>
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
      {/* <WhatsAppButton /> */}
    </div>
  );
};

export default About;