import React, { useRef, useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/common/Navigation';
import Footer from '../components/common/Footer';
import WhatsAppButton from '../components/common/WhatsAppButton';
import { projects } from '../data/ProjectData1.json';

const Project01 = () => {
  const scrollRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [imageErrors, setImageErrors] = useState({});
  const navigate = useNavigate();

  const handleImageError = (projectId) => {
    setImageErrors((prev) => ({ ...prev, [projectId]: true }));
  };

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
      if (scrollRef.current) {
        e.preventDefault();
        scrollRef.current.scrollLeft += e.deltaY;
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, []);

  return (
    <div className="w-full bg-white">
      {/* Global Navigation */}
      <Navigation />

      {/* Horizontal Scrolling Section */}
      <div className="relative h-[85vh] bg-white pt-[200px]">
        <div
          ref={scrollRef}
          className="flex h-full overflow-x-auto overflow-y-hidden scrollbar-hide relative items-center"
        >
          {/* Scroll Indicator */}
          <div className="flex-shrink-0 flex items-center gap-4 text-black pointer-events-none z-30 transition-all duration-300 ease-out ml-8 mr-3 mt-[30px] text-[15px] tracking-wider font-normal">
            <span>SCROLL</span>
            <div
              className="bg-black h-px transition-all duration-300 ease-out"
              style={{ width: `${24 + scrollProgress * 24}px` }}
            ></div>
            <ArrowLeft
              className="w-4 h-4 text-black transition-transform duration-300 ease-out"
              style={{ transform: `rotate(${180 + scrollProgress * 10}deg)` }}
            />
          </div>

          {/* Image Slides */}
          {projects.slice(0, 5).map((project, index) => (
            <div
              key={project.id}
              className="flex-shrink-0 w-[400px] md:w-[480px] lg:w-[500px] h-[240px] md:h-[288px] lg:h-[380px] relative group mt-[5vh]"
              style={{
                marginLeft: index === 0 ? '10px' : '2rem',
                marginRight: index === 4 ? '20vw' : '0',
              }}
            >
              <div className="h-full relative overflow-hidden shadow-md">
                {imageErrors[project.id] ? (
                  <div className="bg-gray-300 w-full h-full" />
                ) : (
                  <img
                    src={project.image}
                    alt={project.title}
                    onError={() => handleImageError(project.id)}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Project01;