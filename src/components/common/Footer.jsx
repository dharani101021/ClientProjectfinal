import { Instagram } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Function to handle contact button click
  const handleContactClick = () => {
    navigate('/contact');
  };

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-black">
      <div className="flex flex-col md:flex-row justify-between items-center px-4 md:px-12 py-4 md:py-6 gap-3 md:gap-0">
        {/* KOODU ARCHITECTURE - centered on mobile, left on desktop */}
        <div className="flex justify-center md:justify-start w-full md:w-[40%]">
          <button
            onClick={() => navigate('/')}
            className={`text-sm md:text-xl font-medium tracking-wider hover:text-gray-600 transition-colors ml-0 md:ml-[10%] cursor-pointer ${
              location.pathname === '/' ? 'text-black font-bold' : 'text-gray-800'
            }`}
          >
            © 2025. KOODU ARCHITECTURE.
          </button>
        </div>

        {/* Instagram - hidden on mobile, shown on desktop */}
        <div className="hidden md:flex justify-center w-full md:w-[20%]">
          <button className="text-sm md:text-xl font-medium tracking-wider hover:text-gray-600 transition-colors flex items-center gap-2 cursor-pointer text-gray-800">
            <Instagram className="w-5 h-5" />
            INSTAGRAM
          </button>
        </div>

        {/* Contact button - hidden on mobile, shown on desktop */}
        <div className="hidden md:flex justify-center md:justify-end w-full md:w-[40%]">
          <button
            onClick={handleContactClick}
            className={`text-sm md:text-xl tracking-wider hover:text-gray-600 transition-colors cursor-pointer mr-0 md:mr-[10%] ${
              location.pathname === '/contact'
                ? 'text-black font-extrabold'
                : 'text-gray-800 font-medium'
            }`}
          >
            CONTACT
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
