import React, { useRef, useState, useEffect } from 'react';
import { ArrowDown, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/common/Navigation';
import Footer from '../components/common/Footer';
import WhatsAppButton from '../components/common/WhatsAppButton';
import { projects } from '../data/ProjectData1.json';

const Project01 = ({ isVisible = true }) => {
  const scrollRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        if (isMobile) {
          // Vertical scroll progress
          const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
          const maxScroll = scrollHeight - clientHeight;
          const progress = maxScroll > 0 ? scrollTop / maxScroll : 0;
          setScrollProgress(progress);
        } else {
          // Horizontal scroll progress
          const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
          const maxScroll = scrollWidth - clientWidth;
          const progress = maxScroll > 0 ? scrollLeft / maxScroll : 0;
          setScrollProgress(progress);
        }
      }
    };

    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll);
      return () => scrollElement.removeEventListener('scroll', handleScroll);
    }
  }, [isMobile]);

  useEffect(() => {
    const handleWheel = (e) => {
      if (scrollRef.current && isVisible && !isMobile) {
        e.preventDefault();
        scrollRef.current.scrollLeft += e.deltaY;
      }
    };

    if (isVisible && !isMobile) {
      window.addEventListener('wheel', handleWheel, { passive: false });
      return () => window.removeEventListener('wheel', handleWheel);
    }
  }, [isVisible, isMobile]);

  return (
    <section className={`fixed inset-0 bg-white transition-transform duration-1000 ${isVisible ? 'translate-x-0' : '-translate-x-full'}`}>
     <Navigation />
      {/* Scrolling Images - Responsive Layout */}
      <div className="absolute inset-0 pt-32 pb-20 mt-[36px]">
        <div
          ref={scrollRef}
          className={`
            h-full scrollbar-hide relative
            ${isMobile
              ? 'flex flex-col overflow-y-auto overflow-x-hidden items-center px-4 gap-6 pb-[20px] pt-24'
              : 'flex overflow-x-auto overflow-y-hidden items-center'
            }
          `}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {/* Scroll Indicator - Responsive */}
          <div className={`
            absolute transform flex items-center gap-1 sm:gap-2 md:gap-3 lg:gap-4 text-black pointer-events-none z-10
            ${isMobile
              ? 'top-[40px] left-1/2 -translate-x-1/2 flex-col text-center'
              : 'top-1/2 -translate-y-1/2 left-3 sm:left-4 md:left-6 lg:left-8 xl:left-[calc(25vw-200px)]'
            }
          `}>
            <span className="text-[10px] sm:text-xs md:text-sm lg:text-base font-medium tracking-[0.1em] sm:tracking-[0.15em]">
              SCROLL
            </span>
            <div className={`bg-black ${isMobile ? 'h-4 sm:h-6 md:h-8 lg:h-12 w-px' : 'w-4 sm:w-6 md:w-8 lg:w-12 h-px'}`}></div>
            {isMobile ? (
              <ArrowDown className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 text-black" />
            ) : (
              <ArrowLeft className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 rotate-180 text-black" />
            )}
          </div>

          {projects.map((project, index) => (
            <div
              key={project.id}
              onClick={() => navigate(`/project0${index + 1}`)}
              className={`
                flex-shrink-0 relative group cursor-pointer
                ${isMobile
                  ? 'w-full max-w-sm h-[250px] sm:h-[280px]' + (index === projects.length - 1 ? ' mb-[50px]' : '')
                  : 'w-[280px] sm:w-[350px] md:w-[450px] lg:w-[500px] xl:w-[580px] h-[200px] sm:h-[250px] md:h-[320px] lg:h-[380px] xl:h-[388px] mt-[5vh]'
                }
              `}
              style={!isMobile ? {
                marginLeft: index === 0
                  ? 'clamp(10vw, 25vw, 25vw)'
                  : 'clamp(1rem, 2rem, 2rem)'
              } : {}}
            >
              <div className="h-full relative overflow-hidden rounded-lg md:rounded-none">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          ))}

          {/* Spacer for horizontal scroll only */}
          {!isMobile && <div className="flex-shrink-0 w-48 sm:w-64 md:w-80 lg:w-96" />}
        </div>
      </div>
       <Footer />
       <WhatsAppButton />

    </section>
   
  );
};

export default Project01;