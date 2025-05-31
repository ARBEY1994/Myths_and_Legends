import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

type CategoryProps = {
  title: string;
  description: string;
  imageUrl: string;
  linkUrl: string;
};

const CategoryCard = ({
  title,
  description,
  imageUrl,
  linkUrl,
}: CategoryProps) => {
  return (
    <div className="group h-full flex flex-col bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-amber-100/50 dark:border-slate-700/50">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-bold mb-3 text-amber-700 dark:text-amber-400">{title}</h3>
        <p className="text-slate-600 dark:text-slate-300 mb-4 flex-1">{description}</p>
        <Link
          href={linkUrl}
          className="inline-flex items-center text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300 font-medium transition-colors duration-200 group/link"
        >
          Explorar categoría
          <span className="ml-2 group-hover/link:translate-x-1 transition-transform duration-200">
            →
          </span>
        </Link>
      </div>
    </div>
  );
};

export default function Categories() {
  const categories = [
    {
      key: 1,
      title: "Dioses y Deidades",
      description:
        "Conoce a las poderosas entidades que gobiernan los panteones mitológicos.",
      imageUrl: "/images/creationImage.jpeg",
      linkUrl: "/categoria?id=1",
    },
    {
      key: 2,
      title: "Criaturas Míticas",
      description:
        "Descubre seres fantásticos que habitan en las leyendas de todo el mundo.",
      imageUrl: "/images/falconImage.jpg",
      linkUrl: "/categoria?id=2",
    },
    {
      key: 3,
      title: "Héroes y Heroínas",
      description:
        "Conoce las hazañas de los grandes protagonistas de las historias míticas.",
      imageUrl: "/images/heroes.jpg",
      linkUrl: "/categoria?id=3",
    },
    {
      key: 4,
      title: "Mitos de Origen",
      description:
        "Explora las historias que explican la creación del mundo y sus fenómenos.",
      imageUrl: "/images/origin.jpg",
      linkUrl: "/categoria?id=4",
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.5, 
        ease: [0.16, 1, 0.3, 1] 
      } 
    },
    hover: {
      y: -5,
      transition: { duration: 0.2 }
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
        <h2 className="text-3xl font-bold mb-12 text-center text-amber-800 dark:text-amber-400">
          Explora por Categorías
        </h2>
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={container}
        >
          {categories.map((category, index) => (
            <motion.div
              key={index}
              variants={item}
              whileHover="hover"
            >
              <CategoryCard
                title={category.title}
                description={category.description}
                imageUrl={category.imageUrl}
                linkUrl={category.linkUrl}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
