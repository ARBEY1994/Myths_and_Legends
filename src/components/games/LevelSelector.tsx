"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { GameLevel } from "@/types/games";

interface LevelSelectorProps {
  levels: GameLevel[];
  currentLevelId: string;
  onLevelSelect: (level: GameLevel) => void;
  show: boolean;
}

export default function LevelSelector({
  levels,
  currentLevelId,
  onLevelSelect,
  show,
}: LevelSelectorProps) {
  if (!show) return null;

  return (
    <motion.div
      className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {levels.map((level, index) => (
        <motion.div
          key={level.id}
          onClick={() => onLevelSelect(level)}
          className={`p-3 rounded-lg cursor-pointer transition-all shadow-md ${
            currentLevelId === level.id
              ? "bg-amber-200 dark:bg-amber-900 ring-2 ring-amber-500"
              : "bg-white dark:bg-slate-700 hover:bg-amber-100 dark:hover:bg-slate-600"
          }`}
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <div className="relative w-full h-24 mb-2 overflow-hidden rounded">
            <Image
              src={level.modifiedImage}
              alt={level.name || `Imagen ${index + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-1 right-1 bg-amber-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {level.differences.length}
            </div>
          </div>
          <h3 className="font-medium text-sm truncate">
            {level.name || `Imagen ${index + 1}`}
          </h3>
        </motion.div>
      ))}
    </motion.div>
  );
}
