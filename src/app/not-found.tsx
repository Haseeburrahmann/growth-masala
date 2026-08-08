import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    /* min-h-svh, not min-h-screen: on mobile Safari `100vh` includes the space
       under the URL bar, so the section overflowed the visible viewport. Every
       other full-height section on the site already uses svh. */
    <section className="relative flex min-h-svh items-center justify-center overflow-hidden bg-navy">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 right-[20%] h-96 w-96 rounded-full bg-primary/15 blur-[100px]" />
        <div className="absolute -bottom-32 left-[10%] h-72 w-72 rounded-full bg-accent/10 blur-[80px]" />
      </div>

      <div className="relative mx-auto max-w-2xl px-6 text-center">
        {/* Big 404.
            Was `.text-gradient` on the two 4s — the deprecated blue-to-amber
            ramp, which lands a muddy grey midpoint mid-glyph and measured
            3.64:1 on navy. Every other route dropped it; this was the last
            holdout. Solid white with the middle digit in amber gives the same
            two-tone idea at 18.8:1 and 8.8:1. */}
        <h1 className="font-heading text-[8rem] font-bold leading-none tracking-tight text-white sm:text-[12rem]">
          4<span className="text-accent">0</span>4
        </h1>

        <h2 className="mt-4 font-heading text-2xl font-bold text-white sm:text-3xl">
          Page Not Found
        </h2>
        <p className="mt-4 text-base leading-relaxed text-slate-400">
          Looks like this page took a wrong turn. Let&apos;s get you back on
          track.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/25"
          >
            <Home className="h-4 w-4" />
            Back to Home
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:border-white/30 hover:bg-white/5"
          >
            <ArrowLeft className="h-4 w-4" />
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
