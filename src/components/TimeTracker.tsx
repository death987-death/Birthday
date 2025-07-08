import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Calendar, Heart, Sparkles } from 'lucide-react';

interface TimeElapsed {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const TimeTracker: React.FC = () => {
  const [timeElapsed, setTimeElapsed] = useState<TimeElapsed>({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Reference date: February 3rd, 2023, 5:05 PM
  const referenceDate = new Date('2023-02-03T17:05:00');

  const calculateTimeElapsed = (): TimeElapsed => {
    const now = new Date();
    const diffInMs = now.getTime() - referenceDate.getTime();

    // Calculate total elapsed time in different units
    const totalSeconds = Math.floor(diffInMs / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);
    const totalDays = Math.floor(totalHours / 24);

    // Calculate years and months more accurately
    let years = now.getFullYear() - referenceDate.getFullYear();
    let months = now.getMonth() - referenceDate.getMonth();
    
    // Adjust for negative months
    if (months < 0) {
      years--;
      months += 12;
    }
    
    // Adjust for day of month
    if (now.getDate() < referenceDate.getDate()) {
      months--;
      if (months < 0) {
        years--;
        months += 12;
      }
    }

    // Calculate remaining days after accounting for years and months
    const tempDate = new Date(referenceDate);
    tempDate.setFullYear(tempDate.getFullYear() + years);
    tempDate.setMonth(tempDate.getMonth() + months);
    
    const remainingMs = now.getTime() - tempDate.getTime();
    const remainingDays = Math.floor(remainingMs / (1000 * 60 * 60 * 24));
    
    // Calculate remaining hours, minutes, seconds
    const remainingHours = Math.floor((remainingMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const remainingMinutes = Math.floor((remainingMs % (1000 * 60 * 60)) / (1000 * 60));
    const remainingSeconds = Math.floor((remainingMs % (1000 * 60)) / 1000);

    return {
      years,
      months,
      days: remainingDays,
      hours: remainingHours,
      minutes: remainingMinutes,
      seconds: remainingSeconds,
    };
  };

  useEffect(() => {
    // Initial calculation
    setTimeElapsed(calculateTimeElapsed());

    // Update every second
    const interval = setInterval(() => {
      setTimeElapsed(calculateTimeElapsed());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number): string => {
    return num.toString().padStart(2, '0');
  };

  const timeUnits = [
    { label: 'Years', value: timeElapsed.years, color: 'from-purple-500 to-pink-500', icon: '🗓️' },
    { label: 'Months', value: timeElapsed.months, color: 'from-blue-500 to-purple-500', icon: '📅' },
    { label: 'Days', value: timeElapsed.days, color: 'from-green-500 to-blue-500', icon: '☀️' },
    { label: 'Hours', value: timeElapsed.hours, color: 'from-yellow-500 to-orange-500', icon: '⏰' },
    { label: 'Minutes', value: timeElapsed.minutes, color: 'from-orange-500 to-red-500', icon: '⏱️' },
    { label: 'Seconds', value: timeElapsed.seconds, color: 'from-red-500 to-pink-500', icon: '⚡' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-6">
            <Heart className="text-red-400 mr-3" size={40} />
            <h1 className="text-4xl md:text-6xl font-serif text-white">
              Time Together
            </h1>
            <Heart className="text-red-400 ml-3" size={40} />
          </div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-white/80 text-lg md:text-xl mb-4"
          >
            Counting every precious moment since
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-md mx-auto border border-white/20"
          >
            <div className="flex items-center justify-center mb-2">
              <Calendar className="text-yellow-300 mr-2" size={24} />
              <span className="text-white font-semibold text-xl">February 3rd, 2023</span>
            </div>
            <div className="flex items-center justify-center">
              <Clock className="text-blue-300 mr-2" size={20} />
              <span className="text-white/80">5:05 PM</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Time Counters Grid */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {timeUnits.map((unit, index) => (
              <motion.div
                key={unit.label}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                className="relative group"
              >
                <div className={`bg-gradient-to-br ${unit.color} p-1 rounded-2xl shadow-2xl`}>
                  <div className="bg-black/20 backdrop-blur-sm rounded-xl p-8 h-full border border-white/10">
                    {/* Icon */}
                    <motion.div
                      animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.3,
                      }}
                      className="text-4xl mb-4 text-center"
                    >
                      {unit.icon}
                    </motion.div>

                    {/* Number */}
                    <motion.div
                      key={unit.value} // This will trigger animation on value change
                      initial={{ scale: 1.2, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="text-center"
                    >
                      <div className="text-4xl md:text-5xl font-bold text-white mb-2 font-mono">
                        {formatNumber(unit.value)}
                      </div>
                      <div className="text-white/80 text-lg font-medium uppercase tracking-wider">
                        {unit.label}
                      </div>
                    </motion.div>

                    {/* Glow effect on hover */}
                    <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <div className={`absolute inset-0 bg-gradient-to-br ${unit.color} opacity-20 rounded-xl blur-xl`} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="text-center mt-16"
        >
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto border border-white/10">
            <h3 className="text-2xl font-semibold text-white mb-4 flex items-center justify-center">
              <Sparkles className="mr-2 text-yellow-300" size={24} />
              Every Second Counts
            </h3>
            <p className="text-white/70 leading-relaxed">
              This is time we've known each other mowaaa....time from the first message till now and still counting...😊
              Happy birthday mowaaaa.....As time goes on we will celebrate more and more birthdays.....Time moves pretty fast
              for each second i hope there are more and more beautiful memories added to your life mowaaa......
            </p>
            
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="mt-6 text-yellow-300 text-sm"
            >
              ✨ Updated in real-time ✨
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TimeTracker;