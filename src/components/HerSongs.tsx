import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Music, Heart, ExternalLink, Youtube } from 'lucide-react';

interface Song {
  id: number;
  title: string;
  youtubeUrl: string;
  message: string;
  thumbnail?: string;
}

const HerSongs: React.FC = () => {
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [showMessage, setShowMessage] = useState(false);

  const songs: Song[] = [
    {
      id: 1,
      title: "Maula Mere Maula",
      youtubeUrl: "https://youtu.be/l5sgIqzlPXc?feature=shared",
      thumbnail: "https://i1.sndcdn.com/artworks-000087843124-ztktpz-t500x500.jpg",
      message: "Aakhain theri,kitini haseen.......ki inka aashiq mein ban gaya hoon...💖"
    },
    {
      id: 2,
      title: "yung kai - blue",
      youtubeUrl: "https://youtu.be/IpFX2vq8HKw?feature=shared",
      thumbnail: "https://i1.sndcdn.com/artworks-lQe2ClAbAB8uy9CF-4WwBrQ-t1080x1080.png",
      message: "Your morning eyes i could stare like watching stars....💕"
    },
    {
      id: 3,
      title: "Djo - End Of Beginning",
      youtubeUrl: "https://youtu.be/2o8nCGhlIHY?feature=shared",
      thumbnail: "https://upload.wikimedia.org/wikipedia/en/7/7a/Djo_-_End_of_Beginning_single_cover.png",
      message: "And when i'm back in chicago i feel it...another version of me...i was in it! 💙"
    },
    {
      id: 4,
      title: "Stephen Dawes - Teenage Dream",
      youtubeUrl: "https://youtu.be/pVi9W3OThVw?feature=shared",
      thumbnail: "https://i.ytimg.com/vi/u1WPuA4Ldvo/sddefault.jpg",
      message: "You and i, will be young forever...💕"
    },
    {
      id: 5,
      title: "yo bro who got you smiling like that",
      youtubeUrl: "https://youtu.be/bGkmj0L1fsY?feature=shared",
      thumbnail: "https://ih1.redbubble.net/image.2766898097.3712/fposter,medium,wall_texture,product,750x1000.jpg",
      message: "The way you looking at me....you got me mesmarized....😉"
    },
    {
      id: 6,
      title: "Artic Monkeys - I Wanna Be Yours ",
      youtubeUrl: "https://youtu.be/1UadfZq-RR0?feature=shared",
      thumbnail: "https://i1.sndcdn.com/artworks-hAiTfsOSiHL4nIM1-LHNs3Q-t500x500.jpg",
      message: "Secrets i have held in my heart❤️...are harder to hide than i thought..."
    },
    {
      id: 7,
      title: "Aaron Smith - Dancin",
      youtubeUrl: "https://youtu.be/Cjp6RVrOOW0?feature=shared",
      thumbnail: "https://imgs.search.brave.com/OpgEYIzpQ7npl8z-uCdy-DQ0H134r6t_qoNNKAL4z1M/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL00v/TVY1Qk5USTFPREEx/WVRndFlqQTJNaTAw/TXpZekxUazBNRE10/TkRka05tTXhNekJq/WlRWa1hrRXlYa0Zx/Y0djQC5qcGc",
      message: "Everytime when i look into your eyes.....i smile with pride...happy that your mine....😊"
    },
    {
      id: 8,
      title: "Aya Nakamura - Copines",
      youtubeUrl: "https://youtu.be/JXijFYXK_44?feature=shared",
      thumbnail: "https://i.pinimg.com/564x/14/c2/17/14c2170ca25816b60a2ce01410ce6285.jpg",
      message: "Just vibe for the song no meaning....✨"
    },
    {
      id: 9,
      title: "Ed Sheeran - Perfect",
      youtubeUrl: "https://youtu.be/2Vv-BfVoq4g?feature=shared",
      thumbnail: "https://upload.wikimedia.org/wikipedia/en/8/80/Ed_Sheeran_Perfect_Single_cover.jpg",
      message: "I found a girl beautiful and sweet....💕"
    },
    {
      id: 10,
      title: "The Chainsmokers & Coldplay - Something Just Like This",
      youtubeUrl: "https://youtu.be/FM7MFYoylVs?feature=shared",
      thumbnail: "https://upload.wikimedia.org/wikipedia/en/5/57/Something_Just_Like_This.png",
      message: "She said where d'you wanna go...how much you wanna risk...🌟"
    }
  ];

  const handleSongClick = (song: Song) => {
    setSelectedSong(song);
    setShowMessage(true);
    
    // Auto-hide message after 4 seconds
    setTimeout(() => setShowMessage(false), 4000);
  };

  const openYouTube = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-red-900 relative overflow-hidden"
    >
      {/* Animated Music Notes */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-white/20 text-4xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              rotate: [0, 360],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          >
            🎵
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-5xl font-serif text-white text-center mb-8"
        >
          Music for You
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-white/80 mb-16 text-lg"
        >
          A curated playlist of songs that remind me of you! Click to play on YouTube 🎶
        </motion.p>

        {/* Song Message Display */}
        <AnimatePresence>
          {showMessage && selectedSong && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-2xl mx-auto mb-8"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="flex items-center justify-center mb-2">
                  <Heart className="text-red-400 mr-2" size={16} />
                  <span className="text-white text-sm font-medium">Now Playing Message:</span>
                </div>
                <p className="text-white/90 italic text-center">
                  {selectedSong.message}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Songs Grid */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {songs.map((song, index) => (
              <motion.div
                key={song.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-white/20 hover:border-white/40 transition-all duration-300 group"
              >
                <div className="flex items-center space-x-4">
                  {/* Thumbnail */}
                  <div className="relative flex-shrink-0">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="w-20 h-20 rounded-lg overflow-hidden shadow-lg"
                    >
                      <img
                        src={song.thumbnail}
                        alt={`${song.title} thumbnail`}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                    
                    {/* YouTube overlay */}
                    <div className="absolute inset-0 bg-black/20 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Youtube className="text-white" size={24} />
                    </div>
                  </div>

                  {/* Song Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-semibold text-lg mb-1 truncate">
                      {song.title}
                    </h3>

                    {/* Action Buttons */}
                    <div className="flex space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => openYouTube(song.youtubeUrl)}
                        className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm font-medium"
                      >
                        <Play size={14} />
                        <span>Play</span>
                        <ExternalLink size={12} />
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleSongClick(song)}
                        className="flex items-center space-x-2 px-3 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors text-sm"
                      >
                        <Heart size={14} />
                        <span>Message</span>
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="text-center mt-16"
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 max-w-2xl mx-auto border border-white/20">
            <Music className="mx-auto mb-4 text-white" size={32} />
            <p className="text-white/80 text-sm leading-relaxed">
              Each song in this playlist was chosen with love and care. They represent different moments, 
              feelings, and memories that remind me of you. Message meedha nokku raa chitti gaa only paina kanipisthundhi mssg...a small in that song about you...! 
              🎵💕
            </p>
            <p className="text-white/60 text-xs mt-4">
              All links open YouTube in a new tab. Enjoy the music! ✨
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HerSongs;