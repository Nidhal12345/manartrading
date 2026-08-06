"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

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
          className="fixed inset-0 z-[80] grid place-items-center bg-abyss"
        >
          <div className="noise" />
          <div className="relative text-center">
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="display-md text-bone"
            >
              Manar Trading
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25, duration: 0.6 }}
              className="label mt-4 text-sea-300/70"
            >
              Red Sea &amp; Arabian Gulf
            </motion.p>

            <div className="relative mx-auto mt-8 h-px w-40 overflow-hidden bg-white/15">
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.35, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 origin-left bg-aqua"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
