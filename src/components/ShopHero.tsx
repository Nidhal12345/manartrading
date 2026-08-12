import Photo from "./ui/Photo";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import Reveal from "./Reveal";

/**
 * The counter's own opener.
 *
 * Every other inner route opens on `PageHero` — a tar field with the photograph
 * dropped back behind the copy. That is right for about and contact, which are
 * about the business, and wrong for this one: the shop is where a buyer arrives
 * to look at fish, and a hero that dims its own photograph to 40% to make room
 * for a headline is working against the page it introduces.
 *
 * So this is the ice instead of the paint. `tide` runs from here straight down
 * through the filters and the board with no seam — the whole counter is one cold
 * light field, and the boatyard's dark paint returns underneath it at "before you
 * order". There is no waterline at the base for that reason: nothing changes
 * ground here, so there is no edge to strike.
 *
 * The photograph is framed rather than bled. A `salt` plate with the print inset
 * on it, standing on the `tide` — the same plate-on-a-counter idea the fork uses,
 * and the reason the image can stay at full strength: it is an object on the
 * page, not a wash behind the text.
 *
 * The four figures are counted off the catalogue by the page and passed in, so
 * they cannot drift from what the shop carries. None of them is a claim about
 * volume, freshness or reach — they are the shape of the list directly below,
 * which is the one thing a counter can prove at the top of its own page.
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
    <section className="bg-tide pb-16 pt-[148px] md:pb-20 md:pt-[188px]">
      <div className="container-x">
        <Reveal blur={false}>
          <nav
            aria-label="Breadcrumb"
            className="label flex items-center gap-2.5 text-rope"
          >
            {crumbs.map((c, i) => (
              <span key={c.label} className="flex items-center gap-2.5">
                {i > 0 && (
                  <span aria-hidden="true" className="text-tar/25">
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

        {/* The headline and the print sit on one baseline rather than stacking,
            so the section opens across the page instead of down it. */}
        <div className="mt-10 grid gap-10 lg:mt-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-end lg:gap-16">
          <div>
            <Reveal blur={false} delay={0.06}>
              <span className="label text-oxide">{t("eyebrow")}</span>
            </Reveal>

            <Reveal blur={false} delay={0.12}>
              <h1 className="display-lg mt-5 max-w-[15ch] text-balance text-tar">
                {t("title")}
              </h1>
            </Reveal>

            <Reveal blur={false} delay={0.2}>
              <p className="mt-7 max-w-xl text-[16.5px] leading-[1.85] text-tar/75 rtl:leading-[2.05]">
                {t("copy")}
              </p>
            </Reveal>
          </div>

          {/* A mounted print, not a background. The plate is `salt` on `tide` and
              the image keeps its full strength inside it. */}
          <Reveal delay={0.28}>
            <div className="bg-salt p-3 shadow-soft md:p-4">
              <div className="relative aspect-[4/3] overflow-hidden bg-tar">
                <Photo
                  image="fishRows"
                  res={1200}
                  sizes="(max-width: 1024px) 100vw, 44vw"
                  eager
                  className="object-cover"
                />
              </div>
            </div>
          </Reveal>
        </div>

        {/* ---------- the manifest ----------
            The shape of the list below, counted rather than claimed. Hairlines
            are drawn by the 1px gap, so they land in both axes at every
            breakpoint without a first-child exception. */}
        <Reveal blur={false} delay={0.34}>
          <dl className="mt-14 grid grid-cols-2 gap-px border-t-2 border-tar bg-tar/15 md:mt-16 md:grid-cols-4">
            {figures.map((f) => (
              <div key={f.key} className="bg-tide px-5 py-6 md:px-6 md:py-7">
                <dt className="label text-tar/60">{t(`stats.${f.key}`)}</dt>
                <dd className="numeral mt-3 text-[34px] leading-none text-tar md:text-[38px]">
                  {f.value}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
