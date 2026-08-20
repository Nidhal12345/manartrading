/**
 * One-off importer for the counter's studio photography.
 *
 * The client supplies the set as Arabic-named PNGs — one per line on the spec
 * sheet, 1122x1402 (4:5), single specimen on pale ice. This maps each Arabic
 * name to its registry key, encodes it to the JPEG that `src()` in
 * src/lib/images.ts serves from /images/<key>.jpg, and prints the measured
 * dominant colour so the registry's `tone` (the blur-up placeholder) is the
 * photograph's own average rather than a guess.
 *
 * Why re-encode rather than copy: the supplied files are 2.1 - 2.8 MB PNGs, and
 * an earlier pass copied them to a .jpg *filename* without converting, so the
 * repo was serving 30 MB of PNG under an extension that lied about the format.
 * Next re-encodes to AVIF/WebP at quality 75 on the way out, so this file is a
 * build-time input, not what ships — hence q88 and no chroma subsampling, which
 * keeps the parrotfish and coral-trout edges clean going into that second pass.
 *
 * Geometry is left alone: 4:5 is already the aspect of every slot the photo
 * lands in, and the set is consistently framed. `--verify` re-measures the
 * subject box against the tightest of those slots instead.
 *
 *   node scripts/import-studio-photos.mjs
 *   node scripts/import-studio-photos.mjs --verify
 */

import { createHash } from "node:crypto";
import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

import sharp from "sharp";

const SRC_DIR = "public/new-photo/newone";
const OUT_DIR = "public/images";

/**
 * Arabic name on the supplied file -> registry key.
 *
 * Keyed on the name with whitespace stripped: three of the files ship with a
 * trailing space before the extension ("الحريد .png") and matching on the raw
 * name would drop them silently.
 */
const MAP = {
  // Fish
  "الناجل": "trevallyStudio",
  "الشريفي": "shareefiStudio",
  "هامور": "grouperStudio",
  "الحريد": "parrotfishStudio",
  "الشعور": "emperorStudio",
  "الكنعد": "kingfishStudio",
  "الدنيس": "seaBreamStudio",
  "القاروص": "seaBassStudio",
  "الصافي": "rabbitfishStudio",
  "البياض": "bayadhStudio",
  // Crustaceans & Seafood
  "جمبري": "prawnStudio",
  "استكوز": "crayfishStudio",
  "لوبستر": "lobsterStudio",
  "كابوريا": "crabStudio",
  "اخطبوط": "octopusStudio",
  "حباره": "squidStudio",
};

/* ------------------------------------------------------------------ *
 * Slot geometry — the tightest crop each photo has to survive
 *
 * The shop grid card and the detail lead are both aspect-[4/5], the same as
 * the file, so they show all of it. The two that cut into it:
 *
 *   detail thumbnail   aspect-[4/3] over a 4:5 file, object-cover, so the width
 *                      fills and the height is centre-cropped to
 *                      (1/(4/3)) / (1/(4/5)) = 60% of it.
 *   best-sellers       the parallax layer is inset -14% each side, so it is
 *   carousel           128% of its window and the window shows the middle
 *                      1/1.28 = 78.125% of the width.
 * ------------------------------------------------------------------ */
const SAFE_X = [(1 - 1 / 1.28) / 2, 1 - (1 - 1 / 1.28) / 2]; // 10.94% .. 89.06%
const SAFE_Y = [(1 - 0.6) / 2, 1 - (1 - 0.6) / 2]; //           20%    .. 80%

const pct = (n) => `${(n * 100).toFixed(1)}%`;
const hex = (r, g, b) =>
  "#" + [r, g, b].map((v) => Math.round(v).toString(16).padStart(2, "0")).join("");

/** Average colour of the whole frame — what a 1px blur-up placeholder wants. */
async function tone(input) {
  const { channels } = await sharp(input).stats();
  return hex(channels[0].mean, channels[1].mean, channels[2].mean);
}

/**
 * Bounding box of the specimen, as fractions of the frame.
 *
 * The ground is a mottled pale ice, so a flat luminance threshold picks up the
 * veining. Model the background from the outer border instead, mark pixels far
 * from it, then keep only the blobs big enough to be an animal: some frames
 * carry a patch of heavy cyan mottling low down that a per-column mass floor
 * counted as subject, and which dragged the box out to the whole frame.
 */
