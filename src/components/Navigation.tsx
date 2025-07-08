import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Home, 
  Moon, 
  Star, 
  MapPin, 
  Flower2, 
  Sparkles, 
  Music,
  Cloud,
  Camera,
  Clock,
  Menu,
  X
} from 'lucide-react';

interface NavigationProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const Navigation: React.FC<NavigationProps> = ({ isOpen, setIsOpen }) => {
  const location = useLocation();

  const menuItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/moons', icon: Moon, label: 'Moons Through Years' },
    { path: '/wish', icon: Star, label: 'Wish Upon a Star' },
    { path: '/map', icon: MapPin, label: 'Our Guntur Map' },
    { path: '/flowers', icon: Flower2, label: 'Flower Messages' },
    { path: '/starlit', icon: Sparkles, label: 'Starlit Name' },
    { path: '/songs', icon: Music, label: 'Her Songs' },
    { path: '/sky', icon: Cloud, label: 'Sky' },
    { path: '/photos', icon: Camera, label: 'Photos' },
    { path: '/time', icon: Clock, label: 'Time Together' },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg md:hidden"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <motion.nav
        initial={false}
        animate={{ x: isOpen ? 0 : -200 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed left-0 top-0 h-full bg-white/95 backdrop-blur-md shadow-2xl z-40 md:translate-x-0 overflow-y-auto"
        style={{ width: isOpen ? '16rem' : '4rem' }}
      >
        <div className="p-4">
          <motion.div
            animate={{ opacity: isOpen ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              Birthday Magic
            </h2>
          </motion.div>

          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center p-3 rounded-lg transition-all duration-200 ${
                      isActive 
                        ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg' 
                        : 'hover:bg-pink-50 text-gray-700'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon size={20} className="flex-shrink-0" />
                    <motion.span
                      animate={{ opacity: isOpen ? 1 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="ml-3 whitespace-nowrap"
                    >
                      {item.label}
                    </motion.span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </motion.nav>

      {/* Desktop Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="hidden md:block fixed top-4 left-4 z-50 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    </>
  );
};

export default Navigation;