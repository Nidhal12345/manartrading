/**
 * The one place the counter's phone number and address are written down.
 *
 * They appear in the navbar, the footer, the contact page, the enquiry form and
 * on every product page. Before this file they were typed out at each of those
 * sites, and a change of number meant six edits and one missed.
 *
 * The display strings are Latin-digit and wrapped in `dir="ltr"` at the call
 * site: an Arabic paragraph would otherwise render `+966` with the plus on the
 * wrong end.
 */

/** As printed. */
export const PHONE = "+966 56 161 4454";

/** `tel:` wants no spaces. */
export const PHONE_HREF = "tel:+966561614454";

/** wa.me wants the international number with no `+` and no separators. */
const WHATSAPP_NUMBER = "966561614454";

/**
 * Ordering happens on WhatsApp — the site quotes no prices, so the message is
 * the handoff where the counter confirms the rate by the kilo.
 *
 * `text` is optional: with no argument this is the plain "message us" link.
 */
export function whatsappHref(text?: string) {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

export const ADDRESS_LINE_1 = "Hijrah Road, Medina";
export const ADDRESS_LINE_2 = "Saudi Arabia";

export const MAPS_HREF = "https://maps.google.com/?q=Hijrah+Road+Medina+Saudi+Arabia";
