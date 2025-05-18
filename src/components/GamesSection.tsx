import FindTheDifferences from './games/FindTheDifferences';

export default function GamesSection() {
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-amber-50 to-amber-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-amber-800 dark:text-amber-400">
            Juegos de Mitos y Leyendas
          </h2>
          <p className="text-xl text-slate-700 dark:text-slate-300 max-w-3xl mx-auto">
            Pon a prueba tu atención al detalle con nuestros juegos inspirados en las historias más fascinantes de la mitología y el folclore.
          </p>
        </div>
        
        <div className="grid gap-12">
          <FindTheDifferences />
          
          {/* Espacio para futuros juegos */}
          <div className="text-center py-8">
            <h3 className="text-2xl font-semibold mb-4 text-amber-700 dark:text-amber-300">
              ¡Más juegos próximamente!
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Estamos trabajando en más juegos emocionantes basados en mitos y leyendas de todo el mundo.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
