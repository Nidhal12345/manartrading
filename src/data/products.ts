export type FishShape = "torpedo" | "standard" | "deep" | "disc" | "prawn";

export type Product = {
  slug: string;
  name: string;
  arabic: string;
  scientific: string;
  category: "Reef Fish" | "Pelagic" | "Coastal" | "Shellfish";
  price: number;
  compareAt?: number;
  unit: string;
  origin: string;
  waters: string;
  season: string;
  method: string;
  rating: number;
  reviews: number;
  badge?: string;
  shape: FishShape;
  palette: [string, string, string];
  tagline: string;
  description: string;
  highlights: string[];
  bestFor: string[];
  texture: string;
  flavour: string;
  nutrition: { protein: number; fat: number; omega3: number; calories: number };
  sizes: { label: string; weight: string; multiplier: number }[];
  inStock: boolean;
};

export const products: Product[] = [
  {
    slug: "hamour-grouper",
    name: "Hamour",
    arabic: "هامور",
    scientific: "Epinephelus coioides",
    category: "Reef Fish",
    price: 68,
    compareAt: 79,
    unit: "kg",
    origin: "Jazan & Farasan Banks",
    waters: "Red Sea",
    season: "Year-round, peak Oct – Mar",
    method: "Hand line",
    rating: 4.9,
    reviews: 214,
    badge: "Best seller",
    shape: "deep",
    palette: ["#0E6BA8", "#1E9BD7", "#8FD9E8"],
    tagline: "The undisputed king of the Saudi table.",
    description:
      "Hamour is the fish every Saudi kitchen knows by heart. Firm white flakes, almost no bones through the loin, and a clean sweetness that holds up to charcoal, curry or a simple squeeze of lemon. We buy ours from hand-line crews working the Farasan Banks and get it onto ice within minutes of landing.",
    highlights: [
      "Landed and iced within 30 minutes of the catch",
      "Hand-line caught — no net bruising on the fillet",
      "Cleaned, scaled and portioned free of charge",
      "Graded 1.5 – 4 kg whole fish",
    ],
    bestFor: ["Charcoal grill", "Sayadiyah", "Curry", "Pan sear"],
    texture: "Firm, large flake",
    flavour: "Mild, clean, slightly sweet",
    nutrition: { protein: 19.4, fat: 1.2, omega3: 0.3, calories: 92 },
    sizes: [
      { label: "Small", weight: "1.0 – 1.5 kg", multiplier: 1 },
      { label: "Medium", weight: "1.5 – 2.5 kg", multiplier: 1.08 },
      { label: "Large", weight: "2.5 – 4.0 kg", multiplier: 1.18 },
    ],
    inStock: true,
  },
  {
    slug: "kanad-king-mackerel",
    name: "Kanad",
    arabic: "كنعد",
    scientific: "Scomberomorus commerson",
    category: "Pelagic",
    price: 52,
    unit: "kg",
    origin: "Dammam & Qatif landings",
    waters: "Arabian Gulf",
    season: "Sep – Apr",
    method: "Trolling line",
    rating: 4.8,
    reviews: 176,
    badge: "Chef's pick",
    shape: "torpedo",
    palette: ["#0A4A73", "#127FB8", "#6FD0DE"],
    tagline: "Thick steaks built for the grill.",
    description:
      "Cut into thick cross-section steaks, Kanad is the fish that turns a family gathering into an occasion. The flesh is dense and meaty with a deeper flavour than reef fish, which is exactly why it stands up to heavy spice, machboos and open flame.",
    highlights: [
      "Cut to 2.5 cm steaks or supplied whole",
      "Troll-caught, bled at sea for cleaner meat",
      "Excellent omega-3 content",
      "Graded 3 – 8 kg whole fish",
    ],
    bestFor: ["Steaks", "Machboos", "Grill", "Fry"],
    texture: "Dense, meaty",
    flavour: "Rich and full",
    nutrition: { protein: 21.8, fat: 5.6, omega3: 1.4, calories: 139 },
    sizes: [
      { label: "Steak cut", weight: "per kg", multiplier: 1.05 },
      { label: "Half fish", weight: "2 – 4 kg", multiplier: 1 },
      { label: "Whole fish", weight: "4 – 8 kg", multiplier: 0.96 },
    ],
    inStock: true,
  },
  {
    slug: "najil-coral-trout",
    name: "Najil",
    arabic: "نجل",
    scientific: "Plectropomus pessuliferus",
    category: "Reef Fish",
    price: 89,
    unit: "kg",
    origin: "Yanbu reefs",
    waters: "Red Sea",
    season: "Nov – May",
    method: "Hand line",
    rating: 5,
    reviews: 98,
    badge: "Premium",
    shape: "standard",
    palette: ["#B23A48", "#E4685C", "#F7B39B"],
    tagline: "Coral-red, delicate, and quietly expensive.",
    description:
      "Najil is what Red Sea captains keep for themselves. The skin is a deep coral red flecked with blue, and the meat is finer and softer than Hamour with a buttery finish. Steam it whole with ginger and spring onion — anything heavier is a waste of a beautiful fish.",
    highlights: [
      "Limited daily landings from Yanbu",
      "Whole fish presentation, scales intact on request",
      "Best served steamed or oven-baked",
      "Graded 1 – 3 kg whole fish",
    ],
    bestFor: ["Steam whole", "Oven bake", "Sashimi grade", "Butter poach"],
    texture: "Fine, tender flake",
    flavour: "Delicate, buttery",
    nutrition: { protein: 20.1, fat: 1, omega3: 0.28, calories: 90 },
    sizes: [
      { label: "Small", weight: "1.0 – 1.6 kg", multiplier: 1 },
      { label: "Medium", weight: "1.6 – 2.4 kg", multiplier: 1.1 },
      { label: "Large", weight: "2.4 – 3.0 kg", multiplier: 1.22 },
    ],
    inStock: true,
  },
  {
    slug: "shaari-spangled-emperor",
    name: "Shaari",
    arabic: "شعري",
    scientific: "Lethrinus nebulosus",
    category: "Reef Fish",
    price: 45,
    compareAt: 52,
    unit: "kg",
    origin: "Al Lith & Qunfudhah",
    waters: "Red Sea",
    season: "Year-round",
    method: "Trap & line",
    rating: 4.7,
    reviews: 143,
    shape: "deep",
    palette: ["#1F6F8B", "#42A5C4", "#A8DCE6"],
    tagline: "The everyday fish that never disappoints.",
    description:
      "Shaari is the honest workhorse of the Red Sea — silver-bronze, generously sized, and priced so you can feed a full table without thinking twice. Whole-roasted over coals with a rub of cumin and lime it is, for many families here, simply what Friday tastes like.",
    highlights: [
      "Consistent daily supply, all seasons",
      "Great value per kilo for large gatherings",
      "Butterflied for the grill on request",
      "Graded 0.8 – 2.5 kg whole fish",
    ],
    bestFor: ["Charcoal grill", "Whole roast", "Sayadiyah", "Stew"],
    texture: "Firm, medium flake",
    flavour: "Clean with a nutty finish",
    nutrition: { protein: 20.6, fat: 1.8, omega3: 0.35, calories: 99 },
    sizes: [
      { label: "Small", weight: "0.8 – 1.2 kg", multiplier: 1 },
      { label: "Medium", weight: "1.2 – 1.8 kg", multiplier: 1.06 },
      { label: "Large", weight: "1.8 – 2.5 kg", multiplier: 1.14 },
    ],
    inStock: true,
  },
  {
    slug: "safi-rabbitfish",
    name: "Safi",
    arabic: "صافي",
    scientific: "Siganus rivulatus",
    category: "Coastal",
    price: 38,
    unit: "kg",
    origin: "Qatif & Tarout Bay",
    waters: "Arabian Gulf",
    season: "Oct – Mar",
    method: "Traditional trap (gargoor)",
    rating: 4.6,
    reviews: 121,
    shape: "disc",
    palette: ["#2E7D6F", "#4FB3A0", "#A9E3D6"],
    tagline: "The taste of the Eastern Province coast.",
    description:
      "Ask anyone from Qatif and they will tell you Safi in winter, straight off the coals, is unbeatable. Small, oval and silver-green, it carries a distinctive sweetness that comes from a lifetime grazing on seagrass. Best eaten with your hands.",
    highlights: [
      "Caught in traditional gargoor traps",
      "Winter fish — sweetest between Nov and Feb",
      "Sold by the kilo, roughly 3 – 5 fish",
      "Scaled and gutted, heads on",
    ],
    bestFor: ["Charcoal grill", "Shallow fry", "Salt bake"],
    texture: "Soft, fine flake",
    flavour: "Sweet, distinctly coastal",
    nutrition: { protein: 18.9, fat: 2.4, omega3: 0.42, calories: 101 },
    sizes: [
      { label: "1 kg pack", weight: "3 – 5 fish", multiplier: 1 },
      { label: "3 kg pack", weight: "10 – 14 fish", multiplier: 0.96 },
      { label: "5 kg box", weight: "17 – 24 fish", multiplier: 0.92 },
    ],
    inStock: true,
  },
  {
    slug: "hamra-red-snapper",
    name: "Hamra",
    arabic: "حمراء",
    scientific: "Lutjanus bohar",
    category: "Reef Fish",
    price: 62,
    unit: "kg",
    origin: "Farasan Islands",
    waters: "Red Sea",
    season: "Year-round",
    method: "Hand line",
    rating: 4.8,
    reviews: 167,
    shape: "standard",
    palette: ["#A32E3B", "#DC5A55", "#F4A896"],
    tagline: "Deep red skin, snow-white meat.",
    description:
      "Red snapper earns its place on any menu. The skin crisps to a beautiful lacquered red while the meat underneath stays white and moist. Versatile enough for a Friday family lunch or a plated restaurant course — it behaves well however you cook it.",
    highlights: [
      "Skin-on fillets available",
      "Holds shape in stews and curries",
      "Popular with hotel and restaurant buyers",
      "Graded 1 – 4 kg whole fish",
    ],
    bestFor: ["Crispy skin sear", "Whole roast", "Curry", "Grill"],
    texture: "Firm, moist flake",
    flavour: "Mildly sweet",
    nutrition: { protein: 20.5, fat: 1.3, omega3: 0.31, calories: 94 },
    sizes: [
      { label: "Small", weight: "1.0 – 1.8 kg", multiplier: 1 },
      { label: "Medium", weight: "1.8 – 2.8 kg", multiplier: 1.07 },
      { label: "Large", weight: "2.8 – 4.0 kg", multiplier: 1.16 },
    ],
    inStock: true,
  },
  {
    slug: "sultan-ibrahim-red-mullet",
    name: "Sultan Ibrahim",
    arabic: "سلطان إبراهيم",
    scientific: "Parupeneus forsskali",
    category: "Coastal",
    price: 44,
    unit: "kg",
    origin: "Jeddah coastline",
    waters: "Red Sea",
    season: "Apr – Oct",
    method: "Small-mesh net",
    rating: 4.7,
    reviews: 88,
    shape: "torpedo",
    palette: ["#C2562F", "#EE8B4F", "#FAC79A"],
    tagline: "Small fish, enormous flavour.",
    description:
      "Dusted in seasoned flour and dropped into hot oil for ninety seconds — that is all Sultan Ibrahim asks for. Crisp outside, sweet and rich inside, eaten whole with tahini and warm bread. Order a kilo more than you think you need.",
    highlights: [
      "Sold whole, 8 – 12 pieces per kilo",
      "Cleaned and ready for the fryer",
      "Arrives on flake ice in insulated boxes",
      "Excellent as a mezze centrepiece",
    ],
    bestFor: ["Deep fry", "Grill", "Mezze platter"],
    texture: "Delicate, rich",
    flavour: "Sweet, pronounced",
    nutrition: { protein: 19.2, fat: 3.8, omega3: 0.6, calories: 116 },
    sizes: [
      { label: "1 kg pack", weight: "8 – 12 fish", multiplier: 1 },
      { label: "2 kg pack", weight: "16 – 24 fish", multiplier: 0.97 },
      { label: "5 kg box", weight: "40 – 60 fish", multiplier: 0.9 },
    ],
    inStock: true,
  },
  {
    slug: "zubaidi-silver-pomfret",
    name: "Zubaidi",
    arabic: "زبيدي",
    scientific: "Pampus argenteus",
    category: "Coastal",
    price: 115,
    compareAt: 132,
    unit: "kg",
    origin: "Jubail & Ras Tanura",
    waters: "Arabian Gulf",
    season: "May – Sep",
    method: "Drift net",
    rating: 4.9,
    reviews: 74,
    badge: "Limited",
    shape: "disc",
    palette: ["#5B6C86", "#93A6BE", "#D7E2ED"],
    tagline: "The most prized fish in the Gulf.",
    description:
      "Zubaidi is a status fish and it knows it. Silver, almost circular, with soft white meat and a single easy bone structure that children can manage. Supply is short and the season is narrow, so we allocate it daily to whoever orders first.",
    highlights: [
      "Strictly limited seasonal allocation",
      "Boneless-eating experience, family favourite",
      "Traditionally fried whole or cooked in machboos",
      "Graded 0.4 – 1.2 kg per fish",
    ],
    bestFor: ["Shallow fry", "Machboos", "Steam", "Grill"],
    texture: "Soft, buttery",
    flavour: "Rich, refined",
    nutrition: { protein: 18.6, fat: 6.2, omega3: 0.9, calories: 136 },
    sizes: [
      { label: "Medium", weight: "0.4 – 0.7 kg each", multiplier: 1 },
      { label: "Large", weight: "0.7 – 1.0 kg each", multiplier: 1.12 },
      { label: "Jumbo", weight: "1.0 – 1.2 kg each", multiplier: 1.25 },
    ],
    inStock: true,
  },
  {
    slug: "robyan-tiger-prawns",
    name: "Robyan",
    arabic: "روبيان",
    scientific: "Penaeus semisulcatus",
    category: "Shellfish",
    price: 78,
    unit: "kg",
    origin: "Gulf trawl grounds",
    waters: "Arabian Gulf",
    season: "Aug – Dec",
    method: "Licensed trawl",
    rating: 4.8,
    reviews: 192,
    badge: "Fresh daily",
    shape: "prawn",
    palette: ["#C1443C", "#F0785C", "#FBC0A4"],
    tagline: "Jumbo Gulf prawns, still snapping.",
    description:
      "Gulf tiger prawns during the open season are among the best in the world — firm, sweet and big enough that four make a meal. We take delivery every morning and sell only what arrives that day. Whatever is left at closing goes to the freezer, never back on the counter.",
    highlights: [
      "Head-on, shell-on for maximum flavour",
      "Peeled and deveined on request, no extra charge",
      "Landed under the Kingdom's licensed season only",
      "Grade U/15 to 21/25 available",
    ],
    bestFor: ["Garlic butter", "Grill skewers", "Biryani", "Salona"],
    texture: "Firm, snappy",
    flavour: "Sweet, briny",
    nutrition: { protein: 20.3, fat: 1.7, omega3: 0.5, calories: 99 },
    sizes: [
      { label: "21/25 count", weight: "per kg", multiplier: 1 },
      { label: "16/20 count", weight: "per kg", multiplier: 1.14 },
      { label: "U/15 jumbo", weight: "per kg", multiplier: 1.3 },
    ],
    inStock: true,
  },
  {
    slug: "yellowfin-tuna",
    name: "Yellowfin Tuna",
    arabic: "تونة صفراء",
    scientific: "Thunnus albacares",
    category: "Pelagic",
    price: 58,
    unit: "kg",
    origin: "Offshore Red Sea fleet",
    waters: "Red Sea",
    season: "Feb – Aug",
    method: "Pole & line",
    rating: 4.7,
    reviews: 109,
    shape: "torpedo",
    palette: ["#123C63", "#2A6E9E", "#7FC5D9"],
    tagline: "Loins cut to order, ruby red.",
    description:
      "Pole-and-line yellowfin, bled and chilled at sea, arriving as whole loins we cut in front of you. Deep ruby colour, clean on the nose, and firm enough to slice thin for sashimi or sear hard for two minutes a side and no more.",
    highlights: [
      "Pole & line caught — no bycatch",
      "Bled and spiked at sea for colour retention",
      "Loin, steak or sashimi block cuts",
      "Cold chain held at 0 – 2 °C throughout",
    ],
    bestFor: ["Sashimi", "Hard sear", "Tataki", "Skewers"],
    texture: "Firm, dense",
    flavour: "Clean, mineral, rich",
    nutrition: { protein: 24.4, fat: 1.5, omega3: 0.4, calories: 109 },
    sizes: [
      { label: "Steak cut", weight: "per kg", multiplier: 1 },
      { label: "Loin", weight: "2 – 4 kg", multiplier: 1.08 },
      { label: "Sashimi block", weight: "0.5 – 1 kg", multiplier: 1.24 },
    ],
    inStock: true,
  },
];

export const categories = [
  "All",
  "Reef Fish",
  "Pelagic",
  "Coastal",
  "Shellfish",
] as const;

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
