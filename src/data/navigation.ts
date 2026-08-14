import type { NavLink } from "@/types";

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

/**
 * The three legal documents.
 *
 * Deliberately NOT in `navLinks` — they do not belong in the header, and adding
 * them there would take a seven-item nav to ten for pages nobody browses to.
 * They sit in the footer of every page instead, which is both the convention
 * readers expect and what keeps them clear of the orphan problem the location
 * pages had (see the comment above `footerLocationLinks` in `Footer.tsx`).
 *
 * One array, two consumers: the footer's bottom bar and the cross-link strip at
 * the end of each legal page. A second hand-typed list is how one of them ends
 * up missing a page after the next one is added.
 */
export const legalLinks: NavLink[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Data Deletion", href: "/data-deletion" },
];
