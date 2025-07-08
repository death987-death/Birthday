import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Send, Sparkles } from 'lucide-react';

interface Wish {
  id: number;
  text: string;
  timestamp: Date;
}

interface AnimatingWish {
  id: number;
  text: string;
  isAnimating: boolean;
}

const WishUponStar: React.FC = () => {
  const [currentWish, setCurrentWish] = useState('');
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [animatingWish, setAnimatingWish] = useState<AnimatingWish | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [moonGlow, setMoonGlow] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentWish.trim()) return;

    const newWish: Wish = {
      id: Date.now(),
      text: currentWish,
      timestamp: new Date(),
    };

    // Start the animation sequence
    setAnimatingWish({
      id: newWish.id,
      text: newWish.text,
      isAnimating: true,
    });

    // Add to wishes list after animation
    setTimeout(() => {
      setWishes(prev => [...prev, newWish]);
    }, 3000);

    // Reset form
    setCurrentWish('');

    // Animation sequence
    setTimeout(() => {
      setMoonGlow(true);
    }, 2500); // Moon starts glowing just before star arrives

    setTimeout(() => {
      setShowCelebration(true);
      setAnimatingWish(null);
    }, 3000); // Show celebration when star reaches moon

    setTimeout(() => {
      setShowCelebration(false);
      setMoonGlow(false);
    }, 6000); // Hide celebration after 3 seconds
  };

  // SVG Star Component
  const SVGStar = ({ className, size = 24 }: { className?: string; size?: number }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
    >
      <path
        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1"
      />
    </svg>
  );

  // SVG Moon Component
  const SVGMoon = ({ className, size = 80 }: { className?: string; size?: number }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
    >
      <defs>
        <radialGradient id="moonGradient" cx="30%" cy="30%">
          <stop offset="0%" stopColor="#FFF8DC" />
          <stop offset="70%" stopColor="#F0E68C" />
          <stop offset="100%" stopColor="#DAA520" />
        </radialGradient>
        <filter id="moonGlow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <circle
        cx="50"
        cy="50"
        r="40"
        fill="url(#moonGradient)"
        filter={moonGlow ? "url(#moonGlow)" : "none"}
      />
      {/* Moon craters */}
      <circle cx="35" cy="35" r="4" fill="#DAA520" opacity="0.3" />
      <circle cx="60" cy="45" r="3" fill="#DAA520" opacity="0.3" />
      <circle cx="45" cy="65" r="2" fill="#DAA520" opacity="0.3" />
    </svg>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden"
    >
      {/* Twinkling Stars Background */}
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
              opacity: [0.2, 1, 0.2],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Moon positioned in top-right area */}
      <motion.div
        className="absolute top-20 right-20 z-20"
        animate={{
          scale: moonGlow ? [1, 1.1, 1] : 1,
        }}
        transition={{
          duration: 0.5,
          repeat: moonGlow ? Infinity : 0,
        }}
      >
        <SVGMoon 
          size={120} 
          className={`transition-all duration-500 ${
            moonGlow ? 'drop-shadow-[0_0_30px_rgba(255,248,220,0.8)]' : 'drop-shadow-[0_0_10px_rgba(255,248,220,0.3)]'
          }`}
        />
      </motion.div>

      {/* Animating Wish Star */}
      <AnimatePresence>
        {animatingWish && (
          <motion.div
            initial={{
              x: formRef.current ? formRef.current.offsetLeft + formRef.current.offsetWidth / 2 : window.innerWidth / 2,
              y: formRef.current ? formRef.current.offsetTop + formRef.current.offsetHeight / 2 : window.innerHeight / 2,
              scale: 0,
              opacity: 0,
            }}
            animate={{
              x: window.innerWidth - 160, // Near the moon
              y: 140, // Near the moon
              scale: [0, 1.2, 1],
              opacity: [0, 1, 1],
            }}
            exit={{
              scale: 0,
              opacity: 0,
            }}
            transition={{
              duration: 3,
              ease: [0.25, 0.46, 0.45, 0.94], // Custom cubic-bezier for smooth curve
              x: { type: "spring", stiffness: 50, damping: 20 },
              y: { type: "spring", stiffness: 50, damping: 20 },
            }}
            className="fixed z-30 pointer-events-none"
          >
            <div className="relative">
              {/* Wish text inside the star */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-gradient-to-r from-yellow-200 to-yellow-400 text-purple-900 text-xs font-bold px-2 py-1 rounded-full max-w-[80px] text-center truncate shadow-lg">
                  {animatingWish.text.slice(0, 15)}...
                </div>
              </div>
              
              {/* Star shape */}
              <SVGStar 
                size={100} 
                className="text-yellow-300 drop-shadow-[0_0_20px_rgba(255,255,0,0.8)] animate-spin-slow"
              />
              
              {/* Trailing sparkles */}
              <motion.div
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  delay: 0.1,
                }}
                className="absolute -top-2 -left-2"
              >
                <Sparkles size={16} className="text-pink-300" />
              </motion.div>
              
              <motion.div
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  delay: 0.3,
                }}
                className="absolute -bottom-2 -right-2"
              >
                <Sparkles size={12} className="text-blue-300" />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Celebration Overlay */}
      <AnimatePresence>
        {showCelebration && animatingWish && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-40"
          >
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="bg-gradient-to-br from-purple-600/90 to-pink-600/90 backdrop-blur-md rounded-3xl p-8 max-w-md mx-4 text-center border border-white/20 shadow-2xl"
            >
              {/* Starburst effect */}
              <div className="absolute inset-0 pointer-events-none">
                {Array.from({ length: 20 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-8 bg-gradient-to-t from-yellow-300 to-transparent"
                    style={{
                      left: '50%',
                      top: '50%',
                      transformOrigin: 'bottom center',
                      transform: `rotate(${i * 18}deg)`,
                    }}
                    animate={{
                      scaleY: [0, 1, 0],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 1,
                      delay: i * 0.05,
                    }}
                  />
                ))}
              </div>

              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="text-6xl mb-4"
              >
                🌟
              </motion.div>

              <motion.h3
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-2xl font-bold text-white mb-4"
              >
                Wish Granted!
              </motion.h3>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 mb-4"
              >
                <p className="text-white text-lg italic leading-relaxed">
                  "{animatingWish.text}"
                </p>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-white/80 text-sm"
              >
                Your wish has been delivered to the moon and stars! ✨
              </motion.p>

              {/* Floating sparkles */}
              <div className="absolute inset-0 pointer-events-none">
                {Array.from({ length: 15 }).map((_, i) => (
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
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: Math.random() * 2,
                    }}
                  >
                    ✨
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 container mx-auto px-4 py-20">
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-6xl font-serif text-white text-center mb-8"
        >
          Wish Upon a Star
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-white/80 mb-16 text-lg"
        >
          Make a wish and watch it journey to the moon ✨
        </motion.p>

        <div className="max-w-2xl mx-auto">
          {/* Wish Form */}
          <motion.form
            ref={formRef}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            onSubmit={handleSubmit}
            className="bg-white/10 backdrop-blur-md rounded-3xl p-8 mb-12 shadow-2xl border border-white/20"
          >
            <div className="mb-6">
              <label className="block text-white text-lg mb-4 font-medium">
                What do you wish for? 🌟
              </label>
              <div className="relative">
                <textarea
                  value={currentWish}
                  onChange={(e) => setCurrentWish(e.target.value)}
                  placeholder="Type your heartfelt wish here..."
                  className="w-full px-6 py-4 bg-white/20 backdrop-blur-sm text-white placeholder-white/70 rounded-2xl border border-white/30 focus:border-white/50 focus:outline-none resize-none transition-all duration-300 focus:shadow-lg focus:shadow-white/10"
                  rows={4}
                  maxLength={200}
                />
                <div className="absolute bottom-3 right-3 text-white/50 text-sm">
                  {currentWish.length}/200
                </div>
              </div>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(255,255,0,0.3)" }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={!currentWish.trim() || animatingWish !== null}
              className="w-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-purple-900 py-4 px-8 rounded-2xl font-bold text-lg flex items-center justify-center space-x-3 hover:from-yellow-300 hover:via-yellow-400 hover:to-yellow-500 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <SVGStar size={24} className="text-purple-900" />
              <span>Send Wish to the Moon</span>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles size={20} className="text-purple-900" />
              </motion.div>
            </motion.button>
          </motion.form>

          {/* Past Wishes */}
          {wishes.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/20"
            >
              <h3 className="text-white text-2xl font-semibold mb-6 flex items-center justify-center">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="mr-3"
                >
                  🌙
                </motion.div>
                Wishes Delivered to the Moon
                <motion.div
                  animate={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  className="ml-3"
                >
                  ⭐
                </motion.div>
              </h3>
              
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {wishes.slice().reverse().map((wish, index) => (
                  <motion.div
                    key={wish.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-4 p-4 bg-white/10 rounded-2xl hover:bg-white/15 transition-all duration-300"
                  >
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 10, -10, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: index * 0.5,
                      }}
                    >
                      <SVGStar size={20} className="text-yellow-300 mt-1" />
                    </motion.div>
                    <div className="flex-1">
                      <p className="text-white text-sm leading-relaxed mb-2">
                        {wish.text}
                      </p>
                      <p className="text-white/60 text-xs">
                        Delivered on {wish.timestamp.toLocaleDateString()} at {wish.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default WishUponStar;