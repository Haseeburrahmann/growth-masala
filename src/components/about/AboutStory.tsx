import Image from "next/image";
import AnimatedContainer from "@/components/ui/AnimatedContainer";
import { address, areasServed, business, trackRecord } from "@/data/business";

/**
 * "Why we exist" — the origin story, next to the numbers.
 *
 * ── On the stat row ───────────────────────────────────────────────────────
 *
 * It used to read: 50+ Projects Delivered · 30+ Happy Clients · 3x Average
 * Growth Rate · 95% Client Retention.
 *
 * The first two are owner-confirmed and come from `trackRecord` in
 * `business.ts`, which also feeds the /portfolio title — they were typed
 * separately before, which is how that page ended up promising "50+" in the
 * SERP and rendering "8+" in its hero.
 *
 * The other two are gone. "3x average growth rate" is a cross-client
 * performance claim over an unstated baseline and period; "95% client
 * retention" is a ratio nobody computed. Neither has a source, both are the
 * first thing a Clutch reviewer or a competitor would ask for evidence of, and
 * an agency that publishes unverifiable numbers on its About page has a weaker
 * position when it later asks a client to trust its reporting.
 *
 * The two replacements are derived rather than asserted: the founding year, and
 * `areasServed.length` — the same list that feeds the `areaServed` property on
 * the LocalBusiness JSON-LD, so the coverage the page claims and the coverage
 * Google is told about can never diverge.
 *
 * Both `trackRecord` figures are floors and must always render with a trailing
 * "+". Do not add a metric here that is not in `business.ts`.
 */
export default function AboutStory() {
  const stats = [
    { value: `${trackRecord.projectsDelivered}+`, label: "Projects delivered" },
    { value: `${trackRecord.clientsServed}+`, label: "Clients served" },
    { value: `${business.foundingYear}`, label: "Working since" },
    { value: `${areasServed.length}`, label: "Areas covered" },
  ];

  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,560px)_1fr] lg:gap-14">
          <AnimatedContainer animation="fade-in">
            <div className="overflow-hidden rounded-2xl">
              {/* Empty alt on purpose. This is generic workspace imagery — a
                  staged photograph of nobody in particular, not a photograph of
                  the Growth Masala team. Describing it as one on the About page
                  would be the same class of small untruth this rewrite exists to
                  remove, and it sits directly beside the owner-confirmed stat
                  row, which is the last place to put an implied claim. So it is
                  decorative: hidden from assistive tech rather than narrated
                  misleadingly. Keep the alt empty if this file is replaced. */}
              <Image
                src="/images/sections/team-work.webp"
                alt=""
                width={1120}
                height={840}
                className="aspect-4/3 w-full object-cover"
                sizes="(max-width: 1024px) 100vw, 560px"
                loading="lazy"
              />
            </div>
          </AnimatedContainer>

          <AnimatedContainer delay={120}>
            <h2 className="font-heading text-3xl font-bold leading-tight tracking-tight text-text-primary sm:text-4xl">
              Why we exist
            </h2>

            <div className="mt-5 space-y-4 text-base leading-[1.7] text-text-secondary">
              <p>
                Most agencies within reach of a {address.locality} business are
                two hours away in Hyderabad, where you are a small account on a
                big retainer. The alternatives were a freelancer who goes quiet
                halfway through, or somebody&rsquo;s nephew who never finishes.
                None of that is a real option when the website is how customers
                find you.
              </p>
              <p>
                So we set up here — an address you can walk into and a phone
                answered in Telugu, Hindi or English. Whoever quotes your job is
                the one who builds it, and nothing gets handed to a trainee once
                the invoice clears.
              </p>
            </div>

            {/* Two-up cards on mobile, a flat four-column row on desktop — the
                borders exist to separate the cells when they wrap, and are not
                needed once they sit on one line. */}
            <dl className="mt-7 grid grid-cols-2 gap-4 lg:mt-8 lg:grid-cols-4 lg:gap-5">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-border bg-surface p-4 lg:border-0 lg:bg-transparent lg:p-0"
                >
                  {/* Source order is dt-then-dd, which the spec requires;
                      `flex-col-reverse` puts the figure on top visually. */}
                  <div className="flex flex-col-reverse gap-1">
                    <dt className="text-[13px] leading-4.5 text-text-secondary">
                      {stat.label}
                    </dt>
                    <dd className="font-heading text-[28px] font-bold tracking-tight text-primary tabular-nums sm:text-3xl">
                      {stat.value}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>
          </AnimatedContainer>
        </div>
      </div>
    </section>
  );
}
