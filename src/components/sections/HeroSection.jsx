import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, ArrowLeft } from 'lucide-react';
import { projects } from '../../data/projects';

const HeroSection = ({ isVisible = true }) => {
  const scrollRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        const maxScroll = scrollWidth - clientWidth;
        const progress = maxScroll > 0 ? scrollLeft / maxScroll : 0;
        setScrollProgress(progress);
      }
    };

    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll);
      return () => scrollElement.removeEventListener('scroll', handleScroll);
    }
  }, []);

  useEffect(() => {
    const handleWheel = (e) => {
      if (scrollRef.current && isVisible) {
        e.preventDefault();
        scrollRef.current.scrollLeft += e.deltaY;
      }
    };

    if (isVisible) {
      window.addEventListener('wheel', handleWheel, { passive: false });
      return () => window.removeEventListener('wheel', handleWheel);
    }
  }, [isVisible]);

  return (
    <section className={`fixed inset-0 bg-white transition-transform duration-1000 ${isVisible ? 'translate-x-0' : '-translate-x-full'}`}>
      
      {/* Horizontal Scrolling Images */}
      <div className="absolute inset-0 pt-32 pb-20 mt-[2.5%]">
        <div
          ref={scrollRef}
          className="flex h-full overflow-x-auto overflow-y-hidden scrollbar-hide relative items-center"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {/* Scroll Indicator */}
          <div className="absolute top-1/2 transform -translate-y-1/2 flex items-center gap-4 text-black pointer-events-none z-10"
               style={{ 
                 left: `calc(25vw - 200px)`,
                 fontFamily: 'BwGradual-Regular',
                 fontSize: '15px',
                 letterSpacing: '0.1em'
               }}>
            <span>SCROLL</span>
            <div className="w-12 h-px bg-black"></div>
            <ArrowLeft className="w-4 h-4 rotate-180 text-black" />
          </div>

          {projects.map((project, index) => (
            <div 
              key={project.id}
              onClick={() => navigate(`/project0${index + 1}`)} // <— navigate to /project01, /project02, etc.
              className="flex-shrink-0 w-[400px] md:w-[480px] lg:w-[500px] h-[240px] md:h-[288px] lg:h-[380px] relative group cursor-pointer mt-[5vh]"
              style={{ marginLeft: index === 0 ? '25vw' : '2rem' }}
            >
              <div className="h-full relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Circle Plus Icon on Hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-500">
                    <Plus className="w-8 h-8 text-white" />
                  </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="absolute bottom-8 left-8 right-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <h3 className="text-2xl font-medium mb-2 tracking-wide">{project.title}</h3>
                  <p className="text-lg text-gray-200 mb-1 tracking-wide">{project.location}</p>
                  <p className="text-sm text-gray-300 tracking-wide">{project.year}</p>
                </div>
              </div>
            </div>
          ))}

          <div className="flex-shrink-0 w-96" />
        </div>
      </div>

      {/* Scroll Progress Bar */}
      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 w-80">
        <div className="relative">
          <div className="w-full h-1 bg-gray-300 rounded-full overflow-hidden">
            <div 
              className="h-full bg-black rounded-full transition-all duration-300 ease-out"
              style={{ width: `${scrollProgress * 100}%` }}
            />
          </div>
          <div 
            className="absolute top-1/2 transform -translate-y-1/2 w-3 h-3 bg-black rounded-full transition-all duration-300 ease-out"
            style={{ left: `calc(${scrollProgress * 100}% - 6px)` }}
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
