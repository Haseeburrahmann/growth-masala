import { Check, ArrowRight } from "lucide-react";
import AnimatedContainer from "@/components/ui/AnimatedContainer";
import { websiteTiers, formatPrice } from "@/data/pricing";
import { pricingWhatsappLink } from "@/lib/whatsapp";
import type { PricingTier } from "@/types";

/**
 * Published pricing — the one-time build tiers only.
 *
 * Care plans, add-ons, the fine print and the "not on this list" escape hatch
 * were all here and now belong to the pricing page. On a homepage they answered
 * a question nobody had reached yet: a reader still deciding whether a website
 * is worth ₹9,999 is not weighing monthly backup frequency. Two billing models
 * in one section also stop "₹9,999" and "₹1,499/mo" being comparable figures.
 *
 * The data is untouched in `src/data/pricing.ts` — `carePlans` and `addOns` are
 * still read by the chatbot, the FAQ and the JSON-LD `OfferCatalog`, and the
 * pricing page will render them alongside `pricingFinePrint` when it lands.
 *
 * Every rupee figure comes from `src/data/pricing.ts`. Nothing here hardcodes a
 * price, so the UI can never drift from the JSON-LD `Offer` markup or from what
 * the chatbot quotes.
 *
 * Server component — static data, no interactivity beyond links.
 */

function Price({ tier }: { tier: PricingTier }) {
  return (
    <p className="flex items-baseline gap-1">
      <span className="font-heading text-xl font-semibold opacity-70">₹</span>
      <span className="font-heading text-4xl font-bold tabular-nums tracking-tight sm:text-[2.75rem]">
        {tier.amount.toLocaleString("en-IN")}
      </span>
      {tier.billing === "monthly" && (
        <span className="text-sm font-medium opacity-60">/month</span>
      )}
    </p>
  );
}

export default function PricingSection() {
  return (
    <section id="pricing" className="relative overflow-hidden bg-white py-24 sm:py-32">
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <AnimatedContainer className="mx-auto max-w-2xl text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <div className="h-px w-8 bg-primary/30" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Pricing
            </span>
            <div className="h-px w-8 bg-primary/30" />
          </div>
          <h2 className="font-heading text-3xl font-bold leading-tight text-text-primary text-balance sm:text-4xl lg:text-[2.75rem]">
            Real numbers,{" "}
            <span className="text-text-secondary/45">published up front</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-text-secondary sm:text-lg">
            You should not have to book a call to find out whether you can afford
            us. Here is what a website actually costs.
          </p>
        </AnimatedContainer>

        <div className="mt-16 grid items-start gap-6 md:grid-cols-3">
          {websiteTiers.map((tier, idx) => {
            const popular = Boolean(tier.popular);

            return (
              <AnimatedContainer
                key={tier.id}
                delay={idx * 110}
                /* The recommended tier leads on mobile — stacked, the middle
                   card lands where nobody scrolls. */
                className={popular ? "order-first md:order-none" : ""}
              >
                <div
                  className={`hover-lift relative flex h-full flex-col rounded-2xl p-7 sm:p-8 ${
                    popular
                      ? "bg-navy text-white shadow-xl shadow-primary/20 md:-translate-y-3"
                      : "border border-border bg-white text-text-primary"
                  }`}
                >
                  {popular && (
                    <span className="absolute -top-3 left-8 rounded-full bg-accent px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-navy">
                      Most popular
                    </span>
                  )}

                  <h3
                    className={`font-heading text-lg font-bold ${
                      popular ? "text-white" : "text-text-primary"
                    }`}
                  >
                    {tier.name}
                  </h3>
                  <p
                    className={`mt-1 text-sm ${
                      popular ? "text-slate-400" : "text-text-secondary"
                    }`}
                  >
                    {tier.audience}
                  </p>

                  <div className="mt-6">
                    <Price tier={tier} />
                    <p
                      className={`mt-1 text-xs ${
                        popular ? "text-slate-500" : "text-text-secondary/70"
                      }`}
                    >
                      one-time · excludes GST
                    </p>
                  </div>

                  <ul
                    className={`mt-7 flex flex-1 flex-col gap-3 border-t pt-7 ${
                      popular ? "border-white/10" : "border-border"
                    }`}
                  >
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-[15px]">
                        <Check
                          className={`mt-0.5 h-4 w-4 shrink-0 ${
                            popular ? "text-accent" : "text-primary"
                          }`}
                        />
                        <span className={popular ? "text-slate-300" : "text-text-secondary"}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href={pricingWhatsappLink(tier.name, formatPrice(tier.amount))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group mt-8 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition-all ${
                      popular
                        ? "bg-primary text-white hover:bg-secondary"
                        : "border border-text-primary/15 text-text-primary hover:border-primary hover:bg-primary hover:text-white"
                    }`}
                  >
                    {tier.ctaLabel}
                    <ArrowRight className="cta-arrow h-4 w-4" />
                  </a>
                </div>
              </AnimatedContainer>
            );
          })}
        </div>

      </div>
    </section>
  );
}
