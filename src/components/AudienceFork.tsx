import Photo from "./ui/Photo";
import { Link } from "@/i18n/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";
import { TradeName } from "./Decor";
import { products, type Waters } from "@/data/products";

/**
 * The fork: three waters in, two doors out.
 *
 * This is the one section on the site that none of the competitor sites can
 * copy without changing their business model — all six are single-funnel DTC.
 * Manar sells to households *and* to trade kitchens, and PRODUCT.md records
 * blending the two into one journey as a known failure mode. So the split
 * happens here, and the two doors stay the same size: PRODUCT.md is explicit
 * that neither audience is the secondary one, and any layout that ranks them —
 * unequal widths, one primary button and one text link — decides a question the
 * business has not decided.
 *
 * It reads on light ground now. It is the only light passage between the cobalt
 * of how-it-works above and the tar of the counter below, so `tide` is the
 * field and the two doors are `salt` plates standing on it — meltwater and a
 * scrubbed counter top. The cobalt drips falling out of the section above land
 * in pale blue rather than on warm limewash, which is the better landing for
 * them.
 *
 * It opens without an index numeral or an eyebrow, and it is the only section
 * on the page that does. Both are deliberate. A fork is a branch off the
 * argument the numbered run is making, not the next step in it — the same
 * reasoning that already keeps the best-seller shelf out of the numbering — and
 * the section that asks the reader to choose is the wrong one to introduce with
 * the same three-part opener as the five around it. The numbered run closes up
 * behind it: the counter is 03 and the questions are 04.
 *
 * The doors are not numbered either, for the same reason they are the same
 * width. 01 and 02 read as an order.
 *
 * What carried over from the painted version: the two paths are colour-coded
 * and stay colour-coded for the rest of the site — cobalt is the household
 * path, verdigris the trade one — and each plate still ends on its own
 * waterline, so the paint running onto the ice is the door's own.
 *
 * Neither door claims a minimum, a delivery window or a response time. Those
 * are open questions, and the FAQ further down says so plainly rather than
 * inventing figures. The waters strip is the one piece of proof the section
 * makes, and it is read off the catalogue at build time rather than written
 * into the copy: it can only ever name water the shop actually carries.
 */

/** Home coast first, then the other one, then everything else. */
const WATER_ORDER: readonly Waters[] = ["Red Sea", "Arabian Gulf", "Imported"];

const doors = [
  {
    key: "table",
    href: "/shop",
    image: "grilledLeaf",
    /** Cobalt: the household path, here and on every surface after it. */
    ink: "text-hull",
    paint: "var(--color-hull)",
  },
  {
    key: "kitchen",
    href: "/contact",
    image: "cuttingLoin",
    /** The AA-safe cut of the verdigris, so the ink holds at 14px on `salt`. */
    ink: "text-verdigris-deep",
    paint: "var(--color-verdigris-deep)",
  },
] as const;

