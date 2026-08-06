"use client";

import Photo from "./ui/Photo";
import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { type ImageKey } from "@/lib/images";

const steps: { n: string; title: string; copy: string; image: ImageKey }[] = [
  {
    n: "01",
    title: "The boats come in",
    copy: "Crews we have worked with for years radio ahead with what they have, and we buy on the spot — no auction house, no middleman, no second day.",
    image: "boatDawn",
  },
  {
    n: "02",
    title: "Graded and buried in ice",
    copy: "Gill colour, eye clarity, firmness. Anything that does not pass goes back. What does is packed into flake ice within minutes of leaving the hull and never leaves 0 – 2 °C again.",
    image: "tunaOnIceBW",
  },
  {
    n: "03",
    title: "Cut the way you cook",
    copy: "Whole, scaled, butterflied, steaked or filleted — you tell us when you order and it is prepared right before dispatch, not the night before. It costs nothing extra.",
    image: "cuttingLoin",
  },
  {
    n: "04",
    title: "At your door the same day",
    copy: "Sealed in an insulated box with gel ice and tracked to your kitchen, so it is on your counter in time for dinner.",
    image: "fishmonger",
  },
];

export default function ProcessSticky() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={ref} className="relative lg:grid lg:grid-cols-2 lg:gap-16">
      {/* pinned imagery */}
      <div className="hidden lg:block">
        <div className="sticky top-0 flex h-screen items-center">
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-abyss">
            {steps.map((s, i) => (
              <Frame
                key={s.n}
                index={i}
                total={steps.length}
                progress={scrollYProgress}
                image={s.image}
              />
            ))}
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_60%,rgba(4,20,31,0.65))]" />
            <div className="noise" />
          </div>
        </div>
      </div>

      {/* steps */}
      <div>
        {steps.map((s) => (
          <div
            key={s.n}
            className="flex min-h-[70vh] flex-col justify-center py-14 lg:min-h-screen lg:py-0"
          >
            <div className="relative mb-8 aspect-[16/10] w-full overflow-hidden bg-abyss lg:hidden">
              <Photo
                image={s.image}
                res={900}
                sizes="100vw"
                className="object-cover"
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="numeral text-[13px] text-aqua">{s.n}</span>
              <div className="rule mt-5 text-bone" />
              <h3 className="display-lg mt-7 max-w-[14ch] text-bone">
                {s.title}
              </h3>
              <p className="mt-6 max-w-md text-[16px] leading-relaxed text-bone/60">
                {s.copy}
              </p>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Frame({
  index,
  total,
  progress,
  image,
}: {
  index: number;
  total: number;
  progress: MotionValue<number>;
  image: ImageKey;
}) {
  const band = 1 / total;
  const start = index * band;
  // scroll progress is 0–1: ranges must stay inside it and never decrease,
  // otherwise the browser rejects the generated animation offsets.
  const at = (offset: number) =>
    Math.min(1, Math.max(0, start + band * offset));

  // fade each frame in at the top of its band and out at the bottom
  const opacity = useTransform(
    progress,
    [at(-0.22), at(0.12), at(0.85), at(1.1)],
    index === 0 ? [1, 1, 1, 0] : [0, 1, 1, 0],
  );
  const scale = useTransform(progress, [at(-0.3), at(1.2)], [1.12, 1]);

  return (
    <motion.div style={{ opacity }} className="absolute inset-0">
      <motion.div style={{ scale }} className="absolute inset-0">
        <Photo
          image={image}
          res={1200}
          sizes="(max-width: 1024px) 100vw, 45vw"
          className="object-cover"
        />
      </motion.div>
    </motion.div>
  );
}
