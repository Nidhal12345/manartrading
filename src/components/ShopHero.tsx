import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import Reveal from "./Reveal";

/**
 * The counter's masthead, painted on the hull.
 *
 * THE MOVE. This page is the one surface on the site where the boatyard's
 * central image can be drawn literally rather than quoted. A hauled sambuk is
 * three bands: cobalt topsides, a narrower boot-top stripe of a second blue, and
 * the hand-struck waterline where the paint stops. Below that line is water. So
 * the masthead *is* the hull — `hull-deep` topsides, a `hull` boot-top at its
 * foot, the site's waterline struck across the bottom — and what it hands down
 * to is the `tide` field the catch is laid out on. Paint above, meltwater below,
 * on the one page where both halves of the metaphor are literally true.
 *
 * ONE LINE OF LETTERING, and that is the whole masthead now. It carried three
 * things before: the headline, the same sentence struck underneath in the other
 * script, and a standfirst about availability moving with the boats. All three
 * came off. A catalogue's masthead is a sign over a door, and a sign over a door
 * says what is behind it — everything the standfirst argued (rebuilt as the fish
 * lands, cut how you ask, quoted by the kilo) is said again below, in the note
 * under the board and in the three answers on the cobalt field, where a visitor
 * is actually asking the question. Up here it was a paragraph between a shopper
 * and sixteen photographs.
 *
 * So the heading names the two headings on the board and stops. It is the plainest
 * thing on the site and the largest, which is the trade the boatyard world makes
 * everywhere: signwriter's scale, no adjectives.
 *
 * What this replaced before that. Two earlier openers, in order: a headline beside
 * a framed 4:3 photograph — the seventeenth fish, directly above sixteen studio
 * frames of the actual catch — and then a `limewash` masthead with four counted
 * figures boxed on a `tar` band, which is the hero-metric template. The figures
 * went (a page that opens by counting its own list is a page delaying the list)
 * and the band went with them, which left a light masthead handing to a light
 * grid across a seam nobody could see. This is the field the page always wanted.
 *
 * No eyebrow. The breadcrumb above the headline is navigation with real links in
 * it, not a kicker.
 *
 * `Navbar` has to agree with this file: it decides its own ink from the route,
 * and `/shop` is now a dark hero rather than a light one. The check there is
 * written against `/shop/` with the slash, so a product detail — which does open
 * light, on a breadcrumb strip — keeps its tar ink.
 */

export default async function ShopHero() {
  const t = await getTranslations("Shop");
  const nav = await getTranslations("Nav");

  const crumbs = [{ href: "/", label: nav("home") }, { label: t("crumb") }];

  return (
    <section className="relative bg-hull-deep text-limewash">
      <div className="container-x pt-[124px] pb-16 md:pt-[164px] md:pb-24">
        <Reveal blur={false}>
          {/* The landmark's own name is translated too: it is read out, so an
              English `aria-label` is an English string on the Arabic page. The
              key sits in `Nav` rather than `Shop` because two other breadcrumb
              rails on the site still hardcode it and can adopt it. */}
          <nav
            aria-label={nav("breadcrumb")}
            className="label flex items-center gap-2.5 text-limewash/70"
          >
            {crumbs.map((c, i) => (
              <span key={c.label} className="flex items-center gap-2.5">
                {i > 0 && (
                  <span aria-hidden="true" className="text-limewash/40">
                    /
                  </span>
                )}
                {c.href ? (
                  <Link
                    href={c.href}
                    className="transition-colors hover:text-ochre"
                  >
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-limewash">{c.label}</span>
                )}
              </span>
            ))}
          </nav>
        </Reveal>

        {/* A 20ch measure rather than 16: the heading is a list of two headings
            joined, so it wants to break after the comma and not mid-item. */}
        <Reveal blur={false} delay={0.08}>
          <h1 className="board-display mt-8 max-w-[20ch] text-balance text-limewash lg:mt-10">
            {t("title")}
          </h1>
        </Reveal>
      </div>

      {/* ---------- the boot-top ----------
          The narrower band of second blue every hauled hull carries between its
          topsides and its waterline, struck off the field above by the tape line
          the painter worked to. Paint, not a container: it holds nothing, which
          is why it is thin enough to read as a stripe rather than as an empty
          row, and why it is hidden from assistive tech. */}
      <div
        aria-hidden="true"
        className="h-9 border-t border-hull-lit/45 bg-hull md:h-11"
      />

      {/* And the line itself, in the boot-top's own paint so the drips hang off
          the band they belong to and land on the ice the grid is laid on. */}
      <div
        aria-hidden="true"
        className="waterline absolute inset-x-0 bottom-0"
        style={{ ["--waterline" as string]: "var(--color-hull)" }}
      />
    </section>
  );
}
