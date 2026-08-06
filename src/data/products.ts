import type { ImageKey } from "@/lib/images";

/**
 * The shop catalogue — 63 lines across the 10 categories on the spec sheet.
 *
 * Mirrors `./categories`, which indexes the same 10 headings on the home page.
 * That file lists the range; this one is what the counter actually sells, so
 * every line here carries a grade table and a detail page.
 *
 * No prices anywhere in this file, by design: the counter quotes by the kilo
 * on WhatsApp when the order is placed, and a figure written down here would
 * ship in the client bundle and go stale the next morning.
 *
 * PLACEHOLDER DATA: names and categories come from the spec sheet and are real.
 * Everything else — Arabic and scientific names, ratings, nutrition, copy — is
 * stand-in content to be replaced with the real figures, same as the
 * photography. Nothing here should be quoted to a customer as-is.
 */

export type Category =
  | "Lobsters"
  | "Shell Fishes"
  | "Shrimps"
  | "Cephalopods"
  | "Fishes (Sea Water)"
  | "Fishes (Fresh Water)"
  | "European Fishes"
  | "Fillets"
  | "Steaks"
  | "Smoked Products";

/** Imported covers the farmed and North Atlantic lines that are neither local sea. */
export type Waters = "Red Sea" | "Arabian Gulf" | "Imported";

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
  rating: number;
  reviews: number;
  badge?: string;
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
 * repeated across 63 entries. A line only states what makes it different.
 * ------------------------------------------------------------------ */

