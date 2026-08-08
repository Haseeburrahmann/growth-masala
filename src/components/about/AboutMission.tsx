import Link from "next/link";
import { ArrowRight, Flame, MessageCircle } from "lucide-react";
import AnimatedContainer from "@/components/ui/AnimatedContainer";
import { address, business } from "@/data/business";

/**
 * Mission statement and the page's only call to action.
 *
 * The old version ended on the mission alone — a centred quote about being "the
 * growth partner every ambitious business deserves" with nothing to click. A
 * reader who had gone all the way down the About page and was persuaded had no
 * next step, and every other page on the site closes with one.
 *
 * The mission is also rewritten. "Honest, effective, and built on real data" is
 * three adjectives no agency would disclaim, which makes it unfalsifiable and
 * therefore uninformative. The replacement names a specific thing we will do
 * that costs us something — turning work down — which is the only kind of
 * mission statement worth printing.
 */
export default function AboutMission() {
  return (
    <section className="relative overflow-hidden bg-navy py-24 sm:py-32">
      <div className="dot-pattern pointer-events-none absolute inset-0 opacity-40" />
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-primary/20 blur-[110px]" />
      <div className="pointer-events-none absolute -bottom-24 right-[8%] h-56 w-56 rounded-full bg-accent/10 blur-[90px]" />

      <div className="relative mx-auto max-w-3xl px-6 text-center lg:px-8">
        <AnimatedContainer>
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
            <Flame aria-hidden="true" className="h-7 w-7 text-accent" />
          </div>

          <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">
            What we are actually trying to do
          </h2>

          <blockquote className="mt-6 text-lg leading-relaxed text-slate-300 sm:text-xl">
            &ldquo;To make good digital work normal in {address.locality} — priced
            openly, built to be owned, and honest enough to tell a business when
            it does not need what we sell.&rdquo;
          </blockquote>

          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-slate-400">
            That last part is the one that costs us money, and it is the one we
            mean most. If a small fix to the site you already have would do the
            job, we would rather say so and keep the relationship than sell you a
            rebuild you did not need.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-primary-dark"
            >
              Talk to us
              <ArrowRight className="cta-arrow h-4 w-4" />
            </Link>
            <a
              href={business.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-primary/40 hover:bg-white/10"
            >
              <MessageCircle className="h-4 w-4 text-primary" />
              WhatsApp {business.phoneDisplay}
            </a>
          </div>
        </AnimatedContainer>
      </div>
    </section>
  );
}
