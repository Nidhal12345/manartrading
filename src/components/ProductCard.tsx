"use client";

import { motion } from "motion/react";
import { Star } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import Photo from "./ui/Photo";
import { Link } from "@/i18n/navigation";
import type { Product } from "@/data/products";

/**
 * Two ways of putting a line on a page, and they are deliberately not the same
 * component.
 *
 * `BoardLine` is the shop board's entry: a ruled rung on a counter's day sheet.
 * `ProductCard` is the frameless photo tile, and it stays exactly as it was
 * because `shop/[slug]` renders three of them on its related shelf — a surface
 * outside this redesign's scope. One component with a variant flag would have put
 * the two anatomies in one `if`; two exports keep each one legible and make it
 * impossible to change the detail page by editing the shop.
 */

/* ------------------------------------------------------------------ *
 * The board line
 * ------------------------------------------------------------------ */

/**
 * One rung on the ladder: the lot rule, the fish, and what the counter will do
 * to it.
 *
 * The board used to be a 3-up grid of photo tiles — the arrangement every
 * competitor ships, and one that spends a phone screen per fish while telling a
 * buyer nothing but the name. A rung is horizontal instead: the photograph holds
 * the leading edge at a size that still reads as a species, and the space beside
 * it carries the four facts a fishmonger is actually asked for — what it is
 * called in both scripts, what it is, which water it came out of, and which cuts
 * it will take.
 *
 * The lot numeral is data, not decoration. It is the line's position on the spec
 * sheet, fixed at build time, so it does not renumber when the board is filtered:
 * a narrowed board reads 03 / 06 / 11 with gaps, which is what a crossed-off day
 * sheet looks like and is a truer picture of "six of sixteen" than a re-counted
 * 1-2-3 would be. It also makes reading order unambiguous once the ladder runs in
 * two columns, which is the reason the number is allowed on the page at all.
 *
 * Two things came back that the tile had dropped, both because a rung has room
 * for them where a tile did not: the water (provenance, and the thing that
 * separates a Farasan grouper from an imported bream) and the cut vocabulary.
 * The cuts are set as words rather than as the stencil diagrams: at the 24px the
 * rung could spare, a dashed cross-cut and an opened belly are the same grey
 * smudge. The diagrams stay in the filter column, where they are a control.
 *
 * One thing did not come back. The star rating and review count are gone from
 * this anatomy: `products.ts` derives both from a hash of the slug, `PRODUCT.md`
 * records them as placeholder, and its fifth principle is never to manufacture
 * credibility. The old card carried them anyway "because the shop grid was
 * designed against a reference that leads with it". The board leads with the
 * catch instead, and the row those five stars occupied now holds the species and
 * the cuts — real catalogue data in the slot invented data used to fill.
 */
