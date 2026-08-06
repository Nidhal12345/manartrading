"use client";

import Photo from "./ui/Photo";
import { Link } from "@/i18n/navigation";

import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import type { Product } from "@/data/products";

export default function ProductCard({
  product: p,
  index = 0,
}: {
  product: Product;
  index?: number;
}) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.7,
        delay: Math.min(index * 0.06, 0.36),
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group relative"
    >
      <Link href={`/shop/${p.slug}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-sea-100">
          <Photo
            image={p.image}
            res={900}
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover transition-transform duration-[1.1s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.07]"
          />

          {/* tonal wash keeps a mixed photo set feeling like one family */}
          <span
            className="pointer-events-none absolute inset-0 mix-blend-soft-light opacity-45 transition-opacity duration-700 group-hover:opacity-25"
            style={{
              background: `linear-gradient(150deg, ${p.palette[1]} 0%, transparent 55%, ${p.palette[0]} 100%)`,
            }}
          />
          <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(4,20,31,0.35)_0%,transparent_32%,transparent_52%,rgba(4,20,31,0.78)_100%)]" />

          <span className="absolute left-5 top-5 flex items-center gap-2.5">
            <span className="numeral text-[13px] text-bone/70">
              {String(index + 1).padStart(2, "0")}
            </span>
            {p.badge && (
              <span className="label rounded-full bg-bone/95 px-2.5 py-1 text-[9.5px] text-abyss">
                {p.badge}
              </span>
            )}
          </span>

          <span className="label absolute right-5 top-5 text-bone/70">
            {p.waters}
          </span>

          {/* footer of the image */}
          <div className="absolute inset-x-0 bottom-0 p-5">
            <div className="flex items-end justify-between gap-3">
              <div>
                <h3 className="display-md text-bone">{p.name}</h3>
                <p className="mt-1 text-[13px] text-bone/60" dir="rtl">
                  {p.arabic}
                </p>
              </div>
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/25 text-bone transition-all duration-500 group-hover:border-transparent group-hover:bg-bone group-hover:text-abyss">
                <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:rotate-45" />
              </span>
            </div>
          </div>
        </div>

        {/* The price used to sit on the right of this rule. Prices are quoted
            on WhatsApp at the time of the order, so the origin takes the slot —
            it keeps the two-column footer and is the next thing a buyer asks. */}
        <div className="flex items-baseline justify-between gap-4 border-t border-ink/10 pt-4">
          <p className="text-[13.5px] text-ink/55">{p.category}</p>
          <p className="truncate text-[13px] text-ink/40">{p.origin}</p>
        </div>
      </Link>
    </motion.article>
  );
}
