import { ArrowRight, ChevronDown, LifeBuoy, Plus } from "lucide-react";
import AnimatedContainer from "@/components/ui/AnimatedContainer";
import {
  addOns,
  carePlans,
  formatPrice,
  pricingFinePrint,
  websiteTiers,
} from "@/data/pricing";
import { pricingWhatsappLink } from "@/lib/whatsapp";
import type { PricingTier } from "@/types";

/**
 * What it costs — the three website builds, compact.
 *
 * The canvas cut this section down to the build tiers plus a one-line care
 * note. Taken literally that would delete `carePlans`, `addOns` and
 * `pricingFinePrint` from the site entirely: /services is the only page that
 * renders any of them (the homepage shows build tiers only). All three are
 * owner-authored published pricing, and the chatbot quotes them, so a visitor
 * can be told a number that appears nowhere on the site.
 *
 * They are kept behind the care note's own disclosure — a native <details>, no
 * JavaScript, collapsed by default. The section reads at the canvas length and
 * nothing is lost.
 *
 * Every rupee figure comes from `src/data/pricing.ts`, including the "from"
 * price in the care note. Nothing here hardcodes a number, so this page can
 * never disagree with the `Offer` JSON-LD or with what the chatbot quotes.
 *
 * Server component — static data and links only.
 */

/** Cheapest care plan, for the "care plans from …" line. Derived, not typed. */
const carePlanFloor = Math.min(...carePlans.map((plan) => plan.amount));

function Price({ tier }: { tier: PricingTier }) {
  return (
    <p className="flex items-baseline gap-2">
      <span className="font-heading text-3xl font-bold tabular-nums tracking-tight text-text-primary sm:text-4xl">
        {formatPrice(tier.amount)}
      </span>
      <span className="text-sm text-text-secondary/80">
        {tier.billing === "monthly" ? "per month" : "one-time"}
      </span>
    </p>
  );
}

function TierCard({ tier }: { tier: PricingTier }) {
  const popular = Boolean(tier.popular);

  return (
    <div
      className={`flex h-full flex-col rounded-2xl bg-white p-6 sm:p-7 ${
        popular ? "border-2 border-primary" : "border border-border"
      }`}
    >
      <div className="flex flex-wrap items-center gap-2.5">
        <h3 className="font-heading text-lg font-semibold text-text-primary sm:text-[19px]">
          {tier.name}
        </h3>
        {popular && (
          <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
            Most popular
          </span>
        )}
      </div>

      <p className="mt-1.5 text-sm text-text-secondary/90">{tier.audience}</p>

      <div className="mt-4">
        <Price tier={tier} />
      </div>

      {/* The canvas condenses each tier to one sentence. There is no such
          sentence in `pricing.ts` — writing one here would be a second,
          drifting copy of the feature list — so the published features render
          as a compact list instead. */}
      <ul className="mt-4 flex flex-1 flex-col gap-2 border-t border-border pt-4">
        {tier.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5">
            <span
              aria-hidden="true"
              className="mt-2 h-1.25 w-1.25 shrink-0 rounded-full bg-primary"
            />
            <span className="text-sm leading-snug text-text-secondary">
              {feature}
            </span>
          </li>
        ))}
      </ul>

      <a
        href={pricingWhatsappLink(tier.name, formatPrice(tier.amount))}
        target="_blank"
        rel="noopener noreferrer"
        className={`group mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all ${
          popular
            ? "bg-primary text-white hover:bg-primary-dark"
            : "border border-text-primary/15 text-text-primary hover:border-primary hover:bg-primary hover:text-white"
        }`}
      >
        {tier.ctaLabel}
        <ArrowRight aria-hidden="true" className="cta-arrow h-4 w-4" />
      </a>
    </div>
  );
}

