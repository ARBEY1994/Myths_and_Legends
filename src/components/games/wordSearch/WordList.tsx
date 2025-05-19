"use client";

import { motion } from "framer-motion";
import { WordPosition } from "@/types/wordSearch";

interface WordListProps {
  words: string[];
  foundWords: WordPosition[];
}

export default function WordList({ words, foundWords }: WordListProps) {
  // Verificar si una palabra ha sido encontrada
  const isWordFound = (word: string) => {
    return foundWords.some(wordPos => wordPos.word === word && wordPos.found);
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-md">
      <h3 className="text-xl font-bold text-amber-700 dark:text-amber-400 mb-3">
        Palabras a encontrar
      </h3>
      <ul className="space-y-2">
        {words.map((word, index) => {
          const found = isWordFound(word);
          
          return (
            <motion.li
              key={index}
              className={`py-2 px-4 rounded-lg text-lg font-medium transition-all flex items-center
                ${found 
                  ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 border border-green-300 dark:border-green-700" 
                  : "bg-amber-50 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
                }`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              {found && (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-600 dark:text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              )}
              <span className={found ? "line-through" : ""}>{word}</span>
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}