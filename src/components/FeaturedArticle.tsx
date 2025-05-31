import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function FeaturedArticle() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };
  return (
    <motion.section 
      className="py-16 px-4"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={container}
    >
      <div className="container mx-auto max-w-4xl">
        <motion.div 
          className="bg-amber-50 dark:bg-slate-700 p-8 rounded-lg shadow-lg"
          variants={item}
          whileHover={{ scale: 1.01, transition: { duration: 0.3 } }}
        >
          <h2 className="text-3xl font-bold mb-6 text-amber-800 dark:text-amber-400">Artículo Destacado</h2>
          <h3 className="text-2xl font-semibold mb-4">
            La Llorona: El Lamento que Persigue Nuestras Noches
          </h3>

          <motion.div 
            className="flex flex-col md:flex-row gap-6 mb-6"
            variants={item}
          >
            <motion.div 
              className="md:w-1/3 relative h-64 md:h-auto"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src="/images/Outstanding.jpg"
                alt="La Llorona vagando junto al río bajo la luz de la luna"
                fill
                className="object-cover rounded-lg shadow-md"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </motion.div>
            <motion.div 
              className="md:w-2/3"
              variants={item}
            >
              <p className="text-slate-700 dark:text-slate-200 mb-4">
                Cuando era niño, mi abuela me contaba entre susurros la historia
                de La Llorona mientras el viento silbaba entre los árboles de
                nuestro pueblo. Esta leyenda, que ha recorrido generaciones en
                México y toda Latinoamérica, habla de una hermosa mujer de
                nombre María que, cegada por los celos y la traición de su
                amado, cometió el acto imperdonable de ahogar a sus propios
                hijos.
              </p>
              <p className="text-slate-700 dark:text-slate-200">
                Desde entonces, su alma en pena vaga por las orillas de ríos y
                lagos en noches de niebla, vestida de blanco y con el rostro
                oculto tras una cascada de cabello negro. Los ancianos de mi
                pueblo juran haber escuchado su lamento desgarrador
                &ldquo;¡Aaaay, mis hiiijos!&rdquo; resonando en la oscuridad...
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            variants={item}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="inline-block mt-4"
          >
            <Link href="/articulo/la-llorona" className="inline-block bg-amber-600 hover:bg-amber-700 text-white py-2 px-6 rounded-lg transition-colors btn-primary"
            aria-label="Descubre la historia completa de La Llorona y sus variantes en Latinoamérica"
          >
            Descubre la historia completa
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
