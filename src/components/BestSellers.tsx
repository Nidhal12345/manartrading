import { getTranslations } from "next-intl/server";
import { ArrowUpRight, MessageCircle } from "lucide-react";

import Reveal from "./Reveal";
import BestSellerCarousel from "./BestSellerCarousel";
import { Link } from "@/i18n/navigation";
import { whatsappHref } from "@/lib/contact";
import type { Badge, Waters } from "@/data/products";
import type { ImageKey } from "@/lib/images";

/**
 * One best-selling line, flattened on the server.
 *
 * A plain object rather than a `Product`: the carousel below is a client
 * component, so anything on this type crosses into the bundle. Passing the
 * catalogue row would ship each line's grade table and nutrition panel in order
 * to print six cards. Same discipline as `ShowcaseCard`.
 */
export type BestSellerLine = {
  slug: string;
  /** Latin name, parenthetical alternates already trimmed by the page mapper. */
  name: string;
  arabic: string;
  image: ImageKey;
  waters: Waters;
  /** Translated through `Shop.badges.*`; absent where the line carries none. */
  badge?: Badge;
};

/**
 * The counter's own shelf — the six lines it is asked for by name.
 *
 * It sits directly under the hero because the hero deliberately says nothing
 * about fish: its top band is empty cobalt and its field is a hauled hull. The
 * question a first-time visitor actually arrives with is "do you carry Hamour",
 * and until this section existed the answer was five viewports down the page.
 *
 * Cobalt, which pays that empty topsides band back — the hero's paint continues
 * into the first section of the page proper — and the cards are chalk, so the
 * shelf reads as boards laid on a painted hull.
 *
 * One viewport tall, and the rail takes whatever height the heading and the
 * closing row leave it. That is why the section is a flex column with a `min-h-0`
 * middle: the cards size to the space rather than the section growing to fit the
 * cards. `min-h-*` rather than a hard `h-screen` because a short landscape phone
 * would otherwise crush the photographs to nothing.
 *
 * What this section does not print, and why:
 *
 *   - no rank, units sold, rating or review count. PRODUCT.md forbids
 *     manufactured credibility, and the catalogue's review figures are
 *     hash-generated placeholders.
 *   - no price. There is no cart here and the counter quotes by the kilo on the
 *     day, so each card carries the waters the line comes from instead.
 */
export default async function BestSellers({
  lines,
  total,
}: {
  lines: BestSellerLine[];
  /** Lines on the counter in all, so the shop link can size itself honestly. */
  total: number;
}) {
  const t = await getTranslations("Best");

  // A dropped slug costs the section a card, not the build — see `bestSellers()`.
  if (lines.length === 0) return null;

  return (
    <section className="relative flex min-h-screen flex-col bg-hull py-16 text-limewash md:py-20">
      <div className="container-x flex min-h-0 flex-1 flex-col">
        <div className="flex shrink-0 flex-wrap items-end justify-between gap-x-12 gap-y-5">
          <Reveal blur={false}>
            <h2 className="display-lg text-limewash">{t("title")}</h2>
          </Reveal>

          <Reveal blur={false} delay={0.1}>
            <p className="max-w-md text-[15px] leading-relaxed text-limewash/70">
              {t("copy")}
            </p>
          </Reveal>
        </div>

        {/* The rail takes the height the heading and closing row leave it, but
            it is not allowed to vanish: `min-h-0` alone let the flex column
            squeeze the photographs to nothing on a short viewport, which is a
            100vh section with no pictures in it. The floor wins over the
            viewport when the two disagree, which is why the section is
            `min-h-screen` and not `h-screen`. */}
        <div className="mt-10 min-h-0 flex-1 md:mt-12">
          <BestSellerCarousel lines={lines} />
        </div>

        <Reveal blur={false} delay={0.2}>
          <div className="mt-10 shrink-0 md:mt-12">
            {/* The hard 2px painted rule — the section closes on the same edge
                every board on this site does. */}
            <div aria-hidden="true" className="h-0.5 w-full bg-limewash/80" />

            <div className="flex flex-col gap-3 pt-6 sm:flex-row sm:flex-wrap sm:items-center sm:justify-end">
              <a
                href={whatsappHref(t("whatsappMessage"))}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 border border-limewash/35 px-6 py-3.5 text-[14.5px] font-semibold text-limewash/90 transition-colors duration-500 hover:border-limewash hover:text-limewash focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ochre"
              >
                <MessageCircle aria-hidden="true" className="h-4 w-4 shrink-0" />
                {t("askCta")}
              </a>

              <Link
                href="/shop"
                className="group inline-flex items-center justify-between gap-4 bg-oxide py-3.5 pe-4 ps-6 text-[14.5px] font-semibold text-limewash transition-colors duration-500 hover:bg-oxide-lit focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ochre"
              >
                {t("allCta", { total })}
                <ArrowUpRight
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0 transition-transform duration-500 group-hover:rotate-45 rtl-flip"
                />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>

      {/* The section hands off on its own paint, so the cobalt runs down into
          whatever field comes next. */}
      <div
        aria-hidden="true"
        className="waterline absolute inset-x-0 bottom-0"
        style={{ ["--waterline" as string]: "var(--color-hull)" }}
      />
    </section>
  );
}
