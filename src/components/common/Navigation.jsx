import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import HorizontalMovingText from '../sections/HorizontalMovingText';
import logo from '@/assets/logo.png';

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
          <div className="flex justify-start" style={{ width: '40%' }}>
            <button onClick={() => navigate('/')} className="ml-[5%] lg:ml-[10%]">
              <img src={logo} alt="Studio Precht" className="h-12 lg:h-18" />
            </button>
          </div>
          <div className="flex justify-center" style={{ width: '20%' }}>
            <button
              onClick={() => navigate('/')}
              className={`text-lg lg:text-xl tracking-wider hover:text-gray-600 transition-colors ${
                location.pathname === '/' ? 'text-black' : 'text-gray-800'
              }`}
            >
              PROJECTS 01-05
            </button>
          </div>
          <div className="flex justify-end" style={{ width: '40%' }}>
            <button
              onClick={() => navigate('/about')}
              className={`text-lg lg:text-xl tracking-wider hover:text-gray-600 transition-colors mr-[5%] lg:mr-[10%] ${
                location.pathname === '/about' ? 'text-black' : 'text-gray-800'
              }`}
            >
              ABOUT
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex justify-between items-center px-4 py-4" style={fontStyle}>
          <button onClick={() => navigate('/')} className="text-lg">
            <img src={logo} alt="Studio Precht" className="h-8" />
          </button>
          <button onClick={toggleMobileMenu} className="p-2">
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg" style={fontStyle}>
            <div className="flex flex-col py-4">
              <button
                onClick={() => handleNavigation('/')}
                className={`px-6 py-4 text-lg tracking-wider text-left hover:bg-gray-50 transition-colors ${
                  location.pathname === '/' ? 'text-black bg-gray-50' : 'text-gray-800'
                }`}
              >
                PROJECTS 01-05
              </button>
              <button
                onClick={() => handleNavigation('/about')}
                className={`px-6 py-4 text-lg tracking-wider text-left hover:bg-gray-50 transition-colors ${
                  location.pathname === '/about' ? 'text-black bg-gray-50' : 'text-gray-800'
                }`}
              >
                ABOUT
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Moving Text Under Navigation */}
      <HorizontalMovingText />
    </>
  );
};

export default Navigation;
