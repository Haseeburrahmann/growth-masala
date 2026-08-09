"use client";

import Image from "next/image";
import { MapPin, UserCheck, FileCheck, Bot, Check, Minus, X } from "lucide-react";
import AnimatedContainer from "@/components/ui/AnimatedContainer";
import SectionIntro from "@/components/home/SectionIntro";

/**
 * Differentiation by comparison, not by adjective.
 *
 * The reader is not choosing between us and nothing — they are choosing between
 * us, a Hyderabad agency, a freelancer, a relative who "knows computers", and a
 * DIY site builder. Naming those options directly is more persuasive than a list
 * of qualities we assert about ourselves. Five options, and the headline says so.
 *
 * Every claim here has to be provable. An unprovable differentiator is worse
 * than none, because the first one that turns out to be false discredits the
 * rest.
 *
 * Composition: a photograph bleeding off the left edge of the viewport, the
 * heading set against it on the right, and a slab of reasons overlapping the
 * photo's lower corner. The overlap is the whole trick — a photo and a panel
 * sitting politely side by side is a two-column layout; the same two elements
 * interlocking is a composition. The comparison table then runs full width
 * beneath both.
 *
 * The photograph is desktop-only. Below `lg` the overlap has nowhere to happen,
 * and the canvas drops it rather than reducing it to a banner — which also
 * spares the phone a 37KB request for an image carrying no argument on its own.
 *
 * This is the only navy section in the lower half of the page. Process went
 * light in the same pass, so this one is now doing all of that work alone; keep
 * it dark.
 */
const pillars = [
  {
    icon: MapPin,
    title: "We are actually here",
    body: "A Mahabubnagar address and a phone that gets answered. Telugu, Hindi or English.",
    accent: false,
  },
  {
    icon: UserCheck,
    title: "You get the senior person",
    body: "Whoever quotes it, builds it. No quiet handover to a trainee after you pay.",
    accent: false,
  },
  {
    icon: FileCheck,
    title: "Fixed quote, before anything starts",
    body: "Scope and number in writing. No surprise invoice at the end.",
    accent: false,
  },
  {
    icon: Bot,
    title: "AI nobody else here offers",
    body: "Chatbots, WhatsApp automation, voice agents. The assistant in the corner is ours — try it.",
    accent: true,
  },
];

/**
 * `blocked` marks the alternative that fails outright rather than merely
 * disappointing — a platform you cannot leave is a different kind of problem
 * from a freelancer who goes quiet, and it gets the cross instead of the dash.
 */
const comparisons = [
  {
    option: "A Hyderabad agency",
    usually: "Big retainer. You are a small account.",
    ours: "A direct line to the person building it.",
    blocked: false,
  },
  {
    option: "A freelancer",
    usually: "Goes quiet halfway through.",
    ours: "A registered business you can walk into.",
    blocked: false,
  },
  {
    option: "Someone's nephew",
    usually: "Free. Still unfinished a year later.",
    ours: "A launch date agreed in writing.",
    blocked: false,
  },
  {
    option: "A DIY site builder",
    usually: "Free to start. Then you are stuck on their platform.",
    ours: "Your domain. Your logins. Handed over.",
    blocked: true,
  },
];

