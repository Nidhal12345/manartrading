import { getLocale, getTranslations } from "next-intl/server";
import Reveal from "./Reveal";
import { SectionIntro, TradeName } from "./Decor";
import { CutDiagram } from "./ui/CutDiagram";
import { PREPARATIONS } from "@/data/products";

/**
 * Cuts and handling — "tell us how you cook it".
 *
 * This is the second axis of the taxonomy, and it is the one the site was
 * missing. The Fish Society splits species from preparation and it is the
 * strongest structural idea any of the six competitors has, because it matches
 * how the question is actually asked at a counter: not "which fish" but "which
 * fish, cut how".
 *
 * Drawn rather than photographed, on purpose. The five cut shots are on the shoot
 * list, but the diagrams are authored assets — stencilled marks in ochre on a tar
 * plate — so the section is finished now and does not degrade into five
 * placeholder photographs of the wrong fish while it waits.
 *
 * Every cut named here is one the copy already promises in `HowItWorks` and on
 * the product pages, so the section adds a vocabulary, not a claim.
 */
export default async function CutsAndHandling() {
  const t = await getTranslations("Cuts");
  const isRtl = (await getLocale()) === "ar";

  return (
    <section className="relative bg-tar py-24 text-limewash md:py-32">
      <div className="container-x">
        <SectionIntro
          light
          index="06"
          eyebrow={t("eyebrow")}
          title={t("title")}
          copy={t("copy")}
        />

        <div className="mt-14 grid gap-px bg-limewash/15 sm:grid-cols-2 lg:mt-16 lg:grid-cols-5">
          {PREPARATIONS.map((cut, i) => (
            <Reveal key={cut} blur={false} delay={i * 0.06} className="h-full">
              <figure className="flex h-full flex-col bg-tar p-6">
                <span className="draft-mark text-[12px]">
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* The diagram is the content here, so it gets the room a
                    photograph would have had. */}
                <div className="mt-5 flex items-center justify-center py-2">
                  <CutDiagram cut={cut} className="h-16 w-full" />
                </div>

                <figcaption className="mt-5 flex flex-col border-t border-limewash/20 pt-5">
                  <span className="font-display text-[17px] uppercase leading-tight text-limewash">
                    {t(`${cut}.title`)}
                  </span>
                  <TradeName
                    latin={t(`${cut}.latin`)}
                    arabic={t(`${cut}.arabic`)}
                    isRtl={isRtl}
                    className="mt-1.5 text-[13px] leading-none text-ochre/85"
                  />
                  <span className="mt-4 text-[13.5px] leading-[1.7] text-limewash/60 rtl:leading-[1.9]">
                    {t(`${cut}.copy`)}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal blur={false} delay={0.3}>
          <p className="mt-8 max-w-2xl text-[14.5px] leading-relaxed text-limewash/55">
            {t("note")}
          </p>
        </Reveal>
      </div>

      <div aria-hidden="true" className="waterline absolute inset-x-0 bottom-0" />
    </section>
  );
}
