"use client";

import { useState, useRef, useEffect } from 'react';
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import { FaBookOpen } from "react-icons/fa";
import { motion } from "framer-motion";

interface AudioStory {
  id: number;
  title: string;
  description: string;
  audioUrl: string;
  imageUrl: string;
  duration: string;
}

const AudioStoriesSection = () => {
  const [currentStory, setCurrentStory] = useState<AudioStory | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStoryIndex, setCurrentStoryIndex] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const stories: AudioStory[] = [
    {
      id: 1,
      title: "El Misterio del Triángulo de las Bermudas",
      description: "Explora los enigmas y teorías detrás de la zona más misteriosa del océano, donde barcos y aviones han desaparecido sin dejar rastro.",
      audioUrl: "/audio/triangulo-bermudas.mp3",
      imageUrl: "https://res.cloudinary.com/dwwdj1lkw/image/upload/v1748718028/mitos%20y%20leyendas/AudioHistorias/trianguloImagen_q3m3os.png",
      duration: "03:55"
    },
   
  ];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', () => {
      setIsPlaying(false);
      setProgress(0);
    });

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', () => setIsPlaying(false));
    };
  }, [currentStory]);

  const handleStoryPlay = (story: AudioStory, index: number) => {
    if (currentStory?.id !== story.id) {
      setCurrentStory(story);
      setCurrentStoryIndex(index);
      setIsPlaying(true);
      // Reset progress when changing story
      setProgress(0);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const handleMainPlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.error("Error playing audio:", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.5, 
        ease: [0.16, 1, 0.3, 1] 
      } 
    },
    hover: {
      scale: 1.02,
      transition: { duration: 0.2 }
    }
  };

  return (
    <motion.section 
      className="py-16 px-4"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      variants={container}
    >
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-amber-800 dark:text-amber-400">
          <FaBookOpen className="inline-block mr-3" />
          Narraciones de Audio
        </h2>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={container}
        >
          {stories.map((story, index) => (
            <motion.div
              key={index}
              className={`bg-white/80 dark:bg-slate-800/80 rounded-xl p-6 shadow-lg backdrop-blur-sm border border-amber-100/50 dark:border-slate-700/50 ${
                currentStoryIndex === index ? 'ring-2 ring-amber-500' : ''
              }`}
              variants={item}
              whileHover="hover"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={story.imageUrl} 
                  alt={story.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4 text-white">
                  <h3 className="text-xl font-bold">{story.title}</h3>
                  <p className="text-sm opacity-90">{story.duration}</p>
                </div>
              </div>
              
              <div className="p-4">
                <p className="text-gray-700 dark:text-gray-300 mb-4">{story.description}</p>
                
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => handleStoryPlay(story, index)}
                    className="bg-amber-600 hover:bg-amber-700 text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors"
                    aria-label={currentStoryIndex === index && isPlaying ? 'Pausar' : 'Reproducir'}
                  >
                    {currentStoryIndex === index && isPlaying ? <FaPause /> : <FaPlay className="ml-1" />}
                  </button>
                  
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {story.duration}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Audio Player (hidden) */}
        <audio
          ref={audioRef}
          src={currentStory?.audioUrl}
          loop={false}
          className="hidden"
        />
        
        {/* Fixed Audio Controls */}
        {currentStory && (
          <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-800 shadow-lg border-t border-gray-200 dark:border-gray-700 p-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <motion.button
                    onClick={handleMainPlayPause}
                    className="w-12 h-12 rounded-full bg-amber-600 text-white flex items-center justify-center hover:bg-amber-700 transition-colors"
                    aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isPlaying ? <FaPause /> : <FaPlay className="ml-1" />}
                  </motion.button>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">{currentStory.title}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Reproduciendo</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <motion.button
                    onClick={toggleMute}
                    className="ml-4 p-2 text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300 transition-colors"
                    aria-label={isMuted ? 'Activar sonido' : 'Silenciar'}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {isMuted ? <FaVolumeMute size={20} /> : <FaVolumeUp size={20} />}
                  </motion.button>
                </div>
              </div>
              
              <div className="mt-2">
                <div className="h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-amber-600 transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.section>
  );
};

export default AudioStoriesSection;
