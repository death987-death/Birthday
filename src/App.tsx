import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import CountdownSplash from './components/CountdownSplash';
import Navigation from './components/Navigation';
import HomePage from './components/HomePage';
import MoonsThroughYears from './components/MoonsThroughYears';
import WishUponStar from './components/WishUponStar';
import GunturMap from './components/GunturMap';
import FlowerMessages from './components/FlowerMessages';
import StarlitName from './components/StarlitName';
import HerSongs from './components/HerSongs';
import Sky from './components/Sky';
import Photos from './components/Photos';
import TimeTracker from './components/TimeTracker';

function App() {
  const [showCountdown, setShowCountdown] = useState(true);
  const [navigationOpen, setNavigationOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCountdown(false);
    }, 11000); // 5s countdown + 0.5s + 1.5s balloon + 0.5s pause + 2s pop + 1.2s sparkles + 1.5s fade
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 overflow-hidden">
        <AnimatePresence>
          {showCountdown && <CountdownSplash />}
        </AnimatePresence>
        
        <Navigation 
          isOpen={navigationOpen} 
          setIsOpen={setNavigationOpen} 
        />
        
        <main className={`transition-all duration-300 ${navigationOpen ? 'md:ml-64' : 'md:ml-16'}`}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/moons" element={<MoonsThroughYears />} />
            <Route path="/wish" element={<WishUponStar />} />
            <Route path="/map" element={<GunturMap />} />
            <Route path="/flowers" element={<FlowerMessages />} />
            <Route path="/starlit" element={<StarlitName />} />
            <Route path="/songs" element={<HerSongs />} />
            <Route path="/sky" element={<Sky />} />
            <Route path="/photos" element={<Photos />} />
            <Route path="/time" element={<TimeTracker />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;