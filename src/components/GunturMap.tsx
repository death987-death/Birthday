import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, X, Heart } from 'lucide-react';
import lassishop     from '../assests/images/lassishop.jpg';
import pvr           from '../assests/images/pvr.jpg';
import bird          from '../assests/images/bird.jpg';
import petrolbunk    from '../assests/images/petrolbunk.jpg';
import dmart         from '../assests/images/dmart.jpg';
import lifestyle     from '../assests/images/lifestyle.jpg';
import nawaabs       from '../assests/images/nawaabs.jpg';
import firstbusstop  from '../assests/images/firstbusstop.jpg';
import ganeshfood    from '../assests/images/ganeshfood.jpg';
import styleunion    from '../assests/images/styleunion.jpg';
import trends        from '../assests/images/trends.jpg';
import falooda       from '../assests/images/falooda.jpg';
import gismat        from '../assests/images/gismat.jpg';
import zudio         from '../assests/images/zudio.jpg';
import madhavan      from '../assests/images/madhavan.jpg';
import vplat         from '../assests/images/vplat.jpg';
import max         from '../assests/images/max.jpg';
import exi         from '../assests/images/exi.jpg';
import brave         from '../assests/images/brave.jpg';
import navya         from '../assests/images/navyagrand.jpg';
import teas         from '../assests/images/teas.jpg';
import juice         from '../assests/images/juice.jpg';
import phnx         from '../assests/images/phnx.jpg';


interface Place {
  id: number;
  name: string;
  x: number;
  y: number;
  image: string;
  description: string;
  memory: string;
}

