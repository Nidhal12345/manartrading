"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Check,
  MessageCircle,
  Minus,
  Phone,
  Plus,
  ShieldCheck,
  Snowflake,
  Utensils,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import Photo from "./ui/Photo";
import { CutDiagram } from "./ui/CutDiagram";
import { type ImageKey } from "@/lib/images";
import { PHONE, PHONE_HREF, whatsappHref } from "@/lib/contact";
import type { Product } from "@/data/products";

/**
 * The spec sheet.
 *
 * `PRODUCT.md` says every product page should terminate in a WhatsApp handoff,
 * and the page now does exactly that: the buyer picks a grade, a cut and a
 * weight, and all three are written into the message before it leaves the site.
 * There is no basket and no checkout, so nothing on this page pretends to be one.
 *
 * Removed from the old panel, all for the same reason — it displayed state that
 * did not exist:
 *
 *   - **Save to favourites.** A heart that set local state and forgot it on
 *     navigation. There is no account system to save into.
 *   - **Share.** A button with no handler at all.
 *   - **Star rating and review count.** Both derived from a hash of the slug in
 *     `products.ts`. Printing "4.8 · 173 reviews" over invented numbers is the
 *     exact failure `PRODUCT.md` names.
 *   - **"In stock today".** A pulsing green dot driven by a hardcoded `true`.
 *   - **"Order before 2 PM".** No cut-off is confirmed, so none is printed.
 *
 * The nutrition panel stays, behind a marked block: the figures are placeholder
 * and the copy says so rather than presenting them as measured.
 */

type Tab = "story" | "nutrition" | "cooking";

const TABS: Tab[] = ["story", "nutrition", "cooking"];

const HANDLING = [
  { key: "chilled", icon: Snowflake },
  { key: "cutToOrder", icon: Utensils },
  { key: "guarantee", icon: ShieldCheck },
] as const;

