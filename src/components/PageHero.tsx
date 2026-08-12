import Photo from "./ui/Photo";
import { Link } from "@/i18n/navigation";
import Reveal from "./Reveal";

import { type ImageKey } from "@/lib/images";

/**
 * Shared opener for the inner routes.
 *
 * The photograph sits below the waterline — a tar field with the image dropped
 * back far enough to read as painted-over timber rather than as a hero slideshow.
 * The drifting caustics and film grain that used to sit on top are gone; the
 * ragged waterline at the base is the only edge treatment.
 *
 * Top padding clears the fixed header, which is 76px: a 74px nav row and the 2px
 * scroll rule. The rest of the padding is the breathing room above the
 * breadcrumb — 72px, and 112px once there is room for it.
 */
export default function PageHero({
  eyebrow,
  title,
  copy,
  crumbs,
  image,
}: {
  eyebrow: string;
  title: string;
  copy: string;
  crumbs: { href?: string; label: string }[];
  image: ImageKey;
}) {
  return (
    <section className="relative bg-tar pb-20 pt-[148px] text-limewash md:pb-28 md:pt-[188px]">
      <Photo
        image={image}
        res={1800}
        sizes="100vw"
        eager
        className="object-cover opacity-40"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(26,20,16,0.82)_0%,rgba(26,20,16,0.6)_45%,rgba(26,20,16,0.94)_100%)]" />

      <div className="container-x relative">
        <Reveal blur={false}>
          <nav
            aria-label="Breadcrumb"
            className="label flex items-center gap-2.5 text-limewash/50"
          >
            {crumbs.map((c, i) => (
              <span key={c.label} className="flex items-center gap-2.5">
                {i > 0 && (
                  <span aria-hidden="true" className="text-limewash/25">
                    /
                  </span>
                )}
                {c.href ? (
                  <Link
                    href={c.href}
                    className="transition-colors hover:text-limewash"
                  >
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-limewash/85">{c.label}</span>
                )}
              </span>
            ))}
          </nav>
        </Reveal>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <div>
            <Reveal blur={false} delay={0.06}>
              <span className="label text-ochre">{eyebrow}</span>
            </Reveal>
            <Reveal blur={false} delay={0.12}>
              <h1 className="display-lg mt-5 max-w-[16ch] text-limewash">
                {title}
              </h1>
            </Reveal>
          </div>

          <Reveal delay={0.24}>
            <p className="max-w-md text-[16px] leading-relaxed text-limewash/70 lg:pb-3">
              {copy}
            </p>
          </Reveal>
        </div>
      </div>

      {/* The painted edge the whole site is built around. The rule sits on the
          tar field's own bottom boundary and the drips hang past it into the
          limewash below, so the dark paint reads as hand-finished rather than
          machine-cut. Default `--waterline` is already tar, which is what the
          drips need to be to show against the light ground. */}
      <div className="waterline absolute inset-x-0 bottom-0" aria-hidden="true" />
    </section>
  );
}
