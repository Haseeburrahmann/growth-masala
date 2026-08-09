"use client";

import { useInView } from "@/lib/useInView";

interface SectionDividerProps {
  /** Optional step label, e.g. "The work". Rendered inside the rule as a break. */
  label?: string;
  /** Matches the divider to the background it sits on. */
  tone?: "light" | "surface";
}

/**
 * The marker between two adjacent light sections.
 *
 * The homepage alternates navy and light backgrounds, which gives the scroll
 * landmarks at every navy boundary. It does not help where two light sections
 * meet: Problem → Services and Pricing → FAQ both used to run together as one
 * undifferentiated white field with a large unexplained gap in the middle. The
 * gap read as a rendering fault rather than as breathing room.
 *
 * This is deliberately quiet. A full-strength rule across a 1440px viewport is
 * louder than the headings it separates, so the line fades out at both ends and
 * carries a single small amber diamond at the centre — the same accent the hero
 * panel and section kickers use, at the smallest size it appears anywhere. When
 * a label is supplied the rule breaks around it instead.
 *
 * Decorative, so the whole thing is aria-hidden. A labelled divider repeats a
 * word that the following <h2> already says; announcing it twice helps nobody.
 */
export default function SectionDivider({
  label,
  tone = "light",
}: SectionDividerProps) {
  const { ref, isInView } = useInView();

  return (
    <div
      aria-hidden="true"
      className={`${tone === "surface" ? "bg-surface" : "bg-white"} py-2`}
    >
      <div ref={ref} className="mx-auto flex max-w-7xl items-center gap-5 px-6 lg:px-8">
        <div
          className={`edge-rule flex-1 ${isInView ? "animate-rule-draw" : "reveal-pending"}`}
        />

        {/* The label is 12px, the floor — it was 11px, the one size the design
            audit rejects outright. Uppercase at 0.22em tracking is already the
            hardest thing on the page to read without shrinking it too. */}
        {label ? (
          <span className="font-heading text-xs font-bold uppercase tracking-[0.22em] text-text-secondary/55">
            {label}
          </span>
        ) : (
          <span className="h-1.5 w-1.5 rotate-45 bg-accent" />
        )}

        <div
          className={`edge-rule flex-1 ${isInView ? "animate-rule-draw" : "reveal-pending"}`}
          style={{ animationDelay: "120ms" }}
        />
      </div>
    </div>
  );
}
