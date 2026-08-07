import { ArrowRight, Check, Plus } from "lucide-react";
import AnimatedContainer from "@/components/ui/AnimatedContainer";
import {
  addOns,
  carePlans,
  formatPrice,
  pricingFinePrint,
  websiteTiers,
} from "@/data/pricing";
import { pricingWhatsappLink } from "@/lib/whatsapp";
import { address } from "@/data/business";
import type { PricingTier } from "@/types";

/**
 * The full published price list.
 *
 * The homepage deliberately shows only the one-time build tiers — a reader still
 * deciding whether a website is worth ₹9,999 is not yet weighing backup
 * frequency. By the time someone has read this page they are, so this is where
 * `carePlans`, `addOns` and `pricingFinePrint` finally render. `pricing.ts` has
 * been carrying all three for exactly this, and until now nothing displayed
 * them.
 *
 * Every rupee figure is read from `src/data/pricing.ts`. Nothing here hardcodes
 * a price, so the page can never disagree with the `Offer` JSON-LD or with what
 * the chatbot quotes.
 *
 * Server component — static data, links only.
 */

function Price({ tier }: { tier: PricingTier }) {
  return (
    <p className="flex items-baseline gap-1">
      <span className="font-heading text-xl font-semibold opacity-70">₹</span>
      <span className="font-heading text-4xl font-bold tabular-nums tracking-tight">
        {tier.amount.toLocaleString("en-IN")}
      </span>
      {tier.billing === "monthly" && (
        <span className="text-sm font-medium opacity-60">/month</span>
      )}
    </p>
  );
}

function TierCard({ tier, popular }: { tier: PricingTier; popular: boolean }) {
  return (
    <div
      className={`hover-lift relative flex h-full flex-col rounded-2xl p-7 sm:p-8 ${
        popular
          ? "bg-navy text-white shadow-xl shadow-primary/20"
          : "border border-border bg-white text-text-primary"
      }`}
    >
      {popular && (
        <span className="absolute -top-3 left-8 rounded-full bg-accent px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-navy">
          Most popular
        </span>
      )}

      <h4 className={`font-heading text-lg font-bold ${popular ? "text-white" : "text-text-primary"}`}>
        {tier.name}
      </h4>
      <p className={`mt-1 text-sm ${popular ? "text-slate-400" : "text-text-secondary"}`}>
        {tier.audience}
      </p>

      <div className="mt-6">
        <Price tier={tier} />
        <p className={`mt-1 text-xs ${popular ? "text-slate-500" : "text-text-secondary/70"}`}>
          {tier.billing === "monthly" ? "per month" : "one-time"} · excludes GST
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
              className={`mt-0.5 h-4 w-4 shrink-0 ${popular ? "text-accent" : "text-primary"}`}
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
  );
}

function PriceBlock({
  eyebrow,
  title,
  intro,
  tiers,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  tiers: PricingTier[];
}) {
  return (
    <div>
      <AnimatedContainer className="max-w-2xl">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          {eyebrow}
        </span>
        <h3 className="mt-3 font-heading text-2xl font-bold text-text-primary sm:text-3xl">
          {title}
        </h3>
        <p className="mt-3 text-base leading-relaxed text-text-secondary">{intro}</p>
      </AnimatedContainer>

      <div className="mt-10 grid items-start gap-6 md:grid-cols-3">
        {tiers.map((tier, idx) => (
          <AnimatedContainer
            key={tier.id}
            delay={idx * 110}
            /* The recommended tier leads on mobile — stacked, a middle card
               lands where nobody scrolls. */
            className={tier.popular ? "order-first md:order-none" : ""}
          >
            <TierCard tier={tier} popular={Boolean(tier.popular)} />
          </AnimatedContainer>
        ))}
      </div>
    </div>
  );
}

export default function ServicesPricing() {
  return (
    <section id="pricing" className="scroll-mt-24 bg-surface py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <AnimatedContainer className="mx-auto max-w-2xl text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <div className="h-px w-8 bg-primary/30" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Pricing
            </span>
            <div className="h-px w-8 bg-primary/30" />
          </div>
          <h2 className="font-heading text-3xl font-bold leading-tight text-text-primary text-balance sm:text-4xl lg:text-[2.75rem]">
            What this costs in {address.locality},{" "}
            <span className="text-text-secondary/45">published in full</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-text-secondary sm:text-lg">
            Most agencies here make you book a call to find out whether you can
            afford them. Here is the whole list — builds, ongoing care, and every
            add-on, with nothing held back for the phone.
          </p>
        </AnimatedContainer>

        <div className="mt-16 space-y-20">
          <PriceBlock
            eyebrow="One-time"
            title="Website & store builds"
            intro="Paid once. The site is yours outright — there is no monthly fee attached to any of these."
            tiers={websiteTiers}
          />

          <PriceBlock
            eyebrow="Optional · monthly"
            title="Care plans"
            intro="Backups, security, and someone who picks up when something breaks. Entirely optional — declining one changes nothing about what you receive at launch."
            tiers={carePlans}
          />

          {/* Add-ons */}
          <div>
            <AnimatedContainer className="max-w-2xl">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Add-ons
              </span>
              <h3 className="mt-3 font-heading text-2xl font-bold text-text-primary sm:text-3xl">
                Bolt anything on
              </h3>
              <p className="mt-3 text-base leading-relaxed text-text-secondary">
                Priced up front so scope never becomes an argument later.
              </p>
            </AnimatedContainer>

            <AnimatedContainer delay={100}>
              <ul className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
                {addOns.map((addOn) => (
                  <li
                    key={addOn.name}
                    className="flex items-center justify-between gap-4 bg-white px-6 py-5"
                  >
                    <span className="flex items-center gap-3 text-sm text-text-secondary">
                      <Plus className="h-4 w-4 shrink-0 text-primary" />
                      {addOn.name}
                    </span>
                    <span className="shrink-0 font-heading text-base font-bold tabular-nums text-text-primary">
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
            </AnimatedContainer>
          </div>

          {/* Fine print */}
          <AnimatedContainer>
            <div className="rounded-2xl border border-border bg-white p-7 sm:p-8">
              <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-text-primary">
                The fine print
              </h3>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {pricingFinePrint.map((line) => (
                  <li
                    key={line}
                    className="flex items-start gap-3 text-sm leading-relaxed text-text-secondary"
                  >
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedContainer>
        </div>
      </div>
    </section>
  );
}
