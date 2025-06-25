import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
// import HorizontalMovingText from '../sections/HorizontalMovingText';
import logo from '@/assets/logo.svg';

const fontStyle = { fontFamily: 'BwGradual-Medium' };

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(open => !open);

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-800">
        {/* Desktop Navigation */}
        <div className="hidden md:flex justify-between items-center px-6 lg:px-12 py-4 lg:py-6" style={fontStyle}>
          <div className="flex justify-start items-center" style={{ width: '40%' }}>
            <button onClick={() => navigate('/')} className="ml-[5%] lg:ml-[10%] flex items-center gap-4 cursor-pointer">
              <img src={logo} alt="KOODU ARCHITECTURE" className="h-16 w-40" />
              {/* <span className="text-lg lg:text-xl tracking-wider text-gray-800">
                KOODU ARCHITECTURE
              </span> */}
            </button>
          </div>
          <div className="flex justify-center" style={{ width: '20%' }}>
            <button
              onClick={() => navigate('/')}
              className={`text-lg lg:text-xl tracking-wider hover:text-gray-600 transition-colors cursor-pointer ${
                location.pathname === '/' ? 'font-bold' : 'text-gray-800'
              }`}
              style={location.pathname === '/' ? { color: '#58351c' } : {}}
            >
              PROJECTS 01-05
            </button>
          </div>
          <div className="flex justify-end" style={{ width: '40%' }}>
            <button
              onClick={() => navigate('/about')}
              className={`text-lg lg:text-xl tracking-wider hover:text-gray-600 transition-colors mr-[5%] lg:mr-[20%] cursor-pointer ${
                location.pathname === '/about' ? 'font-bold' : 'text-gray-800'
              }`}
              style={location.pathname === '/about' ? { color: '#58351c' } : {}}
            >
              ABOUT
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex justify-between items-center px-4 py-4" style={fontStyle}>
          <button onClick={() => navigate('/')} className="text-lg flex items-center gap-2 cursor-pointer">
            <img src={logo} alt="KOODU ARCHITECTURE" className="h-16 w-40" />
            {/* <span className="text-sm tracking-wider text-gray-800">
              KOODU ARCHITECTURE
            </span> */}
          </button>
          <button onClick={toggleMobileMenu} className="p-2 cursor-pointer">
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg" style={fontStyle}>
            <div className="flex flex-col py-4">
              <button
                onClick={() => handleNavigation('/')}
                className={`px-6 py-4 text-lg tracking-wider text-left hover:bg-gray-50 transition-colors cursor-pointer ${
                  location.pathname === '/' ? 'bg-gray-50 font-bold' : 'text-gray-800'
                }`}
                style={location.pathname === '/' ? { color: '#58351c' } : {}}
              >
                PROJECTS 01-05
              </button>
              <button
                onClick={() => handleNavigation('/about')}
                className={`px-6 py-4 text-lg tracking-wider text-left hover:bg-gray-50 transition-colors cursor-pointer ${
                  location.pathname === '/about' ? 'bg-gray-50 font-bold' : 'text-gray-800'
                }`}
                style={location.pathname === '/about' ? { color: '#58351c' } : {}}
              >
                ABOUT
              </button>
              <button
                onClick={() => handleNavigation('/contact')}
                className={`px-6 py-4 text-lg tracking-wider text-left hover:bg-gray-50 transition-colors cursor-pointer ${
                  location.pathname === '/contact' ? 'bg-gray-50 font-bold' : 'text-gray-800'
                }`}
                style={location.pathname === '/contact' ? { color: '#58351c' } : {}}
              >
                CONTACT
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Moving Text Under Navigation */}
      {/* <HorizontalMovingText /> */}
    </>
  );
};

export default Navigation;