import Link from "next/link";
import { ArrowUpRight, Globe } from "lucide-react";
import AnimatedContainer from "@/components/ui/AnimatedContainer";
import {
  serviceGroups,
  serviceIconMap,
  services,
  servicesInGroup,
} from "@/data/services";
import { spellOut } from "@/lib/spellOut";
import type { ServiceGroup, ServiceGroupId } from "@/types";

/**
 * All four groups as one row of compact cards.
 *
 * This replaces four full-width `ServiceGroupSection` blocks — roughly 7,800px
 * of scroll with a deliverables list per service — which the client rejected as
 * overwhelming. The trade is real: the deliverable copy and the group artwork no
 * longer render anywhere on the site. What survives is what a buyer scans for —
 * the group, the outcome, and which services sit inside it.
 *
 * Everything shown is derived from `src/data/services.ts`. Nothing here is a
 * second copy of a service name.
 */

/**
 * Display order: the groups the homepage shows, then the ones it holds back.
 *
 * `serviceGroups` declares Custom Software second because that is its priority
 * in the flat taxonomy; the canvas numbers it 04. Rather than hardcode an id
 * order that would silently drop a new group, this reuses the `homepageHidden`
 * flag the data already carries — Custom Software is the only group with it, so
 * it falls to the end, which is exactly the canvas order.
 */
const orderedGroups: ServiceGroup[] = [
  ...serviceGroups.filter((group) => !group.homepageHidden),
  ...serviceGroups.filter((group) => group.homepageHidden),
];

/**
 * Link copy per group. This is presentation text with no home in `services.ts`
 * — `Talk about {group.title}` would render "Talk about Websites & E-Commerce",
 * which wraps to three lines in a quarter-width card. Typed as a full record of
 * `ServiceGroupId` so adding a group is a type error rather than a blank link.
 *
 * The canvas labelled these "Explore websites" / "Explore marketing", which was
 * accurate when each group had its own deep section further down the page to
 * anchor to. The compact grid replaced those sections and there is no
 * `/services/[group]` route, so every link now resolves to /contact — and
 * "Explore websites" landing on a contact form is a bait-and-switch that costs
 * more trust than the click is worth, on a page whose whole argument is that we
 * are the honest option.
 *
 * The label states the destination instead. If per-group detail routes are
 * built later, revert the wording along with the hrefs.
 */
const EXPLORE_LABEL: Record<ServiceGroupId, string> = {
  web: "Talk about websites",
  marketing: "Talk about marketing",
  ai: "Talk about AI",
  software: "Talk about software",
};

/**
 * The service names shown as bullets.
 *
 * Normally one bullet per service in the group. Custom Software is a group of
 * exactly one service whose title ("Custom Software & Web Apps") merely repeats
 * the card heading — for that shape the service's own `subItems` are the useful
 * breakdown, and they are what the canvas draws.
 */
function groupBullets(group: ServiceGroup): string[] {
  const groupServices = servicesInGroup(group);
  const [only] = groupServices;

  if (groupServices.length === 1 && only?.subItems?.length) {
    return only.subItems.map((item) => item.title);
  }

  return groupServices.map((service) => service.title);
}

function GroupCard({ group, index }: { group: ServiceGroup; index: number }) {
  const Icon = serviceIconMap[group.icon] || Globe;

  return (
    <div className="hover-lift flex h-full flex-col justify-between rounded-2xl border border-border bg-white p-6 transition-colors hover:border-primary/30">
      <div>
        <div className="flex items-center gap-2.5">
          <Icon aria-hidden="true" className="h-5 w-5 shrink-0 text-primary" />
          <span className="font-heading text-xs font-bold tracking-[0.12em] text-slate-500">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <h3 className="mt-4 font-heading text-lg font-semibold leading-snug tracking-[-0.01em] text-text-primary sm:text-xl">
          {group.title}
        </h3>

        <p className="mt-2.5 text-[15px] leading-relaxed text-text-secondary">
          {group.outcome}
        </p>

        <ul className="mt-4.5 flex flex-col gap-2.5 border-t border-border pt-4">
          {groupBullets(group).map((label) => (
            <li key={label} className="flex items-start gap-2.5">
              <span
                aria-hidden="true"
                className="mt-2 h-1.25 w-1.25 shrink-0 rounded-full bg-accent"
              />
              <span className="text-sm font-medium leading-tight text-text-primary">
                {label}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <Link
        href="/contact"
        className="group mt-6 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary-dark"
      >
        {EXPLORE_LABEL[group.id]}
        <ArrowUpRight
          aria-hidden="true"
          className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      </Link>
    </div>
  );
}

export default function ServiceGroupsGrid() {
  return (
    <section id="groups" className="scroll-mt-24 bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <AnimatedContainer>
          <div className="flex items-center gap-3">
            <div className="h-px w-8 bg-primary/30" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              What we do
            </span>
          </div>

          <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:gap-16">
            {/* Both counts are derived. A heading that says "Nine things we
                build" while the data holds ten is the drift this file exists to
                avoid. */}
            <h2 className="font-heading text-3xl font-bold leading-tight tracking-[-0.02em] text-text-primary text-balance sm:text-4xl lg:flex-3 lg:text-[2.875rem]">
              <span className="block">{spellOut(serviceGroups.length)} groups.</span>
              <span className="block text-text-secondary/75">
                {spellOut(services.length)} things we build.
              </span>
            </h2>
            <p className="text-base leading-relaxed text-text-secondary sm:text-[17px] lg:flex-2">
              Most clients start with a website. If a service is not worth
              buying yet, we will tell you.
            </p>
          </div>
        </AnimatedContainer>

        <div className="mt-10 grid items-stretch gap-5 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4">
          {orderedGroups.map((group, idx) => (
            <AnimatedContainer key={group.id} delay={idx * 90} className="h-full">
              <GroupCard group={group} index={idx} />
            </AnimatedContainer>
          ))}
        </div>
      </div>
    </section>
  );
}
