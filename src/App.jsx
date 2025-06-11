import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';

// Fixed: Using relative imports instead of absolute imports
import Project01 from './projects/Project01';
import Project02 from './projects/Project02';
import Project03 from './projects/Project03';
import Project04 from './projects/Project04';
import Project05 from './projects/Project05';
// Import other project pages as needed...

import './styles/animations.css';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Main pages */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* Project detail pages */}
        <Route path="/project01" element={<Project01 />} />
        <Route path="/project02" element={<Project02 />} />
        <Route path="/project03" element={<Project03 />} />
        <Route path="/project04" element={<Project04 />} />
        <Route path="/project05" element={<Project05 />} />
        {/* Add more project routes here */}
      </Routes>
    </Router>
  );
};

export default App;