/** Care plans, add-ons and fine print — the detail behind "See all pricing". */
function FullPriceList() {
  return (
    <div className="mt-6 space-y-8 border-t border-primary/15 pt-6">
      <div>
        <h3 className="font-heading text-base font-semibold text-text-primary">
          Care plans · optional, monthly
        </h3>
        <ul className="mt-4 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-3">
          {carePlans.map((plan) => (
            <li key={plan.id} className="bg-white px-5 py-4">
              <p className="font-heading text-sm font-semibold text-text-primary">
                {plan.name}
              </p>
              <p className="mt-1 font-heading text-lg font-bold tabular-nums text-text-primary">
                {formatPrice(plan.amount)}
                <span className="text-xs font-medium text-text-secondary">
                  /mo
                </span>
              </p>
              <p className="mt-1.5 text-sm leading-snug text-text-secondary">
                {plan.audience}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="font-heading text-base font-semibold text-text-primary">
          Add-ons
        </h3>
        <ul className="mt-4 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2">
          {addOns.map((addOn) => (
            <li
              key={addOn.name}
              className="flex items-center justify-between gap-4 bg-white px-5 py-4"
            >
              <span className="flex items-center gap-2.5 text-sm text-text-secondary">
                <Plus aria-hidden="true" className="h-4 w-4 shrink-0 text-primary" />
                {addOn.name}
              </span>
              <span className="shrink-0 font-heading text-sm font-bold tabular-nums text-text-primary">
                {formatPrice(addOn.amount)}
                {addOn.billing === "monthly" && (
                  <span className="text-xs font-medium text-text-secondary">
                    /mo
                  </span>
                )}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <ul className="grid gap-2.5 sm:grid-cols-2">
        {pricingFinePrint.map((line) => (
          <li
            key={line}
            className="flex items-start gap-2.5 text-sm leading-relaxed text-text-secondary"
          >
            <span
              aria-hidden="true"
              className="mt-2 h-1.25 w-1.25 shrink-0 rounded-full bg-primary/50"
            />
            {line}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ServicesPricing() {
  return (
    <section id="pricing" className="scroll-mt-24 bg-surface py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <AnimatedContainer>
          <div className="flex items-center gap-3">
            <div className="h-px w-8 bg-primary/30" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              What it costs
            </span>
          </div>

          <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:gap-16">
            <h2 className="font-heading text-3xl font-bold leading-tight tracking-[-0.02em] text-text-primary text-balance sm:text-4xl lg:flex-3 lg:text-[2.875rem]">
              <span className="block">Published prices.</span>
              <span className="block text-text-secondary/75">
                No call required to see them.
              </span>
            </h2>
            <p className="text-base leading-relaxed text-text-secondary sm:text-[17px] lg:flex-2">
              Three website packages with real numbers on them. Everything else
              — marketing, AI, software — is quoted as a fixed price in writing
              before anyone starts work.
            </p>
          </div>
        </AnimatedContainer>

        <div className="mt-10 grid items-stretch gap-6 md:grid-cols-3 lg:mt-14">
          {websiteTiers.map((tier, idx) => (
            <AnimatedContainer
              key={tier.id}
              delay={idx * 100}
              /* The recommended tier leads on mobile — stacked, a middle card
                 lands where nobody scrolls. */
              className={`h-full ${tier.popular ? "order-first md:order-0" : ""}`}
            >
              <TierCard tier={tier} />
            </AnimatedContainer>
          ))}
        </div>

        <AnimatedContainer delay={120}>
          <details className="group mt-7 rounded-2xl border border-primary/15 bg-primary/4 px-6 py-5">
            <summary className="flex cursor-pointer list-none flex-col gap-4 marker:hidden sm:flex-row sm:items-center [&::-webkit-details-marker]:hidden">
              <LifeBuoy
                aria-hidden="true"
                className="h-5 w-5 shrink-0 text-primary"
              />
              <span className="flex-1 text-[15px] leading-relaxed text-text-secondary">
                Already have a site? Care plans from{" "}
                {formatPrice(carePlanFloor)} / month — updates, backups,
                security and small changes. Prices exclude GST. The first
                consultation is free.
              </span>
              <span className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-full border border-border bg-white px-6 text-[15px] font-semibold text-text-primary">
                See all pricing
                <ChevronDown
                  aria-hidden="true"
                  className="h-4 w-4 text-primary transition-transform duration-200 group-open:rotate-180"
                />
              </span>
            </summary>

            <FullPriceList />
          </details>
        </AnimatedContainer>
      </div>
    </section>
  );
}
