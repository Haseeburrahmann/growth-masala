import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { navLinks } from "@/data/navigation";
import { addressLine, business } from "@/data/business";
import { locationPages } from "@/data/locations";

// Surfaced in the footer so every page links into the location cluster —
// otherwise those pages are orphans with no internal links pointing at them.
//
// ALL of them, not a slice. This was `locationPages.slice(0, 6)`, written when
// six was all there were. Six more were added and the cap silently kept them
// out: /digital-marketing-agency-hyderabad and /website-development-hyderabad —
// the two largest markets on the list — plus Wanaparthy, Kalwakurthy, Jadcherla
// and Narayanpet had zero inbound links from any static page. They were
// reachable only from the sitemap and one or two sibling cross-links, which is
// nothing to hang a ranking on for pages that exist solely to rank.
//
// If this list ever outgrows one column, wrap it — do not slice it.
const footerLocationLinks = locationPages;

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy">
      {/* Large background watermark */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
        <span className="whitespace-nowrap font-heading text-[20vw] font-bold leading-none text-white/[0.02]">
          GROWTH
        </span>
      </div>

      {/* Gradient orb — desktop only */}
      <div className="pointer-events-none hidden md:block absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-primary/10 blur-[80px]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Top strip — CTA */}
        <div className="flex flex-col items-center justify-between gap-6 border-b border-white/10 py-12 md:flex-row">
          <div>
            <h3 className="font-heading text-2xl font-bold text-white">
              Ready to add some spice?
            </h3>
            <p className="mt-1 text-sm text-slate-400">
              Let&apos;s turn your growth goals into reality.
            </p>
          </div>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/20"
          >
            Get in Touch
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Main footer grid */}
        <div className="grid gap-12 py-16 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-3">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/images/logo.png"
                alt="Growth Masala"
                width={36}
                height={36}
                className="h-9 w-9 object-contain"
              />
              <span className="font-heading text-lg font-bold text-white">
                Growth<span className="text-primary">Masala</span>
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
              A digital marketing agency in {addressLine}. We blend strategy,
              creativity, and data to cook up campaigns that deliver real,
              measurable growth — for businesses here, in Hyderabad, and across
              India.
            </p>
            <div className="mt-6 flex items-center gap-4">
              {[
                { label: "Instagram", href: "https://www.instagram.com/growthmasala?igsh=MTNqdjZqODFrNnBscQ==", svg: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" },
                { label: "Facebook", href: "https://www.facebook.com/share/17EGgbmTK9/", svg: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" },
                { label: "X", href: "https://x.com/growthmasala", svg: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-slate-400 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d={social.svg} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
              Navigation
            </h4>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-1 text-sm text-slate-400 transition-colors hover:text-white"
                  >
                    {link.label}
                    <ArrowUpRight className="h-3 w-3 opacity-0 transition-all group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Areas we serve — internal links into the location page cluster */}
          <div className="md:col-span-4">
            <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
              Areas We Serve
            </h4>
            {/* Two columns from sm up, and the block takes 4 of the 12 grid
                columns rather than 3 — the brand blurb gave one up for it.
                Twelve of these single-file ran the footer past 700px; two
                columns inside the old 3-span width wrapped every label onto
                three lines, which was worse. At 4 spans they wrap to two at
                most. */}
            <ul className="mt-4 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
              {footerLocationLinks.map((page) => (
                <li key={page.slug}>
                  <Link
                    href={`/${page.slug}`}
                    className="group inline-flex items-center gap-1 text-sm text-slate-400 transition-colors hover:text-white"
                  >
                    {page.serviceLabel} in {page.city}
                    <ArrowUpRight className="h-3 w-3 shrink-0 opacity-0 transition-all group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact — NAP must stay identical to `src/data/business.ts` */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
              Contact
            </h4>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href={`mailto:${business.email}`}
                  className="inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-primary"
                >
                  <Mail className="h-4 w-4" />
                  {business.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${business.phone}`}
                  className="inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-primary"
                >
                  <Phone className="h-4 w-4" />
                  {business.phoneDisplay}
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-slate-400">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                <address className="not-italic">{addressLine}, India</address>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-6 text-xs text-slate-400 md:flex-row">
          <span>&copy; {new Date().getFullYear()} Growth Masala. All rights reserved.</span>
          <span>Crafted with strategy & spice.</span>
        </div>
      </div>
    </footer>
  );
}
