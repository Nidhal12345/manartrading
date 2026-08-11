import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { ArrowUpRight, MessageCircle, Phone } from "lucide-react";

import HeroCinematic from "@/components/HeroCinematic";
import BestSellers, { type BestSellerLine } from "@/components/BestSellers";
import AudienceFork from "@/components/AudienceFork";
import Offerings, { type OfferingStats } from "@/components/Offerings";
import TwoSeas from "@/components/TwoSeas";
import CategoryShowcase, {
  type ShowcaseCard,
} from "@/components/CategoryShowcase";
import HowItWorks from "@/components/HowItWorks";
import CutsAndHandling from "@/components/CutsAndHandling";
import Faq from "@/components/Faq";
import Reveal from "@/components/Reveal";
import { SectionIntro } from "@/components/Decor";
import { productCategories } from "@/data/categories";
import { bestSellers, products, type Category } from "@/data/products";
import { PHONE, PHONE_HREF, whatsappHref } from "@/lib/contact";

/**
 * The home page.
 *
 * Ten sections, in the order a buyer needs them: the world, then the shelf, then
 * the fork, then the range, then how it works, then the questions, then one
 * conversation.
 *
 * The best sellers sit second on purpose. The hero states the world and names no
 * fish — its top band is empty cobalt — so the first concrete answer the page
 * gives is the six lines the counter is asked for by name. Before it existed,
 * the first species on the page was five viewports down.
 *
 * It carries no section index of its own: it is the shelf, not a numbered step
 * in the argument, so the numbered run starts at the audience fork below it.
 *
 * Three blocks came off this page rather than being restyled, all for the same
 * reason — PRODUCT.md records them as invented, and a redesign that restyles
 * fabricated proof only makes the problem prettier:
 *
 *   - three named testimonials with quotes, roles and employers,
 *   - a founder pull quote attributed to "Abdulrahman Al-Manar",
 *   - four counters: 17 years, 60+ partner boats, 2.4 t landed daily, 9 sites.
 *
 * The FAQ in their place is proof of a kind this business can actually give.
 * When real attributable quotes exist, they belong between sections 9 and 10.
 */

/** Whole fish only — the shellfish lines are their own board on the counter. */
const WHOLE_FISH: Category = "Fish";

/**
 * Derived on the server so the whole product array is never serialised into the
 * client bundle just for two numbers.
 */
function offeringStats(): OfferingStats {
  return {
    fishCount: products.filter((p) => p.category === WHOLE_FISH).length,
    shellfishCount: products.filter((p) => p.category !== WHOLE_FISH).length,
  };
}

/**
 * The range, joined from `@/data/categories` to the lines the counter actually
 * sells. The two files share their category names, which is what joins them.
 *
 * The card names its lines, so it carries the catalogue's own list rather than a
 * rating rolled up from placeholder review counts.
 */
function showcaseCards(): ShowcaseCard[] {
  return productCategories.map((c) => {
    const lines = products.filter((p) => p.category === c.name);
    return {
      slug: c.slug,
      name: c.name,
      arabic: c.arabic,
      href: c.href,
      image: c.image,
      count: lines.length,
      // Trimmed of the parenthetical alternates the catalogue carries for
      // search — "Emperor (Spangled Emperor)" is one name on a painted board.
      lines: lines.map((p) => p.name.replace(/\s*\(.*?\)/g, "")),
    };
  });
}

/**
 * The six lines the counter is asked for by name, flattened for the client.
 *
 * Mapped here rather than in the component because the carousel is a client
 * component: every field on this object crosses into the bundle, so it carries
 * the six the cards print and nothing else. Passing the catalogue rows would
 * ship every grade table and nutrition panel with them.
 */
function bestSellerLines(): BestSellerLine[] {
  return bestSellers().map((p) => ({
    slug: p.slug,
    // Trimmed of the parenthetical alternates the catalogue carries for search,
    // exactly as the showcase does — "Kingfish (Spanish Mackerel)" is one name
    // on a painted board.
    name: p.name.replace(/\s*\(.*?\)/g, ""),
    arabic: p.arabic,
    image: p.image,
    waters: p.waters,
    ...(p.badge ? { badge: p.badge } : {}),
  }));
}

export default async function HomePage() {
  const t = await getTranslations("Home");

  return (
    <>
      <HeroCinematic />

      <BestSellers lines={bestSellerLines()} total={products.length} />

      <AudienceFork />

      <Offerings stats={offeringStats()} />

      <TwoSeas />

      <CategoryShowcase cards={showcaseCards()} />

      <HowItWorks />

      <CutsAndHandling />

      {/* ---------- questions ---------- */}
      <section className="bg-limewash py-24 md:py-32">
        <div className="container-x">
          <SectionIntro
            index="07"
            eyebrow={t("faq.eyebrow")}
            title={t("faq.title")}
            copy={t("faq.copy")}
          />
          <div className="mt-14 lg:mt-16">
            <Faq />
          </div>
        </div>
      </section>

      {/* ---------- close ---------- */}
      <section className="relative bg-tar py-24 text-limewash md:py-32">
        <div className="container-x">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-end lg:gap-16">
            <div>
              <Reveal blur={false}>
                <span className="label text-ochre">{t("close.eyebrow")}</span>
              </Reveal>
              <Reveal blur={false} delay={0.08}>
                <h2 className="display-xl mt-6 max-w-[12ch] text-limewash">
                  {t("close.title")}
                </h2>
              </Reveal>
            </div>

            <Reveal delay={0.16}>
              <div>
                <p className="max-w-md text-[16px] leading-[1.8] text-limewash/70 rtl:leading-[2]">
                  {t("close.copy")}
                </p>

                <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <a
                    href={whatsappHref()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center justify-between gap-4 bg-oxide py-4 pe-4 ps-7 text-[15px] font-semibold text-limewash transition-colors hover:bg-oxide-lit focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ochre"
                  >
                    <span className="inline-flex items-center gap-2.5">
                      <MessageCircle
                        aria-hidden="true"
                        className="h-4 w-4 shrink-0"
                      />
                      {t("close.whatsapp")}
                    </span>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="h-4 w-4 shrink-0 transition-transform duration-500 group-hover:rotate-45 rtl-flip"
                    />
                  </a>

                  <a
                    href={PHONE_HREF}
                    className="inline-flex items-center justify-center gap-2.5 border border-limewash/30 px-7 py-4 text-[15px] font-semibold text-limewash/90 transition-colors hover:border-limewash hover:text-limewash focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ochre"
                  >
                    <Phone aria-hidden="true" className="h-4 w-4 shrink-0" />
                    <span dir="ltr">{PHONE}</span>
                  </a>
                </div>

                <p className="mt-7 text-[13.5px] text-limewash/45">
                  {t("close.note")}{" "}
                  <Link
                    href="/shop"
                    className="text-ochre underline-offset-4 transition-colors hover:underline"
                  >
                    {t("close.browse")}
                  </Link>
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
