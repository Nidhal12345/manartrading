"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { PanelLeftClose, Search, SlidersHorizontal, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { BoardLine } from "./ProductCard";
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
 * The counter, filtered — a day board rather than a card grid.
 *
 * Three axes, and the third is the point. The Fish Society is the only one of
 * the six competitors that splits species from preparation, and it is the
 * strongest structural idea any of them has — because at a real counter the
 * question is never "which fish", it is "which fish, cut how". The `preparation`
 * filter answers it, and a line that will not take a cut is genuinely absent
 * from that filter rather than shown and disappointing later. The cut vocabulary
 * is now printed on every line of the board as well, so the axis is legible
 * before anyone touches a control.
 *
 * What the board replaced. Sixteen equal photo tiles in a 3-up grid said every
 * line is the same weight and gave the page no sequence — you could not tell
 * where the fish stopped and the shellfish started, and the four-across variant
 * shrank a grouper to a thumbnail. It is a ruled ladder now: the two catalogue
 * headings are painted crossbars with their own tally, the first line under each
 * takes a wide plate, and the rest run as numbered rungs beneath it. The lots
 * are whole-catalogue positions fixed at build time, so a filtered board reads
 * 03 / 06 / 11 — a crossed-off day sheet, which is a truer picture of "six of
 * sixteen" than a renumbered 1-2-3.
 *
 * The rail used to run horizontally: three rows of chips across the top of the
 * page, each row overflowing sideways into a scroller. It hid its own options —
 * the fifth cut and the third water sat off-screen at most widths — and on
 * desktop it spent the top of every scroll position while leaving the entire
 * left margin empty. It is a left column now, and the options are simply all
 * visible at once.
 *
 * The column closes, on both axes and for different reasons. On desktop that is
 * a choice about the board: with the filters away the ladder takes a third
 * column, so a buyer who has finished narrowing sees more fish. On mobile it is
 * a drawer, because PRODUCT.md records usage as mobile-skewed and a permanent
 * column would leave no page.
 *
 * Every option carries the count it would yield. That is the substance behind a
 * vertical list — a column of bare labels is thinner than the chips it replaced,
 * and a count that reads zero tells a buyer the combination is empty *before*
 * they spend a click on it. Counts exclude their own axis, which is why picking
 * "Red Sea" does not zero out the other two waters.
 *
 * What is applied is written above the board, not in the sticky bar. Two reasons:
 * the bar is measured (see `RAIL_TOP`) and a wrapping row of terms inside it
 * would push the filter column out of register at exactly the moment a visitor
 * is using it; and the terms belong beside the result they produced, where
 * dropping one is the natural way back out of an over-narrowed board.
 */

const WATERS: Waters[] = ["Red Sea", "Arabian Gulf", "Imported"];

/** `null` is the unfiltered state on every axis, so "all" needs no sentinel string. */
type Filters = {
  category: Category | null;
  water: Waters | null;
  prep: Preparation | null;
};

const EMPTY: Filters = { category: null, water: null, prep: null };

type Counts = {
  category: Record<Category, number>;
  water: Record<Waters, number>;
  prep: Record<Preparation, number>;
  /** What each axis yields with only the *other* axes applied. */
  allCategory: number;
  allWater: number;
  allPrep: number;
};

/**
 * The nav's own height, not counting its 1px bottom rule.
 *
 * The utility bar sticks here rather than at 75, so it tucks a pixel *under* the
 * header instead of risking a hairline of moving content between the two at
 * fractional zoom. The header outranks it on z-index, so the overlap is invisible.
 */
const HEADER = 74;
/**
 * Where the filter column comes to rest: header, plus the bar beneath it, plus
 * air. Measured rather than derived — there is no CSS expression for "stick
 * below the thing that is already stuck". The bar's internal metrics are fixed
 * by this number: nothing that can wrap is allowed inside it.
 */
const RAIL_TOP = 142;

