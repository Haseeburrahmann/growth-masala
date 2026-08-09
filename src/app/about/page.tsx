import AboutHero from "@/components/about/AboutHero";
import AboutStory from "@/components/about/AboutStory";
import AboutValues from "@/components/about/AboutValues";
import AboutMission from "@/components/about/AboutMission";

/**
 * /about — who we are, what we hold to, and how to reach us.
 *
 * Four sections, per the approved canvas: hero → why we exist → four rules →
 * closing CTA. The page it replaces ran to five and repeated itself; the story
 * and the location argument were making the same point in two sections, so the
 * local case now sits inside "Why we exist" and the address, hours and phone —
 * the part a reader actually needs — are in the closing card rather than a
 * paragraph halfway up.
 *
 * Things that must not drift:
 *
 *   - **Every number comes from `src/data/business.ts`.** `trackRecord`,
 *     `foundingYear` and `areasServed.length`. Both `trackRecord` figures are
 *     floors and always render with a "+". /about hardcoded its own "50+" once
 *     and it went out of step with the /portfolio title. No metric appears here
 *     that is not in that file — "3x average growth rate" and "95% client
 *     retention" were removed for having no source, and should not come back.
 *
 *   - **No team size or headcount.** "A small studio" is the strongest claim
 *     the copy makes about size, and nothing in the repo establishes a number.
 *
 *   - **No `"use client"`.** These are all server components; the only
 *     interactivity is `AnimatedContainer`, which is already a client boundary.
 *
 * Backgrounds: navy | white | surface | navy. The navy boundaries are a change
 * of room and need no marker; the white→surface seam carries its own tonal
 * step, and the canvas puts no `SectionDivider` there.
 *
 * Schema: `BreadcrumbList` only, from `layout.tsx`. The `Organization` /
 * `LocalBusiness` node is emitted site-wide by the root layout — describing the
 * same business a second time here would compete with it rather than add to it.
 */
export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutStory />
      <AboutValues />
      <AboutMission />
    </>
  );
}
