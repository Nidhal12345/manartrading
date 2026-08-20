import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import Reveal from "./Reveal";

/**
 * The board's masthead, and the manifest struck across its base.
 *
 * What this replaced, and why. The old opener was a headline beside a framed
 * 4:3 photograph with four figures boxed underneath it, all on the same `tide`
 * field the board below runs on. Three things were wrong with it:
 *
 *   - **The photograph was the seventeenth fish.** Directly beneath it sit
 *     sixteen studio frames of the actual catch. A decorative print above them
 *     bought nothing and cost the whole first viewport on a phone, which is the
 *     surface `PRODUCT.md` records as primary. It is gone, and the headline is
 *     set at `board-display` instead: with no print to carry the opening, the
 *     lettering carries it.
 *   - **Hero, filters and board were one undifferentiated wash.** One field from
 *     the header to the FAQ meant the page had no edges and no rhythm. The
 *     counted figures are now a full-bleed `tar` band — the one dark passage in
 *     the light half of the page — and the site's waterline is struck at its base
 *     so the paint drips onto the ice. Paint above, ice below: the signature edge
 *     finally does the job it was drawn for on the page that most needs a seam.
 *   - **The figures read as a dashboard.** Four boxed cells of big-number-over-
 *     small-label is the stat-card template, not signwriting. They are set as one
 *     struck line now, numeral and word on a shared baseline, ochre digits on
 *     tar — where ochre measures 7.9:1 and is finally allowed to be large.
 *
 * The band is dark but the top of the page is not, deliberately: `Navbar` decides
 * its own colour from the route (`overDarkHero = !pathname.startsWith("/shop")`)
 * and paints dark type on every shop URL. A tar masthead would put dark lettering
 * on a dark ground. Keeping the first 200px light is what makes the band legal,
 * and it is a real constraint on this file rather than a preference: moving the
 * band up means editing the navbar.
 *
 * The four figures are counted off the catalogue by the page and passed in, so
 * they cannot drift from what the shop carries. None of them is a claim about
 * volume, freshness or reach — they are the shape of the list directly below,
 * which is the one thing a counter can prove at the top of its own page.
 *
 * There is no eyebrow above the headline any more. "The counter" said nothing the
 * headline did not, and a label stacked over a title is chrome that pushes the
 * one line of the page that matters further down the phone.
 */

export type ShopStats = {
  /** Every line the catalogue carries. */
  lines: number;
  /** Categories — the two headings on the spec sheet. */
  headings: number;
  /** Distinct waters actually represented on the shelf. */
  waters: number;
  /** How many ways the counter will cut. */
  cuts: number;
};

export default async function ShopHero({ stats }: { stats: ShopStats }) {
  const t = await getTranslations("Shop");
  const nav = await getTranslations("Nav");

  const crumbs = [{ href: "/", label: nav("home") }, { label: t("crumb") }];

  const figures = [
    { key: "lines", value: stats.lines },
    { key: "headings", value: stats.headings },
    { key: "waters", value: stats.waters },
    { key: "cuts", value: stats.cuts },
  ] as const;

  return (
    <section className="bg-limewash pt-[132px] md:pt-[172px]">
      <div className="container-x">
        <Reveal blur={false}>
          {/* The landmark's own name is translated too: it is read out, so an
              English `aria-label` is an English string on the Arabic page. The
              key sits in `Nav` rather than `Shop` because two other breadcrumb
              rails on the site still hardcode it and can adopt it. */}
          <nav
            aria-label={nav("breadcrumb")}
            className="label flex items-center gap-2.5 text-tar/65"
          >
            {crumbs.map((c, i) => (
              <span key={c.label} className="flex items-center gap-2.5">
                {i > 0 && (
                  <span aria-hidden="true" className="text-tar/30">
                    /
                  </span>
                )}
                {c.href ? (
                  <Link
                    href={c.href}
                    className="transition-colors hover:text-oxide"
                  >
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-tar">{c.label}</span>
                )}
              </span>
            ))}
          </nav>
        </Reveal>

        {/* The headline and the standfirst share a baseline rather than stacking,
            so the masthead opens across the page instead of down it. The copy is
            held to a 46ch measure: it is a caption to the lettering, not a
            paragraph, and it no longer recites the figures the band below
            counts. */}
        <div className="mt-8 grid gap-8 lg:mt-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:items-end lg:gap-16">
          <Reveal blur={false} delay={0.06}>
            <h1 className="board-display max-w-[16ch] text-balance text-tar">
              {t("title")}
            </h1>
          </Reveal>

          <Reveal blur={false} delay={0.16}>
            <p className="max-w-[46ch] text-[16.5px] leading-[1.8] text-tar/75 lg:pb-2 rtl:leading-[2.05]">
              {t("copy")}
            </p>
          </Reveal>
        </div>
      </div>

      {/* ---------- the manifest ----------
          The shape of the list below, counted rather than claimed, painted on the
          one dark band in the light half of the page.

          Hairlines are drawn by the 1px gap, so they land in both axes at every
          breakpoint without a first-child exception, and the negative inline
          margin cancels the cells' own padding so the digits sit on the same
          measure as the headline while the paint bleeds past it. */}
      <div className="relative mt-12 bg-tar md:mt-16">
        <div className="container-x">
          <h2 className="sr-only">{t("manifest.title")}</h2>

          <dl className="-mx-5 grid grid-cols-2 gap-px bg-limewash/15 md:-mx-6 md:grid-cols-4">
            {figures.map((f) => (
              <div
                key={f.key}
                className="flex items-baseline gap-3 bg-tar px-5 py-7 md:px-6 md:py-9"
              >
                <dt className="label order-2 min-w-0 text-limewash/65">
                  {t(`stats.${f.key}`)}
                </dt>
                <dd className="numeral order-1 shrink-0 text-[40px] leading-none text-ochre md:text-[52px]">
                  {f.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Tar over meltwater: the rule is the band's own bottom edge and the
            drips hang past it into the ice field the board stands on. Default
            `--waterline` is already tar, which is what the drips have to be to
            read against the light ground below. */}
        <div
          aria-hidden="true"
          className="waterline absolute inset-x-0 bottom-0"
        />
      </div>
    </section>
  );
}
