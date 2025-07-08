import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X } from 'lucide-react';

interface Star {
  id: number;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  size: number;
  brightness: number;
  color: string;
  hasFormed: boolean;
  velocity: { x: number; y: number };
  delay: number;
  isLetterStar: boolean;
}

const StarlitName: React.FC = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [stars, setStars] = useState<Star[]>([]);
  const [backgroundStars, setBackgroundStars] = useState<Star[]>([]);
  const [animationPhase, setAnimationPhase] = useState<'gathering' | 'formed'>('gathering');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  const name = "SADIYA";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      ctx.scale(dpr, dpr);
      
      setTimeout(() => {
        initializeStars();
        initializeBackgroundStars();
      }, 100);
    };

    // Create letter path points for the name
    const createLetterPoints = () => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const points: { x: number; y: number }[] = [];

      const baseFontSize = Math.min(window.innerWidth / 8, window.innerHeight / 6, 140);
      const fontSize = Math.max(baseFontSize, 70);

      ctx.font = `bold ${fontSize}px "Playfair Display", Georgia, serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      const metrics = ctx.measureText(name);
      const textWidth = metrics.width;
      const textHeight = fontSize;

      const tempCanvas = document.createElement('canvas');
      const tempCtx = tempCanvas.getContext('2d');
      if (!tempCtx) return points;

      const padding = 100;
      tempCanvas.width = Math.ceil(textWidth + padding);
      tempCanvas.height = Math.ceil(textHeight + padding);
      
      tempCtx.font = `bold ${fontSize}px "Playfair Display", Georgia, serif`;
      tempCtx.textAlign = 'center';
      tempCtx.textBaseline = 'middle';
      tempCtx.fillStyle = 'white';
      
      tempCtx.fillText(name, tempCanvas.width / 2, tempCanvas.height / 2);

      const imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
      const pixels = imageData.data;

      const step = 2; // Smaller step for denser letter formation
      for (let y = 0; y < tempCanvas.height; y += step) {
        for (let x = 0; x < tempCanvas.width; x += step) {
          const index = (y * tempCanvas.width + x) * 4;
          const alpha = pixels[index + 3];
          
          if (alpha > 100) {
            const finalX = centerX - tempCanvas.width / 2 + x;
            const finalY = centerY - tempCanvas.height / 2 + y;
            
            const jitterX = (Math.random() - 0.5) * 2;
            const jitterY = (Math.random() - 0.5) * 2;
            
            points.push({
              x: finalX + jitterX,
              y: finalY + jitterY,
            });
          }
        }
      }

      return points;
    };

    // Initialize background stars (separate from letter stars)
    const initializeBackgroundStars = () => {
      const letterPoints = createLetterPoints();
      const exclusionZones = letterPoints.map(point => ({
        x: point.x,
        y: point.y,
        radius: 40 // Minimum distance from letters
      }));

      const bgStars: Star[] = [];
      const numBgStars = 120;

      for (let i = 0; i < numBgStars; i++) {
        let x=0, y=0;
        let attempts = 0;
        
        // Try to place star away from letter zones
        do {
          x = Math.random() * window.innerWidth;
          y = Math.random() * window.innerHeight;
          attempts++;
        } while (
          attempts < 50 && 
          exclusionZones.some(zone => {
            const distance = Math.sqrt((x - zone.x) ** 2 + (y - zone.y) ** 2);
            return distance < zone.radius;
          })
        );

        bgStars.push({
          id: i + 1000, // Different ID range
          x,
          y,
          targetX: x,
          targetY: y,
          size: Math.random() * 1.5 + 0.5, // Smaller than letter stars
          brightness: Math.random() * 0.2 + 0.15, // Reduced from 0.3 + 0.2
          color: '#FFFFFF',
          hasFormed: true,
          velocity: { x: 0, y: 0 },
          delay: Math.random() * 5,
          isLetterStar: false,
        });
      }

      setBackgroundStars(bgStars);
    };

    // Initialize letter-forming stars
    const initializeStars = () => {
      const letterPoints = createLetterPoints();
      
      if (letterPoints.length === 0) {
        setTimeout(initializeStars, 500);
        return;
      }

      const maxStars = Math.min(letterPoints.length, 200);
      const selectedPoints = [];
      
      if (letterPoints.length <= maxStars) {
        selectedPoints.push(...letterPoints);
      } else {
        const step = letterPoints.length / maxStars;
        for (let i = 0; i < letterPoints.length; i += step) {
          selectedPoints.push(letterPoints[Math.floor(i)]);
        }
      }

      // Bright, distinct colors for letter stars
      const letterColors = ['#FFD700', '#FFFF00', '#FFF8DC', '#FFFACD'];

      const newStars: Star[] = selectedPoints.map((point, index) => {
        // Random starting position from edges
        const side = Math.floor(Math.random() * 4);
        let startX, startY;
        
        switch (side) {
          case 0: // Top
            startX = Math.random() * window.innerWidth;
            startY = -150;
            break;
          case 1: // Right
            startX = window.innerWidth + 150;
            startY = Math.random() * window.innerHeight;
            break;
          case 2: // Bottom
            startX = Math.random() * window.innerWidth;
            startY = window.innerHeight + 150;
            break;
          default: // Left
            startX = -150;
            startY = Math.random() * window.innerHeight;
            break;
        }

        return {
          id: index,
          x: startX,
          y: startY,
          targetX: point.x,
          targetY: point.y,
          size: Math.random() * 2 + 2.5, // Larger than background stars
          brightness: Math.random() * 0.2 + 0.6, // Reduced from 0.3 + 0.8
          color: letterColors[Math.floor(Math.random() * letterColors.length)],
          hasFormed: false,
          velocity: { x: 0, y: 0 },
          delay: Math.random() * 2,
          isLetterStar: true,
        };
      });

      setStars(newStars);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    document.fonts.ready.then(() => {
      setTimeout(() => {
        initializeStars();
        initializeBackgroundStars();
      }, 100);
    });

    // Animation loop
    const animate = (timestamp: number) => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      let formedCount = 0;

      // Draw background stars first (dimmer layer)
      backgroundStars.forEach((star) => {
        const twinkle = Math.sin((timestamp * 0.002) + star.delay * 3) * 0.2 + 0.3; // Reduced twinkle intensity
        const currentBrightness = star.brightness * twinkle;

        ctx.save();
        ctx.globalAlpha = currentBrightness;
        ctx.fillStyle = star.color;
        ctx.shadowBlur = 3; // Reduced from 5
        ctx.shadowColor = star.color;
        
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Draw letter stars (brighter layer)
      stars.forEach((star) => {
        if (animationPhase === 'gathering' && !star.hasFormed) {
          const dx = star.targetX - star.x;
          const dy = star.targetY - star.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance > 2) {
            const speed = 0.025;
            const easing = 1 - Math.pow(0.97, 1);
            star.velocity.x += dx * speed * easing;
            star.velocity.y += dy * speed * easing;
            
            star.velocity.x *= 0.88;
            star.velocity.y *= 0.88;
            
            star.x += star.velocity.x;
            star.y += star.velocity.y;
          } else {
            star.hasFormed = true;
            star.x = star.targetX;
            star.y = star.targetY;
          }
        }

        if (star.hasFormed) {
          formedCount++;
          const time = timestamp * 0.001;
          star.x = star.targetX + Math.sin(time + star.delay) * 0.6;
          star.y = star.targetY + Math.cos(time + star.delay * 1.2) * 0.4;
        }

        // Enhanced twinkling for letter stars
        const twinkle = Math.sin((timestamp * 0.005) + star.delay * 2) * 0.15 + 0.85; // Reduced twinkle range
        const currentBrightness = star.brightness * twinkle;

        // Draw particle trail during movement
        if (!star.hasFormed && animationPhase === 'gathering') {
          ctx.save();
          ctx.globalAlpha = 0.3; // Reduced from 0.4
          ctx.fillStyle = star.color;
          ctx.shadowBlur = 8; // Reduced from 12
          ctx.shadowColor = star.color;
          
          for (let i = 1; i <= 3; i++) {
            const trailX = star.x - star.velocity.x * i * 5;
            const trailY = star.y - star.velocity.y * i * 5;
            ctx.globalAlpha = 0.3 / i; // Reduced from 0.4
            ctx.beginPath();
            ctx.arc(trailX, trailY, star.size * (0.7 / i), 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.restore();
        }

        // Draw main letter star with enhanced glow and outline
        ctx.save();
        
        // Outer glow/halo effect
        if (star.hasFormed) {
          ctx.globalAlpha = currentBrightness * 0.2; // Reduced from 0.3
          ctx.shadowBlur = 40; // Reduced from 60
          ctx.shadowColor = star.color;
          ctx.fillStyle = star.color;
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * 2.5, 0, Math.PI * 2); // Reduced from 3
          ctx.fill();
        }
        
        // Middle glow
        ctx.globalAlpha = currentBrightness * 0.5; // Reduced from 0.6
        ctx.shadowBlur = star.hasFormed ? 25 : 18; // Reduced from 40 : 25
        ctx.shadowColor = star.color;
        ctx.fillStyle = star.color;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size * 1.5, 0, Math.PI * 2); // Reduced from 1.8
        ctx.fill();
        
        // Core star with outline
        ctx.globalAlpha = currentBrightness;
        ctx.shadowBlur = star.hasFormed ? 15 : 10; // Reduced from 25 : 15
        ctx.shadowColor = star.color;
        
        // White core for maximum contrast
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Colored outline
        ctx.strokeStyle = star.color;
        ctx.lineWidth = 1;
        ctx.stroke();
        
        ctx.restore();
      });

      // Check if formation is complete
      if (formedCount === stars.length && stars.length > 0 && animationPhase === 'gathering') {
        setTimeout(() => setAnimationPhase('formed'), 1000);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animationPhase, stars.length, backgroundStars.length]);

  const handleCloseMessage = () => {
    setShowMessage(false);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setShowMessage(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
      className="min-h-screen relative overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at center, #0a0a1a 0%, #1a1a2e 30%, #16213e 60%, #0f0f23 100%)',
      }}
    >
      {/* Deep Space Background with Enhanced Nebula */}
      <div className="absolute inset-0">
        {/* Enhanced Nebula Effects */}
        <div className="absolute inset-0">
          <div 
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-15"
            style={{
              background: 'radial-gradient(circle, rgba(138, 43, 226, 0.3) 0%, transparent 70%)',
              filter: 'blur(80px)',
            }}
          />
          <div 
            className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full opacity-12"
            style={{
              background: 'radial-gradient(circle, rgba(75, 0, 130, 0.4) 0%, transparent 70%)',
              filter: 'blur(100px)',
            }}
          />
          <div 
            className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full opacity-8"
            style={{
              background: 'radial-gradient(circle, rgba(25, 25, 112, 0.5) 0%, transparent 70%)',
              filter: 'blur(60px)',
            }}
          />
        </div>

        {/* Glowing Moon */}
        <motion.div
          className="absolute top-16 right-16"
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div 
            className="w-24 h-24 rounded-full relative"
            style={{
              background: 'radial-gradient(circle at 30% 30%, #FFF8DC, #F0E68C, #DAA520)',
              boxShadow: '0 0 60px rgba(255, 248, 220, 0.6), 0 0 120px rgba(255, 248, 220, 0.3)',
            }}
          >
            {/* Moon craters */}
            <div className="absolute top-4 left-6 w-2 h-2 bg-yellow-600 rounded-full opacity-30" />
            <div className="absolute top-8 right-5 w-1 h-1 bg-yellow-600 rounded-full opacity-40" />
            <div className="absolute bottom-6 left-8 w-1 h-1 bg-yellow-600 rounded-full opacity-25" />
          </div>
        </motion.div>
      </div>

      {/* Main canvas for star animation */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ background: 'transparent' }}
      />

      {/* Progress indicator */}
      {animationPhase === 'gathering' && stars.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="fixed bottom-20 left-8 bg-black/40 backdrop-blur-sm rounded-lg px-4 py-3 border border-white/20 z-20"
        >
          <p className="text-white/90 text-sm font-medium mb-2">
            ⭐ Stars forming "{name}"
          </p>
          <div className="w-32 bg-white/20 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-yellow-400 to-yellow-300 h-2 rounded-full transition-all duration-300"
              style={{ 
                width: `${(stars.filter(s => s.hasFormed).length / stars.length) * 100}%` 
              }}
            />
          </div>
        </motion.div>
      )}

      {/* Formation complete indicator */}
      {animationPhase === 'formed' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="fixed top-8 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-400/20 to-yellow-300/20 backdrop-blur-sm rounded-2xl px-6 py-3 border border-yellow-300/30 z-20"
        >
          <p className="text-yellow-200 text-lg font-semibold text-center">
            🌟 "{name}" Shines Bright! 🌟
          </p>
        </motion.div>
      )}

      {/* Celestial Button */}
      <motion.button
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        whileHover={{ 
          scale: 1.05,
          boxShadow: "0 0 30px rgba(255, 215, 0, 0.5)",
        }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowMessage(true)}
        className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        style={{
          background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.8), rgba(255, 165, 0, 0.8))',
          backdropFilter: 'blur(10px)',
          border: '2px solid rgba(255, 255, 255, 0.3)',
        }}
      >
        <div className="px-8 py-4 rounded-full flex items-center space-x-3 text-black font-bold">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles size={20} />
          </motion.div>
          <span>Reveal Cosmic Message</span>
          <motion.div
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-2 h-2 bg-black rounded-full"
          />
        </div>
      </motion.button>

      {/* Celestial Message Modal */}
      <AnimatePresence>
        {showMessage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleBackdropClick}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, rotateY: -90 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              exit={{ scale: 0.8, opacity: 0, rotateY: 90 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg w-full shadow-2xl overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(25, 25, 112, 0.95), rgba(138, 43, 226, 0.95))',
                backdropFilter: 'blur(20px)',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '24px',
              }}
            >
              <button
                onClick={handleCloseMessage}
                className="absolute top-4 right-4 p-3 hover:bg-white/20 rounded-full transition-colors z-10 bg-white/10"
              >
                <X size={24} className="text-white" />
              </button>

              {/* Animated background stars in modal */}
              <div className="absolute inset-0 overflow-hidden">
                {Array.from({ length: 15 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-white rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      opacity: [0.2, 1, 0.2],
                      scale: [0.5, 1.5, 0.5],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: Math.random() * 3,
                    }}
                  />
                ))}
              </div>

              <div className="relative z-10 p-8 text-center">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                  className="text-6xl mb-6"
                >
                  🌌
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-3xl font-bold text-white mb-6"
                >
                  Celestial Message
                </motion.h2>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-white/30"
                >
                  <p className="text-white text-lg leading-relaxed">
                    Like how varies stars are combined to make your name.You are a combination of many things
                    your laugh , Joy, Anger, Sadness, Empathy they are all a part of you...they made you as you are now mowaaa..
                    They are your strength not your weakness.....Happy Birthday mowaaa....Hope you shine in life as how the name shines in the stars..
                    I know you will...it just takes a little time to shine as it takes time to gather all the stars✨
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                  className="text-yellow-300 text-sm italic"
                >
                  "Among billions of stars, you shine the brightest" 🌟
                </motion.div>

                {/* Floating particles in modal */}
                <div className="absolute inset-0 pointer-events-none">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute text-yellow-300"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                      }}
                      animate={{
                        y: [0, -20, 0],
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0],
                        rotate: [0, 360],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        delay: Math.random() * 4,
                      }}
                    >
                      ✨
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Celebration particles when formation is complete */}
      {animationPhase === 'formed' && (
        <div className="absolute inset-0 pointer-events-none z-10">
          {Array.from({ length: 25 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-2xl"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                y: [0, -80],
                rotate: [0, 360],
              }}
              transition={{
                duration: 5,
                delay: Math.random() * 4,
                repeat: Infinity,
                repeatDelay: Math.random() * 10 + 5,
              }}
            >
              {['✨', '🌟', '💫', '⭐', '🌙', '🌌'][Math.floor(Math.random() * 6)]}
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default StarlitName;