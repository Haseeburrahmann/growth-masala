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
      className={`${isInView ? `animate-${animation}` : "opacity-0"} ${className}`}
      style={delay ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