export default function ProductDetail({ product: p }: { product: Product }) {
  const t = useTranslations("Product");
  const tc = useTranslations("Cuts");
  const ts = useTranslations("Shop");
  const isRtl = useLocale() === "ar";

  const views: { key: ImageKey; label: string }[] = [
    { key: p.image, label: t("views.outOfWater") },
    { key: p.wild, label: t("views.inWater") },
    { key: p.cooked, label: t("views.onPlate") },
  ];

  const [view, setView] = useState(0);
  const [size, setSize] = useState(0);
  const [cut, setCut] = useState(p.preparation[0]);
  const [qty, setQty] = useState(2);
  const [tab, setTab] = useState<Tab>("story");

  /**
   * Everything the counter needs to quote, already written: the line, the
   * grade, the weight and the cut. The buyer retypes nothing.
   */
  const orderHref = whatsappHref(
    t("message", {
      qty,
      name: p.name,
      arabic: p.arabic,
      grade: p.sizes[size].label,
      weight: p.sizes[size].weight,
      cut: tc(`${cut}.title`),
    }),
  );

  const spec: [string, string][] = [
    [t("spec.scientific"), p.scientific],
    [t("spec.origin"), p.origin],
    [t("spec.waters"), ts(`waters.${p.waters}`)],
    [t("spec.method"), p.method],
    [t("spec.season"), p.season],
    [t("spec.texture"), p.texture],
    [t("spec.flavour"), p.flavour],
  ];

  return (
    <div className="container-x py-14 lg:py-20">
      <div className="grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        {/* ---------------- gallery ---------------- */}
        <div className="lg:sticky lg:top-24 lg:h-fit">
          <div className="relative aspect-[4/5] overflow-hidden bg-tar">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={view}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                <Photo
                  image={views[view].key}
                  res={1100}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  eager
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>

            {p.badge && (
              <span className="label absolute end-0 top-5 bg-oxide px-3.5 py-2 text-limewash">
                {ts(`badges.${p.badge}`)}
              </span>
            )}

            <div
              aria-hidden="true"
              className="waterline absolute inset-x-0 bottom-0"
            />
          </div>

          <div className="mt-3 grid grid-cols-3 gap-2">
            {views.map((v, i) => (
              <button
                key={v.label}
                type="button"
                onClick={() => setView(i)}
                aria-label={t("showView", { label: v.label })}
                aria-pressed={view === i}
                className="group relative aspect-[4/3] overflow-hidden bg-tar focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-oxide"
              >
                <Photo
                  image={v.key}
                  res={400}
                  sizes="180px"
                  className={`object-cover transition-all duration-700 ${
                    view === i ? "opacity-100" : "opacity-50 group-hover:opacity-85"
                  }`}
                />
                <span
                  className={`pointer-events-none absolute inset-0 border-2 transition-colors ${
                    view === i ? "border-tar" : "border-transparent"
                  }`}
                />
                <span className="label absolute bottom-2 start-2 text-[9px] text-limewash drop-shadow">
                  {v.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* ---------------- the order ---------------- */}
        <div>
          <span className="label text-rope">
            {ts(`categories.${p.category}`)}
          </span>

          <h1
            className={`mt-5 text-tar ${
              isRtl
                ? "font-arabic-display text-[clamp(2.1rem,5vw,3.2rem)] font-bold leading-[1.3]"
                : "display-lg"
            }`}
          >
            {isRtl ? p.arabic : p.name}
          </h1>
          <p
            className={`mt-3 leading-none text-oxide ${
              isRtl
                ? "latin-plate text-[22px]"
                : "font-arabic-display text-[26px]"
            }`}
            dir={isRtl ? "ltr" : "rtl"}
          >
            {isRtl ? p.name : p.arabic}
          </p>

          <p className="mt-7 max-w-md text-[16.5px] leading-relaxed text-tar/75">
            {p.tagline}
          </p>

          {/* Where the price stood. The rate moves with the boats, so this says
              how the figure is reached rather than naming one. */}
          <div className="mt-9 border-2 border-tar bg-chalk p-6">
            <p className="flex items-center gap-3 font-display text-[20px] uppercase text-tar">
              <MessageCircle aria-hidden="true" className="h-5 w-5 text-oxide" />
              {t("priced.title")}
            </p>
            <p className="mt-3 text-[14px] leading-[1.75] text-tar/65 rtl:leading-[1.95]">
              {t("priced.copy")}
            </p>
          </div>

          {/* grade */}
          <fieldset className="mt-9">
            <legend className="label text-rope">{t("gradeLabel")}</legend>
            <div className="mt-4 grid gap-2 sm:grid-cols-3">
              {p.sizes.map((s, i) => (
                <button
                  key={s.label}
                  type="button"
                  onClick={() => setSize(i)}
                  aria-pressed={size === i}
                  className={`border-2 p-4 text-start transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-oxide ${
                    size === i
                      ? "border-tar bg-tar text-limewash"
                      : "border-tar/15 text-tar hover:border-tar"
                  }`}
                >
                  <span className="flex items-center justify-between gap-2">
                    <span className="font-display text-[16px] uppercase">
                      {s.label}
                    </span>
                    {size === i && (
                      <Check aria-hidden="true" className="h-4 w-4 shrink-0" />
                    )}
                  </span>
                  <span
                    className={`draft-mark mt-1.5 block text-[12.5px] ${
                      size === i ? "" : "text-rope"
                    }`}
                  >
                    {s.weight}
                  </span>
                </button>
              ))}
            </div>
          </fieldset>

          {/* cut — only the ones this line actually takes */}
          <fieldset className="mt-8">
            <legend className="label text-rope">{t("cutLabel")}</legend>
            <div className="mt-4 flex flex-wrap gap-2">
              {p.preparation.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCut(c)}
                  aria-pressed={cut === c}
                  className={`inline-flex items-center gap-2.5 border-2 px-4 py-2.5 text-[13.5px] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-oxide ${
                    cut === c
                      ? "border-tar bg-tar text-limewash"
                      : "border-tar/15 text-tar/70 hover:border-tar hover:text-tar"
                  }`}
                >
                  <CutDiagram cut={c} className="h-4 w-9 shrink-0" />
                  {tc(`${c}.title`)}
                </button>
              ))}
            </div>
            <p className="mt-3.5 text-[13px] leading-relaxed text-rope">
              {tc(`${cut}.copy`)}
            </p>
          </fieldset>

          {/* weight + handoff */}
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <div
              role="group"
              aria-label={t("qtyLabel")}
              className="flex items-center border-2 border-tar"
            >
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label={t("decrease")}
                disabled={qty <= 1}
                className="grid h-[54px] w-12 place-items-center text-tar transition-colors hover:bg-tar hover:text-limewash disabled:pointer-events-none disabled:opacity-25"
              >
                <Minus aria-hidden="true" className="h-4 w-4" />
              </button>
              <span className="numeral w-16 text-center text-[18px] text-tar">
                {qty}
                <span className="ms-1 text-[12px] text-rope">
                  {t("qtyUnit")}
                </span>
              </span>
              <button
                type="button"
                onClick={() => setQty((q) => Math.min(50, q + 1))}
                aria-label={t("increase")}
                className="grid h-[54px] w-12 place-items-center text-tar transition-colors hover:bg-tar hover:text-limewash"
              >
                <Plus aria-hidden="true" className="h-4 w-4" />
              </button>
            </div>

            {/* The order leaves the site here. `rel` carries noopener because
                the link opens a third-party host in a new tab. */}
            <a
              href={orderHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-[54px] flex-1 items-center justify-center gap-3 bg-oxide px-7 text-[15px] font-semibold text-limewash transition-colors hover:bg-oxide-lit focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-tar"
            >
              <MessageCircle aria-hidden="true" className="h-4 w-4 shrink-0" />
              {t("order", { qty })}
            </a>
          </div>

          <a
            href={PHONE_HREF}
            className="mt-3 flex h-[54px] items-center justify-center gap-2.5 border-2 border-tar/15 text-[14.5px] font-semibold text-tar transition-colors hover:border-tar focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-oxide"
          >
            <Phone aria-hidden="true" className="h-4 w-4 text-rope" />
            {t("orderPhone")} · <span dir="ltr">{PHONE}</span>
          </a>

          {/* handling — three things that are true of every line */}
          <div className="mt-9 grid gap-px bg-tar/12 sm:grid-cols-3">
            {HANDLING.map((h) => (
              <div key={h.key} className="bg-limewash px-4 py-6 text-center">
                <h.icon
                  aria-hidden="true"
                  className="mx-auto h-4.5 w-4.5 text-oxide"
                />
                <p className="mt-3 font-display text-[15px] uppercase text-tar">
                  {t(`handling.${h.key}.title`)}
                </p>
                <p className="mt-1 text-[12px] leading-snug text-rope">
                  {t(`handling.${h.key}.copy`)}
                </p>
              </div>
            ))}
          </div>

          {/* ---- the spec sheet proper ---- */}
          <div className="mt-10">
            <h2 className="label text-rope">{t("spec.title")}</h2>
            <dl className="mt-5 grid grid-cols-2 gap-x-8 gap-y-5">
              {spec.map(([k, v]) => (
                <div key={k} className="border-t-2 border-tar/12 pt-3">
                  <dt className="label text-rope">{k}</dt>
                  <dd className="mt-1.5 text-[14.5px] text-tar">{v}</dd>
                </div>
              ))}

              <div className="col-span-2 border-t-2 border-tar/12 pt-3">
                <dt className="label text-rope">{t("spec.cuts")}</dt>
                <dd className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-2">
                  {p.preparation.map((c) => (
                    <span
                      key={c}
                      className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-tar/70"
                    >
                      <CutDiagram cut={c} className="h-4 w-8 shrink-0" />
                      {tc(`${c}.title`)}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* ---------------- tabs ---------------- */}
      <div className="mt-24 border-t-2 border-tar pt-10">
        <div className="flex flex-wrap gap-8">
          {TABS.map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setTab(key)}
              aria-pressed={tab === key}
              className={`relative pb-3 font-display text-[18px] uppercase transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-oxide ${
                tab === key ? "text-tar" : "text-rope hover:text-tar"
              }`}
            >
              {t(`tabs.${key}`)}
              {tab === key && (
                <motion.span
                  layoutId="detail-tab"
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-[3px] bg-oxide"
                  transition={{ type: "spring", stiffness: 380, damping: 34 }}
                />
              )}
            </button>
          ))}
        </div>

        <div className="pt-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            >
              {tab === "story" && (
                <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr]">
                  <p className="max-w-2xl text-[17px] leading-[1.9] text-tar/75">
                    {p.description}
                  </p>
                  <ul className="space-y-4">
                    {p.highlights.map((h) => (
                      <li
                        key={h}
                        className="flex gap-3.5 border-b border-tar/12 pb-4"
                      >
                        <Check
                          aria-hidden="true"
                          className="mt-0.5 h-4 w-4 shrink-0 text-oxide"
                        />
                        <span className="text-[14.5px] leading-relaxed text-tar/70">
                          {h}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {tab === "nutrition" && (
                <div>
                  <p className="text-[14.5px] text-tar/60">
                    {t("nutrition.note")}
                  </p>

                  <div className="mt-8 grid gap-px bg-tar/12 sm:grid-cols-2 lg:grid-cols-4">
                    {(
                      [
                        ["protein", p.nutrition.protein, t("nutrition.unitG")],
                        ["fat", p.nutrition.fat, t("nutrition.unitG")],
                        ["omega3", p.nutrition.omega3, t("nutrition.unitG")],
                        [
                          "energy",
                          p.nutrition.calories,
                          t("nutrition.unitKcal"),
                        ],
                      ] as const
                    ).map(([key, value, unit]) => (
                      <div key={key} className="bg-limewash px-6 py-8">
                        <p className="label text-rope">{t(`nutrition.${key}`)}</p>
                        <p className="numeral mt-3 text-[36px] leading-none text-tar">
                          {value}
                          <span className="ms-1.5 text-[14px] text-rope">
                            {unit}
                          </span>
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* The figures above are placeholder. Marked, not dressed up
                      as measured — the bars that used to animate under each one
                      implied a precision this data does not have. */}
                  <p className="mt-6 max-w-2xl border-s-4 border-ochre ps-5 text-[13.5px] leading-relaxed text-tar/60">
                    {t("nutrition.placeholder")}
                  </p>
                </div>
              )}

              {tab === "cooking" && (
                <div className="grid gap-12 lg:grid-cols-2">
                  <div>
                    <h3 className="display-md text-tar">{t("cooking.title")}</h3>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {p.bestFor.map((b) => (
                        <span
                          key={b}
                          className="border-2 border-tar/15 px-4 py-2.5 text-[13.5px] font-semibold text-tar/70"
                        >
                          {b}
                        </span>
                      ))}
                    </div>
                    <p className="mt-7 max-w-md text-[15px] leading-relaxed text-tar/65">
                      {t("cooking.copy")}
                    </p>

                    <div className="relative mt-8 aspect-[16/10] overflow-hidden bg-tar">
                      <Photo
                        image={p.cooked}
                        res={900}
                        sizes="(max-width: 1024px) 100vw, 45vw"
                        className="object-cover"
                      />
                      <div
                        aria-hidden="true"
                        className="waterline absolute inset-x-0 bottom-0"
                      />
                    </div>
                  </div>

                  <div>
                    <h3 className="label text-rope">
                      {t("cooking.stepsTitle")}
                    </h3>
                    <ol className="mt-5 space-y-6">
                      {(["s1", "s2", "s3", "s4"] as const).map((s, i) => (
                        <li
                          key={s}
                          className="flex gap-5 border-b border-tar/12 pb-6"
                        >
                          <span className="numeral text-[22px] leading-none text-ochre">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className="text-[15px] leading-relaxed text-tar/70">
                            {t(`cooking.${s}`)}
                          </span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
