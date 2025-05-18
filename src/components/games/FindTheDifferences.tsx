"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { GameLevel, Difference } from "@/types/games";
import { GAME_LEVELS } from "@/data/gameLevels";
import SuccessModal from "./SuccessModal";
import LevelSelector from "./LevelSelector";
import GameControls from "./GameControls";

export default function FindTheDifferences() {
  const [currentLevel, setCurrentLevel] = useState<GameLevel>(GAME_LEVELS[0]);
  const [differences, setDifferences] = useState<Difference[]>(
    GAME_LEVELS[0].differences
  );
  const [gameOver, setGameOver] = useState(false);
  // Eliminamos las variables showHint y hintCount ya que no se utilizan
  const [showCongrats, setShowCongrats] = useState(false);
  const [showLevelSelector, setShowLevelSelector] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [showFailedMessage, setShowFailedMessage] = useState(false);

  const loadLevel = (level: GameLevel) => {
    setCurrentLevel(level);
    setDifferences(
      level.differences.map((diff) => ({ ...diff, found: false }))
    );
    setGameOver(false);
    setFailedAttempts(0);
    setShowFailedMessage(false);
    // Ya no necesitamos encontrar el índice del nivel actual aquí
    setShowLevelSelector(false);
  };

  const resetGame = () => {
    loadLevel(currentLevel);
  };

  // Función para calcular las coordenadas relativas a la imagen real, no al contenedor
  const calculateImageCoordinates = (
    e: React.MouseEvent<HTMLDivElement>,
    imageElement: HTMLImageElement | null
  ) => {
    if (!imageElement) return { x: 0, y: 0 };

    const containerRect = e.currentTarget.getBoundingClientRect();
    const imageRect = imageElement.getBoundingClientRect();

    // Calcular la posición de la imagen dentro del contenedor
    const imageLeft = imageRect.left - containerRect.left;
    const imageTop = imageRect.top - containerRect.top;
    const imageWidth = imageRect.width;
    const imageHeight = imageRect.height;

    // Calcular las coordenadas del clic relativas a la imagen
    const imageX = e.clientX - containerRect.left - imageLeft;
    const imageY = e.clientY - containerRect.top - imageTop;

    // Convertir a porcentajes relativos al tamaño de la imagen
    const x = (imageX / imageWidth) * 100;
    const y = (imageY / imageHeight) * 100;

    return { x, y };
  };

  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Obtener la referencia a la imagen dentro del contenedor
    const imageElement = e.currentTarget.querySelector("img");

    if (e.ctrlKey) {
      // Modo depuración: mantén presionada la tecla Ctrl al hacer clic
      const { x, y } = calculateImageCoordinates(
        e,
        imageElement as HTMLImageElement
      );

      // Obtener el ancho de la ventana para identificar el tipo de dispositivo
      const windowWidth = window.innerWidth;
      let deviceType = "desktop";
      if (windowWidth < 768) {
        deviceType = "mobile";
      } else if (windowWidth < 1024) {
        deviceType = "tablet";
      }

      // Mostrar las coordenadas en la consola con el tipo de dispositivo
      console.log(
        `[${deviceType}] Coordenada para la diferencia: { x: ${x.toFixed(
          1
        )}, y: ${y.toFixed(1)}, radius: 5, found: false }`
      );

      // Mostrar un mensaje en pantalla con las coordenadas
      const coordInfo = document.createElement("div");
      coordInfo.style.position = "fixed";
      coordInfo.style.top = "10px";
      coordInfo.style.left = "10px";
      coordInfo.style.backgroundColor = "rgba(0,0,0,0.8)";
      coordInfo.style.color = "white";
      coordInfo.style.padding = "10px";
      coordInfo.style.borderRadius = "5px";
      coordInfo.style.zIndex = "9999";
      coordInfo.style.maxWidth = "300px";
      coordInfo.innerHTML = `<strong>${deviceType}</strong><br>x: ${x.toFixed(
        1
      )}, y: ${y.toFixed(1)}`;
      document.body.appendChild(coordInfo);

      // Eliminar el mensaje después de 3 segundos
      setTimeout(() => {
        document.body.removeChild(coordInfo);
      }, 3000);

      return;
    }

    if (gameOver) return;

    const { x, y } = calculateImageCoordinates(
      e,
      imageElement as HTMLImageElement
    );

    let foundNew = false;

    const newDifferences = differences.map((diff) => {
      if (diff.found) return diff;

      const distance = Math.sqrt(
        Math.pow(x - diff.x, 2) + Math.pow(y - diff.y, 2)
      );

      if (distance < diff.radius) {
        foundNew = true;
        return { ...diff, found: true };
      }
      return diff;
    });

    if (foundNew) {
      setDifferences(newDifferences);

      // Check if all differences found
      if (newDifferences.every((diff) => diff.found)) {
        setGameOver(true);
        setShowCongrats(true);
        setTimeout(() => setShowCongrats(false), 3000);
      }
    } else {
      // Incrementar contador de intentos fallidos
      const newFailedAttempts = failedAttempts + 1;
      setFailedAttempts(newFailedAttempts);

      // Mostrar mensaje de intento fallido
      setShowFailedMessage(true);
      setTimeout(() => setShowFailedMessage(false), 1500);

      // Si llega a 5 intentos fallidos, reiniciar el juego
      if (newFailedAttempts >= 5) {
        // Mostrar mensaje de reinicio
        setShowFailedMessage(true);
        setTimeout(() => {
          setShowFailedMessage(false);
          resetGame(); // Reiniciar el nivel actual
        }, 2000);
      }
    }
  };

  const foundCount = differences.filter((d) => d.found).length;
  const totalDifferences = differences.length;

  // Verificar si todas las diferencias fueron encontradas
  useEffect(() => {
    if (
      differences.length > 0 &&
      differences.every((d) => d.found) &&
      !gameOver
    ) {
      setGameOver(true);
      setShowCongrats(true);
      setShowSuccess(true);
    }
  }, [differences, gameOver]);

  const handleNextLevel = () => {
    const currentLevelIndex = GAME_LEVELS.findIndex(
      (level) => level.id === currentLevel.id
    );
    const hasNextLevel = currentLevelIndex < GAME_LEVELS.length - 1;
    if (hasNextLevel) {
      loadLevel(GAME_LEVELS[currentLevelIndex + 1]);
    } else {
      loadLevel(GAME_LEVELS[0]);
    }
    setShowSuccess(false);
    setShowCongrats(false);
  };

  return (
    <section className="py-12  bg-gradient-to-b from-amber-100 to-amber-50 dark:from-slate-800 dark:to-slate-900">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-8">
          <p className="text-xl text-amber-700 dark:text-amber-300 mb-4">
            {currentLevel.name}
          </p>
          <p className="text-slate-600 dark:text-slate-300">
            {currentLevel.description}
          </p>
          <GameControls
            onPrevLevel={() => {
              const currentIndex = GAME_LEVELS.findIndex(
                (level) => level.id === currentLevel.id
              );
              const prevIndex =
                (currentIndex - 1 + GAME_LEVELS.length) % GAME_LEVELS.length;
              loadLevel(GAME_LEVELS[prevIndex]);
            }}
            onNextLevel={() => {
              const currentIndex = GAME_LEVELS.findIndex(
                (level) => level.id === currentLevel.id
              );
              const nextIndex = (currentIndex + 1) % GAME_LEVELS.length;
              loadLevel(GAME_LEVELS[nextIndex]);
            }}
            onToggleLevelSelector={() =>
              setShowLevelSelector(!showLevelSelector)
            }
            showLevelSelector={showLevelSelector}
          />

          <AnimatePresence>
            <LevelSelector
              levels={GAME_LEVELS}
              currentLevelId={currentLevel.id}
              onLevelSelect={loadLevel}
              show={showLevelSelector}
            />
          </AnimatePresence>
        </div>

        <div className="bg-white dark:bg-slate-700 py-3 sm:p-6 rounded-xl shadow-xl w-full">
          <div className="flex flex-col md:flex-row gap-6 w-full">
            <div className="w-full md:w-1/2 relative">
              <motion.div
                className="relative w-full h-[50vh] sm:h-[60vh] md:h-[500px] overflow-hidden rounded-lg border-4 border-amber-200 dark:border-slate-600"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={currentLevel.originalImage}
                  alt="Imagen original"
                  fill
                  className="object-cover sm:object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                  unoptimized={currentLevel.originalImage.startsWith("http")}
                />
              </motion.div>
              <p className="text-center mt-2 text-sm text-slate-600 dark:text-slate-400">
                Imagen original
              </p>
            </div>

            <div className="w-full md:w-1/2 relative">
              <motion.div
                className="relative w-full h-[50vh] sm:h-[60vh] md:h-[500px] cursor-crosshair overflow-hidden rounded-lg border-4 border-amber-200 dark:border-slate-600"
                onClick={handleImageClick}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <Image
                  src={currentLevel.modifiedImage}
                  alt="Imagen con diferencias"
                  fill
                  className="object-cover sm:object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                  unoptimized={currentLevel.modifiedImage.startsWith("http")}
                />

                {/* Overlay for found differences */}
                <AnimatePresence>
                  {/* Marcadores de diferencias encontradas */}
                  {differences.map(
                    (diff, index) =>
                      diff.found && (
                        <motion.div
                          key={`found-${index}`}
                          className="absolute rounded-full bg-green-500 bg-opacity-70 border-2 border-white transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
                          style={{
                            left: `${diff.x}%`,
                            top: `${diff.y}%`,
                            width: "24px",
                            height: "24px",
                            boxShadow: "0 0 8px rgba(59, 130, 246, 0.7)",
                          }}
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{
                            scale: [0, 1.5, 1],
                            opacity: 1,
                          }}
                          transition={{
                            duration: 0.5,
                            ease: "easeOut",
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-white"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </motion.div>
                      )
                  )}

                  {/* Mensaje de intento fallido */}
                  {showFailedMessage && (
                    <motion.div
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-500 text-white px-6 py-3 rounded-lg font-bold text-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      {failedAttempts >= 5 ? (
                        "¡Demasiados intentos fallidos!\nReiniciando nivel..."
                      ) : (
                        <>
                          ¡Intento fallido!
                          <br />
                          <span className="text-sm font-normal">
                            Te quedan {5 - failedAttempts}{" "}
                            {5 - failedAttempts === 1 ? "intento" : "intentos"}
                          </span>
                        </>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
              <p className="text-center mt-2 text-sm text-slate-600 dark:text-slate-400">
                Imagen con diferencias
              </p>
              <div className="flex justify-center mt-4">
                {foundCount === differences.length && (
                  <motion.button
                    onClick={handleNextLevel}
                    className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center gap-2 shadow-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ delay: 0.3 }}
                  >
                    Siguiente Imagen
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </motion.button>
                )}
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex flex-col gap-1">
              <div className="text-lg font-medium">
                Diferencias encontradas: {foundCount} / {totalDifferences}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                Intentos fallidos: {failedAttempts}
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={resetGame}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium transition-colors"
              >
                Reiniciar Juego
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          <SuccessModal
            showCongrats={showCongrats}
            showSuccess={showSuccess}
            currentLevelId={currentLevel.id}
            onNextLevel={handleNextLevel}
            onResetLevel={resetGame}
            onClose={() => {
              setShowCongrats(false);
              setShowSuccess(false);
            }}
          />
        </AnimatePresence>

        <div className="mt-8 text-center text-slate-600 dark:text-slate-300">
          <p>
            ¿Te gustó el juego? Pronto Tendremos más desafíos relacionados con
            mitos y leyendas de todo el mundo.
          </p>
          <p className="mt-2 text-sm">
            Explora nuestra colección de{" "}
            <Link
              href="/mitos"
              className="text-amber-600 dark:text-amber-400 hover:underline"
            >
              mitos
            </Link>{" "}
            y{" "}
            <Link
              href="/leyendas"
              className="text-amber-600 dark:text-amber-400 hover:underline"
            >
              leyendas
            </Link>{" "}
            para descubrir más historias fascinantes.
          </p>
          <div className="mt-4">
            <button
              onClick={resetGame}
              className="px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium transition-colors"
            >
              Reiniciar nivel
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
