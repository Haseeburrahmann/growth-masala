import AnimatedContainer from "@/components/ui/AnimatedContainer";

/**
 * The homepage's section heading block.
 *
 * Every section below the hero opens the same way in the canvas: a ruled
 * eyebrow, a two-tone headline whose second line drops to a muted colour, and a
 * standfirst that sits on the headline's baseline at desktop and stacks beneath
 * it on a phone. Six sections repeating that by hand is six places for the
 * rhythm to drift, which is exactly what had happened — some were centred, some
 * left, and the type scale differed between them.
 *
 * Not `@/components/ui/SectionHeading`: that one is centred, single-line, and
 * owned by the inner pages. This is the homepage's own pattern and deliberately
 * does not touch it.
 *
 * `lead` / `trail` are two halves of ONE heading, rendered as one `<h2>` with a
 * `<span className="block">` per visual line. Two elements here would be two
 * headings in the outline for a single sentence.
 */
interface SectionIntroProps {
  eyebrow: string;
  /** First headline line — carries the emphasis colour. */
  lead: string;
  /** Second headline line — recedes to muted. */
  trail: string;
  standfirst: string;
  /** Matches the block to the ground it sits on. */
  tone?: "light" | "dark";
  className?: string;
}

export default function SectionIntro({
  eyebrow,
  lead,
  trail,
  standfirst,
  tone = "light",
  className = "",
}: SectionIntroProps) {
  const dark = tone === "dark";

  return (
    <AnimatedContainer className={className}>
      <div className="flex items-center gap-2.5 sm:gap-3">
        <span
          className={`h-px w-6 sm:w-8 ${dark ? "bg-accent/50" : "bg-primary/30"}`}
        />
        {/* On navy the brand blue measures 3.64:1 and cannot carry text, so the
            dark variant takes amber — which is also what the canvas draws. */}
        <span
          className={`text-xs font-semibold uppercase tracking-[0.17em] sm:tracking-[0.2em] ${
            dark ? "text-accent" : "text-primary"
          }`}
        >
          {eyebrow}
        </span>
      </div>

      {/* Headline left, standfirst right, sharing a baseline from `lg`. Stacked
          below that: at 390px the standfirst has nowhere to go but under. */}
      <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,720px)_minmax(0,1fr)] lg:items-end lg:gap-16">
        <h2
          className={`font-heading text-3xl font-bold leading-[1.16] tracking-tight text-balance sm:text-4xl lg:text-[2.875rem] lg:leading-[1.13] ${
            dark ? "text-white" : "text-text-primary"
          }`}
        >
          {/* The `{" "}` between the two spans is load-bearing, not formatting.
              Both spans are `display: block`, so the space renders as nothing —
              but without it the heading's TEXT CONTENT concatenates with no
              separator, and "Someone nearby is searching" + "for what you sell"
              becomes "…searchingfor…" to a screen reader, to Google, and to
              every AI crawler that reads text rather than pixels. The visual
              line break is CSS; the word break has to exist in the DOM. */}
          <span className="block">{lead}</span>{" "}
          <span className={`block ${dark ? "text-slate-400" : "text-text-secondary/70"}`}>
            {trail}
          </span>
        </h2>
        <p
          className={`text-base leading-relaxed sm:text-[17px] sm:leading-7 ${
            dark ? "text-slate-300" : "text-text-secondary"
          }`}
        >
          {standfirst}
        </p>
      </div>
    </AnimatedContainer>
  );
}
