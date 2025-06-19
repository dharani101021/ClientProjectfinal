const HorizontalMovingText = ({ showOnlyOnHome = true, isHomePage = true }) => {
  if (showOnlyOnHome && !isHomePage) return null;

  const textContent = "KOODU ARCHITECTURE — HI THERE! WE ARE A MULTIDISCIPLINARY DESIGN STUDIO — ";

  return (
    <div className="fixed left-0 w-full h-[60px] sm:h-[70px] md:h-[80px] lg:h-[90px] xl:h-[100px] overflow-hidden z-20 pointer-events-none border-b border-gray-800 bg-white top-[90px] md:top-[88px] lg:top-[110px] flex items-center justify-center">
      <div className="flex items-center h-full whitespace-nowrap animate-marquee">
        <div className="mt-1 tracking-wider leading-none text-[28px] xs:text-[32px] sm:text-[40px] md:text-[50px] lg:text-[65px] xl:text-[75px] 2xl:text-[90px] font-medium flex items-center">
          {textContent.repeat(20)}
        </div>
      </div>
    </div>
  );
};

export default HorizontalMovingText;
