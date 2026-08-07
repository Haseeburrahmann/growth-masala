import Image from "next/image";
import { clients } from "@/data/clients";

/**
 * Thin credibility strip sitting directly under the hero.
 *
 * Named clients rather than stat counters: a visitor can verify "Kings Mobile
 * World" by visiting the site, and cannot verify "30+ happy clients".
 *
 * The logos are crops from each client's own live site, so their backgrounds
 * clash badly with one another. Desaturating them to a uniform grey — restored
 * to full colour on hover — is what makes six mismatched crops read as one
 * strip. It is also the conventional treatment for a logo wall, so it looks
 * deliberate rather than like a workaround.
 *
 * Server component: this is pure markup and a CSS animation, no JS needed.
 */
export default function TrustBar() {
  // The marquee translates by exactly -50%, so the track must hold the list
  // twice for the loop to be seamless.
  const track = [...clients, ...clients];

  return (
    <section
      className="relative border-b border-border bg-white py-8"
      aria-label="Clients we have worked with"
    >
      <p className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.2em] text-text-secondary/70">
        Trusted by businesses across Telangana
      </p>

      <div className="relative overflow-hidden">
        {/* Edge fades so logos dissolve rather than getting chopped at the bounds */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-linear-to-r from-white to-transparent sm:w-28" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-linear-to-l from-white to-transparent sm:w-28" />

        <div className="marquee-track animate-marquee-ltr flex w-max items-center gap-10 sm:gap-16">
          {track.map((client, idx) => (
            <div
              key={`${client.name}-${idx}`}
              className="flex shrink-0 items-center"
              /* The second copy is decorative duplication — hide it from screen
                 readers so client names are not announced twice. */
              aria-hidden={idx >= clients.length}
            >
              <Image
                src={client.logo}
                alt={idx >= clients.length ? "" : client.name}
                width={client.width}
                height={client.height}
                /* Partial desaturation, not full: these crops carry very
                   different contrast, and at 100% grayscale the lighter marks
                   almost vanish while the dark ones stay heavy. */
                className="h-8 w-auto rounded opacity-85 grayscale-[0.7] transition duration-500 hover:opacity-100 hover:grayscale-0 sm:h-10"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
