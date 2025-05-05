"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";
import Footer from "../../components/Footer";

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const EMAILJS_SERVICE_ID = "service_wvya9pq";
const EMAILJS_TEMPLATE_ID = "template_au3mzhi";
const EMAILJS_PUBLIC_KEY = "7uE2Y8Rk3YgN5XzBc";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitError("");

    try {
      // Preparar los datos para enviar por correo
      const templateParams = {
        from_name: data.name,
        from_email: data.email,
        to_email: "mitosyleyendas596@gmail.com",
        cc_email: "arbey221@gmail.com",
        subject: data.subject,
        message: data.message,
      };

      // Enviar el correo usando EmailJS
      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      console.log("Formulario enviado con éxito:", response);
      setIsSubmitted(true);
      reset();
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      setSubmitError(
        "Hubo un problema al enviar tu mensaje. Por favor, inténtalo de nuevo más tarde."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-amber-50 to-amber-100 dark:from-slate-900 dark:to-slate-800 text-slate-900 dark:text-white">
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="prose prose-lg dark:prose-invert">
            <h1 className="text-4xl font-cinzel font-bold mb-8">Contacto</h1>
            <p>
              ¿Tienes alguna pregunta, sugerencia o comentario? ¡Nos encantaría
              saber de ti! Completa el formulario y nos pondremos en contacto
              contigo lo antes posible.
            </p>
            <div className="mt-8">
              <h3 className="text-xl font-bold mb-4">
                Información de contacto
              </h3>
              <p className="flex items-center mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 mr-2 text-amber-600 dark:text-amber-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  />
                </svg>
                mitosyleyendas596@gmail.com
              </p>
              <p className="flex items-center mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 mr-2 text-amber-600 dark:text-amber-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
                  />
                </svg>
                www.mitosyleyendas.com
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6">
            {isSubmitted ? (
              <div className="text-center py-8">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-16 h-16 mx-auto text-green-500 mb-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>

                <h3 className="text-2xl font-bold mb-2">¡Mensaje enviado!</h3>
                <p className="text-slate-600 dark:text-slate-300 mb-6">
                  Gracias por contactarnos. Te responderemos lo antes posible.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-6 rounded-full transition-colors"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                  >
                    Nombre completo *
                  </label>
                  <input
                    id="name"
                    type="text"
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 dark:bg-slate-700 dark:border-slate-600 ${
                      errors.name ? "border-red-500 focus:ring-red-500" : ""
                    }`}
                    {...register("name", {
                      required: "El nombre es obligatorio",
                    })}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                  >
                    Correo electrónico *
                  </label>
                  <input
                    id="email"
                    type="email"
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 dark:bg-slate-700 dark:border-slate-600 ${
                      errors.email ? "border-red-500 focus:ring-red-500" : ""
                    }`}
                    {...register("email", {
                      required: "El correo electrónico es obligatorio",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Dirección de correo electrónico inválida",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                  >
                    Asunto *
                  </label>
                  <input
                    id="subject"
                    type="text"
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 dark:bg-slate-700 dark:border-slate-600 ${
                      errors.subject ? "border-red-500 focus:ring-red-500" : ""
                    }`}
                    {...register("subject", {
                      required: "El asunto es obligatorio",
                    })}
                  />
                  {errors.subject && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.subject.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                  >
                    Mensaje *
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 dark:bg-slate-700 dark:border-slate-600 ${
                      errors.message ? "border-red-500 focus:ring-red-500" : ""
                    }`}
                    {...register("message", {
                      required: "El mensaje es obligatorio",
                      minLength: {
                        value: 10,
                        message: "El mensaje debe tener al menos 10 caracteres",
                      },
                    })}
                  ></textarea>
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                {submitError && (
                  <div className="p-3 bg-red-100 text-red-700 rounded-md">
                    {submitError}
                  </div>
                )}

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Enviando..." : "Enviar mensaje"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
