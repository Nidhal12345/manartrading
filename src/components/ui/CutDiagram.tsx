/**
 * Stencilled cut diagrams.
 *
 * Authored assets, not photographs. The identity of this site is carried by
 * painted marks — transom boards, draft ladders, bow numerals — and these belong
 * to the same set: a signwriter's stencil of a fish, cut five ways.
 *
 * Drawn rather than shot for a practical reason as well as a stylistic one. The
 * five cut photographs are on the shoot list, and until they exist any
 * photographic version of this section would be five stand-in images of the wrong
 * species. A drawing is finished now and stays correct afterwards.
 *
 * All five share one body outline so the set reads as one hand. Strokes are
 * `currentColor`, so a diagram takes the colour of whatever field it is dropped
 * on; the cut marks are ochre, because that is the colour a mark is made in.
 *
 * The vocabulary itself lives in `@/data/products` as `PREPARATIONS`, not here:
 * the shop filters on it and every product carries its own subset, so it is
 * catalogue data and this file is one way of drawing it.
 */

import type { Preparation } from "@/data/products";

/** The shared silhouette: a pointed body and a forked tail. */
const BODY = "M6 28C22 9 62 9 84 28C62 47 22 47 6 28Z";
const TAIL = "M84 28L112 12L106 28L112 44Z";

export function CutDiagram({
  cut,
  className = "",
}: {
  cut: Preparation;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 120 56"
      fill="none"
      aria-hidden="true"
      className={`rtl-flip ${className}`}
      preserveAspectRatio="xMidYMid meet"
    >
      <g
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
        strokeLinejoin="miter"
        opacity="0.85"
      >
        {cut === "filleted" ? (
          /* Two fillets off one fish: head and frame gone, so the body outline
             is replaced rather than annotated. */
          <>
            <path d="M10 20C30 8 66 10 92 18C66 26 30 30 10 20Z" />
            <path d="M10 38C30 26 66 28 92 36C66 44 30 48 10 38Z" />
          </>
        ) : cut === "butterflied" ? (
          /* Opened along the spine and laid flat: the two halves hinge on the
             centre line, which is the only line drawn solid across. */
          <>
            <path d="M6 27C22 11 62 11 84 26" />
            <path d="M6 29C22 45 62 45 84 30" />
            <path d="M84 26L112 12L106 28L112 44L84 30" />
          </>
        ) : (
          <>
            <path d={BODY} />
            <path d={TAIL} />
            {/* The eye and gill are only drawn where a head is still on. */}
            <circle cx="22" cy="24" r="1.75" fill="currentColor" stroke="none" />
            <path d="M32 15C27 21 27 35 32 41" />
          </>
        )}
      </g>

      {/* The marks themselves, in the colour a cut is marked in. */}
      <g stroke="var(--color-ochre)" strokeWidth="1.5" strokeLinecap="butt">
        {cut === "cleaned" && (
          /* Gutted and scaled: the belly is opened, so the mark runs along it. */
          <path d="M20 39C36 47 60 47 76 39" strokeDasharray="4 3.5" />
        )}

        {cut === "steaked" && (
          /* Cross-cut through the body, evenly. */
          <>
            <path d="M32 13V43" strokeDasharray="4 3.5" />
            <path d="M46 11V45" strokeDasharray="4 3.5" />
            <path d="M60 11V45" strokeDasharray="4 3.5" />
            <path d="M74 15V41" strokeDasharray="4 3.5" />
          </>
        )}

        {cut === "butterflied" && <path d="M6 28H84" />}

        {cut === "filleted" && (
          /* The frame the two fillets came off, marked where the tail was cut
             away. */
          <path d="M96 28H112" strokeDasharray="4 3.5" />
        )}
      </g>
    </svg>
  );
}
