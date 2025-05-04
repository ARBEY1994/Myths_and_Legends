import Image from "next/image";
import Link from "next/link";

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
    <div className="bg-amber-50 dark:bg-slate-700 rounded-lg overflow-hidden shadow-lg transform transition-transform hover:scale-105">
      <div className="relative h-48 w-full">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-slate-600 dark:text-slate-300 mb-4">{description}</p>
        <Link
          href={linkUrl}
          className="text-amber-600 hover:text-amber-800 dark:hover:text-amber-400 font-medium inline-flex items-center"
        >
          Explorar <span className="ml-1">→</span>
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
      linkUrl: "/byCategory?id=1",
    },
    {
      key: 2,
      title: "Criaturas Míticas",
      description:
        "Descubre seres fantásticos que habitan en las leyendas de todo el mundo.",
      imageUrl: "/images/falconImage.jpg",
      linkUrl: "/byCategory?id=2",
    },
    {
      key: 3,
      title: "Héroes y Heroínas",
      description:
        "Conoce las hazañas de los grandes protagonistas de las historias míticas.",
      imageUrl: "/images/heroes.jpg",
      linkUrl: "/byCategory?id=3",
    },
    {
      key: 4,
      title: "Mitos de Origen",
      description:
        "Explora las historias que explican la creación del mundo y sus fenómenos.",
      imageUrl: "/images/origin.jpg",
      linkUrl: "/byCategory?id=4",
    },
  ];

  return (
    <section className="py-16 px-4 bg-white dark:bg-slate-800">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">
          Explora por Categorías
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <CategoryCard
              key={index}
              title={category.title}
              description={category.description}
              imageUrl={category.imageUrl}
              linkUrl={category.linkUrl}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
