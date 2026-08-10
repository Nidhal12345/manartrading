"use client";

import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { useTranslations } from "next-intl";

import ProductCard from "./ProductCard";
import { CutDiagram } from "./ui/CutDiagram";
import {
  PREPARATIONS,
  categoryNames,
  type Category,
  type Preparation,
  type Product,
  type Waters,
} from "@/data/products";

/**
 * The counter, filtered.
 *
 * Three axes, and the third is the point. The Fish Society is the only one of
 * the six competitors that splits species from preparation, and it is the
 * strongest structural idea any of them has — because at a real counter the
 * question is never "which fish", it is "which fish, cut how". The `preparation`
 * filter answers it, and a line that will not take a cut is genuinely absent
 * from that filter rather than shown and disappointing later.
 *
 * Two things came off the old rail:
 *
 *   - **Sort by rating.** Ratings in `products.ts` are derived from a hash of
 *     the slug. Sorting by them ranked the catalogue on invented numbers, which
 *     is worse than not offering the sort at all.
 *   - **Hardcoded English.** Every string here was a literal, so the Arabic shop
 *     rendered an English filter rail. All of it is in `messages/*.json` now.
 *
 * On mobile the rail collapses behind a sticky summary that always states the
 * result count, because `PRODUCT.md` records usage as mobile-skewed and three
 * filter rows ate the first screen. On desktop it is simply open.
 */

const WATERS: Waters[] = ["Red Sea", "Arabian Gulf", "Imported"];

/** `null` is the unfiltered state on every axis, so "all" needs no sentinel string. */
type Filters = {
  category: Category | null;
  water: Waters | null;
  prep: Preparation | null;
};

const EMPTY: Filters = { category: null, water: null, prep: null };

