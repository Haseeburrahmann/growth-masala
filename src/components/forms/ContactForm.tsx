"use client";

import { useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { services } from "@/data/services";
import { trackWhatsAppClick } from "@/lib/analytics";
import {
  ENQUIRY_LIMITS,
  enquiryWhatsappLink,
  validateEnquiry,
  type EnquiryValues,
  type EnquiryErrors,
} from "@/lib/whatsapp";

/** Service titles make the prefilled WhatsApp brief easy for the team to read. */
const serviceOptions: { key: string; label: string }[] = [
  ...services.map((service) => ({ key: service.slug, label: service.title })),
  { key: "full-package", label: "Full Digital Marketing Package" },
  { key: "not-sure", label: "Not sure — need consultation" },
];

const FIELD_ORDER = ["name", "business", "service", "message"] as const;
type FieldName = (typeof FIELD_ORDER)[number];
const EMPTY_FORM: EnquiryValues = { name: "", business: "", service: "", message: "" };

const fieldClass =
  "min-h-11 w-full rounded-xl border bg-white px-4 py-3 text-sm text-text-primary outline-none transition-all placeholder:text-text-secondary/60 focus:ring-2";
const restingBorder = "border-border focus:border-primary focus:ring-primary/20";
const errorBorder = "border-red-400 focus:border-red-500 focus:ring-red-500/20";

export default function ContactForm() {
  const [values, setValues] = useState<EnquiryValues>(EMPTY_FORM);
  const [errors, setErrors] = useState<EnquiryErrors>({});
  /**
   * Populated by each control's `ref` so a failed submit can move focus to the
   * first thing that is wrong. Without this the errors appear below the fold on
   * a phone and the form looks like it silently did nothing.
   */
  const fieldRefs = useRef<Partial<Record<FieldName, HTMLElement | null>>>({});

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const name = e.target.name as FieldName;
    const value = e.target.value;
    setValues((prev) => ({ ...prev, [name]: value }));
    // Clear an error as soon as the visitor starts fixing it — leaving it up
    // while they type reads as "still wrong" when it is not.
    setErrors((prev) => (prev[name] ? { ...prev, [name]: undefined } : prev));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const nextErrors = validateEnquiry(values);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      const firstInvalid = FIELD_ORDER.find((field) => nextErrors[field]);
      if (firstInvalid) fieldRefs.current[firstInvalid]?.focus();
      return;
    }

    setErrors({});
    const serviceCategory = serviceOptions.find(
      (service) => service.label === values.service,
    )?.key;
    trackWhatsAppClick("contact_form", serviceCategory);
    window.location.assign(enquiryWhatsappLink(values));
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          name="name"
          label="Your name"
          required
          error={errors.name}
          hint={null}
        >
          {(props) => (
            <input
              {...props}
              ref={(el) => {
                fieldRefs.current.name = el;
              }}
              type="text"
              autoComplete="name"
              placeholder="Ramesh Kumar"
              maxLength={ENQUIRY_LIMITS.name}
              value={values.name}
              onChange={handleChange}
            />
          )}
        </Field>

        <Field name="business" label="Business name" error={errors.business} hint={null}>
          {(props) => (
            <input
              {...props}
              ref={(el) => {
                fieldRefs.current.business = el;
              }}
              type="text"
              autoComplete="organization"
              placeholder="Kumar Electronics"
              maxLength={ENQUIRY_LIMITS.business}
              value={values.business}
              onChange={handleChange}
            />
          )}
        </Field>
      </div>

      <Field
        name="service"
        label="What do you need?"
        error={errors.service}
        hint="Not sure? Pick the closest one — we will work it out together."
      >
        {(props) => (
          <select
            {...props}
            ref={(el) => {
              fieldRefs.current.service = el;
            }}
            value={values.service}
            onChange={handleChange}
          >
            <option value="">Select the closest one…</option>
            {serviceOptions.map(({ key, label }) => (
              <option key={key} value={label}>
                {label}
              </option>
            ))}
          </select>
        )}
      </Field>

      <Field
        name="message"
        label="Tell us about it"
        required
        error={errors.message}
        hint={null}
      >
        {(props) => (
          <textarea
            {...props}
            ref={(el) => {
              fieldRefs.current.message = el;
            }}
            rows={5}
            placeholder="We sell furniture in Mahabubnagar. We have an Instagram page but no website, and people keep asking for prices in DMs."
            maxLength={ENQUIRY_LIMITS.message}
            value={values.message}
            onChange={handleChange}
            className={`${fieldClass} resize-none ${
              errors.message ? errorBorder : restingBorder
            }`}
          />
        )}
      </Field>

      <div className="flex flex-col gap-4 pt-1 sm:flex-row sm:items-center">
        <button
          type="submit"
          className="group inline-flex min-h-11 w-full items-center justify-center gap-3 whitespace-nowrap rounded-full bg-primary px-7 py-3.5 text-[15px] font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary-dark disabled:opacity-60 sm:w-auto"
        >
          Continue in WhatsApp
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
            <ArrowRight aria-hidden="true" className="cta-arrow h-3.5 w-3.5" />
          </span>
        </button>

        <p className="text-[13px] leading-5 text-text-secondary">
          WhatsApp opens with your draft. Review it and press Send there to
          reach us. This form is not stored or emailed by our website.
        </p>
      </div>
    </form>
  );
}

/**
 * Label, control, hint and error as one unit.
 *
 * The control is passed as a render prop rather than as children so the wiring
 * that has to agree — `id`/`htmlFor`, `aria-describedby`, `aria-invalid` and the
 * error styling — is computed in one place and cannot be half-applied to a field
 * somebody adds later.
 */
function Field({
  name,
  label,
  required = false,
  error,
  hint,
  children,
}: {
  name: FieldName;
  label: string;
  required?: boolean;
  error: string | undefined;
  hint: string | null;
  children: (props: {
    id: string;
    name: string;
    className: string;
    "aria-invalid": boolean | undefined;
    "aria-describedby": string | undefined;
    "aria-required": boolean | undefined;
  }) => React.ReactNode;
}) {
  const errorId = `${name}-error`;
  const hintId = `${name}-hint`;
  const describedBy =
    [error ? errorId : null, hint ? hintId : null].filter(Boolean).join(" ") ||
    undefined;

  return (
    <div>
      <label
        htmlFor={name}
        className="mb-1.5 block text-sm font-medium text-text-primary"
      >
        {label}
        {required && (
          <>
            {" "}
            <span aria-hidden="true" className="text-red-500">
              *
            </span>
            <span className="sr-only">(required)</span>
          </>
        )}
      </label>

      {children({
        id: name,
        name,
        className: `${fieldClass} ${error ? errorBorder : restingBorder}`,
        "aria-invalid": error ? true : undefined,
        "aria-describedby": describedBy,
        "aria-required": required || undefined,
      })}

      {hint && (
        <p id={hintId} className="mt-1.5 text-xs text-text-secondary">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} role="alert" className="mt-1.5 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
