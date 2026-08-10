"use client";

import { useState, type FormEvent } from "react";
import { MessageCircle } from "lucide-react";
import { useTranslations } from "next-intl";

import { whatsappHref } from "@/lib/contact";

/**
 * The enquiry form, rewritten to actually do something.
 *
 * What it used to do: validate, spin a `setTimeout` for 1.1 seconds, then print
 * "Message received, {firstName} — someone will call you on {phone} within the
 * hour". No request was made. Nothing was stored. Nobody was going to call. That
 * is a fabricated success state, which is the same failure as a fabricated
 * testimonial except that a customer acts on it and then waits.
 *
 * What it does now: composes the message and hands it to WhatsApp, which is the
 * channel PRODUCT.md names as the real one and the only one that works today
 * with no backend. The send happens in the customer's own client, so the
 * confirmation they get is their own sent message rather than our claim about
 * one. The copy says so plainly instead of implying a CRM behind the button.
 *
 * The audience toggle is the contact-page half of the home page fork, and it is
 * colour-coded to match: cobalt for the table, verdigris for a kitchen. It
 * changes the composed message and reveals the business-name field, so the two
 * conversations start apart rather than in one blended funnel.
 */

const TOPICS = ["order", "supply", "standing", "delivery", "other"] as const;
type Topic = (typeof TOPICS)[number];
type Audience = "table" | "kitchen";
type Errors = Partial<Record<"name" | "phone" | "message", string>>;

const EMAIL = "hello@manartrading.sa";

