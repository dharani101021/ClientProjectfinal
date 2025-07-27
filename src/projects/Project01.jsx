import React, { useRef, useState, useEffect } from 'react';
import { ArrowLeft, ArrowUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/common/Navigation';
import Project01Text from '../components/sections/Project01Text';
import Footer from '../components/common/Footer';
// import WhatsAppButton from '../components/common/WhatsAppButton';
import { projects } from '../data/ProjectData1.js';
import { projects as project02Data } from '../data/ProjectData2.js'; // Import Project02 data

const Project01 = ({ isVisible = true }) => {
  const scrollRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [centerIndex, setCenterIndex] = useState(0);
  const navigate = useNavigate();

  // Define the paragraph texts for specific images
  const paragraphTexts = {
    2: "Developed as a modular detail, each pot can be individually replaced in the event of damage — a conscious decision balancing craft, maintenance, and sustainability.", // Before 3rd image (index 2)
    4: "Exposed earthy textures, handmade tiles, and craft-based detailing express a deep respect for material honesty and local craftsmanship.", // Before 5th image (index 4)
    7: "The project's most iconic element is its façade, crafted from hand-thrown earthen pots.", // Before 8th image (index 7)
    8: "These sculptural modules are not merely decorative; they double as a passive cooling system, shielding the building from harsh southern sun while allowing for airflow.", // Before 9th image (index 8)
    10: "The interiors play with split levels and interconnected volumes, offering varied spatial experiences while maintaining visual continuity between generations." // Before 11th image (index 10)
  };

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
    return projects.length + Object.keys(paragraphTexts).length + 2; // projects + paragraphs + NEXT + project02 preview
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

  // Function to navigate to a specific item
  const navigateToItem = (targetIndex) => {
    const totalItems = getTotalItems();
    
    if (targetIndex < 0 || targetIndex >= totalItems || targetIndex === centerIndex) {
      return;
    }

    setCenterIndex(targetIndex);
    
    if (scrollRef.current) {
      if (isMobile) {
        // For mobile, scroll vertically
        const containerHeight = scrollRef.current.clientHeight;
        const totalScrollHeight = scrollRef.current.scrollHeight - containerHeight;
        const targetScrollTop = (targetIndex / (totalItems - 1)) * totalScrollHeight;
        
        scrollRef.current.scrollTo({
          top: targetScrollTop,
          behavior: 'smooth'
        });
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

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const totalItems = getTotalItems();
        
        if (isMobile) {
          const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
          const maxScroll = scrollHeight - clientHeight;
          const progress = maxScroll > 0 ? scrollTop / maxScroll : 0;
          setScrollProgress(progress);
          
          // Simple calculation based on scroll percentage
          const scrollPercentage = progress;
          const newCenterIndex = Math.round(scrollPercentage * (totalItems - 1));
          setCenterIndex(Math.max(0, Math.min(totalItems - 1, newCenterIndex)));
        } else {
          const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
          const maxScroll = scrollWidth - clientWidth;
          const progress = maxScroll > 0 ? scrollLeft / maxScroll : 0;
          setScrollProgress(progress);
          
          // Simple calculation based on scroll percentage
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

  const getParagraphContainerSize = () => {
    // Fixed size for paragraphs - they don't change based on center position
    if (isMobile) {
      return 'w-full max-w-md min-h-[200px] flex items-center justify-center px-6';
    } else {
      return 'w-[400px] md:w-[500px] lg:w-[600px] xl:w-[650px] min-h-[250px] md:min-h-[300px] lg:min-h-[350px] xl:min-h-[400px] flex items-center justify-center px-8';
    }
  };

  const handleNextClick = () => {
    navigate('/project02');
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
    
    // Add Project02 preview
    if (project02Data.length > 0) {
      items.push({
        type: 'project02-preview',
        project: project02Data[0],
        index: currentIndex++
      });
    }
    
    return items;
  };

  const contentItems = createContentItems();

  return (
    <section className={`fixed inset-0 bg-white transition-transform duration-1000 ${isVisible ? 'translate-x-0' : '-translate-x-full'}`}>
      <Navigation/>
      <Project01Text/>

      <div className="absolute inset-0 pt-12">
        <div
          ref={scrollRef}
          className={`
            h-full scrollbar-hide relative
            ${isMobile
              ? 'flex flex-col overflow-y-auto overflow-x-hidden items-center px-4 gap-6 pb-[40px] pt-[400px]'
              : 'flex overflow-x-auto overflow-y-hidden items-center'
            }
          `}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {/* Scroll Indicator with Paragraph */}
          <div className={`
            absolute transform pointer-events-none z-50
            ${isMobile
              ? 'top-[95px] left-1/2 -translate-x-1/2 flex flex-col items-center text-center'
              : 'top-1/2 -translate-y-1/2 left-4 sm:left-6 md:left-8 lg:left-12 xl:left-16 flex items-center'
            }
          `}>
            {/* Desktop Layout */}
            {!isMobile && (
              <div className="flex items-center gap-8 md:gap-12 lg:gap-16 pl-14">
                {/* Paragraph Section */}
                <div className="max-w-[280px] lg:max-w-[320px] xl:max-w-[500px] flex flex-col justify-evenly gap-4 ">
                  <p className="text-xs md:text-sm lg:text-base text-black leading-relaxed font-light ">
                    Chennai, India
                  </p>
                  <p className="text-xs md:text-sm lg:text-base text-black leading-relaxed font-light">
                    Completed in 2022
                  </p>
                  <p className="text-xs md:text-sm lg:text-base text-black leading-relaxed font-light">
                    Built-Up Area: 3850sqft
                  </p>
                  <p className="text-xs md:text-sm lg:text-base text-black leading-relaxed font-light">
                    At the heart of the home lies a central courtyard — a traditional gesture reinterpreted for
                    modern living.
                  </p>
                  <p className="text-xs md:text-sm lg:text-base text-black leading-relaxed font-light">
                    This void introduces natural light and ventilation deep into the home,
                    complemented by a lily pond at the entrance that offers a tranquil threshold between the
                    city and the sanctuary within.
                  </p>
                  <p className="text-xs md:text-sm lg:text-base text-black leading-relaxed font-light">
                    Paanai Veedu, translating to "Pot House," is a multi-generational residence nestled in a
                    dense urban neighborhood of Chennai.
                  </p>
                  <p className="text-xs md:text-sm lg:text-base text-black leading-relaxed font-light">
                    Conceived as a home for three generations —
                    children, parents, and grandparents — the design is centered around fostering
                    intergenerational harmony through spatial layering, tactile materiality, and climatic
                    responsiveness.
                  </p>
                  
                  
                </div>
                
                {/* Scroll Indicator */}
                <div className="flex items-center gap-1 lg:gap-1 text-black ">
                    <span className="font-light leading-relaxed text-xs md:text-sm lg:text-base ">
                        SCROLL
                    </span>
                  <div className="bg-black w-4 sm:w-6 md:w-8 lg:w-12 h-px "></div>
                  <ArrowLeft className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 rotate-180 text-black" />
                </div>
              </div>
            )}
            
            {/* Mobile Layout */}
            {isMobile && (
              <>
                <div className="max-w-xs px-4 mb-6">
                  <p className="text-sm text-black leading-relaxed font-light text-center">
                    Chennai, India
                  </p>
                  <p className="text-sm text-black leading-relaxed font-light mt-3 text-center">
                    Completed in 2022
                  </p>
                  <p className="text-sm text-black leading-relaxed font-light mt-3 text-center">
                    Built-Up Area: 3850sqft
                  </p>
                  <p className="text-sm text-black leading-relaxed font-light mt-3 text-center">
                    At the heart of the home lies a central courtyard — a traditional gesture reinterpreted for modern living.
                  </p>
                   <p className="text-sm text-black leading-relaxed font-light text-center">
                    This void introduces natural light and ventilation deep into the home,
                    complemented by a lily pond at the entrance that offers a tranquil threshold between the
                    city and the sanctuary within.
                  </p>
                   <p className="text-sm text-black leading-relaxed font-light text-center">
                    Paanai Veedu, translating to "Pot House," is a multi-generational residence nestled in a
                    dense urban neighborhood of Chennai.
                  </p>
                   <p className="text-sm text-black leading-relaxed font-light text-center">
                    Conceived as a home for three generations —
                    children, parents, and grandparents — the design is centered around fostering
                    intergenerational harmony through spatial layering, tactile materiality, and climatic
                    responsiveness.
                  </p>
                </div>
                
                <div className="flex flex-col items-center gap-1 sm:gap-2 ">
                  <span className="font-medium tracking-[0.1em] sm:tracking-[0.15em] text-sm sm:text-base ">
                    SCROLL
                  </span>
                  <ArrowUp className="text-black w-4 h-4 sm:w-5 sm:h-5" />
                  <div className="bg-black w-px h-6 sm:h-8"></div>
                </div>
              </>
            )}
          </div>

          {/* Render content items */}
          {contentItems.map((item, index) => {
            if (item.type === 'paragraph') {
              return (
                <div
                  key={`paragraph-${item.index}`}
                  className={`
                    flex-shrink-0 relative transition-all duration-700 ease-in-out
                    ${getParagraphContainerSize()}
                    ${item.index === centerIndex ? 'z-10' : 'z-0'}
                    ${isMobile ? '' : 'mt-[5vh]'}
                  `}
                  style={!isMobile ? {
                    marginLeft: index === 0
                      ? 'clamp(55vw, 50vw, 60vw)'
                      : 'clamp(1rem, 2rem, 2rem)'
                  } : {}}
                >
                  <div className={`
                    h-full w-full flex items-center justify-center text-center transition-all duration-700 
                    ${getImageOpacity(item.index)}
                  `}>
                    <p className={`
                      text-black leading-relaxed font-light max-w-[90%]
                      ${isMobile 
                        ? 'text-sm' 
                        : 'text-sm md:text-base lg:text-lg'
                      }
                    `}>
                      {item.content}
                    </p>
                  </div>
                </div>
              );
            }

            if (item.type === 'image') {
              return (
                <div
                  key={item.project.id}
                  className={`
                    flex-shrink-0 relative group transition-all duration-700 ease-in-out
                    ${getContainerSize(item.index)}
                    ${item.index === centerIndex ? 'z-10' : 'z-0'}
                    ${isMobile ? '' : 'mt-[5vh]'}
                    ${isMobile && item.projectIndex === projects.length - 1 ? 'mb-[50px]' : ''}
                    ${isMobile && item.projectIndex === 0 ? 'mt-12' : ''}
                  `}
                  style={!isMobile ? {
                    marginLeft: index === 0 && item.type === 'image'
                      ? 'clamp(55vw, 50vw, 60vw)'
                      : 'clamp(1rem, 2rem, 2rem)'
                  } : {}}
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
                  onClick={handleNextClick}
                  className={`
                    flex-shrink-0 relative group cursor-pointer flex items-center justify-center transition-all duration-700 ease-in-out
                    ${getContainerSize(item.index)}
                    ${item.index === centerIndex ? 'z-10' : 'z-0'}
                    ${isMobile ? '' : 'mt-[5vh]'}
                    ${isMobile ? 'mb-[50px]' : ''}
                  `}
                  style={!isMobile ? {
                    marginLeft: 'clamp(1rem, 2rem, 2rem)'
                  } : {}}
                >
                  <div className={`h-full w-full relative flex items-center justify-center text-black transition-all duration-700 ${getImageOpacity(item.index)}`}>
                    <span className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-wider">
                      NEXT
                    </span>
                  </div>
                </div>
              );
            }

            if (item.type === 'project02-preview') {
              return (
                <div
                  key={`project02-preview-${item.project.id}`}
                  className={`
                    flex-shrink-0 relative group cursor-pointer transition-all duration-700 ease-in-out
                    ${getContainerSize(item.index)}
                    ${item.index === centerIndex ? 'z-10' : 'z-0'}
                    ${isMobile ? '' : 'mt-[5vh]'}
                    ${isMobile ? 'mb-[50px]' : ''}
                  `}
                  style={!isMobile ? {
                    marginLeft: 'clamp(1rem, 2rem, 2rem)'
                  } : {}}
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

export default Project01;