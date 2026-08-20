import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import ShopHero from "@/components/ShopHero";
import ShopClient from "@/components/ShopClient";
import Reveal from "@/components/Reveal";
import { PREPARATIONS, categoryNames, products } from "@/data/products";

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
 * THESIS — a fish counter's day board, not a product listing. The catch is
 * ruled, numbered and tallied like a chalked-up manifest at the quay, because the
 * one thing this business can prove on its own page is exactly what is on the ice
 * right now.
 *
 * OWN-WORLD — inherited, not replaced. The boatyard palette, the two script
 * pairs, the waterline and the stencil marks are the site's existing world; this
 * redesign recomposes the shop inside it and adds exactly one type step
 * (`board-display`) and one colour cut of an existing mark (`draft-mark-tar`),
 * both justified in `globals.css` at the point of definition.
 *
 * STORY — the page falls through four fields, and the sequence is the argument:
 * `limewash` masthead (what this is) → a full-bleed `tar` manifest band with the
 * counted figures struck in signwriter's ochre (the shape of the list, proved
 * rather than claimed) → the site's waterline dripping off the paint onto the
 * `tide` ice field, where the board itself runs (the catch, ruled and numbered)
 * → `hull` cobalt for the three things worth knowing before you order.
 *
 * FIRST VIEWPORT — on a phone: the headline at painted-signage scale, one
 * sentence of standfirst, and the first counted figures of the dark band. No
 * decorative photograph above sixteen photographs of the actual fish, and no
 * eyebrow pushing the headline down the screen.
 *
 * FORM — assigned structure 6 of the concept seed (`660f829e`): the measured
 * ladder. Numbers are the ordering device throughout — lot numerals on the rungs,
 * a tally on each crossbar, facet counts on every control — and every one of them
 * is counted off `products.ts` at build or render time. Not one figure on this
 * page is written by hand, which is the only way a page like this is allowed to
 * lead with numbers under `PRODUCT.md` principle 5.
 *
 * FINISH — every string runs through `next-intl` in both locales; logical
 * properties throughout, so the board, the drawer and the waterline all flip with
 * `dir`; motion is one idea (rules striking from the reading edge, plus a single
 * entrance sweep) and the global `prefers-reduced-motion` rule zeroes it.
 *
 * Two of the three answers below used to assert figures `PRODUCT.md` records as
 * unverified — "around 60% of our volume goes to kitchens" and a 20 kg trade
 * minimum. The trade answer now says the terms are set per kitchen, which is true
 * and is what the client can stand behind on the first call.
 */
const BEFORE = ["prep", "size", "trade"] as const;

/**
 * The four figures in the masthead's manifest band, counted rather than written.
 *
 * Read off `products.ts` at build time so they cannot drift from what the
 * counter actually carries — and so none of them is a claim. Waters is derived
 * from the shelf rather than from the `Waters` union, because a water the
 * catalogue no longer stocks should not be counted as one it offers.
 */
function shopStats() {
  return {
    lines: products.length,
    headings: categoryNames.length,
    waters: new Set(products.map((p) => p.waters)).size,
    cuts: PREPARATIONS.length,
  };
}

export default async function ShopPage() {
  const t = await getTranslations("Shop");

  return (
    <>
      <ShopHero stats={shopStats()} />

      <ShopClient products={products} />

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
