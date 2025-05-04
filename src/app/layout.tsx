import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Cinzel, Spectral } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Fuente para títulos - estilo elegante inspirado en la epigrafía romana
const cinzel = Cinzel({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-cinzel",
  weight: ["400", "500", "600", "700", "800"],
});

// Fuente para texto principal - serif clásica con buena legibilidad
const spectral = Spectral({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-spectral",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Mitos y Leyendas | Historias Ancestrales del Mundo",
  description:
    "Explora fascinantes mitos y leyendas de diferentes culturas y épocas. Descubre historias ancestrales, criaturas míticas y relatos legendarios que han perdurado a través del tiempo.",
  keywords:
    "mitos, leyendas, mitología, historias ancestrales, criaturas míticas, folclore, cultura, tradiciones",
  authors: [{ name: "Mitos y Leyendas" }],
  openGraph: {
    title: "Mitos y Leyendas | Historias Ancestrales del Mundo",
    description:
      "Explora fascinantes mitos y leyendas de diferentes culturas y épocas. Descubre historias ancestrales, criaturas míticas y relatos legendarios.",
    url: "",
    siteName: "Mitos y Leyendas",
    locale: "es_ES",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${cinzel.variable} ${spectral.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
