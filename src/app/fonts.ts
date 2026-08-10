import { Big_Shoulders, Archivo, Reem_Kufi, Zain } from "next/font/google";

/**
 * Shared font instances — the boatyard's painted-signage voice.
 *
 * `app/[locale]/layout.tsx` and `app/not-found.tsx` each render their own
 * <html>, so both need the font variables. Defining the loaders once here keeps
 * a single Next.js font instance behind both — calling the loader separately in
 * each file would emit a second copy of the same @font-face set.
 *
 * Four faces, two per script. Latin and Arabic each get a display face and a
 * text face, so Arabic is set properly rather than being forced through a Latin
 * pairing that never had it in mind.
 */

/**
 * Latin display. Condensed and industrial — the proportions of lettering
 * painted straight onto a hull, which is why it reads as signage instead of as
 * a magazine serif.
 *
 * `opsz` is requested because the display sizes span 1.75rem to 8.5rem. The
 * optical-size axis thins the strokes and opens the counters as the size climbs,
 * so the hero does not set like a scaled-up subhead. Driven from CSS via
 * `font-variation-settings` in the display classes.
 */
export const bigShoulders = Big_Shoulders({
  subsets: ["latin"],
  variable: "--font-big-shoulders",
  axes: ["opsz"],
  display: "swap",
});

/**
 * Latin UI and body.
 *
 * `wdth` is the whole reason for this choice: one family covers both running
 * text at normal width and genuinely condensed stencil labels, grade tables and
 * draft marks. A separate condensed family would be a second download for the
 * same job.
 */
export const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  axes: ["wdth"],
  display: "swap",
});

/**
 * Arabic display. Geometric kufic, so it shares Big Shoulders' constructed,
 * stencil-adjacent character — a calligraphic serif fights that voice.
 *
 * `preload: false` on both Arabic faces: all four variables are applied to
 * <html> on every route, and preloading would make an English visitor pay for
 * two Arabic glyph sets they never render. Declared but not preloaded, the
 * browser fetches them only when RTL text actually matches the family.
 */
export const reemKufi = Reem_Kufi({
  subsets: ["arabic"],
  variable: "--font-reem-kufi",
  display: "swap",
  preload: false,
});

/**
 * Arabic body. Reem Kufi is deliberately stiff at paragraph length, so running
 * Arabic text gets its own face. Zain has no variable build — the weights are
 * listed explicitly, and only the two the design uses.
 */
export const zain = Zain({
  subsets: ["arabic"],
  variable: "--font-zain",
  weight: ["400", "700"],
  display: "swap",
  preload: false,
});

/** Every font variable, for the <html> className. */
export const fontVariables = `${bigShoulders.variable} ${archivo.variable} ${reemKufi.variable} ${zain.variable}`;
