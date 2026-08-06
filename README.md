# Manar Trading — منار للتجارة

Marketing and catalogue site for Manar Trading, a fresh seafood supplier in Saudi Arabia
selling Red Sea and Arabian Gulf fish to homes, restaurants and hotels.

## Stack

| Piece     | Choice                                                    |
| --------- | --------------------------------------------------------- |
| Framework | Next.js 16 (App Router, Turbopack)                        |
| UI        | React 19 + TypeScript                                     |
| Styling   | Tailwind CSS v4 (CSS-first `@theme` tokens)               |
| Motion    | `motion` (Framer Motion 12) + `lenis` smooth scroll       |
| Type      | Fraunces (display) + Inter (UI), via `next/font`          |
| Icons     | `lucide-react`                                            |
| Imagery   | Unsplash CDN, hotlinked through `next/image`              |

## Running it

```bash
npm run dev
```

Then open http://localhost:3000. Other scripts: `npm run build`, `npm start`, `npm run lint`.

## Pages

| Route          | What it is                                                                                          |
| -------------- | --------------------------------------------------------------------------------------------------- |
| `/`            | Cinematic hero, statement, category index with cursor-preview tiles, how-it-works, scroll-pinned process, two seas, testimonials, CTA |
| `/shop`        | All 10 species with live search, category / waters / price filters and sorting                       |
| `/shop/[slug]` | Three-view gallery, grade selector, kg stepper, live total, tabs, related species                    |
| `/about`       | Story, pull quote, milestone timeline, values, team                                                  |
| `/contact`     | Channel cards, validated enquiry form, hours, location, FAQ accordion                                |
| `not-found`    | Themed 404                                                                                           |

All ten product pages are statically generated at build time via `generateStaticParams`.

## Where things live

```
src/
  app/                 routes, root layout, global CSS, icon.svg
  components/
    ui/                SplitText, Magnetic, CountUp, Photo
    providers/         SmoothScroll (Lenis)
    …                  HeroCinematic, CategoryList, ProcessSticky, ProductCard,
                       ProductDetail, ShopClient, Navbar, Footer, ContactForm, Faq
  data/products.ts     the 10 species — single source of truth
  data/categories.ts   the product categories indexed on the home page
  lib/images.ts        the photo registry — single source of truth for imagery
```

### Swapping the photography (read this first)

Every photograph is registered once in `src/lib/images.ts` and referenced by key.
Images are **hotlinked from the Unsplash CDN** (free licence, commercial use, no
attribution required), allowed in `next.config.ts` via `images.remotePatterns`.

To replace a photo, change one line in the registry. `src()` passes any value
starting with `/` straight through, so dropping real photography into `public/` and
writing `id: "/images/hamour.jpg"` is all it takes — no component changes.

**Worth knowing:** free stock has no species-accurate photograph of Zubaidi, Safi or
Najil. The current species images are representative seafood photography chosen to
match each fish's colour and body type as closely as possible, with a per-species
tonal wash (`palette` in `products.ts`) applied so a mixed set still reads as one
family. Replacing them with Manar's own studio shots is the single biggest upgrade
available to this site.

Render images with `<Photo image="key" sizes="…" />` — it fills its positioned parent
and pulls alt text and a blur placeholder from the registry automatically.

### Editing the catalogue

Everything about a species (price, Arabic name, origin, nutrition, grades, images,
accent palette) lives in one object in `src/data/products.ts`. Add an entry and it
appears on the home page index, in the shop, in the footer links and as its own
statically generated detail page.

### Design tokens

Colours, fonts and shadows are defined once in the `@theme` block at the top of
`src/app/globals.css` (`abyss`, `ink`, `ocean`, `azure`, `aqua`, `sand`, `bone`, and
the `sea-50…900` ramp), so they work as normal utilities like `bg-abyss` or
`text-ink/60`. The editorial type scale (`display-xl`, `display-lg`, `display-md`,
`label`, `numeral`) is defined in the same file.

### Motion

Global smooth scrolling comes from Lenis (`components/providers/SmoothScroll.tsx`),
which keeps native scroll so `useScroll` and IntersectionObserver still work. All
motion sits under `MotionConfig reducedMotion="user"`, and both Lenis and the
first-visit preloader disable themselves when the visitor asks for reduced motion.

## Before going live

- Replace the placeholder phone numbers, email, CR number and address (`Navbar`,
  `Footer`, `ContactForm`, `app/contact/page.tsx`).
- `ContactForm` fakes a submit with a timeout — wire `onSubmit` to your backend, CRM
  or the WhatsApp Business API.
- "Add to cart" on the detail page is local UI state only; there is no cart or
  checkout yet.
- Swap the stock photography for your own (see above) and consider self-hosting it
  rather than depending on a third-party CDN at runtime.
- Set the real domain in `metadataBase` in `src/app/layout.tsx`.
