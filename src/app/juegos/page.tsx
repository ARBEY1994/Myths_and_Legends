"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";

interface GameCard {
  id: string;
  title: string;
  description: string;
  image: string;
  path: string;
}

const GAMES: GameCard[] = [
  {
    id: "find-differences",
    title: "Encuentra las Diferencias",
    description: "Pon a prueba tu capacidad de observación encontrando las diferencias entre dos imágenes similares.",
    image: "/images/games/find_diffrerence.png",
    path: "/juegos/encuentra-diferencias",
  },
  {
    id: "word-search",
    title: "Sopa de Letras",
    description: "Busca palabras ocultas relacionadas con mitos y leyendas en esta divertida sopa de letras.",
    image: "/images/games/word_search.png",
    path: "/juegos/sopa-letras",
  },
];

export default function GamesPage() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-amber-50 to-amber-100 dark:from-slate-900 dark:to-slate-800">
      <section className="py-16 flex-grow">
      <div className="container mx-auto px-4">
        {/* Botón de volver al inicio */}
        <div className="mb-8">
          <Link href="/">
            <motion.div
              className="inline-flex items-center bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded-lg shadow-md transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Inicio
            </motion.div>
          </Link>
        </div>
        
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-amber-800 dark:text-amber-400 mb-4">
            Juegos Interactivos
          </h1>
          <p className="text-xl text-slate-700 dark:text-slate-300 max-w-3xl mx-auto">
            Diviértete y aprende sobre mitos y leyendas con nuestra colección de juegos interactivos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {GAMES.map((game) => (
            <Link href={game.path} key={game.id}>
              <motion.div
                className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all cursor-pointer h-full flex flex-col"
                whileHover={{ y: -10 }}
                onMouseEnter={() => setHoveredCard(game.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="relative h-60 w-full overflow-hidden">
                  <Image
                    src={game.image}
                    alt={game.title}
                    fill
                    className="object-cover transition-transform duration-500"
                    style={{
                      transform: hoveredCard === game.id ? "scale(1.05)" : "scale(1)",
                    }}
                  />
                </div>
                <div className="p-6 flex-grow">
                  <h3 className="text-2xl font-bold text-amber-700 dark:text-amber-400 mb-2">
                    {game.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300">
                    {game.description}
                  </p>
                </div>
                <div className="px-6 pb-6">
                  <motion.div
                    className="bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded-lg text-center font-medium"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Jugar Ahora
                  </motion.div>
                </div>
              </motion.div>
            </Link>
          ))}
          
          {/* Aviso de próximos juegos */}
          <motion.div 
            className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-lg border-2 border-dashed border-amber-300 dark:border-amber-700 h-full flex flex-col justify-center items-center p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-amber-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <h3 className="text-2xl font-bold text-amber-700 dark:text-amber-400 mb-3">
                ¡Más Juegos Próximamente!
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                Estamos trabajando en nuevos juegos emocionantes basados en mitos y leyendas de todo el mundo. ¡Vuelve pronto para descubrirlos!
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
      <Footer />
    </div>
  );
}
