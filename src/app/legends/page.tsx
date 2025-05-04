"use client";

import Image from "next/image";
import Link from "next/link";
import BackToHome from "../../components/BackToHome";
import { useEffect } from "react";
import legends from "@/data/legends.json";

export default function LegendsPage() {
  // Actualizar el título y la descripción de la página
  useEffect(() => {
    document.title = "Leyendas Populares | Mitos y Leyendas";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Descubre las leyendas más impactantes y misteriosas de diferentes culturas y regiones. Historias transmitidas de generación en generación que siguen causando asombro."
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
            Leyendas Populares
          </h1>
          <p className="text-xl text-center max-w-3xl mx-auto text-slate-700 dark:text-slate-300">
            Relatos transmitidos oralmente de generación en generación, que
            mezclan elementos históricos con sobrenaturales y siguen causando
            temor e intriga en la actualidad.
          </p>
        </div>
      </section>

      {/* Lista de Leyendas */}
      <section className="py-16 px-4 bg-white dark:bg-slate-800">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {legends.map((legend: { id: string; title: string; imageUrl: string; region: string; description: string }) => (
              <div
                key={legend.id}
                className="bg-amber-50 dark:bg-slate-700 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105"
              >
                <div className="relative h-48">
                  <Image
                    src={legend.imageUrl}
                    alt={legend.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-xl font-bold">{legend.title}</h2>
                    <span className="text-sm bg-amber-200 dark:bg-amber-600 px-2 py-1 rounded-full">
                      {legend.region}
                    </span>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 mb-4">
                    {legend.description}
                  </p>
                  <Link
                    href={`/legends/${legend.id}`}
                    className="inline-block bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded-lg transition-colors"
                  >
                    Leer leyenda completa
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