async function subjectBox(input) {
  const { data, info } = await sharp(input)
    .resize(560, 700, { fit: "fill" })
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width: w, height: h, channels: ch } = info;

  // Background model: median of a 3%-wide border band.
  const band = Math.round(w * 0.03);
  const rs = [], gs = [], bs = [];
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (x >= band && x < w - band && y >= band && y < h - band) continue;
      const i = (y * w + x) * ch;
      rs.push(data[i]); gs.push(data[i + 1]); bs.push(data[i + 2]);
    }
  }
  // Sorts in place; none of the three arrays is read again afterwards.
  const median = (a) => a.sort((p, q) => p - q)[a.length >> 1];
  const [br, bg, bb] = [median(rs), median(gs), median(bs)];

  /* Distance-to-background is sharply bimodal on this set: the ice mottling
     runs to ~42 (90th percentile of a whole frame) and the specimen starts
     above ~90, so 70 sits in the empty gap between the two. */
  const THRESH = 70;
  const fg = new Uint8Array(w * h);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * ch;
      const d = Math.hypot(data[i] - br, data[i + 1] - bg, data[i + 2] - bb);
      if (d > THRESH) fg[y * w + x] = 1;
    }
  }

  /* Blobs, 4-connected, flood-filled with an explicit stack — the frames are
     560x700 and recursion would blow the call stack on a whole octopus. */
  const seen = new Uint8Array(w * h);
  const blobs = [];
  const stack = [];
  for (let s = 0; s < w * h; s++) {
    if (!fg[s] || seen[s]) continue;
    let area = 0, x0 = w, x1 = -1, y0 = h, y1 = -1;
    stack.push(s);
    seen[s] = 1;
    while (stack.length) {
      const p = stack.pop();
      const px = p % w, py = (p - px) / w;
      area++;
      if (px < x0) x0 = px;
      if (px > x1) x1 = px;
      if (py < y0) y0 = py;
      if (py > y1) y1 = py;
      if (px > 0 && fg[p - 1] && !seen[p - 1]) { seen[p - 1] = 1; stack.push(p - 1); }
      if (px < w - 1 && fg[p + 1] && !seen[p + 1]) { seen[p + 1] = 1; stack.push(p + 1); }
      if (py > 0 && fg[p - w] && !seen[p - w]) { seen[p - w] = 1; stack.push(p - w); }
      if (py < h - 1 && fg[p + w] && !seen[p + w]) { seen[p + w] = 1; stack.push(p + w); }
    }
    blobs.push({ area, x0, x1, y0, y1 });
  }
  if (!blobs.length) return { x: [0, 1], y: [0, 1] };

  /* The specimen is one big blob. Anything under 2% of it is mottling or a
     compression artefact; anything over is a genuinely detached part — a
     lobster's antenna tip, a fin the ice has broken up — and belongs in the box. */
  const biggest = blobs.reduce((m, b) => (b.area > m.area ? b : m));
  const kept = blobs.filter((b) => b.area >= biggest.area * 0.02);
  const box = kept.reduce(
    (m, b) => ({
      x0: Math.min(m.x0, b.x0), x1: Math.max(m.x1, b.x1),
      y0: Math.min(m.y0, b.y0), y1: Math.max(m.y1, b.y1),
    }),
    biggest,
  );
  return {
    x: [box.x0 / w, (box.x1 + 1) / w],
    y: [box.y0 / h, (box.y1 + 1) / h],
  };
}

const verifyOnly = process.argv.includes("--verify");

const found = new Map();
for (const file of readdirSync(SRC_DIR)) {
  const stem = path.parse(file).name.replace(/\s+/g, "");
  const key = MAP[stem];
  if (!key) {
    console.log(`  ?  unmapped source file: ${JSON.stringify(file)}`);
    continue;
  }
  found.set(key, path.join(SRC_DIR, file));
}

const missing = Object.values(MAP).filter((k) => !found.has(k));
if (missing.length) {
  console.error(`\nNo source file for: ${missing.join(", ")}`);
  process.exit(1);
}

console.log(
  verifyOnly
    ? `\nVerifying ${found.size} studio frames against the tightest slot\n`
    : `\nImporting ${found.size} studio frames\n`,
);

let failures = 0;
for (const [key, srcPath] of [...found].sort()) {
  const outPath = path.join(OUT_DIR, `${key}.jpg`);

  if (!verifyOnly) {
    await sharp(srcPath)
      .jpeg({ quality: 88, chromaSubsampling: "4:4:4", mozjpeg: true })
      .toFile(outPath);
  }

  const [t, box, meta] = await Promise.all([
    tone(outPath),
    subjectBox(outPath),
    sharp(outPath).metadata(),
  ]);
  const size = statSync(outPath).size;
  const digest = createHash("md5").update(readFileSync(outPath)).digest("hex").slice(0, 8);

  const okX = box.x[0] >= SAFE_X[0] && box.x[1] <= SAFE_X[1];
  const okY = box.y[0] >= SAFE_Y[0] && box.y[1] <= SAFE_Y[1];
  if (!okX || !okY) failures++;

  console.log(
    `  ${okX && okY ? "ok " : "!! "}${key.padEnd(18)} ${meta.width}x${meta.height}` +
      `  ${(size / 1024).toFixed(0).padStart(4)} KB  tone ${t}  ${digest}` +
      `  x ${pct(box.x[0])}-${pct(box.x[1])}${okX ? "" : " OUTSIDE"}` +
      `  y ${pct(box.y[0])}-${pct(box.y[1])}${okY ? "" : " OUTSIDE"}`,
  );
}

console.log(
  `\nSafe box: x ${pct(SAFE_X[0])}-${pct(SAFE_X[1])} (carousel), ` +
    `y ${pct(SAFE_Y[0])}-${pct(SAFE_Y[1])} (detail thumbnail)`,
);
console.log(failures ? `${failures} frame(s) clip in at least one slot.\n` : "All frames clear every slot.\n");
