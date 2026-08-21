import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { ArrowUpRight, MessageCircle, Phone } from "lucide-react";

import HeroCinematic from "@/components/HeroCinematic";
import BestSellers, { type BestSellerLine } from "@/components/BestSellers";
import AudienceFork from "@/components/AudienceFork";
import Offerings, { type OfferingStats } from "@/components/Offerings";
import CategoryShowcase, {
  type ShowcaseCard,
} from "@/components/CategoryShowcase";
import HowItWorks from "@/components/HowItWorks";
import Faq from "@/components/Faq";
import Reveal from "@/components/Reveal";
import { SectionIntro } from "@/components/Decor";
import { productCategories } from "@/data/categories";
import { bestSellers, products, type Category } from "@/data/products";
import { PHONE, PHONE_HREF, whatsappHref } from "@/lib/contact";

/**
 * The home page.
 *
 * Eight sections, in the order a buyer needs them: the world, then the shelf,
 * then the range, then how it works, then the fork, then today's counter, then
 * the questions, then one conversation.
 *
 * The best sellers sit second on purpose. The hero states the world and names no
 * fish — its top band is empty cobalt — so the first concrete answer the page
 * gives is the six lines the counter is asked for by name. Before it existed,
 * the first species on the page was five viewports down.
 *
 * The range and how-it-works were moved up above the fork. The shelf now hands
 * straight to the two doors into the catalogue and then to how the fish is
 * bought, which is the commercial spine of the page; the fork reads as the case
 * behind it. The consequence is that the household / trade split no longer
 * happens before anyone has been asked to browse, which is a trade-off
 * PRODUCT.md has an opinion about — see the note on AudienceFork.
 *
 * EVERY SECTION OPENS ON ITS HEADLINE. There was a numbered run down this page —
 * `01 The range`, `02 How we buy`, `03 Today's counter`, `04 Questions`, each a
 * draft-mark numeral and a small-caps label on a hairline above the heading, plus
 * an ochre `One conversation` over the close. All of it is gone, and the pattern
 * is gone with it rather than being restyled.
 *
 * Two reasons, and the second is the one that settles it. The labels were saying
 * in two words what the headline underneath said properly in five — "The range"
 * over "Everything we carry, named" — so the first line a visitor read was a worse
 * draft of the second, set smaller and pushing the real one further down a phone
 * screen. And the numerals implied a sequence: eight sections in a counted
 * argument, to be read in order, when this is a home page that people enter
 * halfway down from a search result and leave from whichever section answers
 * them. `about` still carries its numbered run, because that page genuinely is
 * one argument read front to back.
 *
 * What separates the sections now is what was always doing the work: the fields
 * alternate with no two adjacent the same — hull, chalk, hull, tide, tar,
 * limewash, tar — and every waterline drip lands on a light ground where it can
 * be seen. The fork is the page's one cold light passage: `tide` between the
 * cobalt above it and the tar below. `SectionIntro` drops its whole top row when
 * given neither an index nor an eyebrow, so there is no leftover hairline.
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
 * When real attributable quotes exist, they belong between the questions and the
 * close.
 */

/** Whole fish only — the shellfish lines are their own board on the counter. */
const WHOLE_FISH: Category = "Fish";

/**
 * Counted off the catalogue at build time rather than written into the copy, so
 * the two figures the counter prints cannot drift from what the shop carries.
 */
function offeringStats(): OfferingStats {
  return {
    fishCount: products.filter((p) => p.category === WHOLE_FISH).length,
    shellfishCount: products.filter((p) => p.category !== WHOLE_FISH).length,
  };
}

/**
 * The range, straight off `@/data/categories`.
 *
 * The section is a row of doors now, so a card needs its heading, its
 * photograph and where it goes — nothing rolled up from the catalogue. The line
 * count and the named species that used to be printed here came off with it:
 * the shop lists them, and it lists the ones that are actually on ice.
 */
function showcaseCards(): ShowcaseCard[] {
  return productCategories.map((c) => ({
    slug: c.slug,
    name: c.name,
    arabic: c.arabic,
    href: c.href,
    image: c.image,
  }));
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
    ...(p.badge ? { badge: p.badge } : {}),
  }));
}

export default async function HomePage() {
  const t = await getTranslations("Home");

  return (
    <>
      <HeroCinematic />

      <BestSellers lines={bestSellerLines()} total={products.length} />

      <CategoryShowcase cards={showcaseCards()} />

      <HowItWorks />

      <AudienceFork />

      <Offerings stats={offeringStats()} />

      {/* ---------- questions ---------- */}
      <section className="bg-limewash py-24 md:py-32">
        <div className="container-x">
          <SectionIntro title={t("faq.title")} copy={t("faq.copy")} />
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
                <h2 className="display-xl max-w-[12ch] text-limewash">
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
