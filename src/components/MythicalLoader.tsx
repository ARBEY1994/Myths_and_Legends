"use client";

import { motion } from "framer-motion";

interface MythicalLoaderProps {
  size?: number;
  primaryColor?: string;
  secondaryColor?: string;
}

export default function MythicalLoader({
  size = 80,
  primaryColor = "#CA8A04", // Color ámbar primario
  secondaryColor = "#F59E0B", // Color ámbar secundario
}: MythicalLoaderProps) {
  // Configuración para la animación del círculo exterior
  const outerCircleVariants = {
    animate: {
      rotate: 360,
      transition: {
        repeat: Infinity,
        duration: 3,
        ease: "linear",
      },
    },
  };

  // Configuración para la animación del círculo interior
  const innerCircleVariants = {
    animate: {
      rotate: -360,
      scale: [1, 1.1, 1],
      transition: {
        rotate: {
          repeat: Infinity,
          duration: 2,
          ease: "linear",
        },
        scale: {
          repeat: Infinity,
          duration: 1.5,
          ease: "easeInOut",
        },
      },
    },
  };

  // Configuración para la animación de las estrellas
  const starVariants = {
    animate: {
      opacity: [0.4, 1, 0.4],
      scale: [0.8, 1.2, 0.8],
      transition: {
        repeat: Infinity,
        duration: 2,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="flex items-center justify-center" style={{ width: size, height: size }}>
      {/* Círculo exterior */}
      <motion.div
        className="absolute"
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          border: `${size / 20}px solid ${primaryColor}`,
          borderTopColor: "transparent",
          borderLeftColor: "transparent",
        }}
        variants={outerCircleVariants}
        animate="animate"
      />

      {/* Círculo interior */}
      <motion.div
        className="absolute"
        style={{
          width: size * 0.6,
          height: size * 0.6,
          borderRadius: "50%",
          border: `${size / 25}px solid ${secondaryColor}`,
          borderBottomColor: "transparent",
          borderRightColor: "transparent",
        }}
        variants={innerCircleVariants}
        animate="animate"
      />

      {/* Estrellas decorativas */}
      <motion.div
        className="absolute"
        style={{
          width: size * 0.15,
          height: size * 0.15,
          borderRadius: "50%",
          backgroundColor: primaryColor,
          top: size * 0.1,
          left: size * 0.1,
        }}
        variants={starVariants}
        animate="animate"
      />

      <motion.div
        className="absolute"
        style={{
          width: size * 0.1,
          height: size * 0.1,
          borderRadius: "50%",
          backgroundColor: secondaryColor,
          bottom: size * 0.15,
          right: size * 0.15,
        }}
        variants={starVariants}
        animate="animate"
      />
    </div>
  );
}
