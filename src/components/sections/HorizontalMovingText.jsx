import { useState, useEffect } from 'react';

const HorizontalMovingText = ({ showOnlyOnHome = true, isHomePage = true }) => {
  const [translateX, setTranslateX] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTranslateX(prev => (prev - 3) % 2000);
    }, 16);

    return () => clearInterval(interval);
  }, []);

  if (showOnlyOnHome && !isHomePage) {
    return null;
  }

  const textContent = "STUDIO PRECHT — HI THERE! WE ARE A MULTIDISCIPLINARY DESIGN STUDIO — ";

  return (
    <>
      <div className="fixed left-0 w-full h-[60px] sm:h-[70px] md:h-[80px] lg:h-[90px] xl:h-[100px] overflow-hidden z-20 pointer-events-none border-b border-gray-800 bg-white top-[70px] md:top-[88px] lg:top-[95px] flex items-center justify-center">
        <div 
          className="absolute whitespace-nowrap select-none flex items-center h-full"
          style={{ 
            transform: `translateX(${translateX}px)`,
            width: 'max-content'
          }}
        >
          <div className="tracking-wider leading-none text-[28px] xs:text-[32px] sm:text-[40px] md:text-[50px] lg:text-[65px] xl:text-[75px] 2xl:text-[90px] font-medium" style={{ lineHeight: '0.8' }}>
            {textContent.repeat(20)}
          </div>
        </div>
      </div>
    </>
  );
};

export default HorizontalMovingText;