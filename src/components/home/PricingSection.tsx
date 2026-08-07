import Link from "next/link";
import { Check, ArrowRight, MessageCircle } from "lucide-react";
import AnimatedContainer from "@/components/ui/AnimatedContainer";
import { business } from "@/data/business";
import {
  websiteTiers,
  carePlans,
  addOns,
  pricingFinePrint,
  formatPrice,
} from "@/data/pricing";
import type { PricingTier } from "@/types";

/**
 * Published pricing.
 *
 * Two visually separate blocks — one-time builds and monthly care. Putting both
 * billing models in a single grid is the most reliable way to confuse a reader
 * into leaving, because "₹9,999" and "₹1,499/mo" stop being comparable the
 * moment they sit in the same row.
 *
 * Every rupee figure comes from `src/data/pricing.ts`. Nothing here hardcodes a
 * price, so the UI can never drift from the JSON-LD `Offer` markup or from what
 * the chatbot quotes.
 *
 * Server component — static data, no interactivity beyond links.
 */

/** Pre-filled WhatsApp deep link. Lowest-friction contact path for this market. */
function whatsappLink(tierName: string, price: string): string {
  const message = `Hi Growth Masala, I'm interested in the ${tierName} plan (${price}). Could you tell me more?`;
  return `${business.whatsapp}?text=${encodeURIComponent(message)}`;
}

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

        {/* ---------- Block 1 — one-time builds ---------- */}
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
                    href={whatsappLink(tier.name, formatPrice(tier.amount))}
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

        {/* ---------- Block 2 — monthly care ---------- */}
        <AnimatedContainer className="mt-24 max-w-2xl">
          <h3 className="font-heading text-2xl font-bold text-text-primary sm:text-3xl">
            Then keep it running
          </h3>
          <p className="mt-3 text-base leading-relaxed text-text-secondary">
            A website is not finished at launch. Care plans cover backups,
            security, and the updates you will actually ask for.
          </p>
        </AnimatedContainer>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {carePlans.map((plan, idx) => (
            <AnimatedContainer key={plan.id} delay={idx * 90}>
              <div
                className={`hover-lift flex h-full flex-col rounded-xl border bg-surface p-6 ${
                  plan.popular ? "border-primary/40" : "border-border"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <h4 className="font-heading text-base font-bold text-text-primary">
                    {plan.name}
                  </h4>
                  {plan.popular && (
                    <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
                      Common
                    </span>
                  )}
                </div>
                <p className="mt-1 text-xs text-text-secondary">{plan.audience}</p>

                <div className="mt-4 text-text-primary">
                  <Price tier={plan} />
                </div>

                <ul className="mt-5 flex flex-1 flex-col gap-2 border-t border-border pt-5">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-sm text-text-secondary"
                    >
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary/70" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedContainer>
          ))}
        </div>

        {/* ---------- Add-ons ---------- */}
        <AnimatedContainer className="mt-16" animation="fade-in">
          <div className="rounded-2xl border border-border bg-surface p-7 sm:p-9">
            <h3 className="font-heading text-lg font-bold text-text-primary">
              Add anything you need
            </h3>
            <p className="mt-2 text-sm text-text-secondary">
              Priced up front so nothing turns into an argument later.
            </p>

            <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
              {addOns.map((addOn) => (
                <li
                  key={addOn.name}
                  className="flex items-baseline justify-between gap-4 border-b border-border/70 pb-3 text-sm"
                >
                  <span className="text-text-secondary">{addOn.name}</span>
                  <span className="shrink-0 font-heading font-semibold tabular-nums text-text-primary">
                    {formatPrice(addOn.amount)}
                    {addOn.billing === "monthly" && (
                      <span className="font-normal text-text-secondary">/mo</span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </AnimatedContainer>

        {/* ---------- Fine print + escape hatch ---------- */}
        <AnimatedContainer className="mt-12 grid gap-10 lg:grid-cols-2" animation="fade-in">
          <ul className="flex flex-col gap-2">
            {pricingFinePrint.map((line) => (
              <li key={line} className="text-sm leading-relaxed text-text-secondary">
                {line}
              </li>
            ))}
          </ul>

          <div className="rounded-xl border border-primary/20 bg-primary/4 p-6">
            <p className="font-heading text-base font-bold text-text-primary">
              Need something that is not on this list?
            </p>
            <p className="mt-2 text-sm leading-relaxed text-text-secondary">
              Software, ads, SEO, and social media are scoped individually — the
              work varies too much to put a single number on it. You still get a
              fixed quote before anything starts.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-secondary"
              >
                Get a free quote
                <ArrowRight className="cta-arrow h-4 w-4" />
              </Link>
              <a
                href={business.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-text-primary transition-colors hover:border-primary hover:text-primary"
              >
                <MessageCircle className="h-4 w-4" />
                Ask on WhatsApp
              </a>
            </div>
          </div>
        </AnimatedContainer>
      </div>
    </section>
  );
}