const GunturMap: React.FC = () => {
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

  const places: Place[] = [
    {
      id: 1,
      name: "Lassishop",
      x: 25,
      y: 45,
      image: lassishop,
      description: "falooda",
      memory: "Chala sarlu neetho anna bagundhi ani but teesukuni vellale...one day ala sudden gaa gurthukuvachi on the way loo teesukuni vellaa...😎"
    },
    {
      id: 2,
      name: "PVR",
      x: 70,
      y: 20,
      image: pvr,
      description: "Movie",
      memory: "Mahesh babu Lion king mana third movie indulone chusam in telugu...."
    },
    {
      id: 3,
      name: "The Garden Walk",
      x: 40,
      y: 60,
      image: bird,
      description: "The pleasent destination",
      memory: "The walk the trees the happiness the wait the joy the excitement"
    },
    {
      id: 4,
      name: "V celluoid",
      x: 60,
      y: 75,
      image: vplat,
      description: "movie",
      memory: "First movie named raayan(Action movie chusam😂😂😂)."
    },
    {
      id: 5,
      name: "Madhavan",
      x: 80,
      y: 60,
      image: madhavan,
      description: "Food",
      memory: "Pelliki velli return ayinappudu first time thinnam indulo..chicken biriyani thinnam..."
    },
    {
      id: 6,
      name: "Zudio",
      x: 11,
      y: 11,
      image: zudio,
      description: "Shopping",
      memory: "Chala sarlu vellam zudio kii many times but chusam anthe konaledhuu.....😁🤣🤣"
    },
    {
      id: 7,
      name: "Gismat",
      x: 13,
      y: 24,
      image: gismat,
      description: "Food",
      memory: "Food neeku antha nachadu gaa ikkada..only fried chicken type ee untundhi no gravy type gaa...."
    },
    {
      id: 8,
      name: "Falooda",
      x: 90,
      y: 13,
      image: falooda,
      description: "Food",
      memory: "First time falooda thinnam ikkade busstand dhaggira....."
    },
    {
      id: 9,
      name: "Trends",
      x: 76,
      y: 29,
      image: trends,
      description: "Shopping",
      memory: "Just ala look veyadaniki vellam starting loo....Naa birthday appudu kuuda vellam"
    },
    {
      id: 10,
      name: "style union",
      x: 10,
      y: 90,
      image: styleunion,
      description: "Shopping",
      memory: "Naa last fest dress akkade konukkuna gaa....😎"
    },
    {
      id: 11,
      name: "GFC",
      x: 36,
      y: 94,
      image: ganeshfood,
      description: "Food",
      memory: "Budget loo baguntundhi ani chala sarlu thinnam....many time nakosam paneer thinnav....😁"
    },
    {
      id: 12,
      name: "Bus Stop",
      x: 22,
      y: 55,
      image: firstbusstop,
      description: "Hehhehehhehehehe😁",
      memory: "First time bus stop hstl dhaggira drop chesa....nuv venakki chusa annav but nenu kanipinchaledhu ani annav gaa..."
    },
    {
      id: 13,
      name: "Nawaabs",
      x: 98,
      y: 10,
      image: nawaabs,
      description: "Food",
      memory: "First time mandi thinnam ikkadee...nee kosam busstand dhaggira wait chesaa....😁"
    },
    {
      id: 14,
      name: "Life Style",
      x: 66,
      y: 11,
      image: lifestyle,
      description: "Shopping",
      memory: "Naa birthday shirt akkade konukunna gaa ne selection ee."
    },
    {
      id: 15,
      name: "Dmart",
      x: 77,
      y: 49,
      image: dmart,
      description: "Huhuuhuuhuh",
      memory: "Bus loo velledappudu ikkade dhigi clips konukunnamu....ice cream thinnam...😎"
    },
    {
      id: 16,
      name: "PetrolBunk",
      x: 23,
      y: 32,
      image: petrolbunk,
      description: "hehehehehhehhe",
      memory: "First time akkade wait chesaa gaa.....😁"
    },
    {
      id: 17,
      name: "Max",
      x: 23,
      y: 7,
      image: max,
      description: "Shopping",
      memory: "Black shirt and black pant akkade teesukunna nuvve cheppav freshers appudu...neeku chain kuuda akkade teesukunna😁"
    },
    {
      id: 18,
      name: "navya grand",
      x: 2,
      y: 3,
      image: navya,
      description: "Food",
      memory: "Chicken biriyani thinnam taruvatha full varhsam fest mundhu vellam.....😁"
    },
    {
      id: 19,
      name: "Juice",
      x: 5,
      y: 32,
      image: juice,
      description: "Food",
      memory: "Juice thagam chala sarlu manchuria fried rice pattukuni vellevallam.....😁"
    },
    {
      id: 20,
      name: "teas and trees",
      x: 50,
      y: 50,
      image: teas,
      description: "Food",
      memory: "Sofi birthday akkada chesam pizza thinnam naa pant tissue laaga vaadukunnav😂😂😂....."
    },
    {
      id: 21,
      name: "pheonix mall",
      x: 88,
      y: 2,
      image: phnx,
      description: "Mall",
      memory: "Murari chusam....😁"
    },
    {
      id: 22,
      name: "Brave Soda",
      x: 33,
      y: 21,
      image: brave,
      description: "Drink",
      memory: "After nptel exam Thinesina taruvatha brave soda thagam chala nachindhi aa rooju neeku aa soda..."
    },
    {
      id: 23,
      name: "Exhibition",
      x: 1,
      y: 70,
      image: exi,
      description: "hehehehehhehhe",
      memory: "Giant wheel....😁"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen bg-gradient-to-br from-rose-100 via-pink-100 to-purple-100 relative overflow-hidden"
    >
      <div className="container mx-auto px-4 py-20">
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-5xl font-serif text-gray-800 text-center mb-16"
        >
          Our Guntur Memory Map
        </motion.h1>

        <div className="max-w-4xl mx-auto">
          {/* Map Container */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative bg-gradient-to-br from-green-100 to-blue-100 rounded-2xl p-8 shadow-2xl border-4 border-white/50"
            style={{ aspectRatio: '16/9' }}
          >
            {/* Map Background Pattern */}
            <div className="absolute inset-0 opacity-20">
              <svg width="100%" height="100%" className="absolute inset-0">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#00000020" strokeWidth="1"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>

            {/* Map Title */}
            <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm rounded-lg p-3 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                <Heart className="mr-2 text-red-500" size={20} />
                Guntur - City of Our Hearts
              </h3>
            </div>

            {/* Places */}
            {places.map((place) => (
              <motion.button
                key={place.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1 + place.id * 0.2 }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedPlace(place)}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                style={{
                  left: `${place.x}%`,
                  top: `${place.y}%`,
                }}
              >
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: place.id * 0.3,
                  }}
                  className="relative"
                >
                  <MapPin 
                    size={32} 
                    className="text-red-500 fill-current drop-shadow-lg"
                  />
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-2 bg-red-500/30 rounded-full blur-sm" />
                </motion.div>
                
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                  <p className="text-sm font-medium text-gray-800">{place.name}</p>
                </div>
              </motion.button>
            ))}

            {/* Decorative Elements */}
            <div className="absolute bottom-4 right-4 opacity-30">
              <div className="text-6xl">🗺️</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Place Details Modal */}
      {selectedPlace && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden"
          >
            <button
              onClick={() => setSelectedPlace(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-white/80 hover:bg-white rounded-full shadow-lg"
            >
              <X size={20} />
            </button>

            <div className="relative h-48 overflow-hidden">
              <img
                src={selectedPlace.image}
                alt={selectedPlace.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-xl font-bold mb-1">{selectedPlace.name}</h3>
                <p className="text-sm opacity-90">{selectedPlace.description}</p>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center mb-4">
                <Heart className="text-red-500 mr-2" size={20} />
                <h4 className="font-semibold text-gray-800">Our Memory</h4>
              </div>
              <p className="text-gray-600 leading-relaxed italic">
                "{selectedPlace.memory}"
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default GunturMap;