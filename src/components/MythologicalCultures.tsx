import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

type CultureProps = {
  title: string;
  description: string;
  imageUrl: string;
  linkUrl: string;
};

const CultureCard = ({
  title,
  description,
  imageUrl,
  linkUrl,
}: CultureProps) => {
  return (
    <div className="relative group overflow-hidden rounded-lg shadow-lg">
      <div className="relative w-full h-80">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
        <div className="p-6 text-white">
          <h3 className="text-2xl font-bold mb-2">{title}</h3>
          <p className="mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {description}
          </p>
          <Link
            href={linkUrl}
            className="inline-block bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded transition-colors btn-primary"
          >
            Descubrir
          </Link>
        </div>
      </div>
    </div>
  );
};

export default function MythologicalCultures() {
  const cultures = [
    {
      title: "Mitología Griega",
      description:
        "El fascinante mundo de los dioses del Olimpo y sus historias.",
      imageUrl: "/images/mythologyGreece.jpg",
      linkUrl: "/culturas/griega",
    },
    {
      title: "Mitología Nórdica",
      description:
        "Dioses guerreros, gigantes y el destino final en el Ragnarök.",
      imageUrl: "/images/mythologyNordic.jpg",
      linkUrl: "/culturas/nordica",
    },
    {
      title: "Mitología Mesoamericana",
      description:
        "Los poderosos dioses y las creencias de las civilizaciones precolombinas.",
      imageUrl: "/images/mythologyMesoamerican.jpg",
      linkUrl: "/culturas/mesoamericana",
    },
  ];

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

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6, 
        ease: [0.16, 1, 0.3, 1] 
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
        <h2 className="text-3xl font-bold mb-4 text-center text-amber-800 dark:text-amber-400">
          Culturas Mitológicas
        </h2>
        <p className="text-center max-w-3xl mx-auto mb-12 text-slate-600 dark:text-slate-300">
          Cada civilización ha creado su propio universo mitológico para
          explicar el mundo que les rodea.
        </p>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={container}
        >
          {cultures.map((culture, index) => (
            <motion.div
              key={index}
              className="bg-white/80 dark:bg-slate-800/80 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 backdrop-blur-sm border border-amber-100/50 dark:border-slate-700/50"
              variants={item}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <CultureCard
                title={culture.title}
                description={culture.description}
                imageUrl={culture.imageUrl}
                linkUrl={culture.linkUrl}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
