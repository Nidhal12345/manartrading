import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ArrowUpRight, MessageCircle } from "lucide-react";

import { Link } from "@/i18n/navigation";
import Photo from "@/components/ui/Photo";
import PageHero from "@/components/PageHero";
import Reveal, { StaggerGroup, StaggerItem } from "@/components/Reveal";
import { SectionIntro } from "@/components/Decor";
import { whatsappHref } from "@/lib/contact";
import {
  PREPARATIONS,
  categoryNames,
  products,
} from "@/data/products";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "About" });

  return { title: t("hero.eyebrow"), description: t("hero.copy") };
}

/**
 * The founder-story page every competitor runs — built honest.
 *
 * All six of the sites this redesign was drawn from carry a named, dated origin
 * story here, and it is one of the few things they do that genuinely earns
 * trust. Manar's has not been recorded yet, so section 02 is a *stated* gap
 * rather than a plausible invention. PRODUCT.md principle 5 — never manufacture
 * credibility — makes that the only available move, and saying so outright reads
 * better than a paragraph of atmosphere pretending to be history.
 *
 * What replaced the old page: an "About us" that asserted the boats had supplied
 * us "for years" (a longevity claim PRODUCT.md flags), and batch paperwork "a
 * five-star kitchen audits us on" (the same HACCP-style claim already struck
 * from the FAQ). The four rules that stand now are policy commitments, which the
 * business can keep from day one, rather than history it has not evidenced.
 *
 * Section 04 is the counterweight: four figures that are true by construction
 * because they are counted off the catalogue at build time.
 */
export default async function AboutPage() {
  const t = await getTranslations("About");
  const nav = await getTranslations("Nav");

  const rules = ["r1", "r2", "r3", "r4"] as const;

  const range = [
    { key: "lines", value: products.length },
    { key: "categories", value: categoryNames.length },
    { key: "waters", value: new Set(products.map((p) => p.waters)).size },
    { key: "cuts", value: PREPARATIONS.length },
  ] as const;

  return (
    <>
      <PageHero
        image="harbour"
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        copy={t("hero.copy")}
        crumbs={[{ href: "/", label: nav("home") }, { label: nav("about") }]}
      />

      {/* ---------- 01 · what we do ---------- */}
      <section className="bg-limewash py-24 lg:py-32">
        <div className="container-x grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionIntro
              index="01"
              eyebrow={t("what.eyebrow")}
              title={t("what.title")}
            />
            <div className="mt-9 space-y-6 text-[16px] leading-[1.9] text-tar/75 rtl:leading-[2.1]">
              <p>{t("what.p1")}</p>
              <p>{t("what.p2")}</p>
              <p>{t("what.p3")}</p>
            </div>
          </div>

          <Reveal direction="left">
            <figure className="relative">
              <div className="relative aspect-[4/5] overflow-hidden bg-tar">
                <Photo
                  image="marketCounter"
                  res={1000}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-[linear-gradient(180deg,transparent_58%,rgba(26,20,16,0.72))]"
                />
                <div
                  aria-hidden="true"
                  className="waterline absolute inset-x-0 bottom-0"
                />
              </div>
              {/* The stand-in is labelled as a stand-in. Presenting stock
                  photography as the client's own counter is the picture
                  equivalent of an invented testimonial. */}
              <figcaption className="label mt-5 text-rope">
                {t("what.caption")}
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* ---------- 02 · the story, stated as missing ---------- */}
      <section className="relative bg-hull py-24 text-limewash lg:py-32">
        <div className="container-x">
          <SectionIntro
            light
            index="02"
            eyebrow={t("story.eyebrow")}
            title={t("story.title")}
          />

          <Reveal blur={false} delay={0.12}>
            <div className="mt-12 max-w-2xl border-s-4 border-ochre ps-7">
              <span className="label text-ochre">{t("story.note")}</span>
              <div className="mt-5 space-y-5 text-[16px] leading-[1.9] text-limewash/80 rtl:leading-[2.1]">
                <p>{t("story.p1")}</p>
                <p>{t("story.p2")}</p>
              </div>
            </div>
          </Reveal>
        </div>

        <div
          aria-hidden="true"
          className="waterline absolute inset-x-0 bottom-0"
          style={{ ["--waterline" as string]: "var(--color-hull)" }}
        />
      </section>

      {/* ---------- 03 · the four rules ---------- */}
      <section className="bg-limewash py-24 lg:py-32">
        <div className="container-x">
          <SectionIntro
            index="03"
            eyebrow={t("rules.eyebrow")}
            title={t("rules.title")}
          />

          <StaggerGroup className="mt-14 grid gap-px border-t-2 border-tar bg-tar/15 md:grid-cols-2 lg:mt-16">
            {rules.map((r, i) => (
              <StaggerItem key={r} className="bg-chalk">
                <div className="flex h-full flex-col px-7 py-9 md:px-8 md:py-10">
                  <span className="draft-mark text-[12.5px]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="display-md mt-6 text-[22px] text-tar">
                    {t(`rules.${r}.title`)}
                  </h3>
                  <p className="mt-4 max-w-md text-[15px] leading-[1.8] text-tar/70 rtl:leading-[2]">
                    {t(`rules.${r}.copy`)}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* ---------- 04 · figures that are true by construction ---------- */}
      <section className="border-y-2 border-tar bg-chalk py-20 lg:py-24">
        <div className="container-x">
          <SectionIntro
            index="04"
            eyebrow={t("range.eyebrow")}
            title={t("range.title")}
          />

          <dl className="mt-12 grid gap-px border-y border-tar/15 bg-tar/15 sm:grid-cols-2 lg:grid-cols-4">
            {range.map((r) => (
              <div key={r.key} className="bg-chalk px-6 py-8">
                <dd className="numeral text-[44px] leading-none text-tar">
                  {r.value}
                </dd>
                <dt className="label mt-4 text-rope">{t(`range.${r.key}`)}</dt>
              </div>
            ))}
          </dl>

          <p className="mt-7 max-w-xl text-[13.5px] leading-relaxed text-rope">
            {t("range.note")}
          </p>
        </div>
      </section>

      {/* ---------- close ---------- */}
      <section className="bg-tar py-20 text-limewash lg:py-28">
        <div className="container-x flex flex-col items-start gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="label text-ochre">{t("cta.eyebrow")}</span>
            <h2 className="display-lg mt-5 max-w-[18ch] text-limewash">
              {t("cta.title")}
            </h2>
            <p className="mt-5 max-w-lg text-[15.5px] leading-relaxed text-limewash/70">
              {t("cta.copy")}
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-4 bg-oxide py-4 pe-4 ps-7 text-[15px] font-semibold text-limewash transition-colors hover:bg-oxide-lit focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ochre"
            >
              {t("cta.primary")}
              <ArrowUpRight
                aria-hidden="true"
                className="h-4 w-4 shrink-0 transition-transform duration-500 group-hover:rotate-45 rtl-flip"
              />
            </Link>

            <a
              href={whatsappHref()}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-3 border-b-2 border-limewash/35 pb-2 text-[15px] font-semibold text-limewash transition-colors hover:border-ochre hover:text-ochre focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ochre"
            >
              <MessageCircle aria-hidden="true" className="h-4 w-4 shrink-0" />
              {t("cta.secondary")}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
