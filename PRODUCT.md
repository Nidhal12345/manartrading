# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two audiences of **genuinely equal** priority. The user was asked to rank them and
explicitly declined to — neither is secondary, and future work must not quietly
optimise for one.

**Households / home cooks.** Buying fish for the family table, often for a specific
meal or occasion (Friday lunch, a gathering). Shopping by species and appetite, at
small basket sizes, priced by the kilo. Decides on freshness, appearance and trust.

**Restaurants & hotels (trade).** Chefs and procurement staff buying recurring
volume. Decides on supply reliability, consistent grading and sizing, cold-chain
credibility and account relationship — not on romance.

Because neither audience leads, surfaces that serve both must route early and
explicitly rather than blending into one compromised journey. A single undifferentiated
path is a known failure mode for this product.

## Product Purpose

Marketing and catalogue site for Manar Trading, a fresh seafood supplier in Saudi
Arabia selling Red Sea and Arabian Gulf fish to homes, restaurants and hotels.

The site's job is to present the catch credibly and **start a conversation**. It is
not a store. Success is a visitor who opens WhatsApp or calls the counter, for either
audience.

## Positioning

Not yet established as verified fact. The codebase advances an intended position —
daily landings priced each morning, short time from catch to ice, traceable cold
chain — but none of it is confirmed (see Evidence on Hand). Treat these as the
**intended** story to be substantiated, never as claims that may be repeated as true.

Open decision: what Manar can truthfully say that a neighbouring supplier could not.

## Operating Context

- **Bilingual, equal-status English and Arabic** (`en`, `ar`) via `next-intl`, with
  full RTL for Arabic — not an afterthought locale. Arabic is a primary experience.
- Saudi market; pricing in SAR, sold by the kilogram.
- Species carry Arabic common names that are the names customers actually use
  (هامور, كنعد, نجل, صافي, زبيدي, روبيان).
- Ordering happens off-site, in conversation: **WhatsApp or phone**. Product pages
  should terminate in an opened conversation (ideally a pre-filled message), not a
  basket.
- Real usage skews mobile for both audiences — a chef on the line, a shopper in the
  kitchen.

## Capabilities and Constraints

**Built and working:** static catalogue of 10 species with per-species detail pages
(`generateStaticParams`); shop index with search, category/waters/price filters and
sorting; home, about, contact, themed 404; bilingual routing with RTL; Lenis smooth
scroll and reduced-motion handling.

**Deliberately absent — do not present as existing:**

- No cart, checkout, payment, delivery scheduling or order tracking. The detail-page
  "Add to cart" is local UI state only and is a **placeholder for the WhatsApp/phone
  path**, not for future commerce.
- `ContactForm` fakes submission with a `setTimeout`; there is no backend, CRM or
  email delivery. Nothing a visitor submits is received today.
- No accounts, auth, order history or trade portal.

**Technical constraints:** Next.js 16 App Router on Turbopack, React 19, TypeScript,
Tailwind v4 with CSS-first `@theme` tokens. Photography is hotlinked from the Unsplash
CDN via `images.remotePatterns` — a runtime third-party dependency the project intends
to remove. `metadataBase` still points at a placeholder domain.

**Open decisions:** whether an online cart is ever built; response-time commitment for
enquiries; delivery zones; whether trade buyers get a distinct mechanism from
households.

## Brand Commitments

- Name: **Manar Trading — منار للتجارة**. Both forms are binding.
- English/Arabic parity with correct RTL is a standing commitment, not a feature.
- Existing mark: `src/app/icon.svg`, used with the wordmark in `components/Logo.tsx`.
- Typography committed this session: **Fraunces** (display, variable `SOFT`/`WONK`
  axes in use) + **Schibsted Grotesk** (UI/body) for Latin, **Amiri** for Arabic, all
  self-hosted through `next/font`.
- Voice in the existing copy is plain, specific and unshowy — concrete nouns, real
  cooking language, no luxury boilerplate. Worth preserving even as facts get
  replaced.

## Evidence on Hand

**None of the site's content is verified. The user confirmed that every category
below is placeholder and will be replaced later.** This is the single most important
fact in this record: future work must not cite, extend, build proof around, or invent
supporting detail for any of it.

| Content | Status |
|---|---|
| 10 species, SAR prices, origins, seasons, grades, catch methods (`src/data/products.ts`) | **Placeholder** — plausible but unverified |
| Testimonials: Nouf Al-Qahtani, Omar Bin Saleh, Al Bahr Restaurant chef | **Fabricated** — must be removed or replaced with real, attributable quotes |
| Phone `+966 50 000 0000`, `hello@manartrading.sa`, address, hours, CR number | **Placeholder** |
| About page founding story, dated milestone timeline, values, named team | **Placeholder** |
| Nutrition figures, ratings and review counts per species | **Placeholder** |
| All photography (Unsplash) | **Stock stand-ins.** No species-accurate free image exists for Zubaidi, Safi or Najil; current images are tonally matched approximations. Real studio photography is the largest single upgrade available. |

Consequences to honour: do not write new copy that depends on these numbers; do not
add fresh testimonials, customer names, certifications, awards, benchmarks or
years-in-business claims; when a surface needs proof, flag the gap rather than filling
it. Placeholder contact details must never be styled as though verified.

## Product Principles

1. **Two audiences, one truth, separate paths.** Households and trade matter equally;
   serve each explicitly rather than averaging them into a journey that suits neither.
2. **Every surface ends in a conversation.** The measure of a page is whether it makes
   opening WhatsApp or calling feel like the obvious next move.
3. **Arabic is not a translation layer.** RTL and Arabic typography get first-class
   craft, always shipped together with English.
4. **Specific beats superlative.** The voice earns trust with concrete detail —
   species, waters, method, grade — not adjectives.
5. **Never manufacture credibility.** With the content unverified, invented proof is
   the main risk to this project. Name the gap; let the client fill it.

## Accessibility & Inclusion

No client-specific standard was established. Existing commitments visible in the code
and worth preserving: a working skip link, `MotionConfig reducedMotion="user"` with
Lenis and the first-visit preloader both standing down under
`prefers-reduced-motion`, and full logical-property layout so RTL mirrors correctly.
