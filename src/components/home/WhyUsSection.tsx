"use client";

import Image from "next/image";
import { MapPin, UserCheck, FileCheck, Bot, Check } from "lucide-react";
import AnimatedContainer from "@/components/ui/AnimatedContainer";

/**
 * Differentiation by comparison, not by adjective.
 *
 * The reader is not choosing between us and nothing — they are choosing between
 * us, a Hyderabad agency, a freelancer, and a relative who "knows computers".
 * Naming those options directly is more persuasive than a list of qualities we
 * assert about ourselves.
 *
 * Every claim here has to be provable. An unprovable differentiator is worse
 * than none, because the first one that turns out to be false discredits the
 * rest.
 *
 * Layout follows the reference: a photograph bleeding off the left edge of the
 * viewport, the heading set against it on the right, and a slab of reasons
 * overlapping the photo's lower corner. The overlap is the whole trick — a
 * photo and a panel sitting politely side by side is a two-column layout, the
 * same two elements interlocking is a composition.
 *
 * This section turned navy in the process. On light ground the slab had nothing
 * to be raised above, and the page needed a landmark here anyway: Portfolio and
 * Pricing either side of it are both white, so nine sections in, the scroll had
 * gone flat. Dark also gives the amber marks somewhere to land.
 */
const pillars = [
  {
    icon: MapPin,
    title: "We are actually here",
    body: "A Mahabubnagar address, a phone number that gets answered, and meetings in person — in Telugu, Hindi, or English.",
    accent: false,
  },
  {
    icon: UserCheck,
    title: "You get the senior person",
    body: "Whoever scopes your project builds it. Nothing quietly moves to a trainee once the contract is signed.",
    accent: false,
  },
  {
    icon: FileCheck,
    title: "Fixed quote before anything starts",
    body: "You approve a scope and a number in writing. No hourly creep, no larger invoice waiting at the end.",
    accent: false,
  },
  {
    icon: Bot,
    title: "AI nobody else here offers",
    body: "Chatbots, WhatsApp automation, and voice agents — running on this very site. The assistant in the corner is ours; try it.",
    accent: true,
  },
];

const comparisons = [
  {
    option: "A Hyderabad agency",
    usually: "Large retainers, and you are a small account handed to juniors",
    ours: "Senior attention and a direct line — no account-manager relay",
  },
  {
    option: "A freelancer",
    usually: "Fine until they stop replying halfway through the build",
    ours: "A registered business with an address you can walk into",
  },
  {
    option: "Someone's nephew",
    usually: "Costs nothing, and is still unfinished a year later",
    ours: "A fixed timeline with a launch date agreed in writing",
  },
];

export default function WhyUsSection() {
  return (
    <section className="relative overflow-hidden bg-navy pb-24 sm:pb-28">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />
      <div className="pointer-events-none absolute -right-20 top-1/3 hidden h-80 w-80 rounded-full bg-accent/10 blur-[100px] md:block" />

      {/* Photograph. Bleeds off the left edge of the viewport on desktop, which
          is what stops it reading as a card. In the flow on mobile, where a
          half-width absolute image would leave the heading nowhere to go. */}
      <div className="relative h-56 w-full sm:h-72 lg:absolute lg:left-0 lg:top-14 lg:h-120 lg:w-[46%]">
        <Image
          src="/images/sections/team-work.webp"
          alt="Two of the Growth Masala team reviewing a client build together"
          fill
          className="object-cover object-center"
          sizes="(max-width: 1024px) 100vw, 46vw"
        />
        {/* Grounds the photo into the section on every side it meets navy */}
        <div className="absolute inset-0 bg-linear-to-r from-navy/40 via-transparent to-navy" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-navy to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <AnimatedContainer className="pt-14 lg:pt-24 lg:pl-[50%]">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Why us
          </span>
          <h2 className="mt-5 font-heading text-3xl font-bold uppercase leading-[1.05] tracking-tight text-white text-balance sm:text-4xl lg:text-5xl">
            Why choose us<span className="text-accent">?</span>
          </h2>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-slate-400">
            You have four options. Below is the honest comparison, including the
            one where you do nothing.
          </p>
        </AnimatedContainer>

        {/* The slab. Overlaps the photo's lower corner on desktop. */}
        <AnimatedContainer delay={120}>
          <div className="mt-10 rounded-2xl border border-white/10 bg-navy-light/95 p-7 shadow-2xl backdrop-blur-sm sm:p-9 lg:mt-16">
            <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4 xl:gap-7">
              {pillars.map((pillar) => (
                <div key={pillar.title} className="group">
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
                        pillar.accent
                          ? "bg-accent text-navy"
                          : "bg-white/8 text-accent group-hover:bg-accent group-hover:text-navy"
                      }`}
                    >
                      <Check className="h-5 w-5" strokeWidth={3} />
                    </span>
                    <h3 className="font-heading text-sm font-bold uppercase leading-tight tracking-wide text-white">
                      {pillar.title}
                    </h3>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-slate-400">
                    {pillar.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedContainer>

        {/* The comparison itself. Kept below the slab rather than folded into
            it: the pillars say what we are, this says what the alternatives
            are, and collapsing the two would blur both. */}
        <AnimatedContainer animation="fade-in" delay={160}>
          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-3">
            {comparisons.map((row) => (
              <div key={row.option} className="bg-navy p-6">
                <p className="font-heading text-[15px] font-bold text-white">
                  {row.option}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {row.usually}
                </p>
                <p className="mt-4 flex items-start gap-2 text-sm font-medium leading-relaxed text-slate-200">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  {row.ours}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-5 text-sm leading-relaxed text-slate-400">
            The fourth option is doing nothing — which costs nothing today, and a
            few customers every week.
          </p>
        </AnimatedContainer>
      </div>
    </section>
  );
}
