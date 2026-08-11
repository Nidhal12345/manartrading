import Photo from "./ui/Photo";
import { getLocale, getTranslations } from "next-intl/server";
import Reveal from "./Reveal";
import { SectionIntro, TradeName } from "./Decor";
import { products, type Waters } from "@/data/products";
import type { ImageKey } from "@/lib/images";

/**
 * Two coastlines, as a real split rather than a decorative one.
 *
 * Saudi Arabia fishes two seas that behave nothing alike — reef and pelagic
 * species off the Red Sea shelves, shellfish and mackerel out of the Gulf — and
 * no competitor site has an equivalent, because none of them sources from two.
 *
 * What came off this section: a hairline bar reading "62% of volume" against
 * another reading "38%". Both figures were invented. The species counts that
 * replaced them are counted from the catalogue at build time, so they are the one
 * number here that is true by construction, and the ports are named without any
 * claim about tonnage or share.
 */
export default async function TwoSeas() {
  const t = await getTranslations("Seas");
  const isRtl = (await getLocale()) === "ar";

  const seas: { key: string; waters: Waters; image: ImageKey }[] = [
    { key: "red", waters: "Red Sea", image: "wildGrouper" },
    { key: "gulf", waters: "Arabian Gulf", image: "harbour" },
  ];

  return (
    <section className="bg-limewash py-24 md:py-32">
      <div className="container-x">
        <SectionIntro
          index="03"
          eyebrow={t("eyebrow")}
          title={t("title")}
          copy={t("copy")}
        />

        <div className="mt-14 grid gap-7 lg:mt-16 lg:grid-cols-2 lg:gap-8">
          {seas.map((sea, i) => {
            const lines = products.filter((p) => p.waters === sea.waters);

            return (
              <Reveal key={sea.key} blur={false} delay={i * 0.1}>
                <article className="relative bg-chalk">
                  <div className="relative aspect-[16/10] overflow-hidden bg-tar">
                    <Photo
                      image={sea.image}
                      res={1200}
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover opacity-85"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-[linear-gradient(180deg,rgba(26,20,16,0.1),rgba(26,20,16,0.55))]"
                    />
                    {/* The painted transom board: the sea's name in both scripts,
                        the way it is lettered on a hull. */}
                    <div className="absolute inset-x-0 bottom-0 flex items-baseline justify-between gap-4 p-6">
                      <h3 className="display-md text-limewash">
                        {t(`${sea.key}.name`)}
                      </h3>
                      <TradeName
                        latin={t(`${sea.key}.latin`)}
                        arabic={t(`${sea.key}.arabic`)}
                        isRtl={isRtl}
                        className="text-[15px] leading-none text-limewash/70"
                      />
                    </div>
                    <div
                      aria-hidden="true"
                      className="waterline absolute inset-x-0 bottom-0"
                    />
                  </div>

                  <div className="p-6 pt-9 md:p-8 md:pt-11">
                    <p className="text-[15px] leading-[1.8] text-tar/70 rtl:leading-[2]">
                      {t(`${sea.key}.copy`)}
                    </p>

                    <dl className="mt-8 grid gap-px border-y border-tar/15 bg-tar/15 sm:grid-cols-2">
                      <div className="bg-chalk py-5 pe-6">
                        <dt className="label text-rope">{t("portsLabel")}</dt>
                        <dd className="mt-2.5 text-[14px] leading-relaxed text-tar/80">
                          {t(`${sea.key}.ports`)}
                        </dd>
                      </div>
                      <div className="bg-chalk py-5 pe-6 sm:ps-6">
                        <dt className="label text-rope">{t("linesLabel")}</dt>
                        <dd className="mt-2.5 flex items-baseline gap-2">
                          <span className="numeral text-[26px] leading-none text-tar">
                            {lines.length}
                          </span>
                          <span className="text-[13px] text-rope">
                            {t("linesUnit")}
                          </span>
                        </dd>
                      </div>
                    </dl>

                    <p className="mt-6 text-[13.5px] leading-relaxed text-rope">
                      {t(`${sea.key}.season`)}
                    </p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        {/* The third water. Imported lines are a real part of the range and
            hiding them would be the dishonest option, so they get a stated row
            rather than a card that implies a coastline. */}
        <Reveal blur={false} delay={0.2}>
          <div className="mt-8 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 border-t-2 border-tar pt-6">
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <span className="label text-rope">{t("imported.label")}</span>
              <span className="text-[14.5px] text-tar/75">
                {t("imported.copy")}
              </span>
            </div>
            <span className="flex items-baseline gap-2">
              <span className="numeral text-[22px] leading-none text-tar">
                {products.filter((p) => p.waters === "Imported").length}
              </span>
              <span className="text-[13px] text-rope">{t("linesUnit")}</span>
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
