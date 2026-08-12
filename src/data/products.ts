import type { ImageKey } from "@/lib/images";

/**
 * The shop catalogue — 16 lines across the 2 categories on the spec sheet.
 *
 * Mirrors `./categories`, which indexes the same 2 headings on the home page.
 * That file lists the range; this one is what the counter actually sells, so
 * every line here carries a grade table and a detail page.
 *
 * No prices anywhere in this file, by design: the counter quotes by the kilo
 * on WhatsApp when the order is placed, and a figure written down here would
 * ship in the client bundle and go stale the next morning.
 *
 * PLACEHOLDER DATA: the categories and the Arabic/English names are the
 * client's own, from `products-data.json`. Everything else — scientific names,
 * waters, origins, ratings, nutrition, copy — is stand-in content to be
 * replaced with the real figures, same as the photography. Nothing here should
 * be quoted to a customer as-is.
 */

export type Category = "Fish" | "Crustaceans & Seafood";

/** Imported covers the farmed and North Atlantic lines that are neither local sea. */
export type Waters = "Red Sea" | "Arabian Gulf" | "Imported";

/**
 * The second axis of the taxonomy: not "which fish" but "which fish, cut how".
 *
 * It lives here rather than in the diagram component because it is catalogue
 * data — the shop filters on it and the detail page quotes it — and the drawing
 * is only one way of rendering it.
 *
 * PLACEHOLDER, in the same sense as the rest of this file: the vocabulary is
 * real and the per-line assignment is a reasonable reading of the trade (a
 * 300 g Rabbitfish is not steaked; a crab is not filleted), but it has not been
 * confirmed against what the counter will actually cut. Confirm before it is
 * quoted to a customer.
 */
export const PREPARATIONS = [
  "whole",
  "cleaned",
  "steaked",
  "filleted",
  "butterflied",
] as const;

export type Preparation = (typeof PREPARATIONS)[number];

/**
 * The counter's shorthand for why a line stands out.
 *
 * A key rather than a phrase: printed English on the Arabic page was the bug
 * this replaces, and the three words are translated through `Shop.badges.*`.
 *
 * PLACEHOLDER, in the same sense as the rest of this file — which lines carry
 * which badge is the client's to confirm, and nothing on the site quotes a
 * figure behind them.
 */
export const BADGES = ["bestSeller", "premium", "chefsPick"] as const;

export type Badge = (typeof BADGES)[number];

export type Product = {
  slug: string;
  name: string;
  arabic: string;
  scientific: string;
  category: Category;
  origin: string;
  waters: Waters;
  season: string;
  method: string;
  /** How this line can be prepared, in `PREPARATIONS` order. Never empty. */
  preparation: Preparation[];
  rating: number;
  reviews: number;
  badge?: Badge;
  /** Primary shot — the product photograph. */
  image: ImageKey;
  /** Detail-page gallery: the product in the wild, and plated. */
  wild: ImageKey;
  cooked: ImageKey;
  /** Accent tint used for washes and gradients. */
  palette: [string, string, string];
  tagline: string;
  description: string;
  highlights: string[];
  bestFor: string[];
  texture: string;
  flavour: string;
  nutrition: { protein: number; fat: number; omega3: number; calories: number };
  sizes: { label: string; weight: string }[];
  inStock: boolean;
};

/* ------------------------------------------------------------------ *
 * Category defaults
 *
 * Shared presentation and handling detail lives here rather than being
 * repeated across every entry. A line only states what makes it different.
 * ------------------------------------------------------------------ */

type CategoryDefaults = {
  images: { image: ImageKey; wild: ImageKey; cooked: ImageKey };
  palette: [string, string, string];
  season: string;
  method: string;
  /** The cuts this whole heading takes; a line overrides it only where it differs. */
  preparation: Preparation[];
  texture: string;
  flavour: string;
  bestFor: string[];
  /** `{name}` is substituted with the product name. */
  highlights: string[];
  sizes: { label: string; weight: string }[];
  nutrition: { protein: number; fat: number; omega3: number; calories: number };
  /** Opening sentence of the detail-page description. */
  blurb: string;
};

