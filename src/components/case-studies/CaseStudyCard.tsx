import Image from "next/image";
import { Check, ExternalLink, MapPin, Target, TrendingUp, Wrench } from "lucide-react";
import AnimatedContainer from "@/components/ui/AnimatedContainer";
import type { CaseStudy } from "@/types";

interface CaseStudyCardProps {
  study: CaseStudy;
  index: number;
}

/**
 * One case study, as a three-part story: what was wrong, what we built, what
 * exists now.
 *
 * The third column is the point of this rewrite. It used to be headed RESULTS,
 * with a green trending-up icon, rendering `{ metric: "Live", label: "Online
 * Presence" }` as a 24px bold figure — the exact typographic treatment a real
 * KPI would get. A reader skimming saw numbers and read outcomes. There were no
 * outcomes; there was a website that existed.
 *
 * So it is a checklist now, headed "What shipped", set at body size. Checkmarks
 * make a completeness claim, which is true. Big numerals make a measurement
 * claim, which was not. Nothing here needs the reader to take our word for it —
 * every line is verifiable by opening the live site.
 *
 * The trending-up icon and the emerald tone are held back for `study.outcome`,
 * which is undefined on all three today. When a client finally shares a real
 * figure it inherits the treatment the fake ones were borrowing, and it will be
 * the only number on the card — which is what makes it land.
 */
export default function CaseStudyCard({ study, index }: CaseStudyCardProps) {
  return (
    <AnimatedContainer delay={index * 120}>
      <article
        className={`overflow-hidden rounded-3xl bg-linear-to-br ${study.gradient} p-8 sm:p-12`}
      >
        {/* Header — client, where they trade, and the live link */}
        <div className="mb-8 flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="rounded-full bg-white/60 px-3 py-1 text-xs font-medium text-text-secondary backdrop-blur-sm">
            {study.category}
          </span>
          <h2 className="font-heading text-lg font-bold text-text-primary">
            {study.client}
          </h2>
          <span className="inline-flex items-center gap-1 text-xs font-medium text-text-secondary">
            <MapPin aria-hidden="true" className="h-3.5 w-3.5" />
            {study.location}
          </span>
          {study.link && (
            <a
              href={study.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group ml-auto inline-flex items-center gap-1.5 rounded-full bg-white/70 px-4 py-2 text-xs font-semibold text-primary backdrop-blur-sm transition-all hover:bg-white"
            >
              View live site
              <ExternalLink
                aria-hidden="true"
                className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          )}
        </div>

        <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
          <div className="rounded-2xl bg-white/60 p-6 backdrop-blur-sm">
            <div className="mb-3 flex items-center gap-2">
              <Target aria-hidden="true" className="h-4 w-4 text-red-500" />
              <h3 className="font-heading text-xs font-bold uppercase tracking-[0.15em] text-red-600">
                The problem
              </h3>
            </div>
            <p className="text-sm leading-relaxed text-text-secondary">
              {study.challenge}
            </p>
          </div>

          <div className="rounded-2xl bg-white/60 p-6 backdrop-blur-sm">
            <div className="mb-3 flex items-center gap-2">
              <Wrench aria-hidden="true" className="h-4 w-4 text-primary" />
              <h3 className="font-heading text-xs font-bold uppercase tracking-[0.15em] text-primary">
                What we built
              </h3>
            </div>
            <p className="text-sm leading-relaxed text-text-secondary">
              {study.solution}
            </p>
          </div>

          <div className="rounded-2xl bg-white/60 p-6 backdrop-blur-sm">
            <div className="mb-3 flex items-center gap-2">
              <Check aria-hidden="true" className="h-4 w-4 text-emerald-600" />
              <h3 className="font-heading text-xs font-bold uppercase tracking-[0.15em] text-emerald-700">
                What shipped
              </h3>
            </div>
            <ul className="space-y-2.5">
              {study.delivered.map((item) => (
                <li key={item} className="flex gap-2.5">
                  <Check
                    aria-hidden="true"
                    className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600"
                  />
                  <span className="text-sm leading-relaxed text-text-secondary">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            {/* Reserved for a real measured figure. Undefined on every study
                today — see the note in `caseStudies.ts`. */}
            {study.outcome && (
              <p className="mt-5 flex items-start gap-2 border-t border-emerald-600/20 pt-5">
                <TrendingUp
                  aria-hidden="true"
                  className="mt-1 h-4 w-4 shrink-0 text-emerald-600"
                />
                <span className="font-heading text-base font-bold text-text-primary">
                  {study.outcome}
                </span>
              </p>
            )}
          </div>
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl border border-white/60">
          <a href={study.link} target="_blank" rel="noopener noreferrer">
            <div className="relative aspect-16/9 sm:aspect-21/9">
              <Image
                src={study.image}
                alt={`${study.client} website built by Growth Masala`}
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 1152px"
                loading="lazy"
              />
            </div>
          </a>
        </div>
      </article>
    </AnimatedContainer>
  );
}
