"use client";

import { motion } from "framer-motion";
import { GAME_LEVELS } from "@/data/gameLevels";

interface SuccessModalProps {
  showCongrats: boolean;
  showSuccess: boolean;
  currentLevelId: string;
  onNextLevel: () => void;
  onResetLevel: () => void;
  onClose: () => void;
}

export default function SuccessModal({
  showCongrats,
  showSuccess,
  currentLevelId,
  onNextLevel,
  onResetLevel,
  onClose,
}: SuccessModalProps) {
  if (!showSuccess && !showCongrats) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-xl max-w-md w-full mx-4"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
      >
        <h3 className="text-2xl font-bold text-green-600 dark:text-green-400 mb-4 text-center">
          {showCongrats ? "¡Felicidades! 🎉" : "¡Nivel Completado!"}
        </h3>
        <p className="mb-6 text-slate-700 dark:text-slate-300 text-center">
          {showCongrats
            ? "Has encontrado todas las diferencias. ¡Eres muy atento a los detalles!"
            : "Has encontrado todas las diferencias en este nivel."}
        </p>
        <div className="flex flex-col space-y-3">
          <button
            onClick={() => {
              onNextLevel();
              onClose();
            }}
            className="px-6 py-3 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors font-medium text-lg"
          >
            {currentLevelId === GAME_LEVELS[GAME_LEVELS.length - 1].id
              ? "Volver al Inicio"
              : "Siguiente Reto"}
          </button>
          <button
            onClick={() => {
              onResetLevel();
              onClose();
            }}
            className="px-6 py-3 bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white rounded-md hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
          >
            Repetir Nivel
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
