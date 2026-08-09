import Link from "next/link";
import { ArrowUpRight, Check, Globe, Plus } from "lucide-react";
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
 * overwhelming. Collapsing them cost the deliverable copy, which then rendered
 * nowhere on the site at all — nine services' worth of already-written detail
 * sitting unread in `services.ts` while /services could not answer "what do I
 * actually get". Each service name is now a native <details>: the card still
 * scans in a second, and the answer is one click away instead of one page away.
 *
 * <details>, not state, so this stays a server component with no bundle, works
 * before hydration and without JavaScript, and is keyboard-operable for free.
 * It is the same disclosure ServicesPricing uses for the care plans.
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

/** One expandable row on a group card. */
interface DetailRow {
  title: string;
  description: string;
  points: string[];
}

/**
 * The rows shown on a group card, each one expandable.
 *
 * Normally one row per service: its name, its description, its deliverables.
 *
 * Custom Software is the exception. It is a group of exactly one service whose
 * title ("Custom Software & Web Apps") merely repeats the card heading, so a
 * single row would read as a card containing itself. Its `subItems` are the
 * useful breakdown and each carries its own description, so those become the
 * rows — and because they have no deliverables of their own, the parent
 * service's list is appended as a final row. Nothing in `services.ts` goes
 * unrendered either way.
 */
function groupRows(group: ServiceGroup): DetailRow[] {
  const groupServices = servicesInGroup(group);
  const [only] = groupServices;

  if (groupServices.length === 1 && only?.subItems?.length) {
    return [
      ...only.subItems.map((item) => ({
        title: item.title,
        description: item.description,
        points: [],
      })),
      {
        title: "Included in every build",
        description: only.description,
        points: only.deliverables,
      },
    ];
  }

  return groupServices.map((service) => ({
    title: service.title,
    description: service.description,
    points: service.deliverables,
  }));
}

/**
 * One disclosure row.
 *
 * The summary is the whole 44px target, not just the text — `min-h-11` plus
 * `w-full`, because a caret you have to hit precisely is worse than no caret.
 * `list-none` and the `::-webkit-details-marker` reset remove the browser's
 * default triangle; Safari needs the second one specifically.
 *
 * The plus rotates 45° into a cross on open, which is the same open/close
 * marker `FAQSection` uses. Rotation rather than an icon swap so it animates,
 * and `transition-transform` alone means it is exempt from nothing in the
 * reduced-motion block — transitions on hover/state are not what that
 * preference is aimed at, and the site already treats them that way.
 */
function DetailDisclosure({ row }: { row: DetailRow }) {
  return (
    <details className="group/row border-t border-border first:border-t-0">
      <summary className="flex min-h-11 w-full cursor-pointer list-none items-center gap-2.5 py-2.5 marker:hidden [&::-webkit-details-marker]:hidden">
        <span
          aria-hidden="true"
          className="h-1.25 w-1.25 shrink-0 rounded-full bg-accent"
        />
        <span className="flex-1 text-sm font-medium leading-tight text-text-primary">
          {row.title}
        </span>
        <Plus
          aria-hidden="true"
          className="h-4 w-4 shrink-0 text-primary transition-transform duration-200 group-open/row:rotate-45"
        />
      </summary>

      <div className="pb-3.5 pl-5.5">
        <p className="text-[13px] leading-relaxed text-text-secondary">
          {row.description}
        </p>

        {row.points.length > 0 && (
          <ul className="mt-3 flex flex-col gap-1.5">
            {row.points.map((point) => (
              <li key={point} className="flex items-start gap-2">
                <Check
                  aria-hidden="true"
                  className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary"
                  strokeWidth={2.5}
                />
                <span className="text-[13px] leading-snug text-text-secondary">
                  {point}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </details>
  );
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

        <div className="mt-4.5 border-t border-border pt-1.5">
          {groupRows(group).map((row) => (
            <DetailDisclosure key={row.title} row={row} />
          ))}
        </div>
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
              <span className="block">{spellOut(serviceGroups.length)} groups.</span>{" "}
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
