import Photo from "@/components/ui/Photo";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";

import { ArrowUpRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal, { StaggerGroup, StaggerItem } from "@/components/Reveal";
import SplitText from "@/components/ui/SplitText";
import CountUp from "@/components/ui/CountUp";
import Magnetic from "@/components/ui/Magnetic";
import { SectionIntro } from "@/components/Decor";
import { type ImageKey } from "@/lib/images";

export const metadata: Metadata = {
  title: "About us",
  description:
    "Manar Trading has been buying fish on the Jeddah docks since 2009. Meet the family business supplying Red Sea and Arabian Gulf seafood across Saudi Arabia.",
};

const timeline = [
  {
    year: "2009",
    title: "One stall in Jeddah",
    copy: "Abdulrahman Al-Manar starts buying from three boats at the Jeddah central market and selling from a single counter.",
  },
  {
    year: "2013",
    title: "The first kitchens",
    copy: "Two Jeddah restaurants ask for a standing morning order. Word travels down the corniche faster than any advertising could.",
  },
  {
    year: "2017",
    title: "Cold room and fleet",
    copy: "A chilled facility opens in Al Bawadi with three refrigerated vans, letting us hold the cold chain end to end.",
  },
  {
    year: "2021",
    title: "Onto the Gulf coast",
    copy: "A second buying desk opens in Dammam, adding Zubaidi, Safi and Gulf tiger prawns to the daily list.",
  },
  {
    year: "2026",
    title: "The whole Kingdom",
    copy: "Sixty partner boats, 2.4 tonnes a day, and same-day delivery to homes and kitchens in every major Saudi city.",
  },
];

const values = [
  {
    title: "Honesty about age",
    copy: "If a fish came in yesterday we say so and price it accordingly. We have never sold a day-two fish as day-one, and we never will.",
  },
  {
    title: "Fishing that lasts",
    copy: "We buy hand-line and pole-caught wherever we can, respect closed seasons to the day, and refuse undersized fish outright.",
  },
  {
    title: "The same crews",
    copy: "Most of our boats have sold to us for over a decade. We pay on the quay, in full, the morning we take the fish.",
  },
  {
    title: "Restaurant standards",
    copy: "Every batch is logged with boat, landing time and temperature — the same paperwork a five-star kitchen audits us on.",
  },
];

const team: { name: string; role: string; note: string; image: ImageKey }[] = [
  {
    name: "Abdulrahman Al-Manar",
    role: "Founder & head buyer",
    note: "On the quay at 4 AM, six days a week, since 2009.",
    image: "boatsDusk",
  },
  {
    name: "Layla Al-Manar",
    role: "Operations director",
    note: "Runs the cold room, the fleet and the delivery windows.",
    image: "marketCounter",
  },
  {
    name: "Yousef Baghdadi",
    role: "Head of quality",
    note: "Grades every batch before it is allowed onto a van.",
    image: "fishmonger",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        image="harbour"
        eyebrow="Our story"
        title="A family that has been buying fish at dawn since 2009"
        copy="Manar grew from a single counter in the Jeddah central market into one of the Kingdom's most trusted seafood suppliers — without ever changing how we buy."
        crumbs={[{ href: "/", label: "Home" }, { label: "About" }]}
      />

      {/* ---------- story ---------- */}
      <section className="bg-white py-24 lg:py-32">
        <div className="container-x grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionIntro
              index="01"
              eyebrow="How it started"
              title="Everything we know we learned on the quay"
            />
            <div className="mt-9 space-y-6 text-[16px] leading-[1.9] text-ink/70">
              <p>
                Manar means lighthouse. When our father chose the name in 2009
                he was thinking about the boats coming back into Jeddah before
                sunrise, and about being the fixed point they could always steer
                towards. Seventeen years later the boats are still coming in,
                and we are still standing there waiting for them.
              </p>
              <p>
                The business has grown — two buying desks, sixty partner boats,
                a chilled fleet — but the actual work has not changed. Someone
                from this family looks every fish in the eye before it is
                bought. If the gills are not the right red, we walk past it.
                That single habit is the whole company.
              </p>
              <p>
                We sell to grandmothers buying two kilos of Safi and to hotel
                groups ordering three hundred. Both get the same fish, off the
                same ice, graded by the same person.
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
                The counter at Al Bawadi, an hour after the boats unload.
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
          <p className="label mt-8 text-bone/50">
            Abdulrahman Al-Manar · Founder
          </p>
        </div>
      </section>

      {/* ---------- timeline ---------- */}
      <section className="bg-white py-24 lg:py-32">
        <div className="container-x">
          <SectionIntro
            index="02"
            eyebrow="Milestones"
            title="Seventeen years, one habit"
            copy="A short history of a business that has grown slowly and deliberately, boat by boat."
          />

          <StaggerGroup className="mt-16 border-t border-ink/12">
            {timeline.map((t) => (
              <StaggerItem key={t.year}>
                <div className="grid gap-4 border-b border-ink/12 py-9 md:grid-cols-[120px_1fr_1.2fr] md:gap-10">
                  <span className="numeral text-[15px] text-ocean">
                    {t.year}
                  </span>
                  <h3 className="display-md text-[22px] text-ink">{t.title}</h3>
                  <p className="text-[15px] leading-relaxed text-ink/60">
                    {t.copy}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>

          <div className="mt-14 grid gap-px border-y border-ink/12 bg-ink/12 sm:grid-cols-3">
            {[
              { to: 17, suffix: "", k: "Years trading" },
              { to: 60, suffix: "+", k: "Partner boats" },
              { to: 2.4, suffix: " t", k: "Landed daily", dp: 1 },
            ].map((s) => (
              <div key={s.k} className="bg-white px-6 py-9">
                <p className="numeral text-[38px] leading-none text-ink">
                  <CountUp to={s.to} decimals={s.dp ?? 0} />
                  <span className="text-ocean">{s.suffix}</span>
                </p>
                <p className="label mt-3 text-ink/45">{s.k}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- values ---------- */}
      <section className="bg-bone py-24 lg:py-32">
        <div className="container-x">
          <SectionIntro
            index="03"
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

      {/* ---------- team ---------- */}
      <section className="bg-white py-24 lg:py-32">
        <div className="container-x">
          <SectionIntro
            index="04"
            eyebrow="The people"
            title="Who you are actually buying from"
            copy="A small team, most of it one family, and all of it reachable by phone."
          />

          <StaggerGroup className="mt-16 grid gap-6 md:grid-cols-3">
            {team.map((m) => (
              <StaggerItem key={m.name}>
                <article className="group">
                  <div className="relative aspect-[4/5] overflow-hidden bg-abyss">
                    <Photo
                      image={m.image}
                      res={800}
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover grayscale transition-all duration-[1.1s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-abyss/15" />
                  </div>
                  <div className="border-t border-ink/12 pt-5">
                    <h3 className="display-md text-[20px] text-ink">
                      {m.name}
                    </h3>
                    <p className="label mt-2 text-ocean">{m.role}</p>
                    <p className="mt-3 text-[14px] leading-relaxed text-ink/55">
                      {m.note}
                    </p>
                  </div>
                </article>
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
              The counter is open from six every morning
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
