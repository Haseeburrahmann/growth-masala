"use client";

import Image from "next/image";
import { SearchX, Clock, ShieldAlert } from "lucide-react";
import AnimatedContainer from "@/components/ui/AnimatedContainer";
import SectionIntro from "@/components/home/SectionIntro";

/**
 * The cost of the status quo.
 *
 * Deliberately contains zero mentions of Growth Masala. This section's only job
 * is to make the reader recognise their own situation — the moment it starts
 * talking about us, it stops doing that job and becomes another pitch.
 *
 * The layout is now three bordered failure-mode cards on the left with a single
 * tall photograph holding the right column. The previous version used an
 * organic cluster — a stadium capsule with an overlapping circle inside two
 * concentric rings — built from two photographs. It was the more interesting
 * drawing and it cost two image requests, three decorative elements and a set
 * of hand-computed pixel radii to say what one framed photograph says here.
 *
 * The photograph that survived is the customer out on the street searching on
 * his phone, because that is the sentence the headline is making. The owner
 * behind his counter now appears only where he is the subject (the FAQ rail).
 *
 * Cards rather than a divided list: at 700px a hairline-divided stack reads as
 * a table of contents, and these are three separate scenarios, not three rows
 * of one thing.
 */
const problems = [
  {
    icon: SearchX,
    title: "They search. Someone else shows up.",
    body: "Local buying starts on Google and Instagram. With no page to land on, you were never in the comparison.",
  },
  {
    icon: Clock,
    title: "They message. Nobody replies.",
    body: "An enquiry that waits till Monday was answered by someone else on Saturday. Slow replies lose more leads than price.",
  },
  {
    icon: ShieldAlert,
    title: "They look you up. And hesitate.",
    body: "No site, no reviews, no address to check. For real money, an unfamiliar name is a risk people quietly walk away from.",
  },
];

export default function ProblemSection() {
  return (
    /* `surface`, not white. The hairline divider that used to mark this
       section's foot is gone site-wide, and Problem → Services was the one seam
       on the page the alternation could not show on its own. Moving this block
       onto the tinted ground makes the seam visible with no extra furniture;
       the cards below went white in the same change so they still read as cards
       rather than as tinted panels on a tinted field. */
    <section className="relative overflow-hidden bg-surface py-20 sm:py-24">
      <div className="dot-pattern pointer-events-none absolute inset-0 opacity-50" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <SectionIntro
          eyebrow="Before they ever call you"
          lead="Someone nearby is searching"
          trail="for what you sell"
          standfirst="They will find somebody. The only question is whether it is you, or the shop one street over."
        />

        {/* Photo first in the DOM so it lands directly under the headline on a
            phone, where the canvas puts it. From `lg` the grid moves it to the
            right column and the failure modes take the wide left one. */}
        <div className="mt-10 grid gap-8 lg:mt-16 lg:grid-cols-[minmax(0,700px)_minmax(0,1fr)] lg:gap-16">
          <AnimatedContainer
            animation="fade-in"
            className="lg:order-last lg:self-stretch"
          >
            <div className="hover-zoom relative h-55 w-full overflow-hidden rounded-2xl bg-surface sm:h-72 lg:h-full lg:min-h-110">
              <Image
                src="/images/sections/search-phone.webp"
                alt="A customer on a Mahabubnagar market street searching for a shop on his phone"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 92vw, 520px"
              />
            </div>
          </AnimatedContainer>

          <div className="flex flex-col gap-4 lg:gap-6">
            {problems.map((problem, idx) => (
              <AnimatedContainer key={problem.title} delay={idx * 110}>
                <div className="group flex flex-col gap-3 rounded-2xl border border-border bg-white p-5 sm:flex-row sm:items-start sm:gap-5 sm:p-6">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border bg-surface transition-colors duration-300 group-hover:border-primary/40">
                    <problem.icon className="h-5 w-5 text-primary" />
                  </span>
                  <div>
                    <h3 className="font-heading text-[17px] font-semibold leading-snug text-text-primary sm:text-xl">
                      {problem.title}
                    </h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-text-secondary">
                      {problem.body}
                    </p>
                  </div>
                </div>
              </AnimatedContainer>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
