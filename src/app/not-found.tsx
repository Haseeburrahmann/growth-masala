import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-navy">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 right-[20%] h-96 w-96 rounded-full bg-primary/15 blur-[100px]" />
        <div className="absolute -bottom-32 left-[10%] h-72 w-72 rounded-full bg-accent/10 blur-[80px]" />
      </div>

      <div className="relative mx-auto max-w-2xl px-6 text-center">
        {/* Big 404 */}
        <h1 className="font-heading text-[8rem] font-bold leading-none tracking-tight sm:text-[12rem]">
          <span className="text-gradient">4</span>
          <span className="text-white">0</span>
          <span className="text-gradient">4</span>
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
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-secondary hover:shadow-lg hover:shadow-primary/25"
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
