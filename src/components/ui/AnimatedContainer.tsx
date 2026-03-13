"use client";

import { motion } from "framer-motion";
import type { Variants, HTMLMotionProps } from "framer-motion";
import { fadeInUp } from "@/lib/animations";

interface AnimatedContainerProps extends HTMLMotionProps<"div"> {
  variants?: Variants;
  className?: string;
  children: React.ReactNode;
}

export default function AnimatedContainer({
  variants = fadeInUp,
  className = "",
  children,
  ...props
}: AnimatedContainerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={variants}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