type CategoryDefaults = {
  images: { image: ImageKey; wild: ImageKey; cooked: ImageKey };
  palette: [string, string, string];
  season: string;
  method: string;
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
  Lobsters: {
    images: { image: "colourfulCatch", wild: "wildReef", cooked: "grilledPlate" },
    palette: ["#8E3B33", "#C1443C", "#F0A08F"],
    season: "Oct – Apr",
    method: "Trap caught",
    texture: "Firm, dense bite",
    flavour: "Sweet and rich",
    bestFor: ["Grill", "Butter poach", "Thermidor", "Salad"],
    highlights: [
      "Held live or blast-frozen at landing",
      "Graded by piece weight before packing",
      "Prepared to order — split, halved or left whole",
      "Cold chain maintained end to end",
    ],
    sizes: [
      { label: "Small", weight: "200 – 350 g" },
      { label: "Medium", weight: "350 – 600 g" },
      { label: "Large", weight: "600 – 900 g" },
    ],
    nutrition: { protein: 19, fat: 1.1, omega3: 0.3, calories: 89 },
    blurb: "A premium shellfish line kept for the occasions that deserve it.",
  },

  "Shell Fishes": {
    images: { image: "marketCounter", wild: "wildReef", cooked: "charcoalGrill" },
    palette: ["#5F5A50", "#7C7266", "#E0D5C4"],
    season: "Year-round",
    method: "Farmed & trap caught",
    texture: "Tender with a clean bite",
    flavour: "Briny and mineral",
    bestFor: ["Steam", "White wine broth", "Pasta", "Grill"],
    highlights: [
      "Purified and graded before packing",
      "Supplied raw or pre-cooked to order",
      "Packed in sealed food-grade trays",
      "Cold chain maintained end to end",
    ],
    sizes: [
      { label: "1 kg pack", weight: "per kg" },
      { label: "2 kg pack", weight: "per kg" },
      { label: "5 kg box", weight: "per kg" },
    ],
    nutrition: { protein: 18.2, fat: 2.2, omega3: 0.6, calories: 96 },
    blurb: "Shellfish handled cold and fast, which is the whole trick with it.",
  },

  Shrimps: {
    images: { image: "prawnsOnIce", wild: "wildReef", cooked: "charcoalGrill" },
    palette: ["#C1443C", "#F0785C", "#FBC0A4"],
    season: "Aug – Dec (Gulf), year-round imported",
    method: "Licensed trawl & farmed",
    texture: "Firm, snappy",
    flavour: "Sweet, briny",
    bestFor: ["Garlic butter", "Grill skewers", "Biryani", "Salona"],
    highlights: [
      "Graded by count per kilo, sized consistently",
      "Available head-on, headless, peeled or cooked",
      "IQF frozen so you thaw only what you need",
      "Cold chain maintained end to end",
    ],
    sizes: [
      { label: "31/40 count", weight: "per kg" },
      { label: "21/25 count", weight: "per kg" },
      { label: "16/20 count", weight: "per kg" },
    ],
    nutrition: { protein: 20.3, fat: 1.7, omega3: 0.5, calories: 99 },
    blurb: "Our highest-volume line, carried in every cut a kitchen asks for.",
  },

  Cephalopods: {
    images: { image: "fishRows", wild: "wildSpotted", cooked: "grilledLeaf" },
    palette: ["#3E4A50", "#5F6660", "#B9C2BD"],
    season: "Year-round",
    method: "Net & trap caught",
    texture: "Springy, firm",
    flavour: "Clean, faintly sweet",
    bestFor: ["Flash fry", "Grill", "Stew", "Rings"],
    highlights: [
      "Cleaned, gutted and skinned before packing",
      "Supplied whole, tubed or ringed",
      "Frozen at sea on the day of catch",
      "Cold chain maintained end to end",
    ],
    sizes: [
      { label: "Small", weight: "per kg" },
      { label: "Medium", weight: "per kg" },
      { label: "Large", weight: "per kg" },
    ],
    nutrition: { protein: 16.4, fat: 1, omega3: 0.35, calories: 79 },
    blurb: "Cleaned the moment it lands, because texture is lost by waiting.",
  },

  "Fishes (Sea Water)": {
    images: { image: "mackerelBlue", wild: "wildSpotted", cooked: "charcoalGrill" },
    palette: ["#123C63", "#2A6E9E", "#7FC5D9"],
    season: "Year-round, peak Oct – Mar",
    method: "Hand line & net",
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

  "Fishes (Fresh Water)": {
    images: { image: "greyWholeFish", wild: "wildGrouper", cooked: "grilledLeaf" },
    palette: ["#2E7D6F", "#4FB3A0", "#A9E3D6"],
    season: "Year-round",
    method: "Farmed",
    texture: "Soft, fine flake",
    flavour: "Mild and gentle",
    bestFor: ["Fry", "Curry", "Whole roast", "Stew"],
    highlights: [
      "Farmed to a consistent size all year",
      "Scaled and gutted, heads on or off",
      "Steady supply independent of the sea season",
      "Cold chain maintained end to end",
    ],
    sizes: [
      { label: "Small", weight: "0.5 – 1.0 kg" },
      { label: "Medium", weight: "1.0 – 1.8 kg" },
      { label: "Large", weight: "1.8 – 3.0 kg" },
    ],
    nutrition: { protein: 19.2, fat: 2.8, omega3: 0.4, calories: 106 },
    blurb: "A dependable everyday line that never moves with the weather.",
  },

  "European Fishes": {
    images: { image: "marketBream", wild: "wildSpotted", cooked: "grilledPlate" },
    palette: ["#0E6BA8", "#1E9BD7", "#8FD9E8"],
    season: "Year-round",
    method: "Farmed, air-freighted",
    texture: "Fine, tender flake",
    flavour: "Delicate, buttery",
    bestFor: ["Oven bake", "Pan sear", "Steam", "Sashimi grade"],
    highlights: [
      "Air-freighted, typically 48 hours from harvest",
      "Farm and harvest date traceable per box",
      "Whole fish or portioned to order",
      "Cold chain maintained end to end",
    ],
    sizes: [
      { label: "Small", weight: "0.4 – 0.8 kg" },
      { label: "Medium", weight: "0.8 – 1.6 kg" },
      { label: "Large", weight: "1.6 – 3.0 kg" },
    ],
    nutrition: { protein: 20.4, fat: 6.8, omega3: 1.8, calories: 146 },
    blurb: "Flown in for the kitchens that ask for it by name.",
  },

  Fillets: {
    images: { image: "fishmonger", wild: "wildGrouper", cooked: "grilledPlate" },
    palette: ["#8E5148", "#C0705E", "#F0C3AC"],
    season: "Year-round",
    method: "Filleted to order",
    texture: "Boneless, even flake",
    flavour: "Clean and mild",
    bestFor: ["Pan sear", "Oven bake", "Fry", "Curry"],
    highlights: [
      "Pin-boned and trimmed, zero waste",
      "Skin on or off at no extra charge",
      "Portioned to a fixed gram weight on request",
      "Cold chain maintained end to end",
    ],
    sizes: [
      { label: "120 – 180 g", weight: "per portion" },
      { label: "180 – 240 g", weight: "per portion" },
      { label: "Whole side", weight: "1 – 2 kg" },
    ],
    nutrition: { protein: 21.2, fat: 3.4, omega3: 0.7, calories: 118 },
    blurb: "Cut for kitchens that want no bones and no waste on the pass.",
  },

  Steaks: {
    images: { image: "cuttingLoin", wild: "wildSpotted", cooked: "charcoalGrill" },
    palette: ["#7A2E2A", "#B04A3E", "#E8A292"],
    season: "Year-round",
    method: "Cut to order",
    texture: "Dense, meaty",
    flavour: "Rich and full",
    bestFor: ["Charcoal grill", "Hard sear", "Machboos", "Skewers"],
    highlights: [
      "Cut to 2.5 cm cross-section as standard",
      "Thickness cut to your spec on request",
      "Bone-in for flavour, trimmed clean",
      "Cold chain maintained end to end",
    ],
    sizes: [
      { label: "2 cm cut", weight: "per kg" },
      { label: "2.5 cm cut", weight: "per kg" },
      { label: "4 cm cut", weight: "per kg" },
    ],
    nutrition: { protein: 22.4, fat: 4.8, omega3: 1.1, calories: 132 },
    blurb: "Thick cross-section cuts built to hold together over open flame.",
  },

  "Smoked Products": {
    images: { image: "charcoalGrill", wild: "wildSpotted", cooked: "grilledLeaf" },
    palette: ["#5A4632", "#A8622F", "#E0B183"],
    season: "Year-round",
    method: "Cold & hot smoked",
    texture: "Silky, close-grained",
    flavour: "Deep, smoky, savoury",
    bestFor: ["Cold platter", "Bagel & cream cheese", "Salad", "Canapés"],
    highlights: [
      "Cured and smoked over hardwood",
      "Sliced and interleaved, or supplied whole",
      "Ready to eat, no preparation required",
      "Cold chain maintained end to end",
    ],
    sizes: [
      { label: "200 g pack", weight: "sliced" },
      { label: "500 g pack", weight: "sliced" },
      { label: "Whole side", weight: "1 – 1.5 kg" },
    ],
    nutrition: { protein: 23.6, fat: 7.4, omega3: 1.9, calories: 158 },
    blurb: "Cured and smoked slowly, then packed to be eaten as it is.",
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
  badge?: string;
};

const CATALOGUE: Record<Category, Spec[]> = {
  Lobsters: [
    {
      name: "Rock Lobster Whole",
      arabic: "كركند صخري كامل",
      scientific: "Panulirus homarus",
      waters: "Red Sea",
      origin: "Farasan Banks",
      tagline: "The whole animal, presented as it came out of the trap.",
      badge: "Premium",
    },
    {
      name: "Rock Lobster Tail",
      arabic: "ذيل كركند صخري",
      scientific: "Panulirus homarus",
      waters: "Red Sea",
      origin: "Farasan Banks",
      tagline: "All the meat, none of the work.",
    },
    {
      name: "Rock Lobster Meat",
      arabic: "لحم كركند صخري",
      scientific: "Panulirus homarus",
      waters: "Red Sea",
      origin: "Farasan Banks",
      tagline: "Shelled and ready for the pan.",
    },
    {
      name: "Sand Lobster Whole",
      arabic: "كركند رملي كامل",
      scientific: "Thenus orientalis",
      waters: "Arabian Gulf",
      origin: "Gulf trawl grounds",
      tagline: "Flatter, sweeter, and easier to portion.",
    },
    {
      name: "Sand Lobster Tail",
      arabic: "ذيل كركند رملي",
      scientific: "Thenus orientalis",
      waters: "Arabian Gulf",
      origin: "Gulf trawl grounds",
      tagline: "The best part, split and ready for the grill.",
    },
    {
      name: "Sand Lobster Meat",
      arabic: "لحم كركند رملي",
      scientific: "Thenus orientalis",
      waters: "Arabian Gulf",
      origin: "Gulf trawl grounds",
      tagline: "Clean picked meat, sold by weight.",
    },
    {
      name: "Canadian Lobster Whole",
      arabic: "كركند كندي كامل",
      scientific: "Homarus americanus",
      waters: "Imported",
      origin: "Nova Scotia, Canada",
      tagline: "Cold-water claws, the ones people photograph.",
      badge: "Imported",
    },
  ],

  "Shell Fishes": [
    {
      name: "Green Mussel Half Shell",
      arabic: "بلح البحر الأخضر نصف صدفة",
      scientific: "Perna viridis",
      waters: "Imported",
      origin: "New Zealand & Vietnam",
      tagline: "Sat on the half shell, ready to dress and bake.",
    },
    {
      name: "Green Mussel Whole",
      arabic: "بلح البحر الأخضر كامل",
      scientific: "Perna viridis",
      waters: "Imported",
      origin: "New Zealand & Vietnam",
      tagline: "Whole shell on, for a pot and a lid.",
    },
    {
      name: "Cooked Whole Mussel",
      arabic: "بلح البحر المطبوخ كامل",
      scientific: "Perna viridis",
      waters: "Imported",
      origin: "New Zealand & Vietnam",
      tagline: "Already cooked — reheat and serve.",
    },
    {
      name: "Mussel Meat",
      arabic: "لحم بلح البحر",
      scientific: "Perna viridis",
      waters: "Imported",
      origin: "New Zealand & Vietnam",
      tagline: "Shelled meat by the kilo, no shells to bin.",
    },
    {
      name: "Crab Whole",
      arabic: "سلطعون كامل",
      scientific: "Portunus pelagicus",
      waters: "Arabian Gulf",
      origin: "Qatif & Tarout Bay",
      tagline: "Blue swimmer crab, straight from the trap.",
    },
    {
      name: "Crab Stick",
      arabic: "أصابع السلطعون",
      scientific: "Surimi blend",
      waters: "Imported",
      origin: "Japan & Thailand",
      tagline: "The reliable one, for salads and rolls.",
    },
    {
      name: "Soft Shell Crab",
      arabic: "سلطعون طري القشرة",
      scientific: "Scylla serrata",
      waters: "Imported",
      origin: "Vietnam & Myanmar",
      tagline: "Fry it whole and eat the shell too.",
      badge: "Chef's pick",
    },
    {
      name: "Snow Crab Leg",
      arabic: "أرجل سلطعون الثلج",
      scientific: "Chionoecetes opilio",
      waters: "Imported",
      origin: "North Atlantic",
      tagline: "Long legs, sweet meat, minimal effort.",
    },
    {
      name: "King Crab Leg (Raw and Cooked)",
      arabic: "أرجل السلطعون الملكي (نيء ومطبوخ)",
      scientific: "Paralithodes camtschaticus",
      waters: "Imported",
      origin: "Norway & Alaska",
      tagline: "The centrepiece. Raw or cooked, your call.",
      badge: "Premium",
    },
  ],

  Shrimps: [
    {
      name: "Head On (White, Tiger, Scampi, Flower)",
      arabic: "روبيان برأس",
      scientific: "Penaeus spp.",
      waters: "Arabian Gulf",
      origin: "Gulf trawl grounds",
      tagline: "Heads on, because that is where the flavour hides.",
      badge: "Fresh daily",
    },
    {
      name: "Head Less (White, Tiger, Pink, Scampi, Flower)",
      arabic: "روبيان بدون رأس",
      scientific: "Penaeus spp.",
      waters: "Arabian Gulf",
      origin: "Gulf trawl grounds",
      tagline: "Headed at the plant, so you pay for what you cook.",
    },
    {
      name: "Peeled and Deveined Tail On (PDTO)",
      arabic: "روبيان مقشر منزوع العرق مع الذيل",
      scientific: "Penaeus vannamei",
      waters: "Imported",
      origin: "India & Vietnam",
      tagline: "Tail left on for the look, everything else done.",
    },
    {
      name: "Peeled and Deveined (PD)",
      arabic: "روبيان مقشر منزوع العرق",
      scientific: "Penaeus vannamei",
      waters: "Imported",
      origin: "India & Vietnam",
      tagline: "Straight into the pan, nothing to pick out.",
    },
    {
      name: "Peeled and Undeveined (PUD)",
      arabic: "روبيان مقشر غير منزوع العرق",
      scientific: "Penaeus vannamei",
      waters: "Imported",
      origin: "India & Vietnam",
      tagline: "The volume line for stocks, curries and rice.",
    },
    {
      name: "Cooked PUD / PD",
      arabic: "روبيان مطبوخ",
      scientific: "Penaeus vannamei",
      waters: "Imported",
      origin: "India & Vietnam",
      tagline: "Cooked and chilled — open, drain, serve.",
    },
  ],

  Cephalopods: [
    {
      name: "Cuttlefish Whole (Whole Cleaned, Fillet)",
      arabic: "حبار كامل (منظف، فيليه)",
      scientific: "Sepia pharaonis",
      waters: "Arabian Gulf",
      origin: "Gulf trawl grounds",
      tagline: "Cleaned whole or opened flat as fillet.",
    },
    {
      name: "Squid Whole (Whole Cleaned, Tube, Rings)",
      arabic: "كاليماري كامل (منظف، أنبوب، حلقات)",
      scientific: "Loligo duvauceli",
      waters: "Arabian Gulf",
      origin: "Gulf trawl grounds",
      tagline: "Whole, tubed or ringed — say the word.",
      badge: "Best seller",
    },
    {
      name: "Octopus Gutted and Cleaned",
      arabic: "أخطبوط منظف",
      scientific: "Octopus vulgaris",
      waters: "Red Sea",
      origin: "Jeddah coastline",
      tagline: "Gutted, cleaned, and ready for a long slow braise.",
    },
  ],

  "Fishes (Sea Water)": [
    {
      name: "King Fish",
      arabic: "كنعد",
      scientific: "Scomberomorus commerson",
      waters: "Arabian Gulf",
      origin: "Dammam & Qatif landings",
      tagline: "The grill fish this country runs on.",
      badge: "Best seller",
    },
    {
      name: "White Pomfret",
      arabic: "زبيدي أبيض",
      scientific: "Pampus argenteus",
      waters: "Arabian Gulf",
      origin: "Jubail & Ras Tanura",
      tagline: "The most prized fish in the Gulf, and it knows it.",
      badge: "Limited",
    },
    {
      name: "Black Pomfret",
      arabic: "زبيدي أسود",
      scientific: "Parastromateus niger",
      waters: "Arabian Gulf",
      origin: "Jubail & Ras Tanura",
      tagline: "Darker skin, deeper flavour, everyday fish.",
    },
    {
      name: "Ribbon Fish",
      arabic: "سمك الشريط",
      scientific: "Trichiurus lepturus",
      waters: "Arabian Gulf",
      origin: "Gulf trawl grounds",
      tagline: "Long, silver and startlingly good fried.",
    },
    {
      name: "Parrot Fish",
      arabic: "ببغاء",
      scientific: "Scarus ghobban",
      waters: "Red Sea",
      origin: "Yanbu reefs",
      tagline: "Bright as a coral reef, mild as they come.",
    },
    {
      name: "Emperor",
      arabic: "شعري",
      scientific: "Lethrinus nebulosus",
      waters: "Red Sea",
      origin: "Al Lith & Qunfudhah",
      tagline: "The everyday fish that never disappoints.",
    },
    {
      name: "Barracuda (Agam)",
      arabic: "عقام",
      scientific: "Sphyraena jello",
      waters: "Red Sea",
      origin: "Offshore Red Sea fleet",
      tagline: "Lean, firm and built for steaks.",
    },
    {
      name: "Mackerel",
      arabic: "ماكريل",
      scientific: "Rastrelliger kanagurta",
      waters: "Arabian Gulf",
      origin: "Dammam landings",
      tagline: "Oily, cheap and criminally underrated.",
    },
  ],

  "Fishes (Fresh Water)": [
    {
      name: "Rohu",
      arabic: "روهو",
      scientific: "Labeo rohita",
      waters: "Imported",
      origin: "India & Bangladesh",
      tagline: "The carp that anchors a South Asian kitchen.",
    },
    {
      name: "Tilapia",
      arabic: "بلطي",
      scientific: "Oreochromis niloticus",
      waters: "Imported",
      origin: "Egypt & local farms",
      tagline: "Mild, affordable and endlessly forgiving.",
    },
    {
      name: "Milkfish",
      arabic: "سمك الحليب",
      scientific: "Chanos chanos",
      waters: "Imported",
      origin: "Philippines & Indonesia",
      tagline: "Sweet white meat, worth the bones.",
    },
    {
      name: "Pangush",
      arabic: "بانغاش",
      scientific: "Pangasius hypophthalmus",
      waters: "Imported",
      origin: "Mekong Delta, Vietnam",
      tagline: "Boneless, neutral, and always in stock.",
    },
  ],

  "European Fishes": [
    {
      name: "Salmon Whole",
      arabic: "سلمون كامل",
      scientific: "Salmo salar",
      waters: "Imported",
      origin: "Norway",
      tagline: "The whole side, still in its skin.",
      badge: "Chef's pick",
    },
    {
      name: "Rainbow Trout Whole",
      arabic: "تراوت قوس قزح كامل",
      scientific: "Oncorhynchus mykiss",
      waters: "Imported",
      origin: "Turkey & Denmark",
      tagline: "Salmon's quieter, cheaper cousin.",
    },
    {
      name: "Sea Bass",
      arabic: "قاروص",
      scientific: "Dicentrarchus labrax",
      waters: "Imported",
      origin: "Greece & Turkey",
      tagline: "Plate-sized, whole, and impossible to get wrong.",
    },
    {
      name: "Sea Bream",
      arabic: "دنيس",
      scientific: "Sparus aurata",
      waters: "Imported",
      origin: "Greece & Turkey",
      tagline: "Salt-baked or grilled whole, nothing else needed.",
    },
  ],

  Fillets: [
    {
      name: "Salmon",
      arabic: "فيليه سلمون",
      scientific: "Salmo salar",
      waters: "Imported",
      origin: "Norway",
      tagline: "Pin-boned sides, cut to whatever gram weight you run.",
      badge: "Best seller",
    },
    {
      name: "Nile Perch",
      arabic: "فيليه قشر بياض",
      scientific: "Lates niloticus",
      waters: "Imported",
      origin: "Lake Victoria",
      tagline: "Thick white loins that hold their shape.",
    },
    {
      name: "Cream Dory",
      arabic: "فيليه كريم دوري",
      scientific: "Pangasius hypophthalmus",
      waters: "Imported",
      origin: "Mekong Delta, Vietnam",
      tagline: "The workhorse fillet for volume kitchens.",
    },
    {
      name: "Pollock",
      arabic: "فيليه بولاك",
      scientific: "Theragra chalcogramma",
      waters: "Imported",
      origin: "North Pacific",
      tagline: "What good fish and chips is actually made of.",
    },
    {
      name: "Red Snapper",
      arabic: "فيليه نهاش أحمر",
      scientific: "Lutjanus bohar",
      waters: "Red Sea",
      origin: "Farasan Islands",
      tagline: "Deep red skin, snow-white meat.",
    },
    {
      name: "White Snapper",
      arabic: "فيليه نهاش أبيض",
      scientific: "Lutjanus argentimaculatus",
      waters: "Red Sea",
      origin: "Farasan Islands",
      tagline: "Cleaner and milder than its red sibling.",
    },
    {
      name: "Grouper Hamour",
      arabic: "فيليه هامور",
      scientific: "Epinephelus coioides",
      waters: "Red Sea",
      origin: "Jazan & Farasan Banks",
      tagline: "The undisputed king of the Saudi table, boned out.",
      badge: "Premium",
    },
    {
      name: "Pangasius",
      arabic: "فيليه بنغاسيوس",
      scientific: "Pangasius hypophthalmus",
      waters: "Imported",
      origin: "Mekong Delta, Vietnam",
      tagline: "Neutral, boneless and built for the pass.",
    },
    {
      name: "Basa",
      arabic: "فيليه باسا",
      scientific: "Pangasius bocourti",
      waters: "Imported",
      origin: "Mekong Delta, Vietnam",
      tagline: "Softer than pangasius, same easy handling.",
    },
    {
      name: "Haddock",
      arabic: "فيليه حدوق",
      scientific: "Melanogrammus aeglefinus",
      waters: "Imported",
      origin: "North Atlantic",
      tagline: "Cold-water flake that smokes beautifully.",
    },
  ],

  Steaks: [
    {
      name: "King Fish",
      arabic: "شرائح كنعد",
      scientific: "Scomberomorus commerson",
      waters: "Arabian Gulf",
      origin: "Dammam & Qatif landings",
      tagline: "Thick steaks built for the grill.",
      badge: "Best seller",
    },
    {
      name: "Salmon",
      arabic: "شرائح سلمون",
      scientific: "Salmo salar",
      waters: "Imported",
      origin: "Norway",
      tagline: "Bone-in cross cuts that stay moist under heat.",
    },
    {
      name: "Snapper",
      arabic: "شرائح نهاش",
      scientific: "Lutjanus spp.",
      waters: "Red Sea",
      origin: "Farasan Islands",
      tagline: "Firm red-fish steaks for the charcoal.",
    },
    {
      name: "Rohu",
      arabic: "شرائح روهو",
      scientific: "Labeo rohita",
      waters: "Imported",
      origin: "India & Bangladesh",
      tagline: "Cut the way a curry wants it.",
    },
    {
      name: "Pangasius",
      arabic: "شرائح بنغاسيوس",
      scientific: "Pangasius hypophthalmus",
      waters: "Imported",
      origin: "Mekong Delta, Vietnam",
      tagline: "Even, boneless steaks, cut for volume service.",
    },
    {
      name: "Barracuda",
      arabic: "شرائح عقام",
      scientific: "Sphyraena jello",
      waters: "Red Sea",
      origin: "Offshore Red Sea fleet",
      tagline: "Lean and firm — it will not fall apart on you.",
    },
    {
      name: "Jesh",
      arabic: "شرائح جش",
      scientific: "Carangoides bajad",
      waters: "Arabian Gulf",
      origin: "Gulf trawl grounds",
      tagline: "Trevally steaks, dense and full-flavoured.",
    },
  ],

  "Smoked Products": [
    {
      name: "Salmon",
      arabic: "سلمون مدخن",
      scientific: "Salmo salar",
      waters: "Imported",
      origin: "Norway & Scotland",
      tagline: "Cold-smoked, sliced thin, interleaved.",
      badge: "Premium",
    },
    {
      name: "Trout Fillet",
      arabic: "فيليه تراوت مدخن",
      scientific: "Oncorhynchus mykiss",
      waters: "Imported",
      origin: "Turkey & Denmark",
      tagline: "The value alternative to smoked salmon.",
    },
    {
      name: "Mackerel Whole",
      arabic: "ماكريل مدخن كامل",
      scientific: "Rastrelliger kanagurta",
      waters: "Imported",
      origin: "North Atlantic",
      tagline: "Hot-smoked whole, ready to flake apart.",
    },
    {
      name: "Mackerel Fillet",
      arabic: "فيليه ماكريل مدخن",
      scientific: "Rastrelliger kanagurta",
      waters: "Imported",
      origin: "North Atlantic",
      tagline: "Boneless and rich, straight from the pack.",
    },
    {
      name: "Peppered Mackerel Fillet",
      arabic: "فيليه ماكريل مدخن بالفلفل",
      scientific: "Rastrelliger kanagurta",
      waters: "Imported",
      origin: "North Atlantic",
      tagline: "Crusted in cracked black pepper before the smoke.",
    },
  ],
};

/* ------------------------------------------------------------------ *
 * Build
 * ------------------------------------------------------------------ */

/**
 * Names repeat across categories — Salmon is a fillet, a steak and a smoked
 * line — so the route key has to carry the category to stay unique.
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
    rating,
    reviews,
    ...(spec.badge ? { badge: spec.badge } : {}),
    image: d.images.image,
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
