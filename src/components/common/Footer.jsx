import { Instagram } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
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
          {/* Mobile view with Instagram icon and WhatsApp icon */}
          <div className="flex md:hidden items-center gap-3">
            <button className="text-black hover:text-gray-600 transition-colors">
              <Instagram className="w-5 h-5" />
            </button>
            <button
              onClick={() => navigate('/')}
              className={`text-sm font-medium tracking-wider hover:text-gray-600 transition-colors cursor-pointer ${
                location.pathname === '/' ? 'font-bold' : 'text-gray-800'
              }`}
              style={location.pathname === '/' ? { color: '#58351c' } : {}}
            >
              © 2025. KOODU ARCHITECTURE
            </button>
            <button className="text-black hover:text-gray-600 transition-colors">
              <FaWhatsapp className="w-5 h-5" />
            </button>
          </div>
          
          {/* Desktop view without Instagram icon */}
          <button
            onClick={() => navigate('/')}
            className={`hidden md:block text-xl font-medium tracking-wider hover:text-gray-600 transition-colors ml-[10%] cursor-pointer ${
              location.pathname === '/' ? 'font-bold' : 'text-gray-800'
            }`}
            style={location.pathname === '/' ? { color: '#58351c' } : {}}
          >
            © 2025. KOODU ARCHITECTURE
          </button>
        </div>

        {/* Instagram - hidden on mobile, shown on desktop */}
        <div className="hidden md:flex justify-center w-full md:w-[20%]">
          <button className="text-sm md:text-xl font-medium tracking-wider hover:text-gray-600 transition-colors flex items-center gap-2 cursor-pointer text-gray-800">
            <Instagram className="w-5 h-5" />
            INSTAGRAM
          </button>
        </div>

        {/* Contact button and WhatsApp - hidden on mobile, shown on desktop */}
        <div className="hidden md:flex justify-center md:justify-end items-center w-full md:w-[40%]">
          <button
            onClick={handleContactClick}
            className={`text-sm md:text-xl tracking-wider hover:text-gray-600 transition-colors cursor-pointer ${
              location.pathname === '/contact'
                ? 'font-extrabold'
                : 'text-gray-800 font-medium'
            }`}
            style={location.pathname === '/contact' ? { color: '#58351c' } : {}}
          >
            CONTACT
          </button>
          <button className="text-black hover:text-gray-600 transition-colors mr-0 md:mr-[10%] ml-6">
            <FaWhatsapp className="w-7 h-7" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;