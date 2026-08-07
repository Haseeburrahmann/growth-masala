"use client";

import { useInView } from "@/lib/useInView";

interface AnimatedContainerProps {
  className?: string;
  children: React.ReactNode;
  animation?: "fade-in-up" | "fade-in" | "scale-in" | "slide-in-left" | "slide-in-right";
  delay?: number;
}

export default function AnimatedContainer({
  className = "",
  children,
  animation = "fade-in-up",
  delay = 0,
}: AnimatedContainerProps) {
  const { ref, isInView } = useInView();

  return (
    <div
      ref={ref}
      /* `reveal-pending` rather than `opacity-0`: it means the same thing here,
         but it is specific to scroll reveals, so the no-JS fallback in the root
         layout can un-hide these without also un-hiding every unrelated
         `opacity-0` (footer hover arrows, for one). */
      className={`${isInView ? `animate-${animation}` : "reveal-pending"} ${className}`}
      style={delay ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
