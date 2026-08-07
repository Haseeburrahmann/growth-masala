import AboutHero from "@/components/about/AboutHero";
import AboutStory from "@/components/about/AboutStory";
import AboutValues from "@/components/about/AboutValues";
import AboutLocal from "@/components/about/AboutLocal";
import AboutMission from "@/components/about/AboutMission";
import SectionDivider from "@/components/ui/SectionDivider";

/**
 * /about — who we are, what we hold to, and where we are.
 *
 * Three things were wrong with the page this replaces:
 *
 *   - **Numbers nobody had measured.** The stat block read "50+ Projects · 30+
 *     Happy Clients · 3x Average Growth Rate · 95% Client Retention". The first
 *     two are real and now come from `trackRecord` in `business.ts`. The other
 *     two were invented — a growth multiple over an unstated baseline and a
 *     retention ratio nobody computed — and are gone, replaced by figures the
 *     data files can derive. The 50 was also being typed separately here and in
 *     the /portfolio title, which is how that page came to promise "50+" in
 *     search results and render "8+" in its hero.
 *
 *   - **No location, anywhere.** Not the district, not the region, not one of
 *     the seven towns we serve — under a `<title>` that said "Digital Agency in
 *     Mahabubnagar". `AboutLocal` fixes that with copy that earns its place
 *     rather than a keyword sprinkle, and takes its town list from the same
 *     `areasServed` that feeds the LocalBusiness JSON-LD.
 *
 *   - **`"use client"` for nothing.** No state, no handlers. It shipped a bundle
 *     to render static text and forced metadata into a sibling `layout.tsx`.
 *
 * Backgrounds: navy | white · surface · white | navy. Both light-on-light seams
 * carry a `SectionDivider` toned to the section above; the navy boundaries are a
 * change of room and need no marker.
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

      <SectionDivider tone="light" />
      <AboutValues />

      <SectionDivider tone="surface" />
      <AboutLocal />

      <AboutMission />
    </>
  );
}
