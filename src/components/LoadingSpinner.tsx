"use client";

import { motion } from "framer-motion";

interface LoadingSpinnerProps {
  size?: number;
  color?: string;
  thickness?: number;
}

export default function LoadingSpinner({
  size = 40,
  color = "#CA8A04", // Color ámbar que coincide con el tema
  thickness = 4,
}: LoadingSpinnerProps) {
  const spinTransition = {
    repeat: Infinity,
    ease: "linear",
    duration: 1.5,
  };

  return (
    <div
      className="flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <motion.span
        style={{
          width: size,
          height: size,
          borderWidth: thickness,
          borderColor: `${color} transparent transparent transparent`,
          borderRadius: "50%",
          display: "inline-block",
          borderStyle: "solid",
        }}
        animate={{ rotate: 360 }}
        transition={spinTransition}
      />
    </div>
  );
}
