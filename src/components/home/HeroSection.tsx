"use client";

import { ArrowRight, ArrowUpRight, Flame, TrendingUp, Users, Globe, MousePointerClick, ArrowUp } from "lucide-react";
import Link from "next/link";

// Mini bar chart data for the dashboard
const chartBars = [35, 45, 30, 55, 40, 65, 50, 75, 60, 85, 70, 92];
const months = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-navy">
      {/* Background layers */}
      <div className="pointer-events-none absolute inset-0">
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
                Digital Marketing Agency
                <span className="h-1 w-1 rounded-full bg-accent" />
                <span className="text-accent">India</span>
              </span>
            </div>

            {/* Headline — oversized, stacked */}
            <div>
              <h1
                className="animate-hero-reveal font-heading text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl"
                style={{ animationDelay: "150ms" }}
              >
                Spice Up
              </h1>
              <h1
                className="animate-hero-reveal font-heading text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl"
                style={{ animationDelay: "300ms" }}
              >
                <span className="text-gradient">Your Brand</span>
              </h1>
              <h1
                className="animate-hero-reveal font-heading text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl"
                style={{ animationDelay: "450ms" }}
              >
                Growth<span className="text-accent">.</span>
              </h1>
            </div>

            {/* Subtitle + CTAs */}
            <div
              className="animate-hero-reveal mt-8 flex max-w-2xl flex-col gap-8 lg:flex-row lg:items-end lg:gap-16"
              style={{ animationDelay: "600ms" }}
            >
              <p className="max-w-md text-base leading-relaxed text-slate-400 sm:text-lg">
                We help businesses grow online with stunning websites, strategic
                social media, and performance marketing that delivers{" "}
                <span className="text-white">real results.</span>
              </p>
              <div className="flex items-center gap-4">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-secondary hover:shadow-lg hover:shadow-primary/25"
                >
                  Get Started
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/portfolio"
                  className="group inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:border-white/30 hover:bg-white/5"
                >
                  Our Work
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
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

        {/* Stats strip at bottom */}
        <div className="mt-20 flex flex-wrap gap-12 border-t border-white/10 pt-10 lg:mt-16">
          {[
            { value: "50+", label: "Projects Delivered", accent: false },
            { value: "30+", label: "Happy Clients", accent: false },
            { value: "3x", label: "Avg. Growth Rate", accent: true },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className="animate-counter-reveal"
              style={{ animationDelay: `${800 + i * 100}ms` }}
            >
              <div
                className={`font-heading text-4xl font-bold sm:text-5xl ${
                  stat.accent ? "text-accent" : "text-white"
                }`}
              >
                {stat.value}
              </div>
              <div className="mt-1.5 text-sm text-slate-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-white to-transparent" />
    </section>
  );
}
