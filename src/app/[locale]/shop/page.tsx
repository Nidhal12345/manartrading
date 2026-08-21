import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import ShopHero from "@/components/ShopHero";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import { categoryNames, products } from "@/data/products";

/**
 * Metadata is generated rather than exported flat, because the flat version was
 * English on the Arabic route — a static `export const metadata` cannot see the
 * locale. Next 16 hands `params` in as a Promise and sync access to it is gone
 * entirely, so it is awaited here; and the two cannot coexist in one segment, so
 * the old `metadata` object had to go rather than sit alongside this.
 *
 * The line count is interpolated from the catalogue instead of written into the
 * string, which is also how the old description's "delivered same day" came out:
 * `PRODUCT.md` records delivery timing as unverified, and a search result is the
 * last place to make a promise the site cannot stand behind.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Shop" });

  return {
    title: t("meta.title"),
    description: t("meta.description", { lines: products.length }),
  };
}

/**
 * The counter.
 *
 * THESIS — a fish counter's day board rendered as a listing, which is the one
 * thing this page has to be. The catch is set in a uniform grid so two lines can
 * be compared, and the board survives in the structure around it: painted
 * crossbars for the two headings, a tally on each, a lot numeral on every tile,
 * and the counter's own till struck across the foot of every photograph. What
 * this business can prove on its own page is exactly what is on the ice right
 * now, so the page counts rather than claims.
 *
 * OWN-WORLD — inherited, not replaced. The boatyard palette, the two script
 * pairs, the waterline and the stencil marks are the site's existing world; this
 * redesign recomposes the shop inside it and adds exactly one type step
 * (`board-display`) and one colour cut of an existing mark (`draft-mark-tar`),
 * both justified in `globals.css` at the point of definition.
 *
 * STORY — the page falls through three fields, and the sequence is the argument:
 * the navy hull of the masthead (what this is) → the `tide` ice field the grid
 * runs on (the catch, ruled, numbered, and orderable) → `hull` cobalt again for
 * the three things worth knowing before you order. Paint, water, paint. Both
 * navy fields are closed by the site's waterline, so the ice is held between two
 * struck lines and the page reads as one hull rather than three stacked bands.
 *
 * WHAT CAME OFF — the filters, entirely. There were three axes (water, cut,
 * heading), then two, then one; now none. The reasoning compounded at each step
 * and finishes here: this catalogue is sixteen lines long, two headings deep, and
 * every line is a photograph. A filter apparatus over sixteen photographs is
 * chrome — a sticky bar, a 286px column, a modal drawer, a search box, an applied
 * -terms strip, an empty state, and fourteen strings of interface copy, all to
 * spare a visitor one flick of the thumb. The grid it was narrowing does the job
 * on its own, and taking it out gave the page back a quarter of its measure, a
 * fourth column at `xl`, and its entire client bundle: this route is now server
 * -rendered apart from the tiles themselves.
 *
 * The headings stayed, and with the filters gone they carry the whole structure:
 * a painted crossbar and a tally are how "where do the fish stop and the
 * shellfish start" gets answered, and they are the page's only navigation.
 *
 * FIRST VIEWPORT — on a phone: the masthead's navy, the headline at painted
 * -signage scale, one sentence of standfirst, and the boot-top handing down to
 * the first tile. No decorative photograph above sixteen photographs of the
 * actual fish, no eyebrow pushing the headline down the screen, no figures
 * counting the list before the list, and no toolbar between the two.
 *
 * FORM — assigned structure 6 of the concept seed (`660f829e`): the measured
 * ladder, now holding a grid rather than uneven rungs. Numbers are still the
 * ordering device — a lot numeral on every tile, a tally on each crossbar — and
 * every one of them is counted off `products.ts` at build time. Not one figure on
 * this page is written by hand, which is the only way a page like this is allowed
 * to use numbers structurally under `PRODUCT.md` principle 5.
 *
 * FINISH — every string runs through `next-intl` in both locales; logical
 * properties throughout, so the grid, the crossbar rules and the waterlines all
 * flip with `dir`; motion is one idea (rules striking from the reading edge, plus
 * a single entrance sweep down the tiles) and the global `prefers-reduced-motion`
 * rule zeroes it.
 *
 * Two of the three answers below used to assert figures `PRODUCT.md` records as
 * unverified — "around 60% of our volume goes to kitchens" and a 20 kg trade
 * minimum. The trade answer now says the terms are set per kitchen, which is true
 * and is what the client can stand behind on the first call.
 *
 * The first answer names the five cuts, and it stays: there it is a service the
 * counter performs on request, not a filter or a badge, and it is the one place a
 * shopper who has not opened a product page yet learns the cutting is free.
 */
const BEFORE = ["prep", "size", "trade"] as const;

