"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  WordSearchLevel,
  WordPosition,
} from "@/types/wordSearch";
import { WORD_SEARCH_LEVELS } from "@/data/wordSearchLevels";
import WordSearchGrid from "./WordSearchGrid";
import WordList from "./WordList";

// Componente para el modal de éxito
const SuccessModal = ({
  show,
  onClose,
  onNextLevel,
  isLastLevel,
}: {
  show: boolean;
  onClose: () => void;
  onNextLevel: () => void;
  isLastLevel: boolean;
}) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white dark:bg-slate-800 rounded-xl p-6 max-w-md w-full mx-4"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            <h2 className="text-2xl font-bold text-amber-700 dark:text-amber-400 mb-4">
              ¡Felicidades!
            </h2>
            <p className="text-slate-700 dark:text-slate-300 mb-6">
              Has encontrado todas las palabras. ¡Excelente trabajo!
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              {!isLastLevel && (
                <motion.button
                  className="bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded-lg font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onNextLevel}
                >
                  Siguiente Nivel
                </motion.button>
              )}
              <motion.button
                className="bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-800 dark:text-white py-2 px-4 rounded-lg font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
              >
                Volver a los Niveles
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Componente para el modal de tiempo agotado
const TimeUpModal = ({
  show,
  onClose,
  onRetry,
}: {
  show: boolean;
  onClose: () => void;
  onRetry: () => void;
}) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white dark:bg-slate-800 rounded-xl p-6 max-w-md w-full mx-4"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">
              ¡Tiempo Agotado!
            </h2>
            <p className="text-slate-700 dark:text-slate-300 mb-6">
              Se acabó el tiempo. ¡Inténtalo de nuevo!
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <motion.button
                className="bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded-lg font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onRetry}
              >
                Intentar de Nuevo
              </motion.button>
              <motion.button
                className="bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-800 dark:text-white py-2 px-4 rounded-lg font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
              >
                Volver a los Niveles
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default function WordSearch() {
  const [levels] = useState<WordSearchLevel[]>(WORD_SEARCH_LEVELS);
  const [currentLevelIndex, setCurrentLevelIndex] = useState<number | null>(
    null
  );
  const [currentLevel, setCurrentLevel] = useState<WordSearchLevel | null>(
    null
  );
  const [foundWords, setFoundWords] = useState<WordPosition[]>([]);
  const [selectionStart, setSelectionStart] = useState<{
    row: number;
    col: number;
  } | null>(null);
  const [selectionEnd, setSelectionEnd] = useState<{
    row: number;
    col: number;
  } | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showTimeUpModal, setShowTimeUpModal] = useState(false);

  // Iniciar un nivel
  const startLevel = (index: number) => {
    const level = levels[index];
    setCurrentLevelIndex(index);
    setCurrentLevel(level);
    setFoundWords(
      level.words.map((word) => ({ word, found: false, positions: [] }))
    );
    setSelectionStart(null);
    setSelectionEnd(null);
    setTimeLeft(level.timeLimit || 180);
    setGameStarted(true);
    setGameOver(false);
    setShowSuccessModal(false);
    setShowTimeUpModal(false);
  };

  // Verificar si todas las palabras han sido encontradas
  const checkAllWordsFound = useCallback(() => {
    if (!foundWords.length) return false;
    return foundWords.every((word) => word.found);
  }, [foundWords]);

  // Manejar el temporizador
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (gameStarted && !gameOver && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && gameStarted && !gameOver) {
      setGameOver(true);
      setShowTimeUpModal(true);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [timeLeft, gameStarted, gameOver]);

  // Verificar victoria
  useEffect(() => {
    if (gameStarted && !gameOver && checkAllWordsFound()) {
      setGameOver(true);
      setShowSuccessModal(true);
    }
  }, [foundWords, gameStarted, gameOver, checkAllWordsFound]);

  // Manejar clic en celda
  const handleCellClick = (row: number, col: number) => {
    if (gameOver) return;

    setSelectionStart({ row, col });
    setSelectionEnd({ row, col });
  };

  // Manejar arrastre en celda
  const handleCellDrag = (row: number, col: number) => {
    if (gameOver || !selectionStart) return;

    setSelectionEnd({ row, col });
    checkWordSelection(selectionStart, { row, col });
  };

  // Verificar si la selección actual forma una palabra válida
  const checkWordSelection = (
    start: { row: number; col: number },
    end: { row: number; col: number }
  ) => {
    if (!currentLevel) return;

    // Determinar la dirección de la selección
    const rowDiff = end.row - start.row;
    const colDiff = end.col - start.col;

    // Solo permitir selecciones en línea recta (horizontal, vertical o diagonal)
    if (
      rowDiff !== 0 &&
      colDiff !== 0 &&
      Math.abs(rowDiff) !== Math.abs(colDiff)
    ) {
      return;
    }

    // Calcular los pasos para recorrer la selección
    const steps = Math.max(Math.abs(rowDiff), Math.abs(colDiff));
    const rowStep = rowDiff === 0 ? 0 : rowDiff / Math.abs(rowDiff);
    const colStep = colDiff === 0 ? 0 : colDiff / Math.abs(colDiff);

    // Construir la palabra seleccionada
    let selectedWord = "";
    const positions: { row: number; col: number }[] = [];

    for (let i = 0; i <= steps; i++) {
      const r = start.row + i * rowStep;
      const c = start.col + i * colStep;
      selectedWord += currentLevel.grid[r][c];
      positions.push({ row: r, col: c });
    }

    // Verificar si la palabra seleccionada está en la lista de palabras
    let wordIndex = currentLevel.words.findIndex(
      (word) => word === selectedWord
    );

    // Si no se encontró la palabra, verificar si es una palabra al revés
    let isReversed = false;
    if (wordIndex === -1) {
      const reversedWord = selectedWord.split("").reverse().join("");
      wordIndex = currentLevel.words.findIndex(
        (word) => word === reversedWord
      );
      isReversed = wordIndex !== -1;
    }

    if (wordIndex !== -1) {
      const word = currentLevel.words[wordIndex];

      // Si la palabra está al revés, invertir las posiciones para que coincidan con la palabra original
      const finalPositions = isReversed ? [...positions].reverse() : positions;

      // Actualizar la lista de palabras encontradas
      setFoundWords((prev) =>
        prev.map((w) =>
          w.word === word ? { ...w, found: true, positions: finalPositions } : w
        )
      );

      // Limpiar la selección
      setTimeout(() => {
        setSelectionStart(null);
        setSelectionEnd(null);
      }, 500);
    }
  };

  // Nota: Esta función no se usa actualmente, pero se mantiene comentada por si se necesita en el futuro
  /*
  // Manejar el fin de la selección
  const handleSelectionEnd = () => {
    if (!selectionStart || !selectionEnd) return;

    checkWordSelection(selectionStart, selectionEnd);
    setSelectionStart(null);
    setSelectionEnd(null);
  };
  */

  // Formatear el tiempo restante
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // Renderizar la pantalla de selección de nivel
  if (currentLevel === null) {
    return (
      <section className="py-16 bg-gradient-to-b from-amber-50 to-amber-100 dark:from-slate-900 dark:to-slate-800 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-amber-800 dark:text-amber-400 mb-4">
              Sopa de Letras
            </h1>
            <p className="text-xl text-slate-700 dark:text-slate-300 max-w-3xl mx-auto">
              Encuentra palabras ocultas relacionadas con mitos y leyendas en
              esta divertida sopa de letras.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {levels.map((level, index) => (
              <motion.div
                key={level.id}
                className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all cursor-pointer"
                whileHover={{ y: -10 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => startLevel(index)}
              >
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-amber-700 dark:text-amber-400 mb-2">
                    {level.name}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 mb-4">
                    {level.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                      {level.words.length} palabras
                    </span>
                    <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                      Tiempo: {formatTime(level.timeLimit || 180)}
                    </span>
                  </div>
                </div>
                <div className="px-6 pb-6">
                  <motion.div
                    className="bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded-lg text-center font-medium"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Jugar Nivel
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  }



  // Renderizar el juego
  return (
    <section className="py-8 bg-gradient-to-b from-amber-50 to-amber-100 dark:from-slate-900 dark:to-slate-800 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Temporizador fijo en la parte superior */}
        <div className="fixed top-4 right-4 z-10">
          <div className="bg-white dark:bg-slate-800 py-2 px-4 rounded-lg shadow-md flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2 text-amber-600 dark:text-amber-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                clipRule="evenodd"
              />
            </svg>
            <span className="font-bold text-lg text-amber-700 dark:text-amber-400">
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>
        


        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-amber-800 dark:text-amber-400">
            {currentLevel.name}
          </h1>
          <p className="text-slate-700 dark:text-slate-300">
            {currentLevel.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <WordSearchGrid
              grid={currentLevel.grid}
              foundWords={foundWords}
              onCellClick={handleCellClick}
              onCellDrag={handleCellDrag}
              selectionStart={selectionStart}
              selectionEnd={selectionEnd}
              gameOver={gameOver}
            />
          </div>
          <div>
            <WordList words={currentLevel.words} foundWords={foundWords} />
          </div>
        </div>
      </div>

      <SuccessModal
        show={showSuccessModal}
        onClose={() => setCurrentLevel(null)}
        onNextLevel={() => {
          if (
            currentLevelIndex !== null &&
            currentLevelIndex < levels.length - 1
          ) {
            startLevel(currentLevelIndex + 1);
          }
        }}
        isLastLevel={currentLevelIndex === levels.length - 1}
      />

      <TimeUpModal
        show={showTimeUpModal}
        onClose={() => setCurrentLevel(null)}
        onRetry={() => {
          if (currentLevelIndex !== null) {
            startLevel(currentLevelIndex);
          }
        }}
      />
    </section>
  );
}
