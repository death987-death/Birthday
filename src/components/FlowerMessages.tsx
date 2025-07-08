import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart } from 'lucide-react';

interface Flower {
  id: number;
  x: number;
  y: number;
  emoji: string;
  scale: number;
  delay: number;
}

interface Message {
  id: number;
  text: string;
  used: boolean;
}

const FlowerMessages: React.FC = () => {
  const [flowers, setFlowers] = useState<Flower[]>([]);
  const [selectedFlower, setSelectedFlower] = useState<Flower | null>(null);
  const [currentMessage, setCurrentMessage] = useState<Message | null>(null);
  const [showMessage, setShowMessage] = useState(false);

  const messages: Message[] = [
    { id: 1, text: "Your eyes, they glow like stars in the nigth mowaaaa...🌟", used: false },
    { id: 2, text: "That smile of your can melt me..... 😊", used: false },
    { id: 3, text: "The most beautiful gurllllll......😊", used: false },
    { id: 4, text: "Its just awesome how you enjoy little things in life.....❤️", used: false },
    { id: 5, text: "Never loose that smile on your face mowaaaa...... 💖", used: false },
    { id: 6, text: "You're the sweetest melody in my life's symphony 🎵", used: false },
    { id: 7, text: "The sweetestttttt gurlllllll 🌟", used: false },
    { id: 8, text: "The gurl with whom i can be like a child.........😁", used: false },
    { id: 9, text: "sweeettttttt potatooooooooooooooo", used: false },
    { id: 10, text: "You are wonderful as you are! 😉", used: false },
    { id: 11, text: "Enjoyyyyy the dayyyyyyy mowaaaaaaaa......", used: false },
    { id: 12, text: "Keepppp spreadinggggggg joyyyyyyyy", used: false },
    { id: 13, text: "The childish discussions between us🤣🤣🤣", used: false },
    { id: 14, text: "You are a strong gurllll mowaaaaa......💕", used: false },
    { id: 15, text: "You will acheive everthing you dreamed for mowaaa....i know you will...💖", used: false },
    { id: 16, text: "The smile on your face when we meet..... 😊", used: false },
    { id: 17, text: "The silly discussions between us....😉", used: false },
    { id: 18, text: "The Late nigth callss...❤️", used: false },
    { id: 19, text: "The genuine talks we have about usss.....💕", used: false },
    { id: 20, text: "A bond carved deep inside the heart....", used: false },
  ];

  useEffect(() => {
    const createFlower = () => {
      const newFlower: Flower = {
        id: Date.now() + Math.random(),
        x: Math.random() * 90 + 5,
        y: Math.random() * 90 + 5,
        emoji: ['🌸', '🌺', '🌻', '🌷', '🌹', '🌼', '🌵', '🌙'][Math.floor(Math.random() * 8)],
        scale: Math.random() * 0.5 + 0.8,
        delay: Math.random() * 2,
      };
      setFlowers(prev => [...prev, newFlower]);
    };

    // Create initial flowers
    for (let i = 0; i < 15; i++) {
      setTimeout(createFlower, i * 200);
    }

    // Continue creating flowers
    const interval = setInterval(createFlower, 1500);

    return () => clearInterval(interval);
  }, []);

  // Clean up old flowers
  useEffect(() => {
    const cleanup = setInterval(() => {
      setFlowers(prev => prev.slice(-20));
    }, 5000);

    return () => clearInterval(cleanup);
  }, []);

  const handleFlowerClick = (flower: Flower) => {
    setSelectedFlower(flower);
    
    // Get a random unused message
    const availableMessages = messages.filter(msg => !msg.used);
    if (availableMessages.length > 0) {
      const randomMessage = availableMessages[Math.floor(Math.random() * availableMessages.length)];
      setCurrentMessage(randomMessage);
      setShowMessage(true);
      
      // Mark message as used
      randomMessage.used = true;
    }
  };

  const closeMessage = () => {
    setShowMessage(false);
    setSelectedFlower(null);
    setCurrentMessage(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen relative overflow-hidden cursor-pointer"
    >
      {/* Sunrise Mountain Background */}
      <div className="absolute inset-0">
        {/* Sky Gradient - Sunrise Colors */}
        <div className="absolute inset-0 bg-gradient-to-b from-orange-300 via-pink-300 to-purple-200" />
        
        {/* Sun */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-20 right-1/3 w-24 h-24 bg-gradient-to-br from-yellow-200 to-orange-300 rounded-full shadow-2xl"
          style={{
            boxShadow: '0 0 60px rgba(255, 165, 0, 0.6), 0 0 120px rgba(255, 165, 0, 0.3)',
          }}
        />

        {/* Mountain Layers - Multiple depths */}
        {/* Distant Mountains */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1200 400" className="w-full h-auto">
            {/* Furthest mountains - lightest */}
            <path
              d="M0,400 L0,200 L150,150 L300,180 L450,120 L600,160 L750,100 L900,140 L1050,90 L1200,130 L1200,400 Z"
              fill="rgba(147, 197, 253, 0.3)"
            />
            {/* Middle mountains */}
            <path
              d="M0,400 L0,250 L200,200 L400,230 L600,180 L800,220 L1000,160 L1200,200 L1200,400 Z"
              fill="rgba(99, 102, 241, 0.4)"
            />
            {/* Closest mountains - darkest */}
            <path
              d="M0,400 L0,300 L150,280 L300,320 L450,260 L600,300 L750,240 L900,280 L1050,220 L1200,260 L1200,400 Z"
              fill="rgba(55, 65, 81, 0.6)"
            />
          </svg>
        </div>

        {/* Morning Mist */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/20 to-transparent" />
      </div>

      {/* Foreground Flowers - Subtle and Non-intrusive */}
      <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none">
        {/* Left side flowers */}
        <div className="absolute bottom-4 left-8 text-2xl opacity-60">🌸</div>
        <div className="absolute bottom-8 left-16 text-lg opacity-50">🌼</div>
        <div className="absolute bottom-2 left-32 text-xl opacity-40">🌺</div>
        
        {/* Right side flowers */}
        <div className="absolute bottom-6 right-12 text-2xl opacity-60">🌷</div>
        <div className="absolute bottom-3 right-28 text-lg opacity-50">🌻</div>
        <div className="absolute bottom-10 right-6 text-xl opacity-40">🌹</div>
      </div>

      {/* Content Overlay with Enhanced Readability */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-5xl font-serif text-gray-800 text-center mb-8 drop-shadow-lg"
          style={{
            textShadow: '2px 2px 4px rgba(255,255,255,0.8), 0 0 10px rgba(255,255,255,0.5)',
          }}
        >
          Flower Messages
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-gray-700 mb-16 text-lg font-medium bg-white/30 backdrop-blur-sm rounded-lg px-6 py-3 mx-auto max-w-md border border-white/40"
          style={{
            textShadow: '1px 1px 2px rgba(255,255,255,0.8)',
          }}
        >
          Click on the blooming flowers to discover sweet messages! 🌺
        </motion.p>
      </div>

      {/* Interactive Flowers */}
      <div className="absolute inset-0 z-20">
        {flowers.map(flower => (
          <motion.div
            key={flower.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: flower.scale, opacity: 1 }}
            transition={{ 
              duration: 0.8, 
              delay: flower.delay,
              type: "spring",
              stiffness: 200,
              damping: 15
            }}
            className="absolute cursor-pointer select-none"
            style={{
              left: `${flower.x}%`,
              top: `${flower.y}%`,
              fontSize: '2rem',
              filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))',
            }}
            onClick={() => handleFlowerClick(flower)}
            whileHover={{ scale: flower.scale * 1.2 }}
            whileTap={{ scale: flower.scale * 0.9 }}
          >
            <motion.div
              animate={{
                rotate: [0, 5, -5, 0],
                y: [0, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: flower.delay,
              }}
            >
              {flower.emoji}
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Message Modal */}
      <AnimatePresence>
        {showMessage && currentMessage && selectedFlower && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ 
                scale: 0,
                x: `${selectedFlower.x}%`,
                y: `${selectedFlower.y}%`,
              }}
              animate={{ 
                scale: 1,
                x: 0,
                y: 0,
              }}
              exit={{ 
                scale: 0,
                opacity: 0,
              }}
              transition={{ 
                type: "spring",
                stiffness: 300,
                damping: 25,
              }}
              className="relative bg-white/95 backdrop-blur-md rounded-2xl p-8 max-w-md w-full shadow-2xl border-4 border-pink-200"
            >
              <button
                onClick={closeMessage}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>

              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-6xl mb-4"
                >
                  {selectedFlower.emoji}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-center justify-center mb-4"
                >
                  <Heart className="text-red-500 mr-2" size={24} />
                  <h3 className="text-xl font-semibold text-gray-800">
                    A Message for You
                  </h3>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-gray-600 text-lg leading-relaxed italic"
                >
                  {currentMessage.text}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="mt-6 text-sm text-gray-500"
                >
                  Keep clicking flowers for more messages! 🌸
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default FlowerMessages;