export function BoardLine({
  product: p,
  index = 0,
  lot,
  lead = false,
}: {
  product: Product;
  /** Position in the *filtered* board. Drives the entrance stagger only. */
  index?: number;
  /** Position on the spec sheet, 1-based. Stable under filtering. */
  lot: number;
  /** The first line under a heading, which takes the board's wide plate. */
  lead?: boolean;
}) {
  const t = useTranslations("Shop");
  const tc = useTranslations("Cuts");
  const isRtl = useLocale() === "ar";

  const cuts = p.preparation.map((k) => tc(`${k}.title`));

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.55,
        delay: Math.min(index * 0.04, 0.28),
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`group ${lead ? "lg:col-span-2" : ""}`}
    >
      <Link
        href={`/shop/${p.slug}`}
        className="block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-oxide"
      >
        {/* ---- the lot rule ----
            Lot number, water, and the counter's own stamp, struck on a hairline
            that runs the width of the rung. Grid rows share a top edge, so these
            rules line up across the columns and the board reads as one ruled
            ladder rather than as a set of tiles that happen to be adjacent. */}
        <div
          className={`flex items-center gap-3 border-t border-tar/25 pt-2.5 ${
            lead ? "border-tar/45" : ""
          }`}
        >
          <span className="numeral shrink-0 text-[15px] leading-none text-tar">
            {String(lot).padStart(2, "0")}
          </span>
          <span className="sr-only">{t("board.lot", { n: lot })}</span>

          <span className="label min-w-0 truncate text-tar/70">
            {t(`waters.${p.waters}`)}
          </span>

          <span aria-hidden="true" className="h-px flex-1 bg-tar/15" />

          {p.badge && (
            /* A stencilled stamp, not an action. It used to be an oxide plate
               sitting on the photograph, which spent the palette's only accent —
               reserved for things you can click — on a label, and put paint over
               the fish. */
            <span className="label shrink-0 bg-tar px-2 py-1 text-limewash">
              {t(`badges.${p.badge}`)}
            </span>
          )}
        </div>

        <div
          className={
            lead
              ? "mt-4 grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-8"
              : "mt-4 grid grid-cols-[minmax(0,0.82fr)_minmax(0,1fr)] gap-4 sm:gap-5"
          }
        >
          {/* ---- the fish ----
              The only thing on the rung with an edge. The tile is frameless and
              stands on the `tide` field: the studio set is a consistent flat-lay
              on pale ice, so the shot carries its own ground and a `salt` plate
              under it would only add chrome. */}
          <div
            className={`relative overflow-hidden bg-tide ${
              lead ? "aspect-[16/11] lg:aspect-[4/3]" : "aspect-[4/5]"
            }`}
          >
            <Photo
              image={p.image}
              res={lead ? 1200 : 900}
              sizes={
                lead
                  ? "(max-width: 1024px) 100vw, 42vw"
                  : "(max-width: 640px) 40vw, (max-width: 1024px) 30vw, 20vw"
              }
              className="object-cover transition-transform duration-[1.1s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
            />
          </div>

          <div className="min-w-0">
            <NamePlate p={p} isRtl={isRtl} lead={lead} />

            {/* The binomial, which is the same string in both locales and the one
                line on the rung that a trade buyer checks before anything else.
                Forced LTR and onto the Latin sans: Zain and Reem Kufi are the
                Arabic pair, and a species name is Latin by nature, not by
                locale. */}
            <p
              dir="ltr"
              lang="la"
              className={`font-sans italic text-tar/65 ${
                lead ? "mt-2.5 text-[13.5px]" : "mt-2 text-[12.5px]"
              }`}
            >
              {p.scientific}
            </p>

            {/* The lead line gets the one sentence of copy on the board. Sixteen
                taglines is noise at scan speed; two — one under each heading — is
                a voice. */}
            {lead && (
              <p className="mt-4 max-w-[42ch] text-[15px] leading-[1.7] text-tar/75 rtl:leading-[1.95]">
                {p.tagline}
              </p>
            )}

            {/* ---- what it takes ----
                The third axis, written on every line. `sr-only` carries it as one
                sentence so the separators are not spelled out. */}
            <p className={lead ? "mt-5" : "mt-3"}>
              <span className="sr-only">
                {t("board.cuts", { list: cuts.join(", ") })}
              </span>
              <span
                aria-hidden="true"
                className="flex flex-wrap items-center gap-x-2 gap-y-1.5"
              >
                {cuts.map((cut, i) => (
                  <span key={cut} className="flex items-center gap-2">
                    {i > 0 && <span className="text-tar/25">/</span>}
                    <span className="label text-[10px] text-tar/70">{cut}</span>
                  </span>
                ))}
              </span>
            </p>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

/**
 * The name board.
 *
 * The reader's own script is the one set at display scale — an Arabic visitor
 * scanning sixteen lines should be reading Arabic, not skimming Latin for a
 * transliteration. The second script stays underneath as the trade name, the way
 * a painted transom carries both, because the counter quotes in both.
 */
function NamePlate({
  p,
  isRtl,
  lead,
}: {
  p: Product;
  isRtl: boolean;
  lead: boolean;
}) {
  const primary = isRtl ? p.arabic : p.name;
  const secondary = isRtl ? p.name : p.arabic;

  return (
    <>
      <h3
        className={`text-tar transition-colors duration-300 group-hover:text-oxide ${
          isRtl
            ? `font-arabic-display leading-[1.25] ${
                lead ? "text-[32px] md:text-[40px]" : "text-[22px]"
              }`
            : `font-display uppercase leading-[0.98] ${
                lead ? "text-[34px] md:text-[44px]" : "text-[23px]"
              }`
        }`}
      >
        {primary}
      </h3>
      <p
        dir={isRtl ? "ltr" : "rtl"}
        lang={isRtl ? "en" : "ar"}
        className={`mt-1.5 leading-none text-tar/65 ${
          isRtl ? "latin-plate" : "font-arabic-display"
        } ${lead ? "text-[16px]" : "text-[13.5px]"}`}
      >
        {secondary}
      </p>
    </>
  );
}

