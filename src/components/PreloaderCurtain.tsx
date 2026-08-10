"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

/**
 * First-visit curtain, repainted for the boatyard.
 *
 * It used to be an abyss-blue field with film grain, a bone wordmark and an aqua
 * progress bar — `bg-abyss`, `text-bone`, `text-sea-300` and `bg-aqua` are all
 * tokens the new `@theme` block no longer defines, so the panel was rendering
 * transparent over the page beneath it. Repainted rather than patched: tar field,
 * the wordmark in both scripts, and the loading bar is the site's own waterline
 * being struck left to right.
 *
 * No translated copy. The mark is the brand name in both scripts, which is what a
 * painted transom carries in either locale, so the curtain needs no message keys
 * and reads correctly before the page it covers has committed to a direction.
 */

const KEY = "manar-intro-seen";

/** Runs browser-only (mounted via next/dynamic), so it can read storage up front. */
function alreadySeen() {
  return (
    sessionStorage.getItem(KEY) !== null ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export default function PreloaderCurtain() {
  const [done, setDone] = useState(alreadySeen);

  useEffect(() => {
    if (done) return;

    document.body.style.overflow = "hidden";
    const timer = setTimeout(() => {
      sessionStorage.setItem(KEY, "1");
      document.body.style.overflow = "";
      setDone(true);
    }, 1500);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 1 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[80] grid place-items-center bg-tar"
        >
          <div className="text-center">
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="numeral text-[clamp(1.9rem,6vw,2.9rem)] uppercase leading-none text-limewash"
            >
              Manar Trading
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25, duration: 0.6 }}
              className="font-arabic-display mt-4 text-[17px] leading-none text-limewash/55"
              dir="rtl"
              lang="ar"
            >
              منار التجارية
            </motion.p>

            {/* The waterline itself, struck against tape: a hard cobalt rule
                drawn from one side to the other, not a generic loading bar. */}
            <div className="relative mx-auto mt-9 h-0.5 w-44 overflow-hidden bg-limewash/12">
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.35, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 origin-left bg-hull-lit rtl:origin-right"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
