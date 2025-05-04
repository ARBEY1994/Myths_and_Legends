"use client";

import { motion } from "framer-motion";
import MythicalLoader from "@/components/MythicalLoader";
import LoadingSpinner from "@/components/LoadingSpinner";

interface LoadingPageProps {
  message?: string;
  fullScreen?: boolean;
  variant?: "simple" | "mythical";
}

export default function LoadingPage({
  message = "Cargando contenido...",
  fullScreen = true,
  variant = "mythical",
}: LoadingPageProps) {
  const containerVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { duration: 0.5 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.3 } 
    }
  };

  const textVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: 0.3,
        duration: 0.5
      }
    }
  };

  return (
    <motion.div 
      className={`flex flex-col items-center justify-center bg-slate-800 text-amber-50 ${
        fullScreen ? "fixed inset-0 z-50" : "p-10"
      }`}
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="mb-8">
        {variant === "mythical" ? (
          <MythicalLoader size={100} />
        ) : (
          <LoadingSpinner size={60} />
        )}
      </div>
      
      <motion.div
        variants={textVariants}
        initial="initial"
        animate="animate"
        className="text-center"
      >
        <h3 className="text-xl font-cinzel mb-2">{message}</h3>
        <p className="text-amber-300 text-sm font-spectral">
          Descubriendo historias ancestrales...
        </p>
      </motion.div>
    </motion.div>
  );
}
