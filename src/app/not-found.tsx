import en from "../../messages/en.json";
import ar from "../../messages/ar.json";
import { fontVariables } from "./fonts";
import "./globals.css";

/**
 * The global 404, rebuilt in the boatyard.
 *
 * This file renders outside the `[locale]` tree, so it has no request locale and
 * no `next-intl` context — a URL that matched no route also told us nothing about
 * which language the visitor wanted. Rather than guess, or fall back to English
 * and treat Arabic as the translation, the page carries both doors side by side
 * and the messages are imported straight from the catalogues. That keeps the copy
 * in `messages/*.json` with everything else instead of hardcoding it here.
 *
 * It renders its own `<html>` and `<body>` (the root layout only passes children
 * through, and `[locale]/layout.tsx` is what normally supplies the document), so
 * the font variables have to be applied here too.
 */

const DOORS = [
  {
    locale: "en",
    dir: "ltr",
    label: "English",
    display: "font-display",
    t: en.NotFound,
  },
  {
    locale: "ar",
    dir: "rtl",
    label: "العربية",
    display: "font-arabic-display",
    t: ar.NotFound,
  },
] as const;

export default function NotFound() {
  return (
    <html lang="en" className={fontVariables}>
      <body className="bg-tar">
        <main className="relative flex min-h-screen flex-col bg-tar text-limewash">
          <div className="container-x flex flex-1 flex-col justify-center py-24">
            <span className="draft-mark text-[13px]">{en.NotFound.code}</span>

            <div className="mt-10 grid gap-px bg-limewash/15 md:grid-cols-2">
              {DOORS.map((d) => (
                <section
                  key={d.locale}
                  lang={d.locale}
                  dir={d.dir}
                  className="bg-tar px-7 py-9 md:px-9 md:py-11"
                >
                  <span className="label text-ochre">{d.label}</span>

                  <h1
                    className={`${d.display} mt-6 max-w-[15ch] text-[clamp(1.9rem,4vw,2.9rem)] leading-[1.05] font-bold text-limewash rtl:leading-[1.35]`}
                  >
                    {d.t.title}
                  </h1>

                  <p className="mt-5 max-w-sm text-[15px] leading-[1.8] text-limewash/70 rtl:leading-[2]">
                    {d.t.copy}
                  </p>

                  <div className="mt-9 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-7">
                    <a
                      href={`/${d.locale}/shop`}
                      className="bg-oxide px-7 py-4 text-[15px] font-semibold text-limewash transition-colors hover:bg-oxide-lit focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ochre"
                    >
                      {d.t.shop}
                    </a>
                    <a
                      href={`/${d.locale}`}
                      className="border-b-2 border-limewash/35 pb-1.5 text-[15px] font-semibold text-limewash transition-colors hover:border-ochre hover:text-ochre focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ochre"
                    >
                      {d.t.home}
                    </a>
                  </div>
                </section>
              ))}
            </div>
          </div>

          {/* Tar above, cobalt below, the paint running down over the join —
              the same edge the rest of the site is divided on. */}
          <div
            aria-hidden="true"
            className="waterline absolute inset-x-0 bottom-0"
          />
        </main>

        <div className="flex h-20 items-center bg-hull">
          <div className="container-x flex items-baseline justify-between gap-6">
            <span className="numeral text-[17px] tracking-wide text-limewash/80">
              MANAR TRADING
            </span>
            <span
              className="font-arabic-display text-[15px] text-limewash/60"
              dir="rtl"
              lang="ar"
            >
              منار التجارية
            </span>
          </div>
        </div>
      </body>
    </html>
  );
}
