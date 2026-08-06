"use client";

import Photo from "./ui/Photo";
import { Link } from "@/i18n/navigation";
import { useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import type { ProductCategory } from "@/data/categories";

/**
 * Editorial index of the range. On pointer devices a preview tile follows the
 * cursor; on touch it degrades to a plain, tappable list.
 */
export default function CategoryList({
  categories,
}: {
  categories: ProductCategory[];
}) {
  const [active, setActive] = useState<number | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 160, damping: 20, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 160, damping: 20, mass: 0.5 });

  return (
    <div
      className="relative"
      onPointerMove={(event) => {
        if (event.pointerType !== "mouse") return;
        const rect = event.currentTarget.getBoundingClientRect();
        x.set(event.clientX - rect.left);
        y.set(event.clientY - rect.top);
      }}
      onPointerLeave={() => setActive(null)}
    >
      {/* cursor preview */}
      <motion.div
        aria-hidden="true"
        style={{ x: sx, y: sy }}
        className="pointer-events-none absolute left-0 top-0 z-20 hidden lg:block"
      >
        <motion.div
          animate={{
            opacity: active === null ? 0 : 1,
            scale: active === null ? 0.85 : 1,
          }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative -ml-[150px] -mt-[100px] h-[260px] w-[300px] overflow-hidden"
        >
          {categories.map((c, i) => (
            <motion.div
              key={c.slug}
              animate={{ opacity: active === i ? 1 : 0 }}
              transition={{ duration: 0.32 }}
              className="absolute inset-0"
            >
              <Photo
                image={c.image}
                res={600}
                sizes="300px"
                className="object-cover"
              />
              <span
                className="absolute inset-0 mix-blend-soft-light opacity-40"
                style={{
                  background: `linear-gradient(160deg, ${c.palette[1]}, ${c.palette[0]})`,
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <ul className="relative border-t border-ink/12">
        {categories.map((c, i) => (
          <li key={c.slug}>
            <Link
              href={c.href}
              onPointerEnter={(event) => {
                if (event.pointerType === "mouse") setActive(i);
              }}
              onFocus={() => setActive(i)}
              className="group flex flex-wrap items-center justify-between gap-x-8 gap-y-4 border-b border-ink/12 py-6 transition-colors sm:py-8"
            >
              <span className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <motion.span
                  animate={{ x: active === i ? 12 : 0 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="display-md text-ink transition-colors group-hover:text-ocean"
                >
                  {c.name}
                </motion.span>
                <span className="text-[13.5px] text-ink/40" dir="rtl">
                  {c.arabic}
                </span>
              </span>

              <span className="inline-flex items-center gap-3 rounded-full border border-ink/15 py-2 pe-2 ps-5 text-[13.5px] font-semibold text-ink transition-colors duration-500 group-hover:border-transparent group-hover:bg-ink group-hover:text-bone">
                View category
                <span className="grid h-8 w-8 place-items-center rounded-full bg-ink text-bone transition-all duration-500 group-hover:bg-bone group-hover:text-ink">
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:rotate-45" />
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
