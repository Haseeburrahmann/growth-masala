import { Target, Heart, Lightbulb, Zap } from "lucide-react";
import AnimatedContainer from "@/components/ui/AnimatedContainer";
import SectionHeading from "@/components/ui/SectionHeading";

/**
 * The four values.
 *
 * Kept from the previous page, rewritten. "We treat your business like our own"
 * and "we think beyond templates" are things every agency site says, which
 * makes them free to write and worth nothing to read.
 *
 * Each one now names something specific this business does differently — the
 * published price list, the fact that clients own their code, no lock-in — so a
 * reader can check whether we actually do it. A value that cannot be falsified
 * is decoration.
 */
const values = [
  {
    icon: Target,
    title: "Outcomes over impressions",
    description:
      "Reach and follower counts are the easiest numbers to move and the least likely to pay for anything. We report on enquiries, calls and sales, and we will tell you when a campaign is not producing them.",
  },
  {
    icon: Heart,
    title: "Priced in the open",
    description:
      "Every price we charge is published on the site — builds, care plans and add-ons. You do not get quoted differently because of how the business sounds on the phone, and you can compare us before you ever make contact.",
  },
  {
    icon: Lightbulb,
    title: "You own what we build",
    description:
      "Website packages are a one-time payment and the site is yours outright — that is already the answer in our FAQ, not a line written for this page. Ongoing care is optional, and declining it changes nothing about what you receive at launch.",
  },
  {
    icon: Zap,
    title: "Close enough to meet",
    description:
      "We work from Mahabubnagar, so a site visit is a drive rather than a flight. Knowing the street, the season and the competition down the road changes what you build — and it is the part an agency three hundred kilometres away cannot fake.",
  },
];

export default function AboutValues() {
  return (
    <section className="bg-surface py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          label="How we work"
          title="Four things we hold to"
          description="Not a poster on a wall — each of these is checkable against the rest of this site."
        />

        <div className="mt-4 grid gap-6 sm:grid-cols-2">
          {values.map((value, idx) => (
            <AnimatedContainer key={value.title} delay={idx * 120}>
              <div className="h-full rounded-2xl border border-border/60 bg-white p-8 transition-all duration-250 hover:-translate-y-1 hover:shadow-lg">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <value.icon aria-hidden="true" className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-5 font-heading text-lg font-semibold text-text-primary">
                  {value.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                  {value.description}
                </p>
              </div>
            </AnimatedContainer>
          ))}
        </div>
      </div>
    </section>
  );
}
