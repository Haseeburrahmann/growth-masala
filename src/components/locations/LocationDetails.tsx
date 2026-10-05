import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { locationDetails } from "@/data/locationDetails";

export default function LocationDetails({ slug }: { slug: string }) {
  const detail = locationDetails[slug];
  if (!detail) return null;

  return (
    <section className="border-y border-border bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Scope, evidence and next steps</p>
        <h2 className="mt-4 max-w-3xl font-heading text-3xl font-bold leading-tight text-text-primary sm:text-4xl">{detail.heading}</h2>
        <div className="mt-10 grid gap-x-12 gap-y-9 md:grid-cols-2">
          {detail.sections.map((section, index) => (
            <div key={section.title} className="border-t border-border pt-5">
              <span aria-hidden="true" className="text-xs font-semibold text-primary">0{index + 1}</span>
              <h3 className="mt-3 font-heading text-xl font-semibold text-text-primary">{section.title}</h3>
              <p className="mt-3 text-base leading-7 text-text-secondary">{section.text}</p>
            </div>
          ))}
        </div>
        <ul className="mt-10 flex flex-col gap-3 border-t border-border pt-6">
          {detail.links.map((link) => (
            <li key={link.href}><Link href={link.href} className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary hover:underline">{link.label}<ArrowUpRight aria-hidden="true" className="h-4 w-4 shrink-0" /></Link></li>
          ))}
        </ul>
      </div>
    </section>
  );
}