export default function ShopClient({ products }: { products: Product[] }) {
  const t = useTranslations("Shop");
  const tc = useTranslations("Cuts");

  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<Filters>(EMPTY);
  const [railOpen, setRailOpen] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      const matchesQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.arabic.includes(q) ||
        p.scientific.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.origin.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q);

      return (
        matchesQuery &&
        (!filters.category || p.category === filters.category) &&
        (!filters.water || p.waters === filters.water) &&
        (!filters.prep || p.preparation.includes(filters.prep))
      );
    });
  }, [products, query, filters]);

  const activeCount =
    (query.trim() ? 1 : 0) +
    (filters.category ? 1 : 0) +
    (filters.water ? 1 : 0) +
    (filters.prep ? 1 : 0);

  const reset = () => {
    setQuery("");
    setFilters(EMPTY);
  };

  const count = t("countLabel", {
    shown: filtered.length,
    total: products.length,
  });

  return (
    <div className="bg-limewash pb-20 lg:pb-28">
      {/* ---------- the rail ----------
          Sticky as a whole, so the summary bar stays reachable on a long scroll
          and the rows below it come along on desktop where there is room. */}
      <div className="sticky top-0 z-30 border-b-2 border-tar bg-limewash">
        <div className="container-x">
          {/* Summary line: always visible, at every width. It carries the result
              count, which is the one thing worth keeping on screen. */}
          <div className="flex items-center gap-4 py-4">
            <button
              type="button"
              onClick={() => setRailOpen((v) => !v)}
              aria-expanded={railOpen}
              aria-controls="shop-filters"
              className="inline-flex items-center gap-2.5 border-2 border-tar px-4 py-2.5 text-[13px] font-semibold text-tar transition-colors hover:bg-tar hover:text-limewash focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-oxide md:hidden"
            >
              <SlidersHorizontal aria-hidden="true" className="h-4 w-4" />
              {railOpen ? t("filtersClose") : t("filtersOpen")}
              {activeCount > 0 && !railOpen && (
                <span className="numeral grid h-5 w-5 place-items-center bg-oxide text-[12px] leading-none text-limewash">
                  {activeCount}
                </span>
              )}
            </button>

            {/* The count is the filter's only feedback, so it announces rather
                than changing silently. Live on the visible element instead of a
                second sr-only copy: one string, one announcement, no drift
                between what is read out and what is on screen. */}
            <p className="draft-mark text-[13px]" aria-live="polite" aria-atomic="true">
              {count}
            </p>

            {activeCount > 0 && (
              <button
                type="button"
                onClick={reset}
                className="ms-auto inline-flex items-center gap-1.5 text-[13px] font-semibold text-oxide underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-oxide"
              >
                <X aria-hidden="true" className="h-3.5 w-3.5" />
                {t("clear")}
              </button>
            )}
          </div>

          <div
            id="shop-filters"
            className={`${railOpen ? "block" : "hidden"} pb-6 md:block`}
          >
            {/* search */}
            <div className="relative border-b-2 border-tar/20 focus-within:border-tar">
              <Search
                aria-hidden="true"
                className="pointer-events-none absolute start-0 top-1/2 h-4 w-4 -translate-y-1/2 text-rope"
              />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t("searchPlaceholder")}
                aria-label={t("searchLabel")}
                className="w-full bg-transparent py-3 pe-2 ps-7 text-[15px] text-tar outline-none placeholder:text-rope"
              />
            </div>

            {/* heading */}
            <FilterRow label={t("categoryLabel")}>
              <Chip
                active={filters.category === null}
                onClick={() => setFilters((f) => ({ ...f, category: null }))}
              >
                {t("allCategories")}
              </Chip>
              {categoryNames.map((c) => (
                <Chip
                  key={c}
                  active={filters.category === c}
                  onClick={() =>
                    setFilters((f) => ({
                      ...f,
                      category: f.category === c ? null : c,
                    }))
                  }
                >
                  {t(`categories.${c}`)}
                </Chip>
              ))}
            </FilterRow>

            {/* water */}
            <FilterRow label={t("waterLabel")}>
              <Chip
                active={filters.water === null}
                onClick={() => setFilters((f) => ({ ...f, water: null }))}
              >
                {t("allWaters")}
              </Chip>
              {WATERS.map((w) => (
                <Chip
                  key={w}
                  active={filters.water === w}
                  onClick={() =>
                    setFilters((f) => ({ ...f, water: f.water === w ? null : w }))
                  }
                >
                  {t(`waters.${w}`)}
                </Chip>
              ))}
            </FilterRow>

            {/* cut — the new axis, and the one that gets the diagrams */}
            <FilterRow label={t("prepLabel")}>
              <Chip
                active={filters.prep === null}
                onClick={() => setFilters((f) => ({ ...f, prep: null }))}
              >
                {t("allPreps")}
              </Chip>
              {PREPARATIONS.map((p) => (
                <Chip
                  key={p}
                  active={filters.prep === p}
                  onClick={() =>
                    setFilters((f) => ({ ...f, prep: f.prep === p ? null : p }))
                  }
                >
                  <CutDiagram cut={p} className="h-4 w-9 shrink-0" />
                  {tc(`${p}.title`)}
                </Chip>
              ))}
            </FilterRow>

            <p className="mt-5 max-w-2xl text-[13px] leading-relaxed text-rope">
              {t("note")}
            </p>
          </div>
        </div>
      </div>

      {/* ---------- the board ---------- */}
      <div className="container-x pt-12 lg:pt-16">
        {filtered.length > 0 ? (
          <motion.div
            layout
            className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.map((p, i) => (
              <ProductCard key={p.slug} product={p} index={i} />
            ))}
          </motion.div>
        ) : (
          <div className="border-2 border-tar/20 px-6 py-24 text-center">
            <h3 className="display-md text-tar">{t("empty.title")}</h3>
            <p className="mx-auto mt-4 max-w-sm text-[14.5px] leading-relaxed text-rope">
              {t("empty.copy")}
            </p>
            <button
              type="button"
              onClick={reset}
              className="mt-8 bg-oxide px-7 py-3.5 text-[14px] font-semibold text-limewash transition-colors hover:bg-oxide-lit focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-tar"
            >
              {t("empty.cta")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

/**
 * One axis of the rail. The label is a real `<h2>`-less group label rather than
 * decoration, so the buttons underneath are announced as belonging to it.
 */
function FilterRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div
      role="group"
      aria-label={label}
      className="mt-5 flex flex-col gap-2.5 sm:flex-row sm:items-center sm:gap-5"
    >
      <span className="label w-20 shrink-0 text-rope">{label}</span>
      {/* Bleeds to the container edge so a chip clipped at the right reads as
          "there is more this way" rather than as a broken row. */}
      <div className="hide-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 py-0.5 md:-mx-10 md:px-10">
        {children}
      </div>
    </div>
  );
}

/**
 * A painted chip: square, hard-edged, tar on limewash. `aria-pressed` rather
 * than a fake radio group, because the axes are independently clearable and a
 * pressed toggle is what these actually are.
 */
function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`inline-flex shrink-0 items-center gap-2 whitespace-nowrap border-2 px-3.5 py-2 text-[13px] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-oxide ${
        active
          ? "border-tar bg-tar text-limewash"
          : "border-tar/20 text-tar/70 hover:border-tar hover:text-tar"
      }`}
    >
      {children}
    </button>
  );
}