export default async function ShopPage() {
  const t = await getTranslations("Shop");

  /**
   * The catch, cut into its catalogue headings.
   *
   * Driven by `categoryNames` rather than by the order the array happens to
   * arrive in, so Fish is always the first crossbar, and a heading with nothing
   * under it is dropped instead of printing an empty rule.
   */
  const groups = categoryNames
    .map((name) => ({ name, rows: products.filter((p) => p.category === name) }))
    .filter((g) => g.rows.length > 0);

  return (
    <>
      <ShopHero />

      {/* ---------- the board ----------
          The ice, held between the masthead's waterline above and the cobalt
          section's below. */}
      <div className="bg-tide pt-14 pb-20 md:pt-20 lg:pb-28">
        <div className="container-x space-y-20 lg:space-y-24">
          {groups.map((g, gi) => {
            /* The entrance stagger runs across the whole page rather than
               restarting at each crossbar, so the tiles arrive as one sweep down
               the board instead of two. */
            const before = groups
              .slice(0, gi)
              .reduce((n, x) => n + x.rows.length, 0);
            const id = headingId(g.name);

            return (
              <section key={g.name} aria-labelledby={id}>
                {/* ---- the crossbar ----
                    The heading, its tally, and a 2px rule that draws itself from
                    the reading edge — the site's one motion idea
                    (`animate-waterline`, whose origin flips in RTL) at its
                    plainest. The rule is the page's structure, and it is the
                    reason the tiles need no card border anywhere: the
                    horizontals are the grid. */}
                <div className="flex items-end justify-between gap-5">
                  <h2 id={id} className="display-md text-tar">
                    {t(`categories.${g.name}`)}
                  </h2>
                  <p className="draft-mark-tar pb-1.5 text-[12.5px] whitespace-nowrap">
                    {t("board.tally", { count: g.rows.length })}
                  </p>
                </div>

                <div
                  aria-hidden="true"
                  className="animate-waterline mt-3 h-[2px] bg-tar"
                />

                {/* Two-up on a phone, which is the width at which a 4:5 studio
                    frame still reads as a species and two of them can be
                    compared without scrolling. Three from `md`, four from `xl` —
                    a tile lands at roughly 280–300px at every step. The count no
                    longer drops back at `lg`: there is no filter column to take
                    286px off the measure.

                    `auto-rows-fr` makes every row as tall as the tallest tile in
                    the whole grid rather than the tallest in its own row, so all
                    sixteen tiles are exactly the same size — a name that wraps
                    to three lines no longer makes its row taller than the one
                    above it. `ProductCard` is a full-height flex column and
                    sends the slack to one place. */}
                <div className="mt-10 grid auto-rows-fr grid-cols-2 gap-x-5 gap-y-10 sm:gap-x-7 sm:gap-y-14 md:grid-cols-3 xl:grid-cols-4">
                  {g.rows.map((p, i) => (
                    <ProductCard key={p.slug} product={p} index={before + i} />
                  ))}
                </div>
              </section>
            );
          })}

          <p className="max-w-2xl text-[13.5px] leading-[1.7] text-tar/70">
            {t("note")}
          </p>
        </div>
      </div>

      {/* ---------- before you order ----------
          The three questions a counter is actually asked before an order is
          placed, on the cobalt field that brings the boatyard's paint back under
          the ice.

          It was three equal cells in a gap-px grid, each opened by a big ochre
          01 / 02 / 03. Both went. The numerals implied a sequence that does not
          exist — these are three independent answers, not steps, and the page
          above earns its numerals by counting real things. And three same-size
          boxes made the questions look like features when they are the closing
          reassurance: they are a ruled list now, the same horizontals the board
          is built from, with the questions set as the largest thing in the
          section because the questions are what a visitor scans for. */}
      <section className="relative bg-hull py-24 text-limewash md:py-28">
        <div className="container-x">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.5fr)] lg:gap-20">
            <Reveal blur={false}>
              <h2 className="display-md max-w-[16ch] text-balance text-limewash lg:sticky lg:top-28">
                {t("before.title")}
              </h2>
            </Reveal>

            <div className="border-t border-limewash/25">
              {BEFORE.map((key, i) => (
                <Reveal key={key} blur={false} delay={i * 0.08}>
                  <div className="border-b border-limewash/25 py-8 md:py-10">
                    <h3 className="font-display text-[21px] leading-[1.15] uppercase text-limewash md:text-[24px] rtl:leading-[1.4]">
                      {t(`before.${key}.q`)}
                    </h3>
                    <p className="mt-4 max-w-[62ch] text-[15px] leading-[1.8] text-limewash/75 rtl:leading-[2]">
                      {t(`before.${key}.a`)}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="waterline absolute inset-x-0 bottom-0"
          style={{ ["--waterline" as string]: "var(--color-hull)" }}
        />
      </section>
    </>
  );
}

/**
 * `"Crustaceans & Seafood"` → `"heading-crustaceans-seafood"`.
 *
 * The crossbars used to take their `aria-labelledby` from `useId`, which is what
 * forced the whole board to be a Client Component. Derived from the heading name
 * instead: the categories are a closed set of distinct names in `products.ts`, so
 * this is stable across the server render and unique on the page.
 */
function headingId(name: string): string {
  return `heading-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`;
}
