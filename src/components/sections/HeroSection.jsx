import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, ArrowLeft, ArrowUp } from 'lucide-react';
import { projects } from '../../data/projects';

const HeroSection = ({ isVisible = true }) => {
  const scrollRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        if (isMobile) {
          const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
          const maxScroll = scrollHeight - clientHeight;
          const progress = maxScroll > 0 ? scrollTop / maxScroll : 0;
          setScrollProgress(progress);
        } else {
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
      <div className="absolute inset-0 pt-12">
        <div
          ref={scrollRef}
          className={`
            h-full scrollbar-hide relative
            ${isMobile
              ? 'flex flex-col overflow-y-auto overflow-x-hidden items-center px-4 gap-6 pb-[40px] pt-[180px]'
              : 'flex overflow-x-auto overflow-y-hidden items-center'
            }
          `}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {/* Scroll Indicator */}
          <div className={`
            absolute transform flex items-center gap-1 sm:gap-2 md:gap-3 lg:gap-4 text-black pointer-events-none z-10
            ${isMobile
              ? 'top-[95px] left-1/2 -translate-x-1/2 flex-col text-center'
              : 'top-1/2 -translate-y-1/2 left-3 sm:left-4 md:left-6 lg:left-8 xl:left-[calc(25vw-200px)]'
            }
          `}>
            <span className={`font-medium tracking-[0.1em] sm:tracking-[0.15em] ${
              isMobile 
                ? 'text-sm sm:text-base'
                : 'text-[10px] sm:text-xs md:text-sm lg:text-base'
            }`}>
              SCROLL
            </span>
            {isMobile ? (
              <>
                <ArrowUp className={`text-black ${isMobile ? 'w-4 h-4 sm:w-5 sm:h-5' : 'w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4'}`} />
                <div className={`bg-black w-px ${isMobile ? 'h-6 sm:h-8' : 'h-4 sm:h-6 md:h-8 lg:h-12'}`}></div>
              </>
            ) : (
              <>
                <div className="bg-black w-4 sm:w-6 md:w-8 lg:w-12 h-px"></div>
                <ArrowLeft className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 rotate-180 text-black" />
              </>
            )}
          </div>

          {projects.map((project, index) => (
            <div
              key={project.id}
              onClick={() => navigate(`/project0${index + 1}`)}
              className={`
                flex-shrink-0 relative group cursor-pointer
                ${isMobile
                  ? 'w-full max-w-md h-[284px] sm:h-[318px]' + (index === projects.length - 1 ? ' mb-[50px]' : '')
                  : 'w-[318px] sm:w-[398px] md:w-[511px] lg:w-[567px] xl:w-[658px] h-[227px] sm:h-[284px] md:h-[363px] lg:h-[431px] xl:h-[439px] mt-[5vh]'
                }
              `}
              style={!isMobile ? {
                marginLeft: index === 0
                  ? 'clamp(10vw, 25vw, 25vw)'
                  : 'clamp(1rem, 2rem, 2rem)'
              } : {}}
            >
              <div className="h-full relative overflow-hidden rounded-none md:rounded-none">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover scale-100 transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Plus Icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-black rounded-full flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-500">
                    <Plus className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                  </div>
                </div>

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Text Info with Transition */}
                <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-4 sm:left-6 md:left-8 right-4 sm:right-6 md:right-8 text-white opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 ease-in-out">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-medium mb-1 sm:mb-2 tracking-wide">
                    {project.title}
                  </h3>
                  <p className="text-sm sm:text-base md:text-lg text-gray-200 mb-1 tracking-wide">
                    {project.location}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-300 tracking-wide">
                    {project.year}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* Spacer for scroll */}
          {!isMobile && <div className="flex-shrink-0 w-48 sm:w-64 md:w-80 lg:w-96" />}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;