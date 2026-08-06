"use client";

import Photo from "./ui/Photo";
import Magnetic from "./ui/Magnetic";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";
import type { ImageKey } from "@/lib/images";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

export type OfferingStats = {
  /** Species on the counter — everything landed that is not shellfish. */
  fishCount: number;
};

/**
 * One cell of a row's docket. Figures live in their own `.numeral` span rather
 * than being interpolated through ICU, which would render them as Arabic-Indic
 * digits in `ar` and clash with every other price on the site.
 */
type Cell = {
  label: string;
  /** A bare number — set this or `text`, never both. Counts up on entry. */
  figure?: number;
  text?: string;
  unit?: string;
  /** Set when `text` is a spec code, so bidi doesn't reorder it under `ar`. */
  ltr?: boolean;
};

type Row = {
  key: string;
  image: ImageKey;
  href: string;
  kicker: string;
  title: string;
  arabic: string;
  copy: string;
  cta: string;
  cells: Cell[];
};

/**
 * Three doors into the catalogue, directly under the hero: the fish counter,
 * the shellfish season, and standing orders for kitchens. It opens straight on
 * the first photograph — no section heading — so the hero hands off to an image
 * rather than to another block of type.
 *
 * These are parallel choices, not steps, so the rows carry no sequence numbers.
 * Each ends in a docket instead: hairline cells in the language of a market
 * slip, stating what you get rather than what it costs. Prices live on the
 * product pages, where they can be kept honest against the morning's landing.
 */
export default function Offerings({ stats }: { stats: OfferingStats }) {
  const t = useTranslations("Offerings");

  // Message keys are spelled out rather than built from an id, so next-intl can
  // still type-check every lookup.
  const rows: Row[] = [
    {
      key: "fish",
      image: "fishRows",
      href: "/shop",
      kicker: t("fish.kicker"),
      title: t("fish.title"),
      arabic: t("fish.arabic"),
      copy: t("fish.copy"),
      cta: t("fish.cta"),
      cells: [
        {
          label: t("fish.countLabel"),
          figure: stats.fishCount,
          unit: t("fish.countUnit"),
        },
      ],
    },
    {
      key: "shellfish",
      image: "prawnsOnIce",
      href: "/shop/robyan-tiger-prawns",
      kicker: t("shellfish.kicker"),
      title: t("shellfish.title"),
      arabic: t("shellfish.arabic"),
      copy: t("shellfish.copy"),
      cta: t("shellfish.cta"),
      cells: [
        {
          label: t("shellfish.gradeLabel"),
          text: t("shellfish.grade"),
          ltr: true,
        },
      ],
    },
    {
      key: "orders",
      image: "marketCounter",
      href: "/contact",
      kicker: t("orders.kicker"),
      title: t("orders.title"),
      arabic: t("orders.arabic"),
      copy: t("orders.copy"),
      cta: t("orders.cta"),
      cells: [
        { label: t("orders.minLabel"), figure: 20, unit: t("orders.minUnit") },
        { label: t("orders.slotLabel"), text: t("orders.slot") },
      ],
    },
  ];

  return (
    <section className="border-b border-ink/10 bg-bone py-16 lg:py-20">
      <div className="container-x">
        {rows.map((row, i) => (
          <OfferingRow
            key={row.key}
            row={row}
            flipped={i % 2 === 1}
            ruled={i > 0}
          />
        ))}
      </div>
    </section>
  );
}

