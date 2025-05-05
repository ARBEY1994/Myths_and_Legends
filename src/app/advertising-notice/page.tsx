import Footer from "../../components/Footer";

export default function AdvertisingNotice() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-amber-50 to-amber-100 dark:from-slate-900 dark:to-slate-800 text-slate-900 dark:text-white">
      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-4xl font-cinzel font-bold mb-8">
          Aviso sobre Uso de Publicidad
        </h1>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p>Última actualización: {new Date().toLocaleDateString()}</p>

          <h2 className="text-2xl font-bold mt-8 mb-4">
            1. Publicidad en nuestro sitio
          </h2>
          <p>
            En Mitos y Leyendas, utilizamos publicidad para mantener nuestro
            sitio web y continuar ofreciendo contenido gratuito de alta calidad.
            Este aviso explica cómo utilizamos la publicidad en nuestro sitio
            web y cómo puede afectar a su experiencia.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">
            2. Tipos de publicidad
          </h2>
          <p>
            Nuestro sitio web puede mostrar varios tipos de publicidad,
            incluyendo:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>
              <strong>Anuncios de display:</strong> Banners, imágenes y otros
              elementos visuales que aparecen en diferentes áreas de nuestro
              sitio web.
            </li>
            <li>
              <strong>Anuncios contextuales:</strong> Publicidad relacionada con
              el contenido que estás viendo.
            </li>
            <li>
              <strong>Anuncios personalizados:</strong> Publicidad basada en su
              historial de navegación y preferencias.
            </li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">
            3. Redes publicitarias
          </h2>
          <p>
            Trabajamos con varias redes publicitarias, incluyendo Google
            AdSense, para mostrar anuncios en nuestro sitio web. Estas redes
            utilizan cookies y tecnologías similares para recopilar información
            sobre su actividad de navegación y mostrarle anuncios relevantes.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">
            4. Publicidad personalizada
          </h2>
          <p>
            La publicidad personalizada se basa en la información recopilada
            sobre sus intereses, preferencias y comportamiento de navegación.
            Esta información se utiliza para mostrarle anuncios que sean más
            relevantes para usted.
          </p>
          <p>
            Puede optar por no recibir publicidad personalizada visitando la
            página de configuración de anuncios de Google:{" "}
            <a
              href="https://www.google.com/settings/ads"
              className="text-amber-600 hover:text-amber-800 dark:text-amber-400 dark:hover:text-amber-300"
            >
              https://www.google.com/settings/ads
            </a>
            .
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">
            5. Impacto en la experiencia del usuario
          </h2>
          <p>
            Nos esforzamos por garantizar que la publicidad en nuestro sitio web
            no interfiera significativamente con su experiencia de navegación.
            Sin embargo, los anuncios pueden afectar a los tiempos de carga de
            las páginas y a la experiencia general del usuario.
          </p>
          <p>
            Si encuentra anuncios que considera inapropiados o intrusivos, le
            animamos a que nos lo comunique para que podamos abordar el
            problema.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">
            6. Bloqueadores de anuncios
          </h2>
          <p>
            Aunque respetamos su derecho a utilizar bloqueadores de anuncios, le
            pedimos que considere desactivarlos para nuestro sitio web. Los
            ingresos por publicidad nos ayudan a mantener y mejorar nuestro
            contenido, que ofrecemos de forma gratuita.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">
            7. Cambios en nuestra política de publicidad
          </h2>
          <p>
            Podemos actualizar nuestra política de publicidad periódicamente. Le
            notificaremos cualquier cambio publicando la nueva política en esta
            página.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">8. Contacto</h2>
          <p>
            Si tiene alguna pregunta sobre nuestra política de publicidad, puede
            contactarnos a través de nuestro formulario de contacto o enviando
            un correo electrónico a mitosyleyendas596@gmail.com.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
