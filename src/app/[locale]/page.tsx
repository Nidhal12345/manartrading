import Photo from "@/components/ui/Photo";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight, Quote } from "lucide-react";

import HeroCinematic from "@/components/HeroCinematic";
import Offerings, { type OfferingStats } from "@/components/Offerings";
import CategoryShowcase, {
  type ShowcaseCard,
} from "@/components/CategoryShowcase";
import HowItWorks from "@/components/HowItWorks";
import ProcessSticky from "@/components/ProcessSticky";
import Reveal, { StaggerGroup, StaggerItem } from "@/components/Reveal";
import { SectionIntro } from "@/components/Decor";
import SplitText from "@/components/ui/SplitText";
import CountUp from "@/components/ui/CountUp";
import Magnetic from "@/components/ui/Magnetic";
import { productCategories } from "@/data/categories";
import { categoryStats, products, type Category } from "@/data/products";

const testimonials = [
  {
    quote:
      "We have run our kitchen on Manar for six years. The Hamour arrives so firm you can hear it hit the board. They have never once sent us something we had to send back.",
    name: "Chef Faisal Al-Harbi",
    role: "Executive Chef, Al Bahr Restaurant · Jeddah",
  },
  {
    quote:
      "I order Zubaidi every Thursday and it is on my counter before noon. Cleaned, on ice, exactly the size I asked for. It changed how we shop.",
    name: "Nouf Al-Qahtani",
    role: "Home customer · Riyadh",
  },
  {
    quote:
      "Their cold chain documentation is the cleanest of any supplier we audit. For a hotel group that matters as much as the fish itself.",
    name: "Omar Bin Saleh",
    role: "Procurement Director, Twin Sails Hotels",
  },
];

/**
 * The figure is billed as "species", so it counts whole fish only. The
 * shellfish categories are a different row of the section, and Fillets, Steaks
 * and Smoked Products are cuts of species already on this list — Salmon is in
 * all four — so counting them would inflate the number rather than describe it.
 */
const wholeFish = new Set([
  "Fishes (Sea Water)",
  "Fishes (Fresh Water)",
  "European Fishes",
]);

/**
 * Derived here, on the server, so the whole product array is never serialised
 * into the client bundle just for one number.
 */
function offeringStats(): OfferingStats {
  return {
    fishCount: products.filter((p) => wholeFish.has(p.category)).length,
  };
}

/**
 * The home page indexes the trading range from `@/data/categories`; the
 * ratings on those cards are rolled up from the lines the counter actually
 * sells. The two files share their category names, which is what joins them.
 *
 * Assembled here, on the server, for the same reason as the count above: the
 * cards need a handful of numbers, not the whole catalogue in the client
 * bundle.
 *
 * Four of the ten, in spec-sheet order, so the section is one clean row on a
 * desktop grid. "View all" carries the reader to the other six.
 */
function showcaseCards(): ShowcaseCard[] {
  return productCategories.slice(0, 4).map((c) => {
    const s = categoryStats[c.name as Category];
    return {
      slug: c.slug,
      name: c.name,
      arabic: c.arabic,
      href: c.href,
      image: c.image,
      count: s.count,
      rating: s.rating,
      reviews: s.reviews,
    };
  });
}

