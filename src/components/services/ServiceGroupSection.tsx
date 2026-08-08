import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check, ChevronDown, Globe } from "lucide-react";
import AnimatedContainer from "@/components/ui/AnimatedContainer";
import { serviceIconMap, servicesInGroup } from "@/data/services";
import type { ServiceGroup } from "@/types";

/**
 * One customer-intent group and the services inside it.
 *
 * The page used to loop the flat `services` array and render nine full-width
 * cards, which ignored the group taxonomy the homepage was rebuilt around and
 * left the two services carrying `subItems` both rendering as "New · Flagship
 * Service". Grouping fixes the duplicate badge by removing the concept: a
 * service is distinguished by which group it sits in, not by a flag.
 *
 * Each service is a native <details> row — a numbered accordion in the manner of
 * the reference agency layouts, but with no JavaScript. That matters twice over:
 * the section stays a server component, and every deliverable ships inside the
 * HTML where a crawler sees it without executing anything. Nine expanded cards
 * made the page a scroll endurance test; nine collapsed rows make it scannable.
 */

type Tone = "light" | "surface" | "navy";

/** Per-tone classes, resolved once so the JSX below stays readable. */
const TONES: Record<Tone, {
  section: string;
  heading: string;
  body: string;
  row: string;
  rowHover: string;
  pill: string;
  divider: string;
}> = {
  light: {
    section: "bg-white",
    heading: "text-text-primary",
    body: "text-text-secondary",
    row: "border-border bg-white",
    rowHover: "hover:border-primary/30",
    pill: "bg-primary/[0.07] text-primary",
    divider: "border-border",
  },
  surface: {
    section: "bg-surface",
    heading: "text-text-primary",
    body: "text-text-secondary",
    row: "border-border bg-white",
    rowHover: "hover:border-primary/30",
    pill: "bg-primary/[0.07] text-primary",
    divider: "border-border",
  },
  navy: {
    section: "bg-navy",
    heading: "text-white",
    body: "text-slate-400",
    row: "border-white/10 bg-white/5",
    rowHover: "hover:border-primary/40 hover:bg-white/[0.08]",
    pill: "bg-primary/15 text-primary",
    divider: "border-white/10",
  },
};

interface ServiceGroupSectionProps {
  group: ServiceGroup;
  /** Zero-based; drives the displayed number and which side the artwork sits on. */
  index: number;
  tone: Tone;
}