export default function ContactForm() {
  const t = useTranslations("Contact.form");

  const [audience, setAudience] = useState<Audience>("table");
  const [topic, setTopic] = useState<Topic>("order");
  const [errors, setErrors] = useState<Errors>({});
  const [form, setForm] = useState({
    name: "",
    phone: "",
    business: "",
    message: "",
  });

  const set = (k: keyof typeof form) => (v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const validate = () => {
    const e: Errors = {};
    if (form.name.trim().length < 2) e.name = t("errName");
    if (!/^[+\d][\d\s-]{7,}$/.test(form.phone.trim())) e.phone = t("errPhone");
    if (form.message.trim().length < 10) e.message = t("errMessage");
    return e;
  };

  const onSubmit = (ev: FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;

    const who =
      audience === "kitchen"
        ? `${t("audienceKitchen")}${form.business.trim() ? ` — ${form.business.trim()}` : ""}`
        : t("audienceTable");

    // Opened rather than navigated, so the customer keeps the page they were on.
    // This runs inside the click handler, which is what keeps it out of the
    // popup blocker.
    window.open(
      whatsappHref(
        t("waMessage", {
          name: form.name.trim(),
          phone: form.phone.trim(),
          audience: who,
          topic: t(`topics.${topic}`),
          message: form.message.trim(),
        }),
      ),
      "_blank",
      "noopener,noreferrer",
    );
  };

  const isKitchen = audience === "kitchen";
  const accent = isKitchen ? "bg-verdigris-deep" : "bg-hull";

  return (
    <form onSubmit={onSubmit} noValidate className="border-2 border-tar bg-chalk">
      <div className="p-8 sm:p-10">
        <span className="label text-rope">{t("eyebrow")}</span>
        <h2 className="display-md mt-4 text-tar">{t("title")}</h2>
        <p className="mt-4 max-w-md text-[14.5px] leading-[1.8] text-tar/65 rtl:leading-[2]">
          {t("copy")}
        </p>

        {/* ---- audience ---- */}
        <fieldset className="mt-9">
          <legend className="label text-rope">{t("audienceLabel")}</legend>
          <div className="mt-4 grid grid-cols-2 gap-px bg-tar/20">
            {(["table", "kitchen"] as const).map((a) => {
              const on = audience === a;
              const field = a === "kitchen" ? "bg-verdigris-deep" : "bg-hull";
              return (
                <button
                  key={a}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setAudience(a)}
                  className={`px-5 py-4 text-[14px] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-oxide ${
                    on
                      ? `${field} text-limewash`
                      : "bg-chalk text-tar/60 hover:text-tar"
                  }`}
                >
                  {a === "kitchen" ? t("audienceKitchen") : t("audienceTable")}
                </button>
              );
            })}
          </div>
        </fieldset>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <Field
            id="contact-name"
            label={t("nameLabel")}
            required
            value={form.name}
            onChange={set("name")}
            error={errors.name}
            placeholder={t("namePlaceholder")}
          />
          <Field
            id="contact-phone"
            label={t("phoneLabel")}
            required
            type="tel"
            value={form.phone}
            onChange={set("phone")}
            error={errors.phone}
            placeholder={t("phonePlaceholder")}
          />
        </div>

        {isKitchen && (
          <div className="mt-6">
            <Field
              id="contact-business"
              label={t("businessLabel")}
              value={form.business}
              onChange={set("business")}
              placeholder={t("businessPlaceholder")}
              hint={t("optional")}
            />
          </div>
        )}

        {/* ---- topic ---- */}
        <fieldset className="mt-8">
          <legend className="label text-rope">{t("topicLabel")}</legend>
          <div className="mt-4 flex flex-wrap gap-2">
            {TOPICS.map((s) => {
              const on = topic === s;
              return (
                <button
                  key={s}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setTopic(s)}
                  className={`border-2 px-4 py-2.5 text-[13px] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-oxide ${
                    on
                      ? "border-tar bg-tar text-limewash"
                      : "border-tar/20 text-tar/65 hover:border-tar hover:text-tar"
                  }`}
                >
                  {t(`topics.${s}`)}
                </button>
              );
            })}
          </div>
        </fieldset>

        <div className="mt-8">
          <label htmlFor="contact-message" className="label block text-rope">
            {t("messageLabel")} <span className="text-oxide">*</span>
          </label>
          <textarea
            id="contact-message"
            rows={5}
            value={form.message}
            onChange={(e) => set("message")(e.target.value)}
            placeholder={t("messagePlaceholder")}
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={errors.message ? "contact-message-err" : undefined}
            className={`mt-3 w-full resize-none border-b-2 bg-transparent py-3 text-[15px] text-tar outline-none transition placeholder:text-tar/30 focus:border-tar ${
              errors.message ? "border-oxide" : "border-tar/20"
            }`}
          />
          {errors.message && (
            <p
              id="contact-message-err"
              className="mt-2 text-[12.5px] font-semibold text-oxide"
            >
              {errors.message}
            </p>
          )}
        </div>
      </div>

      {/* The action sits on its own painted plate, in the colour of the path the
          customer picked, so the choice is still visible at the moment of send. */}
      <div className={`${accent} transition-colors duration-500`}>
        <button
          type="submit"
          className="group flex w-full items-center justify-center gap-3 px-8 py-5 text-[15px] font-semibold text-limewash transition-colors hover:bg-tar/20 focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-ochre"
        >
          <MessageCircle aria-hidden="true" className="h-4.5 w-4.5 shrink-0" />
          {t("submit")}
        </button>
      </div>

      <p className="border-t border-tar/15 px-8 py-5 text-[12.5px] leading-relaxed text-rope sm:px-10">
        {t("emailFallback", { email: EMAIL })}
      </p>
    </form>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  placeholder,
  type = "text",
  required,
  hint,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  hint?: string;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="label flex items-center justify-between gap-3 text-rope"
      >
        <span>
          {label} {required && <span className="text-oxide">*</span>}
        </span>
        {hint && (
          <span className="font-normal normal-case tracking-normal text-rope/70">
            {hint}
          </span>
        )}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-err` : undefined}
        className={`mt-3 w-full border-b-2 bg-transparent py-3 text-[15px] text-tar outline-none transition placeholder:text-tar/30 focus:border-tar ${
          error ? "border-oxide" : "border-tar/20"
        }`}
      />
      {error && (
        <p id={`${id}-err`} className="mt-2 text-[12.5px] font-semibold text-oxide">
          {error}
        </p>
      )}
    </div>
  );
}
