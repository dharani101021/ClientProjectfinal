import React, { useRef, useState, useEffect } from 'react';
import { ArrowLeft, ArrowUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/common/Navigation';
import Footer from '../components/common/Footer';
import Project02Text from '../components/sections/Project02Text';
// import WhatsAppButton from '../components/common/WhatsAppButton';
import { projects } from '../data/ProjectData2.js';
import { projects as project03Data } from '../data/ProjectData3.js'; // Import Project03 data

const Project02 = ({ isVisible = true }) => {
  const scrollRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [centerIndex, setCenterIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Keyboard navigation effect
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isVisible) return;
      
      // Total scrollable items: projects + NEXT + project03 preview
      const totalItems = projects.length + 2;
      
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        navigateToProject(Math.min(centerIndex + 1, totalItems - 1));
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        navigateToProject(Math.max(centerIndex - 1, 0));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isVisible, centerIndex]);

  // Function to navigate to a specific project
  const navigateToProject = (targetIndex) => {
    const totalItems = projects.length + 2; // projects + NEXT + project03 preview
    
    if (targetIndex < 0 || targetIndex >= totalItems || targetIndex === centerIndex) {
      return;
    }

    setCenterIndex(targetIndex);
    
    if (scrollRef.current) {
      const allItems = scrollRef.current.querySelectorAll('[data-scrollable-item]');
      const targetItem = allItems[targetIndex];
      
      if (targetItem) {
        if (isMobile) {
          // For mobile, scroll to center the item vertically
          const containerHeight = scrollRef.current.clientHeight;
          const itemTop = targetItem.offsetTop;
          const itemHeight = targetItem.offsetHeight;
          const targetScrollTop = itemTop - (containerHeight - itemHeight) / 2;
          
          scrollRef.current.scrollTo({
            top: Math.max(0, targetScrollTop),
            behavior: 'smooth'
          });
        } else {
          // For desktop, scroll to center the item horizontally
          const containerWidth = scrollRef.current.clientWidth;
          const itemLeft = targetItem.offsetLeft;
          const itemWidth = targetItem.offsetWidth;
          const targetScrollLeft = itemLeft - (containerWidth - itemWidth) / 2;
          
          scrollRef.current.scrollTo({
            left: Math.max(0, targetScrollLeft),
            behavior: 'smooth'
          });
        }
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        if (isMobile) {
          const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
          const maxScroll = scrollHeight - clientHeight;
          const progress = maxScroll > 0 ? scrollTop / maxScroll : 0;
          setScrollProgress(progress);
          
          // Calculate center item based on viewport center
          const containerCenter = scrollTop + clientHeight / 2;
          const items = scrollRef.current.querySelectorAll('[data-scrollable-item]');
          let newCenterIndex = 0;
          let minDistance = Infinity;

          items.forEach((item, index) => {
            const rect = item.getBoundingClientRect();
            const scrollContainer = scrollRef.current.getBoundingClientRect();
            const itemCenter = rect.top - scrollContainer.top + scrollTop + rect.height / 2;
            const distance = Math.abs(containerCenter - itemCenter);
            
            if (distance < minDistance) {
              minDistance = distance;
              newCenterIndex = index;
            }
          });
          
          setCenterIndex(newCenterIndex);
        } else {
          const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
          const maxScroll = scrollWidth - clientWidth;
          const progress = maxScroll > 0 ? scrollLeft / maxScroll : 0;
          setScrollProgress(progress);
          
          // Calculate center item based on viewport center
          const containerCenter = scrollLeft + clientWidth / 2;
          const items = scrollRef.current.querySelectorAll('[data-scrollable-item]');
          let newCenterIndex = 0;
          let minDistance = Infinity;

          items.forEach((item, index) => {
            const rect = item.getBoundingClientRect();
            const scrollContainer = scrollRef.current.getBoundingClientRect();
            const itemCenter = rect.left - scrollContainer.left + scrollLeft + rect.width / 2;
            const distance = Math.abs(containerCenter - itemCenter);
            
            if (distance < minDistance) {
              minDistance = distance;
              newCenterIndex = index;
            }
          });
          
          setCenterIndex(newCenterIndex);
        }
      }
    };

    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll);
      // Use setTimeout to ensure DOM is ready
      setTimeout(() => handleScroll(), 100);
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

  const getImageOpacity = (index) => {
    if (index === centerIndex) {
      return 'opacity-100'; // Full opacity for center image
    }
    return 'opacity-70'; // Slightly reduced opacity for non-center images
  };

  const getContainerSize = (index) => {
    if (isMobile) {
      return index === centerIndex 
        ? 'w-full max-w-md h-[284px] sm:h-[318px]' // Original mobile size
        : 'w-full max-w-sm h-[220px] sm:h-[250px]'; // Smaller for non-center
    } else {
      return index === centerIndex
        ? 'w-[318px] sm:w-[398px] md:w-[511px] lg:w-[567px] xl:w-[658px] h-[227px] sm:h-[284px] md:h-[363px] lg:h-[431px] xl:h-[439px]' // Original desktop size
        : 'w-[250px] sm:w-[318px] md:w-[400px] lg:w-[450px] xl:w-[520px] h-[180px] sm:h-[227px] md:h-[290px] lg:h-[340px] xl:h-[350px]'; // Smaller for non-center
    }
  };

  const handleNextClick = () => {
    navigate('/project03');
  };

  return (
    <section className={`fixed inset-0 bg-white transition-transform duration-1000 ${isVisible ? 'translate-x-0' : '-translate-x-full'}`}>
      <Navigation/>
      <Project02Text/>

      <div className="absolute inset-0 pt-12">
        <div
          ref={scrollRef}
          className={`
            h-full scrollbar-hide relative
            ${isMobile
              ? 'flex flex-col overflow-y-auto overflow-x-hidden items-center px-4 gap-8 pb-[40px] pt-[180px]'
              : 'flex overflow-x-auto overflow-y-hidden items-center gap-8'
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
              data-scrollable-item="true"
              className={`
                flex-shrink-0 relative group transition-all duration-700 ease-in-out
                ${getContainerSize(index)}
                ${index === centerIndex ? 'z-10' : 'z-0'}
                ${isMobile ? '' : 'mt-[5vh]'} ${index === projects.length - 1 && isMobile ? ' mb-[50px]' : ''}
              `}
              style={!isMobile && index === 0 ? {
                marginLeft: 'clamp(10vw, 25vw, 25vw)'
              } : {}}
            >
              <div className={`h-full relative overflow-hidden rounded-none md:rounded-none transition-all duration-700 ${getImageOpacity(index)}`}>
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover scale-100 transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          ))}

          {/* NEXT Button - appears after last image */}
          <div
            data-scrollable-item="true"
            onClick={handleNextClick}
            className={`
              flex-shrink-0 relative group cursor-pointer flex items-center justify-center transition-all duration-700 ease-in-out
              ${getContainerSize(projects.length)}
              ${projects.length === centerIndex ? 'z-10' : 'z-0'}
              ${isMobile ? 'mb-[50px]' : 'mt-[5vh]'}
            `}
          >
            <div className={`h-full w-full relative flex items-center justify-center text-black transition-all duration-700 ${getImageOpacity(projects.length)}`}>
              <span className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-wider">
                NEXT
              </span>
            </div>
          </div>

          {/* First image from Project03 - appears after NEXT text */}
          {project03Data.length > 0 && (
            <div
              data-scrollable-item="true"
              key={`project03-preview-${project03Data[0].id}`}
              className={`
                flex-shrink-0 relative group cursor-pointer transition-all duration-700 ease-in-out
                ${getContainerSize(projects.length + 1)}
                ${projects.length + 1 === centerIndex ? 'z-10' : 'z-0'}
                ${isMobile ? 'mb-[50px]' : 'mt-[5vh]'}
              `}
              onClick={handleNextClick}
            >
              <div className={`h-full relative overflow-hidden rounded-none md:rounded-none transition-all duration-700 ${getImageOpacity(projects.length + 1)}`}>
                <img
                  src={project03Data[0].image}
                  alt={project03Data[0].title}
                  className="w-full h-full object-cover scale-100 transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          )}

          {/* Spacer for scroll */}
          {!isMobile && <div className="flex-shrink-0 w-48 sm:w-64 md:w-80 lg:w-96" />}
        </div>
      </div>
      <Footer />
      {/* <WhatsAppButton /> */}
    </section>
  );
};

export default Project02;