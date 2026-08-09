"use client";

import { useRef, useState } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { services } from "@/data/services";

/**
 * The only client component on /contact.
 *
 * Validation is done here rather than left to the browser's `required`
 * attribute because native constraint validation shows one bubble at a time,
 * attached to the first invalid control, and it disappears the moment focus
 * moves. On a six-field form that means filling it in, pressing send, and being
 * told about one problem — repeatedly. `noValidate` turns it off; every error is
 * rendered under its own field and stays there.
 *
 * The server (`/api/contact`) validates independently and is the real gate.
 * Nothing here is a security control; it exists so the visitor is told what is
 * wrong before a round trip, not instead of one.
 */

/**
 * Derived from the single source of truth so the dropdown never drifts from the
 * rest of the site. Keyed by slug — the slug is stable, the title is copy — but
 * the *submitted value* stays the title, because it lands in an email a human
 * reads, and "website-development" is worse to read than "Website Development".
 * Two catch-all options are appended.
 */
const serviceOptions: { key: string; label: string }[] = [
  ...services.map((service) => ({ key: service.slug, label: service.title })),
  { key: "full-package", label: "Full Digital Marketing Package" },
  { key: "not-sure", label: "Not sure — need consultation" },
];

const FIELD_ORDER = [
  "name",
  "phone",
  "email",
  "business",
  "service",
  "message",
] as const;

type FieldName = (typeof FIELD_ORDER)[number];
type FormValues = Record<FieldName, string>;
type FormErrors = Partial<Record<FieldName, string>>;

const EMPTY_FORM: FormValues = {
  name: "",
  phone: "",
  email: "",
  business: "",
  service: "",
  message: "",
};

/** Deliberately permissive — it rejects obvious typos, not unusual addresses. */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Indian mobile numbers are 10 digits; the field also has to accept a country
 * code, spaces and dashes, so validation counts digits rather than matching a
 * shape. 10–15 digits is the E.164 range with the local minimum.
 */
function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};

  if (!values.name.trim()) {
    errors.name = "Please tell us your name.";
  }

  const digits = values.phone.replace(/\D/g, "");
  if (!values.phone.trim()) {
    errors.phone = "We need a number to call or WhatsApp you on.";
  } else if (digits.length < 10 || digits.length > 15) {
    errors.phone = "That does not look like a full phone number.";
  }

  if (!values.email.trim()) {
    errors.email = "Please add an email address.";
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = "Check the email address — it looks incomplete.";
  }

  if (!values.message.trim()) {
    errors.message = "Tell us a line or two about what you need.";
  }

  return errors;
}

const fieldClass =
  "min-h-11 w-full rounded-xl border bg-white px-4 py-3 text-sm text-text-primary outline-none transition-all placeholder:text-text-secondary/60 focus:ring-2";
const restingBorder = "border-border focus:border-primary focus:ring-primary/20";
const errorBorder = "border-red-400 focus:border-red-500 focus:ring-red-500/20";

export default function ContactForm() {
  const [values, setValues] = useState<FormValues>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const nextErrors = validate(values);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setStatus("idle");
      const firstInvalid = FIELD_ORDER.find((field) => nextErrors[field]);
      if (firstInvalid) fieldRefs.current[firstInvalid]?.focus();
      return;
    }

    setErrors({});
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (res.ok) {
        setStatus("success");
        setValues(EMPTY_FORM);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex flex-col items-center justify-center rounded-2xl border border-emerald-200 bg-emerald-50 p-12 text-center"
      >
        <CheckCircle2 aria-hidden="true" className="h-12 w-12 text-emerald-500" />
        <h3 className="mt-4 font-heading text-xl font-bold text-text-primary">
          Message sent
        </h3>
        <p className="mt-2 text-sm text-text-secondary">
          Thanks — we read every one of these ourselves. You will hear back the
          same working day.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 min-h-11 text-sm font-medium text-primary hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

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
              value={values.name}
              onChange={handleChange}
            />
          )}
        </Field>

        <Field name="phone" label="Phone" required error={errors.phone} hint={null}>
          {(props) => (
            <input
              {...props}
              ref={(el) => {
                fieldRefs.current.phone = el;
              }}
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="+91 98765 43210"
              value={values.phone}
              onChange={handleChange}
            />
          )}
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field name="email" label="Email" required error={errors.email} hint={null}>
          {(props) => (
            <input
              {...props}
              ref={(el) => {
                fieldRefs.current.email = el;
              }}
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="you@business.com"
              value={values.email}
              onChange={handleChange}
            />
          )}
        </Field>

        <Field name="business" label="Business name" error={undefined} hint={null}>
          {(props) => (
            <input
              {...props}
              ref={(el) => {
                fieldRefs.current.business = el;
              }}
              type="text"
              autoComplete="organization"
              placeholder="Kumar Electronics"
              value={values.business}
              onChange={handleChange}
            />
          )}
        </Field>
      </div>

      <Field
        name="service"
        label="What do you need?"
        error={undefined}
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
            value={values.message}
            onChange={handleChange}
            className={`${fieldClass} resize-none ${
              errors.message ? errorBorder : restingBorder
            }`}
          />
        )}
      </Field>

      {/* aria-live so a screen reader hears the failure. Without it the submit
          button simply stops spinning and nothing is announced — the commonest
          reason a form gets abandoned twice. */}
      <p role="status" aria-live="polite" className="sr-only">
        {status === "loading" ? "Sending your message" : ""}
      </p>
      {status === "error" && (
        <p role="alert" className="text-sm text-red-600">
          Something went wrong. Please try again, or WhatsApp us instead — the
          number is at the top of this page.
        </p>
      )}

      <div className="flex flex-col gap-4 pt-1 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={status === "loading"}
          className="group inline-flex min-h-11 w-full items-center justify-center gap-3 rounded-full bg-primary px-7 py-3.5 text-[15px] font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary-dark disabled:opacity-60 sm:w-auto"
        >
          {status === "loading" ? (
            <>
              <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" />
              Sending…
            </>
          ) : (
            <>
              Get a fixed quote
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
                <ArrowRight aria-hidden="true" className="cta-arrow h-3.5 w-3.5" />
              </span>
            </>
          )}
        </button>

        <p className="text-[13px] leading-5 text-text-secondary">
          We use this to reply to you. Nothing else, ever — no list, no
          reselling.
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
