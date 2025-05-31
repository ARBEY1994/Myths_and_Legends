import Link from 'next/link';
import { motion } from 'framer-motion';


export default function GamesSection() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  

 

  return (
    <motion.section 
      className="py-16 px-4"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      variants={container}
    >
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-amber-800 dark:text-amber-400">
            Juegos de Mitos y Leyendas
          </h2>
          <p className="text-xl text-slate-700 dark:text-slate-300 max-w-3xl mx-auto">
            Pon a prueba tu conocimiento y habilidades con nuestros juegos interactivos inspirados en las historias más fascinantes de la mitología y el folclore.
          </p>
        </div>
        
        
        
        <div className="max-w-3xl mx-auto bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden">
          <div className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4 text-amber-700 dark:text-amber-300">
              ¡Descubre nuestros juegos!
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Encuentra las diferencias, resuelve sopas de letras y mucho más en nuestra sección de juegos interactivos.
            </p>
            <Link href="/juegos">
              <motion.div 
                className="inline-block bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explorar Juegos
              </motion.div>
            </Link>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
