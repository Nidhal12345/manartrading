import type { ReactNode } from "react";
import Reveal from "./Reveal";

/**
 * Section opener: painted index numeral, stencilled eyebrow, hard rule, then the
 * headline in the display face.
 *
 * The index is set as a draft mark — the stencilled depth scale on a hull — so
 * the numbers that run down the page belong to the same world as the grade
 * ladders on the product pages.
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
  eyebrow: string;
  title: string;
  copy?: string;
  align?: "left" | "center";
  /** Set on a `tar` or `hull` field, where the type inverts to limewash. */
  light?: boolean;
  className?: string;
}) {
  const centered = align === "center";

  return (
    <div
      className={`${centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"} ${className}`}
    >
      <Reveal blur={false}>
        <div
          className={`flex items-center gap-4 ${centered ? "justify-center" : ""}`}
        >
          {index && <span className="draft-mark text-[12.5px]">{index}</span>}
          <span className={`label ${light ? "text-limewash/60" : "text-rope"}`}>
            {eyebrow}
          </span>
          <span
            className={`h-px flex-1 ${light ? "bg-limewash/20" : "bg-tar/20"} ${
              centered ? "max-w-16" : ""
            }`}
          />
        </div>
      </Reveal>

      <Reveal blur={false} delay={0.08}>
        <h2
          className={`display-lg mt-6 ${light ? "text-limewash" : "text-tar"}`}
        >
          {title}
        </h2>
      </Reveal>

      {copy && (
        <Reveal delay={0.16}>
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
