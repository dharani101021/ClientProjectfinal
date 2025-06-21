import React from 'react';

const HorizontalMovingText = ({ showOnlyOnHome = true, isHomePage = true }) => {
  if (showOnlyOnHome && !isHomePage) return null;

  const textContent = "A NEST FOR ARCHITECTURE, IMAGINATION, AND MAKING — KOODU ARCHITECTURE — ";

  return (
    <div className="fixed left-0 w-full overflow-hidden z-20 pointer-events-none border-b border-gray-800 bg-white top-[85px] md:top-[100px] lg:top-[100px] flex items-center justify-center" 
         style={{ paddingTop: '18px', paddingBottom: '5px' }}>
      <div className="flex items-center whitespace-nowrap animate-marquee">
        <div 
          className="tracking-wider text-[28px] xs:text-[32px] sm:text-[40px] md:text-[50px] lg:text-[35px] xl:text-[35px] 2xl:text-[35px] font-medium flex items-center" 
          style={{ 
            lineHeight: '1',
            margin: '0',
            padding: '0'
          }}
        >
          {textContent.repeat(20)}
        </div>
      </div>
    </div>
  );
};

export default HorizontalMovingText;