import Footer from "../../components/Footer";

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-amber-50 to-amber-100 dark:from-slate-900 dark:to-slate-800 text-slate-900 dark:text-white">
      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-4xl font-cinzel font-bold mb-8">
          TÉRMINOS Y CONDICIONES
        </h1>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p>Última actualización: {new Date().toLocaleDateString()}</p>

          <h2 className="text-2xl font-bold mt-8 mb-4">
            1. Aceptación de los términos
          </h2>
          <p>
            Al acceder y utilizar este sitio web, usted acepta estar sujeto a
            estos Términos y Condiciones, todas las leyes y regulaciones
            aplicables, y acepta que es responsable del cumplimiento de las
            leyes locales aplicables. Si no está de acuerdo con alguno de estos
            términos, tiene prohibido utilizar o acceder a este sitio.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">2. Licencia de uso</h2>
          <p>
            Se concede permiso para descargar temporalmente una copia de los
            materiales (información o software) en el sitio web de Mitos y
            Leyendas solo para visualización transitoria personal y no
            comercial. Esta es la concesión de una licencia, no una
            transferencia de título, y bajo esta licencia usted no puede:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Modificar o copiar los materiales</li>
            <li>
              Usar los materiales para cualquier propósito comercial o para
              exhibición pública (comercial o no comercial)
            </li>
            <li>
              Intentar descompilar o aplicar ingeniería inversa a cualquier
              software contenido en el sitio web de Mitos y Leyendas
            </li>
            <li>
              Eliminar cualquier derecho de autor u otras notaciones de
              propiedad de los materiales
            </li>
            <li>
              Transferir los materiales a otra persona o &ldquo;reflejar&rdquo;
              los materiales en cualquier otro servidor
            </li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">
            3. Exención de responsabilidad
          </h2>
          <p>
            Los materiales en el sitio web de Mitos y Leyendas se proporcionan
            &ldquo;tal cual&rdquo;. Mitos y Leyendas no ofrece garantías,
            expresas o implícitas, y por la presente renuncia y niega todas las
            otras garantías, incluyendo, sin limitación, garantías implícitas o
            condiciones de comerciabilidad, idoneidad para un propósito
            particular, o no infracción de propiedad intelectual u otra
            violación de derechos.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">4. Limitaciones</h2>
          <p>
            En ningún caso Mitos y Leyendas o sus proveedores serán responsables
            por cualquier daño (incluyendo, sin limitación, daños por pérdida de
            datos o beneficios, o debido a interrupción del negocio) que surja
            del uso o incapacidad de usar los materiales en el sitio web de
            Mitos y Leyendas, incluso si Mitos y Leyendas o un representante
            autorizado de Mitos y Leyendas ha sido notificado oralmente o por
            escrito de la posibilidad de tal daño.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">
            5. Modificaciones y erratas
          </h2>
          <p>
            Los materiales que aparecen en el sitio web de Mitos y Leyendas
            pueden incluir errores técnicos, tipográficos o fotográficos. Mitos
            y Leyendas no garantiza que cualquiera de los materiales en su sitio
            web sea preciso, completo o actual. Mitos y Leyendas puede realizar
            cambios a los materiales contenidos en su sitio web en cualquier
            momento sin previo aviso.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">6. Enlaces</h2>
          <p>
            Mitos y Leyendas no ha revisado todos los sitios enlazados a su
            sitio web y no es responsable por el contenido de cualquier sitio
            enlazado. La inclusión de cualquier enlace no implica respaldo por
            parte de Mitos y Leyendas del sitio. El uso de cualquier sitio web
            enlazado es bajo el propio riesgo del usuario.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">
            7. Modificaciones a los términos de servicio
          </h2>
          <p>
            Mitos y Leyendas puede revisar estos términos de servicio para su
            sitio web en cualquier momento sin previo aviso. Al usar este sitio
            web, usted acepta estar sujeto a la versión actual de estos términos
            de servicio.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">8. Ley aplicable</h2>
          <p>
            Cualquier reclamación relacionada con el sitio web de Mitos y
            Leyendas se regirá por las leyes del país de residencia del
            propietario del sitio, sin tener en cuenta las disposiciones sobre
            conflicto de leyes.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
