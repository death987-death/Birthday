import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';

const MoonsThroughYears: React.FC = () => {

  // Lunar phases data from 2003 to 2025
  const moonData = [
    { year: 2003, phase: "Waxing Gibbous Moon", image: "https://lunaf.com/img/moon/m-phase-12.webp", caption: "The Moon is Growing as you were being born...😊" },
    { year: 2004, phase: "Waning Crescent Moon", image: "https://lunaf.com/img/moon/m-phase-25.webp", caption: "Growing dreams and aspirations" },
    { year: 2005, phase: "Waxing Crescent Moon", image: "https://lunaf.com/img/moon/m-phase-4.webp", caption: "Half way to something beautiful" },
    { year: 2006, phase: "Full Moon", image: "https://lunaf.com/img/moon/m-phase-15.webp", caption: "Almost there, building momentum" },
    { year: 2007, phase: "Waning Crescent Moon", image: "https://lunaf.com/img/moon/m-phase-27.webp", caption: "Bright and full of possibilities" },
    { year: 2008, phase: "First Quarter Moon", image: "https://lunaf.com/img/moon/m-phase-8.webp", caption: "Wisdom gained, moving forward" },
    { year: 2009, phase: "Waning Gibbous Moon", image: "https://lunaf.com/img/moon/m-phase-19.webp", caption: "Reflection and new beginnings" },
    { year: 2010, phase: "Waning Crescent Moon", image: "https://lunaf.com/img/moon/m-phase-30.webp", caption: "Gentle transitions and growth" },
    { year: 2011, phase: "Waxing Gibbous Moon", image: "https://lunaf.com/img/moon/m-phase-11.webp", caption: "Fresh starts and new adventures" },
    { year: 2012, phase: "Last Quarter Moon", image: "https://lunaf.com/img/moon/m-phase-23.webp", caption: "Building beautiful memories" },
    { year: 2013, phase: "Waxing Crescent Moon", image: "https://lunaf.com/img/moon/m-phase-2.webp", caption: "Halfway through amazing years" },
    { year: 2014, phase: "Waxing Gibbous Moon", image: "https://lunaf.com/img/moon/m-phase-14.webp", caption: "Growing stronger together" },
    { year: 2015, phase: "Waning Crescent Moon", image: "https://lunaf.com/img/moon/phase-26.webp", caption: "Illuminated by friendship" },
    { year: 2016, phase: "Waxing Crescent Moon", image: "https://lunaf.com/img/moon/m-phase-7.webp", caption: "Sharing light with the world" },
    { year: 2017, phase: "Waning Gibbous Moon", image: "https://lunaf.com/img/moon/m-phase-17.webp", caption: "Learning and evolving" },
    { year: 2018, phase: "Waning Crescent Moon", image: "https://lunaf.com/img/moon/m-phase-29.webp", caption: "Gentle moments of peace" },
    { year: 2019, phase: "First Quarter Moon", image: "https://lunaf.com/img/moon/m-phase-9.webp", caption: "New chapters beginning" },
    { year: 2020, phase: "Waning Gibbous Moon", image: "https://lunaf.com/img/moon/m-phase-22.webp", caption: "The year we met - under gentle moonlight" },
    { year: 2021, phase: "New Moon", image: "https://lunaf.com/img/moon/m-phase-0.webp", caption: "Growing closer, building trust" },
    { year: 2022, phase: "Waxing Gibbous Moon", image: "https://lunaf.com/img/moon/m-phase-12.webp", caption: "Full of adventures and laughter" },
    { year: 2023, phase: "Last Quarter Moon", image: "https://lunaf.com/img/moon/h-phase-24.png", caption: "Bright memories under starlit skies" },
    { year: 2024, phase: "Waxing Crescent Moon", image: "https://lunaf.com/img/moon/m-phase-5.webp", caption: "This year - celebrating you!" },
    { year: 2025, phase: "Full Moon", image: "https://lunaf.com/img/moon/m-phase-16.webp", caption: "Looking forward to more beautiful years" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden"
    >
      {/* Stars Background */}
      <div className="absolute inset-0">
        {Array.from({ length: 100 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-5xl font-serif text-white text-center mb-4"
        >
          Moons Through the Years
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-white/80 mb-16 text-lg flex items-center justify-center"
        >
          <Calendar className="mr-2" size={20} />
          Lunar phases from 2003 to 2025 - A journey through time
        </motion.p>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {moonData.map((moon, index) => (
            <motion.div
              key={moon.year}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                ease: "easeOut"
              }}
              className="relative group cursor-pointer"
              onClick={() => {}}
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-white/40 transition-all duration-300 hover:transform hover:scale-105">
                {/* Year Badge */}
                <div className="absolute -top-3 -right-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-3 py-1 rounded-full font-bold text-sm shadow-lg">
                  {moon.year}
                </div>

                {/* Moon Image */}
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 1 }}
                  className="relative mb-4"
                >
                  <motion.div
                    animate={{ 
                      boxShadow: [
                        '0 0 20px rgba(255,255,255,0.3)',
                        '0 0 40px rgba(255,255,255,0.6)',
                        '0 0 20px rgba(255,255,255,0.3)',
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="w-32 h-32 mx-auto rounded-full overflow-hidden border-2 border-white/50"
                  >
                    <img
                      src={moon.image}
                      alt={`Moon ${moon.year} - ${moon.phase}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </motion.div>
                </motion.div>

                {/* Phase Name */}
                <h3 className="text-white font-semibold text-center mb-2">
                  {moon.phase}
                </h3>

                {/* Caption - shown on selection */}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="text-center mt-12"
        >
          <p className="text-white/60 text-sm">
            Ela ayithe different years same date loone....moon ee different phases loo undi..life loo kuuda alane untundhi mowaa dont loose 
            your hope....we are humans we make mistakes we go through different phases that's what life is....So live life happily mowaaaa dont just live it FEEL it...
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MoonsThroughYears;