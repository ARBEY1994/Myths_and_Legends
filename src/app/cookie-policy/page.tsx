import Footer from "../../components/Footer";

export default function CookiePolicy() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-amber-50 to-amber-100 dark:from-slate-900 dark:to-slate-800 text-slate-900 dark:text-white">
      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-4xl font-cinzel font-bold mb-8">
          Política de Cookies
        </h1>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p>Última actualización: {new Date().toLocaleDateString()}</p>

          <h2 className="text-2xl font-bold mt-8 mb-4">
            1. ¿Qué son las cookies?
          </h2>
          <p>
            Las cookies son pequeños archivos de texto que se almacenan en su
            dispositivo cuando visita un sitio web. Se utilizan ampliamente para
            hacer que los sitios web funcionen de manera más eficiente, así como
            para proporcionar información a los propietarios del sitio.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">
            2. Cómo utilizamos las cookies
          </h2>
          <p>En Mitos y Leyendas utilizamos cookies para:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>
              Entender cómo utiliza nuestro sitio web para mejorar su
              experiencia
            </li>
            <li>Recordar sus preferencias y configuraciones</li>
            <li>Medir la eficacia de nuestras campañas de marketing</li>
            <li>Analizar el tráfico del sitio y las tendencias de uso</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">
            3. Tipos de cookies que utilizamos
          </h2>
          <p>Utilizamos los siguientes tipos de cookies:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>
              <strong>Cookies esenciales:</strong> Necesarias para el
              funcionamiento básico del sitio web.
            </li>
            <li>
              <strong>Cookies de preferencias:</strong> Permiten que el sitio
              web recuerde sus preferencias y opciones.
            </li>
            <li>
              <strong>Cookies estadísticas:</strong> Nos ayudan a entender cómo
              los visitantes interactúan con el sitio web.
            </li>
            <li>
              <strong>Cookies de marketing:</strong> Utilizadas para rastrear a
              los visitantes en los sitios web con el fin de mostrar anuncios
              relevantes.
            </li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">
            4. Control de cookies
          </h2>
          <p>
            La mayoría de los navegadores web permiten cierto control de la
            mayoría de las cookies a través de la configuración del navegador.
            Para obtener más información sobre las cookies, incluido cómo ver
            qué cookies se han establecido y cómo administrarlas y eliminarlas,
            visite{" "}
            <a
              href="https://www.allaboutcookies.org"
              className="text-amber-600 hover:text-amber-800 dark:text-amber-400 dark:hover:text-amber-300"
            >
              www.allaboutcookies.org
            </a>
            .
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">
            5. Cookies de terceros
          </h2>
          <p>
            Nuestro sitio web también puede utilizar servicios de terceros que
            establecen sus propias cookies, como Google Analytics, redes
            sociales y proveedores de publicidad. No tenemos control sobre estas
            cookies. Puede bloquear estas cookies activando la configuración en
            su navegador que le permite rechazar todas o algunas cookies.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">
            6. Cambios en nuestra política de cookies
          </h2>
          <p>
            Cualquier cambio que podamos hacer en nuestra política de cookies en
            el futuro se publicará en esta página. Consulte esta política
            regularmente para mantenerse informado sobre cómo utilizamos las
            cookies.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">7. Contacto</h2>
          <p>
            Si tiene alguna pregunta sobre nuestra política de cookies, puede
            contactarnos a través de nuestro formulario de contacto o enviando
            un correo electrónico a info@mitosyleyendas.com.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
