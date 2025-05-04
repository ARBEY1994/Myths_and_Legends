"use client";

import Link from "next/link";
import { motion } from "framer-motion";

type ErrorPageProps = {
  message?: string;
  error?: Error;
  resetAction?: () => void;
};

export default function ErrorPage({
  message = "Ha ocurrido un error",
  error,
  resetAction,
}: ErrorPageProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-amber-50 dark:bg-slate-800">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white dark:bg-slate-700 p-8 rounded-lg shadow-lg text-center"
      >
        <div className="text-red-500 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mx-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        <h1 className="text-2xl font-bold mb-4 text-slate-800 dark:text-white">
          {message}
        </h1>

        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-slate-600 rounded text-left overflow-auto max-h-40">
            <p className="text-red-700 dark:text-red-300 text-sm font-mono">
              {error.message}
            </p>
          </div>
        )}

        <div className="flex flex-col gap-3">
          {resetAction && (
            <button
              onClick={resetAction}
              className="w-full py-2 px-4 bg-amber-600 hover:bg-amber-700 text-white rounded transition-colors"
            >
              Intentar de nuevo
            </button>
          )}

          <Link
            href="/"
            className="w-full py-2 px-4 bg-slate-600 hover:bg-slate-700 text-white rounded transition-colors"
          >
            Volver al inicio
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
