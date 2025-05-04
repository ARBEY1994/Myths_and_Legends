import Link from "next/link";

export default function Header() {
  return (
    <header
      className="relative h-screen flex flex-col justify-center items-center"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(/images/bg.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container mx-auto px-4 flex flex-col justify-center items-center text-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
          Mitos y Leyendas
        </h1>
        <p className="text-xl md:text-2xl max-w-3xl mb-8">
          Explora las historias ancestrales que han dado forma a nuestra
          comprensión del mundo y las culturas que nos rodean.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/myths"
            className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300"
          >
            Explorar Mitos
          </Link>
          <Link
            href="/legends"
            className="bg-transparent hover:bg-white/10 border-2 border-white text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300"
          >
            Descubrir Leyendas
          </Link>
        </div>
      </div>
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg
          className="w-8 h-8 text-white"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </header>
  );
}
