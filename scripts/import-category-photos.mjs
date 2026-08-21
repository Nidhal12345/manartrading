/**
 * One-off importer for the home page's three category doors.
 *
 * The client supplies these as `category-<something>.png` in the same drop
 * folder as the studio set. This maps each stem to its registry key, encodes it
 * to the JPEG that `src()` in src/lib/images.ts serves from /images/<key>.jpg,
 * and prints the measured dominant colour so the registry's `tone` (the blur-up
 * placeholder) is the photograph's own average rather than a guess.
 *
 * Same reasoning as scripts/import-studio-photos.mjs on why this re-encodes
 * rather than copies: the supplied files are 1.8 - 2.4 MB PNGs, Next re-encodes
 * to AVIF/WebP at q75 on the way out, so this is a build-time input and not what
 * ships — hence q88 and no chroma subsampling.
 *
 * Geometry is left alone. `CategoryShowcase` crops these hard and differently at
 * every width (a full-bleed 100vw x 400px band on a phone, a ~1:1.34 portrait
 * column on a desktop), all through `object-cover` from the centre, so there is
 * no single aspect to normalise to. The script prints each frame's own aspect
 * and how much of it survives the two extremes instead.
 *
 *   node scripts/import-category-photos.mjs
 *   node scripts/import-category-photos.mjs --preview   (writes 420px contact
 *                                                        sheets to .tmp/)
 */

import { mkdirSync, readdirSync } from "node:fs";
import path from "node:path";

import sharp from "sharp";

const SRC_DIR = "public/new-photo/newone";
const OUT_DIR = "public/images";
const TMP_DIR = ".tmp";

/** Supplied filename stem -> registry key. */
const MAP = {
  "category-allfish": "categoryAll",
  "category-fishpng": "categoryFish",
  "category-crustanceans": "categoryCrustaceans",
};

/* The two slots these have to survive, as width/height of the visible window.
   Both are object-cover from the centre, so whichever axis is proportionally
   short is the one that gets cut. */
const SLOTS = [
  { name: "phone  100vw x 400", ratio: 390 / 400 },
  { name: "desktop 33vw x 600", ratio: 448 / 600 },
];

const hex = (r, g, b) =>
  "#" + [r, g, b].map((v) => Math.round(v).toString(16).padStart(2, "0")).join("");

const previewOnly = process.argv.includes("--preview");

const found = new Map();
for (const file of readdirSync(SRC_DIR)) {
  const key = MAP[path.parse(file).name.trim()];
  if (key) found.set(key, path.join(SRC_DIR, file));
}

const missing = Object.values(MAP).filter((k) => !found.has(k));
if (missing.length) {
  console.error(`\nNo source file for: ${missing.join(", ")}`);
  process.exit(1);
}

if (previewOnly) mkdirSync(TMP_DIR, { recursive: true });
else mkdirSync(OUT_DIR, { recursive: true });

console.log(`\n${previewOnly ? "Previewing" : "Importing"} ${found.size} category frames\n`);

for (const [key, input] of found) {
  const img = sharp(input);
  const { width, height } = await img.metadata();
  const { channels } = await img.stats();
  const tone = hex(channels[0].mean, channels[1].mean, channels[2].mean);

  if (previewOnly) {
    await sharp(input)
      .resize(420, null, { withoutEnlargement: true })
      .jpeg({ quality: 78 })
      .toFile(path.join(TMP_DIR, `${key}.jpg`));
  } else {
    await sharp(input)
      .jpeg({ quality: 88, chromaSubsampling: "4:4:4", mozjpeg: true })
      .toFile(path.join(OUT_DIR, `${key}.jpg`));
  }

  const aspect = width / height;
  const kept = SLOTS.map((s) => {
    /* object-cover fills the short axis and cuts the long one. */
    const frac = s.ratio > aspect ? aspect / s.ratio : s.ratio / aspect;
    const axis = s.ratio > aspect ? "height" : "width";
    return `${s.name} keeps ${(frac * 100).toFixed(0)}% of ${axis}`;
  }).join("  |  ");

  console.log(`  ${key.padEnd(20)} ${width}x${height}  tone ${tone}`);
  console.log(`  ${" ".repeat(20)} ${kept}\n`);
}

console.log(previewOnly ? `Contact sheets in ${TMP_DIR}/\n` : "Done.\n");
