"use client";

import { Globe, ArrowRight, CheckCircle2 } from "lucide-react";
import AnimatedContainer from "@/components/ui/AnimatedContainer";
import { services, serviceIconMap } from "@/data/services";
import Link from "next/link";

const detailedServices = [
  {
    ...services[0],
    deliverables: [
      "Custom responsive website design",
      "SEO-optimised structure and content",
      "CMS integration (WordPress / headless)",
      "Performance optimisation (90+ Lighthouse)",
      "SSL, hosting setup, and deployment",
      "30-day post-launch support",
    ],
  },
  {
    ...services[1],
    deliverables: [
      "Social media audit and strategy",
      "Monthly content calendar",
      "Post design and copywriting",
      "Community management and engagement",
      "Monthly analytics and performance report",
      "Hashtag and trend research",
    ],
  },
  {
    ...services[2],
    deliverables: [
      "Meta campaign strategy and setup",
      "Audience research and targeting",
      "Ad creative design and copywriting",
      "A/B testing and optimisation",
      "Conversion tracking and pixel setup",
      "Weekly performance reports with ROI",
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy pt-32 pb-20 sm:pt-40 sm:pb-28">
        <div className="pointer-events-none absolute inset-0">
          <div className="hidden md:block absolute -top-32 right-[10%] h-72 w-72 rounded-full bg-primary/15 blur-[80px]" />
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
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-white to-transparent" />
      </section>

      {/* Detailed services */}
      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="space-y-20">
            {detailedServices.map((service, idx) => {
              const Icon = serviceIconMap[service.icon] || Globe;
              const isReversed = idx % 2 !== 0;

              return (
                <AnimatedContainer key={service.title} delay={idx * 120}>
                  <div
                    className={`grid items-center gap-12 lg:grid-cols-2 ${
                      isReversed ? "lg:direction-rtl" : ""
                    }`}
                  >
                    <div className={isReversed ? "lg:order-2" : ""}>
                      <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                        <Icon className="h-7 w-7 text-primary" />
                      </div>
                      <span className="ml-4 inline-block font-heading text-sm font-semibold uppercase tracking-wider text-text-secondary">
                        0{idx + 1}
                      </span>
                      <h2 className="mt-4 font-heading text-3xl font-bold text-text-primary sm:text-4xl">
                        {service.title}
                      </h2>
                      <p className="mt-4 text-base leading-relaxed text-text-secondary">
                        {service.description}
                      </p>
                      <div className="mt-6 flex flex-wrap gap-2">
                        {service.features.map((feature) => (
                          <span
                            key={feature}
                            className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className={isReversed ? "lg:order-1" : ""}>
                      <div className="rounded-2xl border border-border bg-surface p-8">
                        <h3 className="font-heading text-lg font-semibold text-text-primary">
                          What You Get
                        </h3>
                        <ul className="mt-4 space-y-3">
                          {service.deliverables.map((item) => (
                            <li
                              key={item}
                              className="flex items-start gap-3 text-sm text-text-secondary"
                            >
                              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                              {item}
                            </li>
                          ))}
                        </ul>
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
      <section className="bg-surface py-20">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
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
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/25"
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
