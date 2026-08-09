import Link from "next/link";
import { Check, ArrowRight, Info } from "lucide-react";
import AnimatedContainer from "@/components/ui/AnimatedContainer";
import SectionIntro from "@/components/home/SectionIntro";
import { websiteTiers, carePlans, formatPrice } from "@/data/pricing";
import { pricingWhatsappLink } from "@/lib/whatsapp";
import type { PricingTier } from "@/types";

/**
 * Published pricing — the one-time build tiers, plus one line for care.
 *
 * Add-ons and the full fine print still belong to the pricing page. On a
 * homepage they answer a question nobody has reached yet: a reader still
 * deciding whether a website is worth ₹9,999 is not weighing monthly backup
 * frequency. The care band is the exception, because "do I have to pay you
 * every month?" is the objection that stops the sale, and one sentence with a
 * real number settles it.
 *
 * Every rupee figure comes from `src/data/pricing.ts`. Nothing here hardcodes a
 * price, so the UI can never drift from the JSON-LD `Offer` markup or from what
 * the chatbot quotes — including the care figure, which is read from
 * `carePlans[0]` rather than typed.
 *
 * Server component — static data, no interactivity beyond links.
 */

function Price({ tier, dark }: { tier: PricingTier; dark: boolean }) {
  return (
    <p className="flex items-end gap-2">
      <span className="font-heading text-[2.5rem] font-bold leading-none tracking-tight tabular-nums">
        {formatPrice(tier.amount)}
      </span>
      <span className={`text-sm ${dark ? "text-slate-400" : "text-slate-500"}`}>
        {tier.billing === "monthly" ? "/ month" : "one-time"}
      </span>
    </p>
  );
}

export default function PricingSection() {
  const care = carePlans[0];

  return (
    <section id="pricing" className="relative overflow-hidden bg-white py-20 sm:py-24">
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <SectionIntro
          eyebrow="Pricing"
          lead="Real numbers,"
          trail="published."
          standfirst="No call needed to find out if you can afford us. Here is what a website costs."
        />

        <div className="mt-10 grid items-stretch gap-5 md:grid-cols-3 lg:mt-14 lg:gap-8">
          {websiteTiers.map((tier, idx) => {
            const popular = Boolean(tier.popular);

            return (
              <AnimatedContainer
                key={tier.id}
                delay={idx * 110}
                /* The recommended tier leads on mobile — stacked, the middle
                   card lands where nobody scrolls. */
                className={`h-full ${popular ? "order-first md:order-none" : ""}`}
              >
                <div
                  className={`flex h-full flex-col rounded-2xl p-6 sm:p-8 ${
                    popular
                      ? "bg-navy text-white shadow-xl shadow-navy/30 md:py-11"
                      : "border border-border bg-white text-text-primary"
                  }`}
                >
                  {/* Badge sits inline with the name rather than pinned above
                      the card edge: an absolutely-positioned pill overhanging a
                      card is the first thing to collide with the card above it
                      once the row stacks. */}
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-heading text-xl font-semibold">{tier.name}</h3>
                    {popular && (
                      <span className="rounded-full bg-accent px-3 py-1.5 text-xs font-semibold tracking-wide text-navy">
                        Most popular
                      </span>
                    )}
                  </div>

                  <p
                    className={`mt-2 text-sm leading-relaxed ${
                      popular ? "text-slate-300" : "text-slate-500"
                    }`}
                  >
                    {tier.audience}
                  </p>

                  <div className="mt-6">
                    <Price tier={tier} dark={popular} />
                  </div>

                  <ul
                    className={`mt-6 flex flex-1 flex-col gap-3 border-t pt-5 ${
                      popular ? "border-white/12" : "border-border"
                    }`}
                  >
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-sm leading-snug">
                        <Check
                          aria-hidden="true"
                          className={`mt-0.5 h-4 w-4 shrink-0 ${
                            popular ? "text-accent" : "text-primary"
                          }`}
                        />
                        {/* "Everything in Starter, plus:" is a hinge, not a
                            feature — the trailing colon is what marks it, and
                            it is the only thing in the list that introduces
                            what follows. */}
                        <span
                          className={`${feature.endsWith(":") ? "font-semibold" : ""} ${
                            popular ? "text-slate-300" : "text-text-secondary"
                          }`}
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href={pricingWhatsappLink(tier.name, formatPrice(tier.amount))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group mt-7 inline-flex min-h-14 items-center justify-center gap-3 rounded-full px-6 text-[15px] font-semibold transition-colors ${
                      popular
                        ? "bg-primary text-white shadow-lg shadow-primary/25 hover:bg-primary-dark"
                        : "border border-border bg-white text-text-primary hover:border-primary/40"
                    }`}
                  >
                    {tier.ctaLabel}
                    {popular ? (
                      <span className="flex h-6.5 w-6.5 items-center justify-center rounded-full bg-white/20">
                        <ArrowRight className="cta-arrow h-3.5 w-3.5" />
                      </span>
                    ) : (
                      <ArrowRight className="cta-arrow h-4 w-4 text-primary" />
                    )}
                  </a>
                </div>
              </AnimatedContainer>
            );
          })}
        </div>

        {/* Care band. The one recurring number the homepage carries, and the
            answer to the objection the tiers above cannot address. */}
        <AnimatedContainer animation="fade-in" delay={140} className="mt-10">
          <div className="flex flex-col gap-4 rounded-2xl border border-border bg-surface p-5 sm:p-7 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
            <div>
              <p className="font-heading text-[17px] font-semibold text-text-primary">
                Already have a site? Care from {formatPrice(care.amount)} / month
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-text-secondary">
                Updates, backups, security and small changes.
              </p>
            </div>
            <Link
              href="/services#pricing"
              className="group inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full border border-border bg-white px-6 text-[15px] font-semibold text-text-primary transition-colors hover:border-primary/40"
            >
              See care plans
              <ArrowRight className="cta-arrow h-4 w-4 text-primary" />
            </Link>
          </div>
        </AnimatedContainer>

        <AnimatedContainer animation="fade-in" delay={180}>
          <p className="mt-5 flex items-start gap-2.5 text-[13px] leading-5 text-slate-500">
            <Info aria-hidden="true" className="mt-px h-4 w-4 shrink-0" />
            Prices exclude GST. Anything else is quoted as a fixed price first.
            The first consultation is free.
          </p>
        </AnimatedContainer>
      </div>
    </section>
  );
}
