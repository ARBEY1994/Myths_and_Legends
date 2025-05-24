"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import LoadingPage from "@/components/LoadingPage";

const getCategoryName = (categoryId) => {
  const categories = {
    1: "Dioses y Deidades",
    2: "Criaturas Míticas",
    3: "Héroes y Heroínas",
    4: "Mitos de Origen",
  };
  return categories[categoryId] || "Categoría Desconocida";
};

// Componente interno que usa useSearchParams
function CategoryContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const categoryId = searchParams.get("id");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Importar directamente los archivos JSON
        const myths = await import("@/data/myths.json").then(
          (module) => module.default
        );
        const legends = await import("@/data/legends.json").then(
          (module) => module.default
        );

        // Combinar y filtrar por categoría
        const allItems = [...myths, ...legends].filter(
          (item) =>
            item.categoryKeys &&
            item.categoryKeys.includes(parseInt(categoryId))
        );

        setItems(allItems);
        setCategoryName(getCategoryName(parseInt(categoryId)));
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      } finally {
        setLoading(false);
      }
    };

    if (categoryId) {
      fetchData();
    }
  }, [categoryId]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-amber-50 to-amber-100 dark:from-slate-900 dark:to-slate-800 text-slate-900 dark:text-white">
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <button
            onClick={() => router.push('/')}
            className="text-amber-600 hover:text-amber-800 dark:hover:text-amber-400 font-medium inline-flex items-center"
          >
            ← Volver al inicio
          </button>
        </div>

        <h1 className="text-4xl font-bold mb-8 text-center">{categoryName}</h1>

        {loading ? (
          <>
            <LoadingPage message="Cargando ..." variant="mythical" />
          </>
        ) : items.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl">
              No se encontraron elementos en esta categoría.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-slate-700 rounded-lg overflow-hidden shadow-lg transform transition-transform hover:scale-105"
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-2">{item.title}</h2>
                  <p className="text-slate-600 dark:text-slate-300 mb-2">
                    {item.description}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                    {item.culture || item.region}
                  </p>
                  <Link
                    href={`/${
                      {
                        myth: "mitos",
                        legend: "leyendas"
                      }[item.key] || ""
                    }/${item.id}`}
                    className="text-amber-600 hover:text-amber-800 dark:hover:text-amber-400 font-medium inline-flex items-center"
                  >
                    Leer más <span className="ml-1">→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

// Componente de carga para Suspense
function CategoryLoading() {
  return <LoadingPage message="Cargando categoría..." variant="mythical" />;
}

// Componente principal que envuelve con Suspense
export default function CategoryPage() {
  return (
    <Suspense fallback={<CategoryLoading />}>
      <CategoryContent />
    </Suspense>
  );
}
