"use client";

import Photo from "./ui/Photo";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { ArrowDown, ArrowUpRight, MessageCircle } from "lucide-react";
import SplitText from "./ui/SplitText";
import { whatsappHref } from "@/lib/contact";

/**
 * The hero is the site's one full statement of the world: a hauled hull, read
 * from the quay.
 *
 * The band across the top is cobalt topside paint. The field below it is the
 * tarred bottom. Between them sits the waterline — struck straight against tape,
 * ragged underneath, with the cobalt running down into the tar. It is the only
 * edge treatment on the site, and it is introduced here at full width before it
 * is used anywhere else.
 *
 * The field below the waterline is a loop of the working water, under the same
 * tar gradient the photograph carried. It is background, not content: muted,
 * looping, no controls, no sound, and it states nothing the copy does not.
 * `boatDawn` stays mounted beneath it as the first frame and as the whole of
 * what a reduced-motion visitor sees.
 *
 * This is not the loop that stood here before the redesign. That one was
 * underwater — drifting caustics and film grain over magnetic pill buttons —
 * and it was the category default this site exists to refuse. The surface is
 * the subject here, read from the quay, and the paint above it is unchanged.
 *
 * `pt-[76px]` clears the fixed header, which is a 74px nav row and the 2px
 * scroll rule.
 */
