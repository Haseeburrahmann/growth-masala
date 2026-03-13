"use client";

import { motion } from "framer-motion";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({
  children,
  className = "",
  hover = true,
}: CardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -4, transition: { duration: 0.2 } } : undefined}
      className={`rounded-xl border border-border bg-white p-6 shadow-sm ${
        hover ? "transition-shadow hover:shadow-lg" : ""
      } ${className}`}
    >
      {children}
    </motion.div>
  );
}
