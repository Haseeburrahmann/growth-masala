"use client";

import { ArrowRight, ArrowUpRight, Flame, TrendingUp, Users, Globe, MousePointerClick, ArrowUp, Check } from "lucide-react";
import Link from "next/link";

// Mini bar chart data for the dashboard
const chartBars = [35, 45, 30, 55, 40, 65, 50, 75, 60, 85, 70, 92];
const months = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-navy">
      {/* Background layers */}
      <div className="pointer-events-none absolute inset-0">
        {/* Ambient bloom field, drawn in CSS rather than loaded as an image.
            This was a generated WebP; even at 8KB, a full-viewport above-fold
            raster pushed mobile LCP from 2.7s to 4.9s and tripled FCP. Layered
            radial gradients give the same soft atmosphere for zero bytes, no
            decode, and no resolution ceiling. */}
        <div className="animate-ambient absolute inset-0 opacity-90" style={{
          backgroundImage:
            "radial-gradient(60% 55% at 78% 12%, rgba(56,189,248,0.20) 0%, transparent 65%)," +
            "radial-gradient(45% 45% at 92% 30%, rgba(37,99,235,0.28) 0%, transparent 70%)," +
            "radial-gradient(50% 50% at 6% 88%, rgba(245,158,11,0.13) 0%, transparent 70%)",
        }} />
        {/* Keeps the headline side dark enough for white text regardless of how
            the bloom lands at a given viewport width. */}
        <div className="absolute inset-0 bg-linear-to-r from-navy/90 via-navy/60 to-transparent" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        {/* Gradient orbs — desktop only, GPU-intensive blur hidden on mobile */}
        <div className="hidden md:block absolute -top-32 right-[10%] h-96 w-96 rounded-full bg-primary/20 blur-[100px]" />
        <div className="hidden md:block absolute -bottom-32 left-[5%] h-72 w-72 rounded-full bg-accent/15 blur-[80px]" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 pt-24 pb-20 lg:px-8">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-16">
          {/* Left column — text content */}
          <div className="flex-1">
            {/* Top badge */}
            <div className="mb-8 animate-hero-reveal">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 backdrop-blur-sm">
                <Flame className="h-4 w-4 text-accent" />
                Your Growth Partner
                <span className="h-1 w-1 rounded-full bg-accent" />
                <span className="text-accent">India</span>
              </span>
            </div>

            {/* Headline — oversized, stacked */}
            <div>
              {/* One <h1> per page. The visual line breaks are spans — three
                  separate <h1> elements is a mistake this project has already
                  made once. */}
              <h1 className="font-heading text-4xl font-bold leading-[1.05] tracking-tight text-balance sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl">
                <span
                  className="block animate-hero-reveal text-white"
                  style={{ animationDelay: "150ms" }}
                >
                  Websites that get
                </span>
                <span
                  className="block animate-hero-reveal"
                  style={{ animationDelay: "300ms" }}
                >
                  <span className="text-gradient-cool">your business found</span>
                </span>
                <span
                  className="block animate-hero-reveal text-white"
                  style={{ animationDelay: "450ms" }}
                >
                  in Mahabubnagar<span className="text-accent">.</span>
                </span>
              </h1>
            </div>

            {/* Subtitle + CTAs */}
            <div
              className="animate-hero-reveal mt-8 flex max-w-2xl flex-col gap-8 lg:flex-row lg:items-end lg:gap-16"
              style={{ animationDelay: "600ms" }}
            >
              <p className="max-w-md text-base leading-relaxed text-slate-400 sm:text-lg">
                Websites, online stores, SEO, and ads for businesses in{" "}
                <span className="text-white">Mahabubnagar, Hyderabad</span>, and
                across Telangana — with a{" "}
                <span className="text-white">fixed quote before any work starts.</span>
              </p>
              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-secondary hover:shadow-lg hover:shadow-primary/25"
                >
                  Get a free quote
                  <ArrowRight className="cta-arrow h-4 w-4" />
                </Link>
                {/* Publishing prices is itself a trust signal, so the hero says so */}
                <Link
                  href="#pricing"
                  className="group inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:border-white/30 hover:bg-white/5"
                >
                  See our pricing
                  <ArrowUpRight className="cta-arrow h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right column — Dashboard mockup */}
          <div
            className="hidden w-full max-w-md shrink-0 animate-dashboard-reveal lg:block xl:max-w-lg"
            style={{ animationDelay: "500ms" }}
          >
            <div className="relative">
              {/* Glow behind dashboard */}
              <div className="absolute -inset-4 rounded-3xl bg-primary/10 blur-2xl" />

              {/* Main dashboard card */}
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/4 p-5 backdrop-blur-xl">
                {/* Header */}
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-[11px] font-medium uppercase tracking-widest text-slate-500">Analytics Overview</p>
                    <p className="mt-0.5 font-heading text-lg font-bold text-white">Growth Dashboard</p>
                  </div>
                  <div className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1">
                    <ArrowUp className="h-3 w-3 text-emerald-400" />
                    <span className="text-xs font-semibold text-emerald-400">+24%</span>
                  </div>
                </div>

                {/* Metric cards row */}
                <div className="mb-5 grid grid-cols-3 gap-2.5">
                  {[
                    { icon: Users, label: "Visitors", value: "12.8K", change: "+18%", color: "text-primary" },
                    { icon: MousePointerClick, label: "Clicks", value: "3.2K", change: "+32%", color: "text-accent" },
                    { icon: Globe, label: "Reach", value: "48.5K", change: "+24%", color: "text-emerald-400" },
                  ].map((metric, idx) => (
                    <div
                      key={metric.label}
                      className="animate-fade-in-up rounded-xl border border-white/6 bg-white/3 p-3"
                      style={{ animationDelay: `${900 + idx * 100}ms` }}
                    >
                      <metric.icon className={`h-4 w-4 ${metric.color}`} />
                      <p className="mt-2 font-heading text-base font-bold text-white">{metric.value}</p>
                      <div className="mt-0.5 flex items-center justify-between">
                        <span className="text-[10px] text-slate-500">{metric.label}</span>
                        <span className="text-[10px] font-medium text-emerald-400">{metric.change}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bar chart */}
                <div className="rounded-xl border border-white/6 bg-white/3 p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-3.5 w-3.5 text-primary" />
                      <span className="text-xs font-medium text-slate-400">Monthly Growth</span>
                    </div>
                    <span className="text-[10px] text-slate-600">2025</span>
                  </div>
                  <div className="flex items-end gap-1.5">
                    {chartBars.map((height, i) => (
                      <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
                        <div
                          className={`animate-bar-grow w-full rounded-sm ${
                            i === chartBars.length - 1
                              ? "bg-linear-to-t from-primary to-secondary shadow-sm shadow-primary/30"
                              : i >= chartBars.length - 3
                              ? "bg-primary/60"
                              : "bg-white/10"
                          }`}
                          style={{
                            height: `${height}px`,
                            animationDelay: `${1100 + i * 60}ms`,
                          }}
                        />
                        <span className="text-[8px] text-slate-600">{months[i]}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom row — mini stats */}
                <div className="mt-3 flex items-center gap-2">
                  <div className="flex-1 rounded-lg border border-white/6 bg-white/3 px-3 py-2">
                    <p className="text-[10px] text-slate-500">Conversion</p>
                    <p className="font-heading text-sm font-bold text-white">4.8%</p>
                  </div>
                  <div className="flex-1 rounded-lg border border-white/6 bg-white/3 px-3 py-2">
                    <p className="text-[10px] text-slate-500">Bounce Rate</p>
                    <p className="font-heading text-sm font-bold text-white">28%</p>
                  </div>
                  <div className="flex-1 rounded-lg border border-white/6 bg-white/3 px-3 py-2">
                    <p className="text-[10px] text-slate-500">Avg. ROI</p>
                    <p className="font-heading text-sm font-bold text-accent">3.2x</p>
                  </div>
                </div>
              </div>

              {/* Floating notification card — top right */}
              <div
                className="animate-fade-in-up absolute -top-3 -right-3 rounded-xl border border-white/10 bg-navy/90 px-3.5 py-2.5 shadow-xl backdrop-blur-md"
                style={{ animationDelay: "1500ms" }}
              >
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/15">
                    <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-[10px] font-medium text-white">Revenue Up</p>
                    <p className="text-[10px] text-emerald-400">+127% this quarter</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/*
          Promises, not counters.

          This strip previously claimed "50+ Projects Delivered" and "30+ Happy
          Clients". The portfolio holds 8 projects and the testimonials file 3
          clients, so both numbers were unverifiable — and on a page that now
          publishes exact prices beside a promise of fixed quotes, an inflated
          counter undercuts the very thing being sold. Every line below is a
          commitment we can be held to, and the proof itself moved to the client
          strip immediately underneath.
        */}
        <div className="mt-20 flex flex-wrap gap-x-10 gap-y-4 border-t border-white/10 pt-10 lg:mt-16">
          {[
            "Fixed quote before any work starts",
            "Prices published — no hidden costs",
            "Based in Mahabubnagar, not a call centre",
          ].map((point, i) => (
            <div
              key={point}
              className="animate-fade-in-up flex items-center gap-2.5"
              style={{ animationDelay: `${800 + i * 100}ms` }}
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent/15">
                <Check className="h-3 w-3 text-accent" />
              </span>
              <span className="text-sm text-slate-300">{point}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-white to-transparent" />
    </section>
  );
}
