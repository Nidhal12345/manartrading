"use client";

import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { Search, X } from "lucide-react";
import ProductCard from "./ProductCard";
import { categories, type Product } from "@/data/products";

type Sort = "featured" | "price-asc" | "price-desc" | "rating";

const sorts: { value: Sort; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "rating", label: "Top rated" },
];

const waters = ["All waters", "Red Sea", "Arabian Gulf"] as const;

export default function ShopClient({ products }: { products: Product[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");
  const [water, setWater] = useState<string>("All waters");
  const [sort, setSort] = useState<Sort>("featured");
  const [maxPrice, setMaxPrice] = useState(120);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = products.filter((p) => {
      const matchesQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.arabic.includes(q) ||
        p.scientific.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q);
      const matchesCategory = category === "All" || p.category === category;
      const matchesWater = water === "All waters" || p.waters === water;
      return (
        matchesQuery && matchesCategory && matchesWater && p.price <= maxPrice
      );
    });

    switch (sort) {
      case "price-asc":
        return [...list].sort((a, b) => a.price - b.price);
      case "price-desc":
        return [...list].sort((a, b) => b.price - a.price);
      case "rating":
        return [...list].sort((a, b) => b.rating - a.rating);
      default:
        return list;
    }
  }, [products, query, category, water, sort, maxPrice]);

  const dirty =
    query !== "" ||
    category !== "All" ||
    water !== "All waters" ||
    maxPrice < 120;

  const reset = () => {
    setQuery("");
    setCategory("All");
    setWater("All waters");
    setMaxPrice(120);
    setSort("featured");
  };

  return (
    <div className="container-x py-16 lg:py-20">
      {/* ---------- filter rail ---------- */}
      <div className="sticky top-[78px] z-30 -mx-5 mb-12 border-b border-ink/12 bg-white/90 px-5 py-4 backdrop-blur-xl md:-mx-10 md:px-10">
        <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
          <div className="relative min-w-[180px] flex-1">
            <Search className="pointer-events-none absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/35" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Hamour, Kanad, prawns…"
              aria-label="Search products"
              className="w-full border-b border-transparent bg-transparent py-2 pl-7 text-[15px] text-ink outline-none transition placeholder:text-ink/35 focus:border-ink"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`rounded-full px-4 py-2 text-[13px] font-medium transition-all ${
                  category === c
                    ? "bg-ink text-bone"
                    : "border border-ink/15 text-ink/60 hover:border-ink/45 hover:text-ink"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <label className="flex items-center gap-2.5 text-[13px] text-ink/55">
            Sort
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="border-b border-ink/20 bg-transparent py-2 pr-1 text-[13.5px] font-medium text-ink outline-none transition focus:border-ink"
            >
              {sorts.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-x-8 gap-y-3">
          <div className="flex items-center gap-2">
            {waters.map((w) => (
              <button
                key={w}
                onClick={() => setWater(w)}
                className={`text-[13px] transition-colors ${
                  water === w
                    ? "text-ink underline underline-offset-4"
                    : "text-ink/40 hover:text-ink/70"
                }`}
              >
                {w}
              </button>
            ))}
          </div>

          <label className="flex flex-1 items-center gap-3 text-[13px] text-ink/55 sm:max-w-xs">
            <span className="whitespace-nowrap">Under</span>
            <input
              type="range"
              min={30}
              max={120}
              step={5}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              aria-label="Maximum price per kilo"
              className="flex-1 accent-[#0e6ba8]"
            />
            <span className="numeral whitespace-nowrap text-ink">
              {maxPrice} SAR
            </span>
          </label>

          <p className="ml-auto text-[13px] text-ink/50">
            <span className="numeral text-ink">{filtered.length}</span> of{" "}
            {products.length} species available
          </p>

          {dirty && (
            <button
              onClick={reset}
              className="flex items-center gap-1.5 text-[13px] font-medium text-ocean hover:underline"
            >
              <X className="h-3.5 w-3.5" />
              Clear
            </button>
          )}
        </div>
      </div>

      {/* ---------- grid ---------- */}
      {filtered.length > 0 ? (
        <motion.div
          layout
          className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i} />
          ))}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="border border-dashed border-ink/15 px-6 py-24 text-center"
        >
          <h3 className="display-md text-ink">Nothing matches that</h3>
          <p className="mx-auto mt-3 max-w-sm text-[14.5px] text-ink/55">
            Try widening the price range or clearing the filters — we land
            something different most days.
          </p>
          <button
            onClick={reset}
            className="mt-8 rounded-full bg-ink px-7 py-3.5 text-[14px] font-semibold text-bone transition-colors hover:bg-ocean"
          >
            Clear all filters
          </button>
        </motion.div>
      )}
    </div>
  );
}
