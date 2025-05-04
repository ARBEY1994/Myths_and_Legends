import Image from "next/image";
import Link from "next/link";

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
      linkUrl: "/cultures/greek",
    },
    {
      title: "Mitología Nórdica",
      description:
        "Dioses guerreros, gigantes y el destino final en el Ragnarök.",
      imageUrl: "/images/mythologyNordic.jpg",
      linkUrl: "/cultures/nordic",
    },
    {
      title: "Mitología Mesoamericana",
      description:
        "Los poderosos dioses y las creencias de las civilizaciones precolombinas.",
      imageUrl: "/images/mythologyMesoamerican.jpg",
      linkUrl: "/cultures/mesoamerican",
    },
  ];

  return (
    <section className="py-16 px-4 bg-amber-50 dark:bg-slate-900">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-4 text-center">
          Culturas Mitológicas
        </h2>
        <p className="text-center max-w-3xl mx-auto mb-12 text-slate-600 dark:text-slate-300">
          Cada civilización ha creado su propio universo mitológico para
          explicar el mundo que les rodea.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cultures.map((culture, index) => (
            <CultureCard
              key={index}
              title={culture.title}
              description={culture.description}
              imageUrl={culture.imageUrl}
              linkUrl={culture.linkUrl}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