export default function ShopClient({ products }: { products: Product[] }) {
  const t = useTranslations("Shop");
  const tc = useTranslations("Cuts");
  const isRtl = useLocale() === "ar";

  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<Filters>(EMPTY);

  /**
   * Two booleans rather than one, because the two surfaces have opposite
   * resting states: the desktop column is open until closed, the mobile drawer
   * is shut until opened. A single shared flag would have to guess the
   * breakpoint at render time, which is the usual source of a hydration
   * mismatch here — and a mount effect that corrects it flashes.
   */
  const [railClosed, setRailClosed] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const q = query.trim().toLowerCase();

  /** Text match, factored out so the facet counts and the board agree on it. */
  const matchesQuery = useCallback(
    (p: Product) =>
      !q ||
      p.name.toLowerCase().includes(q) ||
      p.arabic.includes(q) ||
      p.scientific.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.origin.toLowerCase().includes(q) ||
      p.tagline.toLowerCase().includes(q),
    [q],
  );

  const filtered = useMemo(
    () =>
      products.filter(
        (p) =>
          matchesQuery(p) &&
          (!filters.category || p.category === filters.category) &&
          (!filters.water || p.waters === filters.water) &&
          (!filters.prep || p.preparation.includes(filters.prep)),
      ),
    [products, matchesQuery, filters],
  );

  /**
   * Lot numbers, assigned once against the whole catalogue.
   *
   * Read off the unfiltered list on purpose: a lot is where the line sits on the
   * spec sheet, not where it happens to land in today's filtered view. Keyed by
   * slug so a future reorder of `products.ts` renumbers the board rather than
   * silently detaching the numbers from the fish.
   */
  const lots = useMemo(
    () => new Map(products.map((p, i) => [p.slug, i + 1])),
    [products],
  );

  /**
   * The board, cut into its catalogue headings.
   *
   * Driven by `categoryNames` rather than by whatever order the filtered array
   * arrives in, so Fish is always the first crossbar; a heading with nothing
   * under it is dropped instead of printing an empty rule.
   */
  const groups = useMemo(
    () =>
      categoryNames
        .map((name) => ({
          name,
          rows: filtered.filter((p) => p.category === name),
        }))
        .filter((g) => g.rows.length > 0),
    [filtered],
  );

  /**
   * Every term currently narrowing the board, in one list.
   *
   * Each carries its own undo, so an over-narrowed board is recovered by
   * dropping the term that caused it rather than by clearing everything and
   * starting again.
   */
  const applied = [
    q && {
      key: "q",
      label: t("applied.search", { term: query.trim() }),
      clear: () => setQuery(""),
    },
    filters.category && {
      key: "category",
      label: t(`categories.${filters.category}`),
      clear: () => setFilters((f) => ({ ...f, category: null })),
    },
    filters.water && {
      key: "water",
      label: t(`waters.${filters.water}`),
      clear: () => setFilters((f) => ({ ...f, water: null })),
    },
    filters.prep && {
      key: "prep",
      label: tc(`${filters.prep}.title`),
      clear: () => setFilters((f) => ({ ...f, prep: null })),
    },
  ].filter(Boolean) as { key: string; label: string; clear: () => void }[];

  /**
   * What each option would yield, counted against the *other* axes only.
   *
   * Excluding an option's own axis is what makes the numbers useful: with
   * "Red Sea" picked, the Gulf still shows what switching to it would give,
   * rather than the zero it scores against a filter it contradicts.
   */
  const counts = useMemo<Counts>(() => {
    const base = products.filter(matchesQuery);

    const byCategory = (p: Product) =>
      !filters.category || p.category === filters.category;
    const byWater = (p: Product) => !filters.water || p.waters === filters.water;
    const byPrep = (p: Product) =>
      !filters.prep || p.preparation.includes(filters.prep);

    const otherThanCategory = base.filter((p) => byWater(p) && byPrep(p));
    const otherThanWater = base.filter((p) => byCategory(p) && byPrep(p));
    const otherThanPrep = base.filter((p) => byCategory(p) && byWater(p));

    return {
      category: Object.fromEntries(
        categoryNames.map((c) => [
          c,
          otherThanCategory.filter((p) => p.category === c).length,
        ]),
      ) as Record<Category, number>,
      water: Object.fromEntries(
        WATERS.map((w) => [w, otherThanWater.filter((p) => p.waters === w).length]),
      ) as Record<Waters, number>,
      prep: Object.fromEntries(
        PREPARATIONS.map((k) => [
          k,
          otherThanPrep.filter((p) => p.preparation.includes(k)).length,
        ]),
      ) as Record<Preparation, number>,
      allCategory: otherThanCategory.length,
      allWater: otherThanWater.length,
      allPrep: otherThanPrep.length,
    };
  }, [products, matchesQuery, filters]);

  const activeCount = applied.length;

  const reset = () => {
    setQuery("");
    setFilters(EMPTY);
  };

  const count = t("countLabel", {
    shown: filtered.length,
    total: products.length,
  });

  /* The drawer is a modal surface: it locks the page behind it, closes on
     Escape, and takes focus when it opens.

     That last part is the one that matters. Without it, focus stays on the
     trigger — now behind the scrim — and the next Tab walks the whole board
     before arriving at the filters the visitor just asked for, because the
     drawer is last in the DOM. This places focus and gives it back on close; it
     is not a full trap, and the nav drawer still has the same gap. */
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!drawerOpen) return;

    const opener = document.activeElement as HTMLElement | null;
    drawerRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDrawerOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      opener?.focus?.();
    };
  }, [drawerOpen]);

  /* One panel description, mounted in two places. Each mount is its own
     component instance, so the `useId` inside it gives each a distinct set of
     heading ids rather than duplicating them across the document. */
  const panel = (
    <FilterPanel
      query={query}
      onQuery={setQuery}
      filters={filters}
      onFilters={setFilters}
      counts={counts}
    />
  );

  /* Badge digits are decoration; the count reaches assistive tech as a sentence
     through the sibling `sr-only` line instead. */
  const badge =
    activeCount > 0 ? (
      <>
        <span
          aria-hidden="true"
          className="numeral grid h-5 w-5 place-items-center bg-oxide text-[12px] leading-none text-limewash"
        >
          {activeCount}
        </span>
        <span className="sr-only">{t("activeFilters", { count: activeCount })}</span>
      </>
    ) : null;

  return (
    <div className="bg-tide pt-10 pb-20 md:pt-14 lg:pb-28">
      {/* ---------- the utility bar ----------
          Sticky under the header, and the only thing on screen at every scroll
          position: how much is left, the way back into the filters, the way
          out of them. Struck top and bottom, with ice above it so the hero
          band's drips have somewhere to fall.

          Nothing wrapping goes in here: its height is baked into `RAIL_TOP`. */}
      <div
        className="sticky z-30 border-y-2 border-tar bg-tide/92 backdrop-blur-sm"
        style={{ top: HEADER }}
      >
        <div className="container-x">
          <div className="flex items-center gap-4 py-3.5">
            {/* mobile: opens the drawer */}
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="inline-flex shrink-0 items-center gap-2.5 border-2 border-tar px-4 py-2.5 text-[13px] font-semibold text-tar transition-colors hover:bg-tar hover:text-limewash focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-oxide lg:hidden"
            >
              <SlidersHorizontal aria-hidden="true" className="h-4 w-4" />
              {t("filtersOpen")}
              {badge}
            </button>

            {/* desktop: exists only while the column is away */}
            {railClosed && (
              <button
                type="button"
                onClick={() => setRailClosed(false)}
                className="hidden shrink-0 items-center gap-2.5 border-2 border-tar px-4 py-2.5 text-[13px] font-semibold text-tar transition-colors hover:bg-tar hover:text-limewash focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-oxide lg:inline-flex"
              >
                <SlidersHorizontal aria-hidden="true" className="h-4 w-4" />
                {t("showFilters")}
                {badge}
              </button>
            )}

            {/* The count is the filter's only feedback, so it announces rather
                than changing silently. Live on the visible element instead of a
                second sr-only copy: one string, one announcement, no drift
                between what is read out and what is on screen.

                Struck in paint, not ochre: the ochre cut of `draft-mark` measures
                about 1.9:1 on this ice field, and of everything on the page this
                is the line that has to be readable. */}
            <p
              className="draft-mark-tar text-[13px]"
              aria-live="polite"
              aria-atomic="true"
            >
              {count}
            </p>

            {activeCount > 0 && (
              <button
                type="button"
                onClick={reset}
                className="ms-auto inline-flex shrink-0 items-center gap-1.5 text-[13px] font-semibold text-oxide underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-oxide"
              >
                <X aria-hidden="true" className="h-3.5 w-3.5" />
                {t("clear")}
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="container-x pt-10 lg:pt-14">
        <div
          className={`grid gap-x-10 gap-y-10 ${
            railClosed ? "lg:grid-cols-1" : "lg:grid-cols-[286px_minmax(0,1fr)]"
          }`}
        >
          {/* ---------- the column ----------
              Hidden outright when closed, so it leaves the tab order rather
              than sitting off-canvas and still reachable. Below `lg` it is
              never this element that shows the filters — the drawer is — so it
              resolves to a single display class at every width instead of two
              competing ones whose winner would depend on stylesheet order. */}
          <aside
            aria-label={t("filtersTitle")}
            className={
              railClosed
                ? "hidden"
                : "hidden self-start lg:sticky lg:block lg:overflow-y-auto lg:overscroll-contain lg:pb-6 lg:pe-1"
            }
            style={
              railClosed
                ? undefined
                : { top: RAIL_TOP, maxHeight: `calc(100svh - ${RAIL_TOP + 20}px)` }
            }
          >
            <div className="flex items-center justify-between gap-4 pb-4">
              <h2 className="label text-tar/65">{t("filtersTitle")}</h2>
              <button
                type="button"
                onClick={() => setRailClosed(true)}
                className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-tar/70 transition-colors hover:text-oxide focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-oxide"
              >
                <PanelLeftClose aria-hidden="true" className="rtl-flip h-4 w-4" />
                {t("hideFilters")}
              </button>
            </div>

            {panel}
          </aside>

          {/* ---------- the board ---------- */}
          <div>
            {activeCount > 0 && <AppliedTerms terms={applied} />}

            {groups.length > 0 ? (
              /* Spacing between crossbars lives on the wrapper, not on the
                 sections: a `first:mt-0` here would silently stop applying the
                 moment the applied-terms strip appears above it, since the first
                 crossbar is then no longer the first child. */
              <div className="space-y-20 lg:space-y-24">
                {groups.map((g, gi) => {
                  /* The stagger runs across the whole board rather than
                     restarting at each crossbar, so the lines come in as one
                     sweep down the page instead of two. */
                  const before = groups
                    .slice(0, gi)
                    .reduce((n, x) => n + x.rows.length, 0);

                  return (
                    <Crossbar
                      key={g.name}
                      label={t(`categories.${g.name}`)}
                      tally={t("board.tally", { count: g.rows.length })}
                    >
                      <motion.div
                        layout
                        className={`grid gap-x-8 gap-y-12 lg:grid-cols-2 ${
                          railClosed ? "xl:grid-cols-3" : ""
                        }`}
                      >
                        {g.rows.map((p, i) => (
                          <BoardLine
                            key={p.slug}
                            product={p}
                            index={before + i}
                            lot={lots.get(p.slug) ?? 0}
                            lead={i === 0}
                          />
                        ))}
                      </motion.div>
                    </Crossbar>
                  );
                })}
              </div>
            ) : (
              /* The empty state, on the same struck rule the crossbars use so it
                 reads as the board with nothing on it rather than as an error
                 panel. Recovery is the terms above — this only carries the
                 blunt instrument. */
              <div className="border-t-2 border-tar bg-salt px-6 py-20 text-center md:py-28">
                <h2 className="display-md text-tar">{t("empty.title")}</h2>
                <p className="mx-auto mt-5 max-w-[44ch] text-[15px] leading-[1.75] text-tar/75">
                  {t("empty.copy", { total: products.length })}
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

            <p className="mt-16 max-w-2xl text-[13.5px] leading-[1.7] text-tar/70">
              {t("note")}
            </p>
          </div>
        </div>
      </div>

      {/* ---------- the drawer ----------
          Mounted only while open, so nothing behind the page edge is tabbable
          when it is shut. It comes in from the reading edge, which flips with
          the locale. */}
      <AnimatePresence>
        {drawerOpen && (
          <div className="fixed inset-0 z-60 lg:hidden">
            <motion.button
              type="button"
              aria-label={t("filtersClose")}
              onClick={() => setDrawerOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0 w-full cursor-default bg-tar/55"
            />

            <motion.div
              ref={drawerRef}
              tabIndex={-1}
              role="dialog"
              aria-modal="true"
              aria-label={t("filtersTitle")}
              initial={{ x: isRtl ? "100%" : "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: isRtl ? "100%" : "-100%" }}
              transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-y-0 start-0 flex w-[min(21rem,88vw)] flex-col bg-tide shadow-lift outline-none"
            >
              <div className="flex items-center justify-between gap-4 border-b-2 border-tar px-5 py-4">
                <h2 className="font-display text-[20px] leading-none uppercase text-tar">
                  {t("filtersTitle")}
                </h2>
                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  aria-label={t("filtersClose")}
                  className="grid h-10 w-10 shrink-0 place-items-center border-2 border-tar/20 text-tar transition-colors hover:border-tar focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-oxide"
                >
                  <X aria-hidden="true" className="h-4.5 w-4.5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-5">
                {panel}
              </div>

              {/* The count repeats here because the live copy in the bar is
                  behind an `aria-modal` surface while this is open. Not a
                  second live region — one announcement is enough. */}
              <div className="border-t-2 border-tar px-5 py-4">
                <p className="draft-mark-tar text-[12.5px]">{count}</p>
                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  className="mt-3 w-full bg-oxide py-3.5 text-[14px] font-semibold text-limewash transition-colors hover:bg-oxide-lit focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-tar"
                >
                  {t("filtersClose")}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------ */

/**
 * What is currently narrowing the board, written above it.
 *
 * A labelled group rather than a heading: "Showing" names a set of controls, and
 * putting it in the document outline between the filter column and the first
 * catalogue heading would add a level that describes nothing. Same
 * `role="group"` + `aria-labelledby` pairing the filter axes use, one rung down.
 *
 * Each term is its own undo. The accessible name is the whole instruction —
 * "Remove Red Sea" — because "Showing / Red Sea / ✕" read out as three
 * fragments tells a screen-reader user what the state is but not what the button
 * does.
 */
function AppliedTerms({
  terms,
}: {
  terms: { key: string; label: string; clear: () => void }[];
}) {
  const t = useTranslations("Shop");
  const id = useId();

  return (
    <div
      role="group"
      aria-labelledby={id}
      className="mb-10 flex flex-wrap items-center gap-x-2.5 gap-y-2 border-b border-tar/15 pb-6"
    >
      <p id={id} className="label me-1 text-tar/65">
        {t("applied.title")}
      </p>
      {terms.map((a) => (
        <button
          key={a.key}
          type="button"
          onClick={a.clear}
          aria-label={t("applied.remove", { term: a.label })}
          className="label inline-flex items-center gap-2 border border-tar/30 bg-salt py-1.5 pe-2.5 ps-3 text-tar transition-colors hover:border-tar hover:bg-tar hover:text-limewash focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-oxide"
        >
          {a.label}
          <X aria-hidden="true" className="h-3.5 w-3.5 opacity-60" />
        </button>
      ))}
    </div>
  );
}

/**
 * A catalogue heading, struck as a painted crossbar.
 *
 * The heading, its tally, and a 2px rule that draws itself from the reading edge
 * — the site's one motion idea (`animate-waterline`, whose origin flips in RTL),
 * used here at its plainest. It runs once on mount rather than on every filter
 * change: a rule that re-strikes on each click would be a page full of movement
 * in a surface people click through quickly, and the count in the bar already
 * carries the feedback.
 *
 * The rule is the board's structure, and it is the reason the ladder does not
 * need a card border anywhere: the horizontals are the grid.
 */
function Crossbar({
  label,
  tally,
  children,
}: {
  label: string;
  tally: string;
  children: React.ReactNode;
}) {
  const id = useId();

  return (
    <section aria-labelledby={id}>
      <div className="flex items-end justify-between gap-5">
        <h2 id={id} className="display-md text-tar">
          {label}
        </h2>
        <p className="draft-mark-tar pb-1.5 text-[12.5px] whitespace-nowrap">
          {tally}
        </p>
      </div>

      <div aria-hidden="true" className="animate-waterline mt-3 h-[2px] bg-tar" />

      <div className="mt-10">{children}</div>
    </section>
  );
}

/**
 * The three axes, written out in full.
 *
 * A `salt` plate on the `tide` field — the same relationship the board's rungs
 * have with the ground, so the column reads as another object on the counter
 * rather than a chrome panel bolted to the side.
 */
function FilterPanel({
  query,
  onQuery,
  filters,
  onFilters,
  counts,
}: {
  query: string;
  onQuery: (v: string) => void;
  filters: Filters;
  onFilters: (fn: (f: Filters) => Filters) => void;
  counts: Counts;
}) {
  const t = useTranslations("Shop");
  const tc = useTranslations("Cuts");
  const uid = useId();

  return (
    <div className="bg-salt">
      {/* search
          The clear button appears only with something to clear, and it is a real
          button rather than `type="search"`: the browser's own cross is styled by
          the user agent, sits outside the palette, and does not exist at all in
          Firefox. */}
      <div className="relative border-b-2 border-tar/15 focus-within:border-tar">
        <Search
          aria-hidden="true"
          className="pointer-events-none absolute start-4 top-1/2 h-4 w-4 -translate-y-1/2 text-tar/50"
        />
        <input
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          placeholder={t("searchPlaceholder")}
          aria-label={t("searchLabel")}
          className={`w-full bg-transparent py-4 ps-11 text-[14.5px] text-tar outline-none placeholder:text-tar/65 ${
            query ? "pe-12" : "pe-4"
          }`}
        />
        {query && (
          <button
            type="button"
            onClick={() => onQuery("")}
            aria-label={t("searchClear")}
            className="absolute end-2 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center text-tar/60 transition-colors hover:text-oxide focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-oxide"
          >
            <X aria-hidden="true" className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* heading */}
      <FilterGroup id={`${uid}-cat`} label={t("categoryLabel")}>
        <Option
          active={filters.category === null}
          count={counts.allCategory}
          onClick={() => onFilters((f) => ({ ...f, category: null }))}
        >
          {t("allCategories")}
        </Option>
        {categoryNames.map((c) => (
          <Option
            key={c}
            active={filters.category === c}
            count={counts.category[c]}
            onClick={() =>
              onFilters((f) => ({ ...f, category: f.category === c ? null : c }))
            }
          >
            {t(`categories.${c}`)}
          </Option>
        ))}
      </FilterGroup>

      {/* water */}
      <FilterGroup id={`${uid}-water`} label={t("waterLabel")}>
        <Option
          active={filters.water === null}
          count={counts.allWater}
          onClick={() => onFilters((f) => ({ ...f, water: null }))}
        >
          {t("allWaters")}
        </Option>
        {WATERS.map((w) => (
          <Option
            key={w}
            active={filters.water === w}
            count={counts.water[w]}
            onClick={() =>
              onFilters((f) => ({ ...f, water: f.water === w ? null : w }))
            }
          >
            {t(`waters.${w}`)}
          </Option>
        ))}
      </FilterGroup>

      {/* cut — the axis none of the competitors offer, and the diagrams stay
          here because at this size they are a control, not decoration. The board
          prints the same vocabulary as words: at the 24px a line could spare, a
          dashed cross-cut and an opened belly are the same grey smudge. */}
      <FilterGroup id={`${uid}-cut`} label={t("prepLabel")}>
        <Option
          active={filters.prep === null}
          count={counts.allPrep}
          onClick={() => onFilters((f) => ({ ...f, prep: null }))}
        >
          {t("allPreps")}
        </Option>
        {PREPARATIONS.map((k) => (
          <Option
            key={k}
            active={filters.prep === k}
            count={counts.prep[k]}
            onClick={() =>
              onFilters((f) => ({ ...f, prep: f.prep === k ? null : k }))
            }
            icon={<CutDiagram cut={k} className="h-3.5 w-7 shrink-0" />}
          >
            {tc(`${k}.title`)}
          </Option>
        ))}
      </FilterGroup>
    </div>
  );
}

function FilterGroup({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section
      role="group"
      aria-labelledby={id}
      className="border-b border-tar/12 px-4 py-5 last:border-b-0"
    >
      <h3 id={id} className="label px-1 text-tar/65">
        {label}
      </h3>
      <div className="mt-3">{children}</div>
    </section>
  );
}

/**
 * One option, one line, and the number it would leave on the board.
 *
 * Selected rows are filled tar plates — the same treatment the active chip had,
 * kept because it is the strongest state the palette has and the only one that
 * survives at 13px. Zero-count rows are muted rather than disabled: a buyer
 * mid-narrowing sometimes wants to jump to the empty combination and back out
 * through the empty state, and a disabled row makes that a dead end. Muted in
 * ink rather than in opacity — `opacity-45` on this ground measured about 2.45:1,
 * which is not a legible control at any size, and the count beside it is the
 * whole reason the row exists.
 */
function Option({
  active,
  count,
  onClick,
  icon,
  children,
}: {
  active: boolean;
  count: number;
  onClick: () => void;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  const t = useTranslations("Shop");

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`flex w-full items-center gap-2.5 px-3 py-2.5 text-start text-[13.5px] font-semibold transition-colors focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-oxide ${
        active
          ? "bg-tar text-limewash"
          : `hover:bg-tar/6 ${count === 0 ? "text-tar/65" : "text-tar/85"}`
      }`}
    >
      {icon}
      <span className="min-w-0 flex-1 truncate">{children}</span>
      {/* The count reaches assistive tech as a phrase and the digits themselves
          are hidden, so the button announces "Red Sea, 6 lines" rather than the
          bare "Red Sea 6" — or, as before, "Red Sea" with the count dropped
          entirely, which took the whole point of the number away from anyone not
          looking at it. */}
      <span className="sr-only">{t("board.tally", { count })}</span>
      <span
        aria-hidden="true"
        className={`numeral shrink-0 text-[12px] tabular-nums ${
          active ? "text-limewash/55" : "text-tar/70"
        }`}
      >
        {count}
      </span>
    </button>
  );
}