const DEFAULTS: Record<Category, CategoryDefaults> = {
  Fish: {
    images: { image: "mackerelBlue", wild: "wildSpotted", cooked: "charcoalGrill" },
    palette: ["#123C63", "#2A6E9E", "#7FC5D9"],
    season: "Year-round, peak Oct – Mar",
    method: "Hand line & net",
    preparation: ["whole", "cleaned", "steaked", "filleted", "butterflied"],
    texture: "Firm, medium flake",
    flavour: "Clean and full",
    bestFor: ["Charcoal grill", "Whole roast", "Sayadiyah", "Curry"],
    highlights: [
      "Landed and iced within hours of the catch",
      "Scaled, gutted and portioned free of charge",
      "Graded on whole-fish weight",
      "Cold chain maintained end to end",
    ],
    sizes: [
      { label: "Small", weight: "0.8 – 1.5 kg" },
      { label: "Medium", weight: "1.5 – 2.5 kg" },
      { label: "Large", weight: "2.5 – 4.0 kg" },
    ],
    nutrition: { protein: 20.6, fat: 2.4, omega3: 0.5, calories: 104 },
    blurb: "Landed on the Red Sea and Gulf coasts, graded fresh every day.",
  },

  "Crustaceans & Seafood": {
    images: { image: "prawnsOnIce", wild: "wildReef", cooked: "grilledPlate" },
    palette: ["#C1443C", "#F0785C", "#FBC0A4"],
    season: "Year-round, peak Oct – Apr",
    method: "Trap, trawl & net caught",
    /* Nothing under this heading is filleted; a line that can be split for the
       grill, or cross-cut into rings, says so on its own row. */
    preparation: ["whole", "cleaned"],
    texture: "Firm, snappy bite",
    flavour: "Sweet and briny",
    bestFor: ["Garlic butter", "Grill skewers", "Flash fry", "Salona"],
    highlights: [
      "Graded by piece weight or count per kilo",
      "Cleaned and prepared to order — never in advance",
      "Held live or blast-frozen at landing",
      "Cold chain maintained end to end",
    ],
    sizes: [
      { label: "Small", weight: "per kg" },
      { label: "Medium", weight: "per kg" },
      { label: "Large", weight: "per kg" },
    ],
    nutrition: { protein: 19.4, fat: 1.4, omega3: 0.4, calories: 92 },
    blurb: "Handled cold and fast, which is the whole trick with shellfish.",
  },
};

/* ------------------------------------------------------------------ *
 * Line specs — one row per product on the spec sheet
 * ------------------------------------------------------------------ */

type Spec = {
  name: string;
  arabic: string;
  scientific: string;
  waters: Waters;
  origin: string;
  tagline: string;
  badge?: Badge;
  /** Overrides the category default where this line cuts differently. */
  preparation?: Preparation[];
  /**
   * Overrides the category default photo where a species-specific shot exists.
   *
   * Without it every Fish line shares one mackerel photograph and every
   * shellfish line shares one bowl of prawns — invisible while the two shots
   * only ever appear on separate pages, and obvious the moment six lines are
   * shown side by side.
   */
  image?: ImageKey;
};

