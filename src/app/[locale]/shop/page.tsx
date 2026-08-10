import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import PageHero from "@/components/PageHero";
import ShopClient from "@/components/ShopClient";
import Reveal from "@/components/Reveal";
import { SectionIntro } from "@/components/Decor";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "Shop the catch",
  description:
    "Browse sixteen lines across two categories — fish, and crustaceans & seafood. Filter by water and by cut: whole, cleaned, steaked, filleted or butterflied. Prepared to order, delivered same day.",
};

/**
 * The counter.
 *
 * Every string on this page was a hardcoded English literal, which meant the
 * Arabic shop rendered an English page hero and three English answers. All of it
 * is in `messages/*.json` now.
 *
 * Two of those three answers also asserted figures `PRODUCT.md` records as
 * unverified — "around 60% of our volume goes to kitchens" and a 20 kg trade
 * minimum. The trade answer now says the terms are set per kitchen, which is
 * true and is what the client can stand behind on the first call.
 */
const BEFORE = ["prep", "size", "trade"] as const;

export default async function ShopPage() {
  const t = await getTranslations("Shop");
  const nav = await getTranslations("Nav");

  return (
    <>
      <PageHero
        image="fishRows"
        eyebrow={t("eyebrow")}
        title={t("title")}
        copy={t("copy")}
        crumbs={[{ href: "/", label: nav("home") }, { label: t("crumb") }]}
      />

      <ShopClient products={products} />

      {/* ---------- before you order ---------- */}
      <section className="relative bg-hull py-24 text-limewash md:py-28">
        <div className="container-x">
          <SectionIntro
            light
            eyebrow={t("before.eyebrow")}
            title={t("before.title")}
          />

          <div className="mt-14 grid gap-px bg-limewash/20 lg:grid-cols-3">
            {BEFORE.map((key, i) => (
              <Reveal key={key} blur={false} delay={i * 0.08} className="h-full">
                <div className="flex h-full flex-col bg-hull px-7 py-9">
                  <span className="numeral text-[34px] leading-none text-ochre">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-6 font-display text-[20px] uppercase leading-tight text-limewash">
                    {t(`before.${key}.q`)}
                  </h3>
                  <p className="mt-4 text-[14.5px] leading-[1.75] text-limewash/70 rtl:leading-[1.95]">
                    {t(`before.${key}.a`)}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div
          aria-hidden="true"
          className="waterline absolute inset-x-0 bottom-0"
          style={{ ["--waterline" as string]: "var(--color-hull)" }}
        />
      </section>
    </>
  );
}
