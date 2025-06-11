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
      <div className="fixed left-0 w-full h-[100px] overflow-hidden z-20 pointer-events-none border-b border-gray-800 bg-white top-[88px] md:top-[108px] lg:top-[95px]">
        <div 
          className="absolute whitespace-nowrap select-none flex items-center h-full"
          style={{ 
            transform: `translateX(${translateX}px)`,
            width: 'max-content'
          }}
        >
          <div 
            className="tracking-wider leading-none"
            style={{ fontSize: '90px' }}
          >
            {textContent.repeat(20)}
          </div>
        </div>
      </div>
    </>
  );
};

export default HorizontalMovingText;