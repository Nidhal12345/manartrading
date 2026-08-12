# Photo brief — Manar Trading catalogue

**48 photographs needed: 16 product lines × 3 shots each.**

This is a **test round**. Everything on the site right now is placeholder stock, and most
lines don't have their own photograph at all — one mackerel photo is the card image for 8
of the 10 fish, one bowl of prawns covers 4 of the 6 shellfish, and every fish shares the
same two supporting shots. So a customer comparing Sea Bass and Parrotfish sees the same
picture twice. That's what we're fixing.

**Don't worry about credits or licensing.** Take images from anywhere on the web. These
are for testing the layout, and every file will be replaced before the site goes live.
Pick on one basis: **does it look good on a website.**

---

## The three shots

| # | Shot | What it must show |
|---|---|---|
| 1 | **Out of the water** | The product itself, clean and clear. **The most important of the three** — it's the shop grid card *and* the first gallery image. |
| 2 | **In the water** | The living animal in its habitat. Swimming — not on a hook, not in an aquarium tank. |
| 3 | **On the plate** | The line cooked and plated. Grilled whole, or as the cut it's actually sold in (noted per line). |

### Shot 1 in detail — read this one carefully

This is the shot that sells the line, so it has the tightest requirements:

- **The animal fills the frame** and is sharply in focus.
- **Plain, simple background** — white, grey, a dark board, a clean counter. No crowded
  market stalls, no crates, no hands, no people, no mound of ice, no clutter.
- **Even, bright light.** No harsh flash glare, no deep shadows across the body.
- **Fish shot side-on**, whole, so the shape and the markings read clearly.
- **Nothing printed on the image** — no watermark, no stock-agency overlay, no logo, no
  text, no price tag.

If you can only find one good photo for a line, make it this one.

---

## Technical spec

- **Format:** JPEG.
- **Shape: 4:5 portrait — 1600 × 2000.** Not square, not landscape. The site's tightest
  slot is 4:5 and its widest is 4:3, and a centre crop always sacrifices whichever
  dimension is in surplus. A 4:5 file therefore never loses width anywhere; a square loses
  10% off each end in the card, and a landscape loses 20% off each end. On a side-on fish
  the first things to go are the snout and the tail tip — the two features a buyer
  identifies the line by.
- **Size:** 2000 px on the long edge or larger. Not smaller — it will look soft on screen.
- **Crop safety — the numbers, not a vibe.** Put the animal inside a box **76% of the frame
  width × 34% of the frame height, centred on both axes**:

  ```
  ┌─────────── 4:5 frame, 1600 × 2000 ───────────┐
  │                                              │
  │                                              │ ← 33% headroom
  │     ┌────── 76% w × 34% h ──────┐            │
  │     │ ▓▓▓▓▓▓▓▓ the fish ▓▓▓▓▓▓▓ │            │ ← centred, both axes
  │     └───────────────────────────┘            │
  │                                              │
  │                                              │ ← 33% footroom
  └──────────────────────────────────────────────┘
     12%                                    12%
  ```

  Measure that box from the **fin extremes** — leading dorsal spine, trailing tail edge,
  and the drop of the pelvic and anal fins — not from the body.

  Where the two limits come from, since they are not obvious:

  | Slot | Shows | Constrains |
  |---|---|---|
  | Shop grid card, detail lead | 4:5, full frame | — |
  | Detail thumbnail | 4:3 — central **60%** of height | height |
  | Home best-sellers carousel | central **78.1%** of width | **width** |

  The carousel is the binding one and the easiest to miss: the photo rides a parallax
  layer that hangs 14% past its window on each side, so the outer ~22% of the width is
  never on screen at any viewport. Cards also zoom `1.05` on hover, taking a further 2.4%
  off every edge. 76% clears all of it.

- **No watermarks.** A visible watermark makes the file unusable even for testing.
- **Plain, even ground**, and no shadow running off an edge — a shadow that reaches the
  frame edge becomes a hard line when the photo is cropped.

---

## How to organise and send it

Make **one new folder** called `manar-photos`, and inside it **one folder per line**,
numbered in the order below. Three files in each:

```
manar-photos/
├── 01-grouper/
│   ├── grouperMain.jpg
│   ├── grouperWild.jpg
│   └── grouperPlate.jpg
├── 02-kingfish/
│   ├── kingfishMain.jpg
│   ├── kingfishWild.jpg
│   └── kingfishPlate.jpg
├── 03-trevally/
│   └── …
… and so on through 16-squid
```

- `…Main` = shot 1 (out of the water) · `…Wild` = shot 2 (in the water) · `…Plate` = shot 3
- **Use the filenames exactly as written.** The site looks for these names — a renamed
  file won't load.
- If a slot can't be filled, **leave the file out and tell me which one** rather than
  dropping in something that doesn't fit. A known gap is easy to work around; a wrong
  photo is not.