const CATALOGUE: Record<Category, Spec[]> = {
  Fish: [
    {
      name: "Trevally",
      arabic: "الناجل",
      scientific: "Plectropomus areolatus",
      waters: "Red Sea",
      origin: "Farasan Banks",
      tagline: "The one the Jeddah counters sell out of first.",
      badge: "premium",
      image: "blueTableFish",
    },
    {
      name: "Shareefi",
      arabic: "الشريفي",
      scientific: "Carangoides spp.",
      waters: "Red Sea",
      origin: "Al Lith & Qunfudhah",
      tagline: "Smaller, leaner, and a favourite off the charcoal.",
      image: "shareefiStudio",
      // Comes in too small to cross-cut into steaks that hold together.
      preparation: ["whole", "cleaned", "filleted", "butterflied"],
    },
    {
      name: "Grouper",
      arabic: "الهامور",
      scientific: "Epinephelus coioides",
      waters: "Red Sea",
      origin: "Jazan & Farasan Banks",
      tagline: "The undisputed king of the Saudi table.",
      badge: "bestSeller",
      // The one line whose photograph is the species on its own row —
      // `grouperStudio` is Epinephelus coioides, not a market frame that
      // happens to have a grouper in it. Worth pinning here: this is the
      // best-sellers lead plate, so it is the shot the home page opens with,
      // and it is cut to clear the carousel's parallax window — the earlier
      // `grouperSpecimen` ran to 94% of the frame width and lost its snout and
      // tail there. See the note on the key in src/lib/images.ts.
      image: "grouperStudio",
    },
    {
      name: "Parrotfish",
      arabic: "الحريد",
      scientific: "Scarus ghobban",
      waters: "Red Sea",
      origin: "Farasan Islands",
      tagline: "Bright as a coral reef, mild as they come.",
      image: "parrotfishStudio",
      preparation: ["whole", "cleaned", "filleted", "butterflied"],
    },
    {
      name: "Emperor (Spangled Emperor)",
      arabic: "الشعور",
      scientific: "Lethrinus nebulosus",
      waters: "Red Sea",
      origin: "Al Lith & Qunfudhah",
      tagline: "The everyday fish that never disappoints.",
      image: "emperorStudio",
    },
    {
      name: "Kingfish (Spanish Mackerel)",
      arabic: "الكنعد",
      scientific: "Scomberomorus commerson",
      waters: "Arabian Gulf",
      origin: "Dammam & Qatif landings",
      tagline: "The grill fish this country runs on.",
      badge: "bestSeller",
      // The category default already *is* the spotted mackerel shot, but it is
      // stated here so a change to the Fish default cannot silently take the
      // one photograph that names this line correctly.
      image: "mackerelBlue",
    },
    {
      name: "Sea Bream",
      arabic: "الدنيس",
      scientific: "Sparus aurata",
      waters: "Imported",
      origin: "Greece & Turkey",
      tagline: "Salt-baked or grilled whole, nothing else needed.",
      image: "seaBreamStudio",
      preparation: ["whole", "cleaned", "filleted", "butterflied"],
    },
    {
      name: "Sea Bass",
      arabic: "القاروص",
      scientific: "Dicentrarchus labrax",
      waters: "Imported",
      origin: "Greece & Turkey",
      tagline: "Plate-sized, whole, and impossible to get wrong.",
      image: "seaBassStudio",
      preparation: ["whole", "cleaned", "filleted", "butterflied"],
    },
    {
      name: "Rabbitfish (White-spotted Spinefoot)",
      arabic: "الصافي",
      scientific: "Siganus canaliculatus",
      waters: "Arabian Gulf",
      origin: "Qatif & Tarout Bay",
      tagline: "Small, sweet, and eaten whole with your hands.",
      image: "rabbitfishStudio",
      // A 300 g fish. Steaking or filleting it would leave nothing on the plate.
      preparation: ["whole", "cleaned", "butterflied"],
    },
    {
      name: "Bayadh",
      arabic: "البياض",
      scientific: "Lates niloticus",
      waters: "Imported",
      origin: "Lake Victoria",
      tagline: "Thick white loins that hold their shape.",
      // Arrives as loins, not as a whole fish, so the head-on cuts do not apply.
      preparation: ["steaked", "filleted"],
    },
  ],

  "Crustaceans & Seafood": [
    {
      name: "Shrimp / Prawn",
      arabic: "جمبري",
      scientific: "Penaeus semisulcatus",
      waters: "Arabian Gulf",
      origin: "Gulf trawl grounds",
      tagline: "Heads on, because that is where the flavour hides.",
      badge: "bestSeller",
      // Same reasoning as Kingfish: this is the category default today, pinned
      // so a change to the shellfish default cannot take it away.
      image: "prawnsOnIce",
      // Peeled and deveined is "cleaned"; split down the back for a skewer is
      // "butterflied" — the same two words the fish counter uses.
      preparation: ["whole", "cleaned", "butterflied"],
    },
    {
      name: "Crayfish (Spiny Lobster)",
      arabic: "استكوزا",
      scientific: "Panulirus homarus",
      waters: "Red Sea",
      origin: "Farasan Banks",
      tagline: "The whole animal, presented as it came out of the trap.",
      badge: "premium",
      image: "spinyLobster",
      // Halved lengthways for the grill, which is the butterfly cut here.
      preparation: ["whole", "cleaned", "butterflied"],
    },
    {
      name: "Lobster",
      arabic: "لوبستر",
      scientific: "Homarus americanus",
      waters: "Imported",
      origin: "Nova Scotia, Canada",
      tagline: "Cold-water claws, the ones people photograph.",
      preparation: ["whole", "cleaned", "butterflied"],
    },
    {
      name: "Crab",
      arabic: "كابوريا",
      scientific: "Portunus pelagicus",
      waters: "Arabian Gulf",
      origin: "Qatif & Tarout Bay",
      tagline: "Blue swimmer crab, straight from the trap.",
      image: "crabStudio",
    },
    {
      name: "Octopus",
      arabic: "اخطبوط",
      scientific: "Octopus vulgaris",
      waters: "Red Sea",
      origin: "Jeddah coastline",
      tagline: "Gutted, cleaned, and ready for a long slow braise.",
      image: "octopusStudio",
    },
    {
      name: "Squid",
      arabic: "حباره",
      scientific: "Loligo duvauceli",
      waters: "Arabian Gulf",
      origin: "Gulf trawl grounds",
      tagline: "Whole, tubed or ringed — say the word.",
      badge: "chefsPick",
      image: "squidOnIce",
      // Rings are a cross-cut through the tube, which is this line's steaking.
      preparation: ["whole", "cleaned", "steaked"],
    },
  ],
};

/* ------------------------------------------------------------------ *
 * Build
 * ------------------------------------------------------------------ */

/**
 * The route key carries the category as well as the name, so a line that is
 * later carried under two headings cannot collide on one slug.
 */
