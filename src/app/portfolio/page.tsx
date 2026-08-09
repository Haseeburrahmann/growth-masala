import PortfolioHero from "@/components/portfolio/PortfolioHero";
import PortfolioGrid from "@/components/portfolio/PortfolioGrid";
import PortfolioCTA from "@/components/portfolio/PortfolioCTA";

/**
 * /portfolio — eight live projects, each one openable.
 *
 * Was a 246-line client component. Two things were wrong with it:
 *
 *   - `"use client"` covered the whole route so that three filter buttons could
 *     hold a string in `useState`. The state now lives in `PortfolioGrid`, which
 *     is the only component that needs it; the rest of the page is server-
 *     rendered.
 *   - The page contradicted its own `<title>`. The tag promised "50+ Websites &
 *     Digital Projects"; the hero rendered `portfolioItems.length + "+"` — "8+"
 *     — a few hundred pixels below it. Both numbers now come from one place
 *     (`trackRecord` in `business.ts`, and the array itself) and the hero states
 *     the relationship between them out loud.
 *
 * Backgrounds: navy | white | navy. The closing CTA is a full-bleed navy section
 * now rather than a navy card floating in the white one — the grid ends on a row
 * of cards, and a second card layer immediately under it read as a ninth
 * project. Every seam is a light/dark change, so no `SectionDivider` is needed.
 *
 * Schema: none here. `BreadcrumbList` comes from `layout.tsx`, and these
 * projects are already covered by the site-wide `LocalBusiness` node. There is
 * no `CreativeWork` markup because Google does not surface it for agency
 * portfolios, and emitting schema no rich result consumes is noise.
 */
export default function PortfolioPage() {
  return (
    <>
      <PortfolioHero />
      <PortfolioGrid />
      <PortfolioCTA />
    </>
  );
}