export default function ServiceGroupSection({
  group,
  index,
  tone,
}: ServiceGroupSectionProps) {
  const t = TONES[tone];
  const groupServices = servicesInGroup(group);
  const GroupIcon = serviceIconMap[group.icon] || Globe;
  const imageFirst = index % 2 !== 0;

  return (
    <section
      id={group.id}
      className={`scroll-mt-24 relative overflow-hidden py-20 sm:py-28 ${t.section}`}
    >
      {tone === "navy" && (
        <div className="grid-bg pointer-events-none absolute inset-0 opacity-50" />
      )}

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Group header */}
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <AnimatedContainer className={imageFirst ? "lg:order-2" : ""}>
            <div className="flex items-center gap-3">
              <div
                className={`h-px w-8 ${tone === "navy" ? "bg-white/20" : "bg-primary/30"}`}
              />
              {/* Tone-aware: #2563EB is 5.17:1 on the light grounds but only
                  3.64:1 on navy, so the dark tone takes the lighter brand blue. */}
              <span
                className={`text-xs font-semibold uppercase tracking-[0.2em] ${
                  tone === "navy" ? "text-secondary" : "text-primary"
                }`}
              >
                Group 0{index + 1}
              </span>
            </div>

            <div className="mt-5 flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-primary to-secondary text-white shadow-lg shadow-primary/20">
                <GroupIcon className="h-7 w-7" />
              </div>
              <h2
                className={`font-heading text-3xl font-bold text-balance sm:text-4xl ${t.heading}`}
              >
                {group.title}
              </h2>
            </div>

            <p className={`mt-5 text-lg leading-relaxed ${t.body}`}>
              {group.outcome}
            </p>
            <p className={`mt-3 text-sm ${t.body}`}>
              {groupServices.length}{" "}
              {groupServices.length === 1 ? "service" : "services"} — open any one
              to see exactly what it includes.
            </p>
          </AnimatedContainer>

          <AnimatedContainer
            delay={120}
            className={imageFirst ? "lg:order-1" : ""}
          >
            <div className="relative aspect-16/10 w-full overflow-hidden rounded-2xl bg-navy">
              <Image
                src={group.image}
                alt=""
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
          </AnimatedContainer>
        </div>

        {/* Services in this group */}
        <div className="mt-14 space-y-4">
          {groupServices.map((service, serviceIdx) => {
            const Icon = serviceIconMap[service.icon] || Globe;

            return (
              <AnimatedContainer key={service.slug} delay={serviceIdx * 90}>
                <details
                  id={service.slug}
                  className={`scroll-mt-24 group/row rounded-2xl border transition-colors duration-300 ${t.row} ${t.rowHover}`}
                >
                  <summary className="flex cursor-pointer list-none items-center gap-4 p-6 sm:gap-5 sm:p-7">
                    <span
                      className={`font-heading text-sm font-bold tabular-nums ${
                        tone === "navy" ? "text-white/25" : "text-text-primary/65"
                      }`}
                    >
                      {String(serviceIdx + 1).padStart(2, "0")}
                    </span>

                    <Icon className="h-5 w-5 shrink-0 text-primary" />

                    <h3
                      className={`flex-1 font-heading text-lg font-semibold sm:text-xl ${t.heading}`}
                    >
                      {service.title}
                    </h3>

                    <ChevronDown
                      className={`h-5 w-5 shrink-0 transition-transform duration-300 group-open/row:rotate-180 ${
                        tone === "navy" ? "text-slate-400" : "text-text-secondary"
                      }`}
                    />
                  </summary>

                  <div className={`border-t px-6 pb-7 pt-6 sm:px-7 ${t.divider}`}>
                    <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
                      <div>
                        <p className={`text-base leading-relaxed ${t.body}`}>
                          {service.description}
                        </p>

                        <div className="mt-5 flex flex-wrap gap-2">
                          {service.features.map((feature) => (
                            <span
                              key={feature}
                              className={`rounded-full px-3 py-1 text-xs font-medium ${t.pill}`}
                            >
                              {feature}
                            </span>
                          ))}
                        </div>

                        {service.subItems && (
                          <ul className="mt-6 space-y-3">
                            {service.subItems.map((sub) => (
                              <li key={sub.title}>
                                <p
                                  className={`font-heading text-sm font-semibold ${t.heading}`}
                                >
                                  {sub.title}
                                </p>
                                <p className={`mt-1 text-sm leading-relaxed ${t.body}`}>
                                  {sub.description}
                                </p>
                              </li>
                            ))}
                          </ul>
                        )}

                        <Link
                          href="/contact"
                          className="mt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-all hover:gap-2.5"
                        >
                          Get a quote for {service.title}
                          <ArrowUpRight className="h-4 w-4" />
                        </Link>
                      </div>

                      <div
                        className={`rounded-2xl border p-6 ${
                          tone === "navy"
                            ? "border-white/10 bg-white/5"
                            : "border-border bg-surface"
                        }`}
                      >
                        <h4
                          className={`font-heading text-sm font-semibold uppercase tracking-wider ${t.heading}`}
                        >
                          What you get
                        </h4>
                        <ul className="mt-4 space-y-3">
                          {service.deliverables.map((item) => (
                            <li
                              key={item}
                              className={`flex items-start gap-3 text-sm ${t.body}`}
                            >
                              <span
                                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                                  tone === "navy" ? "bg-accent/15" : "bg-primary/10"
                                }`}
                              >
                                <Check
                                  className={`h-3 w-3 ${
                                    tone === "navy" ? "text-accent" : "text-primary"
                                  }`}
                                />
                              </span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </details>
              </AnimatedContainer>
            );
          })}
        </div>
      </div>
    </section>
  );
}
