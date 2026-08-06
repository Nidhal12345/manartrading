import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ShopClient from "@/components/ShopClient";
import Reveal from "@/components/Reveal";
import { SectionIntro } from "@/components/Decor";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "Shop the catch",
  description:
    "Browse ten species of fresh Red Sea and Arabian Gulf fish — Hamour, Kanad, Najil, Zubaidi, Robyan and more. Priced by the kilo, cut to order, delivered same day.",
};

const perks = [
  { t: "Ordered by 2 PM", s: "Delivered the same evening" },
  { t: "0 – 2 °C", s: "Cold chain, door to door" },
  { t: "Free over 300 SAR", s: "Across Jeddah & Riyadh" },
  { t: "Pay on delivery", s: "Mada, Apple Pay or cash" },
];

const faqs = [
  {
    q: "How is the fish prepared?",
    a: "Tell us in the order notes — whole, gutted, scaled, butterflied, steaked or filleted. Preparation is free and done right before dispatch, never in advance.",
  },
  {
    q: "What if the size I want is gone?",
    a: "We call you before dispatch with the nearest grade available and adjust the invoice by weight. You are never charged for a size we could not supply.",
  },
  {
    q: "Do you supply restaurants?",
    a: "Around 60% of our volume goes to kitchens. Standing orders, tiered pricing from 20 kg and a fixed delivery slot every morning.",
  },
];

export default function ShopPage() {
  return (
    <>
      <PageHero
        image="fishRows"
        eyebrow="The counter"
        title="Everything we landed this morning"
        copy="Ten species, priced by the kilo and prepared however your kitchen needs them. Availability moves with the boats — this list is rebuilt every day at 06:30."
        crumbs={[{ href: "/", label: "Home" }, { label: "Shop" }]}
      />

      <section className="border-b border-ink/10 bg-white">
        <div className="container-x grid gap-px bg-ink/12 sm:grid-cols-2 lg:grid-cols-4">
          {perks.map((p) => (
            <div key={p.t} className="bg-white px-6 py-7">
              <p className="font-display text-[16px] text-ink">{p.t}</p>
              <p className="mt-1 text-[13px] text-ink/50">{p.s}</p>
            </div>
          ))}
        </div>
      </section>

      <ShopClient products={products} />

      <section className="border-t border-ink/10 bg-bone py-24">
        <div className="container-x">
          <SectionIntro eyebrow="Good to know" title="Before you order" />
          <div className="mt-14 grid gap-px border-t border-ink/12 bg-ink/12 lg:grid-cols-3">
            {faqs.map((f, i) => (
              <Reveal key={f.q} delay={i * 0.08}>
                <div className="h-full bg-bone px-7 py-9">
                  <h3 className="display-md text-[19px] text-ink">{f.q}</h3>
                  <p className="mt-4 text-[14.5px] leading-relaxed text-ink/60">
                    {f.a}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
