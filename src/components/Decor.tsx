import type { ReactNode } from "react";
import Reveal from "./Reveal";

/**
 * Section opener: the headline in the display face, optionally over a painted
 * index numeral and a stencilled eyebrow on a hard rule.
 *
 * The index is set as a draft mark — the stencilled depth scale on a hull — so
 * the numbers that run down a page belong to the same world as the grade ladders
 * on the product pages.
 *
 * Both are optional, and on the home page both are gone. A numbered run earns its
 * keep on `about`, where the page is one continuous argument and the numeral tells
 * a reader how far through it they are. On the home page it was doing the
 * opposite: eight sections, each already separated by its own painted field and
 * its own waterline, and above every headline a small-caps label saying in two
 * words what the headline said properly in five — "The range" over "Everything we
 * carry, named". The label pushed the headline down the screen in order to restate
 * it, and the numeral counted sections nobody reads in sequence. Headline first
 * now, on every section of that page.
 *
 * With neither, the top row is not rendered at all rather than left as a bare
 * hairline. The rule was there to finish the measure beside the label; with no
 * label there is nothing for it to finish.
 *
 * This used to animate its headline with `SplitText`. That now fires on the hero
 * alone: per-character animation on every heading is the tic the redesign is
 * getting rid of, and it made the whole page feel like it was being typed.
 */
export function SectionIntro({
  index,
  eyebrow,
  title,
  copy,
  align = "left",
  light = false,
  className = "",
}: {
  index?: string;
  eyebrow?: string;
  title: string;
  copy?: string;
  align?: "left" | "center";
  /** Set on a `tar` or `hull` field, where the type inverts to limewash. */
  light?: boolean;
  className?: string;
}) {
  const centered = align === "center";
  const opener = Boolean(index || eyebrow);

  return (
    <div
      className={`${centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"} ${className}`}
    >
      {opener && (
        <Reveal blur={false}>
          <div
            className={`flex items-center gap-4 ${centered ? "justify-center" : ""}`}
          >
            {index && <span className="draft-mark text-[12.5px]">{index}</span>}
            {eyebrow && (
              <span
                className={`label ${light ? "text-limewash/60" : "text-rope"}`}
              >
                {eyebrow}
              </span>
            )}
            <span
              className={`h-px flex-1 ${light ? "bg-limewash/20" : "bg-tar/20"} ${
                centered ? "max-w-16" : ""
              }`}
            />
          </div>
        </Reveal>
      )}

      <Reveal blur={false} delay={opener ? 0.08 : 0}>
        <h2
          className={`display-lg ${opener ? "mt-6" : ""} ${
            light ? "text-limewash" : "text-tar"
          }`}
        >
          {title}
        </h2>
      </Reveal>

      {copy && (
        <Reveal delay={opener ? 0.16 : 0.08}>
          <p
            className={`mt-6 text-[16px] leading-relaxed ${
              light ? "text-limewash/70" : "text-tar/70"
            }`}
          >
            {copy}
          </p>
        </Reveal>
      )}
    </div>
  );
}

/** Hairline-separated stat or fact row. */
export function FactRow({ children }: { children: ReactNode }) {
  return (
    <div className="grid gap-px border-y border-tar/15 bg-tar/15 sm:grid-cols-2 lg:grid-cols-4">
      {children}
    </div>
  );
}

/**
 * The trade name on a bilingual name board.
 *
 * A painted transom carries both scripts, and every board on this site does the
 * same — but the pair has to be *the other script*, not the same one twice. The
 * headline is already translated, so in Arabic this plate has to letter the
 * Latin trade name; printing `t("arabic")` beside an Arabic title gave boards
 * that read الأسماك next to الأسماك, and on the five cuts it was the identical
 * word rendered twice.
 *
 * `latin-plate` rather than `font-display`: the RTL rule in globals.css swaps
 * `.font-display` to Reem Kufi, which carries no Latin glyphs, so Latin set with
 * that utility drops to a system fallback in Arabic. Same exception the numerals
 * already take.
 */
export function TradeName({
  latin,
  arabic,
  isRtl,
  className = "",
}: {
  latin: string;
  arabic: string;
  isRtl: boolean;
  className?: string;
}) {
  return isRtl ? (
    <span dir="ltr" lang="en" className={`latin-plate ${className}`}>
      {latin}
    </span>
  ) : (
    <span dir="rtl" lang="ar" className={`font-arabic-display ${className}`}>
      {arabic}
    </span>
  );
}
