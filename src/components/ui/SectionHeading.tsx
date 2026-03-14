"use client";

import { useInView } from "@/lib/useInView";

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
  const { ref, isInView } = useInView();

  return (
    <div
      ref={ref}
      className={`mb-16 max-w-2xl ${isInView ? "animate-fade-in-up" : "opacity-0"} ${
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
    </div>
  );
}
