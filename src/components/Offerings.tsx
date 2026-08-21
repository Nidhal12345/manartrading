import Photo from "./ui/Photo";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";
import { SectionIntro } from "./Decor";

export type OfferingStats = {
  /** Whole fish species on the counter — not shellfish, and not cuts. */
  fishCount: number;
  /** Crustacean and other seafood lines. */
  shellfishCount: number;
};

/**
 * Today's counter, given the whole viewport.
 *
 * It was three chalked board cells in a row: a photograph, a heading and a
 * figure each, all at thumbnail size. Three doors is the right idea and the
 * wrong shape — at a third of the width apiece none of the photographs could
 * carry a plate, and the section asked to be read as a grid when what it has to
 * say is a single sentence with one thing to do about it.
 *
 * So it is one composition now: the counter's argument on one half and one plate
 * at full height on the other. The three doors collapse to the two places they
 * actually went — the shop, and a conversation about a standing order — so the
 * section has a primary action instead of three tiles competing for the same
 * click.
 *
 * The two figures are still counted off the catalogue (`offeringStats` on the
 * page), so they cannot drift from what the shop actually carries. Nothing here
 * is billed as live: the caveat under the buttons says plainly that this is the
 * range, not this morning's landing, because there is no feed behind it that
 * could honestly claim otherwise.
 *
 * `min-h-svh` rather than a hard `100vh`: the small-viewport unit keeps the
 * buttons off the fold under a mobile browser's chrome, and a minimum lets a
 * short landscape phone grow the pane instead of clipping the copy — the same
 * reasoning as `BestSellers`.
 *
 * One screen is a promise the layout can only keep side by side. Stacked on a
 * phone the section runs past the fold, and it should: holding it to a screen
 * there would mean either a photograph reduced to a strip or copy set too small
 * to read. The photograph takes about half the viewport instead, so the plate
 * and the opening line land together.
 */
export default async function Offerings({ stats }: { stats: OfferingStats }) {
  const t = await getTranslations("Offerings");

  const figures = [
    { key: "fish", value: stats.fishCount },
    { key: "shellfish", value: stats.shellfishCount },
  ] as const;

  return (
    <section className="relative bg-tar text-limewash">
      <div className="grid min-h-svh lg:grid-cols-2">
        {/* The copy half. The inline-start padding resolves to exactly the
            gutter `container-x` uses, so the headline sits on the same left edge
            as every other section's while the photograph runs to the bleed:
            the pane is half the section, so `100% - 39.5rem` is
            `(viewport - 84rem) / 2 + 2.5rem` — a percentage rather than `vw`,
            which keeps it exact when a scrollbar is taking width off the page. */}
        <div className="flex flex-col justify-center px-5 py-20 md:px-10 lg:py-24 lg:pe-14 lg:ps-[max(2.5rem,calc(100%-39.5rem))] xl:pe-20">
          <div className="w-full">
            <SectionIntro light title={t("title")} copy={t("copy")} />

            {/* The chalked figures, ruled rather than carded. `numeral` keeps
                Latin digits in both locales, so the pair lines up whichever way
                the page runs. */}
            <Reveal blur={false} delay={0.22}>
              <dl className="mt-11 grid max-w-lg grid-cols-2 gap-px bg-limewash/15">
                {figures.map((f) => (
                  <div key={f.key} className="bg-tar px-5 py-6">
                    <dt className="label text-limewash/45">
                      {t(`${f.key}Label`)}
                    </dt>
                    <dd className="mt-3 flex items-baseline gap-2.5">
                      <span className="numeral text-[34px] leading-none text-ochre">
                        {f.value}
                      </span>
                      <span className="text-[13px] leading-tight text-limewash/55">
                        {t(`${f.key}Unit`)}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal blur={false} delay={0.3}>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href="/shop"
                  className="group inline-flex items-center justify-between gap-4 bg-oxide py-4 pe-4 ps-7 text-[15px] font-semibold text-limewash transition-colors hover:bg-oxide-lit focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ochre"
                >
                  {t("cta")}
                  <ArrowUpRight
                    aria-hidden="true"
                    className="h-4 w-4 shrink-0 transition-transform duration-500 group-hover:rotate-45 rtl-flip"
                  />
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center border border-limewash/30 px-7 py-4 text-[15px] font-semibold text-limewash/90 transition-colors hover:border-limewash hover:text-limewash focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ochre"
                >
                  {t("orders")}
                </Link>
              </div>
            </Reveal>

            <Reveal blur={false} delay={0.38}>
              <p className="mt-9 max-w-lg text-[13.5px] leading-relaxed text-limewash/45">
                {t("caveat")}
              </p>
            </Reveal>
          </div>
        </div>

        {/* The plate half. Full-bleed to the outer edge and to the floor of the
            section, with no frame around it — the photograph's own ground is
            within a few points of `tar`, so the only edge it needs is the one
            where it meets the copy. */}
        <div className="relative min-h-[52svh] overflow-hidden bg-tar lg:min-h-full">
          <Photo
            image="platedFillet"
            res={1600}
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />

          {/* The seam. Vertical while the halves are stacked, horizontal off the
              inline-start edge once they sit side by side, so the photograph
              dissolves into the copy field instead of butting a hard join. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(26,20,16,0.6),rgba(26,20,16,0)_34%)] lg:bg-[linear-gradient(90deg,rgba(26,20,16,0.72),rgba(26,20,16,0)_36%)] lg:rtl:bg-[linear-gradient(270deg,rgba(26,20,16,0.72),rgba(26,20,16,0)_36%)]"
          />
        </div>
      </div>

      <div aria-hidden="true" className="waterline absolute inset-x-0 bottom-0" />
    </section>
  );
}
