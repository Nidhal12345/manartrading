"use client";

import { useCallback, useEffect, useRef, useSyncExternalStore } from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaCarouselType } from "embla-carousel";
import { useLocale, useTranslations } from "next-intl";
import { useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";

import Photo from "./ui/Photo";
import { Link } from "@/i18n/navigation";
import { TradeName } from "./Decor";
import type { BestSellerLine } from "./BestSellers";

/**
 * Embla's own parallax constant. The factor is this times the number of snap
 * points, so the drift stays even whether the rail pages four cards or one.
 */
const TWEEN_FACTOR_BASE = 0.2;

/**
 * How far the photograph's layer hangs past its window, per side, as a
 * percentage. The tween is clamped to exactly this, so the drift can never pull
 * a bare edge into frame — at an adjacent snap the raw factor asks for 20–30%,
 * which is well past the overhang.
 */
const PARALLAX_OVERHANG = 14;

/**
 * The best-seller shelf, as a carousel.
 *
 * Client, because a carousel is: the section shell around it stays on the
 * server and hands down flattened lines, so the catalogue is still not in the
 * bundle.
 *
 * Embla rather than a hand-rolled scroller. It is headless — it ships behaviour
 * and no styling, so the cards stay in the boatyard system instead of arriving
 * with a theme to override — and it supports RTL natively, which is the whole
 * argument on a bilingual site.
 *
 * The parallax follows Embla's documented tween. Each photograph sits in an
 * `overflow: hidden` window over a layer wider than that window; on every
 * scroll frame the layer is translated by a fraction of the slide's distance
 * from its snap point. The image therefore drifts against the card rather than
 * riding flat with it — a headland seen past a boat under way, which is the one
 * motion this whole site is about.
 *
 * Cards size to the rail rather than to their own aspect ratio: the section is
 * one viewport tall, so the photograph takes whatever height is left after the
 * type, and every card in the rail agrees on it.
 */
export default function BestSellerCarousel({
  lines,
}: {
  lines: BestSellerLine[];
}) {
  const t = useTranslations("Best");
  const isRtl = useLocale() === "ar";
  const reduced = useReducedMotion();

  const [emblaRef, embla] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    slidesToScroll: "auto",
    // Embla drives RTL itself; DOM order stays the source of truth, so the
    // shelf reads right-to-left on the Arabic page without reversing the array.
    direction: isRtl ? "rtl" : "ltr",
    // A drag still animates — this only removes the long eased glide for
    // visitors who asked the OS for less motion.
    duration: reduced ? 0 : 26,
  });

  // ---------- the parallax tween ----------

  const tweenFactor = useRef(0);
  const tweenNodes = useRef<HTMLElement[]>([]);

  const setTweenNodes = useCallback((api: EmblaCarouselType) => {
    tweenNodes.current = api
      .slideNodes()
      .map((node) => node.querySelector<HTMLElement>("[data-parallax-layer]"))
      .filter((node): node is HTMLElement => node !== null);
  }, []);

  const setTweenFactor = useCallback((api: EmblaCarouselType) => {
    tweenFactor.current = TWEEN_FACTOR_BASE * api.scrollSnapList().length;
  }, []);

  const tweenParallax = useCallback(
    (api: EmblaCarouselType, eventName?: string) => {
      const engine = api.internalEngine();
      const scrollProgress = api.scrollProgress();
      const slidesInView = api.slidesInView();
      const isScrollEvent = eventName === "scroll";

      api.scrollSnapList().forEach((scrollSnap, snapIndex) => {
        const diffToTarget = scrollSnap - scrollProgress;

        // With `slidesToScroll: "auto"` one snap point covers several slides,
        // so the registry is what maps a snap back to the cards it moves.
        engine.slideRegistry[snapIndex].forEach((slideIndex) => {
          // Mid-drag, only tween what is actually on screen — the rest is work
          // no one can see. On reInit every node is done regardless.
          if (isScrollEvent && !slidesInView.includes(slideIndex)) return;

          const node = tweenNodes.current[slideIndex];
          if (!node) return;

          // Clamped to the overhang. Unclamped, a card two snaps away is asked
          // to translate further than the layer hangs past its window, and the
          // tar behind the photograph shows along one edge.
          const raw = diffToTarget * -1 * tweenFactor.current * 100;
          const translate = Math.max(
            -PARALLAX_OVERHANG,
            Math.min(PARALLAX_OVERHANG, raw),
          );
          node.style.transform = `translateX(${translate}%)`;
        });
      });
    },
    [],
  );

  useEffect(() => {
    if (!embla) return;

    // Someone who asked the OS for less motion does not want photographs
    // sliding inside their frames. The layer stays where the CSS put it.
    if (reduced) return;

    const onScroll = () => tweenParallax(embla, "scroll");
    const onReInit = () => {
      setTweenNodes(embla);
      setTweenFactor(embla);
      tweenParallax(embla);
    };

    onReInit();
    embla.on("reInit", onReInit).on("scroll", onScroll);

    return () => {
      // The same references that went in, or nothing is removed.
      embla.off("reInit", onReInit).off("scroll", onScroll);
    };
  }, [embla, reduced, setTweenNodes, setTweenFactor, tweenParallax]);

  // ---------- navigation state ----------

  /**
   * Read straight out of embla rather than copied into React state. Embla is an
   * external store with its own event stream; mirroring it in an effect means a
   * second render after every drag, and the two can disagree for a frame.
   *
   * Every snapshot is a primitive, which is what keeps `getSnapshot` stable:
   * `scrollSnapList()` allocates a fresh array per call, so returning it would
   * loop forever — the dots subscribe to its length instead.
   */
  const subscribe = useCallback(
    (onChange: () => void) => {
      if (!embla) return () => {};

      embla.on("select", onChange).on("reInit", onChange);
      return () => {
        embla.off("select", onChange).off("reInit", onChange);
      };
    },
    [embla],
  );

  const pageCount = useSyncExternalStore(
    subscribe,
    () => embla?.scrollSnapList().length ?? 0,
    () => 0,
  );
  const selected = useSyncExternalStore(
    subscribe,
    () => embla?.selectedScrollSnap() ?? 0,
    () => 0,
  );
  const canPrev = useSyncExternalStore(
    subscribe,
    () => embla?.canScrollPrev() ?? false,
    () => false,
  );
  const canNext = useSyncExternalStore(
    subscribe,
    () => embla?.canScrollNext() ?? false,
    () => false,
  );

  // One page is the whole shelf — there is nothing to page through, so the
  // controls would be decoration.
  const paged = pageCount > 1;

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={t("carouselLabel")}
      className="flex h-full flex-col"
    >
      <div
        className="min-h-0 flex-1 overflow-hidden [--gap:1rem] md:[--gap:1.25rem]"
        ref={emblaRef}
      >
        <div className="flex h-full touch-pan-y [backface-visibility:hidden] ms-[calc(var(--gap)*-1)]">
          {lines.map((line, i) => (
            <div
              key={line.slug}
              role="group"
              aria-roledescription="slide"
              aria-label={t("slideLabel", { index: i + 1, total: lines.length })}
              className="min-w-0 shrink-0 grow-0 basis-[80%] ps-[var(--gap)] sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
            >
              <LineCard line={line} />
            </div>
          ))}
        </div>
      </div>

      {paged && (
        <div className="mt-7 flex shrink-0 items-center gap-5">
          {/* Off on a phone. A touch rail is dragged, not clicked through, so a
              pair of 44px tiles there is a control for a gesture the visitor is
              already making — and it is the widest thing in the closing row on
              the narrowest screen. The dots stay at every width: they are what
              tells anyone where they are in the shelf, and being real buttons
              they are also what lets a keyboard jump it in one move, which is
              the reason hiding the arrows costs nothing. */}
          <div className="hidden items-center gap-2 sm:flex">
            <RailButton
              onClick={() => embla?.scrollPrev()}
              disabled={!canPrev}
              label={t("prev")}
              rtl={isRtl}
              dir="prev"
            />
            <RailButton
              onClick={() => embla?.scrollNext()}
              disabled={!canNext}
              label={t("next")}
              rtl={isRtl}
              dir="next"
            />
          </div>

          {/* Real buttons, not a decorative strip: a dot is the only affordance
              that lets a keyboard jump the rail in one move. */}
          <div className="flex items-center gap-2">
            {Array.from({ length: pageCount }, (_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => embla?.scrollTo(i)}
                aria-label={t("pageLabel", { index: i + 1 })}
                aria-current={i === selected ? "true" : undefined}
                className="group/dot grid h-8 w-6 place-items-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ochre"
              >
                <span
                  className={`h-0.5 w-full transition-colors duration-500 ${
                    i === selected
                      ? "bg-limewash"
                      : "bg-limewash/30 group-hover/dot:bg-limewash/60"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * A rail control. Square, because nothing in this system is a circle — the
 * arrows are painted tiles like the ones on the cards.
 */
function RailButton({
  onClick,
  disabled,
  label,
  rtl,
  dir,
}: {
  onClick: () => void;
  disabled: boolean;
  label: string;
  rtl: boolean;
  dir: "prev" | "next";
}) {
  // Which way the arrow physically points, once the page has been flipped.
  const back = dir === "prev" ? !rtl : rtl;
  const Icon = back ? ArrowLeft : ArrowRight;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="grid h-11 w-11 place-items-center border border-limewash/35 text-limewash transition-colors duration-500 hover:border-limewash hover:bg-limewash hover:text-hull disabled:pointer-events-none disabled:border-limewash/15 disabled:text-limewash/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ochre"
    >
      <Icon aria-hidden="true" className="h-4 w-4" />
    </button>
  );
}

/**
 * One line on the shelf: a chalk card on the cobalt field.
 *
 * The whole card is the link, and the oxide bar at its foot is a `span` rather
 * than a second control — nesting a real button inside the link would give a
 * keyboard two stops for one destination.
 *
 * The photograph takes the height the type does not, so cards match across the
 * rail at any viewport instead of each setting its own aspect ratio.
 */
function LineCard({ line: p }: { line: BestSellerLine }) {
  const t = useTranslations("Best");
  const tShop = useTranslations("Shop");
  const isRtl = useLocale() === "ar";

  return (
    <article className="h-full">
      <Link
        href={`/shop/${p.slug}`}
        className="group flex h-full flex-col bg-chalk transition-shadow duration-500 hover:shadow-lift focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ochre"
      >
        {/* The parallax window. It owns the card's spare height, but never less
            than a photograph can survive: `min-h-0` alone let it collapse to
            nothing once the heading and closing row had taken the viewport, so
            the floor is stated and `flex-1` only ever adds to it. */}
        <div className="relative min-h-[13rem] flex-1 overflow-hidden bg-tar sm:min-h-[14rem]">
          {/* The layer the tween moves: it hangs past its window on both sides
              by exactly the clamp above, so it can drift without ever exposing
              a bare edge. Symmetric, so it behaves the same whichever way the
              page runs. */}
          <div
            data-parallax-layer
            className="absolute inset-y-0 -left-[14%] -right-[14%] will-change-transform"
          >
            <Photo
              image={p.image}
              res={900}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 60vw, 40vw"
              className="object-cover transition-transform duration-[1.1s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
            />
          </div>

          {/* Just enough tar at the head of the shot to hold the badge. */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-20 bg-[linear-gradient(180deg,rgba(26,20,16,0.55)_0%,rgba(26,20,16,0)_100%)]"
          />

          {p.badge && (
            <span className="label absolute end-0 top-4 bg-oxide px-3 py-1.5 text-limewash">
              {tShop(`badges.${p.badge}`)}
            </span>
          )}

          {/* Tar dripping off the photograph onto the chalk — the signature
              edge, at card scale, exactly where two materials meet. */}
          <div
            aria-hidden="true"
            className="waterline absolute inset-x-0 bottom-0"
          />
        </div>

        <div className="shrink-0 p-5">
          <h3
            className={`text-tar ${
              isRtl
                ? "font-arabic-display text-[21px] leading-[1.3]"
                : "font-display text-[20px] uppercase leading-none"
            }`}
          >
            {isRtl ? p.arabic : p.name}
          </h3>

          <TradeName
            latin={p.name}
            arabic={p.arabic}
            isRtl={isRtl}
            className="mt-1.5 block text-[13.5px] leading-none text-tar/60"
          />

          {/* The water the line came out of used to sit here. It is a fact about
              a single line rather than a reason to open one, and it was printed
              on all six cards; it now appears once, on the product's own spec
              sheet. The home page still argues the three waters in the fork
              section further down, so the shelf lost a repetition, not the
              argument. The photograph takes the height back — this column is
              `shrink-0` and the frame above it is `flex-1`. */}
          <span className="mt-6 flex items-center justify-between gap-3 bg-oxide px-5 py-3 text-[13px] font-semibold uppercase tracking-[0.08em] text-limewash transition-colors duration-500 group-hover:bg-oxide-lit">
            {t("cardCta")}
            <ArrowUpRight
              aria-hidden="true"
              className="h-4 w-4 shrink-0 transition-transform duration-500 group-hover:rotate-45 rtl-flip"
            />
          </span>
        </div>
      </Link>
    </article>
  );
}
