"use client";

import { Mail, MapPin, Phone, MessageCircle } from "lucide-react";
import AnimatedContainer from "@/components/ui/AnimatedContainer";
import ContactForm from "@/components/forms/ContactForm";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@growthmasala.com",
    href: "mailto:hello@growthmasala.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "Available on request",
    href: undefined,
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "Chat with us",
    href: "https://wa.me/918688269427",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "India",
    href: undefined,
  },
];

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy pt-32 pb-20 sm:pt-40 sm:pb-28">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 right-[15%] h-100 w-100 rounded-full bg-primary/15 blur-[120px]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <AnimatedContainer>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-primary/40" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Contact
              </span>
            </div>
            <h1 className="max-w-3xl font-heading text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
              Let&apos;s <span className="text-gradient">Talk Growth</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-400">
              Ready to grow your business online? Drop us a message and we&apos;ll get
              back to you within 24 hours with a free consultation.
            </p>
          </AnimatedContainer>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-white to-transparent" />
      </section>

      {/* Contact section */}
      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-5">
            {/* Info column */}
            <div className="lg:col-span-2">
              <AnimatedContainer>
                <h2 className="font-heading text-2xl font-bold text-text-primary">
                  Get in touch
                </h2>
                <p className="mt-3 text-base leading-relaxed text-text-secondary">
                  Have a project in mind? We&apos;d love to hear about it. Fill out the
                  form or reach out directly.
                </p>

                <div className="mt-10 space-y-6">
                  {contactInfo.map((info) => (
                    <div key={info.label} className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                        <info.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
                          {info.label}
                        </p>
                        {info.href ? (
                          <a
                            href={info.href}
                            className="text-sm font-medium text-text-primary transition-colors hover:text-primary"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-sm font-medium text-text-primary">
                            {info.value}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </AnimatedContainer>
            </div>

            {/* Form column */}
            <div className="lg:col-span-3">
              <AnimatedContainer>
                <div className="rounded-2xl border border-border bg-surface p-8 sm:p-10">
                  <ContactForm />
                </div>
              </AnimatedContainer>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