export default async function AudienceFork() {
  const t = await getTranslations("Fork");
  /** The water names are already translated for the shop's filter rail. */
  const tw = await getTranslations("Shop.waters");
  const isRtl = (await getLocale()) === "ar";

  const waters = WATER_ORDER.filter((w) => products.some((p) => p.waters === w));

  return (
    <section className="bg-tide pb-24 pt-24 md:pb-32 md:pt-32">
      <div className="container-x">
        {/* The headline and the paragraph sit on one baseline rather than
            stacking, so the section opens across the page instead of down it. */}
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:items-end lg:gap-16">
          <Reveal blur={false}>
            <h2 className="display-lg max-w-[13ch] text-balance text-tar">
              {t("title")}
            </h2>
          </Reveal>

          <Reveal blur={false} delay={0.1}>
            <p className="max-w-xl text-[16.5px] leading-[1.85] text-tar/75 rtl:leading-[2.05]">
              {t("copy")}
            </p>
          </Reveal>
        </div>

        {/* ---------- the manifest ---------- */}

        {/* The sourcing claim, made in the only form this business can prove:
            the three values the catalogue's `Waters` union is typed to, filtered
            down to the ones actually on the shelf. No counts, no supplier names,
            no figures — the headline says three waters, and this is the three. */}
        <Reveal blur={false} delay={0.16}>
          <div className="mt-16 md:mt-20">
            <div className="flex items-center gap-4">
              <span className="label text-tar/70">{t("watersLabel")}</span>
              <span aria-hidden="true" className="h-px flex-1 bg-tar/20" />
            </div>

            {/* Hairlines drawn by the 1px gap, so they land in both axes at
                every breakpoint without a first-child exception. */}
            <dl className="mt-6 grid gap-px border-t-2 border-tar bg-tar/15 sm:grid-cols-3">
              {waters.map((w) => (
                <div key={w} className="bg-tide px-6 py-7 md:px-7">
                  <dt className="font-display text-[25px] leading-none text-tar md:text-[28px]">
                    {tw(w)}
                  </dt>
                  <dd className="mt-3.5 text-[14px] leading-relaxed text-tar/70">
                    {t(`waters.${w}`)}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>

        {/* ---------- the two doors ---------- */}

        <div className="mt-16 grid gap-12 md:mt-20 lg:grid-cols-2 lg:gap-9">
          {doors.map((door, i) => (
            <Reveal key={door.key} blur={false} delay={i * 0.1}>
              <article className="group flex h-full flex-col">
                <div className="relative aspect-[4/3] overflow-hidden sm:aspect-[16/10]">
                  <Photo
                    image={door.image}
                    res={1200}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.04]"
                  />
                </div>

                {/* The plate is slid onto the photograph rather than stacked
                    under it — inset from the reading edge, overlapping upward,
                    and hard-edged in the door's own paint along the top. Two
                    boxes in a column would have been a card; this is a plate on
                    a counter. */}
                <div
                  className="relative -mt-14 ms-5 flex flex-1 flex-col bg-salt p-7 md:-mt-16 md:ms-8 md:p-9"
                  style={{ borderBlockStart: `3px solid ${door.paint}` }}
                >
                  <TradeName
                    latin={t(`${door.key}.latin`)}
                    arabic={t(`${door.key}.arabic`)}
                    isRtl={isRtl}
                    className={`text-[13.5px] leading-none ${door.ink}`}
                  />

                  <h3 className="display-md mt-6 max-w-[14ch] text-tar">
                    {t(`${door.key}.title`)}
                  </h3>

                  <p className="mt-5 max-w-md text-[15.5px] leading-[1.8] text-tar/75 rtl:leading-[2]">
                    {t(`${door.key}.copy`)}
                  </p>

                  {/* Ruled rows rather than bulleted ones: the manifest above is
                      set the same way, so the whole section reads as one board
                      with entries on it. */}
                  <ul className="mt-8 border-t border-tar/15 text-[14.5px] leading-snug text-tar/80">
                    {(["p1", "p2", "p3"] as const).map((p) => (
                      <li key={p} className="border-b border-tar/15 py-3.5">
                        {t(`${door.key}.${p}`)}
                      </li>
                    ))}
                  </ul>

                  {/* Pinned to the floor of the plate so both doors' actions sit
                      on the same line however long the copy runs — and both are
                      the same oxide button, because ranking them here would be
                      answering a question PRODUCT.md leaves open. */}
                  <div className="mt-auto pt-9">
                    <Link
                      href={door.href}
                      className="inline-flex items-center justify-between gap-5 bg-oxide py-3.5 pe-3.5 ps-6 text-[15px] font-semibold text-limewash transition-colors hover:bg-oxide-lit focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ochre"
                    >
                      {t(`${door.key}.cta`)}
                      <ArrowUpRight
                        aria-hidden="true"
                        className="h-4 w-4 shrink-0 transition-transform duration-500 group-hover:rotate-45 rtl-flip"
                      />
                    </Link>
                  </div>

                  {/* Each plate ends on its own paint. Both colours run onto
                      `tide`, which is light enough to show them — the rule the
                      whole page is laid out around. */}
                  <div
                    aria-hidden="true"
                    className="waterline absolute inset-x-0 bottom-0"
                    style={{ ["--waterline" as string]: door.paint }}
                  />
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
