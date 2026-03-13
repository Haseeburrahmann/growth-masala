"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  dark?: boolean;
}

export default function SectionHeading({
  label,
  title,
  description,
  align = "center",
  dark = false,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
      className={`mb-16 max-w-2xl ${
        align === "center" ? "mx-auto text-center" : ""
      }`}
    >
      {label && (
        <div className="mb-4 flex items-center gap-3 justify-center">
          <div className={`h-px w-8 ${dark ? "bg-white/20" : "bg-primary/30"}`} />
          <span
            className={`text-xs font-semibold uppercase tracking-[0.2em] ${
              dark ? "text-primary" : "text-primary"
            }`}
          >
            {label}
          </span>
          <div className={`h-px w-8 ${dark ? "bg-white/20" : "bg-primary/30"}`} />
        </div>
      )}
      <h2
        className={`font-heading text-3xl font-bold leading-tight sm:text-4xl lg:text-[2.75rem] ${
          dark ? "text-white" : "text-text-primary"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-base leading-relaxed sm:text-lg ${
            dark ? "text-slate-400" : "text-text-secondary"
          }`}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}
