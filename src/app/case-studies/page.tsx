"use client";

import { ArrowRight, TrendingUp, Users, Target } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedContainer from "@/components/ui/AnimatedContainer";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import Link from "next/link";

const caseStudies = [
  {
    client: "TechStart India",
    category: "Website + SEO",
    challenge:
      "TechStart had a dated website that wasn't converting visitors. Their bounce rate was 78% and organic traffic was declining.",
    solution:
      "We rebuilt their website from scratch with a conversion-focused design, implemented technical SEO, and created a content strategy targeting high-intent keywords.",
    results: [
      { metric: "3x", label: "Website Traffic" },
      { metric: "40%", label: "More Leads" },
      { metric: "52%", label: "Lower Bounce Rate" },
    ],
    gradient: "from-primary/20 to-secondary/10",
  },
  {
    client: "FreshBite",
    category: "Social Media Growth",
    challenge:
      "FreshBite had minimal social media presence with under 500 followers and no engagement strategy for their food delivery brand.",
    solution:
      "We developed a content-first social strategy with daily posts, reels, influencer collaborations, and community engagement across Instagram and LinkedIn.",
    results: [
      { metric: "3x", label: "Follower Growth" },
      { metric: "12%", label: "Engagement Rate" },
      { metric: "200+", label: "UGC Posts" },
    ],
    gradient: "from-violet-500/20 to-fuchsia-500/10",
  },
  {
    client: "UrbanFit",
    category: "Performance Marketing",
    challenge:
      "UrbanFit was spending heavily on ads but seeing poor returns. Their cost per acquisition was unsustainably high at Rs. 1,200 per lead.",
    solution:
      "We restructured their Google and Meta campaigns, implemented proper conversion tracking, built targeted audience segments, and ran rigorous A/B testing.",
    results: [
      { metric: "5x", label: "ROAS" },
      { metric: "65%", label: "Lower CPA" },
      { metric: "Rs. 420", label: "Cost Per Lead" },
    ],
    gradient: "from-accent/20 to-orange-500/10",
  },
];

export default function CaseStudiesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy pt-32 pb-20 sm:pt-40 sm:pb-28">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 right-[20%] h-[400px] w-[400px] rounded-full bg-accent/15 blur-[120px]" />
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
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Case studies */}
      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            className="space-y-16"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {caseStudies.map((study, idx) => (
              <AnimatedContainer key={study.client} variants={fadeInUp}>
                <div className={`overflow-hidden rounded-2xl bg-gradient-to-br ${study.gradient} p-8 sm:p-12`}>
                  <div className="flex flex-wrap items-center gap-3 mb-6">
                    <span className="rounded-full bg-white/60 px-3 py-1 text-xs font-medium text-text-secondary backdrop-blur-sm">
                      {study.category}
                    </span>
                    <span className="text-sm font-semibold text-text-primary">
                      {study.client}
                    </span>
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
          </motion.div>

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
