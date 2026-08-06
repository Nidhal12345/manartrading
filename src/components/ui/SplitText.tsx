"use client";

import { motion, type Variants } from "motion/react";
import type { ElementType } from "react";

const wordVariants: Variants = {
  hidden: { y: "110%", rotate: 2 },
  show: (i: number) => ({
    y: "0%",
    rotate: 0,
    transition: {
      duration: 0.9,
      delay: i * 0.055,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

/**
 * Reveals a line of text word by word out of an overflow mask.
 * The full string stays available to screen readers and crawlers via aria-label.
 */
export default function SplitText({
  text,
  as: Tag = "span",
  className,
  wordClassName,
  delay = 0,
  once = true,
  animateOnMount = false,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  wordClassName?: string;
  delay?: number;
  once?: boolean;
  animateOnMount?: boolean;
}) {
  const words = text.split(" ");
  const trigger = animateOnMount
    ? { animate: "show" as const }
    : {
        whileInView: "show" as const,
        viewport: { once, amount: 0.4 } as const,
      };

  return (
    <Tag className={className} aria-label={text}>
      {/*
        The trigger belongs here, on an untransformed wrapper — never on the
        words themselves. Each word parks 110% below an `overflow-hidden`
        mask, and IntersectionObserver clips a target against its ancestors'
        overflow, so a word's own observed ratio is ~0 no matter where the
        page is scrolled. Observing the word would therefore never reach the
        0.4 threshold: it would stay hidden below the mask forever, invisible
        but still selectable. This wrapper is neither moved nor clipped, so it
        is seen normally and the variant cascades down to the words.
      */}
      <motion.span className="inline" initial="hidden" {...trigger}>
        {words.map((word, i) => (
          <span key={`${word}-${i}`} aria-hidden="true">
            <span className="inline-block overflow-hidden py-[0.08em] align-bottom">
              <motion.span
                className={`inline-block ${wordClassName ?? ""}`}
                variants={wordVariants}
                custom={i + delay * 18}
              >
                {word}
              </motion.span>
            </span>
            {i < words.length - 1 ? " " : null}
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
