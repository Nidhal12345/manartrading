"use client";

import { motion } from "motion/react";
import { useLocale, useTranslations } from "next-intl";
import { MessageCircle } from "lucide-react";

import Photo from "./ui/Photo";
import { Link } from "@/i18n/navigation";
import { whatsappHref } from "@/lib/contact";
import type { Product } from "@/data/products";

/**
 * One line, as a card. There is exactly one of these now.
 *
 * The shop used to run a ruled ladder of uneven rungs — a wide lead plate under
 * each heading, then narrower ones beside it, each rung carrying the water it
 * came out of and the five cut words it takes. It read as a day sheet, which was
 * the point, and it lost on the two things a listing has to do: a shopper could
 * not compare two lines at a glance because no two lines were the same size, and
 * the phone had to scroll a paragraph of vocabulary per fish before reaching the
 * next photograph. Every counter worth studying — and the reference this
 * redesign was measured against — puts the catch in a uniform grid and lets the
 * photography do the sorting. So this is uniform: same tile, same crop, same
 * three lines of type, sixteen times.
 *
 * What came off the card, and where it went:
 *
 *   - **The water** ("Red Sea", "Arabian Gulf"). Provenance is a fact about the
 *     line, not a way of choosing between two of them at scan speed, and it was
 *     repeated on all sixteen cards. It now appears once, on the product's own
 *     spec sheet, and the home page still argues the three waters in prose.
 *   - **The cuts.** Same reasoning, more strongly: the cut is a decision made
 *     *after* you have picked the fish, so it belongs on the page where you pick
 *     the cut. The detail page's selector — the one with the stencil diagrams —
 *     is the preview of what the counter will do, and it is the only place the
 *     vocabulary appears now.
 *   - **The star rating and the review count.** `products.ts` derives both from
 *     a hash of the slug and `PRODUCT.md`'s fifth principle is never to
 *     manufacture credibility. They are gone from the last surface that printed
 *     them, along with `Shop.ratingLabel` and `Shop.reviewCount`.
 *
 * What stayed is what a fishmonger is actually asked: what it looks like, what
 * it is called in both scripts, and what species it is.
 *
 * The lot numeral stays too, and it is data rather than decoration — the line's
 * position on the spec sheet, fixed at build time, so the grid reads 01 … 16 in
 * catalogue order rather than in whatever order a layout happens to produce.
 *
 * ---------------------------------------------------------------------------
 * THE ORDER BAR, and why the card is built the way it is
 *
 * The tile carries a real WhatsApp order — the counter's actual till — struck
 * across the foot of the photograph. It is hidden below the frame at rest on a
 * pointer device and slides up on hover; on touch, where there is no hover and a
 * hidden control is simply a missing one, it is always up. That is the reference
 * counter's behaviour and it is the right behaviour: the whole business closes on
 * WhatsApp (`PRODUCT.md` principle 2), so the fastest path from *seeing the fish*
 * to *asking for it* should be one tap on the fish itself.
 *
 * This is why the card is no longer one big `<Link>`. A real anchor cannot be
 * nested inside another anchor — the HTML is invalid and browsers repair it by
 * closing the outer link early, which silently drops half the card out of the
 * link. So the card uses the stretched-link pattern instead: the tile is a
 * positioned `article`, the product link wraps the *heading* and grows a
 * transparent `::after` over the whole tile, and the order bar sits above that
 * overlay on its own layer. The result is two tab stops per tile, each with an
 * honest accessible name — "Hamour, Grouper…" and "Order Hamour on WhatsApp" —
 * where a nested pair would have given a keyboard two stops to one destination.
 *
 * The bar is `oxide` because `oxide` is the palette's only accent and it is
 * reserved for things you can act on; this is the most actionable thing on the
 * page. It names WhatsApp rather than saying "order" into the void, because a
 * control that leaves for another app should say which one, and it carries a
 * per-fish `aria-label` — sixteen controls reading "Order on WhatsApp" in a
 * screen reader's element list would be sixteen identical rows. That label
 * *appends* the fish rather than inserting it mid-phrase, so the visible text is
 * still a contiguous run inside the accessible name and a voice-control user who
 * says what they can see is understood (WCAG 2.5.3).
 * ---------------------------------------------------------------------------
 *
 * Used by the shop grid and by the related shelf on `shop/[slug]`, which is why
 * `sizes` is a prop: the two grids resolve to different column widths and
 * `next/image` cannot guess.
 */
