import Link from 'next/link';

export default function BackToHome() {
  return (
    <div className="py-4 px-6">
      <Link 
        href="/" 
        className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded-lg transition-colors shadow-md"
        aria-label="Volver a la página principal"
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
        <span>Inicio</span>
      </Link>
    </div>
  );
}
