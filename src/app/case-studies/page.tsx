"use client";

import { ArrowRight, TrendingUp, Users, Target, ExternalLink } from "lucide-react";
import AnimatedContainer from "@/components/ui/AnimatedContainer";
import Link from "next/link";

// Real Growth Masala projects. "Delivered" highlights are factual capabilities
// shipped — not performance KPIs. Swap in real numbers (enquiries, admissions,
// traffic) here once the client shares them.
const caseStudies = [
  {
    client: "Freewings School",
    category: "Website · Education",
    link: "https://freewingsschool.com",
    challenge:
      "Freewings, a pre-primary and upper-primary school in Telangana, had no proper online presence. Parents researching schools couldn't find them or get a feel for the campus and activities.",
    solution:
      "We built a warm, mobile-first school website with a photo gallery, the principal's message, smooth scroll animations, and one-tap WhatsApp contact so parents can enquire instantly.",
    results: [
      { metric: "Live", label: "Online Presence" },
      { metric: "1-tap", label: "WhatsApp Enquiries" },
      { metric: "100%", label: "Mobile Responsive" },
    ],
    gradient: "from-primary/20 to-secondary/10",
  },
  {
    client: "Kings Mobile World",
    category: "Website · Local Business",
    link: "https://kingsmobileworld.in",
    challenge:
      "Kings Mobile World runs Hyderabad's leading mobile-repair service across 4 branches, but had no website to build trust or capture repair enquiries online.",
    solution:
      "We built a conversion-focused business website showcasing all 4 branches, repair stats, and a brand carousel — with WhatsApp-driven lead capture front and centre.",
    results: [
      { metric: "4", label: "Branches Showcased" },
      { metric: "1-tap", label: "Repair Enquiries" },
      { metric: "Live", label: "Online Storefront" },
    ],
    gradient: "from-accent/20 to-orange-500/10",
  },
  {
    client: "Triveni Balavikas Central School",
    category: "Website · Education",
    link: "https://trivenibalavikascentralschool.in",
    challenge:
      "Triveni Balavikas, an ICSE school in Bengaluru, needed a credible online home to present its curriculum, values, and admissions process to prospective parents.",
    solution:
      "We designed a full school website with an admissions portal, academics and pedagogy pages, a school-life gallery, leadership profiles, parent testimonials, and WhatsApp contact.",
    results: [
      { metric: "I–VIII", label: "Grades Covered" },
      { metric: "Admissions", label: "Online Enquiry Portal" },
      { metric: "WhatsApp", label: "Direct Parent Contact" },
    ],
    gradient: "from-violet-500/20 to-fuchsia-500/10",
  },
];

export default function CaseStudiesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy pt-32 pb-20 sm:pt-40 sm:pb-28">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 right-[20%] h-100 w-100 rounded-full bg-accent/15 blur-[120px]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <AnimatedContainer>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-primary/40" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Case Studies
              </span>
            </div>
            <h1 className="max-w-3xl font-heading text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
              Results That <span className="text-gradient">Speak</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-400">
              Real challenges, real solutions, real growth. Here&apos;s how we&apos;ve
              helped businesses achieve measurable results.
            </p>
          </AnimatedContainer>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-white to-transparent" />
      </section>

      {/* Case studies */}
      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="space-y-16">
            {caseStudies.map((study, idx) => (
              <AnimatedContainer key={study.client} delay={idx * 120}>
                <div className={`overflow-hidden rounded-2xl bg-linear-to-br ${study.gradient} p-8 sm:p-12`}>
                  <div className="flex flex-wrap items-center gap-3 mb-6">
                    <span className="rounded-full bg-white/60 px-3 py-1 text-xs font-medium text-text-secondary backdrop-blur-sm">
                      {study.category}
                    </span>
                    <span className="text-sm font-semibold text-text-primary">
                      {study.client}
                    </span>
                    {study.link && (
                      <a
                        href={study.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-auto inline-flex items-center gap-1.5 text-xs font-medium text-primary transition-colors hover:text-primary-dark"
                      >
                        View live site
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>

                  <div className="grid gap-8 lg:grid-cols-3">
                    {/* Challenge */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Target className="h-4 w-4 text-red-500" />
                        <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-red-600">
                          Challenge
                        </h3>
                      </div>
                      <p className="text-sm leading-relaxed text-text-secondary">
                        {study.challenge}
                      </p>
                    </div>

                    {/* Solution */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Users className="h-4 w-4 text-primary" />
                        <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-primary">
                          Solution
                        </h3>
                      </div>
                      <p className="text-sm leading-relaxed text-text-secondary">
                        {study.solution}
                      </p>
                    </div>

                    {/* Results */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <TrendingUp className="h-4 w-4 text-emerald-600" />
                        <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-emerald-600">
                          Results
                        </h3>
                      </div>
                      <div className="space-y-3">
                        {study.results.map((r) => (
                          <div key={r.label} className="flex items-baseline gap-3">
                            <span className="font-heading text-2xl font-bold text-text-primary">
                              {r.metric}
                            </span>
                            <span className="text-sm text-text-secondary">
                              {r.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedContainer>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-20 text-center">
            <AnimatedContainer>
              <h2 className="font-heading text-2xl font-bold text-text-primary sm:text-3xl">
                Want results like these?
              </h2>
              <p className="mt-3 text-base text-text-secondary">
                Let&apos;s discuss what Growth Masala can do for your business.
              </p>
              <Link
                href="/contact"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/25"
              >
                Start Your Growth Story
                <ArrowRight className="h-4 w-4" />
              </Link>
            </AnimatedContainer>
          </div>
        </div>
      </section>
    </>
  );
}
