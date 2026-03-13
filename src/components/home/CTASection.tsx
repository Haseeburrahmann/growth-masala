"use client";

import { ArrowRight, Flame } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function CTASection() {
  return (
    <section className="relative overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
          className="noise-overlay relative overflow-hidden rounded-3xl bg-navy px-8 py-20 text-center sm:px-16 sm:py-24"
        >
          {/* Background decoration */}
          <div className="pointer-events-none absolute inset-0">
            <div className="animate-float-slow absolute -top-20 -left-20 h-60 w-60 rounded-full bg-primary/20 blur-[80px]" />
            <div className="animate-float absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-accent/15 blur-[80px]" />
            {/* Grid overlay */}
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
                backgroundSize: "48px 48px",
              }}
            />
          </div>

          <div className="relative z-10">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5"
            >
              <Flame className="h-7 w-7 text-accent" />
            </motion.div>

            <h2 className="mx-auto max-w-xl font-heading text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              Ready to Grow Your Business{" "}
              <span className="text-gradient">Online?</span>
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-slate-400 sm:text-lg">
              Let&apos;s discuss your goals and create a marketing strategy that
              delivers real, measurable results.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-secondary hover:shadow-lg hover:shadow-primary/25"
              >
                Get a Free Consultation
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-8 py-4 text-sm font-semibold text-white transition-all hover:border-white/30 hover:bg-white/5"
              >
                Explore Services
              </Link>
            </div>

            {/* Trust signals */}
            <div className="mx-auto mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500">
              <span className="flex items-center gap-1.5">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Free consultation
              </span>
              <span className="flex items-center gap-1.5">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                No commitments
              </span>
              <span className="flex items-center gap-1.5">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Results in 30 days
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
