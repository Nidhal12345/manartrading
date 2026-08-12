import Photo from "./ui/Photo";
import { Link } from "@/i18n/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import Reveal from "./Reveal";
import { SectionIntro } from "./Decor";
import type { ImageKey } from "@/lib/images";

/**
 * One heading's worth of the range. Assembled on the server so the catalogue is
 * never serialised into the client bundle just to print three tiles.
 */
export type ShowcaseCard = {
  slug: string;
  name: string;
  arabic: string;
  href: string;
  image: ImageKey;
};

/**
 * The tile that opens the whole counter rather than one heading of it. It is not
 * a category, so it has no row in `@/data/categories` — its photograph is the
 * one shot in the registry that shows the range as a whole rather than a
 * species.
 */
const ALL_IMAGE: ImageKey = "fishRows";

/**
 * The range, as a full-bleed row of doors.
 *
 * The photograph does the work and one plate names the door. Everything else
 * came off: the transom name boards, the bilingual pair on every card, the line
 * count, and the stencilled list of species under each heading. That list was
 * the section's whole argument before — it is now the shop's job, which is where
 * a buyer scanning for Hamour ends up anyway, and it was pushing the two cards
 * so tall the photographs read as thumbnails.
 *
 * The row bleeds the full width of the viewport with only a hairline gap between
 * tiles, so the three photographs read as one band across the page rather than
 * as cards floating on chalk. The section intro stays inside `container-x`: it
 * belongs to the numbered argument running down the home page, the band does not.
 *
 * The plate is square, in limewash on tar. It is the one place this section
 * departs from the reference it was built against, which sets the same label in
 * a rounded white pill — nothing on this site carries a corner radius, and a
 * pill here would be the only one on the page. Same silhouette, painted.
 *
 * The plate is lettered in the reader's own script alone. A door needs one word
 * on it, and an Arabic visitor should be reading Arabic at size rather than
 * skimming a Latin transliteration beside it.
 */
export default async function CategoryShowcase({
  cards,
}: {
  cards: ShowcaseCard[];
}) {
  const t = await getTranslations("Range");
  const isRtl = (await getLocale()) === "ar";

  const tiles = [
    { key: "all", label: t("all"), href: "/shop", image: ALL_IMAGE },
    ...cards.map((c) => ({
      key: c.slug,
      label: isRtl ? c.arabic : c.name,
      href: c.href,
      image: c.image,
    })),
  ];

  return (
    <section className="bg-chalk py-24 md:py-32">
      <div className="container-x">
        <SectionIntro
          index="01"
          eyebrow={t("eyebrow")}
          title={t("title")}
          copy={t("copy")}
        />
      </div>

      <div className="mt-14 grid gap-2 sm:grid-cols-3 sm:gap-2.5 lg:mt-16">
        {tiles.map((tile, i) => (
          <Reveal key={tile.key} blur={false} delay={i * 0.08}>
            <Link
              href={tile.href}
              className="group relative block h-[400px] overflow-hidden bg-tar focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-ochre sm:h-[500px] lg:h-[600px]"
            >
              <Photo
                image={tile.image}
                res={1200}
                sizes="(max-width: 640px) 100vw, 33vw"
                className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
              />

              {/* A thin wash of tar, so the plate holds against a bright frame
                  and deepens as the door is approached. */}
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-tar/15 transition-colors duration-500 group-hover:bg-tar/30"
              />

              <span className="absolute inset-0 flex items-center justify-center p-5">
                <span className="title inline-flex max-w-full items-center justify-center bg-limewash px-8 py-5 text-center text-[19px] uppercase leading-[1.15] tracking-[0.03em] text-tar transition-colors duration-300 group-hover:bg-tar group-hover:text-limewash sm:min-w-[12rem] md:px-10 md:text-[21px] lg:min-w-[14rem]">
                  {tile.label}
                </span>
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