- Zip `manar-photos` and send the whole thing back in one go.

---

## Getting the right species

Every image on the site carries a caption naming what's in the frame, so the photo does
need to be the right animal — a grouper filed under "Trevally" would force a caption that
lies, and any customer who knows fish would spot it.

**Search on the scientific name**, not the English one — it's the only unambiguous
identifier, and image results for it are reliable. The Arabic name is what the counter
actually calls the line and is the second-best search term. English fish names vary from
country to country and will send you to the wrong animal.

---

## The lines

### Fish

---

**1. Grouper — الهامور** · folder `01-grouper`
*Epinephelus coioides* (orange-spotted grouper) · Red Sea · Jazan & Farasan Banks
Sold as: whole, cleaned, steaked, filleted, butterflied
**Best seller — highest priority on the list.**

| Shot | Filename |
|---|---|
| Out of the water | `grouperMain.jpg` |
| In the water | `grouperWild.jpg` |
| On the plate | `grouperPlate.jpg` |

---

**2. Kingfish (Spanish Mackerel) — الكنعد** · folder `02-kingfish`
*Scomberomorus commerson* (narrow-barred Spanish mackerel) · Arabian Gulf · Dammam & Qatif
Sold as: whole, cleaned, steaked, filleted, butterflied
**Best seller.** Sold mostly as steaks — the plate shot should be steaks, not a whole fish.

| Shot | Filename |
|---|---|
| Out of the water | `kingfishMain.jpg` |
| In the water | `kingfishWild.jpg` |
| On the plate | `kingfishPlate.jpg` |

---

**3. Trevally — الناجل** · folder `03-trevally` ⚠️ **see the note at the end first**
*Plectropomus areolatus* (squaretail coralgrouper) · Red Sea · Farasan Banks
Sold as: whole, cleaned, steaked, filleted, butterflied
Premium line.

| Shot | Filename |
|---|---|
| Out of the water | `trevallyMain.jpg` |
| In the water | `trevallyWild.jpg` |
| On the plate | `trevallyPlate.jpg` |

---

**4. Shareefi — الشريفي** · folder `04-shareefi`
*Carangoides spp.* (a trevally / jack) · Red Sea · Al Lith & Qunfudhah
Sold as: whole, cleaned, filleted, butterflied — comes in too small to steak
Plate shot: whole, off the charcoal.

| Shot | Filename |
|---|---|
| Out of the water | `shareefiMain.jpg` |
| In the water | `shareefiWild.jpg` |
| On the plate | `shareefiPlate.jpg` |

---

**5. Parrotfish — الحريد** · folder `05-parrotfish`
*Scarus ghobban* (blue-barred parrotfish) · Red Sea · Farasan Islands
Sold as: whole, cleaned, filleted, butterflied
The colour is the whole point of this line — both the main and the in-water shot should be
vivid.

| Shot | Filename |
|---|---|
| Out of the water | `parrotfishMain.jpg` |
| In the water | `parrotfishWild.jpg` |
| On the plate | `parrotfishPlate.jpg` |

---

**6. Emperor (Spangled Emperor) — الشعور** · folder `06-emperor`
*Lethrinus nebulosus* · Red Sea · Al Lith & Qunfudhah
Sold as: whole, cleaned, steaked, filleted, butterflied

| Shot | Filename |
|---|---|
| Out of the water | `emperorMain.jpg` |
| In the water | `emperorWild.jpg` |
| On the plate | `emperorPlate.jpg` |

---

**7. Rabbitfish (White-spotted Spinefoot) — الصافي** · folder `07-rabbitfish`
*Siganus canaliculatus* · Arabian Gulf · Qatif & Tarout Bay
Sold as: whole, cleaned, butterflied — a ~300 g fish, never steaked or filleted
Plate shot: several small whole fish. Not a fillet.

| Shot | Filename |
|---|---|
| Out of the water | `rabbitfishMain.jpg` |
| In the water | `rabbitfishWild.jpg` |
| On the plate | `rabbitfishPlate.jpg` |

---

**8. Sea Bream — الدنيس** · folder `08-seabream`
*Sparus aurata* (gilthead bream) · Imported · Greece & Turkey
Sold as: whole, cleaned, filleted, butterflied
**Farmed, not wild** — the in-water shot should be a sea cage or a live fish in clear
water, not a coral reef.
Plate shot: salt-baked or grilled whole.

| Shot | Filename |
|---|---|
| Out of the water | `seaBreamMain.jpg` |
| In the water | `seaBreamWild.jpg` |
| On the plate | `seaBreamPlate.jpg` |

---

**9. Sea Bass — القاروص** · folder `09-seabass`
*Dicentrarchus labrax* (European seabass) · Imported · Greece & Turkey
Sold as: whole, cleaned, filleted, butterflied
**Farmed, not wild** — same note as Sea Bream. A plate-sized whole fish.

