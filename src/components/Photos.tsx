import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Lock, Unlock } from 'lucide-react';
import img1 from '../assests/images/image1.jpg';
import img2 from '../assests/images/image2.jpg';
import img3 from '../assests/images/image3.jpg';
import img4 from '../assests/images/image4.jpg';
import img5 from '../assests/images/image5.jpg';
import img6 from '../assests/images/image6.jpg';
import img7 from '../assests/images/image7.jpg';
import img8 from '../assests/images/image8.jpg';
import img9 from '../assests/images/image9.jpg';
import img10 from '../assests/images/image10.jpg';


interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface Photo {
  id: number;
  url: string;
  title: string;
  description: string;
}

const Photos: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showGallery, setShowGallery] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [feedback, setFeedback] = useState<string>('');

  const questionPool: Question[] = [
    {
      id: 1,
      question: "Select the one who is most Handsome?",
      options: ["Mahesh Babu", "Maddukuri Sai Charan", "BTS", "Hritik Roshan"],
      correctAnswer: 1
    },
    {
      id: 2,
      question: "How would you describe Charan?",
      options: ["Ugly", "Good", "Stylish", "More stylist more beautiful than me"],
      correctAnswer: 3
    },
    {
      id: 3,
      question:"Is charan more cute than you, do you adore charan?",
      options: ["Yes", "Yes", "Yes", "Yes"],
      correctAnswer: 2
    },
    {
      id: 4,
      question: "What is the date of the first mssg i sent you?",
      options: ["jan 2", "jan 10", "feb 9", "feb 3"],
      correctAnswer: 3
    },
    {
      id: 5,
      question: "What time did i send you the first mssg at?",
      options: ["5:01 Am", "5:03 pm", "4:59 pm", "5:05 pm"],
      correctAnswer: 3
    },
    {
      id: 6,
      question: "Who has the best dressing sense you or charan?",
      options: ["Me", "Me", "Me", "Charan"],
      correctAnswer: 3
    },
    {
      id: 7,
      question: "Which food in the first fest you asked me to share but i didn't?",
      options: ["Biriyani", "Ice cream", "Chicken Wings", "Shawarma"],
      correctAnswer: 3
    },
    {
      id: 8,
      question: "What is 1+1",
      options: ["1", "11", "2", "1+1"],
      correctAnswer: 1
    },
    {
      id: 9,
      question: "?",
      options: ["Hehehehehhehe", "Lalallalllalaa", "Tatatataattta", "Huhuhuhuhuuuhuuhuhhhu"],
      correctAnswer: 0
    },
    {
      id: 10,
      question: "In which month i said hi to you",
      options: ["Sep", "oct", "Nov", "Dec"],
      correctAnswer: 1
    }
  ];

  const photos: Photo[] = [
    {
      id: 1,
      url: img1,
      title: "Our first photo",
      description: "first photo....that siggu padatam ala....mari close kaadhu that simple feeling malli adhi radhu first time dhigina photo appudu feeling..😊"
    },
    {
      id: 2,
      url: img2,
      title: "Matching outfits",
      description: "First time matching outfit vesam anukuni match ayye earrings...😎"
    },
    {
      id: 3,
      url: img3,
      title: "First photo in college dress",
      description: "College dress loo oka photo kuuda ledhu ani appudu sudden gaa dhigam...😁"
    },
    {
      id: 4,
      url: img4,
      title: "Heheheehe",
      description: "Ee pic kuuda ala mamulugane dhigam but first time oka photo loo baga vacha ani cheppav😂😂"
    },
    {
      id: 5,
      url: img5,
      title: "Function loo pic",
      description: "Chala seepu wait chesav time ki vastaano raano ani appuduu😂......but style gaa untam ee pic loo nenu kuuda baguntaa😁"
    },
    {
      id: 6,
      url: img6,
      title: "Second Fest",
      description: "Merisipothunnav asalaa heroine laagaaa....laaga enti heroine ee😎"
    },
    {
      id: 7,
      url: img7,
      title: "Third Fest",
      description: "This pic emo its different kothaga style loo dhigam naaku chala nachindhi this pic....😁"
    },
    {
      id: 8,
      url: img8,
      title: "First Bus",
      description: "First bus jounrey....first time bayata kalavadam alaa....😊"
    },
    {
      id: 9,
      url: img9,
      title: "The pic",
      description: "See my face i cant explain it but....the emotion in the pic is tooo gooddd😁😁😁"
    },
    {
      id: 10,
      url: img10,
      title: "Birthday Pic",
      description: "Your birthday pic...dhigedappudu kuuda chustaaru emo ani anukuni fast fast gaa dhigam..😂😂😂"
    }
  ];

  useEffect(() => {
    // Select 3 random questions
    const shuffled = [...questionPool].sort(() => 0.5 - Math.random());
    setSelectedQuestions(shuffled.slice(0, 3));
  }, []);

  const handleAnswer = (answerIndex: number) => {
    const currentQuestion = selectedQuestions[currentQuestionIndex];
    const isCorrect = answerIndex === currentQuestion.correctAnswer;
    
    if (isCorrect) {
      const newAnswers = [...answers, answerIndex];
      setAnswers(newAnswers);
      setFeedback("Correct! ✨");
      
      setTimeout(() => {
        if (currentQuestionIndex < 2) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
          setFeedback('');
        } else {
          setShowGallery(true);
          setFeedback('');
        }
      }, 1500);
    } else {
      setFeedback("Try again! 🤔");
      setTimeout(() => setFeedback(''), 1500);
    }
  };

  if (showGallery) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 p-8"
      >
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-4xl font-serif text-gray-800 text-center mb-12"
        >
          Photo Gallery
        </motion.h1>

        {/* Photo Grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedPhoto(photo)}
              className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300"
            >
              <div className="aspect-w-16 aspect-h-12 overflow-hidden">
                <img
                  src={photo.url}
                  alt={photo.title}
                  className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-2">{photo.title}</h3>
                <p className="text-gray-600 text-sm line-clamp-2">{photo.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Photo Modal */}
        <AnimatePresence>
          {selectedPhoto && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="relative bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
              >
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="absolute top-4 right-4 z-10 p-2 bg-black/20 hover:bg-black/40 rounded-full transition-colors"
                >
                  <X size={24} className="text-white" />
                </button>

                <div className="flex flex-col lg:flex-row">
                  <div className="lg:w-2/3">
                    <img
                      src={selectedPhoto.url}
                      alt={selectedPhoto.title}
                      className="w-full h-64 lg:h-96 object-cover"
                    />
                  </div>
                  <div className="lg:w-1/3 p-8 flex flex-col justify-center">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">
                      {selectedPhoto.title}
                    </h2>
                    <p className="text-gray-600 leading-relaxed text-lg">
                      {selectedPhoto.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4"
    >
      <div className="max-w-2xl w-full">
        {/* Gate Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-6">
            <Lock className="text-white mr-3" size={32} />
            <h1 className="text-4xl font-serif text-white">Photo Gallery Gate</h1>
          </div>
          <p className="text-white/80 text-lg">
            Answer 3 questions correctly to unlock the gallery
          </p>
        </motion.div>

        {/* Progress Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center mb-8"
        >
          <div className="flex space-x-4">
            {[0, 1, 2].map((index) => (
              <div
                key={index}
                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  index < answers.length
                    ? 'bg-green-400'
                    : index === currentQuestionIndex
                    ? 'bg-white'
                    : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* Question Card */}
        {selectedQuestions.length > 0 && (
          <motion.div
            key={currentQuestionIndex}
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/20"
          >
            <h2 className="text-2xl font-semibold text-white mb-8 text-center">
              {selectedQuestions[currentQuestionIndex]?.question}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedQuestions[currentQuestionIndex]?.options.map((option, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(index)}
                  className="p-4 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all duration-200 text-left border border-white/30 hover:border-white/50"
                >
                  {option}
                </motion.button>
              ))}
            </div>

            {/* Feedback */}
            <AnimatePresence>
              {feedback && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mt-6 text-center"
                >
                  <div className={`inline-flex items-center px-4 py-2 rounded-lg ${
                    feedback.includes('Correct') 
                      ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
                      : 'bg-red-500/20 text-red-300 border border-red-500/30'
                  }`}>
                    {feedback.includes('Correct') && <Check className="mr-2" size={16} />}
                    {feedback}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Success Message */}
        {answers.length === 3 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 }}
            className="text-center mt-8"
          >
            <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-6">
              <Unlock className="mx-auto mb-4 text-green-300" size={48} />
              <h3 className="text-2xl font-bold text-green-300 mb-2">
                Congratulations!
              </h3>
              <p className="text-green-200">
                You've successfully unlocked the photo gallery!
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Photos;