function toSlug(category: Category, name: string): string {
  const base = `${category} ${name}`
    .toLowerCase()
    .replace(/\(.*?\)/g, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return base;
}

/**
 * Ratings and review counts are placeholder, but they must be identical on the
 * server and the client or React will report a hydration mismatch. Derived from
 * the slug rather than randomised so every build agrees.
 */
function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

function build(category: Category, spec: Spec): Product {
  const d = DEFAULTS[category];
  const slug = toSlug(category, spec.name);
  const h = hash(slug);

  // 4.5 – 5.0 in tenths, and 60 – 240 reviews.
  const rating = Math.round((4.5 + (h % 6) / 10) * 10) / 10;
  const reviews = 60 + ((h >> 3) % 181);

  // Nudge the category baseline so the panel is not identical on every line.
  const drift = ((h >> 7) % 11) / 100;
  const n = d.nutrition;

  return {
    slug,
    name: spec.name,
    arabic: spec.arabic,
    scientific: spec.scientific,
    category,
    origin: spec.origin,
    waters: spec.waters,
    season: d.season,
    method: d.method,
    preparation: spec.preparation ?? d.preparation,
    rating,
    reviews,
    ...(spec.badge ? { badge: spec.badge } : {}),
    image: spec.image ?? d.images.image,
    wild: d.images.wild,
    cooked: d.images.cooked,
    palette: d.palette,
    tagline: spec.tagline,
    description: `${spec.tagline} ${d.blurb} ${spec.name} is supplied from ${spec.origin}, graded on arrival and prepared however your kitchen needs it — tell us in the order notes and it is done right before dispatch, never in advance.`,
    highlights: d.highlights,
    bestFor: d.bestFor,
    texture: d.texture,
    flavour: d.flavour,
    nutrition: {
      protein: Math.round((n.protein + drift * 10) * 10) / 10,
      fat: Math.round((n.fat + drift * 4) * 10) / 10,
      omega3: Math.round((n.omega3 + drift) * 100) / 100,
      calories: Math.round(n.calories + drift * 40),
    },
    sizes: d.sizes,
    inStock: true,
  };
}

export const categoryNames = Object.keys(CATALOGUE) as Category[];

export const products: Product[] = categoryNames.flatMap((c) =>
  CATALOGUE[c].map((spec) => build(c, spec)),
);

export const categories = ["All", ...categoryNames] as const;

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

/**
 * The lines the home page leads with, in the order it shows them — the first is
 * the one that gets the photograph.
 *
 * Slugs rather than a `badge` filter: the section is a curated shelf, and which
 * six lines sit on it is an editorial decision the client makes by reordering
 * this array. A filter would have made the order an accident of catalogue
 * position and the count an accident of how many badges were assigned.
 *
 * PLACEHOLDER, like the badges it draws on. Nothing rendered from this list is
 * a ranking or a sales figure — see `Best.note` in the message files.
 */
export const BEST_SELLER_SLUGS = [
  "fish-grouper",
  "fish-kingfish",
  "crustaceans-seafood-shrimp-prawn",
  "crustaceans-seafood-crayfish",
  "fish-trevally",
  "crustaceans-seafood-squid",
] as const;

/**
 * Resolved best-seller lines, in `BEST_SELLER_SLUGS` order.
 *
 * A slug that no longer exists drops out silently rather than throwing: the
 * catalogue is placeholder data due to be replaced wholesale, and a renamed line
 * should cost the home page one plate, not the whole build.
 */
export function bestSellers(): Product[] {
  return BEST_SELLER_SLUGS.map((slug) => getProduct(slug)).filter(
    (p): p is Product => Boolean(p),
  );
}

export function relatedProducts(slug: string, limit = 3) {
  const current = getProduct(slug);
  if (!current) return products.slice(0, limit);
  const sameCategory = products.filter(
    (p) => p.slug !== slug && p.category === current.category,
  );
  const others = products.filter(
    (p) => p.slug !== slug && p.category !== current.category,
  );
  return [...sameCategory, ...others].slice(0, limit);
}

export type CategoryStat = {
  /** How many lines the counter carries under this heading. */
  count: number;
  /** Mean of the lines' ratings, to one decimal. */
  rating: number;
  /** Reviews across every line, so the figure grows with the range. */
  reviews: number;
};

/**
 * Category-level figures for the home page cards, rolled up from the lines
 * themselves. Every number here is derived from `products` rather than written
 * down a second time, so the cards cannot drift out of step with the catalogue
 * when the spec sheet is replaced.
 *
 * Computed once at module load, not per render: the catalogue is static.
 */
export const categoryStats: Record<Category, CategoryStat> = Object.fromEntries(
  categoryNames.map((c) => {
    const lines = products.filter((p) => p.category === c);
    const sum = lines.reduce((t, p) => t + p.rating, 0);
    return [
      c,
      {
        count: lines.length,
        rating: Math.round((sum / lines.length) * 10) / 10,
        reviews: lines.reduce((t, p) => t + p.reviews, 0),
      } satisfies CategoryStat,
    ];
  }),
) as Record<Category, CategoryStat>;
