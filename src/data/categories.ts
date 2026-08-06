import type { ImageKey } from "@/lib/images";

/**
 * The supply catalogue indexed on the home page.
 *
 * This is the trading range — what Manar can source and ship — which is wider
 * than the daily counter in `./products`. Nothing here carries a price: the
 * lines are quoted per order, against the morning's landing and the volume.
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
    slug: "lobsters",
    name: "Lobsters",
    arabic: "كركند",
    products: [
      "Rock Lobster Whole",
      "Rock Lobster Tail",
      "Rock Lobster Meat",
      "Sand Lobster Whole",
      "Sand Lobster Tail",
      "Sand Lobster Meat",
      "Canadian Lobster Whole",
    ],
    href: "/shop",
    image: "colourfulCatch",
    palette: ["#8E3B33", "#C1443C", "#F0A08F"],
  },
  {
    slug: "shell-fishes",
    name: "Shell Fishes",
    arabic: "محاريات",
    products: [
      "Green Mussel Half Shell",
      "Green Mussel Whole",
      "Cooked Whole Mussel",
      "Mussel Meat",
      "Crab Whole",
      "Crab Stick",
      "Soft Shell Crab",
      "Snow Crab Leg",
      "King Crab Leg (Raw and Cooked)",
    ],
    href: "/shop",
    image: "marketCounter",
    palette: ["#5F5A50", "#7C7266", "#E0D5C4"],
  },
  {
    slug: "shrimps",
    name: "Shrimps",
    arabic: "روبيان",
    products: [
      "Head On (White, Tiger, Scampi, Flower)",
      "Head Less (White, Tiger, Pink, Scampi, Flower)",
      "Peeled and Deveined Tail On (PDTO)",
      "Peeled and Deveined (PD)",
      "Peeled and Undeveined (PUD)",
      "Cooked PUD / PD",
    ],
    href: "/shop",
    image: "prawnsOnIce",
    palette: ["#C1443C", "#F0785C", "#FBC0A4"],
  },
  {
    slug: "cephalopods",
    name: "Cephalopods",
    arabic: "رأسيات الأرجل",
    products: [
      "Cuttlefish Whole (Whole Cleaned, Fillet)",
      "Squid Whole (Whole Cleaned, Tube, Rings)",
      "Octopus Gutted and Cleaned",
    ],
    href: "/shop",
    image: "fishRows",
    palette: ["#3E4A50", "#5F6660", "#B9C2BD"],
  },
  {
    slug: "sea-water-fishes",
    name: "Fishes (Sea Water)",
    arabic: "أسماك بحرية",
    products: [
      "King Fish",
      "White Pomfret",
      "Black Pomfret",
      "Ribbon Fish",
      "Parrot Fish",
      "Emperor",
      "Barracuda (Agam)",
      "Mackerel",
    ],
    href: "/shop",
    image: "mackerelBlue",
    palette: ["#123C63", "#2A6E9E", "#7FC5D9"],
  },
  {
    slug: "fresh-water-fishes",
    name: "Fishes (Fresh Water)",
    arabic: "أسماك مياه عذبة",
    products: ["Rohu", "Tilapia", "Milkfish", "Pangush"],
    href: "/shop",
    image: "greyWholeFish",
    palette: ["#2E7D6F", "#4FB3A0", "#A9E3D6"],
  },
  {
    slug: "european-fishes",
    name: "European Fishes",
    arabic: "أسماك أوروبية",
    products: ["Salmon Whole", "Rainbow Trout Whole", "Sea Bass", "Sea Bream"],
    href: "/shop",
    image: "marketBream",
    palette: ["#0E6BA8", "#1E9BD7", "#8FD9E8"],
  },
  {
    slug: "fillets",
    name: "Fillets",
    arabic: "فيليه",
    products: [
      "Salmon",
      "Nile Perch",
      "Cream Dory",
      "Pollock",
      "Red Snapper",
      "White Snapper",
      "Grouper Hamour",
      "Pangasius",
      "Basa",
      "Haddock",
    ],
    href: "/shop",
    image: "fishmonger",
    palette: ["#8E5148", "#C0705E", "#F0C3AC"],
  },
  {
    slug: "steaks",
    name: "Steaks",
    arabic: "شرائح",
    products: [
      "King Fish",
      "Salmon",
      "Snapper",
      "Rohu",
      "Pangasius",
      "Barracuda",
      "Jesh",
    ],
    href: "/shop",
    image: "cuttingLoin",
    palette: ["#7A2E2A", "#B04A3E", "#E8A292"],
  },
  {
    slug: "smoked-products",
    name: "Smoked Products",
    arabic: "منتجات مدخنة",
    products: [
      "Salmon",
      "Trout Fillet",
      "Mackerel Whole",
      "Mackerel Fillet",
      "Peppered Mackerel Fillet",
    ],
    href: "/shop",
    image: "charcoalGrill",
    palette: ["#5A4632", "#A8622F", "#E0B183"],
  },
];
