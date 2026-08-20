/**
 * Every photograph on the site is registered here.
 *
 * Images are served locally from /public/images/<key>.jpg — most were originally
 * sourced from the Unsplash CDN (free licence, commercial use, no attribution
 * required) and then downloaded into the repo so the site no longer hotlinks a
 * third-party CDN on every request and works fully offline.

 * To swap in Manar's own photography, drop the file in /public/images named
 * after the key — `src()` builds its path from the key, not from `id`, so
 * `grouperSpecimen` is served from /images/grouperSpecimen.jpg and nothing else.
 * `id` is kept as the provenance note for the shots that came off Unsplash.
 *
 * `tone` is the photo's dominant colour. It is only used to build a tiny inline
 * blur-up placeholder so there is no flash of empty box while the photo loads.
 */


export type ImageKey = keyof typeof registry;

type Entry = { id: string; alt: string; tone: string };

const e = (id: string, alt: string, tone: string): Entry => ({ id, alt, tone });

export const registry = {
  /* ---------- hero / atmosphere ---------- */
  heroDeep: e(
    "photo-1559825481-12a05cc00344",
    "Sunlight rippling across the seabed in deep blue water",
    "#0a3c52",
  ),
  heroRays: e(
    "photo-1530053969600-caed2596d242",
    "Shafts of sunlight cutting down through open water",
    "#0d5f74",
  ),
  reefLight: e(
    "photo-1545605114-7b82dad7b990",
    "Sun breaking through a reef arch underwater",
    "#123244",
  ),
  darkWater: e(
    "photo-1449709992276-24bbca940809",
    "The surface of the sea seen from below",
    "#123f4a",
  ),

  /* ---------- species ---------- */
  fishOnIceRow: e(
    "photo-1611214774777-3d997a9d0e35",
    "A row of whole silver fish laid out on crushed ice",
    "#8ba3ad",
  ),
  mackerelBlue: e(
    "photo-1708441883881-bc19f70b97d8",
    "Spotted blue mackerel arranged on a market table",
    "#4a7c9b",
  ),
  greyWholeFish: e(
    "photo-1674066620888-4878aad91094",
    "Whole grey fish resting on a bed of ice",
    "#6b7a80",
  ),
  colourfulCatch: e(
    "photo-1615141982883-c7ad0e69fd62",
    "Red snapper and bright reef fish arranged on ice",
    "#a8534a",
  ),
  marketBream: e(
    "photo-1746964245994-b1d15d7df515",
    "Fresh bream and silver fish on a market counter",
    "#7d8b8f",
  ),
  blueTableFish: e(
    "photo-1783068085338-e8f0b1ff040f",
    "Freshly landed fish laid out on a blue market table",
    "#3f6f8c",
  ),
  friedSmallFish: e(
    "photo-1548704087-b11dab0fbec0",
    "Small fried fish served with lemon wedges",
    "#c2915a",
  ),
  silverPile: e(
    "photo-1766059965546-c335e31ac4be",
    "A large pile of fresh silvery fish",
    "#7f9099",
  ),
  prawnsOnIce: e(
    "photo-1558783005-5c492a97ec20",
    "Prawns resting in a bowl of crushed ice",
    "#b4726a",
  ),
  /* Documentary frames — whatever the market had out that morning. These are
     not product photography: `alt` names what is actually in the shot, because
     a caption claiming the species a line is sold under would be a caption that
     lies. Two of them still carry the home page's category cards; the rest are
     library. */
  grouperLanding: e(
    "unsplash-rYwqoxleZbU",
    "Spotted grouper laid out on a landing table beside crab and tuna",
    "#767279",
  ),
  spinyLobster: e(
    "unsplash-OJPBfUqgsRU",
    "Whole spiny lobsters piled on a quayside table",
    "#473e3d",
  ),
  squidOnIce: e(
    "unsplash-h80T-wumakg",
    "Fresh whole squid on ice with lime and coriander",
    "#78735c",
  ),
  /* The first specimen plate the client supplied, shot on studio white, and now
     superseded by the set below — kept as the reference frame for the Grouper
     line because it is the one shot whose species is documented exactly
     (Epinephelus coioides). Its studio white is multiplied down onto `limewash`
     so the ground is the page's own white rather than a raw #ffffff hole in the
     palette. Nothing renders it. */
  grouperSpecimen: e(
    "manar-epinephelus-coioides",
    "A whole orange-spotted grouper laid out side-on against a plain pale ground",
    "#ece9e0",
  ),
  tunaPile: e(
    "photo-1766998112558-c8632e66cc49",
    "Freshly landed tuna stacked at the quay",
    "#4c5a63",
  ),

  /* ---------- the counter's studio set ---------- */
  /**
   * One frame per line on the spec sheet — sixteen of them, and the reason the
   * shop grid can be frameless: every shot is a single specimen on the same
   * mottled pale ice, so the photographs tile into a grid on their own without
   * a plate drawn round each one.
   *
   * Imported by scripts/import-studio-photos.mjs, which maps the client's
   * Arabic filenames onto these keys, encodes the supplied PNGs to the JPEGs
   * `src()` serves, and prints the `tone` values below — each one is the frame's
   * measured average colour, not a guess, so the blur-up placeholder resolves
   * into the photograph rather than flashing a different blue first.
   *
   * Geometry is the client's: 1122x1402, which is 4:5 exactly, and 4:5 is the
   * aspect of both slots that show the whole frame (the shop grid card and the
   * detail lead). Nothing is re-cropped on the way in.
   *
   * KNOWN CLIP — the best-sellers carousel hangs its parallax layer 14% past
   * its window each side, so it only ever shows the middle 78.1% of the width,
   * and this set frames its specimens out to 92 - 98%. Measured with
   * `node scripts/import-studio-photos.mjs --verify`: of the six lines on that
   * shelf, Grouper (92.7%), Kingfish (97.9%), Trevally (92.1%) and Squid
   * (94.1%) lose a tail tip, Prawn sits on the line at 88.8%, and only Crayfish
   * (76.8%) clears it comfortably. Nothing else on the site crops the width —
   * the shop card and the detail lead are both 4:5 and show the whole frame.
   * Fixing it means either recomposing the frames or reducing that overhang —
   * an open decision, not an oversight.
   *
   * `alt` describes the animal as photographed, which is not always the name the
   * line is sold under: the Trevally line's frame is the coral trout its own
   * `scientific` field names, and the Lobster arrives cooked while every other
   * frame in the set is raw.
   */
  /* Fish, in catalogue order */
  trevallyStudio: e(
    "manar-trevally",
    "A whole red-orange spotted coral trout laid side-on on pale blue ice",
    "#d0d2da",
  ),
  shareefiStudio: e(
    "manar-shareefi",
    "A whole deep-red shareefi laid side-on on pale blue ice",
    "#cbced4",
  ),
  grouperStudio: e(
    "manar-grouper",
    "A whole brown-spotted grouper laid side-on on pale blue ice",
    "#cfdae4",
  ),
  parrotfishStudio: e(
    "manar-parrotfish",
    "A whole vivid blue-and-orange parrotfish laid side-on on pale blue ice",
    "#c7d1d8",
  ),
  emperorStudio: e(
    "manar-emperor",
    "A whole rose-pink emperor with a gold tail laid side-on on pale blue ice",
    "#d1d9e1",
  ),
  kingfishStudio: e(
    "manar-kingfish",
    "A whole silver-blue kingfish with barred flanks laid side-on on pale blue ice",
    "#c6d6df",
  ),
  seaBreamStudio: e(
    "manar-sea-bream",
    "A whole silver sea bream laid side-on on pale blue ice",
    "#c0d0de",
  ),
  seaBassStudio: e(
    "manar-sea-bass",
    "A whole slender silver sea bass laid side-on on pale blue ice",
    "#c0cedb",
  ),
  rabbitfishStudio: e(
    "manar-rabbitfish",
    "A whole olive-grey rabbitfish laid side-on on pale blue ice",
    "#c6cfd4",
  ),
  bayadhStudio: e(
    "manar-bayadh",
    "A whole silver-grey Nile perch with a yellow tail laid side-on on pale blue ice",
    "#c4d1da",
  ),
  /* Crustaceans & Seafood, in catalogue order */
  prawnStudio: e(
    "manar-prawn",
    "A single whole tiger prawn, head on, curled on pale blue ice",
    "#c3d0d8",
  ),
  crayfishStudio: e(
    "manar-crayfish",
    "A whole spiny lobster seen from above with its antennae fanned out on pale blue ice",
    "#cdd4d4",
  ),
  lobsterStudio: e(
    "manar-lobster",
    "A whole cooked red lobster seen from above with its claws forward on pale blue ice",
    "#c4c0c4",
  ),
  crabStudio: e(
    "manar-crab",
    "A blue swimmer crab seen from above on pale blue ice",
    "#c9d0d4",
  ),
  octopusStudio: e(
    "manar-octopus",
    "A whole octopus with curled tentacles on pale blue ice",
    "#c8d0d6",
  ),
  squidStudio: e(
    "manar-squid",
    "A whole squid with its mantle and tentacles laid out on pale blue ice",
    "#cfd6de",
  ),

  /* ---------- in the water ---------- */
  wildGrouper: e(
    "photo-1523585559758-0a4a68774f35",
    "A grouper hanging over coral in clear water",
    "#1c6b7c",
  ),
  wildReef: e(
    "photo-1510636491874-d8e8e85c469b",
    "A large reef fish facing the camera underwater",
    "#3d6a75",
  ),
  wildSpotted: e(
    "photo-1763608611901-b619e7a18b78",
    "A big spotted fish swimming across the reef",
    "#2f5f70",
  ),

  /* ---------- process / story ---------- */
  boatDawn: e(
    "photo-1664955042007-59619a894b27",
    "A small fishing boat on golden water at sunrise",
    "#c58b4a",
  ),
  tunaOnIceBW: e(
    "photo-1764346139107-b7b971eca0dd",
    "Tuna packed in ice, shot in black and white",
    "#8d949a",
  ),
  cuttingLoin: e(
    "photo-1609149401278-727e55e0bbc1",
    "A fishmonger cutting a deep red tuna loin",
    "#8e5148",
  ),
  fishmonger: e(
    "photo-1666634902416-83fc90b7f29c",
    "A fishmonger filleting fish behind the counter",
    "#9a8578",
  ),
  marketCounter: e(
    "photo-1649793867328-5bce088ae616",
    "A trader working behind a busy fish counter",
    "#7c7266",
  ),
  harbour: e(
    "photo-1704872988405-ea936b8a78b4",
    "Fishing boats moored in a harbour at dusk",
    "#5b6c7a",
  ),
  boatsDusk: e(
    "photo-1578643800440-7cdc0eac92a5",
    "Fishing boats silhouetted against an evening sky",
    "#7a6a5c",
  ),
  fishRows: e(
    "photo-1781523290661-2a3a2c1a5382",
    "Rows of fish laid out across a market floor",
    "#5f6660",
  ),

  /* ---------- cooked ---------- */
  charcoalGrill: e(
    "photo-1739484151190-e2a73842ca13",
    "Whole fish grilling over glowing charcoal",
    "#a8622f",
  ),
  grilledLeaf: e(
    "photo-1718942899999-b3da4177ee2a",
    "A grilled whole fish served on a banana leaf",
    "#7d7a3f",
  ),
  grilledPlate: e(
    "photo-1661939252817-ebb73304f4c7",
    "A scored grilled fish plated on a green leaf",
    "#8a8a4e",
  ),
  /* The counter's own photograph. Chosen for its ground as much as its subject:
     the slate it is shot on is within a few points of `tar`, so the frame meets
     the section's field without a seam where the two halves join. */
  platedFillet: e(
    "photo-1519708227418-c8fd9a32b7a2",
    "A seared fish fillet plated on ribboned vegetables with a wedge of lime",
    "#443f35",
  ),
} satisfies Record<string, Entry>;

/**
 * Path for a registered photo. All photographs live locally in
 * /public/images/<key>.jpg, so this always returns a same-origin path and is
 * fully self-contained. The `width` argument is kept for API compatibility with
 * existing call sites; the stored files are sized generously (1600px), which is
 * fine for every slot on the site.
 */
export function src(key: ImageKey, _width = 1200): string {
  return `/images/${key}.jpg`;
}


export function alt(key: ImageKey): string {
  return registry[key].alt;
}

/** Tiny inline placeholder in the photo's dominant colour. */
export function blur(key: ImageKey): string {
  const { tone } = registry[key];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="8" height="8"><rect width="8" height="8" fill="${tone}"/></svg>`;
  return `data:image/svg+xml;base64,${btoaSafe(svg)}`;
}

function btoaSafe(input: string): string {
  if (typeof btoa === "function") return btoa(input);
  return Buffer.from(input, "utf-8").toString("base64");
}