export default function HomePage() {
  return (
    <>
      <HeroCinematic />

      <Offerings stats={offeringStats()} />

      {/* ---------- product categories ---------- */}
      <CategoryShowcase title="Our categories" cards={showcaseCards()} />

      {/* ---------- how it works ---------- */}
      <HowItWorks />

      {/* ---------- full-bleed pull quote ---------- */}
      <section className="relative h-[70svh] min-h-[440px] overflow-hidden bg-abyss">
        <Photo
          image="reefLight"
          res={1800}
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-abyss/65" />
        <div className="caustics" />
        <div className="container-x relative flex h-full items-center">
          <SplitText
            as="p"
            text="You cannot make a fish fresher than the moment you buy it. Everything after that is just not ruining it."
            className="display-lg block max-w-[20ch] text-bone"
          />
        </div>
        <p className="label absolute bottom-10 right-6 text-bone/50 md:right-10">
          Abdulrahman Al-Manar · Founder
        </p>
      </section>

      {/* ---------- process ---------- */}
      <section className="relative bg-abyss py-24 lg:py-0">
        <div className="container-x">
          <div className="lg:pt-32">
            <SectionIntro
              light
              index="01"
              eyebrow="From boat to door"
              title="Under six hours, most mornings"
            />
          </div>
          <div className="mt-16 lg:mt-24">
            <ProcessSticky />
          </div>
        </div>
      </section>

      {/* ---------- two seas ---------- */}
      <section className="bg-white py-24 lg:py-32">
        <div className="container-x">
          <SectionIntro
            index="02"
            eyebrow="Two coastlines"
            title="A country with two very different seas"
            copy="Reef species from the Red Sea shelves, pelagics from the offshore fleet, and Gulf shellfish in their licensed seasons. The counter never looks the same two weeks running."
          />

          <div className="mt-16 grid gap-6 lg:grid-cols-2">
            {[
              {
                name: "Red Sea",
                arabic: "البحر الأحمر",
                ports: "Jeddah · Yanbu · Al Lith · Jazan · Farasan",
                share: 62,
                image: "wildGrouper" as const,
              },
              {
                name: "Arabian Gulf",
                arabic: "الخليج العربي",
                ports: "Dammam · Qatif · Jubail · Ras Tanura",
                share: 38,
                image: "harbour" as const,
              },
            ].map((sea, i) => (
              <Reveal key={sea.name} delay={i * 0.12}>
                <article className="group relative aspect-[4/3] overflow-hidden bg-abyss">
                  <Photo
                    image={sea.image}
                    res={1200}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,20,31,0.15),rgba(4,20,31,0.85))]" />
                  <div className="absolute inset-x-0 bottom-0 p-7">
                    <div className="flex items-baseline justify-between">
                      <h3 className="display-md text-bone">{sea.name}</h3>
                      <span className="text-[14px] text-bone/60" dir="rtl">
                        {sea.arabic}
                      </span>
                    </div>
                    <p className="mt-2 text-[13px] text-bone/55">{sea.ports}</p>
                    <div className="mt-5 flex items-center gap-4">
                      <span className="h-px flex-1 bg-white/20">
                        <span
                          className="block h-px bg-aqua"
                          style={{ width: `${sea.share}%` }}
                        />
                      </span>
                      <span className="numeral text-[13px] text-bone/80">
                        {sea.share}% of volume
                      </span>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          {/* counters */}
          <div className="mt-6 grid gap-px border-y border-ink/12 bg-ink/12 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { to: 17, suffix: "", k: "Years on the docks" },
              { to: 60, suffix: "+", k: "Partner boats" },
              { to: 2.4, suffix: " t", k: "Landed daily", dp: 1 },
              { to: 9, suffix: "", k: "Landing sites" },
            ].map((s) => (
              <div key={s.k} className="bg-white px-6 py-9">
                <p className="numeral text-[38px] leading-none text-ink">
                  <CountUp to={s.to} decimals={s.dp ?? 0} />
                  <span className="text-ocean">{s.suffix}</span>
                </p>
                <p className="label mt-3 text-ink/45">{s.k}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- testimonials ---------- */}
      <section className="bg-bone py-24 lg:py-32">
        <div className="container-x">
          <SectionIntro
            index="03"
            eyebrow="What buyers say"
            title="Chefs and families, same fish"
          />

          <StaggerGroup className="mt-16 grid gap-px border-t border-ink/12 bg-ink/12 lg:grid-cols-3">
            {testimonials.map((t) => (
              <StaggerItem key={t.name} className="bg-bone">
                <figure className="flex h-full flex-col px-7 py-9">
                  <Quote className="h-6 w-6 shrink-0 text-ocean/40" />
                  <blockquote className="mt-6 flex-1 text-[15.5px] leading-[1.8] text-ink/75">
                    {t.quote}
                  </blockquote>
                  <figcaption className="mt-8 border-t border-ink/12 pt-5">
                    <span className="block font-display text-[16px] text-ink">
                      {t.name}
                    </span>
                    <span className="mt-1 block text-[12.5px] text-ink/50">
                      {t.role}
                    </span>
                  </figcaption>
                </figure>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="relative overflow-hidden bg-abyss">
        <Photo
          image="charcoalGrill"
          res={1800}
          sizes="100vw"
          className="object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,20,31,0.75),rgba(4,20,31,0.92))]" />
        <div className="noise" />

        <div className="container-x relative py-28 text-center lg:py-36">
          <Reveal blur={false}>
            <span className="label text-aqua">Order before 2 PM</span>
          </Reveal>
          <SplitText
            as="h2"
            text="Eat it tonight."
            className="display-xl mt-6 block text-bone"
          />
          <Reveal delay={0.2}>
            <p className="mx-auto mt-7 max-w-md text-[16px] leading-relaxed text-bone/65">
              Tell us what you need and how you want it cut. We confirm the
              quote and the delivery window on WhatsApp within minutes.
            </p>
          </Reveal>
          <Reveal delay={0.28}>
            <div className="mt-11 flex flex-wrap justify-center gap-4">
              <Magnetic>
                <Link
                  href="/shop"
                  className="group inline-flex items-center gap-3 rounded-full bg-bone py-4 pl-7 pr-3 text-[15px] font-semibold text-abyss transition-colors hover:bg-white"
                >
                  Browse the catch
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-abyss text-bone transition-transform duration-500 group-hover:rotate-45">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </Link>
              </Magnetic>
              <Magnetic strength={0.2}>
                <Link
                  href="/contact"
                  className="inline-flex items-center rounded-full border border-white/25 px-7 py-4 text-[15px] font-semibold text-bone/90 transition-colors hover:border-white/60 hover:text-white"
                >
                  Talk to our team
                </Link>
              </Magnetic>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
