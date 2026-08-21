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
 * a category, so it has no row in `@/data/categories` — the other two take their
 * frames from there, and this one is named here.
 *
 * It is also the only frame in the set that carries both halves of the range in
 * a single shot: whole fish stacked on the ice with head-on prawns and a crab in
 * front of them. A door marked "all" has to show what is behind all of it.
 */
const ALL_IMAGE: ImageKey = "categoryAll";

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
 * a rounded white pill. The only radius on the site is the 5% softening on the
 * shop card's photograph, and that is a frame around an image rather than a shape
 * cut for a label — a pill here would still be the only pill on the page. Same
 * silhouette, painted.
 *
 * The plate is lettered in the reader's own script alone. A door needs one word
 * on it, and an Arabic visitor should be reading Arabic at size rather than
 * skimming a Latin transliteration beside it.
 *
 * MOTION — one gesture on approach, at three depths. The three frames are now
 * purpose-shot for these tiles (see `categoryAll` and its neighbours in
 * `@/lib/images`) and they are low-key stills on near-black slate, so the door
 * needs an edge to open on rather than a highlight to catch. It gets the site's
 * own motion idea: a 2px rule struck from the reading edge across the foot of the
 * tile, which is where a hull meets the water. It shares the photograph's easing
 * curve and sits between the photograph's push and the plate's inversion in
 * duration, so ground, line and sign resolve as one movement inward instead of
 * three effects that happen to share a trigger.
 *
 * NOTE, not a change — the wash was set at `tar/15` to hold the plate against
 * frames that were considerably brighter than these (`#5f6660`, `#4a7c9b`,
 * `#b4726a` against the new set's `#352b1f`, `#423a34`, `#6b412b`). It may now be
 * doing nothing the photographs are not already doing. Worth a look with fresh
 * eyes before it is either dropped or left alone deliberately.
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
        <SectionIntro title={t("title")} copy={t("copy")} />
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

              {/* The waterline. `origin-left` with an `rtl:origin-right` flip so
                  the rule always draws from the reading edge, the way
                  `animate-waterline` does in globals.css. The global
                  `prefers-reduced-motion` rule zeroes the duration, which leaves
                  the rule simply present on approach rather than absent. */}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-limewash transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100 rtl:origin-right"
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
