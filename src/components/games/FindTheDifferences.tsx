"use client";

import { useState, useEffect, useRef } from "react";
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
    GAME_LEVELS[0].differences.map((diff) => ({ ...diff, found: false }))
  );
  const [gameOver, setGameOver] = useState(false);
  const [showLevelSelector, setShowLevelSelector] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [showFailedMessage, setShowFailedMessage] = useState(false);

  // Estados para el temporizador y el inicio del juego
  const [gameStarted, setGameStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(GAME_LEVELS[0].timeLimit || 30); // Usar el tiempo del nivel o 30 segundos por defecto
  const [customTime, setCustomTime] = useState(GAME_LEVELS[0].timeLimit || 30); // Tiempo personalizable
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Estados para la cuenta regresiva antes de mostrar la imagen
  const [showCountdown, setShowCountdown] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [showModifiedImage, setShowModifiedImage] = useState(false);

  const loadLevel = (level: GameLevel) => {
    setCurrentLevel(level);
    setDifferences(
      level.differences.map((diff) => ({ ...diff, found: false }))
    );
    setGameOver(false);
    setFailedAttempts(0);
    setShowFailedMessage(false);
    setShowLevelSelector(false);
    setGameStarted(false); // Reiniciar el estado del juego

    // Actualizar el tiempo personalizado según el nivel
    const levelTime = level.timeLimit || 30; // Usar el tiempo del nivel o 30 segundos por defecto
    setCustomTime(levelTime);
    setTimeLeft(levelTime); // Reiniciar el temporizador

    setShowCountdown(false); // Reiniciar la cuenta regresiva
    setCountdown(3); // Reiniciar el contador
    setShowModifiedImage(false); // Ocultar la imagen modificada

    // Limpiar cualquier temporizador existente
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const resetGame = () => {
    loadLevel(currentLevel);
  };

  // Función para iniciar el juego
  const startGame = () => {
    setGameStarted(true);
    setShowCountdown(true);
    setCountdown(3);

    // Iniciar la cuenta regresiva antes de mostrar la imagen modificada
    const countdownInterval = setInterval(() => {
      setCountdown((prevCount) => {
        if (prevCount <= 1) {
          clearInterval(countdownInterval);
          setShowCountdown(false);
          setShowModifiedImage(true);

          // Iniciar el temporizador del juego después de la cuenta regresiva
          if (timerRef.current) {
            clearInterval(timerRef.current);
          }

          timerRef.current = setInterval(() => {
            setTimeLeft((prevTime) => {
              if (prevTime <= 1) {
                // Cuando el tiempo llega a cero
                clearInterval(timerRef.current as NodeJS.Timeout);
                setGameOver(true);
                return 0;
              }
              return prevTime - 1;
            });
          }, 1000);

          return 0;
        }
        return prevCount - 1;
      });
    }, 1000);
  };

  // Función para cambiar el tiempo personalizado (solo en código)
  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseInt(e.target.value);
    if (!isNaN(newTime) && newTime > 0) {
      setCustomTime(newTime);
      setTimeLeft(newTime);
    }
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

    if (gameOver || !gameStarted) return; // No permitir clics si el juego no ha iniciado o ya terminó

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
        setShowSuccess(true);

        // Detener el temporizador cuando se encuentran todas las diferencias
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
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
      setShowSuccess(true); // Solo usamos showSuccess para mostrar el modal

      // Detener el temporizador cuando se encuentran todas las diferencias
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  }, [differences, gameOver]);

  // Limpiar el temporizador cuando el componente se desmonta
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

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
    setGameStarted(false); // Reiniciar el estado del juego para que el usuario tenga que presionar "Iniciar Juego" nuevamente
  };

  return (
    <section className="py-12 bg-gradient-to-b from-amber-50 to-amber-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto ">
        <div className="text-center mb-8">
          <p className="text-xl text-amber-700 dark:text-amber-300 mb-4">
            {currentLevel.name}
          </p>
          <p className="text-slate-600 dark:text-slate-300">
            {currentLevel.description}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mt-4 mb-6">
          <button
            onClick={() => setShowLevelSelector(true)}
            className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors flex items-center gap-2"
          >
            Ver todas las imágenes
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </button>
          <button
            onClick={resetGame}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-white rounded-lg transition-colors"
          >
            Reiniciar Nivel
          </button>
          {!gameStarted && (
            <button
              onClick={startGame}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
            >
              Iniciar Juego
            </button>
          )}
        </div>

        {/* Temporizador normal (visible cuando el juego no está activo) */}
        {!gameStarted && (
          <div className="flex justify-center items-center gap-4 mb-6">
            <div className="flex items-center gap-2 bg-white dark:bg-slate-800 px-4 py-2 rounded-lg shadow">
              <p className="text-lg font-semibold text-slate-700 dark:text-slate-300">
                Tiempo:
              </p>
              <div
                className={`text-lg font-bold ${
                  timeLeft <= 10
                    ? "text-red-600"
                    : "text-amber-600 dark:text-amber-400"
                }`}
              >
                {timeLeft}s
              </div>
            </div>
          </div>
        )}

        {/* Temporizador fijo en la parte superior (visible solo cuando el juego está activo) */}
        {gameStarted && (
          <div className="fixed top-0 left-0 right-0 bg-amber-600 dark:bg-slate-800 py-2 px-4 z-50 shadow-lg flex justify-center items-center transition-all">
            <div className="container mx-auto max-w-6xl flex justify-between items-center">
              <div className="flex items-center gap-2">
                <p className="text-lg font-semibold text-white">Tiempo:</p>
                <div
                  className={`text-2xl font-bold ${
                    timeLeft <= 10 ? "text-red-200 animate-pulse" : "text-white"
                  }`}
                >
                  {timeLeft}s
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-amber-700 dark:bg-slate-700 px-4 py-1 rounded-full shadow">
                  <p className="text-white font-semibold">
                    Diferencias: <span className="font-bold">{foundCount}</span>{" "}
                    de {totalDifferences}
                  </p>
                </div>
                <div className="bg-amber-700 dark:bg-slate-700 px-4 py-1 rounded-full shadow">
                  <p className="text-white font-semibold">
                    Intentos fallidos:{" "}
                    <span className="font-bold">{failedAttempts}</span> / 5
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Información de diferencias e intentos fallidos (visible solo cuando el juego no está activo) */}
        {!gameStarted && (
          <div className="flex justify-center items-center gap-6 mb-6">
            <div className="bg-white dark:bg-slate-800 px-4 py-2 rounded-lg shadow">
              <p className="text-lg font-semibold text-slate-700 dark:text-slate-300">
                Diferencias:{" "}
                <span className="text-amber-600 dark:text-amber-400">
                  {foundCount}
                </span>{" "}
                de {totalDifferences}
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 px-4 py-2 rounded-lg shadow">
              <p className="text-lg font-semibold text-slate-700 dark:text-slate-300">
                Intentos fallidos:{" "}
                <span className="text-red-600">{failedAttempts}</span> / 5
              </p>
            </div>
          </div>
        )}

        {/* Espacio adicional cuando el juego está activo para compensar el temporizador fijo */}
        {gameStarted && <div className="pt-16"></div>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Imagen Original (siempre visible) */}
          <div
            className="relative w-full h-[50vh] sm:h-[60vh] md:h-[100vh] overflow-hidden rounded-lg border-4 border-amber-200 dark:border-slate-600"
            onClick={gameStarted ? handleImageClick : undefined}
          >
            <Image
              src={currentLevel.originalImage}
              alt="Imagen Original"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover "
              priority
              unoptimized={currentLevel.originalImage.startsWith("http")}
            />
            <div className="absolute top-2 left-2 bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-bold">
              Original
            </div>
          </div>

          {/* Imagen Modificada o Cuenta Regresiva */}
          {gameStarted ? (
            <div
              className="relative w-full h-[50vh] sm:h-[60vh] md:h-[100vh] cursor-crosshair overflow-hidden rounded-lg border-4 border-amber-200 dark:border-slate-600"
              onClick={showModifiedImage ? handleImageClick : undefined}
            >
              {showCountdown && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 z-10">
                  <div className="text-center">
                    <p className="text-white text-2xl mb-4">
                      Se mostrará la imagen en
                    </p>
                    <div className="text-6xl font-bold text-amber-500 animate-pulse">
                      {countdown}
                    </div>
                    <p className="text-white text-xl mt-4">
                      ¡Prepárate para encontrar las diferencias!
                    </p>
                    <p className="text-white text-xl mt-2">
                      Tienes {customTime} segundos
                    </p>
                  </div>
                </div>
              )}

              {showModifiedImage && (
                <>
                  <Image
                    src={currentLevel.modifiedImage}
                    alt="Imagen Modificada"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover sm:object-cover"
                    priority
                    unoptimized={currentLevel.modifiedImage.startsWith("http")}
                  />
                  <div className="absolute top-2 left-2 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                    Modificada
                  </div>

                  {/* Marcadores de diferencias encontradas */}
                  {differences
                    .filter((diff) => diff.found)
                    .map((diff, index) => (
                      <div
                        key={`found-${index}`}
                        className="absolute rounded-full bg-green-500 bg-opacity-70 border-2 border-white transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
                        style={{
                          left: `${diff.x}%`,
                          top: `${diff.y}%`,
                          width: "24px",
                          height: "24px",
                          boxShadow: "0 0 8px rgba(59, 130, 246, 0.7)",
                          zIndex: 20,
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
                      </div>
                    ))}
                </>
              )}
            </div>
          ) : (
            <div
              className="relative w-full h-[50vh] sm:h-[60vh] md:h-[100vh] overflow-hidden rounded-lg border-4 border-amber-200 dark:border-slate-600 flex items-center justify-center bg-white dark:bg-slate-800 cursor-pointer hover:bg-amber-50 dark:hover:bg-slate-700 transition-colors"
              onClick={startGame}
            >
              <div className="text-center p-6">
                <h3 className="text-2xl font-bold mb-4 text-amber-700 dark:text-amber-400">
                  ¡Haz clic aquí para iniciar el juego!
                </h3>
                <p className="mb-4 text-slate-600 dark:text-slate-300">
                  {currentLevel.description}
                </p>
                <p className="text-slate-500 dark:text-slate-400">
                  Tienes {customTime} segundos para encontrar {totalDifferences}{" "}
                  diferencias.
                </p>
                <div className="mt-6 inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors">
                  Iniciar Juego
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal de Nivel Completado */}
        <AnimatePresence>
          {showSuccess && (
            <SuccessModal
              showSuccess={showSuccess}
              currentLevelId={currentLevel.id}
              onNextLevel={handleNextLevel}
              onResetLevel={resetGame}
              onClose={() => setShowSuccess(false)}
            />
          )}
        </AnimatePresence>

        {/* Selector de Nivel */}
        <AnimatePresence>
          {showLevelSelector && (
            <LevelSelector
              levels={GAME_LEVELS}
              currentLevelId={currentLevel.id}
              onLevelSelect={loadLevel}
              show={showLevelSelector}
            />
          )}
        </AnimatePresence>

        {/* Eliminado el modal simple de felicitación para evitar duplicidad con el SuccessModal */}

        {/* Mensaje de Intento Fallido */}
        <AnimatePresence>
          {showFailedMessage && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-red-600 text-white py-3 px-6 rounded-full shadow-lg z-50"
            >
              {failedAttempts >= 5
                ? "¡Demasiados intentos fallidos! Reiniciando..."
                : "¡Intento fallido! Sigue buscando..."}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mensaje de Tiempo Agotado */}
        <AnimatePresence>
          {gameOver && timeLeft === 0 && !showSuccess && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 20, stiffness: 300 }}
                className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-xl max-w-md w-full mx-4"
              >
                <h3 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4 text-center">
                  ¡Tiempo Agotado!
                </h3>
                <p className="mb-6 text-slate-700 dark:text-slate-300 text-center">
                  Se acabó el tiempo para encontrar las diferencias.
                </p>
                <div className="flex justify-center">
                  <button
                    onClick={resetGame}
                    className="px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-medium flex items-center gap-2 shadow-lg"
                  >
                    Intentar de nuevo
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
