"use client";

import { motion } from "framer-motion";

interface GameControlsProps {
  onPrevLevel: () => void;
  onNextLevel: () => void;
  onToggleLevelSelector: () => void;
  showLevelSelector: boolean;
}

export default function GameControls({
  onPrevLevel,
  onNextLevel,
  onToggleLevelSelector,
  showLevelSelector,
}: GameControlsProps) {
  return (
    <div className="flex flex-wrap justify-center gap-3 mt-4">
      <button
        onClick={onToggleLevelSelector}
        className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors flex items-center gap-2"
      >
        {showLevelSelector ? "Ocultar niveles" : "Ver todas las imágenes"}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      </button>
      <motion.div className="flex gap-2">
        <button
          onClick={onPrevLevel}
          className="px-4 py-2 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-white rounded-lg transition-colors"
        >
          Anterior
        </button>
        <button
          onClick={onNextLevel}
          className="px-4 py-2 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-white rounded-lg transition-colors"
        >
          Siguiente
        </button>
      </motion.div>
    </div>
  );
}
