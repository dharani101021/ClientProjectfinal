import React from 'react';

const Project05Text = ({ showOnlyOnHome = true, isHomePage = true }) => {
  if (showOnlyOnHome && !isHomePage) return null;

  const textContent = "AN ARTIST STUDIO";

  return (
    <div className="fixed left-0 w-full overflow-hidden z-20 pointer-events-none border-b border-gray-800 bg-white top-[85px] md:top-[100px] lg:top-[100px] flex items-center" 
         style={{ paddingTop: '18px', paddingBottom: '5px' }}>
      <div className="flex items-center" style={{ marginLeft: '116px' }}>
        <div 
          className="tracking-wider text-[28px] xs:text-[32px] sm:text-[40px] md:text-[50px] lg:text-[35px] xl:text-[35px] 2xl:text-[35px] font-medium flex items-center" 
          style={{ 
            lineHeight: '1',
            margin: '0',
            padding: '0'
          }}
        >
          {textContent}
        </div>
      </div>
    </div>
  );
};

export default Project05Text;