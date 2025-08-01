import React, { useRef, useState, useEffect } from 'react';
import { ArrowLeft, ArrowUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/common/Navigation';
import Project03Text from '../components/sections/Project03Text';
import Footer from '../components/common/Footer';
// import WhatsAppButton from '../components/common/WhatsAppButton';
import { projects } from '../data/ProjectData3.js';
import { projects as project01Data } from '../data/ProjectData1.js'; // Import Project01 data

const Project03 = ({ isVisible = true }) => {
  const scrollRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [centerIndex, setCenterIndex] = useState(0);
  const navigate = useNavigate();

  // Define the paragraph texts for specific images
  const paragraphTexts = {
    4: "Designed for a bird-loving client and practicing artist, the project is an exercise in contextual design—deeply personal, environmentally conscious, and rich in symbolism.", // Before 5th image (index 4)
    6: "In a small, quiet corner of the studio, a brick jali wall opens out to a feeding space for birds—an intentional invitation to the avian world to coexist with human creativity.", // Before 7th image (index 6)
    8: "The studio roof takes on a distinct V-shape, inspired by the soaring wings of a bird. Unlike conventional roof slopes that taper downward, this form rises upward—a gesture of openness, flight, and creative elevation." // Before 9th image (index 8)
  };

  // Project information data
  const projectInfo = {
    location: "Location , India",
    completed: "Completed in 2024",
    builtUpArea: "Buildup area-150.ft"
  };

  // Create an array with images and paragraphs in correct order
  const createContentItems = () => {
    const items = [];
    let currentIndex = 0;
    
    projects.forEach((project, projectIndex) => {
      // Add paragraph before this image if it exists
      if (paragraphTexts[projectIndex]) {
        items.push({
          type: 'paragraph',
          content: paragraphTexts[projectIndex],
          index: currentIndex++
        });
      }
      
      // Add the image
      items.push({
        type: 'image',
        project: project,
        projectIndex: projectIndex,
        index: currentIndex++
      });
    });
    
    // Add NEXT button
    items.push({
      type: 'next',
      index: currentIndex++
    });
    
    // Add Project01 preview
    if (project01Data.length > 0) {
      items.push({
        type: 'project01-preview',
        project: project01Data[0],
        index: currentIndex++
      });
    }
    
    return items;
  };

  const contentItems = createContentItems();

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Calculate total items including paragraphs
  const getTotalItems = () => {
    return projects.length + Object.keys(paragraphTexts).length + 2; // projects + paragraphs + NEXT + project01 preview
  };

  // Function to navigate to a specific item
  const navigateToItem = (targetIndex) => {
    const totalItems = getTotalItems();
    
    if (targetIndex < 0 || targetIndex >= totalItems || targetIndex === centerIndex) {
      return;
    }

    setCenterIndex(targetIndex);
    
    if (scrollRef.current) {
      if (isMobile) {
        // For mobile, find the target element and scroll it to viewport center
        const scrollContainer = scrollRef.current;
        const targetElement = scrollContainer.querySelector(`[data-item-index="${targetIndex}"]`);
        
        if (targetElement) {
          const containerRect = scrollContainer.getBoundingClientRect();
          const elementRect = targetElement.getBoundingClientRect();
          
          // Calculate the offset needed to center the element in viewport
          const viewportCenter = containerRect.height / 2;
          const elementCenter = elementRect.top - containerRect.top + (elementRect.height / 2);
          const scrollOffset = elementCenter - viewportCenter;
          
          scrollContainer.scrollTo({
            top: scrollContainer.scrollTop + scrollOffset,
            behavior: 'smooth'
          });
        }
      } else {
        // For desktop, scroll horizontally
        const containerWidth = scrollRef.current.clientWidth;
        const totalScrollWidth = scrollRef.current.scrollWidth - containerWidth;
        const targetScrollLeft = (targetIndex / (totalItems - 1)) * totalScrollWidth;
        
        scrollRef.current.scrollTo({
          left: targetScrollLeft,
          behavior: 'smooth'
        });
      }
    }
  };

  // Keyboard navigation effect
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isVisible) return;
      
      const totalItems = getTotalItems();
      
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        navigateToItem(Math.min(centerIndex + 1, totalItems - 1));
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        navigateToItem(Math.max(centerIndex - 1, 0));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isVisible, centerIndex]);

  // Helper function to check if an image should be at full size in mobile
  const shouldImageBeFullSize = (item) => {
    if (!isMobile || item.type !== 'image') return false;
    
    // Get viewport center
    if (!scrollRef.current) return false;
    
    const scrollContainer = scrollRef.current;
    const containerRect = scrollContainer.getBoundingClientRect();
    const viewportCenter = containerRect.height / 2;
    
    // Find the element
    const element = scrollContainer.querySelector(`[data-item-index="${item.index}"]`);
    if (!element) return false;
    
    const elementRect = element.getBoundingClientRect();
    const elementTop = elementRect.top - containerRect.top;
    const elementCenter = elementTop + (elementRect.height / 2);
    
    // Check if this element is closest to center
    const distance = Math.abs(elementCenter - viewportCenter);
    
    // Check if this is the closest image to center
    let isClosestImage = true;
    contentItems.forEach((otherItem) => {
      if (otherItem.type === 'image' && otherItem.index !== item.index) {
        const otherElement = scrollContainer.querySelector(`[data-item-index="${otherItem.index}"]`);
        if (otherElement) {
          const otherElementRect = otherElement.getBoundingClientRect();
          const otherElementTop = otherElementRect.top - containerRect.top;
          const otherElementCenter = otherElementTop + (otherElementRect.height / 2);
          const otherDistance = Math.abs(otherElementCenter - viewportCenter);
          
          if (otherDistance < distance) {
            isClosestImage = false;
          }
        }
      }
    });
    
    return isClosestImage;
  };

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const totalItems = getTotalItems();
        
        if (isMobile) {
          const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
          const maxScroll = scrollHeight - clientHeight;
          const progress = maxScroll > 0 ? scrollTop / maxScroll : 0;
          setScrollProgress(progress);
          
          // Calculate viewport center (middle of visible screen)
          const viewportCenter = clientHeight / 2;
          
          // Find which content item is closest to the viewport center
          let closestIndex = 0;
          let minDistance = Infinity;
          
          const scrollContainer = scrollRef.current;
          const containerRect = scrollContainer.getBoundingClientRect();
          
          // Loop through content items to find which one is in center
          contentItems.forEach((item, itemIndex) => {
            // Find the corresponding DOM element
            const elementSelector = `[data-item-index="${item.index}"]`;
            const element = scrollContainer.querySelector(elementSelector);
            
            if (element) {
              const elementRect = element.getBoundingClientRect();
              const elementTop = elementRect.top - containerRect.top;
              const elementCenter = elementTop + (elementRect.height / 2);
              const distance = Math.abs(elementCenter - viewportCenter);
              
              if (distance < minDistance) {
                minDistance = distance;
                closestIndex = item.index;
              }
            }
          });
          
          setCenterIndex(closestIndex);
          
        } else {
          const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
          const maxScroll = scrollWidth - clientWidth;
          const progress = maxScroll > 0 ? scrollLeft / maxScroll : 0;
          setScrollProgress(progress);
          
          // Simple calculation based on scroll percentage for desktop
          const scrollPercentage = progress;
          const newCenterIndex = Math.round(scrollPercentage * (totalItems - 1));
          setCenterIndex(Math.max(0, Math.min(totalItems - 1, newCenterIndex)));
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

  const getContainerSize = (index, itemType = 'image') => {
    if (isMobile) {
      // For mobile, only images should change size based on center position
      if (itemType === 'image') {
        return index === centerIndex 
          ? 'w-full max-w-md h-[284px] sm:h-[318px]' // Full size for center image
          : 'w-full max-w-sm h-[220px] sm:h-[250px]'; // Smaller for non-center images
      } else {
        // For paragraphs, NEXT, and project01-preview, use consistent sizing
        return 'w-full max-w-md h-auto min-h-[200px]';
      }
    } else {
      return index === centerIndex
        ? 'w-[318px] sm:w-[398px] md:w-[511px] lg:w-[567px] xl:w-[658px] h-[227px] sm:h-[284px] md:h-[363px] lg:h-[431px] xl:h-[439px]' // Original desktop size
        : 'w-[250px] sm:w-[318px] md:w-[400px] lg:w-[450px] xl:w-[520px] h-[180px] sm:h-[227px] md:h-[290px] lg:h-[340px] xl:h-[350px]'; // Smaller for non-center
    }
  };

  const getParagraphContainerSize = () => {
    // Fixed size for paragraphs - they don't change based on center position
    if (isMobile) {
      return 'w-full max-w-md min-h-[200px] flex items-center justify-center px-6';
    } else {
      return 'w-[400px] md:w-[500px] lg:w-[600px] xl:w-[650px] min-h-[250px] md:min-h-[300px] lg:min-h-[350px] xl:min-h-[400px] flex items-center justify-center px-8';
    }
  };

  const handleNextClick = () => {
    navigate('/project01');
  };

  // Helper function to determine margin for items
  const getItemMargin = (index, itemType, isFirstContentItem) => {
    if (isMobile) return {};
    
    if (isFirstContentItem) {
      // Small additional gap to prevent arrow overlay while keeping images close
      return { marginLeft: 'clamp(28vw, 33vw, 36vw)' }; // Slight increase to clear the arrow
    } else {
      // Normal spacing between subsequent items
      return { marginLeft: 'clamp(1rem, 2rem, 2rem)' };
    }
  };

  return (
    <section className={`fixed inset-0 bg-white transition-transform duration-1000 ${isVisible ? 'translate-x-0' : '-translate-x-full'}`}>
      <Navigation/>
      <Project03Text/>

      <div className="absolute inset-0 pt-12">
        <div
          ref={scrollRef}
          className={`
            h-full scrollbar-hide relative
            ${isMobile
              ? 'flex flex-col overflow-y-auto overflow-x-hidden items-center px-4 gap-6 pb-[40px] pt-[120px]'
              : 'flex overflow-x-auto overflow-y-hidden items-center'
            }
          `}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {/* Desktop Project Information and Scroll Indicator */}
          <div className={`
            absolute transform pointer-events-none
            ${isMobile
              ? 'top-[40px] left-1/2 -translate-x-1/2 flex flex-col items-center text-center z-30'
              : 'top-1/2 -translate-y-1/2 left-4 sm:left-6 md:left-8 lg:left-12 xl:left-16 flex items-center z-50'
            }
          `}>
            {/* Desktop Layout */}
            {!isMobile && (
              <div className="flex items-center gap-8 md:gap-12 lg:gap-16 pl-14">
                {/* Project Information Section */}
                <div className="max-w-[280px] lg:max-w-[320px] xl:max-w-[500px] flex flex-col justify-evenly gap-2">
                  <p className="text-xs md:text-sm lg:text-base text-black leading-relaxed font-light">
                    {projectInfo.location}
                  </p>
                  <p className="text-xs md:text-sm lg:text-base text-black leading-relaxed font-light">
                    {projectInfo.completed}
                  </p>
                  <p className="text-xs md:text-sm lg:text-base text-black leading-relaxed font-light">
                    {projectInfo.builtUpArea}
                  </p>
                </div>
                
                {/* Scroll Indicator */}
                <div className="flex items-center gap-1 lg:gap-1 text-black">
                  <span className="font-light leading-relaxed text-xs md:text-sm lg:text-base">
                    SCROLL
                  </span>
                  <div className="bg-black w-4 sm:w-6 md:w-8 lg:w-12 h-px"></div>
                  <ArrowLeft className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 rotate-180 text-black" />
                </div>
              </div>
            )}
            
            {/* Mobile Layout - Only Scroll Indicator */}
            {isMobile && (
              <div className="flex flex-col items-center gap-1 sm:gap-2">
                <span className=" tracking-[0.1em] sm:tracking-[0.15em] text-sm sm:text-base text-black mt-[50px]">
                  SCROLL
                </span>
                <ArrowUp className="text-black w-4 h-4 sm:w-5 sm:h-5" />
                <div className="bg-black w-px h-6 sm:h-8"></div>
              </div>
            )}
          </div>

          {/* Mobile Project Information - Inside scroll container */}
          {isMobile && (
            <div className="w-full max-w-md mx-auto px-3 mt-14">
              <div className="space-y-3">
                <p className="text-sm text-black font-light">{projectInfo.location}</p>
                <p className="text-sm text-black font-light">{projectInfo.completed}</p>
                <p className="text-sm text-black font-light">{projectInfo.builtUpArea}</p>
              </div>
            </div>
          )}

          {/* Render content items */}
          {contentItems.map((item, index) => {
            const isFirstContentItem = index === 0;
            
            if (item.type === 'paragraph') {
              return (
                <div
                  key={`paragraph-${item.index}`}
                  data-item-index={item.index}
                  className={`
                    flex-shrink-0 relative transition-all duration-700 ease-in-out
                    ${getParagraphContainerSize()}
                    ${item.index === centerIndex ? 'z-10' : 'z-0'}
                    ${isMobile ? '' : 'mt-[5vh]'}
                  `}
                  style={getItemMargin(item.index, 'paragraph', isFirstContentItem)}
                >
                  <div className={`
                    h-full w-full flex items-center justify-center text-center transition-all duration-700 
                    ${getImageOpacity(item.index)}
                  `}>
                    <p className={`
                      text-black leading-relaxed font-light max-w-[90%] text-left
                      ${isMobile 
                        ? 'text-sm' 
                        : 'text-sm md:text-base lg:text-lg'
                      }
                    `}
                    >
                      {item.content}
                    </p>
                  </div>
                </div>
              );
            }

            if (item.type === 'image') {
              const isImageCentered = isMobile ? shouldImageBeFullSize(item) : item.index === centerIndex;
              
              return (
                <div
                  key={item.project.id}
                  data-item-index={item.index}
                  className={`
                    flex-shrink-0 relative group transition-all duration-700 ease-in-out
                    ${isMobile 
                      ? (isImageCentered 
                          ? 'w-full max-w-md h-[284px] sm:h-[318px]' 
                          : 'w-full max-w-sm h-[220px] sm:h-[250px]')
                      : getContainerSize(item.index, 'image')
                    }
                    ${item.index === centerIndex ? 'z-10' : 'z-0'}
                    ${isMobile ? '' : 'mt-[5vh]'}
                    ${isMobile && item.projectIndex === projects.length - 1 ? 'mb-[50px]' : ''}
                    ${isMobile && item.projectIndex === 0 ? 'mt-[20px]' : ''}
                  `}
                  style={getItemMargin(item.index, 'image', isFirstContentItem)}
                >
                  <div className={`h-full relative overflow-hidden rounded-none md:rounded-none transition-all duration-700 ${getImageOpacity(item.index)}`}>
                    <img
                      src={item.project.image}
                      alt={item.project.title}
                      className="w-full h-full object-cover scale-100 transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                </div>
              );
            }

            if (item.type === 'next') {
              return (
                <div
                  key="next-button"
                  data-item-index={item.index}
                  onClick={handleNextClick}
                  className={`
                    flex-shrink-0 relative group cursor-pointer flex items-center justify-center transition-all duration-700 ease-in-out
                    ${getContainerSize(item.index, 'next')}
                    ${item.index === centerIndex ? 'z-10' : 'z-0'}
                    ${isMobile ? '' : 'mt-[5vh]'}
                    ${isMobile ? 'mb-[50px]' : ''}
                  `}
                  style={getItemMargin(item.index, 'next', isFirstContentItem)}
                >
                  <div className={`h-full w-full relative flex items-center justify-center text-black transition-all duration-700 ${getImageOpacity(item.index)}`}>
                    <span className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-wider">
                      NEXT
                    </span>
                  </div>
                </div>
              );
            }

            if (item.type === 'project01-preview') {
              return (
                <div
                  key={`project01-preview-${item.project.id}`}
                  data-item-index={item.index}
                  className={`
                    flex-shrink-0 relative group cursor-pointer transition-all duration-700 ease-in-out
                    ${getContainerSize(item.index, 'project01-preview')}
                    ${item.index === centerIndex ? 'z-10' : 'z-0'}
                    ${isMobile ? '' : 'mt-[5vh]'}
                    ${isMobile ? 'mb-[50px]' : ''}
                  `}
                  style={getItemMargin(item.index, 'project01-preview', isFirstContentItem)}
                  onClick={handleNextClick}
                >
                  <div className={`h-full relative overflow-hidden rounded-none md:rounded-none transition-all duration-700 ${getImageOpacity(item.index)}`}>
                    <img
                      src={item.project.image}
                      alt={item.project.title}
                      className="w-full h-full object-cover scale-100 transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                </div>
              );
            }

            return null;
          })}

          {/* Spacer for scroll */}
          {!isMobile && <div className="flex-shrink-0 w-48 sm:w-64 md:w-80 lg:w-96" />}
        </div>
      </div>
      <Footer />
      {/* <WhatsAppButton /> */}
    </section>
  );
};

export default Project03;