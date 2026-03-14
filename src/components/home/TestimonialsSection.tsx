"use client";

import { Star } from "lucide-react";
import AnimatedContainer from "@/components/ui/AnimatedContainer";
import SectionHeading from "@/components/ui/SectionHeading";
import { testimonials } from "@/data/testimonials";

export default function TestimonialsSection() {
  return (
    <section className="relative overflow-hidden bg-surface py-24 sm:py-32">
      {/* Subtle diagonal lines */}
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, transparent, transparent 80px, rgba(37,99,235,0.02) 80px, rgba(37,99,235,0.02) 81px)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          label="Testimonials"
          title="What Our Clients Say"
          description="Don't just take our word for it — hear from the businesses we've helped grow."
        />

        <div className="mt-4 grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, idx) => (
            <AnimatedContainer key={testimonial.name} delay={idx * 120}>
              <div
                className={`relative h-full overflow-hidden rounded-2xl border border-border/50 bg-white p-8 transition-all duration-250 hover:-translate-y-1 hover:shadow-xl ${
                  idx === 1 ? "md:-translate-y-4" : ""
                }`}
              >
                {/* Large decorative quote mark */}
                <div className="pointer-events-none absolute -right-4 -top-4 font-heading text-[10rem] font-bold leading-none text-primary/[0.04]">
                  &ldquo;
                </div>

                <div className="relative">
                  {/* Stars */}
                  <div className="flex gap-1">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-accent text-accent"
                      />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="mt-5 text-base leading-relaxed text-text-secondary">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>

                  {/* Author */}
                  <div className="mt-8 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary">
                      <span className="text-sm font-bold text-white">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-heading text-sm font-semibold text-text-primary">
                        {testimonial.name}
                      </p>
                      <p className="text-xs text-text-secondary">
                        {testimonial.role}, {testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedContainer>
          ))}
        </div>
      </div>
    </section>
  );
}
