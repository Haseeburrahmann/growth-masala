import { Clock3 } from "lucide-react";
import {
  openingHours,
  openingHoursDays,
  openingHoursTimes,
} from "@/data/business";

/**
 * The two cards beside the form: what happens after you press send, and when
 * anyone is actually there to read it.
 *
 * Both exist because a contact form is otherwise a black box. You write into it
 * and have no idea whether the next thing is a quote, a sales call, or nothing —
 * which is the main reason a filled-in form goes unsent.
 *
 * Opening hours are **derived**, never typed. They lived only inside the
 * `LocalBusiness` JSON-LD for months: Google was told when we are open and the
 * visitor was not. Anything typed here would be free to drift away from the
 * structured data, and a mismatch between the two is a local-ranking signal
 * working against itself.
 */

const steps = [
  {
    title: "You send the message",
    detail: "Whatever detail you have. A photo of your current site is plenty.",
  },
  {
    title: "We reply the same day",
    detail:
      "With questions if we need them — not a sales call you have to book.",
  },
  {
    title: "You get a scope and a price",
    detail: "In writing, fixed. Nothing starts until you approve that number.",
  },
  {
    title: "We build, then hand over",
    detail: "Every login is yours at the end: domain, hosting, admin.",
  },
];

/**
 * The hours card renders days and times as two columns, so it takes the two
 * halves directly rather than splitting the joined line back apart on its first
 * comma — a parser undoing its own formatter, correct only until a day name
 * gains a comma or the separator changes.
 */
const openDays = openingHoursDays;
const openTimes = openingHoursTimes;

/** Calendar fact, not business data — the closed days are whatever is left. */
const WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

const openDayNames: readonly string[] = openingHours.days;
const closedDays = WEEK.filter((day) => !openDayNames.includes(day));

export default function ContactNextSteps() {
  return (
    <div className="flex flex-col gap-5">
      {/* What happens next */}
      <div className="rounded-[20px] bg-navy p-7">
        <h3 className="font-heading text-lg font-semibold text-white">
          What happens next
        </h3>

        <ol className="mt-5 space-y-4.5">
          {steps.map((step, index) => (
            <li key={step.title} className="flex gap-3.5">
              <span
                aria-hidden="true"
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/30 font-heading text-xs font-bold text-sky"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <p className="text-[15px] font-semibold leading-[21px] text-white">
                  {step.title}
                </p>
                <p className="mt-1 text-sm leading-[22px] text-slate-300">
                  {step.detail}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* When we are open */}
      <div className="rounded-[20px] border border-border bg-white p-6">
        <div className="flex items-center gap-2.5">
          <Clock3 aria-hidden="true" className="h-4.5 w-4.5 text-primary" />
          <h3 className="font-heading text-[17px] font-semibold text-text-primary">
            When we are open
          </h3>
        </div>

        <dl className="mt-4 divide-y divide-border">
          <div className="flex items-center justify-between py-2.5">
            <dt className="text-sm text-text-secondary">{openDays}</dt>
            <dd className="text-sm font-semibold text-text-primary">
              {openTimes}
            </dd>
          </div>
          {closedDays.map((day) => (
            <div key={day} className="flex items-center justify-between py-2.5">
              <dt className="text-sm text-text-secondary">{day}</dt>
              <dd className="text-sm font-semibold text-text-primary">Closed</dd>
            </div>
          ))}
        </dl>

        <p className="mt-3 text-[13px] leading-5 text-text-secondary/85">
          WhatsApp messages sent outside these hours are answered first thing the
          next working morning.
        </p>
      </div>
    </div>
  );
}
