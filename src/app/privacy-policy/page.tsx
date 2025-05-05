import Footer from "../../components/Footer";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-amber-50 to-amber-100 dark:from-slate-900 dark:to-slate-800 text-slate-900 dark:text-white">
      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-4xl font-cinzel font-bold mb-8">
          Política de Privacidad
        </h1>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p>Última actualización: {new Date().toLocaleDateString()}</p>

          <h2 className="text-2xl font-bold mt-8 mb-4">
            1. Información que recopilamos
          </h2>
          <p>
            En Mitos y Leyendas, valoramos su privacidad y nos comprometemos a
            proteger sus datos personales. Esta política de privacidad describe
            cómo recopilamos, utilizamos y compartimos su información cuando
            visita nuestro sitio web.
          </p>
          <p>
            Recopilamos información que usted nos proporciona directamente, como
            su nombre, dirección de correo electrónico y cualquier otra
            información que decida compartir cuando se comunica con nosotros o
            utiliza nuestros servicios.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">
            2. Cómo utilizamos su información
          </h2>
          <p>Utilizamos la información que recopilamos para:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Proporcionar, mantener y mejorar nuestros servicios</li>
            <li>
              Comunicarnos con usted sobre actualizaciones, ofertas y eventos
            </li>
            <li>Personalizar su experiencia en nuestro sitio web</li>
            <li>
              Analizar cómo se utiliza nuestro sitio web para mejorar nuestros
              servicios
            </li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">
            3. Compartición de información
          </h2>
          <p>
            No vendemos ni alquilamos su información personal a terceros.
            Podemos compartir su información con proveedores de servicios que
            nos ayudan a operar nuestro sitio web y a proporcionar nuestros
            servicios.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">4. Sus derechos</h2>
          <p>
            Usted tiene derecho a acceder, corregir o eliminar su información
            personal. También puede oponerse al procesamiento de sus datos o
            solicitar la limitación de dicho procesamiento.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">
            5. Cambios a esta política
          </h2>
          <p>
            Podemos actualizar esta política de privacidad periódicamente. Le
            notificaremos cualquier cambio publicando la nueva política de
            privacidad en esta página.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">6. Contacto</h2>
          <p>
            Si tiene alguna pregunta sobre esta política de privacidad, puede
            contactarnos a través de nuestro formulario de contacto o enviando
            un correo electrónico a mitosyleyendas596@gmail.com.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
