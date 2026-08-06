"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CheckCircle2, Loader2, Send } from "lucide-react";

const subjects = [
  "Place an order",
  "Restaurant / hotel supply",
  "Bulk & wholesale pricing",
  "Delivery question",
  "Something else",
];

type Errors = Partial<Record<"name" | "phone" | "email" | "message", string>>;

export default function ContactForm() {
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    subject: subjects[0],
    message: "",
  });

  const set = (k: keyof typeof form) => (v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const validate = () => {
    const e: Errors = {};
    if (form.name.trim().length < 2) e.name = "Please tell us your name";
    if (!/^[+\d][\d\s-]{7,}$/.test(form.phone.trim()))
      e.phone = "A reachable phone number, please";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      e.email = "That email does not look right";
    if (form.message.trim().length < 10)
      e.message = "A little more detail helps us quote accurately";
    return e;
  };

  const onSubmit = (ev: FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;

    setState("sending");
    // Demo only — wire this to your backend, CRM or WhatsApp Business API.
    setTimeout(() => setState("sent"), 1100);
  };

  return (
    <div className="border border-ink/12 p-8 sm:p-10">
      <AnimatePresence mode="wait">
        {state === "sent" ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-16 text-center"
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 220, damping: 16 }}
              className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-50 text-emerald-600"
            >
              <CheckCircle2 className="h-7 w-7" />
            </motion.span>
            <h3 className="display-md mt-8 text-ink">
              Message received, {form.name.split(" ")[0]}
            </h3>
            <p className="mx-auto mt-4 max-w-sm text-[15px] leading-relaxed text-ink/60">
              Someone from the counter will call you on {form.phone} within the
              hour. If it is urgent, ring us directly on +966 50 000 0000.
            </p>
            <button
              onClick={() => {
                setForm({
                  name: "",
                  phone: "",
                  email: "",
                  subject: subjects[0],
                  message: "",
                });
                setState("idle");
              }}
              className="mt-9 border border-ink/15 px-6 py-3 text-[14px] font-medium text-ink transition-colors hover:border-ink"
            >
              Send another message
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onSubmit={onSubmit}
            noValidate
          >
            <h2 className="display-md text-ink">Send us a message</h2>
            <p className="mt-3 text-[14.5px] text-ink/55">
              Orders, quotes or questions — we answer everything within the hour
              during opening times.
            </p>

            <div className="mt-9 grid gap-6 sm:grid-cols-2">
              <Field
                label="Your name"
                required
                value={form.name}
                onChange={set("name")}
                error={errors.name}
                placeholder="Faisal Al-Harbi"
              />
              <Field
                label="Phone"
                required
                type="tel"
                value={form.phone}
                onChange={set("phone")}
                error={errors.phone}
                placeholder="+966 5X XXX XXXX"
              />
            </div>

            <div className="mt-6">
              <Field
                label="Email"
                type="email"
                value={form.email}
                onChange={set("email")}
                error={errors.email}
                placeholder="you@company.sa"
                hint="Optional"
              />
            </div>

            <div className="mt-8">
              <span className="label text-ink/40">What is it about?</span>
              <div className="mt-4 flex flex-wrap gap-2">
                {subjects.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => set("subject")(s)}
                    className={`rounded-full px-4 py-2.5 text-[13px] font-medium transition-all ${
                      form.subject === s
                        ? "bg-ink text-bone"
                        : "border border-ink/15 text-ink/60 hover:border-ink/45 hover:text-ink"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <label htmlFor="message" className="label block text-ink/40">
                Message <span className="text-ocean">*</span>
              </label>
              <textarea
                id="message"
                rows={5}
                value={form.message}
                onChange={(e) => set("message")(e.target.value)}
                placeholder="Six kilos of Hamour, cleaned and butterflied, delivered Thursday morning to Al Rawdah…"
                className={`mt-3 w-full resize-none border-b bg-transparent py-3 text-[15px] text-ink outline-none transition placeholder:text-ink/30 ${
                  errors.message
                    ? "border-red-400 focus:border-red-500"
                    : "border-ink/20 focus:border-ink"
                }`}
              />
              {errors.message && (
                <p className="mt-2 text-[12.5px] font-medium text-red-500">
                  {errors.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={state === "sending"}
              className="group mt-9 flex h-[54px] w-full items-center justify-center gap-3 rounded-full bg-ink text-[15px] font-semibold text-bone transition-colors hover:bg-ocean disabled:opacity-70"
            >
              {state === "sending" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Sending…
                </>
              ) : (
                <>
                  Send message
                  <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>

            <p className="mt-4 text-center text-[12.5px] text-ink/45">
              By sending this you agree we may contact you about your enquiry.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  error,
  placeholder,
  type = "text",
  required,
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  hint?: string;
}) {
  const id = label.toLowerCase().replace(/\s+/g, "-");
  return (
    <div>
      <label
        htmlFor={id}
        className="label flex items-center justify-between text-ink/40"
      >
        <span>
          {label} {required && <span className="text-ocean">*</span>}
        </span>
        {hint && (
          <span className="font-normal normal-case tracking-normal text-ink/35">
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
        className={`mt-3 w-full border-b bg-transparent py-3 text-[15px] text-ink outline-none transition placeholder:text-ink/30 ${
          error
            ? "border-red-400 focus:border-red-500"
            : "border-ink/20 focus:border-ink"
        }`}
      />
      {error && (
        <p className="mt-2 text-[12.5px] font-medium text-red-500">{error}</p>
      )}
    </div>
  );
}
