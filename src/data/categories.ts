import type { ImageKey } from "@/lib/images";

/**
 * The supply catalogue indexed on the home page.
 *
 * This is the trading range — what Manar can source and ship — which mirrors
 * the daily counter in `./products`. Nothing here carries a price: the lines
 * are quoted per order, against the morning's landing and the volume.
 *
 * `name` must match a `Category` in `./products` exactly — the home page joins
 * the two files on it to roll up each card's figures.
 *
 * `href` points at the shop until per-category shop routes exist; changing this
 * one field per row is all that is needed to wire them up later.
 */
export type ProductCategory = {
  slug: string;
  name: string;
  arabic: string;
  /** The lines carried under this heading, as written on the spec sheet. */
  products: string[];
  href: string;
  image: ImageKey;
  /** Accent tint for the cursor-preview wash. */
  palette: [string, string, string];
};

export const productCategories: ProductCategory[] = [
  {
    slug: "fish",
    name: "Fish",
    arabic: "الأسماك",
    products: [
      "Trevally",
      "Shareefi",
      "Grouper",
      "Parrotfish",
      "Emperor (Spangled Emperor)",
      "Kingfish (Spanish Mackerel)",
      "Sea Bream",
      "Sea Bass",
      "Rabbitfish (White-spotted Spinefoot)",
      "Bayadh",
    ],
    href: "/shop",
    image: "categoryFish",
    palette: ["#123C63", "#2A6E9E", "#7FC5D9"],
  },
  {
    slug: "crustaceans-seafood",
    name: "Crustaceans & Seafood",
    arabic: "القشريات والمأكولات البحرية",
    products: [
      "Shrimp / Prawn",
      "Crayfish (Spiny Lobster)",
      "Lobster",
      "Crab",
      "Octopus",
      "Squid",
    ],
    href: "/shop",
    image: "categoryCrustaceans",
    palette: ["#C1443C", "#F0785C", "#FBC0A4"],
  },
];
