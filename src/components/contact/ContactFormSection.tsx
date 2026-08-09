import AnimatedContainer from "@/components/ui/AnimatedContainer";
import ContactForm from "@/components/forms/ContactForm";
import ContactNextSteps from "@/components/contact/ContactNextSteps";

/**
 * The form, with the two things a visitor needs in order to send it: an idea of
 * what comes back, and evidence that somebody is there.
 *
 * The section is a server component. Only `ContactForm` carries `"use client"`,
 * so the heading, the four steps and the opening hours cost no JavaScript.
 *
 * The old version put a column of assurance copy on the left and the form on the
 * right. The canvas swaps them: the form leads on desktop because it is what the
 * page is for, and on mobile it comes first for the same reason — "what happens
 * next" is reassurance you want *while* filling the thing in, not before you
 * have decided to.
 */
export default function ContactFormSection() {
  return (
    <section className="bg-surface py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <AnimatedContainer>
          <div className="flex items-center gap-3">
            <div className="h-px w-8 bg-primary/30" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Or just write it down
            </span>
          </div>

          <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:gap-16">
            <h2 className="font-heading text-[1.75rem] font-bold leading-[1.15] tracking-[-0.025em] text-text-primary text-balance sm:text-4xl lg:max-w-2xl lg:text-[2.875rem]">
              <span className="block">Send us the brief.</span>{" "}
              <span className="block text-text-secondary/75">
                We send back a number.
              </span>
            </h2>
            <p className="max-w-xl text-base leading-relaxed text-text-secondary lg:flex-1 lg:text-[17px]">
              You do not need a spec. One paragraph about what you sell and what
              is not working is enough for us to quote from.
            </p>
          </div>
        </AnimatedContainer>

        <div className="mt-12 grid gap-5 lg:grid-cols-5">
          <AnimatedContainer className="lg:col-span-3">
            <div className="rounded-3xl border border-border bg-white p-6 shadow-lg shadow-text-primary/5 sm:p-9">
              <ContactForm />
            </div>
          </AnimatedContainer>

          <AnimatedContainer delay={120} className="lg:col-span-2">
            <ContactNextSteps />
          </AnimatedContainer>
        </div>
      </div>
    </section>
  );
}
