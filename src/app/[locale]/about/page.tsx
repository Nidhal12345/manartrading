import Photo from "@/components/ui/Photo";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";

import { ArrowUpRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal, { StaggerGroup, StaggerItem } from "@/components/Reveal";
import SplitText from "@/components/ui/SplitText";
import Magnetic from "@/components/ui/Magnetic";
import { SectionIntro } from "@/components/Decor";

export const metadata: Metadata = {
  title: "About us",
  description:
    "Manar Trading is a Saudi seafood import and supply company on Hijrah Road in Medina, selling Red Sea, Arabian Gulf and imported fish to restaurants, hotels and households across the Kingdom.",
};

const values = [
  {
    title: "Honesty about age",
    copy: "If a fish came in yesterday we say so. We have never sold a day-two fish as day-one, and we never will.",
  },
  {
    title: "Fishing that lasts",
    copy: "We buy hand-line and pole-caught wherever we can, respect closed seasons to the day, and refuse undersized fish outright.",
  },
  {
    title: "The same suppliers",
    copy: "Most of the boats and shippers we buy from have supplied us for years, and we pay in full when we take the fish.",
  },
  {
    title: "Restaurant standards",
    copy: "Every batch is logged with source, landing time and temperature — the same paperwork a five-star kitchen audits us on.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        image="harbour"
        eyebrow="Who we are"
        title="A seafood company that imports, grades and supplies"
        copy="Manar Trading buys and imports fish for the whole Kingdom — for restaurants, hotels and caterers who need the same standard on every delivery, and for families buying dinner for tonight."
        crumbs={[{ href: "/", label: "Home" }, { label: "About" }]}
      />

      {/* ---------- story ---------- */}
      <section className="bg-white py-24 lg:py-32">
        <div className="container-x grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionIntro
              index="01"
              eyebrow="What we do"
              title="One chain, from the boat to your counter"
            />
            <div className="mt-9 space-y-6 text-[16px] leading-[1.9] text-ink/70">
              <p>
                Manar means lighthouse — the fixed point a boat steers towards.
                That is the whole idea behind the company: one supplier a
                kitchen can rely on, holding the same standard on every box
                that leaves us.
              </p>
              <p>
                We buy off the Red Sea and Arabian Gulf coasts and import the
                rest ourselves, so the list stays full even when a season
                closes. Nothing is accepted before it is graded, everything
                stays in the cold chain, and it is cut the way you asked for
                just before dispatch.
              </p>
              <p>
                We sell to kitchens ordering three hundred kilos and to families
                buying two. Both get the same fish, off the same ice, graded by
                the same standard.
              </p>
            </div>
          </div>

          <Reveal direction="left">
            <div className="relative aspect-[4/5] overflow-hidden bg-abyss">
              <Photo
                image="marketCounter"
                res={1000}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(4,20,31,0.8))]" />
              <p className="absolute inset-x-0 bottom-0 p-7 text-[14px] leading-relaxed text-bone/80">
                The counter on Hijrah Road, Medina.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- pull quote ---------- */}
      <section className="relative h-[60svh] min-h-[380px] overflow-hidden bg-abyss">
        <Photo
          image="boatDawn"
          res={1800}
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-abyss/70" />
        <div className="container-x relative flex h-full flex-col justify-center">
          <SplitText
            as="p"
            text="You cannot make a fish fresher than the moment you buy it."
            className="display-lg block max-w-[18ch] text-bone"
          />
          <p className="label mt-8 text-bone/50">Manar Trading · Medina</p>
        </div>
      </section>

      {/* ---------- values ---------- */}
      <section className="bg-bone py-24 lg:py-32">
        <div className="container-x">
          <SectionIntro
            index="02"
            eyebrow="What we stand on"
            title="Four rules we do not bend"
          />
          <StaggerGroup className="mt-16 grid gap-px border-t border-ink/12 bg-ink/12 md:grid-cols-2">
            {values.map((v) => (
              <StaggerItem key={v.title} className="bg-bone">
                <div className="h-full px-7 py-10">
                  <h3 className="display-md text-[21px] text-ink">{v.title}</h3>
                  <p className="mt-4 max-w-md text-[15px] leading-relaxed text-ink/60">
                    {v.copy}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="relative overflow-hidden bg-abyss">
        <Photo
          image="fishRows"
          res={1600}
          sizes="100vw"
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,20,31,0.8),rgba(4,20,31,0.93))]" />
        <div className="container-x relative flex flex-col items-start gap-10 py-24 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <span className="label text-aqua">Come and see</span>
            <h2 className="display-lg mt-5 max-w-[16ch] text-bone">
              The counter is open every day of the week
            </h2>
            <p className="mt-5 max-w-lg text-[15.5px] text-bone/60">
              Bring your questions — we like the ones about where the fish came
              from.
            </p>
          </div>
          <Magnetic>
            <Link
              href="/contact"
              className="group inline-flex shrink-0 items-center gap-3 rounded-full bg-bone py-4 pl-7 pr-3 text-[15px] font-semibold text-abyss transition-colors hover:bg-white"
            >
              Get in touch
              <span className="grid h-9 w-9 place-items-center rounded-full bg-abyss text-bone transition-transform duration-500 group-hover:rotate-45">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </Link>
          </Magnetic>
        </div>
      </section>
    </>
  );
}
