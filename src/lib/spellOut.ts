/**
 * Small English number words, for copy that counts something in `src/data/`.
 *
 * "Four groups, nine services" reads better than "4 groups, 9 services", but a
 * headline that spells a number out is exactly the kind of copy that goes stale
 * silently when the data grows — /portfolio once said "Eight sites" in the H1
 * while the grid rendered however many `portfolioItems` held. Every such
 * sentence derives its number from the array rather than typing it, and this
 * converts the count into the word the design asks for.
 *
 * This lives in `src/lib/` because three pages need it. When /services,
 * /portfolio and /case-studies were built in parallel they each grew their own
 * private copy of this table — two capitalised, one lower-case, one starting
 * "Zero" and one starting "no". Same function, three drifting definitions.
 *
 * Falls back to digits above the table, so a fortieth case study degrades to
 * "40 builds" rather than `undefined`.
 */
const NUMBER_WORDS = [
  "Zero",
  "One",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
  "Nine",
  "Ten",
  "Eleven",
  "Twelve",
];

/**
 * Capitalised, for the start of a sentence or headline.
 * Use `spellOutLower` mid-sentence rather than calling `.toLowerCase()` at each
 * call site.
 */
export function spellOut(count: number): string {
  return NUMBER_WORDS[count] ?? String(count);
}

/**
 * Lower-case form, for mid-sentence use ("all three sites are live").
 *
 * Zero reads as "no" rather than "zero" — "no case studies are live" is the
 * sentence you want if the array is ever emptied.
 */
export function spellOutLower(count: number): string {
  if (count === 0) return "no";
  return spellOut(count).toLowerCase();
}
