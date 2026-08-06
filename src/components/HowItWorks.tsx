"use client";

import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { motion } from "motion/react";
import { ArrowUpRight, PackageOpen, Ship, Truck } from "lucide-react";
import Reveal, { StaggerGroup, StaggerItem } from "./Reveal";
import SplitText from "./ui/SplitText";
import Magnetic from "./ui/Magnetic";
import waterSurface from "../../public/back3.png";

/**
 * Three-step overview of the order journey, threaded on a single rule so it
 * reads as a sequence rather than three unrelated cards.
 *
 * Deliberately the short version: `ProcessSticky` further down the page tells
 * the same story at length, so everything here stays to one sentence.
 *
 * No top padding: the category index above is also white, so the two run
 * together as one field and its `pb` alone sets the gap. Adding padding here
 * too would stack into a double-height rhythm.
 */
const steps = [
  {
    n: "01",
    title: "We source",
    copy: "Our own buyers take the fish straight off the boats on the Red Sea and Gulf coasts, and we import the rest ourselves — never through a wholesaler, never a second day.",
    Icon: Ship,
  },
  {
    n: "02",
    title: "You choose",
    copy: "Pick your species and tell us how you cook it — whole, butterflied, steaked or filleted. Cut to order just before dispatch, at no extra charge.",
    Icon: PackageOpen,
  },
  {
    n: "03",
    title: "We deliver",
    copy: "Buried in flake ice minutes after landing and held at 0 – 2 °C to your door, with same-day delivery across the Kingdom.",
    Icon: Truck,
  },
];

export default function HowItWorks() {
  return (
    <section className="relative isolate bg-white pb-24 lg:pb-32">
      {/*
        Decorative backdrop. `isolate` on the section makes this negative-z
        child paint above the white base but below the content. The top is
        masked to transparent because the category index above is also white
        and butts straight against this edge — without the fade the image
        starts on a visible horizontal seam.
      */}
      <Image
        src={waterSurface}
        alt=""
        fill
        sizes="100vw"
        placeholder="blur"
        className="-z-10 object-cover object-bottom"
        style={{
          maskImage: "linear-gradient(to bottom, transparent, #000 30%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent, #000 30%)",
        }}
      />

      <div className="container-x">
        <SplitText
          as="h2"
          text="How it works"
          className="display-lg mx-auto block text-center text-ink"
        />

        <div className="relative mt-16 lg:mt-20">
          {/* The rule the three markers sit on. It has to stop dead on the
              outer icons' centres: that is half a column in from each edge,
              and a column is a third of the row *minus* the two 2rem gaps.
              `top-9` is half the 72px icon, so the rule bisects them. */}
          <motion.span
            aria-hidden="true"
            className="absolute left-[calc((100%_-_4rem)_/_6)] right-[calc((100%_-_4rem)_/_6)] top-9 hidden h-px origin-left bg-ink/12 md:block rtl:origin-right"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          />

          <StaggerGroup className="grid gap-14 md:grid-cols-3 md:gap-8">
            {steps.map(({ n, title, copy, Icon }) => (
              <StaggerItem key={n}>
                <div className="group flex flex-col items-center text-center">
                  <span className="relative grid h-18 w-18 place-items-center rounded-full border border-ink/12 bg-white text-ocean transition-colors duration-500 group-hover:border-transparent group-hover:bg-ink group-hover:text-bone">
                    <Icon className="h-7 w-7" strokeWidth={1.25} />
                  </span>

                  <span className="numeral mt-7 text-[12.5px] text-ocean">
                    {n}
                  </span>
                  <h3 className="display-md mt-3 text-ink">{title}</h3>
                  <p className="mt-4 max-w-[36ch] text-[15px] leading-relaxed text-ink/60">
                    {copy}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>

        <Reveal delay={0.15}>
          <div className="mt-16 flex justify-center lg:mt-20">
            <Magnetic>
              <Link
                href="/shop"
                className="group inline-flex items-center gap-3 rounded-full bg-ink py-4 pe-3 ps-7 text-[15px] font-semibold text-bone transition-colors hover:bg-abyss"
              >
                Shop now
                <span className="grid h-9 w-9 place-items-center rounded-full bg-bone text-ink transition-transform duration-500 group-hover:rotate-45">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </Link>
            </Magnetic>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
