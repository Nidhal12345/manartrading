"use client";

import Photo from "./ui/Photo";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Check,
  ChefHat,
  Fish,
  Heart,
  Info,
  MessageCircle,
  Minus,
  Phone,
  Plus,
  Share2,
  ShieldCheck,
  Snowflake,
  Star,
  Truck,
} from "lucide-react";
import Magnetic from "./ui/Magnetic";
import { type ImageKey } from "@/lib/images";
import { PHONE, PHONE_HREF, whatsappHref } from "@/lib/contact";
import type { Product } from "@/data/products";

type Tab = "story" | "nutrition" | "cooking";

export default function ProductDetail({ product: p }: { product: Product }) {
  const views: { key: ImageKey; label: string }[] = [
    { key: p.image, label: "On ice" },
    { key: p.wild, label: "In the water" },
    { key: p.cooked, label: "On the plate" },
  ];

  const [view, setView] = useState(0);
  const [size, setSize] = useState(0);
  const [qty, setQty] = useState(2);
  const [tab, setTab] = useState<Tab>("story");
  const [saved, setSaved] = useState(false);

  /**
   * The order goes to WhatsApp pre-written, so the buyer does not have to
   * retype what they were just looking at and the counter has everything it
   * needs to quote: the line, the grade and the weight.
   */
  const orderHref = whatsappHref(
    `Hello Manar Trading, I would like to order ${qty} kg of ${p.name} (${p.sizes[size].label}). Could you confirm the price and delivery?`,
  );

  return (
    <div className="container-x py-14 lg:py-20">
      <div className="grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        {/* ---------------- gallery ---------------- */}
        <div className="lg:sticky lg:top-24 lg:h-fit">
          <div className="relative aspect-[4/5] overflow-hidden bg-abyss">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={view}
                initial={{ opacity: 0, scale: 1.06 }}
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

            <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(4,20,31,0.35),transparent_28%,transparent_70%,rgba(4,20,31,0.5))]" />

            <span className="label absolute left-5 top-5 text-bone/75">
              {p.waters}
            </span>

            <div className="absolute right-5 top-5 flex flex-col gap-2">
              <button
                onClick={() => setSaved((v) => !v)}
                aria-pressed={saved}
                aria-label="Save to favourites"
                className="grid h-11 w-11 place-items-center rounded-full border border-white/25 text-bone backdrop-blur-md transition-all hover:bg-white/15"
              >
                <Heart
                  className={`h-4 w-4 transition-colors ${
                    saved ? "fill-red-400 text-red-400" : ""
                  }`}
                />
              </button>
              <button
                aria-label="Share this product"
                className="grid h-11 w-11 place-items-center rounded-full border border-white/25 text-bone backdrop-blur-md transition-all hover:bg-white/15"
              >
                <Share2 className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-3 gap-3">
            {views.map((v, i) => (
              <button
                key={v.label}
                onClick={() => setView(i)}
                className="group relative aspect-[4/3] overflow-hidden bg-sea-100"
                aria-label={`Show ${v.label}`}
                aria-pressed={view === i}
              >
                <Photo
                  image={v.key}
                  res={400}
                  sizes="180px"
                  className={`object-cover transition-all duration-700 ${
                    view === i
                      ? "scale-105"
                      : "opacity-55 group-hover:opacity-90"
                  }`}
                />
                <span
                  className={`absolute inset-0 border-2 transition-colors ${
                    view === i ? "border-ink" : "border-transparent"
                  }`}
                />
                <span className="label absolute bottom-2 left-2 text-[9px] text-bone drop-shadow">
                  {v.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* ---------------- purchase panel ---------------- */}
        <div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="label text-ink/45">{p.category}</span>
            {p.badge && (
              <span className="label rounded-full bg-ink px-3 py-1.5 text-[9.5px] text-bone">
                {p.badge}
              </span>
            )}
            {p.inStock && (
              <span className="flex items-center gap-2 text-[13px] font-medium text-emerald-700">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                In stock today
              </span>
            )}
          </div>

          <div className="mt-6 flex flex-wrap items-baseline gap-x-5 gap-y-1">
            <h1 className="display-lg text-ink">{p.name}</h1>
            <span className="font-display text-[24px] text-ink/40" dir="rtl">
              {p.arabic}
            </span>
          </div>
          <p className="italic-serif mt-3 text-[15px] text-ink/50">
            {p.scientific}
          </p>

          <div className="mt-5 flex items-center gap-3">
            <span className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-3.5 w-3.5 ${
                    i < Math.round(p.rating)
                      ? "fill-sand text-sand"
                      : "text-ink/15"
                  }`}
                />
              ))}
            </span>
            <span className="text-[13.5px] text-ink/55">
              <span className="font-semibold text-ink">{p.rating}</span> ·{" "}
              {p.reviews} reviews
            </span>
          </div>

          <p className="mt-7 max-w-md text-[16.5px] leading-relaxed text-ink/70">
            {p.tagline}
          </p>

          {/* Where the price stood. The counter quotes by the kilo on WhatsApp
              at the time of the order, because the rate moves with the boats —
              so this says how the figure is reached rather than naming one. */}
          <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 border-y border-ink/12 py-6">
            <MessageCircle className="h-5 w-5 shrink-0 text-ocean" />
            <p className="font-display text-[18px] text-ink">
              Priced on WhatsApp
            </p>
            <p className="w-full text-[13.5px] leading-relaxed text-ink/50 sm:ms-9 sm:w-auto sm:flex-1">
              Send us the grade and the weight — we confirm today&rsquo;s rate
              by the kilo and the delivery window in minutes.
            </p>
          </div>

          {/* grade */}
          <div className="mt-8">
            <p className="label text-ink/45">Grade / cut</p>
            <div className="mt-4 grid gap-2 sm:grid-cols-3">
              {p.sizes.map((s, i) => (
                <button
                  key={s.label}
                  onClick={() => setSize(i)}
                  className={`border p-4 text-left transition-all ${
                    size === i
                      ? "border-ink bg-ink text-bone"
                      : "border-ink/15 hover:border-ink/50"
                  }`}
                >
                  <span className="flex items-center justify-between">
                    <span className="font-display text-[15px]">{s.label}</span>
                    {size === i && <Check className="h-4 w-4" />}
                  </span>
                  <span
                    className={`mt-1 block text-[12.5px] ${
                      size === i ? "text-bone/60" : "text-ink/50"
                    }`}
                  >
                    {s.weight}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* quantity + order */}
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <div className="flex items-center border border-ink/15">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                className="grid h-[54px] w-12 place-items-center text-ink transition-colors hover:bg-ink/5 disabled:opacity-25"
                disabled={qty <= 1}
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="numeral w-16 text-center text-[16px] text-ink">
                {qty}
                <span className="ml-1 text-[12px] text-ink/50">kg</span>
              </span>
              <button
                onClick={() => setQty((q) => Math.min(50, q + 1))}
                aria-label="Increase quantity"
                className="grid h-[54px] w-12 place-items-center text-ink transition-colors hover:bg-ink/5"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            {/* There is no basket and no checkout — the order leaves the site
                here, with the line, grade and weight already written into the
                message. `rel="noreferrer"` because it is a third-party host. */}
            <Magnetic strength={0.14} className="flex-1">
              <a
                href={orderHref}
                target="_blank"
                rel="noreferrer"
                className="flex h-[54px] w-full items-center justify-center gap-3 rounded-full bg-ink px-7 text-[15px] font-semibold text-bone transition-colors hover:bg-ocean"
              >
                <MessageCircle className="h-4.5 w-4.5" />
                Order {qty} kg on WhatsApp
              </a>
            </Magnetic>
          </div>

          <a
            href={PHONE_HREF}
            className="mt-3 flex h-[54px] items-center justify-center gap-2.5 border border-ink/15 text-[14.5px] font-medium text-ink transition-colors hover:border-ink"
          >
            <Phone className="h-4 w-4 text-ink/50" />
            Or order by phone · <span dir="ltr">{PHONE}</span>
          </a>

          {/* assurances */}
          <div className="mt-9 grid gap-px border-y border-ink/12 bg-ink/12 sm:grid-cols-3">
            {[
              { icon: Truck, t: "Same-day", s: "Order before 2 PM" },
              { icon: Snowflake, t: "0 – 2 °C", s: "Iced in transit" },
              { icon: ShieldCheck, t: "Guaranteed", s: "Not fresh? Refunded" },
            ].map((x) => (
              <div key={x.t} className="bg-white px-4 py-6 text-center">
                <x.icon className="mx-auto h-4.5 w-4.5 text-ocean" />
                <p className="mt-3 font-display text-[14px] text-ink">{x.t}</p>
                <p className="mt-0.5 text-[11.5px] text-ink/45">{x.s}</p>
              </div>
            ))}
          </div>

          {/* spec grid */}
          <dl className="mt-8 grid grid-cols-2 gap-x-8 gap-y-5">
            {[
              ["Origin", p.origin],
              ["Waters", p.waters],
              ["Catch method", p.method],
              ["Season", p.season],
              ["Texture", p.texture],
              ["Flavour", p.flavour],
            ].map(([k, v]) => (
              <div key={k} className="border-t border-ink/12 pt-3">
                <dt className="label text-ink/40">{k}</dt>
                <dd className="mt-1.5 text-[14.5px] text-ink">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* ---------------- tabs ---------------- */}
      <div className="mt-24 border-t border-ink/12 pt-10">
        <div className="flex flex-wrap gap-8">
          {(
            [
              { key: "story", label: "About this fish", icon: Fish },
              { key: "nutrition", label: "Nutrition", icon: Info },
              { key: "cooking", label: "How to cook it", icon: ChefHat },
            ] as const
          ).map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`group relative flex items-center gap-2.5 pb-3 text-[15px] font-medium transition-colors ${
                tab === t.key ? "text-ink" : "text-ink/40 hover:text-ink/70"
              }`}
            >
              <t.icon className="h-4 w-4" />
              {t.label}
              {tab === t.key && (
                <motion.span
                  layoutId="detail-tab"
                  className="absolute inset-x-0 bottom-0 h-px bg-ink"
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
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              {tab === "story" && (
                <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr]">
                  <p className="max-w-2xl text-[17px] leading-[1.9] text-ink/75">
                    {p.description}
                  </p>
                  <ul className="space-y-4">
                    {p.highlights.map((h) => (
                      <li
                        key={h}
                        className="flex gap-3.5 border-b border-ink/10 pb-4"
                      >
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-ocean" />
                        <span className="text-[14.5px] leading-relaxed text-ink/70">
                          {h}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {tab === "nutrition" && (
                <div>
                  <p className="text-[14.5px] text-ink/55">
                    Typical values per 100 g of raw edible portion.
                  </p>
                  <div className="mt-8 grid gap-px border-y border-ink/12 bg-ink/12 sm:grid-cols-2 lg:grid-cols-4">
                    {[
                      { k: "Protein", v: p.nutrition.protein, u: "g", max: 26 },
                      { k: "Fat", v: p.nutrition.fat, u: "g", max: 8 },
                      { k: "Omega-3", v: p.nutrition.omega3, u: "g", max: 1.6 },
                      {
                        k: "Energy",
                        v: p.nutrition.calories,
                        u: "kcal",
                        max: 160,
                      },
                    ].map((n) => (
                      <div key={n.k} className="bg-white px-6 py-8">
                        <p className="label text-ink/40">{n.k}</p>
                        <p className="numeral mt-3 text-[34px] leading-none text-ink">
                          {n.v}
                          <span className="ml-1 text-[14px] text-ink/45">
                            {n.u}
                          </span>
                        </p>
                        <div className="mt-5 h-px bg-ink/12">
                          <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: Math.min(1, n.v / n.max) }}
                            transition={{
                              duration: 1,
                              ease: [0.16, 1, 0.3, 1],
                            }}
                            className="h-px origin-left bg-ocean"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {tab === "cooking" && (
                <div className="grid gap-12 lg:grid-cols-2">
                  <div>
                    <h3 className="display-md text-ink">Best cooked as</h3>
                    <div className="mt-5 flex flex-wrap gap-2.5">
                      {p.bestFor.map((b) => (
                        <span
                          key={b}
                          className="rounded-full border border-ink/15 px-4 py-2.5 text-[13.5px] text-ink/70"
                        >
                          {b}
                        </span>
                      ))}
                    </div>
                    <p className="mt-7 max-w-md text-[15px] leading-relaxed text-ink/65">
                      Texture is {p.texture.toLowerCase()} with a{" "}
                      {p.flavour.toLowerCase()} profile — season simply and let
                      the fish carry the plate.
                    </p>

                    <div className="relative mt-8 aspect-[16/10] overflow-hidden bg-abyss">
                      <Photo
                        image={p.cooked}
                        res={900}
                        sizes="(max-width: 1024px) 100vw, 45vw"
                        className="object-cover"
                      />
                    </div>
                  </div>

                  <ol className="space-y-6">
                    {[
                      "Take it out of the fridge 15 minutes before cooking so it comes closer to room temperature.",
                      "Pat the skin completely dry, then salt it generously — this is what gives you crisp skin.",
                      "Cook 80% of the time on the first side. Turn once, never twice.",
                      "Rest for three minutes before serving. The centre finishes cooking off the heat.",
                    ].map((s, i) => (
                      <li
                        key={i}
                        className="flex gap-5 border-b border-ink/10 pb-6"
                      >
                        <span className="numeral text-[13px] text-ocean">
                          0{i + 1}
                        </span>
                        <span className="text-[15px] leading-relaxed text-ink/70">
                          {s}
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
