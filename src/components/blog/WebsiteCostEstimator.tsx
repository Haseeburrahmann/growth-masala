"use client";

import { useState } from "react";
import Link from "next/link";
import { carePlans, formatPrice, websiteTiers } from "@/data/pricing";
import { estimateWebsiteCost } from "@/lib/website-cost";

export default function WebsiteCostEstimator() {
  const [tierId, setTierId] = useState(websiteTiers[0].id);
  const [careId, setCareId] = useState("");
  const [domain, setDomain] = useState("");
  const [hosting, setHosting] = useState("");
  const tier = websiteTiers.find((item) => item.id === tierId) ?? websiteTiers[0];
  const care = carePlans.find((item) => item.id === careId);
  const estimate = estimateWebsiteCost(tier.amount, care?.amount ?? 0, domain, hosting);
  const fieldClass = "mt-2 min-h-12 w-full min-w-0 rounded-xl border border-slate-300 bg-white px-3 py-3 text-base text-text-primary focus:border-primary focus:outline-2 focus:outline-offset-2 focus:outline-primary";

  return (
    <section id="website-cost-estimator" aria-labelledby="cost-estimator-title" className="my-12 scroll-mt-28 overflow-hidden rounded-2xl border border-border">
      <div className="bg-surface p-5 sm:p-7">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">Plan the full cost</p>
        <h2 id="cost-estimator-title" className="mt-2 font-heading text-2xl font-bold tracking-tight text-text-primary">
          Estimate your website running costs
        </h2>
        <p className="mt-3 text-sm leading-6 text-text-secondary">
          Choose a published Growth Masala package, then enter your supplier&apos;s annual domain and hosting rates in rupees. Leave unknown costs blank. Enter 0 only if a charge is confirmed as zero.
        </p>
        <fieldset className="mt-6 grid gap-5 sm:grid-cols-2">
          <legend className="sr-only">Website cost inputs</legend>
          <label className="min-w-0 text-sm font-semibold text-text-primary" htmlFor="cost-tier">
            Website package (one-time)
            <select id="cost-tier" value={tierId} onChange={(event) => setTierId(event.target.value)} className={fieldClass}>
              {websiteTiers.map((item) => <option key={item.id} value={item.id}>{item.name} — {formatPrice(item.amount)}</option>)}
            </select>
          </label>
          <label className="min-w-0 text-sm font-semibold text-text-primary" htmlFor="cost-care">
            Optional ongoing care (monthly)
            <select id="cost-care" value={careId} onChange={(event) => setCareId(event.target.value)} className={fieldClass}>
              <option value="">None — no care plan</option>
              {carePlans.map((item) => <option key={item.id} value={item.id}>{item.name} — {formatPrice(item.amount)}/mo</option>)}
            </select>
          </label>
          {[
            { id: "cost-domain", label: "Domain cost per year (₹)", value: domain, set: setDomain },
            { id: "cost-hosting", label: "Hosting cost per year (₹)", value: hosting, set: setHosting },
          ].map((field) => {
            const invalid = field.value !== "" && !/^\d{1,8}(\.\d{1,2})?$/.test(field.value.trim());
            return (
              <label key={field.id} className="min-w-0 text-sm font-semibold text-text-primary" htmlFor={field.id}>
                {field.label}
                <input id={field.id} type="text" inputMode="decimal" maxLength={11} value={field.value}
                  onChange={(event) => field.set(event.target.value)} placeholder="Enter a confirmed annual rate"
                  aria-invalid={invalid} aria-describedby={invalid ? `${field.id}-error` : "cost-assumptions"} className={fieldClass} />
                {invalid && <span id={`${field.id}-error`} className="mt-2 block text-sm text-red-700">Use a non-negative amount with up to two decimals, without commas.</span>}
              </label>
            );
          })}
        </fieldset>
        <p id="cost-assumptions" className="mt-5 text-sm leading-6 text-text-secondary">
          All estimates exclude GST, paid tools, payment fees and extra work. The same annual rates are used for all three years. Selected care is counted for 12 months each year, separately from included launch support; confirm the actual start date in your quote.
        </p>
        <p className="mt-3 text-sm leading-6 text-text-secondary">
          Annual running cost = domain + hosting + 12 months of optional care. First year = build + annual running cost. Three years = build + 3 × annual running cost.
        </p>
        <noscript><p className="mt-3 text-sm">Enable JavaScript to use the calculator, or use the formula above and the downloadable quote worksheet.</p></noscript>
      </div>
      <div className="bg-navy p-5 text-white sm:p-7" aria-live="polite" aria-atomic="true">
        <p className="text-sm text-slate-300">{tier.name} build: {formatPrice(tier.amount)} before GST</p>
        <dl className="mt-4 space-y-3">
          {[
            ["Annual running estimate", estimate?.annualRunning],
            ["First-year estimate", estimate?.firstYear],
            ["Three-year estimate", estimate?.threeYears],
          ].map(([label, amount]) => (
            <div key={label} className="flex flex-wrap items-baseline justify-between gap-2 border-b border-white/15 pb-3">
              <dt className="text-sm text-slate-300">{label}</dt>
              <dd className="font-heading text-xl font-semibold tabular-nums">{typeof amount === "number" ? formatPrice(amount) : "—"}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-4 text-sm leading-6 text-slate-300">{estimate ? "Planning estimate, not a fixed quote. Check scope, tax and renewal terms before deciding." : "Estimates are unavailable until both annual costs are entered as valid amounts."}</p>
      </div>
      <div className="flex flex-wrap gap-x-6 gap-y-3 bg-white p-5 text-sm font-semibold text-primary sm:px-7">
        <Link href="/contact#project-brief" className="underline underline-offset-4">Discuss the scope on WhatsApp</Link>
        <Link href="/services#pricing" className="underline underline-offset-4">Check package inclusions</Link>
      </div>
    </section>
  );
}
