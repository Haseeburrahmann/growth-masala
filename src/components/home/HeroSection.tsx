"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Flame } from "lucide-react";
import Link from "next/link";
import { heroReveal, counterReveal } from "@/lib/animations";

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
        {/* Gradient orbs */}
        <div className="animate-float-slow absolute -top-32 right-[10%] h-[600px] w-[600px] rounded-full bg-primary/20 blur-[150px]" />
        <div className="animate-float absolute -bottom-32 left-[5%] h-[400px] w-[400px] rounded-full bg-accent/15 blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary/10 blur-[100px]" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 pt-24 pb-20 lg:px-8">
        {/* Top badge */}
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={heroReveal}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 backdrop-blur-sm">
            <Flame className="h-4 w-4 text-accent" />
            Digital Marketing Agency
            <span className="h-1 w-1 rounded-full bg-accent" />
            <span className="text-accent">India</span>
          </span>
        </motion.div>

        {/* Headline — oversized, stacked */}
        <div className="max-w-5xl">
          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            variants={heroReveal}
            className="font-heading text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl"
          >
            Spice Up
          </motion.h1>
          <motion.h1
            custom={2}
            initial="hidden"
            animate="visible"
            variants={heroReveal}
            className="font-heading text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
          >
            <span className="text-gradient">Your Brand</span>
          </motion.h1>
          <motion.h1
            custom={3}
            initial="hidden"
            animate="visible"
            variants={heroReveal}
            className="font-heading text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl"
          >
            Growth<span className="text-accent">.</span>
          </motion.h1>
        </div>

        {/* Subtitle + CTAs */}
        <motion.div
          custom={4}
          initial="hidden"
          animate="visible"
          variants={heroReveal}
          className="mt-8 flex max-w-2xl flex-col gap-8 lg:flex-row lg:items-end lg:gap-16"
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
        </motion.div>

        {/* Stats strip at bottom */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1, delayChildren: 0.8 } },
          }}
          className="mt-20 flex flex-wrap gap-12 border-t border-white/10 pt-10 lg:mt-28"
        >
          {[
            { value: "50+", label: "Projects Delivered", accent: false },
            { value: "30+", label: "Happy Clients", accent: false },
            { value: "3x", label: "Avg. Growth Rate", accent: true },
          ].map((stat, i) => (
            <motion.div key={stat.label} custom={i} variants={counterReveal}>
              <div
                className={`font-heading text-4xl font-bold sm:text-5xl ${
                  stat.accent ? "text-accent" : "text-white"
                }`}
              >
                {stat.value}
              </div>
              <div className="mt-1.5 text-sm text-slate-500">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