export default function WhyUsSection() {
  return (
    <section className="relative overflow-hidden bg-navy py-20 sm:py-24">
      {/* Grid texture + warm bloom. Both decorative, both pointer-transparent. */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.045]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />
      <div className="pointer-events-none absolute -right-20 top-1/4 hidden h-130 w-130 rounded-full bg-accent/12 blur-[110px] md:block" />

      {/* Bleeds off the left edge of the viewport, which is what stops it
          reading as a card. Rounded on its right corners only. */}
      <div className="pointer-events-none absolute left-0 top-24 hidden h-165 w-[43%] overflow-hidden rounded-r-3xl lg:block">
        <Image
          src="/images/sections/team-work.webp"
          alt="Two of the Growth Masala team reviewing a client build together"
          fill
          className="object-cover object-center"
          sizes="620px"
        />
        <div className="absolute inset-0 bg-linear-to-r from-navy/30 via-transparent to-navy/85" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-navy to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <SectionIntro
          tone="dark"
          eyebrow="Why choose us"
          lead="You have five options."
          trail="We are only one of them."
          standfirst="The honest comparison — including where we are not the answer."
          className="lg:pl-[48%]"
        />

        {/* The slab. On desktop it is pulled left under the photo so its top
            edge crosses the photograph's lower corner; below `lg` there is no
            photo, so the pillars become four plain cards in the flow. */}
        <AnimatedContainer delay={120} className="mt-8 lg:mt-16 lg:pl-[22%]">
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:gap-x-8 lg:gap-y-7 lg:rounded-3xl lg:border lg:border-white/14 lg:bg-navy-light/95 lg:p-10 lg:shadow-2xl lg:shadow-black/50 lg:backdrop-blur-sm">
            {pillars.map((pillar) => (
              <div
                key={pillar.title}
                className="rounded-2xl border border-white/12 bg-navy-light p-5 lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0"
              >
                <span
                  className={`flex h-10.5 w-10.5 items-center justify-center rounded-xl ${
                    pillar.accent ? "bg-accent/15 text-accent" : "bg-primary/20 text-secondary"
                  }`}
                >
                  <pillar.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-3 font-heading text-[17px] font-semibold leading-snug text-white sm:text-lg">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">{pillar.body}</p>
              </div>
            ))}
          </div>
        </AnimatedContainer>

        {/* The comparison itself. Kept below the slab rather than folded into
            it: the pillars say what we are, this says what the alternatives
            are, and collapsing the two would blur both.

            One markup, two shapes. From `md` the rows are a three-column grid
            with a header strip; below that each row becomes a card and the
            column headings would be meaningless, so the strip is hidden and a
            single label stands in for it. Not a real <table>: the cells are
            prose, not data, and a screen reader announcing "row 3, column 2" of
            a sales argument helps nobody. */}
        <AnimatedContainer animation="fade-in" delay={160} className="mt-12 lg:mt-16">
          <p className="text-xs font-semibold uppercase tracking-[0.13em] text-slate-400 md:hidden">
            Instead of us, you could use
          </p>

          <div className="mt-3 md:mt-0 md:overflow-hidden md:rounded-2xl md:border md:border-white/12 md:bg-navy-light">
            {/* Column headings only exist where there are columns. Separation
                from the first row is a bottom border here rather than a top
                border on the row, so it never has to out-rank `md:border-0`. */}
            <div className="hidden bg-white/4 md:grid md:grid-cols-[minmax(0,300px)_minmax(0,1fr)_minmax(0,1fr)] md:border-b md:border-white/8">
              <p className="px-6 py-4.5 text-xs font-semibold uppercase tracking-[0.13em] text-slate-400">
                Instead of us, you could use
              </p>
              <p className="px-6 py-4.5 text-xs font-semibold uppercase tracking-[0.13em] text-slate-400">
                What usually happens
              </p>
              <p className="bg-primary/15 px-6 py-4.5 text-xs font-semibold uppercase tracking-[0.13em] text-blue-300">
                With Growth Masala
              </p>
            </div>

            {/* `divide-y` rather than a border on each row: its selector
                out-specifies `md:border-0`, so the card border can be switched
                off at `md` without the row separators going with it. */}
            <div className="flex flex-col gap-3.5 md:gap-0 md:divide-y md:divide-white/8">
              {comparisons.map((row) => (
                <div
                  key={row.option}
                  className="overflow-hidden rounded-2xl border border-white/12 bg-navy-light md:grid md:grid-cols-[minmax(0,300px)_minmax(0,1fr)_minmax(0,1fr)] md:items-stretch md:rounded-none md:border-0"
                >
                  <p className="px-4 pb-1 pt-4 font-heading text-base font-semibold leading-snug text-white sm:px-6 md:py-5.5">
                    {row.option}
                  </p>
                  <p className="flex gap-3 px-4 py-3 text-sm leading-snug text-slate-400 sm:px-6 md:py-5.5">
                    {row.blocked ? (
                      <X aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
                    ) : (
                      <Minus aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
                    )}
                    {row.usually}
                  </p>
                  <p className="flex gap-3 bg-primary/12 px-4 py-3.5 text-sm font-medium leading-snug text-white sm:px-6 md:py-5.5">
                    <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    {row.ours}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedContainer>
      </div>
    </section>
  );
}
