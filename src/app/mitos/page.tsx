"use client";

import Image from "next/image";
import Link from "next/link";
import BackToHome from "../../components/BackToHome";
import { useEffect } from "react";
import myths from "@/data/myths.json";
import Footer from "@/components/Footer";

export default function MythsPage() {
  // Actualizar el título y la descripción de la página
  useEffect(() => {
    document.title = "Mitos del Mundo | Mitos y Leyendas";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Explora los mitos más fascinantes de diversas culturas alrededor del mundo. Conoce las historias de creación, dioses y héroes mitológicos."
      );
    }
  }, []);

  return (
    <main className="min-h-screen">
      <div className="bg-slate-900">
        <BackToHome />
      </div>
      {/* Header */}
      <section className="py-12 px-4 bg-amber-50 dark:bg-slate-900">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            Mitos del Mundo
          </h1>
          <p className="text-xl text-center max-w-3xl mx-auto text-slate-700 dark:text-slate-300">
            Explora las historias que explican el origen del mundo, los dioses y
            las fuerzas de la naturaleza según diferentes culturas y
            civilizaciones.
          </p>
        </div>
      </section>

      {/* Lista de Mitos */}
      <section className="py-16 px-4 bg-white dark:bg-slate-800">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {myths.map(
              (myth: {
                id: string;
                title: string;
                imageUrl: string;
                culture: string;
                description: string;
              }) => (
                <div
                  key={myth.id}
                  className="bg-amber-50 dark:bg-slate-700 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105"
                >
                  <div className="relative h-48">
                    <Image
                      src={myth.imageUrl}
                      alt={myth.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h2 className="text-xl font-bold">{myth.title}</h2>
                      <span className="text-sm bg-amber-200 dark:bg-amber-600 px-2 py-1 rounded-full">
                        {myth.culture}
                      </span>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 mb-4">
                      {myth.description}
                    </p>
                    <Link
                      href={`/mitos/${myth.id}`}
                      className="inline-block bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded-lg transition-colors"
                    >
                      Leer mito completo
                    </Link>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
