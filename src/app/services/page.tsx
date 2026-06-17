"use client";

import { Globe, ArrowRight, ArrowUpRight, Check, Sparkles } from "lucide-react";
import AnimatedContainer from "@/components/ui/AnimatedContainer";
import { services, serviceIconMap } from "@/data/services";
import Link from "next/link";

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy pt-32 pb-24 sm:pt-40 sm:pb-32">
        <div className="grid-bg pointer-events-none absolute inset-0 opacity-60" />
        <div className="pointer-events-none absolute inset-0">
          <div className="animate-float-slow hidden md:block absolute -top-32 right-[8%] h-72 w-72 rounded-full bg-primary/20 blur-[90px]" />
          <div className="animate-float hidden md:block absolute top-20 left-[5%] h-64 w-64 rounded-full bg-accent/10 blur-[90px]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <AnimatedContainer>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-primary/40" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Our Services
              </span>
            </div>
            <h1 className="max-w-3xl font-heading text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
              End-to-End Digital{" "}
              <span className="text-gradient">Growth Solutions</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-400">
              From your first website to your thousandth customer — we handle every
              layer of your digital marketing so you can focus on your business.
            </p>
          </AnimatedContainer>

          {/* Jump-to-service pill nav */}
          <AnimatedContainer delay={120} animation="fade-in">
            <div className="mt-10 flex flex-wrap gap-2.5">
              {services.map((service, idx) => {
                const Icon = serviceIconMap[service.icon] || Globe;
                return (
                  <a
                    key={service.slug}
                    href={`#${service.slug}`}
                    className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-300 backdrop-blur-sm transition-all hover:border-primary/40 hover:bg-white/10 hover:text-white"
                  >
                    <Icon className="h-4 w-4 text-primary transition-transform group-hover:scale-110" />
                    {service.title}
                    <span className="font-heading text-xs text-white/30">
                      0{idx + 1}
                    </span>
                  </a>
                );
              })}
            </div>
          </AnimatedContainer>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-white to-transparent" />
      </section>

      {/* Detailed services */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="space-y-8 sm:space-y-10">
            {services.map((service, idx) => {
              const Icon = serviceIconMap[service.icon] || Globe;
              const isReversed = idx % 2 !== 0;
              const isFlagship = !!service.subItems;

              // ── Flagship (AI & Automation) — dramatic navy card ──────────
              if (isFlagship) {
                return (
                  <AnimatedContainer key={service.slug} delay={80}>
                    <div
                      id={service.slug}
                      className="scroll-mt-28 relative overflow-hidden rounded-[28px] bg-navy p-8 sm:p-10 lg:p-14"
                    >
                      <div className="grid-bg pointer-events-none absolute inset-0 opacity-50" />
                      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/20 blur-[100px]" />
                      <div className="pointer-events-none absolute -bottom-24 left-1/4 h-64 w-64 rounded-full bg-accent/10 blur-[100px]" />
                      <span className="pointer-events-none absolute right-8 top-2 select-none font-heading text-[8rem] font-bold leading-none text-white/[0.04] sm:text-[11rem]">
                        0{idx + 1}
                      </span>

                      <div className="relative">
                        <div className="inline-flex items-center gap-2 rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
                          <Sparkles className="h-3.5 w-3.5" />
                          New · Flagship Service
                        </div>

                        <div className="mt-6 flex items-center gap-4">
                          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-primary to-secondary text-white shadow-lg shadow-primary/30">
                            <Icon className="h-7 w-7" />
                          </div>
                          <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">
                            {service.title}
                          </h2>
                        </div>
                        <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-400">
                          {service.description}
                        </p>

                        {/* Sub-services */}
                        <div className="mt-9 grid gap-5 sm:grid-cols-3">
                          {service.subItems!.map((sub) => (
                            <div
                              key={sub.title}
                              className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-primary/40 hover:bg-white/[0.08]"
                            >
                              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 transition-colors group-hover:bg-primary/25">
                                <Sparkles className="h-5 w-5 text-primary" />
                              </div>
                              <h3 className="mt-4 font-heading text-base font-semibold text-white">
                                {sub.title}
                              </h3>
                              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                                {sub.description}
                              </p>
                            </div>
                          ))}
                        </div>

                        {/* Deliverables + CTA */}
                        <div className="mt-8 grid items-start gap-8 lg:grid-cols-[1.4fr_1fr]">
                          <div className="rounded-2xl border border-white/10 bg-white/5 p-7 backdrop-blur-sm">
                            <h3 className="font-heading text-lg font-semibold text-white">
                              What You Get
                            </h3>
                            <ul className="mt-5 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                              {service.deliverables.map((item) => (
                                <li
                                  key={item}
                                  className="flex items-start gap-3 text-sm text-slate-300"
                                >
                                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/15">
                                    <Check className="h-3 w-3 text-accent" />
                                  </span>
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="flex flex-col justify-between rounded-2xl bg-linear-to-br from-primary to-secondary p-7">
                            <div>
                              <h3 className="font-heading text-lg font-bold text-white">
                                Want this for your business?
                              </h3>
                              <p className="mt-2 text-sm leading-relaxed text-white/80">
                                The assistant in the corner of this site is one we
                                built. Let&apos;s build yours.
                              </p>
                            </div>
                            <Link
                              href="/contact"
                              className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-navy transition-all hover:gap-3 hover:shadow-lg"
                            >
                              Get a Free Demo
                              <ArrowRight className="h-4 w-4" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </AnimatedContainer>
                );
              }

              // ── Standard service — premium light card ────────────────────
              return (
                <AnimatedContainer key={service.slug} delay={80}>
                  <div
                    id={service.slug}
                    className="scroll-mt-28 group relative overflow-hidden rounded-[28px] border border-border bg-white p-8 shadow-sm transition-all duration-300 hover:border-primary/20 hover:shadow-xl sm:p-10 lg:p-12"
                  >
                    <span className="pointer-events-none absolute right-8 top-0 select-none font-heading text-[7rem] font-bold leading-none text-primary/[0.04] sm:text-[9rem]">
                      0{idx + 1}
                    </span>
                    {/* Accent rail */}
                    <div className="pointer-events-none absolute left-0 top-10 bottom-10 w-1 rounded-full bg-linear-to-b from-primary to-secondary opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    <div className="relative grid items-center gap-10 lg:grid-cols-2">
                      <div className={isReversed ? "lg:order-2" : ""}>
                        <div className="flex items-center gap-4">
                          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-primary to-secondary text-white shadow-lg shadow-primary/20 transition-transform duration-300 group-hover:scale-105">
                            <Icon className="h-7 w-7" />
                          </div>
                          <span className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-text-secondary">
                            Service 0{idx + 1}
                          </span>
                        </div>
                        <h2 className="mt-6 font-heading text-3xl font-bold text-text-primary sm:text-4xl">
                          {service.title}
                        </h2>
                        <p className="mt-4 text-base leading-relaxed text-text-secondary">
                          {service.description}
                        </p>
                        <div className="mt-6 flex flex-wrap gap-2">
                          {service.features.map((feature) => (
                            <span
                              key={feature}
                              className="rounded-full bg-primary/[0.07] px-3 py-1 text-xs font-medium text-primary"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                        <Link
                          href="/contact"
                          className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-all hover:gap-2.5"
                        >
                          Get a quote for {service.title}
                          <ArrowUpRight className="h-4 w-4" />
                        </Link>
                      </div>

                      <div className={isReversed ? "lg:order-1" : ""}>
                        <div className="rounded-2xl border border-border bg-surface p-7">
                          <h3 className="flex items-center gap-2 font-heading text-lg font-semibold text-text-primary">
                            <Sparkles className="h-4 w-4 text-accent" />
                            What You Get
                          </h3>
                          <ul className="mt-5 space-y-3.5">
                            {service.deliverables.map((item) => (
                              <li
                                key={item}
                                className="flex items-start gap-3 text-sm text-text-secondary"
                              >
                                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                                  <Check className="h-3 w-3 text-primary" />
                                </span>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </AnimatedContainer>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-surface py-20 sm:py-24">
        <div className="dot-pattern pointer-events-none absolute inset-0 opacity-60" />
        <div className="relative mx-auto max-w-3xl px-6 text-center lg:px-8">
          <AnimatedContainer>
            <h2 className="font-heading text-3xl font-bold text-text-primary sm:text-4xl">
              Not sure which service you need?
            </h2>
            <p className="mt-4 text-base text-text-secondary">
              Book a free consultation and we&apos;ll recommend the right plan for your
              business goals and budget.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white transition-all hover:gap-3 hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/25"
            >
              Book Free Consultation
              <ArrowRight className="h-4 w-4" />
            </Link>
          </AnimatedContainer>
        </div>
      </section>
    </>
  );
}
