import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import HomepageImage from '../assests/images/homepage.jpg';

const HomePage: React.FC = () => {
  const [hearts, setHearts] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    delay: number;
  }>>([]);

  useEffect(() => {
    const addHeart = () => {
      const newHeart = {
        id: Date.now() + Math.random(),
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 20 + 15,
        delay: Math.random() * 0.5,
      };
      setHearts(prev => [...prev, newHeart]);
    };

    // Initial hearts
    for (let i = 0; i < 8; i++) {
      setTimeout(addHeart, i * 200);
    }

    // Continue adding hearts
    const interval = setInterval(addHeart, 2000);
    
    return () => clearInterval(interval);
  }, []);

  // Clean up old hearts
  useEffect(() => {
    const cleanup = setInterval(() => {
      setHearts(prev => prev.slice(-15));
    }, 8000);

    return () => clearInterval(cleanup);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      className="min-h-screen relative overflow-hidden"
      style={{ backgroundColor: '#FFE4E8' }}
    >
      {/* Animated Floating Hearts */}
      <div className="absolute inset-0 pointer-events-none">
        {hearts.map(heart => (
          <motion.div
            key={heart.id}
            initial={{ scale: 0, opacity: 0, rotate: 0 }}
            animate={{ 
              scale: [0, 1.2, 1],
              opacity: [0, 0.8, 0.6],
              y: [0, -20, 0],
              rotate: [0, 10, -10, 0]
            }}
            transition={{ 
              duration: 3,
              delay: heart.delay,
              ease: "easeOut",
              repeat: Infinity,
              repeatDelay: 2
            }}
            className="absolute text-pink-400"
            style={{
              left: `${heart.x}%`,
              top: `${heart.y}%`,
              fontSize: `${heart.size}px`,
            }}
          >
            💖
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-12 min-h-screen">
        <div className="flex flex-col lg:flex-row items-center justify-between h-full">
          {/* Left Content - 55% width */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="w-full lg:w-[55%] lg:pr-8 text-center lg:text-left order-2 lg:order-1"
          >
            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="text-4xl md:text-6xl font-serif text-transparent bg-gradient-to-r from-pink-600 via-purple-600 to-rose-600 bg-clip-text mb-6"
            >
              Happy Birthday, Mowaaaa!
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.9 }}
              className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8"
            >
             Happy birthday mowaaaa.....😂😂😂ekkada nunchi start cheyali oo ardam kavadam ledhuu....
             sare pakkana undi gaa aa photo thone start chedham ayithee....see that smile adhi eppudu 
             alane undedattu chusukooo.....that spark when you smile it's just awesome anthe don't loose it....
             when you smile your eyes shine like diamonds....that's what's most beautiful thing about you......
             The most beautiful girl I met.....Chalu lee ekkuva pogidesaaa😂😂😂.....Live life happily mowaa.....
             I hope all the things you wish will come true.....I know they will and when they come know that you are wroth every single one of them
             ...... Happiest birthday mowaa......Enjoy your day raa.....Oka chinna gift ee website naa nunchii....... Explore it raaa.......😊❤️
            </motion.p>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="space-y-4"
            >
              <p className="text-gray-600 italic">
                "Every moment with you is a gift worth celebrating"
              </p>
              <div className="flex justify-center lg:justify-start space-x-2">
                {['🎂', '🎉', '✨', '💕', '🌟'].map((emoji, index) => (
                  <motion.span
                    key={index}
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 10, -10, 0]
                    }}
                    transition={{
                      duration: 2,
                      delay: 1.5 + index * 0.2,
                      repeat: Infinity,
                      repeatDelay: 3
                    }}
                    className="text-2xl"
                  >
                    {emoji}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Photo - 45% width */}
          <motion.div
            initial={{ x: 50, opacity: 0, scale: 0.9 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="w-full lg:w-[45%] order-1 lg:order-2 mb-8 lg:mb-0"
          >
            <div className="relative">
              <motion.div
                animate={{ 
                  boxShadow: [
                    '0 0 30px rgba(255,182,193,0.4)',
                    '0 0 50px rgba(255,182,193,0.7)',
                    '0 0 30px rgba(255,182,193,0.4)',
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="relative rounded-2xl overflow-hidden border-4 border-white shadow-2xl mx-auto max-w-sm"
              >
                <img
                  src={HomepageImage}
                  alt="Beautiful portrait"
                  className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
                
                {/* Decorative overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-pink-200/20 to-transparent pointer-events-none" />
              </motion.div>
              
              {/* Floating decorative elements around photo */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -top-4 -right-4 text-3xl"
              >
                🌸
              </motion.div>
              
              <motion.div
                animate={{
                  y: [0, 10, 0],
                  rotate: [0, -5, 5, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
                className="absolute -bottom-4 -left-4 text-3xl"
              >
                🎀
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default HomePage;