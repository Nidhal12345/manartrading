import Photo from "./ui/Photo";
import { Link } from "@/i18n/navigation";
import Reveal from "./Reveal";

import SplitText from "./ui/SplitText";
import { type ImageKey } from "@/lib/images";

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
    <section className="relative overflow-hidden bg-abyss pb-20 pt-[150px] text-bone md:pb-28 md:pt-[190px]">
      <Photo
        image={image}
        res={1800}
        sizes="100vw"
        eager
        className="object-cover"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,20,31,0.86)_0%,rgba(4,20,31,0.62)_50%,rgba(4,20,31,0.9)_100%)]" />
      <div className="caustics" />
      <div className="noise" />

      <div className="container-x relative">
        <Reveal blur={false}>
          <nav
            aria-label="Breadcrumb"
            className="label flex items-center gap-2.5 text-bone/45"
          >
            {crumbs.map((c, i) => (
              <span key={c.label} className="flex items-center gap-2.5">
                {i > 0 && <span className="text-bone/25">/</span>}
                {c.href ? (
                  <Link
                    href={c.href}
                    className="transition-colors hover:text-aqua"
                  >
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-bone/80">{c.label}</span>
                )}
              </span>
            ))}
          </nav>
        </Reveal>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <div>
            <Reveal blur={false} delay={0.06}>
              <span className="label text-aqua">{eyebrow}</span>
            </Reveal>
            <SplitText
              as="h1"
              text={title}
              animateOnMount
              className="display-lg mt-5 block max-w-[15ch] text-bone"
            />
          </div>

          <Reveal delay={0.24}>
            <p className="max-w-md text-[16px] leading-relaxed text-bone/65 lg:pb-3">
              {copy}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