/* ------------------------------------------------------------------ *
 * The photo tile
 * ------------------------------------------------------------------ */

/**
 * A line as a frameless photo tile: the photograph, and the name under it.
 *
 * Kept as-is for the related shelf on `shop/[slug]`, which is the only surface
 * that still renders it. Photograph-led, in the order a fishmonger's grid is
 * scanned — you recognise the fish, then read what it is called.
 *
 * PLACEHOLDER — READ BEFORE LAUNCH: the star rating and review count are
 * hash-derived stand-ins from `products.ts`, and `PRODUCT.md` ("Never
 * manufacture credibility") is the reason no other surface prints them. The shop
 * board dropped this row in the redesign; the detail page's shelf is outside that
 * scope, so it still carries it. The row is the one self-contained block below,
 * so it comes out in a single deletion the day the client cannot supply real
 * review figures — and that deletion should take `Shop.ratingLabel` and
 * `Shop.reviewCount` with it, since nothing else uses them.
 */
export default function ProductCard({
  product: p,
  index = 0,
}: {
  product: Product;
  index?: number;
}) {
  const t = useTranslations("Shop");
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
        className="block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-oxide"
      >
        {/* ---- the fish ----
            The tile, and the only thing on the card with an edge. */}
        <div className="relative aspect-[4/5] overflow-hidden bg-tide">
          <Photo
            image={p.image}
            res={900}
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover transition-transform duration-[1.1s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
          />

          {p.badge && (
            <span className="label absolute end-0 top-4 bg-oxide px-3 py-1.5 text-limewash">
              {t(`badges.${p.badge}`)}
            </span>
          )}
        </div>

        {/* ---- the rating ----
            The placeholder block. See the note above the component. */}
        <div className="mt-4 flex items-center gap-2">
          <Stars rating={p.rating} />
          <span className="sr-only">{t("ratingLabel", { rating: p.rating })}</span>
          <span className="text-[12.5px] leading-none text-tar/70">
            {t("reviewCount", { count: p.reviews })}
          </span>
        </div>

        {/* ---- the name ---- */}
        <h3
          className={`mt-2.5 text-tar transition-colors duration-300 group-hover:text-oxide ${
            isRtl
              ? "font-arabic-display text-[25px] leading-[1.3]"
              : "font-display text-[24px] leading-[1.04] uppercase"
          }`}
        >
          {primary}
        </h3>
        <p
          className={`mt-1.5 leading-none text-tar/60 ${
            isRtl ? "latin-plate text-[14px]" : "font-arabic-display text-[14px]"
          }`}
          dir={isRtl ? "ltr" : "rtl"}
        >
          {secondary}
        </p>
      </Link>
    </motion.article>
  );
}

/**
 * Five painted stars, filled to the rating.
 *
 * Two identical rows stacked, the top one clipped to the score — the only way to
 * draw a fractional star without a second half-star glyph, and it holds at any
 * decimal the catalogue later carries. `dir="ltr"` because the clip is geometry,
 * not text: a rating fills from the same side in both locales, the way the
 * tabular numerals elsewhere on the site stay on the Latin display face.
 *
 * Decorative throughout — the score reaches assistive tech as a sentence from
 * the `sr-only` line beside it.
 */
function Stars({ rating }: { rating: number }) {
  const pct = (Math.min(5, Math.max(0, rating)) / 5) * 100;

  return (
    <span dir="ltr" aria-hidden="true" className="relative inline-flex shrink-0">
      <StarRow className="text-tar/25" />
      <span
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - pct}% 0 0)` }}
      >
        <StarRow className="text-tar" />
      </span>
    </span>
  );
}

function StarRow({ className }: { className: string }) {
  return (
    <span className={`flex gap-[2px] ${className}`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} className="h-3.5 w-3.5" fill="currentColor" />
      ))}
    </span>
  );
}
