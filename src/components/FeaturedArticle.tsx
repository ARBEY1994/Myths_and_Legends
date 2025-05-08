import Image from "next/image";
import Link from "next/link";

export default function FeaturedArticle() {
  return (
    <section className="py-16 px-4 bg-white dark:bg-slate-800">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-amber-50 dark:bg-slate-700 p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-6">Artículo Destacado</h2>
          <h3 className="text-2xl font-semibold mb-4">
            La Llorona: El Lamento que Persigue Nuestras Noches
          </h3>

          <div className="flex flex-col md:flex-row gap-6 mb-6">
            <div className="md:w-1/3 relative h-64 md:h-auto">
              <Image
                src="/images/Outstanding.jpg"
                alt="La Llorona vagando junto al río bajo la luz de la luna"
                fill
                className="object-cover rounded-lg shadow-md"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="md:w-2/3">
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
            </div>
          </div>

          <Link
            href="/leyendas/la-llorona"
            className="inline-block bg-amber-600 hover:bg-amber-700 text-white py-2 px-6 rounded-lg transition-colors btn-primary"
            aria-label="Descubre la historia completa de La Llorona y sus variantes en Latinoamérica"
          >
            Descubre la historia completa
          </Link>
        </div>
      </div>
    </section>
  );
}
