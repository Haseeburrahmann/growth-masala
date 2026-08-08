import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import AnimatedContainer from "@/components/ui/AnimatedContainer";
import { address, business, openingHoursLine } from "@/data/business";

/**
 * Closing band for /case-studies.
 *
 * "Start Your Growth Story" was the old label — the kind of phrase that means
 * nothing and commits to nothing. What someone reaches this point wanting is a
 * specific, low-stakes next step, so the button says what the first
 * conversation actually is, and the opening hours sit underneath it so nobody
 * has to guess whether a message sent now gets read tonight.
 */
export default function CaseStudiesCTA() {
  return (
    <section className="relative overflow-hidden bg-navy py-20 sm:py-28">
      <div className="dot-pattern pointer-events-none absolute inset-0 opacity-40" />
      <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary/20 blur-[100px]" />

      <div className="relative mx-auto max-w-3xl px-6 text-center lg:px-8">
        <AnimatedContainer>
          <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">
            Tell us what is not working
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-slate-400">
            Every project above started the same way — a business in{" "}
            {address.region} describing the thing its customers could not do, and
            a team in {address.locality} working out what to build about it. Tell
            us yours and we will say straight whether a website fixes it, whether
            something cheaper would, or whether we are the wrong people for it.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-primary-dark"
            >
              Start the conversation
              <ArrowRight className="cta-arrow h-4 w-4" />
            </Link>
            <a
              href={business.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-primary/40 hover:bg-white/10"
            >
              <MessageCircle className="h-4 w-4 text-primary" />
              {business.phoneDisplay}
            </a>
          </div>

          <p className="mt-6 text-sm text-slate-400">{openingHoursLine}</p>
        </AnimatedContainer>
      </div>
    </section>
  );
}
