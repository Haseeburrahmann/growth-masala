import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mail, MessageCircle } from "lucide-react";
import AnimatedContainer from "@/components/ui/AnimatedContainer";
import { business, address } from "@/data/business";

/**
 * Closing CTA — two overlapping discs above an amber contact slab.
 *
 * The composition is doing one job the old centred navy panel could not: it
 * puts the town on the page. A map of Mahabubnagar sitting beside the ask is
 * the claim no Hyderabad competitor can copy, and it costs no copy to make.
 *
 * Notes for anyone editing this:
 *
 * The map is deliberately a wide view of the town with NO marker. The street
 * address in `business.ts` is a road-level placeholder set on the owner's
 * instruction, and a pin would turn that placeholder into a specific claim
 * about premises. Add the marker in the same commit that lands the real
 * address, not before.
 *
 * It is a flat image, not a live embed. The OpenStreetMap iframe this started
 * as pulled 1.9MB of Leaflet and tiles on a section nobody interacts with, and
 * on the mid-range Android and patchy 4G this site is built for that is not a
 * decoration anyone can afford. It also swallowed vertical swipes on touch and
 * panned instead of scrolling. A one-off capture of the same view is 44KB,
 * costs no third-party request, and looks identical. Regenerate it by
 * screenshotting `openstreetmap.org/export/embed.html?bbox=...&layer=mapnik`
 * around the coordinates in `business.ts` if the town view ever needs updating.
 *
 * OpenStreetMap rather than Google because it needs no API key or billing
 * account. Its licence wants visible credit, which is the line at the foot of
 * the slab. Do not delete it.
 *
 * The CTA button stays blue. The reference this is modelled on uses an amber
 * button, but on this site amber is the object and blue is the thing you click;
 * an amber CTA here would be the only amber button in the codebase.
 *
 * The discs become rounded rectangles below `lg`. A circle wide enough to hold
 * a headline is taller than a phone viewport, and the inscribed text box of a
 * 320px circle is about 220px — not enough for six words.
 */

const contactRoutes = [
  {
    label: "WhatsApp",
    value: business.phoneDisplay,
    href: business.whatsapp,
    external: true,
    icon: MessageCircle,
    copy: "Message us with what you need. You get a real reply, usually the same day.",
  },
  {
    label: "Email",
    value: business.email,
    href: `mailto:${business.email}`,
    external: false,
    icon: Mail,
    copy: "Send the details and we will come back with a fixed quote, not a discovery call.",
  },
];

export default function CTASection() {
  return (
    <section className="relative overflow-hidden bg-white py-24 sm:py-28">
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* The figure stands in front of the whole composition, straddling the
            seam between the two discs and the top of the slab. She is the only
            cut-out image on the site — everything else is masked or cropped —
            which is why she gets a real alpha channel rather than a
            `.photo-blend` ellipse: there is no single background colour behind
            her to dissolve into.

            Desktop only. On a phone the discs and the slab stack into one
            narrow column and there is no space left to stand in. Decorative,
            so the alt is empty: she makes no claim the copy does not. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-1/2 z-30 hidden w-88 -translate-x-[58%] lg:block xl:w-96"
        >
          <Image
            src="/images/sections/owner-cutout.webp"
            alt=""
            width={825}
            height={1100}
            className="h-auto w-full"
            sizes="384px"
          />
        </div>

        {/* ---------- The two discs ----------
            They overlap by 4rem at `lg` — the navy one sits on top and to the
            left, which is what makes the pair read as one object rather than
            two things next to each other. */}
        <div className="relative flex flex-col items-center gap-8 lg:flex-row lg:items-center lg:justify-center lg:gap-0">
          <AnimatedContainer
            animation="fade-in"
            className="w-full max-w-md lg:w-auto lg:max-w-none"
          >
            <div className="relative aspect-square w-full overflow-hidden rounded-3xl border border-border bg-surface lg:h-104 lg:w-104 lg:rounded-full">
              <Image
                src="/images/sections/mahabubnagar-map.webp"
                alt={`Street map of ${address.locality}, ${address.region}`}
                fill
                loading="lazy"
                /* Desaturated to sit inside the palette. OSM's default road
                   colours are louder than anything else on this page and pull
                   the eye off the headline beside them. */
                className="object-cover filter-[saturate(0.35)_contrast(1.05)]"
                sizes="(max-width: 1023px) 90vw, 416px"
              />
            </div>
          </AnimatedContainer>

          <AnimatedContainer
            animation="scale-in"
            delay={120}
            className="w-full max-w-md lg:z-10 lg:-ml-16 lg:w-auto lg:max-w-none"
          >
            <div className="noise-overlay relative flex aspect-square w-full flex-col items-center justify-center rounded-3xl bg-navy px-8 text-center lg:h-120 lg:w-120 lg:rounded-full lg:px-16">
              <h2 className="relative z-10 max-w-[16rem] font-heading text-3xl font-bold uppercase leading-[1.1] tracking-tight text-white sm:text-4xl">
                Ready to grow your business{" "}
                <span className="text-accent">online?</span>
              </h2>
              <Link
                href="/contact"
                className="group relative z-10 mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-secondary"
              >
                Get a free consultation
                <ArrowRight className="cta-arrow h-4 w-4" />
              </Link>
            </div>
          </AnimatedContainer>
        </div>

        {/* ---------- Amber contact slab ----------
            Pulled up over the feet of both discs. Amber is used here the way
            the brand uses it everywhere else: as a filled structural block, not
            as a highlight on something else. */}
        <AnimatedContainer animation="fade-in" delay={200}>
          <div className="relative z-20 -mt-8 overflow-hidden rounded-3xl bg-accent px-7 py-10 sm:px-12 sm:py-12 lg:-mt-16 lg:px-16">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-40 bg-[radial-gradient(circle,rgba(11,17,33,0.18)_1px,transparent_1px)] bg-size-[22px_22px]"
            />

            {/* The middle column is empty on purpose: it is the space the
                  figure stands in. Without it her shoulders sit on top of the
                  email address. */}
            <div className="relative grid gap-10 sm:grid-cols-2 sm:gap-12 lg:grid-cols-[1fr_18rem_1fr] lg:gap-0">
              {contactRoutes.map(({ label, value, href, external, icon: Icon, copy }, idx) => (
                <div
                  key={label}
                  className={`lg:max-w-80 ${idx === 1 ? "lg:col-start-3" : ""}`}
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-navy">
                    <Icon className="h-5 w-5 text-accent" />
                  </span>
                  <a
                    href={href}
                    {...(external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="link-sweep mt-6 inline-block font-heading text-xl font-bold tracking-tight text-navy sm:text-2xl"
                  >
                    {value}
                  </a>
                  <div className="mt-4 h-px w-full bg-navy/15" />
                  <p className="mt-4 max-w-xs text-sm leading-relaxed text-navy/70">
                    {copy}
                  </p>
                </div>
              ))}
            </div>

            {/* OpenStreetMap's licence asks for visible credit near the map.
                This is that credit — the disc above clips the embed's own. */}
            <p className="relative mt-10 text-[11px] text-navy/45">
              Map data © OpenStreetMap contributors
            </p>
          </div>
        </AnimatedContainer>
      </div>
    </section>
  );
}
