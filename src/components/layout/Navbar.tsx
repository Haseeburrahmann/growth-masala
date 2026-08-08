"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { navLinks } from "@/data/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close the menu when the route changes.
  //
  // Adjusted during render rather than in an effect. Each menu link already
  // calls setIsOpen(false) on click, so this only catches navigations that do
  // not go through them — browser back/forward, mostly. Doing it in an effect
  // meant a frame where the new page had rendered with the old menu still open,
  // and it trips `react-hooks/set-state-in-effect`, which was the only lint
  // error in the project. This is React's documented pattern for resetting
  // state when a value changes.
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setIsOpen(false);
  }

  // The mobile menu is a fixed full-screen panel, but the document underneath
  // stayed scrollable — a swipe on the menu moved the page behind it, so closing
  // the menu dropped you somewhere you never chose to go.
  //
  // The lock goes on <html>, not <body>. Setting `body { overflow: hidden }` was
  // tried and measured: the style applied and the page still scrolled 500px.
  // globals.css already sets `overflow-x: hidden` on body, and once an element's
  // overflow has propagated to the viewport the later inline value on that same
  // element does not reliably take it back. The root element's overflow always
  // governs the viewport, so that is where the lock belongs.
  useEffect(() => {
    if (!isOpen) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = previous;
    };
  }, [isOpen]);

  const toggleMenu = useCallback(() => setIsOpen((prev) => !prev), []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/90 shadow-[0_1px_0_rgba(0,0,0,0.06)] md:backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2 transition-transform hover:scale-[1.02]">
          <Image
            src="/images/logo.png"
            alt="Growth Masala"
            width={40}
            height={40}
            className="h-10 w-10 object-contain"
            priority
          />
          <div className="flex flex-col leading-none">
            <span
              className={`font-heading text-[15px] font-bold tracking-tight transition-colors ${
                scrolled ? "text-text-primary" : "text-white"
              }`}
            >
              Growth
            </span>
            <span className="font-heading text-[15px] font-bold tracking-tight text-primary">
              Masala
            </span>
          </div>
        </Link>

        {/* Desktop nav — pill bar */}
        <div
          className={`hidden items-center gap-1 rounded-full px-2 py-1.5 backdrop-blur-sm transition-all lg:flex ${
            scrolled
              ? "border border-border/60 bg-white/60"
              : "border border-white/15 bg-white/10"
          }`}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative rounded-full px-4 py-1.5 text-[13px] font-medium transition-all ${
                pathname === link.href
                  ? "bg-primary text-white"
                  : scrolled
                    ? "text-text-secondary hover:bg-surface hover:text-text-primary"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden lg:block">
          <Link
            href="/contact"
            className={`group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[13px] font-semibold transition-all ${
              scrolled
                ? "bg-navy text-white hover:bg-navy-light hover:shadow-lg hover:shadow-navy/20"
                : "bg-white text-navy hover:bg-white/90 hover:shadow-lg hover:shadow-white/10"
            }`}
          >
            Start a Project
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Mobile hamburger — touch-action removes iOS 300ms tap delay */}
        <button
          className="relative z-50 lg:hidden"
          onClick={toggleMenu}
          aria-label="Toggle menu"
          style={{ touchAction: "manipulation" }}
        >
          <div
            className={`flex h-11 w-11 items-center justify-center rounded-full border transition-colors ${
              isOpen
                ? "border-border bg-white text-text-primary"
                : scrolled
                  ? "border-border bg-white text-text-primary"
                  : "border-white/20 bg-white/10 text-white"
            }`}
          >
            {isOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </div>
        </button>
      </nav>

      {/* Mobile menu — CSS transition (no Framer Motion for faster response) */}
      <div
        className={`chat-surface fixed inset-0 z-40 bg-white transition-all duration-300 lg:hidden ${
          isOpen ? "visible opacity-100" : "invisible opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex h-full flex-col justify-center px-8">
          <div className="space-y-1">
            {navLinks.map((link, idx) => (
              <div
                key={link.href}
                className="transition-all duration-300"
                style={{
                  transitionDelay: isOpen ? `${idx * 50}ms` : "0ms",
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? "translateX(0)" : "translateX(-20px)",
                }}
              >
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center justify-between border-b border-border/40 py-4 font-heading text-2xl font-semibold transition-colors ${
                    pathname === link.href
                      ? "text-primary"
                      : "text-text-primary hover:text-primary"
                  }`}
                >
                  {link.label}
                  <ArrowUpRight className="h-5 w-5 text-text-secondary" />
                </Link>
              </div>
            ))}
          </div>

          <div
            className="mt-10 transition-all duration-300"
            style={{
              transitionDelay: isOpen ? "300ms" : "0ms",
              opacity: isOpen ? 1 : 0,
              transform: isOpen ? "translateY(0)" : "translateY(20px)",
            }}
          >
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-navy py-4 text-base font-semibold text-white"
            >
              Start a Project
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
