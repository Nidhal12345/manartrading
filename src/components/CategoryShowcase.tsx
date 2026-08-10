import Photo from "./ui/Photo";
import { Link } from "@/i18n/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";
import { SectionIntro } from "./Decor";
import type { ImageKey } from "@/lib/images";

/**
 * One heading's worth of the range. Assembled on the server so the catalogue is
 * never serialised into the client bundle just to print two cards.
 */
export type ShowcaseCard = {
  slug: string;
  name: string;
  arabic: string;
  href: string;
  image: ImageKey;
  /** Lines carried under this heading. */
  count: number;
  /** The lines themselves, named — this is what a buyer is actually scanning for. */
  lines: string[];
};

/**
 * The range, as painted transom name boards.
 *
 * A boat carries its name lettered across the transom in both scripts, and that
 * is the object this section borrows: a heading plate, the name in Latin and
 * Arabic, and the lines carried underneath it as a stencilled list.
 *
 * Two things came off this section deliberately. The five-star rating and the
 * "1,240 reviews" figure were both generated from a hash of the slug — invented
 * proof, which PRODUCT.md forbids — so they are gone rather than restyled. And
 * the decorative `back3.png` water photograph behind the grid went with them: it
 * belonged to the underwater world this redesign is refusing.
 *
 * The lines are named on the card rather than hidden behind a hover, because the
 * question a buyer arrives with is "do you carry Hamour", and no amount of
 * photography answers it.
 *
 * The board is lettered in both scripts, but the reader's own script takes the
 * display size — an Arabic visitor should be reading Arabic at scale, not
 * skimming Latin for a transliteration. The second script stays beside it as the
 * trade name, which the counter quotes in both directions anyway.
 */
export default async function CategoryShowcase({
  cards,
}: {
  cards: ShowcaseCard[];
}) {
  const t = await getTranslations("Range");
  const isRtl = (await getLocale()) === "ar";

  return (
    <section className="bg-chalk py-24 md:py-32">
      <div className="container-x">
        <SectionIntro
          index="04"
          eyebrow={t("eyebrow")}
          title={t("title")}
          copy={t("copy")}
        />

        <div className="mt-14 grid gap-7 lg:mt-16 lg:grid-cols-2 lg:gap-8">
          {cards.map((c, i) => (
            <Reveal key={c.slug} blur={false} delay={i * 0.1}>
              <article className="group relative flex h-full flex-col bg-limewash">
                {/* The name board. Tar ground, ochre lettering — a signwriter's
                    plate, not a photo caption. */}
                <div className="relative bg-tar px-6 py-7 md:px-8">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-5 gap-y-2">
                    <h3 className="display-md text-limewash">
                      {isRtl ? c.arabic : c.name}
                    </h3>
                    <span
                      className={`leading-none text-ochre ${
                        isRtl
                          ? "latin-plate text-[17px]"
                          : "font-arabic-display text-[15px]"
                      }`}
                      dir={isRtl ? "ltr" : "rtl"}
                      lang={isRtl ? "en" : "ar"}
                    >
                      {isRtl ? c.name : c.arabic}
                    </span>
                  </div>
                  <div
                    aria-hidden="true"
                    className="waterline absolute inset-x-0 bottom-0"
                  />
                </div>

                <div className="relative aspect-[16/9] overflow-hidden bg-tar">
                  <Photo
                    image={c.image}
                    res={1200}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                  />
                </div>

                <div className="flex flex-1 flex-col p-6 md:p-8">
                  <div className="flex items-baseline gap-3">
                    <span className="numeral text-[22px] leading-none text-tar">
                      {c.count}
                    </span>
                    <span className="label text-rope">{t("linesLabel")}</span>
                  </div>

                  {/* The lines, stencilled. Ochre draft-mark rules between them
                      rather than commas, so the list reads as a painted index. */}
                  <ul className="mt-6 flex flex-wrap gap-x-3 gap-y-2.5 text-[14px] text-tar/75">
                    {c.lines.map((line, li) => (
                      <li key={line} className="flex items-baseline gap-3">
                        {li > 0 && (
                          <span aria-hidden="true" className="text-ochre">
                            ·
                          </span>
                        )}
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-9">
                    <Link
                      href={c.href}
                      className="inline-flex items-center gap-3 bg-tar py-3.5 pe-4 ps-6 text-[14.5px] font-semibold text-limewash transition-colors hover:bg-oxide focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-oxide"
                    >
                      {t("cta")}
                      {/* The category is named for assistive tech without
                          repeating it visually on every card. It has to be the
                          reader's own script: a screen reader set to Arabic
                          announcing "Fish" mid-sentence is worse than silence. */}
                      <span className="sr-only"> {isRtl ? c.arabic : c.name}</span>
                      <ArrowUpRight
                        aria-hidden="true"
                        className="h-4 w-4 shrink-0 transition-transform duration-500 group-hover:rotate-45 rtl-flip"
                      />
                    </Link>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
