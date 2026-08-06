import { Roboto_Slab, Montserrat, Amiri } from "next/font/google";

/**
 * Shared font instances.
 *
 * `app/[locale]/layout.tsx` and `app/not-found.tsx` each render their own
 * <html>, so both need the font variables. Defining the loaders once here keeps
 * a single Next.js font instance behind both — calling the loader separately in
 * each file would emit a second copy of the same @font-face set.
 *
 * Both Latin faces are loaded as variable fonts (wght 100–900) rather than
 * pinned to one weight: the base sizes are Montserrat 300 / Roboto Slab 700,
 * but the `font-medium`/`font-semibold` utilities used across the components
 * still need real weights to land on instead of synthesising them.
 */

export const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  variable: "--font-roboto-slab",
  display: "swap",
});

// Neither Latin face ships an Arabic subset, so Amiri still carries every RTL
// glyph. It is a static face — 400/700 only.
export const amiri = Amiri({
  subsets: ["arabic"],
  variable: "--font-arabic",
  weight: ["400", "700"],
  display: "swap",
});

/** Every font variable, for the <html> className. */
export const fontVariables = `${montserrat.variable} ${robotoSlab.variable} ${amiri.variable}`;
