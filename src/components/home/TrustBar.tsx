import Image from "next/image";
import { clients } from "@/data/clients";

/**
 * Credibility strip sitting directly under the hero.
 *
 * Named clients rather than stat counters: a visitor can verify "Kings Mobile
 * World" by visiting the site, and cannot verify "30+ happy clients".
 *
 * On colour — this strip was previously white with the logos desaturated to
 * grey. That is the conventional logo-wall treatment and it did solve the real
 * problem, which is that the marks are crops from six different live sites and
 * their backgrounds clash. But it solved it by draining the one row on the page
 * whose entire job is to feel like real businesses, and it left the strip
 * indistinguishable from the white section beneath it.
 *
 * The strip now runs on navy and each mark sits on its own plate. Unifying the
 * crops by GROUND rather than by removing their colour keeps every logo in its
 * own brand colours, and the dark band doubles as the seam between the navy
 * hero and the light section that follows — one element doing two jobs instead
 * of a decorative divider doing neither.
 *
 * Server component: pure markup and CSS animation, no JS.
 */
export default function TrustBar() {
  // The marquee translates by exactly -50%, so the track must hold the list
  // twice for the loop to be seamless.
  const track = [...clients, ...clients];

  return (
    <section
      className="relative overflow-hidden bg-navy py-10"
      aria-label="Clients we have worked with"
    >
      {/* Amber sweep along the top edge. Signals the row is live without
          competing with the logos for attention. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px overflow-hidden">
        <div className="animate-rail-sweep h-px w-1/3 bg-linear-to-r from-transparent via-accent to-transparent" />
      </div>

      <div className="mb-7 flex items-center justify-center gap-3 px-6">
        <span className="h-px w-6 bg-accent/50" />
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
          Trusted by businesses across Telangana
        </p>
        <span className="h-px w-6 bg-accent/50" />
      </div>

      <div className="relative overflow-hidden">
        {/* Edge fades so logos dissolve rather than getting chopped at the bounds */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-linear-to-r from-navy to-transparent sm:w-28" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-linear-to-l from-navy to-transparent sm:w-28" />

        <div className="marquee-track animate-marquee-ltr flex w-max items-center gap-4 sm:gap-6">
          {track.map((client, idx) => (
            <div
              key={`${client.name}-${idx}`}
              className="logo-plate flex h-20 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/95 px-6 sm:h-22 sm:px-8"
              /* The second copy is decorative duplication — hide it from screen
                 readers so client names are not announced twice. */
              aria-hidden={idx >= clients.length}
            >
              <Image
                src={client.logo}
                alt={idx >= clients.length ? "" : client.name}
                width={client.width}
                height={client.height}
                className="h-8 w-auto sm:h-10"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
