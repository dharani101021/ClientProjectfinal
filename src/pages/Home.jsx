
import { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';

import Navigation from '../components/common/Navigation';
import HorizontalMovingText from '../components/sections/HorizontalMovingText';
import HeroSection from '../components/sections/HeroSection';
// import ProjectsSection from '../components/sections/ProjectsSection';
import Footer from '../components/common/Footer';
// import WhatsAppButton from '../components/common/WhatsAppButton';

const Home = () => {
  const [currentSection, setCurrentSection] = useState('hero');

  const navigateToProjects = () => {
    setCurrentSection('projects');
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
    <div className="min-h-screen bg-white overflow-hidden ">
      <Navigation />
      <HorizontalMovingText />
    

      <main className="relative w-full h-screen overflow-hidden ">
        <div className="flex h-full">
          <HeroSection isVisible={currentSection === 'hero'} />
        </div>
      </main>

      {currentSection === 'projects' && (
        <div className="fixed bottom-8 right-8 z-50">
          <button
            onClick={() => setCurrentSection('hero')}
            className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-colors shadow-lg"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        </div>
      )}

      <Footer />
      {/* <WhatsAppButton /> */}
    </div>
  );
};

export default Home;
