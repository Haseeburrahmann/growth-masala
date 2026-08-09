import Image from "next/image";
import { Clock3, Mail, MapPin, Phone } from "lucide-react";
import AnimatedContainer from "@/components/ui/AnimatedContainer";
import {
  address,
  addressLine,
  business,
  openingHoursLine,
} from "@/data/business";

/**
 * Where we are — the map beside the NAP block.
 *
 * This is the canonical on-page rendering of the Name/Address/Phone that every
 * external listing has to carry character for character. It is composed
 * entirely from `business.ts` so a correction there propagates here; nothing on
 * this card is typed twice.
 *
 * The map carries NO marker, and that is deliberate. `address.streetAddress` is
 * a road-level placeholder set on the owner's instruction, and a pin would turn
 * it into a specific claim about premises. Add the marker in the same commit
 * that lands the real address.
 *
 * It is a flat image rather than a live embed for the same reason it is on the
 * homepage: the OpenStreetMap iframe pulled 1.9MB of Leaflet and tiles and
 * swallowed vertical swipes on touch. OSM's licence wants visible credit, which
 * is the line under the image. **Do not delete it** — the canvas does not draw
 * it, but the licence is not a design decision.
 */

const napRows = [
  {
    icon: MapPin,
    label: "Address",
    value: addressLine,
    href: null,
  },
  {
    icon: Phone,
    label: "Phone",
    value: business.phoneDisplay,
    href: `tel:${business.phone}`,
  },
  {
    icon: Mail,
    label: "Email",
    value: business.email,
    href: `mailto:${business.email}`,
  },
  {
    icon: Clock3,
    label: "Hours",
    value: openingHoursLine,
    href: null,
  },
];

export default function ContactLocal() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-start gap-5 lg:grid-cols-5">
          <AnimatedContainer className="lg:col-span-3">
            <div className="relative aspect-[640/452] w-full overflow-hidden rounded-[20px] border border-border bg-surface">
              <Image
                src="/images/sections/mahabubnagar-map.webp"
                alt={`Street map of ${address.locality}, ${address.region}`}
                fill
                loading="lazy"
                /* Desaturated so OSM's road colours sit inside the palette
                   rather than pulling the eye off the card beside them. */
                className="object-cover filter-[saturate(0.35)_contrast(1.05)]"
                sizes="(max-width: 1023px) 90vw, 55vw"
              />
            </div>
            <p className="mt-3 text-[12px] text-text-secondary/60">
              Map data © OpenStreetMap contributors
            </p>
          </AnimatedContainer>

          <AnimatedContainer delay={120} className="lg:col-span-2">
            <div className="rounded-[20px] border border-border bg-surface p-7">
              <p className="font-heading text-xl font-semibold text-text-primary">
                {business.name}
              </p>
              <p className="mt-1.5 text-sm leading-[21px] text-text-secondary/85">
                Digital marketing agency · {address.locality}, {address.region}
              </p>

              <dl className="mt-5 divide-y divide-border">
                {napRows.map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-center gap-3.5 py-3.5">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/8">
                      <Icon aria-hidden="true" className="h-4 w-4 text-primary" />
                    </span>
                    <div className="min-w-0">
                      <dt className="text-xs font-semibold uppercase tracking-[0.1em] text-text-secondary/85">
                        {label}
                      </dt>
                      <dd className="mt-0.5 text-[15px] font-medium leading-[23px] text-text-primary">
                        {href ? (
                          <a
                            href={href}
                            className="break-words transition-colors hover:text-primary"
                          >
                            {value}
                          </a>
                        ) : (
                          value
                        )}
                      </dd>
                    </div>
                  </div>
                ))}
              </dl>
            </div>
          </AnimatedContainer>
        </div>
      </div>
    </section>
  );
}
