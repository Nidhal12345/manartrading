"use client";

import Photo from "./ui/Photo";
import { Link } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";
import { SectionIntro, TradeName } from "./Decor";
import type { ImageKey } from "@/lib/images";

export type OfferingStats = {
  /** Whole fish species on the counter — not shellfish, and not cuts. */
  fishCount: number;
  /** Crustacean and other seafood lines. */
  shellfishCount: number;
};

type Board = {
  key: "fish" | "shellfish" | "orders";
  image: ImageKey;
  href: string;
  /** Latin figure, or absent where the board states a term instead of a count. */
  figure?: number;
};

/**
 * Today's counter, drawn as the landing board chalked up at a market.
 *
 * Three doors into the catalogue: the fish counter, the shellfish season, and
 * standing orders for kitchens. It was three alternating photo-and-copy rows
 * with a magnetic pill on each — a layout that took three screens to say what a
 * board says in one.
 *
 * The figures come from the catalogue itself (`offeringStats` on the page), so
 * they cannot drift from what the shop actually carries. Nothing here is billed
 * as live: the closing line says plainly that this is what the counter carries,
 * not what landed this morning, because there is no feed behind it that could
 * honestly claim otherwise.
 */
export default function Offerings({ stats }: { stats: OfferingStats }) {
  const t = useTranslations("Offerings");

  const boards: Board[] = [
    { key: "fish", image: "fishRows", href: "/shop", figure: stats.fishCount },
    {
      key: "shellfish",
      image: "prawnsOnIce",
      // A real slug from `@/data/products` — the head-on shrimp line, which is
      // what the photograph shows.
      href: "/shop/crustaceans-seafood-shrimp-prawn",
      figure: stats.shellfishCount,
    },
    { key: "orders", image: "marketCounter", href: "/contact" },
  ];

  return (
    <section className="relative bg-tar pb-24 pt-20 text-limewash md:pb-32 md:pt-24">
      <div className="container-x">
        <SectionIntro
          light
          index="02"
          eyebrow={t("eyebrow")}
          title={t("title")}
          copy={t("copy")}
        />

        {/* A board is ruled, not carded: 1px gaps over a limewash grid, so the
            three cells read as one chalked panel rather than three tiles. */}
        <div className="mt-14 grid gap-px bg-limewash/15 md:grid-cols-3 lg:mt-16">
          {boards.map((b, i) => (
            <Reveal key={b.key} blur={false} delay={i * 0.08} className="h-full">
              <BoardCell board={b} index={i} />
            </Reveal>
          ))}
        </div>

        <p className="mt-8 max-w-xl text-[13.5px] leading-relaxed text-limewash/45">
          {t("caveat")}
        </p>
      </div>

      <div aria-hidden="true" className="waterline absolute inset-x-0 bottom-0" />
    </section>
  );
}

function BoardCell({ board: b, index }: { board: Board; index: number }) {
  const t = useTranslations("Offerings");
  const isRtl = useLocale() === "ar";

  return (
    <Link
      href={b.href}
      className="group flex h-full flex-col bg-tar transition-colors duration-500 hover:bg-tar-lit focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ochre"
    >
      <div className="relative aspect-[5/3] overflow-hidden">
        <Photo
          image={b.image}
          res={900}
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover opacity-70 transition-[opacity,transform] duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04] group-hover:opacity-90"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(26,20,16,0.2),rgba(26,20,16,0.75))]"
        />
        <span className="draft-mark absolute start-5 top-5 text-[12px]">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6 md:p-7">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="display-md text-limewash">{t(`${b.key}.title`)}</h3>
          <TradeName
            latin={t(`${b.key}.latin`)}
            arabic={t(`${b.key}.arabic`)}
            isRtl={isRtl}
            className="shrink-0 text-[13.5px] leading-none text-limewash/45"
          />
        </div>

        <p className="mt-4 text-[14.5px] leading-[1.75] text-limewash/65 rtl:leading-[2]">
          {t(`${b.key}.copy`)}
        </p>

        {/* The chalked figure. `numeral` keeps Latin digits in both locales, so
            a column of these lines up whichever way the page runs. */}
        <div className="mt-auto flex items-end justify-between gap-4 pt-8">
          <span className="flex items-baseline gap-2">
            {b.figure !== undefined && (
              <span className="numeral text-[30px] leading-none text-ochre">
                {b.figure}
              </span>
            )}
            <span className="label text-limewash/45">{t(`${b.key}.unit`)}</span>
          </span>

          <span className="grid h-9 w-9 shrink-0 place-items-center bg-oxide text-limewash transition-transform duration-500 group-hover:rotate-45">
            <ArrowUpRight aria-hidden="true" className="h-4 w-4 rtl-flip" />
          </span>
        </div>
      </div>
    </Link>
  );
}