export default function HeroCinematic() {
  const t = useTranslations("Hero");
  const nav = useTranslations("Nav");
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduceMotion = useReducedMotion();

  /**
   * The still holds the frame until the loop is actually painting. Video decode
   * is not instant even from cache, and without this the hero opens on flat tar
   * for a beat — the one thing a hero cannot do. `onPlaying` rather than
   * `onCanPlay`: the latter fires while the first frame is still nothing.
   */
  const [videoPlaying, setVideoPlaying] = useState(false);

  /**
   * `autoPlay` is a request, and on a phone it is routinely refused. iOS declines
   * it outright in Low Power Mode, Android declines it under Data Saver, and both
   * decline it when the decode is not ready at the moment the attribute is read.
   * The attribute is evaluated once and never retried, so a refusal is permanent
   * and silent — which is exactly the reported symptom: the hero sits on the
   * still on a phone and plays on a desktop.
   *
   * So play is asked for explicitly, and asked again on the first thing the
   * visitor does. A muted inline video is allowed to start on any user
   * activation, and a tap or a scroll anywhere on the page is one — so nothing is
   * ever presented for them to press. This is background, not content: there is
   * no control to add, only a request to repeat.
   */
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    /* One controller does both jobs: it drops the listeners the moment play
       succeeds, and it drops them again if the hero unmounts first. That is
       what removes the need for a `detach` and an `attempt` that refer to each
       other — a pair of hoisted `function` declarations, which is also what
       loses the narrowing on `el` and fails the build, since a hoisted function
       could in principle run before the null check above it. An arrow declared
       after the check keeps it. */
    const controller = new AbortController();

    const attempt = () => {
      if (!el.paused) return;
      /* A rejection here is the browser's policy answer, not a fault, and the
         still underneath is already the answer to it. Swallowed on purpose. */
      void el.play().then(() => controller.abort(), () => {});
    };

    attempt();
    for (const ev of ["pointerdown", "touchstart", "keydown", "scroll"]) {
      window.addEventListener(ev, attempt, {
        passive: true,
        signal: controller.signal,
      });
    }

    return () => controller.abort();
  }, [reduceMotion]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // The hull settles while the waterline above it holds still. That contrast is
  // the whole effect, so the travel is short — 8%, where the old parallax ran
  // 22% and took the horizon with it.
  const hullY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);
  const copyFade = useTransform(scrollYProgress, [0, 0.72], [1, 0]);

  const hullStyle = reduceMotion ? undefined : { y: hullY };
  const copyStyle = reduceMotion ? undefined : { opacity: copyFade };

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] w-full flex-col bg-tar text-limewash"
    >
      {/* Topsides. A plain band of cobalt above the waterline — it carries no
          copy, so the paint and the drip line are the whole statement. */}
      <div className="relative z-10 bg-hull pt-[76px]">
        {/* Cobalt is taped over tar, so the drips that escape the line are
            cobalt and they run down into the dark field below. */}
        <div
          aria-hidden="true"
          className="waterline absolute inset-x-0 bottom-0"
          style={{ ["--waterline" as string]: "var(--color-hull)" }}
        />
      </div>

      {/* Below the waterline */}
      <div className="relative flex flex-1 flex-col overflow-hidden">
        <motion.div
          aria-hidden="true"
          style={hullStyle}
          className="absolute inset-x-0 -inset-y-[10%] will-change-transform"
        >
          {/* The still is the floor, not a fallback: it holds the frame while
              the loop decodes, and it is what a reduced-motion visitor, a
              blocked autoplay or a failed download is left with. It stays
              mounted underneath rather than being swapped out, so there is
              never a frame with nothing in it. */}
          <Photo
            image="boatDawn"
            res={2000}
            eager
            sizes="100vw"
            className="object-cover"
          />

          {/* Someone who asked the OS for less motion gets the still and no
              loop at all — the element is not rendered, so the file is never
              fetched either. */}
          {!reduceMotion && (
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              onPlaying={() => setVideoPlaying(true)}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                videoPlaying ? "opacity-100" : "opacity-0"
              }`}
            >
              <source src="/hero3.mp4" type="video/mp4" />
            </video>
          )}
        </motion.div>

        {/* Tar, not a blue wash. The gradient is the paint the photograph sits
            under, which is why it is warm black at both ends. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(26,20,16,0.74)_0%,rgba(26,20,16,0.52)_38%,rgba(26,20,16,0.96)_100%)]"
        />

        <motion.div
          style={copyStyle}
          className="relative flex flex-1 flex-col justify-end pb-[calc(4.5rem+env(safe-area-inset-bottom))] pt-20 sm:pt-28"
        >
          <div className="container-x">
            {/* The one place on the site where type animates per line. It reads
                as lettering being painted on; everywhere else it fired on every
                heading and made the whole page feel like it was being typed. */}
            <h1 className="hero-display max-w-[15ch] text-limewash">
              <SplitText text={t("titleLine1")} animateOnMount className="block" />
              <SplitText
                text={t("titleLine2")}
                animateOnMount
                delay={0.26}
                className="block text-ochre"
              />
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.66, ease: [0.16, 1, 0.3, 1] }}
              className="mt-7 max-w-[50ch] text-pretty text-[15.5px] leading-[1.8] text-limewash/75 sm:text-[17px] rtl:leading-[2]"
            >
              {t("subtitle")}
            </motion.p>

            {/* Two actions, and they are the two things a visitor actually does:
                look at the range, or talk to the counter. Square, painted, no
                pills — a painted sign has corners. */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center"
            >
              <Link
                href="/shop"
                className="group inline-flex items-center justify-between gap-4 bg-oxide py-4 pe-4 ps-7 text-[15px] font-semibold text-limewash transition-colors hover:bg-oxide-lit focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ochre"
              >
                {t("ctaCatch")}
                <ArrowUpRight className="h-4 w-4 shrink-0 transition-transform duration-500 group-hover:rotate-45 rtl-flip" />
              </Link>

              <a
                href={whatsappHref()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 border border-limewash/30 px-7 py-4 text-[15px] font-semibold text-limewash/90 transition-colors hover:border-limewash hover:text-limewash focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ochre"
              >
                <MessageCircle className="h-4 w-4 shrink-0" />
                {nav("whatsapp")}
              </a>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll cue, on the ochre draft-mark scale rather than an animated
            aqua tick. */}
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="container-x pointer-events-none absolute inset-x-0 bottom-7 hidden sm:block"
        >
          <div className="flex items-center justify-end gap-3">
            <span className="label text-limewash/45">{t("scroll")}</span>
            <ArrowDown className="h-3.5 w-3.5 text-ochre" />
          </div>
        </motion.div>
      </div>

      {/* The tar field ends on the page ground, so the site's own waterline
          hands the hero off to the fork below. */}
      <div
        aria-hidden="true"
        className="waterline absolute inset-x-0 bottom-0 z-10"
      />
    </section>
  );
}
