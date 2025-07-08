import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CountdownSplash: React.FC = () => {
  const [count, setCount] = useState(5);
  const [showBalloon, setShowBalloon] = useState(false);
  const [balloonPopped, setBalloonPopped] = useState(false);
  const [showSparkles, setShowSparkles] = useState(false);
  const [startFadeOut, setStartFadeOut] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          // After showing "1", start balloon animation
          setTimeout(() => {
            setShowBalloon(true);
          }, 500);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Balloon animation sequence
  useEffect(() => {
    if (showBalloon) {
      // Balloon floats up for 1.5s, pauses for 0.5s, then pops
      const popTimer = setTimeout(() => {
        setBalloonPopped(true);
        setShowSparkles(true);
      }, 2000); // 1.5s float + 0.5s pause

      return () => clearTimeout(popTimer);
    }
  }, [showBalloon]);

  // Sparkles fade and transition to homepage
  useEffect(() => {
    if (showSparkles) {
      // After sparkles animation (1.2s), start fade out
      const fadeTimer = setTimeout(() => {
        setStartFadeOut(true);
      }, 1200);

      return () => clearTimeout(fadeTimer);
    }
  }, [showSparkles]);

  // Generate static stars that don't change
  const stars = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    opacity: Math.random() * 0.5 + 0.5,
    animationDelay: Math.random() * 2,
  }));

  // Generate static planets that don't change
  const planets = Array.from({ length: 3 }, (_, i) => ({
    id: i,
    x: [20, 70, 85][i],
    y: [15, 60, 25][i],
    size: [60, 40, 50][i],
    color: ['#FFB6C1', '#DDA0DD', '#87CEEB'][i],
  }));

  // Generate sparkles for burst effect
  const sparkles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    angle: (i * 360) / 40,
    distance: Math.random() * 200 + 100,
    size: Math.random() * 6 + 3,
    color: ['#FFD700', '#FFFFFF', '#FFB6C1', '#DDA0DD', '#87CEEB'][Math.floor(Math.random() * 5)],
    delay: Math.random() * 0.3,
  }));

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: startFadeOut ? 0 : 1 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
      className="fixed inset-0 z-50 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900"
    >
      {/* Static Nebula Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-800/20 via-pink-800/20 to-blue-800/20" />
      
      {/* Static Stars */}
      {stars.map(star => (
        <motion.div
          key={star.id}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
          }}
          animate={{
            opacity: [star.opacity, star.opacity * 0.3, star.opacity],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: star.animationDelay,
          }}
        />
      ))}

      {/* Static Planets */}
      {planets.map(planet => (
        <motion.div
          key={planet.id}
          className="absolute rounded-full opacity-30"
          style={{
            left: `${planet.x}%`,
            top: `${planet.y}%`,
            width: `${planet.size}px`,
            height: `${planet.size}px`,
            background: `radial-gradient(circle at 30% 30%, ${planet.color}, ${planet.color}99)`,
            boxShadow: `0 0 20px ${planet.color}66`,
          }}
          animate={{
            x: [0, 10, 0],
            y: [0, -5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Countdown Numbers */}
      <div className="absolute inset-0 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {count > 0 && (
            <motion.div
              key={count}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.5 }}
              transition={{ duration: 0.5 }}
              className="text-white text-9xl font-bold text-center"
              style={{
                textShadow: '0 0 40px rgba(255,255,255,0.8), 0 0 80px rgba(255,255,255,0.4)',
              }}
            >
              {count}
            </motion.div>
          )}
          {count === 0 && !showBalloon && (
            <motion.div
              key="one"
              initial={{ opacity: 1, scale: 1 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-white text-9xl font-bold text-center"
              style={{
                textShadow: '0 0 40px rgba(255,255,255,0.8), 0 0 80px rgba(255,255,255,0.4)',
              }}
            >
              1
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Balloon Animation */}
      <AnimatePresence>
        {showBalloon && !balloonPopped && (
          <motion.div
            initial={{ 
              y: '100vh',
              x: '50vw',
              scale: 0.8,
              opacity: 0
            }}
            animate={{ 
              y: '50vh',
              x: '50vw',
              scale: [0.8, 1.1, 1],
              opacity: 1
            }}
            transition={{
              duration: 1.5,
              ease: "easeOut",
              scale: {
                times: [0, 0.8, 1],
                duration: 2
              }
            }}
            className="fixed transform -translate-x-1/2 -translate-y-1/2 z-40"
          >
            {/* Balloon */}
            <div className="relative">
              {/* Balloon body */}
              <motion.div
                animate={{
                  scale: balloonPopped ? [1, 1.3, 0] : [1, 1.05, 1],
                }}
                transition={{
                  duration: balloonPopped ? 0.3 : 2,
                  repeat: balloonPopped ? 0 : Infinity,
                  ease: balloonPopped ? "easeOut" : "easeInOut"
                }}
                className="w-32 h-40 rounded-full relative"
                style={{
                  background: 'radial-gradient(ellipse at 30% 20%, #FFB6C1, #FF69B4, #FF1493)',
                  boxShadow: '0 0 30px rgba(255,182,193,0.6), inset -10px -10px 20px rgba(255,255,255,0.3)',
                  opacity: 0.9
                }}
              >
                {/* Balloon highlight */}
                <div 
                  className="absolute top-4 left-6 w-8 h-12 rounded-full opacity-40"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.8), transparent)'
                  }}
                />
              </motion.div>
              
              {/* Balloon string */}
              <motion.div
                animate={{
                  scaleY: balloonPopped ? 0 : 1,
                }}
                transition={{ duration: 0.3 }}
                className="absolute top-full left-1/2 transform -translate-x-1/2 w-0.5 h-20 bg-gradient-to-b from-gray-400 to-gray-600 origin-top"
              />
              
              {/* Curly ribbon at bottom */}
              <motion.div
                animate={{
                  opacity: balloonPopped ? 0 : 1,
                  scale: balloonPopped ? 0 : 1,
                }}
                transition={{ duration: 0.3 }}
                className="absolute top-full left-1/2 transform -translate-x-1/2 translate-y-20 text-2xl"
              >
                🎀
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sparkles Burst Effect */}
      <AnimatePresence>
        {showSparkles && (
          <div className="fixed inset-0 pointer-events-none z-50">
            {sparkles.map(sparkle => {
              const x = Math.cos((sparkle.angle * Math.PI) / 180) * sparkle.distance;
              const y = Math.sin((sparkle.angle * Math.PI) / 180) * sparkle.distance;
              
              return (
                <motion.div
                  key={sparkle.id}
                  initial={{
                    x: '50vw',
                    y: '50vh',
                    scale: 0,
                    opacity: 1,
                  }}
                  animate={{
                    x: `calc(50vw + ${x}px)`,
                    y: `calc(50vh + ${y}px)`,
                    scale: [0, 1.5, 0],
                    opacity: [1, 1, 0],
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 1.2,
                    delay: sparkle.delay,
                    ease: "easeOut",
                  }}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2"
                >
                  <div
                    className="rounded-full"
                    style={{
                      width: `${sparkle.size}px`,
                      height: `${sparkle.size}px`,
                      backgroundColor: sparkle.color,
                      boxShadow: `0 0 ${sparkle.size * 2}px ${sparkle.color}`,
                    }}
                  />
                </motion.div>
              );
            })}
            
            {/* Additional confetti pieces */}
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={`confetti-${i}`}
                initial={{
                  x: '50vw',
                  y: '50vh',
                  scale: 0,
                  opacity: 1,
                }}
                animate={{
                  x: `calc(50vw + ${(Math.random() - 0.5) * 400}px)`,
                  y: `calc(50vh + ${(Math.random() - 0.5) * 400}px)`,
                  scale: [0, 1, 0.5],
                  opacity: [1, 1, 0],
                  rotate: [0, Math.random() * 720],
                }}
                transition={{
                  duration: 1.2,
                  delay: Math.random() * 0.3,
                  ease: "easeOut",
                }}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 text-lg"
              >
                {['🎉', '✨', '🌟', '💖', '🎊'][Math.floor(Math.random() * 5)]}
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CountdownSplash;