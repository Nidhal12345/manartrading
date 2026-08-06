"use client";

import Photo from "./ui/Photo";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import SplitText from "./ui/SplitText";
import Magnetic from "./ui/Magnetic";

export default function HeroCinematic() {
  const t = useTranslations("Hero");

  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const [videoReady, setVideoReady] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.06, 1.18]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const copyFade = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const veil = useTransform(scrollYProgress, [0, 1], [0.55, 0.9]);

  // Parallax is motion too — hold everything still when the OS asks us to.
  const plateStyle = reduceMotion ? undefined : { y: imageY, scale: imageScale };
  const copyStyle = reduceMotion ? undefined : { y: copyY, opacity: copyFade };
  const veilStyle = reduceMotion ? { opacity: 0.72 } : { opacity: veil };

  return (
    <section
      ref={ref}
      className="relative flex h-[100svh] min-h-[600px] w-full flex-col overflow-hidden bg-abyss text-bone"
    >
      {/* plate: the photograph paints instantly and the video cross-fades over
          the same frame once it can play */}
      <motion.div
        aria-hidden="true"
        style={plateStyle}
        className="absolute inset-0 will-change-transform"
      >
        <Photo
          image="heroDeep"
          res={2000}
          eager
          sizes="100vw"
          className="object-cover"
        />

        {!reduceMotion && (
          <video
            autoPlay
            muted
            loop
            playsInline
            disablePictureInPicture
            preload="auto"
            aria-hidden="true"
            tabIndex={-1}
            ref={(el) => {
              // onCanPlay can fire before React attaches the handler.
              if (el && el.readyState >= 2) setVideoReady(true);
            }}
            onCanPlay={() => setVideoReady(true)}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
              videoReady ? "opacity-100" : "opacity-0"
            }`}
          >
            <source src="/hero2.mp4" type="video/mp4" />
          </video>
        )}
      </motion.div>

      {/* grading */}
      <motion.div
        aria-hidden="true"
        style={veilStyle}
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,20,31,0.82)_0%,rgba(4,20,31,0.35)_38%,rgba(4,20,31,0.88)_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(120%_90%_at_15%_20%,rgba(14,107,168,0.35),transparent_60%)]"
      />
      {/* extra floor on small screens: the copy sits low, over the busiest
          part of the frame */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-2/3 bg-[linear-gradient(180deg,transparent,rgba(4,20,31,0.85))] sm:hidden"
      />
      <div className="caustics" aria-hidden="true" />
      <div className="noise" aria-hidden="true" />

      {/* ---------- copy ---------- */}
      <motion.div
        style={copyStyle}
        className="relative flex flex-1 flex-col justify-end pb-[calc(3.5rem+env(safe-area-inset-bottom))] pt-24 sm:justify-center sm:pb-24 sm:pt-28"
      >
        <div className="container-x">
          <h1 className="hero-legible hero-display max-w-[15ch]">
            <SplitText text={t("titleLine1")} animateOnMount className="block" />
            <SplitText
              text={t("titleLine2")}
              animateOnMount
              delay={0.28}
              className="block text-sea-300"
              wordClassName="italic-serif"
            />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="hero-legible mt-6 max-w-[52ch] text-pretty text-[15.5px] leading-[1.75] text-bone/80 sm:mt-7 sm:text-[17px] sm:leading-[1.7] rtl:leading-[2]"
          >
            {t("subtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="mt-9 flex flex-col items-stretch gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4"
          >
            <Magnetic className="w-full sm:w-auto">
              <Link
                href="/shop"
                className="group flex w-full items-center justify-between gap-3 rounded-full bg-bone py-3.5 ps-6 pe-3 text-[15px] font-semibold text-abyss transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-aqua sm:inline-flex sm:w-auto sm:justify-start sm:py-4 sm:ps-7"
              >
                {t("ctaCatch")}
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-abyss text-bone transition-transform duration-500 group-hover:rotate-45">
                  <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" />
                </span>
              </Link>
            </Magnetic>

            <Magnetic className="w-full sm:w-auto" strength={0.2}>
              <Link
                href="/about"
                className="flex w-full items-center justify-center gap-2 rounded-full border border-white/30 px-6 py-3.5 text-[15px] font-semibold text-bone/90 transition-colors hover:border-white/60 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-aqua sm:inline-flex sm:w-auto sm:py-4"
              >
                {t("ctaHow")}
              </Link>
            </Magnetic>
          </motion.div>
        </div>
      </motion.div>

      {/* scroll cue */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.8 }}
        className="container-x pointer-events-none absolute inset-x-0 bottom-8 hidden sm:block"
      >
        <div className="flex items-center justify-end gap-3">
          <span className="label text-bone/55">{t("scroll")}</span>
          <span className="relative h-12 w-px overflow-hidden bg-white/20">
            <span className="animate-scroll-hint absolute inset-x-0 top-0 h-1/2 bg-aqua" />
          </span>
          <ArrowDown className="h-3.5 w-3.5 text-bone/55" />
        </div>
      </motion.div>
    </section>
  );
}
