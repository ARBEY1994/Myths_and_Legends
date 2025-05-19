"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { WordPosition } from "@/types/wordSearch";

interface WordSearchGridProps {
  grid: string[][];
  foundWords: WordPosition[];
  onCellClick: (row: number, col: number) => void;
  onCellDrag: (row: number, col: number) => void;
  selectionStart: { row: number; col: number } | null;
  selectionEnd: { row: number; col: number } | null;
  gameOver: boolean;
}

export default function WordSearchGrid({
  grid,
  foundWords,
  onCellClick,
  onCellDrag,
  selectionStart,
  selectionEnd,
  gameOver,
}: WordSearchGridProps) {
  const [isDragging, setIsDragging] = useState(false);

  // Determinar si una celda estu00e1 en la selecciu00f3n actual
  const isCellInCurrentSelection = (row: number, col: number) => {
    if (!selectionStart || !selectionEnd) return false;

    // Horizontal
    if (selectionStart.row === selectionEnd.row) {
      const minCol = Math.min(selectionStart.col, selectionEnd.col);
      const maxCol = Math.max(selectionStart.col, selectionEnd.col);
      return row === selectionStart.row && col >= minCol && col <= maxCol;
    }

    // Vertical
    if (selectionStart.col === selectionEnd.col) {
      const minRow = Math.min(selectionStart.row, selectionEnd.row);
      const maxRow = Math.max(selectionStart.row, selectionEnd.row);
      return col === selectionStart.col && row >= minRow && row <= maxRow;
    }

    // Diagonal
    const rowDiff = selectionEnd.row - selectionStart.row;
    const colDiff = selectionEnd.col - selectionStart.col;

    if (Math.abs(rowDiff) === Math.abs(colDiff)) {
      const steps = Math.abs(rowDiff);
      const rowStep = rowDiff > 0 ? 1 : -1;
      const colStep = colDiff > 0 ? 1 : -1;

      for (let i = 0; i <= steps; i++) {
        const checkRow = selectionStart.row + i * rowStep;
        const checkCol = selectionStart.col + i * colStep;
        if (row === checkRow && col === checkCol) return true;
      }
    }

    return false;
  };

  // Determinar si una celda estu00e1 en una palabra encontrada
  const isCellInFoundWord = (row: number, col: number) => {
    return foundWords.some(
      (wordPos) =>
        wordPos.found &&
        wordPos.positions &&
        wordPos.positions.some((pos) => pos.row === row && pos.col === col)
    );
  };

  useEffect(() => {
    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches.length > 0) {
        const touch = e.touches[0];
        const element = document.elementFromPoint(touch.clientX, touch.clientY);

        if (element?.classList.contains("word-cell")) {
          const row = parseInt(element.getAttribute("data-row") || "-1");
          const col = parseInt(element.getAttribute("data-col") || "-1");

          if (row !== -1 && col !== -1) {
            onCellDrag(row, col);
          }
        }
      }
    };

    const handleTouchEnd = () => {
      setIsDragging(false);
    };

    document.addEventListener("touchmove", handleTouchMove);
    document.addEventListener("touchend", handleTouchEnd);

    return () => {
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isDragging, onCellDrag]);

  return (
    <div className="grid grid-cols-10 gap-1 md:gap-2 max-w-lg mx-auto">
      {grid.map((row, rowIndex) =>
        row.map((letter, colIndex) => {
          const isInCurrentSelection = isCellInCurrentSelection(
            rowIndex,
            colIndex
          );
          const isInFoundWord = isCellInFoundWord(rowIndex, colIndex);

          return (
            <motion.div
              key={`${rowIndex}-${colIndex}`}
              className={`word-cell select-none aspect-square flex items-center justify-center rounded-md text-lg md:text-xl font-bold cursor-pointer
                ${
                  isInCurrentSelection
                    ? "bg-amber-300 dark:bg-amber-600"
                    : "bg-white dark:bg-slate-700"
                }
                ${
                  isInFoundWord
                    ? "bg-green-300 dark:bg-green-600 text-green-800 dark:text-green-100 ring-2 ring-green-500 dark:ring-green-400"
                    : ""
                }
                ${
                  gameOver && !isInFoundWord
                    ? "bg-gray-200 dark:bg-slate-800 text-gray-400 dark:text-gray-600"
                    : ""
                }
                transition-all duration-200`}
              whileHover={!gameOver ? { scale: 1.05 } : {}}
              whileTap={!gameOver ? { scale: 0.95 } : {}}
              data-row={rowIndex}
              data-col={colIndex}
              onMouseDown={() => {
                if (!gameOver) {
                  onCellClick(rowIndex, colIndex);
                  setIsDragging(true);
                }
              }}
              onMouseEnter={() => {
                if (isDragging && !gameOver) {
                  onCellDrag(rowIndex, colIndex);
                }
              }}
              onMouseUp={() => setIsDragging(false)}
              onTouchStart={() => {
                if (!gameOver) {
                  onCellClick(rowIndex, colIndex);
                  setIsDragging(true);
                }
              }}
            >
              {letter}
            </motion.div>
          );
        })
      )}
    </div>
  );
}
