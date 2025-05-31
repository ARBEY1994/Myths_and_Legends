import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-12 px-4 md:px-8">
       <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-slate-700 text-center text-slate-400"></div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4">Mitos y Leyendas</h3>
          <p className="text-slate-300">
            Explorando las historias ancestrales que han dado forma a nuestra
            comprensión del mundo.
          </p>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-4">Explorar</h4>
          <ul className="space-y-2">
            <li>
              <Link
                href="/mitos"
                className="text-slate-300 hover:text-amber-400 transition-colors"
              >
                Mitos
              </Link>
            </li>
            <li>
              <Link
                href="/leyendas"
                className="text-slate-300 hover:text-amber-400 transition-colors"
              >
                Leyendas
              </Link>
            </li>
            <li>
              <Link
                href="/categoria?id=2"
                className="text-slate-300 hover:text-amber-400 transition-colors"
              >
                Criaturas Míticas
              </Link>
            </li>
            <li>
              <Link
                href="/categoria?id=1"
                className="text-slate-300 hover:text-amber-400 transition-colors"
              >
                Dioses y Deidades
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-4">Culturas</h4>
          <ul className="space-y-2">
            <li>
              <Link
                href="/culturas/griega"
                className="text-slate-300 hover:text-amber-400 transition-colors"
              >
                Griega
              </Link>
            </li>
            <li>
              <Link
                href="/culturas/nordica"
                className="text-slate-300 hover:text-amber-400 transition-colors"
              >
                Nórdica
              </Link>
            </li>
            <li>
              <Link
                href="/culturas/mesoamericana"
                className="text-slate-300 hover:text-amber-400 transition-colors"
              >
                Mesoamericana
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-4">Enlaces</h4>
          <ul className="space-y-2">
            <li>
              <Link
                href="/contacto"
                className="text-slate-300 hover:text-amber-400 transition-colors"
              >
                Contacto
              </Link>
            </li>
            <li>
              <Link
                href="/politica-privacidad"
                className="text-slate-300 hover:text-amber-400 transition-colors"
              >
                Política de Privacidad
              </Link>
            </li>
            <li>
              <Link
                href="/terminos-y-condiciones"
                className="text-slate-300 hover:text-amber-400 transition-colors"
              >
                Términos y Condiciones
              </Link>
            </li>
            <li>
              <Link
                href="/politica-cookies"
                className="text-slate-300 hover:text-amber-400 transition-colors"
              >
                Política de Cookies
              </Link>
            </li>
            <li>
              <Link
                href="/aviso-publicidad"
                className="text-slate-300 hover:text-amber-400 transition-colors"
              >
                Aviso de Publicidad
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-slate-700 text-center text-slate-400">
        <p>
          © {new Date().getFullYear()} Mitos y Leyendas. Todos los derechos
          reservados.
        </p>
      </div>
    </footer>
  );
}
