import { Link } from "@/i18n/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { ArrowUpRight, Minus } from "lucide-react";
import Reveal from "./Reveal";
import { SectionIntro, TradeName } from "./Decor";

/**
 * The fork: two doors, side by side, equal weight.
 *
 * This is the one section on the site that none of the competitor sites can
 * copy without changing their business model — all six are single-funnel DTC.
 * Manar sells to households *and* to trade kitchens, and PRODUCT.md records
 * blending the two into one journey as a known failure mode. So the split
 * happens here, second section, before anyone has been asked to browse.
 *
 * The two paths are colour-coded and stay colour-coded for the rest of the
 * site: cobalt is the household path, verdigris the trade one. Each door is a
 * painted plate that ends on its own waterline, so the drips falling onto the
 * limewash are the door's own paint.
 *
 * Neither door claims a minimum, a delivery window or a response time. Those are
 * open questions — the FAQ further down says so plainly rather than inventing
 * figures.
 */
export default async function AudienceFork() {
  const t = await getTranslations("Fork");
  const isRtl = (await getLocale()) === "ar";

  const doors = [
    {
      key: "table",
      index: "01",
      href: "/shop",
      field: "bg-hull",
      hover: "group-hover:bg-hull-lit",
      waterline: "var(--color-hull)",
      points: ["table.p1", "table.p2", "table.p3"],
    },
    {
      key: "kitchen",
      index: "02",
      href: "/contact",
      field: "bg-verdigris-deep",
      hover: "group-hover:bg-verdigris",
      waterline: "var(--color-verdigris-deep)",
      points: ["kitchen.p1", "kitchen.p2", "kitchen.p3"],
    },
  ] as const;

  return (
    <section className="bg-limewash pb-20 pt-24 md:pb-28 md:pt-32">
      <div className="container-x">
        <SectionIntro
          index="01"
          eyebrow={t("eyebrow")}
          title={t("title")}
          copy={t("copy")}
        />

        <div className="mt-14 grid gap-7 lg:mt-16 lg:grid-cols-2 lg:gap-8">
          {doors.map((door, i) => (
            <Reveal key={door.key} blur={false} delay={i * 0.1}>
              <article className="group relative flex h-full flex-col">
                <div
                  className={`flex flex-1 flex-col p-8 text-limewash transition-colors duration-500 md:p-10 ${door.field} ${door.hover}`}
                >
                  <div className="flex items-baseline justify-between gap-5">
                    <span className="draft-mark text-[12.5px]">
                      {door.index}
                    </span>
                    <TradeName
                      latin={t(`${door.key}.latin`)}
                      arabic={t(`${door.key}.arabic`)}
                      isRtl={isRtl}
                      className="text-[14px] leading-none text-limewash/55"
                    />
                  </div>

                  <h3 className="display-md mt-9 max-w-[16ch] text-limewash">
                    {t(`${door.key}.title`)}
                  </h3>

                  <p className="mt-5 max-w-sm text-[15.5px] leading-[1.8] text-limewash/75 rtl:leading-[2]">
                    {t(`${door.key}.copy`)}
                  </p>

                  <ul className="mt-9 space-y-3.5 border-t border-limewash/20 pt-7 text-[14.5px] text-limewash/85">
                    {door.points.map((p) => (
                      <li key={p} className="flex gap-3.5">
                        <Minus
                          aria-hidden="true"
                          className="mt-2 h-3 w-3 shrink-0 text-ochre"
                        />
                        <span>{t(p)}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Pinned to the floor of the plate so both doors' actions sit
                      on the same line however long the copy runs. */}
                  <div className="mt-auto pt-11">
                    <Link
                      href={door.href}
                      className="inline-flex items-center gap-3 border-b-2 border-limewash/35 pb-2 text-[15px] font-semibold text-limewash transition-colors hover:border-ochre hover:text-ochre focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ochre"
                    >
                      {t(`${door.key}.cta`)}
                      <ArrowUpRight
                        aria-hidden="true"
                        className="h-4 w-4 shrink-0 transition-transform duration-500 group-hover:translate-x-0.5 rtl-flip"
                      />
                    </Link>
                  </div>
                </div>

                {/* Each plate ends on its own paint, so the two doors read as two
                    sections of hull rather than two web cards. */}
                <div
                  aria-hidden="true"
                  className="waterline absolute inset-x-0 bottom-0"
                  style={{ ["--waterline" as string]: door.waterline }}
                />
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
