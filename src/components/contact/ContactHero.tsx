import { Clock3, Languages, MapPin } from "lucide-react";
import AnimatedContainer from "@/components/ui/AnimatedContainer";
import { address, languages } from "@/data/business";

/**
 * The one `<h1>` on /contact.
 *
 * ⚠️ The headline used to read "Talk to a real person in Mahabubnagar", which
 * put the locality in the H1. The approved canvas replaced it with "Tell us the
 * problem. / Get a real answer back." — no locality, no keyword.
 *
 * That is acceptable *here* in a way it would not be on /services: a contact
 * page is not the ranking target for a service phrase, and the locality has not
 * actually left the fold — it is the third trust pill below, it is the whole of
 * the NAP card further down, and `layout.tsx` still carries
 * "Free Consultation in Mahabubnagar" in the title and description. The metadata
 * contract is untouched.
 *
 * The three channel cards that used to sit in this hero moved down into
 * `ContactChannels`, where the canvas gives each one a description and a
 * response time instead of a bare number.
 *
 * The pills are derived, never typed. "Station Road, Mahabubnagar" is
 * `address.streetAddress` + `address.locality` — the same placeholder street
 * that every other surface renders, so it cannot drift out of NAP alignment on
 * its own (see the warning at the top of `business.ts`).
 */
export default function ContactHero() {
  const pills = [
    { icon: Clock3, label: "Replies the same working day" },
    { icon: Languages, label: languages.join(" · ") },
    {
      icon: MapPin,
      label: `${address.streetAddress}, ${address.locality}`,
    },
  ];

  return (
    <section className="relative overflow-hidden bg-navy pt-32 pb-20 sm:pt-40 sm:pb-24">
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-60" />
      <div className="pointer-events-none absolute inset-0">
        <div className="animate-float-slow hidden md:block absolute -top-40 right-[6%] h-80 w-80 rounded-full bg-primary/20 blur-[100px]" />
        <div className="animate-float hidden md:block absolute top-40 left-[-6%] h-64 w-64 rounded-full bg-accent/10 blur-[90px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <AnimatedContainer>
          <div className="flex items-center gap-3">
            <div className="h-px w-8 bg-accent/50" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Contact
            </span>
          </div>

          {/* One <h1>, two visual lines. Never two <h1> elements. */}
          <h1 className="mt-6 max-w-3xl font-heading text-[2rem] font-bold leading-[1.1] tracking-[-0.03em] text-white text-balance sm:text-5xl lg:text-[3.25rem]">
            <span className="block">Tell us the problem.</span>
            <span className="block text-slate-400">
              Get a real answer back.
            </span>
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-[17px]">
            No discovery call and no form that disappears. Message us and a
            person replies — usually within a few hours, always the same working
            day.
          </p>
        </AnimatedContainer>

        <AnimatedContainer delay={120} animation="fade-in">
          <ul className="mt-8 flex flex-wrap gap-2.5">
            {pills.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/6 px-4 py-2.5 text-[13px] font-medium text-slate-300"
              >
                <Icon aria-hidden="true" className="h-3.5 w-3.5 text-sky" />
                {label}
              </li>
            ))}
          </ul>
        </AnimatedContainer>
      </div>
    </section>
  );
}
