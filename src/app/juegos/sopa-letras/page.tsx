"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import WordSearch from "@/components/games/wordSearch/WordSearch";
import Footer from "@/components/Footer";

export default function WordSearchPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-amber-50 to-amber-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 pt-4">
        {/* Botón de volver atrás */}
        <div className="mb-4">
          <Link href="/juegos">
            <motion.div
              className="inline-flex items-center bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded-lg shadow-md transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Atrás
            </motion.div>
          </Link>
        </div>
      </div>
      
      {/* Componente principal del juego */}
      <div className="flex-grow">
        <WordSearch />
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
