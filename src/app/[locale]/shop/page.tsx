import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ShopClient from "@/components/ShopClient";
import Reveal from "@/components/Reveal";
import { SectionIntro } from "@/components/Decor";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "Shop the catch",
  description:
    "Browse sixty-three lines across ten categories — lobster, shellfish, shrimp, cephalopods, whole fish, fillets, steaks and smoked. King Fish, Hamour, Salmon, Sea Bass and more. Cut to order, delivered same day.",
};

const faqs = [
  {
    q: "How is the fish prepared?",
    a: "Tell us in the order notes — whole, gutted, scaled, butterflied, steaked or filleted. Preparation is free and done right before dispatch, never in advance.",
  },
  {
    q: "What if the size I want is gone?",
    a: "We call you before dispatch with the nearest grade available and adjust the order by weight. You are never sent a size we could not supply.",
  },
  {
    q: "Do you supply restaurants?",
    a: "Around 60% of our volume goes to kitchens. Standing orders, quotes on WhatsApp from 20 kg and a fixed delivery slot.",
  },
];

export default function ShopPage() {
  return (
    <>
      <PageHero
        image="fishRows"
        eyebrow="The counter"
        title="Everything on the ice today"
        copy="Ten categories, prepared however your kitchen needs them. Availability moves with the boats, so the list is rebuilt as the fish lands."
        crumbs={[{ href: "/", label: "Home" }, { label: "Shop" }]}
      />

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
