import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

import Navigation from '../components/common/Navigation';
import HorizontalMovingText from '../components/sections/HorizontalMovingText';
import HeroSection from '../components/sections/HeroSection';
import Footer from '../components/common/Footer';
// import WhatsAppButton from '../components/common/WhatsAppButton';



const Home = () => {
  const [currentSection, setCurrentSection] = useState('hero');

  const navigateToProjects = () => {
    // Projects section removed - no navigation
    console.log('Projects section not implemented');
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowRight') {
        navigateToProjects();
      } else if (e.key === 'ArrowLeft' && currentSection === 'projects') {
        setCurrentSection('hero');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentSection]);

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <Navigation />
      <HorizontalMovingText />
      
      <main className="relative w-full h-screen overflow-hidden">
        <div className="flex h-full">
          <HeroSection isVisible={currentSection === 'hero'} />
        </div>
      </main>
      
      <Footer />
      {/* <WhatsAppButton /> */}
    </div>
  );
};

export default Home;