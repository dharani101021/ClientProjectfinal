import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, ArrowLeft, ArrowUp } from 'lucide-react';
import { projects } from '../../data/projects'; // Replace with your actual import

const HeroSection = ({ isVisible = true }) => {
  const scrollRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [centerIndex, setCenterIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitioningIndex, setTransitioningIndex] = useState(null);
  const [slideDirection, setSlideDirection] = useState('right'); // 'right' or 'left'
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
      if (!isVisible || isTransitioning) return;
      
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        navigateToProject(Math.min(centerIndex + 1, projects.length - 1));
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        navigateToProject(Math.max(centerIndex - 1, 0));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isVisible, centerIndex, isTransitioning]);

  // Function to navigate to a specific project
  const navigateToProject = (targetIndex) => {
    if (targetIndex < 0 || targetIndex >= projects.length || targetIndex === centerIndex || isTransitioning) {
      return;
    }

    setCenterIndex(targetIndex);
    
    if (scrollRef.current) {
      if (isMobile) {
        // For mobile, scroll vertically
        const containerHeight = scrollRef.current.clientHeight;
        const totalScrollHeight = scrollRef.current.scrollHeight - containerHeight;
        const targetScrollTop = (targetIndex / (projects.length - 1)) * totalScrollHeight;
        
        scrollRef.current.scrollTo({
          top: targetScrollTop,
          behavior: 'smooth'
        });
      } else {
        // For desktop, scroll horizontally
        const containerWidth = scrollRef.current.clientWidth;
        const totalScrollWidth = scrollRef.current.scrollWidth - containerWidth;
        const targetScrollLeft = (targetIndex / (projects.length - 1)) * totalScrollWidth;
        
        scrollRef.current.scrollTo({
          left: targetScrollLeft,
          behavior: 'smooth'
        });
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current && !isTransitioning) {
        if (isMobile) {
          const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
          const maxScroll = scrollHeight - clientHeight;
          const progress = maxScroll > 0 ? scrollTop / maxScroll : 0;
          setScrollProgress(progress);
          
          // Simple calculation based on scroll percentage
          const scrollPercentage = progress;
          const newCenterIndex = Math.round(scrollPercentage * (projects.length - 1));
          setCenterIndex(Math.max(0, Math.min(projects.length - 1, newCenterIndex)));
        } else {
          const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
          const maxScroll = scrollWidth - clientWidth;
          const progress = maxScroll > 0 ? scrollLeft / maxScroll : 0;
          setScrollProgress(progress);
          
          // Simple calculation based on scroll percentage
          const scrollPercentage = progress;
          const newCenterIndex = Math.round(scrollPercentage * (projects.length - 1));
          setCenterIndex(Math.max(0, Math.min(projects.length - 1, newCenterIndex)));
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
  }, [isMobile, isTransitioning]);

  useEffect(() => {
    const handleWheel = (e) => {
      if (scrollRef.current && isVisible && !isMobile && !isTransitioning) {
        e.preventDefault();
        scrollRef.current.scrollLeft += e.deltaY;
      }
    };

    if (isVisible && !isMobile) {
      window.addEventListener('wheel', handleWheel, { passive: false });
      return () => window.removeEventListener('wheel', handleWheel);
    }
  }, [isVisible, isMobile, isTransitioning]);

  const handleProjectClick = (index) => {
    if (isTransitioning) return;
    
    // Determine slide direction based on the next image position
    const nextIndex = (index + 1) % projects.length;
    const currentPosition = index;
    const nextPosition = nextIndex;
    
    // Set slide direction
    if (isMobile) {
      setSlideDirection(nextPosition > currentPosition ? 'down' : 'up');
    } else {
      setSlideDirection(nextPosition > currentPosition ? 'right' : 'left');
    }
    
    setIsTransitioning(true);
    setTransitioningIndex(index);
    
    // Navigate exactly when the slide animation completes (1000ms duration)
    setTimeout(() => {
      navigate(`/project0${index + 1}`);
    }, 1000); // Matches the exact duration of the slide animation
  };

  const getImageScale = (index) => {
    if (isTransitioning && transitioningIndex === index) {
      return 'scale-105'; // Slight scale up during transition
    }
    return 'scale-100';
  };

  const getImageOpacity = (index) => {
    if (isTransitioning) {
      if (transitioningIndex === index) {
        return 'opacity-100'; // Keep full opacity for sliding image
      } else {
        return 'opacity-20'; // Fade out other images more
      }
    }
    
    if (index === centerIndex) {
      return 'opacity-100';
    }
    return 'opacity-70';
  };

  const getContainerSize = (index) => {
    if (isTransitioning && transitioningIndex === index) {
      // Keep original size during slide, don't expand to full screen yet
      if (isMobile) {
        return index === centerIndex 
          ? 'w-full max-w-md h-[284px] sm:h-[318px]'
          : 'w-full max-w-sm h-[220px] sm:h-[250px]';
      } else {
        return index === centerIndex
          ? 'w-[318px] sm:w-[398px] md:w-[511px] lg:w-[567px] xl:w-[658px] h-[227px] sm:h-[284px] md:h-[363px] lg:h-[431px] xl:h-[439px]'
          : 'w-[250px] sm:w-[318px] md:w-[400px] lg:w-[450px] xl:w-[520px] h-[180px] sm:h-[227px] md:h-[290px] lg:h-[340px] xl:h-[350px]';
      }
    }
    
    if (isMobile) {
      return index === centerIndex 
        ? 'w-full max-w-md h-[284px] sm:h-[318px]'
        : 'w-full max-w-sm h-[220px] sm:h-[250px]';
    } else {
      return index === centerIndex
        ? 'w-[318px] sm:w-[398px] md:w-[511px] lg:w-[567px] xl:w-[658px] h-[227px] sm:h-[284px] md:h-[363px] lg:h-[431px] xl:h-[439px]'
        : 'w-[250px] sm:w-[318px] md:w-[400px] lg:w-[450px] xl:w-[520px] h-[180px] sm:h-[227px] md:h-[290px] lg:h-[340px] xl:h-[350px]';
    }
  };

  const getContainerTransform = (index) => {
    if (isTransitioning && transitioningIndex === index) {
      if (isMobile) {
        // For mobile, slide to next position vertically
        if (slideDirection === 'down') {
          return 'transform-gpu translate-y-[calc(100vh/2)] scale-110';
        } else {
          return 'transform-gpu translate-y-[calc(-100vh/2)] scale-110';
        }
      } else {
        // For desktop, slide to next position horizontally
        if (slideDirection === 'right') {
          // Calculate the distance to slide (gap + width of next image)
          return 'transform-gpu translate-x-[clamp(450px,calc(30vw+350px),1000px)] scale-110';
        } else {
          return 'transform-gpu translate-x-[clamp(-450px,calc(-30vw-350px),-1000px)] scale-110';
        }
      }
    }
    return '';
  };

  const getTransitionDuration = (index) => {
    if (isTransitioning && transitioningIndex === index) {
      return 'duration-1000'; // Longer duration for the sliding image
    }
    return 'duration-700';
  };

  const getBlurEffect = (index) => {
    if (isTransitioning && transitioningIndex !== index) {
      return 'blur-sm'; // Add blur to non-transitioning images
    }
    return '';
  };

  return (
    <section className={`fixed inset-0 bg-white transition-transform duration-1000 ${isVisible ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="absolute inset-0 pt-12">
        <div
          ref={scrollRef}
          className={`
            h-full scrollbar-hide relative
            ${isMobile
              ? 'flex flex-col overflow-y-auto overflow-x-hidden items-center px-4 gap-8 pb-[80px] pt-[180px]'
              : 'flex overflow-x-auto overflow-y-hidden items-center gap-8'
            }
            ${isTransitioning ? 'pointer-events-none' : ''}
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
            ${isTransitioning ? 'opacity-0' : 'opacity-100'}
            transition-opacity duration-300
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
              data-project-item="true"
              onClick={() => handleProjectClick(index)}
              className={`
                flex-shrink-0 relative group cursor-pointer transition-all ease-out
                ${getContainerSize(index)}
                ${getContainerTransform(index)}
                ${getTransitionDuration(index)}
                ${index === centerIndex ? 'z-10' : 'z-0'}
                ${isTransitioning && transitioningIndex === index ? 'z-50' : ''}
                ${isMobile ? '' : 'mt-[5vh]'}
                ${isTransitioning ? 'pointer-events-auto' : ''}
              `}
              style={!isMobile && index === 0 && !isTransitioning ? {
                marginLeft: 'clamp(10vw, 25vw, 25vw)'
              } : {}}
            >
              <div className={`
                h-full relative overflow-hidden rounded-none md:rounded-none transition-all
                ${getImageOpacity(index)} ${getBlurEffect(index)} ${getTransitionDuration(index)}
              `}>
                <img
                  src={project.image}
                  alt={project.title}
                  className={`
                    w-full h-full object-cover transition-all ease-out
                    ${isTransitioning && transitioningIndex === index ? '' : 'group-hover:scale-105'}
                    ${getImageScale(index)} ${getTransitionDuration(index)}
                  `}
                />
                
                {/* Plus Icon - show on hover (hide during transition) */}
                {!isTransitioning && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-black rounded-full flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-500">
                      <Plus className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                    </div>
                  </div>
                )}

                {/* Overlay Gradient - permanent (hide during transition) */}
                {!isTransitioning && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-500" />
                )}

                {/* Text Info - permanent and visible (fade during transition) */}
                <div className={`
                  absolute bottom-4 sm:bottom-6 md:bottom-8 left-4 sm:left-6 md:left-8 right-4 sm:right-6 md:right-8 text-white transition-all duration-700 ease-in-out
                  ${isTransitioning && transitioningIndex === index ? 'opacity-0' : 'opacity-100'}
                `}>
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

              {/* Slide Trail Effect */}
              {isTransitioning && transitioningIndex === index && (
                <div className="absolute inset-0 opacity-30">
                  <div className={`
                    absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent
                    ${isMobile 
                      ? (slideDirection === 'down' ? 'animate-pulse' : 'animate-pulse')
                      : (slideDirection === 'right' ? 'animate-pulse' : 'animate-pulse')
                    }
                  `} />
                </div>
              )}
            </div>
          ))}

          {/* Spacer for scroll (hide during transition) */}
          {!isMobile && !isTransitioning && <div className="flex-shrink-0 w-48 sm:w-64 md:w-80 lg:w-96" />}
        </div>
      </div>
      
      {/* Enhanced Transition Overlay with gradient */}
      {isTransitioning && (
        <div className="fixed inset-0 z-30">
          <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-white/90 to-white/95 animate-pulse" />
          <div className="absolute inset-0 bg-white/60 animate-fade-in" />
        </div>
      )}
    </section>
  );
};

export default HeroSection;