export default function ProductCard({
  product: p,
  index = 0,
  sizes = "(max-width: 640px) 44vw, (max-width: 1280px) 31vw, 24vw",
}: {
  product: Product;
  /** Position in the *rendered* grid. Drives the entrance stagger only. */
  index?: number;
  /** Layout hint for `next/image`, per the grid this card is placed in. */
  sizes?: string;
}) {
  const t = useTranslations("Shop");
  const isRtl = useLocale() === "ar";

  const [head, alias] = splitName(p.name);

  /* The counter reads the message, so it goes out in the visitor's own script
     with the name the visitor has been looking at. Sending the Latin name to a
     shop that lists in Arabic — or the reverse — makes the first reply a
     clarifying question. */
  const spoken = isRtl ? p.arabic : head;

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.55,
        delay: Math.min(index * 0.04, 0.28),
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group relative flex h-full flex-col"
    >
      {/* ---- the lot rule ----
          The lot number and the counter's own stamp, struck on a hairline that
          runs the width of the tile. Grid rows share a top edge, so these rules
          line up across the columns and the grid still reads as a ruled board
          rather than as a set of tiles that happen to be adjacent — which is the
          one thing the ladder got right and worth keeping. */}
      <div className="flex items-center gap-2.5 border-t border-tar/25 pt-2 sm:gap-3 sm:pt-2.5">
        <span className="numeral shrink-0 text-[14px] leading-none text-tar sm:text-[15px]">
          {String(p.lot).padStart(2, "0")}
        </span>
        <span className="sr-only">{t("board.lot", { n: p.lot })}</span>

        <span aria-hidden="true" className="h-px flex-1 bg-tar/15" />

        {p.badge && (
          /* A stencilled stamp, not an action. It used to be an oxide plate
             sitting on the photograph, which spent the palette's only accent —
             reserved for things you can click — on a label, and put paint over
             the fish. The accent is on the order bar now, where it belongs. */
          <span className="label shrink-0 bg-tar px-1.5 py-1 text-[10px] text-limewash sm:px-2 sm:text-[11px]">
            {t(`badges.${p.badge}`)}
          </span>
        )}
      </div>

      {/* ---- the fish ----
          The only thing on the card with an edge, and the reason the grid is
          uniform: sixteen identical crops can be compared, sixteen different
          ones cannot. Frameless on the `tide` field — the studio set is a
          consistent flat-lay on pale ice, so the shot carries its own ground
          and a `salt` plate under it would only add chrome.

          4:5 is the source ratio of every frame in the set (1122 × 1402), so
          the crop takes nothing off the animal.

          `rounded-[5%]` is the one corner radius on the site, and it is a
          percentage rather than a pixel value so the softening reads the same at
          every column count — a 14px radius that looks right on a 280px desktop
          tile is a heavy bevel on a 165px phone tile. On a 4:5 box the corner is
          very slightly taller than it is wide, which is what a percentage radius
          does and is imperceptible at 5%. The frame already clipped its
          photograph, so the order bar's bottom corners follow the curve for
          free. */}
      <div className="relative mt-2.5 aspect-[4/5] overflow-hidden rounded-[5%] bg-tide sm:mt-3">
        <Photo
          image={p.image}
          res={900}
          sizes={sizes}
          className="object-cover transition-transform duration-[1.1s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
        />

        {/* The till. `z-20` lifts it clear of the stretched product link's
            overlay, which is later in the document and would otherwise sit on
            top of it and swallow the tap.

            Up at rest, down only from `lg` — `translate-y-full` is scoped to the
            breakpoint rather than to a hover query because tablets straddle
            both, and a control that hides itself on a device with no hover is a
            control that does not exist. `group-focus-within` is what brings it
            back for a keyboard on desktop; without it the bar would take focus
            while parked out of sight below the frame. */}
        <a
          href={whatsappHref(t("orderMessage", { name: spoken }))}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t("orderLabel", { name: spoken })}
          className="label absolute inset-x-0 bottom-0 z-20 flex translate-y-0 items-center justify-center gap-2 bg-oxide px-3 py-2.5 text-[10.5px] text-limewash transition-[transform,background-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-oxide-lit focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-ochre sm:px-4 sm:py-3 sm:text-[11.5px] lg:translate-y-full lg:group-focus-within:translate-y-0 lg:group-hover:translate-y-0"
        >
          <MessageCircle aria-hidden="true" className="h-3.5 w-3.5" />
          {t("orderCta")}
        </a>
      </div>

      {/* ---- the name board ----
          The reader's own script at display scale — an Arabic visitor scanning
          sixteen lines should be reading Arabic, not skimming Latin for a
          transliteration. The second script stays underneath as the trade
          name, the way a painted transom carries both, because the counter
          quotes in both.

          The heading holds the link, and the link's `::after` is what makes the
          whole tile clickable. Anchored on the `article`, so it covers the lot
          rule, the photograph and all three lines of type. */}
      <h3
        className={`mt-3 text-tar sm:mt-4 ${
          isRtl
            ? "font-arabic-display text-[19px] leading-[1.25] sm:text-[22px] lg:text-[24px]"
            : "font-display text-[20px] leading-[0.98] uppercase sm:text-[23px] lg:text-[26px]"
        }`}
      >
        <Link
          href={`/shop/${p.slug}`}
          className="transition-colors duration-300 group-hover:text-oxide after:absolute after:inset-0 after:content-[''] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-oxide"
        >
          {isRtl ? p.arabic : head}

          {/* Four lines carry a second market name in brackets — "Kingfish
              (Spanish Mackerel)". At display scale in a two-up phone grid that
              parenthetical is what makes the name wrap three deep, so it is set
              as its own line at trade-name size. Still inside the heading, so it
              is still part of the link's accessible name. */}
          {!isRtl && alias && (
            <span className="mt-1 block text-[12.5px] leading-[1.15] font-normal tracking-[0.02em] text-tar/55 sm:text-[13px]">
              {alias}
            </span>
          )}
        </Link>
      </h3>

      <p
        dir={isRtl ? "ltr" : "rtl"}
        lang={isRtl ? "en" : "ar"}
        className={`mt-1.5 leading-none text-tar/60 ${
          isRtl
            ? "latin-plate text-[12.5px] sm:text-[13.5px]"
            : "font-arabic-display text-[13px] sm:text-[14px]"
        }`}
      >
        {isRtl ? p.name : p.arabic}
      </p>

      {/* The binomial, which is the same string in both locales and the one
          line on the card a trade buyer checks before anything else. Forced
          LTR and onto the Latin sans: Zain and Reem Kufi are the Arabic pair,
          and a species name is Latin by nature, not by locale.

          `mt-auto` is what makes the tiles uniform. Names run one, two or three
          lines and four of the sixteen carry a bracketed second market name, so
          the block above this is a different height on every card; pushing the
          binomial to the foot of a full-height flex column sends all of that
          slack to one place and lands every species line on the same baseline
          across the row. The grid supplies the equal heights (`auto-rows-fr`),
          this decides where the difference goes. */}
      <p
        dir="ltr"
        lang="la"
        className="mt-auto pt-2 font-sans text-[11.5px] italic text-tar/60 sm:text-[12.5px]"
      >
        {p.scientific}
      </p>
    </motion.article>
  );
}

/**
 * `"Kingfish (Spanish Mackerel)"` → `["Kingfish", "Spanish Mackerel"]`.
 *
 * Split rather than stripped: the bracketed name is the one some buyers know the
 * fish by, so it is demoted on the card, not dropped. Names without brackets
 * come back untouched with a null alias.
 */
function splitName(name: string): [string, string | null] {
  const m = /^(.*?)\s*\((.+)\)\s*$/.exec(name);
  return m ? [m[1], m[2]] : [name, null];
}
