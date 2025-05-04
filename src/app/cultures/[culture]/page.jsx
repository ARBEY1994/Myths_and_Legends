"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import LoadingPage from "../../../components/LoadingPage";

export default function CulturaPage() {
  const params = useParams();
  const culturaId = params.culture;
  const [cultura, setCultura] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCultura = async () => {
      setLoading(true);
      try {
        // Importar directamente el archivo JSON de culturas
        const cultures = await import("@/data/cultures.json").then(module => module.default);
        const data = cultures.find(culture => culture.id === culturaId);
        
        if (!data) {
          throw new Error("No se pudo encontrar la información de la cultura");
        }
        
        setCultura(data);
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      } finally {
        setLoading(false);
      }
    };

    if (culturaId) {
      fetchCultura();
    }
  }, [culturaId]);

  if (loading) {
    return <LoadingPage message="Cargando cultura mitológica..." variant="mythical" />;
  }

  if (!cultura) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-amber-50 to-amber-100 dark:from-slate-900 dark:to-slate-800 text-slate-900 dark:text-white">
        <div className="flex-grow container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h1 className="text-4xl font-bold mb-4">Cultura no encontrada</h1>
            <p className="mb-8">La cultura mitológica que buscas no existe.</p>
            <Link
              href="/"
              className="bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded transition-colors"
            >
              Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-amber-50 to-amber-100 dark:from-slate-900 dark:to-slate-800 text-slate-900 dark:text-white">
      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link
            href="/"
            className="text-amber-600 hover:text-amber-800 dark:hover:text-amber-400 font-medium inline-flex items-center"
          >
            ← Volver al inicio
          </Link>
        </div>

        {/* Hero Section */}
        <div className="relative w-full h-96 mb-12 rounded-xl overflow-hidden">
          <Image
            src={cultura.imageUrl}
            alt={cultura.title}
            fill
            className="object-cover object-top"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
            <div className="p-8 text-white">
              <h1 className="text-5xl font-bold mb-4">{cultura.title}</h1>
              <p className="text-xl">{cultura.description}</p>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-8 mb-12 shadow-lg">
          <h2 className="text-3xl font-bold mb-6">Sobre esta mitología</h2>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            {cultura.content.split("\n\n").map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Personajes Famosos */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-8 mb-12 shadow-lg">
          <h2 className="text-3xl font-bold mb-6">Personajes famosos</h2>
          {cultura.famousCharacters && cultura.famousCharacters.length > 0 ? (
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {cultura.famousCharacters.map((character, index) => (
                <li
                  key={index}
                  className="bg-amber-50 dark:bg-slate-700 p-4 rounded-lg shadow"
                >
                  {character}
                </li>
              ))}
            </ul>
          ) : (
            <p>No hay información disponible sobre personajes famosos.</p>
          )}
        </div>

        {/* Explorar más culturas */}
        <div className="text-center py-8">
          <h2 className="text-2xl font-bold mb-4">
            Explora otras culturas mitológicas
          </h2>
          <Link
            href="/"
            className="bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded transition-colors inline-block"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