function OfferingRow({
  row,
  flipped,
  ruled,
}: {
  row: Row;
  flipped: boolean;
  ruled: boolean;
}) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Everything below is motion. Under `reduce` this block never runs, and
      // because every entry tween is a `from`, the markup is already in its
      // final state — nothing to undo.
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const q = gsap.utils.selector(root);
        const frame = q("[data-frame]")[0];
        const plate = q("[data-plate]")[0];
        const copyCol = q("[data-copy-col]")[0];

        // The rule draws itself in from the inline start, so the three rows
        // read as one ledger being written down the page.
        const rule = q("[data-rule]")[0];
        if (rule) {
          gsap.from(rule, {
            scaleX: 0,
            duration: 1.2,
            ease: "power3.inOut",
            scrollTrigger: { trigger: rule, start: "top 94%" },
          });
        }

        // The photograph is the section's one loud moment: the frame opens
        // upward while the image inside settles out of an oversize crop, so it
        // arrives as a print being laid down rather than a box fading in.
        gsap
          .timeline({ scrollTrigger: { trigger: frame, start: "top 85%" } })
          .fromTo(
            frame,
            { clipPath: "inset(100% 0% 0% 0%)" },
            // Explicit end state: the frame has no clip-path of its own, and a
            // plain `from` would leave GSAP interpolating towards `none`.
            { clipPath: "inset(0% 0% 0% 0%)", duration: 1.5, ease: "expo.out" },
          )
          .from(plate, { scale: 1.16, duration: 1.9, ease: "expo.out" }, 0)
          .from(
            q("[data-caption] > *"),
            {
              yPercent: 130,
              autoAlpha: 0,
              duration: 0.9,
              stagger: 0.1,
              ease: "power3.out",
            },
            0.55,
          );

        // Drift. The plate is 9% taller than the frame either side, so ±6%
        // never exposes an edge.
        gsap.fromTo(
          plate,
          { yPercent: -6 },
          {
            yPercent: 6,
            ease: "none",
            scrollTrigger: {
              trigger: frame,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.6,
            },
          },
        );

        // The copy column gets its own trigger rather than sharing the photo's.
        // Stacked on a phone it sits a full screen below the image, and a
        // shared trigger would play it out of sight.
        const tl = gsap.timeline({
          scrollTrigger: { trigger: copyCol, start: "top 84%" },
        });

        tl.from(q("[data-copy]"), {
          y: 26,
          autoAlpha: 0,
          duration: 1,
          ease: "power3.out",
        })
          .from(
            q("[data-cell]"),
            {
              y: 22,
              autoAlpha: 0,
              duration: 0.85,
              stagger: 0.12,
              ease: "power3.out",
            },
            0.18,
          )
          .from(
            q("[data-cta]"),
            { y: 18, autoAlpha: 0, duration: 0.8, ease: "power3.out" },
            0.42,
          );

        // Figures tick up to their value. Written as a plain string so the
        // digits stay Latin in Arabic, like every other number on the site.
        q("[data-count]").forEach((el, i) => {
          const to = Number(el.getAttribute("data-count"));
          const proxy = { v: 0 };
          tl.to(
            proxy,
            {
              v: to,
              duration: 1.2,
              ease: "power2.out",
              onUpdate: () => {
                el.textContent = String(Math.round(proxy.v));
              },
            },
            0.24 + i * 0.12,
          );
        });

        // Heading, line by line, each behind its own mask. `autoSplit` re-splits
        // and replays if the display face lands late or the column is resized,
        // which is what otherwise leaves headings measured against a fallback.
        SplitText.create(q("[data-heading]")[0], {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.lines, {
              yPercent: 110,
              duration: 1.1,
              stagger: 0.09,
              ease: "expo.out",
              scrollTrigger: { trigger: copyCol, start: "top 84%" },
            }),
        });
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root}>
      {ruled && (
        <span
          aria-hidden="true"
          data-rule
          className="my-10 block h-px origin-left bg-ink/15 lg:my-14 rtl:origin-right"
        />
      )}

      <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
        {/* photograph */}
        <div className={flipped ? "lg:order-2" : "lg:order-1"}>
          <div
            data-frame
            className="group relative aspect-[4/3] overflow-hidden bg-abyss"
          >
            {/* the inner plate is taller than the frame so the drift never
                exposes an edge */}
            <div
              data-plate
              className="absolute inset-x-0 -inset-y-[9%] will-change-transform"
            >
              <Photo
                image={row.image}
                res={1200}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
              />
            </div>

            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,20,31,0)_45%,rgba(4,20,31,0.8))]"
            />
            <div aria-hidden="true" className="noise" />

            {/* The whole frame is a second route to the same page — a bigger
                target for a pointer. It duplicates the button below, so it is
                taken out of the tab order and hidden from assistive tech. */}
            <Link
              href={row.href}
              tabIndex={-1}
              aria-hidden="true"
              className="absolute inset-0"
            />

            {/* Caption. Real content, so it sits outside the hidden link and
                stays readable; pointer events fall through to the link. */}
            <div
              data-caption
              className="pointer-events-none absolute inset-x-0 bottom-0 flex items-baseline justify-between gap-4 p-5 sm:p-6"
            >
              <span className="label text-bone/70">{row.kicker}</span>
              <span className="font-display text-[15px] text-bone/85" dir="rtl">
                {row.arabic}
              </span>
            </div>
          </div>
        </div>

        {/* copy */}
        <div
          data-copy-col
          className={flipped ? "lg:order-1" : "lg:order-2"}
        >
          <div className="max-w-md">
            {/* `h2`: with no section intro above them these are the section's
                top-level headings, so the page's outline stays gap-free.
                Amiri carries diacritics above the line, and the line masks are
                overflow-hidden — RTL needs the extra leading or they clip. */}
            <h2
              data-heading
              className="display-md text-ink rtl:leading-[1.45]"
            >
              {row.title}
            </h2>

            <p
              data-copy
              className="mt-5 text-[15.5px] leading-[1.8] text-ink/65 rtl:leading-[2]"
            >
              {row.copy}
            </p>

            <Docket cells={row.cells} />

            <div data-cta>
              <Magnetic strength={0.2}>
                <Link
                  href={row.href}
                  className="group relative isolate mt-9 inline-flex items-center gap-3 overflow-hidden rounded-full border border-ink/20 py-3.5 pe-3 ps-6 text-[14.5px] font-semibold text-ink transition-colors duration-500 hover:border-ink hover:text-bone focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ocean"
                >
                  {/* fills upward on hover, so the pill resolves into the ink
                      the rest of the section is set in */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-ink transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100"
                  />
                  {row.cta}
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ink text-bone transition-[rotate,background-color,color] duration-500 group-hover:rotate-45 group-hover:bg-bone group-hover:text-ink">
                    <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" />
                  </span>
                </Link>
              </Magnetic>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Hairline cells stating the terms of the sale. Built from the same
 * rule-and-cell vocabulary as the promises and counters grids further down the
 * page, so the section reads as part of one system. Cells size to their content
 * rather than sitting on a fixed grid — a row may carry one or two.
 */
function Docket({ cells }: { cells: Cell[] }) {
  return (
    <dl data-docket className="mt-8 flex flex-wrap border-y border-ink/12">
      {cells.map((cell, i) => (
        <div
          data-cell
          key={cell.label}
          className={
            i === 0
              ? "py-5 pe-10"
              : "border-s border-ink/12 py-5 pe-10 ps-10"
          }
        >
          <dt className="label text-ink/40">{cell.label}</dt>
          <dd className="mt-2.5">
            <span className="flex flex-wrap items-baseline gap-x-1.5">
              {cell.figure !== undefined && (
                <span
                  data-count={cell.figure}
                  className="numeral text-[22px] leading-none text-ink"
                >
                  {cell.figure}
                </span>
              )}
              {cell.text && (
                <span
                  dir={cell.ltr ? "ltr" : undefined}
                  className="font-display text-[20px] leading-none text-ink"
                >
                  {cell.text}
                </span>
              )}
              {cell.unit && (
                <span className="text-[12px] text-ink/45">{cell.unit}</span>
              )}
            </span>
          </dd>
        </div>
      ))}
    </dl>
  );
}
