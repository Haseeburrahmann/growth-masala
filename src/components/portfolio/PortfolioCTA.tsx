import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import AnimatedContainer from "@/components/ui/AnimatedContainer";
import { address, business } from "@/data/business";
import { formatPrice, websiteTiers } from "@/data/pricing";

/**
 * Closing band for /portfolio.
 *
 * The previous version offered one route — "Start Your Project" → /contact —
 * which asks the highest-commitment action of someone who has just been
 * browsing. Two lower-commitment exits sit beside it now: the published price
 * list, and WhatsApp. Someone who has spent two minutes opening client sites
 * usually wants to know what one costs before they want to talk.
 *
 * The price is read from `pricing.ts` rather than typed, for the same reason
 * `trackRecord` moved into `business.ts` — a number repeated by hand is a number
 * that eventually disagrees with itself.
 */
export default function PortfolioCTA() {
  return (
    <section className="bg-white pb-20 sm:pb-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <AnimatedContainer animation="fade-in">
          <div className="relative overflow-hidden rounded-3xl bg-navy p-10 text-center sm:p-14">
            <div className="dot-pattern pointer-events-none absolute inset-0 opacity-50" />
            <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-primary/20 blur-[90px]" />

            <div className="relative">
              <h2 className="font-heading text-2xl font-bold text-white sm:text-3xl">
                Want one of these for your business?
              </h2>
              {/* No delivery timeline here. `faqs.ts` flags it as the highest-
                  value fact the owner has not supplied, and a guessed "two to
                  six weeks" is a promise the business would be held to. */}
              <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-slate-400">
                We build from {address.locality} for businesses across{" "}
                {address.region}. Website packages are a one-time payment and the
                site is yours outright — the same answer our FAQ gives, so
                nothing above is on a subscription it cannot leave. Websites
                start at{" "}
                <Link
                  href="/services#pricing"
                  className="font-semibold text-white underline decoration-accent decoration-2 underline-offset-4 transition-colors hover:text-accent"
                >
                  {formatPrice(websiteTiers[0].amount)}
                </Link>
                , excluding GST, and the full price list is published.
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-primary-dark"
                >
                  Start your project
                  <ArrowRight className="cta-arrow h-4 w-4" />
                </Link>
                <a
                  href={business.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-primary/40 hover:bg-white/10"
                >
                  <MessageCircle className="h-4 w-4 text-primary" />
                  Ask on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </AnimatedContainer>
      </div>
    </section>
  );
}
