import Link from "next/link";
import { ArrowRight, Globe } from "lucide-react";
import AnimatedContainer from "@/components/ui/AnimatedContainer";
import { serviceGroups, serviceIconMap } from "@/data/services";
import { address } from "@/data/business";

/**
 * The one `<h1>` on /services.
 *
 * It reads "Digital Marketing Services in Mahabubnagar", not "…Agency…". The
 * agency phrase is the exact-match property of
 * `/digital-marketing-agency-mahabubnagar`, which carries the Service schema and
 * the internal links to support it. Two pages competing for one phrase split the
 * signal — see docs/seo-architecture.md §Rule 2.
 *
 * The jump nav lists the four groups rather than all nine services. Nine pills
 * wrapped to three rows and stopped functioning as navigation.
 */
export default function ServicesHero() {
  return (
    <section className="relative overflow-hidden bg-navy pt-32 pb-24 sm:pt-40 sm:pb-32">
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-60" />
      <div className="pointer-events-none absolute inset-0">
        <div className="animate-float-slow hidden md:block absolute -top-32 right-[8%] h-72 w-72 rounded-full bg-primary/20 blur-[90px]" />
        <div className="animate-float hidden md:block absolute top-20 left-[5%] h-64 w-64 rounded-full bg-accent/10 blur-[90px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <AnimatedContainer>
          <div className="mb-4 flex items-center gap-3">
            <div className="h-px w-8 bg-primary/40" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Our Services
            </span>
          </div>

          {/* White throughout, with the accent carried by an underline rather
              than by recolouring the words. `.text-gradient` was here first and
              was wrong for the same reason it was pulled off the homepage H1:
              the blue→amber ramp measures 3.64:1 on navy and lands its muddy
              midpoint mid-word — on a 390px viewport it turned "…nagar", the
              one keyword this page exists to rank for, into washed-out tan. */}
          <h1 className="max-w-4xl font-heading text-4xl font-bold leading-[1.1] text-white text-balance sm:text-5xl lg:text-6xl">
            <span className="block">Digital Marketing Services</span>
            <span className="relative inline-block">
              in {address.locality}
              <span
                aria-hidden="true"
                className="animate-underline-sweep absolute -bottom-1 left-0 h-[3px] w-full rounded-full bg-accent sm:-bottom-1.5 sm:h-1"
                style={{ animationDelay: "600ms" }}
              />
            </span>
          </h1>

          <p className="mt-7 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg">
            Websites, online stores, custom software, SEO, Meta and Google ads,
            social media, and AI automation — built and run for businesses in{" "}
            {address.locality}, Hyderabad, and across {address.region}. Every
            price on this page is published, and anything outside them is quoted
            as a fixed number before work starts.
          </p>

          <Link
            href="#pricing"
            className="group mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-secondary"
          >
            See what it costs
            <ArrowRight className="cta-arrow h-4 w-4" />
          </Link>
        </AnimatedContainer>

        {/* Jump-to-group pill nav */}
        <AnimatedContainer delay={120} animation="fade-in">
          <div className="mt-12 flex flex-wrap gap-2.5">
            {serviceGroups.map((group, idx) => {
              const Icon = serviceIconMap[group.icon] || Globe;
              return (
                <a
                  key={group.id}
                  href={`#${group.id}`}
                  className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-300 backdrop-blur-sm transition-all hover:border-primary/40 hover:bg-white/10 hover:text-white"
                >
                  <Icon className="h-4 w-4 text-primary transition-transform group-hover:scale-110" />
                  {group.title}
                  <span className="font-heading text-xs text-white/30">
                    0{idx + 1}
                  </span>
                </a>
              );
            })}
          </div>
        </AnimatedContainer>
      </div>
    </section>
  );
}
