"use client";

import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import Photo from "./ui/Photo";
import { Link } from "@/i18n/navigation";
import { CutDiagram } from "./ui/CutDiagram";
import type { Product } from "@/data/products";

/**
 * A line on the landing board.
 *
 * Chalk on limewash, with the name on a painted tar plate and the hard 2px
 * `hull-rule` under it — the card-scale version of the waterline, without the
 * drips, which at this size would read as noise.
 *
 * Removed from the old card: the two mix-blend gradient washes over the photo
 * (they were there to unify a mixed stock set, and they dulled every shot), the
 * rounded pill badge, and the rounded arrow button. The cut diagrams are new and
 * they are the useful part — a buyer scanning the grid can see which lines take
 * the cut they want without opening anything.
 *
 * The name board carries both scripts, the way a transom does, but the reader's
 * own script is the one set at display scale: an Arabic visitor scanning a grid
 * of sixteen boards should be reading Arabic, not skimming Latin for a
 * transliteration. The second script stays underneath as the trade name, which
 * is genuinely useful in both directions — the counter quotes in both.
 */
export default function ProductCard({
  product: p,
  index = 0,
}: {
  product: Product;
  index?: number;
}) {
  const t = useTranslations("Shop");
  const tc = useTranslations("Cuts");
  const isRtl = useLocale() === "ar";

  const primary = isRtl ? p.arabic : p.name;
  const secondary = isRtl ? p.name : p.arabic;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: Math.min(index * 0.05, 0.3),
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group"
    >
      <Link
        href={`/shop/${p.slug}`}
        className="flex h-full flex-col bg-chalk transition-shadow duration-500 hover:shadow-lift focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-oxide"
      >
        {/* ---- the name board ---- */}
        <div className="relative bg-tar px-5 pb-5 pt-4">
          <div className="flex items-baseline justify-between gap-3">
            <span className="draft-mark text-[12px]">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="label text-limewash/50">
              {t(`waters.${p.waters}`)}
            </span>
          </div>

          <h3
            className={`mt-3 leading-[1.05] text-limewash ${
              isRtl
                ? "font-arabic-display text-[26px] leading-[1.3]"
                : "font-display text-[24px] uppercase"
            }`}
          >
            {primary}
          </h3>
          <p
            className={`mt-1.5 leading-none text-ochre/85 ${
              isRtl
                ? "latin-plate text-[15px]"
                : "font-arabic-display text-[14px]"
            }`}
            dir={isRtl ? "ltr" : "rtl"}
          >
            {secondary}
          </p>

          <div
            aria-hidden="true"
            className="waterline absolute inset-x-0 bottom-0"
          />
        </div>

        {/* ---- the fish ---- */}
        <div className="relative aspect-[4/5] overflow-hidden bg-tar">
          <Photo
            image={p.image}
            res={900}
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover transition-transform duration-[1.1s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
          />

          {p.badge && (
            <span className="label absolute end-0 top-4 bg-oxide px-3 py-1.5 text-limewash">
              {t(`badges.${p.badge}`)}
            </span>
          )}
        </div>

        {/* ---- the spec ---- */}
        <div className="flex flex-1 flex-col p-5">
          <p className="text-[14px] leading-[1.6] text-tar/70">{p.tagline}</p>

          {/* The cuts this line takes, drawn. The label is the accessible name;
              the diagrams are decoration on top of it. */}
          <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-tar/12 pt-4">
            <span className="label text-rope">{t("prepLabel")}</span>
            {p.preparation.map((cut) => (
              <span
                key={cut}
                className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-tar/65"
              >
                <CutDiagram cut={cut} className="h-3.5 w-7 shrink-0" />
                {tc(`${cut}.title`)}
              </span>
            ))}
          </div>

          <div className="mt-auto pt-5">
            <div aria-hidden="true" className="hull-rule" />
            <div className="flex items-center justify-between gap-4 pt-4">
              <p className="truncate text-[13px] text-rope">{p.origin}</p>
              <span
                aria-hidden="true"
                className="grid h-9 w-9 shrink-0 place-items-center bg-tar text-limewash transition-colors duration-500 group-hover:bg-oxide"
              >
                <ArrowUpRight className="h-4 w-4 rtl-flip transition-transform duration-500 group-hover:rotate-45" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
