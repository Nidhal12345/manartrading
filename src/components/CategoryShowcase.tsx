"use client";

import Photo from "./ui/Photo";
import { Link } from "@/i18n/navigation";
import { motion } from "motion/react";
import { ArrowRight, Star } from "lucide-react";
import type { ImageKey } from "@/lib/images";

/**
 * One card's worth of a category, assembled on the server so the whole
 * 63-line catalogue never has to be serialised into the client bundle just to
 * print four ratings.
 */
export type ShowcaseCard = {
  slug: string;
  name: string;
  arabic: string;
  href: string;
  image: ImageKey;
  /** Lines carried, shown on the image as a pill. */
  count: number;
  rating: number;
  reviews: number;
};

/**
 * The category index as a shop shelf: a heading with one "view all" action,
 * then a grid of cards that each carry a photograph, a rating and a single
 * unmissable button.
 *
 * It replaces the editorial hover-preview list that stood here. That list was
 * a nice object but it asked the reader to hover ten rows to learn anything;
 * this reads as a counter, which is what the client asked for.
 *
 * No prices: the counter quotes by the kilo on WhatsApp at the time of the
 * order, so the card carries no figure that could go stale.
 *
 * Every figure on a card is rolled up from the products in that category —
 * see `categoryStats` in `@/data/products` — so nothing here can drift out of
 * step with the catalogue.
 */
export default function CategoryShowcase({
  title,
  cards,
  viewAllHref = "/shop",
  viewAllLabel = "View all",
}: {
  title: string;
  cards: ShowcaseCard[];
  viewAllHref?: string;
  viewAllLabel?: string;
}) {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="container-x">
        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-5">
          <h2 className="display-lg text-ink">{title}</h2>

          <Link
            href={viewAllHref}
            className="rounded-full border border-ink/25 px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-ink transition-colors duration-300 hover:border-ocean hover:bg-ocean hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ocean"
          >
            {viewAllLabel}
          </Link>
        </div>

        {/* Two-up then four-up, with no three-up step: the section carries four
            cards, and a 3-column tablet layout would leave one stranded on a
            row of its own. */}
        <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
          {cards.map((c, i) => (
            <ShelfCard key={c.slug} card={c} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ShelfCard({ card: c, index }: { card: ShowcaseCard; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.7,
        // Staggering by column rather than by index: on a four-up grid the
        // fifth card sits under the first, and a running delay would leave the
        // second row crawling in long after it is already on screen.
        delay: (index % 4) * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group flex flex-col"
    >
      <Link
        href={c.href}
        tabIndex={-1}
        aria-hidden="true"
        className="block overflow-hidden bg-sea-100"
      >
        <div className="relative aspect-square">
          <Photo
            image={c.image}
            res={900}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 46vw, 23vw"
            className="object-cover transition-transform duration-[1.1s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
          />
          <span className="label absolute start-3 top-3 rounded-full bg-bone/95 px-2.5 py-1 text-[9.5px] text-abyss">
            {c.count} lines
          </span>
        </div>
      </Link>

      <div className="flex flex-1 flex-col pt-4">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
          <span className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                aria-hidden="true"
                className={`h-3.5 w-3.5 ${
                  i < Math.round(c.rating)
                    ? "fill-sand text-sand"
                    : "text-ink/15"
                }`}
              />
            ))}
          </span>
          {/* The stars are decorative; this is the line a screen reader gets. */}
          <span className="text-[12.5px] text-ink/55">
            <span className="sr-only">Rated {c.rating} out of 5 from </span>
            {c.reviews.toLocaleString("en-US")} reviews
          </span>
        </div>

        <h3 className="mt-2.5 text-[14.5px] font-semibold uppercase leading-snug tracking-[0.01em] text-ink sm:text-[15.5px]">
          <Link
            href={c.href}
            className="transition-colors duration-300 group-hover:text-ocean focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ocean"
          >
            {c.name}
          </Link>
        </h3>

        <p className="mt-1 text-[12.5px] text-ink/40" dir="rtl">
          {c.arabic}
        </p>

        {/* The button is pinned to the bottom, so a two-line category name on
            one card does not leave its neighbours' buttons sitting higher than
            its own. `pt-5` is the floor on that gap for the tallest card, where
            `mt-auto` has no slack left to give.

            Three links on the card point at the same page, so only this one is
            named for assistive tech — the image link is hidden from it and the
            heading link already reads the category name. */}
        <div className="mt-auto pt-5">
          <Link
            href={c.href}
            className="flex items-center justify-center gap-2 bg-ocean px-3 py-3 text-[11px] font-semibold uppercase tracking-[0.1em] text-white transition-colors duration-300 hover:bg-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ocean sm:gap-2.5 sm:px-4 sm:py-3.5 sm:text-[12.5px] sm:tracking-[0.12em]"
          >
            <span>Shop now</span>
            {/* Leading space so the name is not run into the label when the two
                spans are concatenated into one accessible name. */}
            <span className="sr-only"> {c.name}</span>
            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4 rtl:-scale-x-100"
            />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
