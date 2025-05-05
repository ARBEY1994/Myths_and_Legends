"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import myths from "@/data/myths.json";

type StoryItem = {
  type: string;
  value: string;
};

export default function MythPage() {
  const params = useParams();
  const id = params.id as string;

  const myth = myths.find((m) => m.id === id);

  useEffect(() => {
    if (myth) {
      document.title = `${myth.title} | Mitos y Leyendas`;

      const metaDescription = document.querySelector(
        'meta[name="description"]'
      );
      if (metaDescription) {
        metaDescription.setAttribute("content", myth.description);
      }
    } else {
      document.title = "Mito no encontrado | Mitos y Leyendas";
    }
  }, [myth]);

  if (!myth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-amber-50 dark:bg-slate-800">
        <div className="max-w-md w-full bg-white dark:bg-slate-700 p-8 rounded-lg shadow-lg text-center">
          <div className="text-red-500 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold mb-4 text-slate-800 dark:text-white">
            Mito no encontrado
          </h1>
          <p className="mb-6 text-slate-600 dark:text-slate-300">
            El mito que buscas no existe en nuestra base de datos.
          </p>
          <Link
            href="/"
            className="w-full py-2 px-4 bg-amber-600 hover:bg-amber-700 text-white rounded transition-colors inline-block"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-800">
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <Link
          href="/myths"
          className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 mb-6"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          <span>Volver a Mitos</span>
        </Link>

        <div className="bg-amber-50 dark:bg-slate-700 p-8 rounded-lg shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <h1 className="text-3xl md:text-4xl font-bold">{myth.title}</h1>
            <span className="text-sm bg-amber-200 dark:bg-amber-600 px-2 py-1 rounded-full">
              {myth.culture}
            </span>
          </div>

          {/* La historia ilustrada se muestra con texto e imágenes intercaladas */}
          <div className="max-w-none">
            {myth.story.map((item: StoryItem, index: number) => (
              <div
                key={index}
                className={`mb-8 ${
                  index % 2 === 0 ? "fade-in-left" : "fade-in-right"
                }`}
              >
                {item.type === "text" ? (
                  <div className="bg-amber-50/70 dark:bg-slate-700/70 p-6 rounded-lg shadow-sm border-l-4 border-amber-500 dark:border-amber-400">
                    <p className="text-slate-700 dark:text-slate-200 text-lg leading-relaxed">
                      {item.value}
                    </p>
                  </div>
                ) : (
                  <div className="my-8 flex justify-center">
                    <div className="max-w-xl rounded-lg overflow-hidden shadow-xl transform transition-transform hover:scale-[1.02] duration-300 relative">
                      <Image
                        src={item.value}
                        alt={`Ilustración de ${myth.title} - parte ${index}`}
                        width={800}
                        height={600}
                        className="rounded-lg object-cover object-top"
                        sizes="(max-width: 768px) 100vw, 600px"
                        priority={index < 2}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-30"></div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