| Shot | Filename |
|---|---|
| Out of the water | `seaBassMain.jpg` |
| In the water | `seaBassWild.jpg` |
| On the plate | `seaBassPlate.jpg` |

---

**10. Bayadh — البياض** · folder `10-bayadh`
*Lates niloticus* (Nile perch) · Imported · Lake Victoria
Sold as: **steaked and filleted only** — arrives as loins, never whole
Main shot: **thick white loins or fillets, not a whole fish.** This is the one line where a
whole-animal shot would be wrong.
In-water shot: a freshwater lake fish — no reef, no coral.

| Shot | Filename |
|---|---|
| Out of the water | `bayadhMain.jpg` |
| In the water | `bayadhWild.jpg` |
| On the plate | `bayadhPlate.jpg` |

---

### Crustaceans & seafood

---

**11. Shrimp / Prawn — جمبري** · folder `11-shrimp`
*Penaeus semisulcatus* (green tiger prawn) · Arabian Gulf · Gulf trawl grounds
Sold as: whole, cleaned (peeled & deveined), butterflied (split for skewers)
**Best seller. Heads on** — that's the selling point, so the main shot must show heads on.

| Shot | Filename |
|---|---|
| Out of the water | `shrimpMain.jpg` |
| In the water | `shrimpWild.jpg` |
| On the plate | `shrimpPlate.jpg` |

---

**12. Crayfish (Spiny Lobster) — استكوزا** · folder `12-crayfish`
*Panulirus homarus* (scalloped spiny lobster) · Red Sea · Farasan Banks
Sold as: whole, cleaned, butterflied (halved lengthways for the grill)
Premium line. **No claws** — spiny lobster, not Atlantic lobster. Two different animals,
and the difference is obvious in a photo.

| Shot | Filename |
|---|---|
| Out of the water | `crayfishMain.jpg` |
| In the water | `crayfishWild.jpg` |
| On the plate | `crayfishPlate.jpg` |

---

**13. Lobster — لوبستر** · folder `13-lobster`
*Homarus americanus* (Atlantic / cold-water lobster) · Imported · Nova Scotia, Canada
Sold as: whole, cleaned, butterflied
**Big front claws** — this is the clawed one, and the contrast with line 12 is exactly why
both are on the counter. Cold northern water, not a reef.

| Shot | Filename |
|---|---|
| Out of the water | `lobsterMain.jpg` |
| In the water | `lobsterWild.jpg` |
| On the plate | `lobsterPlate.jpg` |

---

**14. Crab — كابوريا** · folder `14-crab`
*Portunus pelagicus* (blue swimmer crab) · Arabian Gulf · Qatif & Tarout Bay
Sold as: whole, cleaned
Blue swimmer specifically — blue-mottled shell, paddle-shaped back legs. Not a mud crab,
not a Dungeness.

| Shot | Filename |
|---|---|
| Out of the water | `crabMain.jpg` |
| In the water | `crabWild.jpg` |
| On the plate | `crabPlate.jpg` |

---

**15. Octopus — اخطبوط** · folder `15-octopus`
*Octopus vulgaris* (common octopus) · Red Sea · Jeddah coastline
Sold as: whole, cleaned
Plate shot: grilled or slow-braised tentacles.

| Shot | Filename |
|---|---|
| Out of the water | `octopusMain.jpg` |
| In the water | `octopusWild.jpg` |
| On the plate | `octopusPlate.jpg` |

---

**16. Squid — حباره** · folder `16-squid`
*Loligo duvauceli* (Indian squid) · Arabian Gulf · Gulf trawl grounds
Sold as: whole, cleaned, steaked (cross-cut into rings)
Chef's pick. Plate shot: rings work well, since that's how it's sold.

| Shot | Filename |
|---|---|
| Out of the water | `squidMain.jpg` |
| In the water | `squidWild.jpg` |
| On the plate | `squidPlate.jpg` |

---

## One thing to flag on line 3

**"Trevally" contradicts itself.** The English name says trevally (a jack — *Caranx* /
*Carangoides*), but the Arabic الناجل and the scientific name *Plectropomus areolatus* both
say squaretail coralgrouper, a completely different fish that also overlaps with line 1,
Grouper. Searching "trevally" will return the wrong animal.

For this test round, **source it as *Plectropomus areolatus*** — the Arabic name is the one
the counter uses, so it's the likelier truth. Separately, whoever owns the catalogue should
settle whether this line is الناجل or a genuine trevally, and correct whichever half is
wrong. Note that line 4, Shareefi, *is* a real *Carangoides* trevally.

Worth knowing for the wider picture: the scientific names, waters and origins throughout
this brief were written as placeholder content and have not been confirmed against what
Manar actually buys. Fine for a test round — but before anyone commissions real
photography, the species list needs confirming.
