import type { ReactNode } from "react";
import Reveal from "./Reveal";
import SplitText from "./ui/SplitText";

/**
 * Section opener: hairline rule, numbered micro-label, serif headline.
 * Used on every section so the page reads as one editorial system.
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
          {index && (
            <span
              className={`numeral text-[12.5px] ${light ? "text-aqua" : "text-ocean"}`}
            >
              {index}
            </span>
          )}
          <span className={`label ${light ? "text-bone/55" : "text-ink/45"}`}>
            {eyebrow}
          </span>
          <span
            className={`h-px flex-1 ${light ? "bg-white/15" : "bg-ink/12"} ${centered ? "max-w-16" : ""}`}
          />
        </div>
      </Reveal>

      <SplitText
        as="h2"
        text={title}
        className={`display-lg mt-7 block ${light ? "text-bone" : "text-ink"}`}
      />

      {copy && (
        <Reveal delay={0.16}>
          <p
            className={`mt-6 text-[16px] leading-relaxed ${
              light ? "text-bone/60" : "text-ink/60"
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
    <div className="grid gap-px border-y border-ink/12 bg-ink/12 sm:grid-cols-2 lg:grid-cols-4">
      {children}
    </div>
  );
}
