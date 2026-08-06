"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";

const faqs = [
  {
    q: "What are the delivery areas and cut-off times?",
    a: "Jeddah, Makkah and Taif: order by 2 PM for same-day evening delivery. Riyadh and the Eastern Province: order by 11 AM for same-day, otherwise next morning. Everywhere else in the Kingdom arrives the following morning on chilled transport.",
  },
  {
    q: "How do you charge when the fish weighs more or less than I ordered?",
    a: "You are invoiced on the actual weight at packing, never the estimate. If a whole fish comes in 200 g over, we call you before it leaves the counter and you decide.",
  },
  {
    q: "Can I choose how the fish is cleaned and cut?",
    a: "Yes, and it costs nothing. Whole, gutted, scaled, butterflied, cross-cut steaks, skin-on or skinless fillets — tell us in the order notes. Everything is prepared right before dispatch.",
  },
  {
    q: "Do you supply restaurants and hotels?",
    a: "About 60% of our volume goes to professional kitchens. Standing daily orders, tiered pricing from 20 kg, a fixed delivery window, and full HACCP-style batch documentation with boat name and landing time.",
  },
  {
    q: "What happens if I am not happy with the fish?",
    a: "Tell us on the day it arrives and we refund it or replace it on the next run. No photographs, no forms, no argument. It has happened rarely and we would rather fix it than debate it.",
  },
  {
    q: "Which payment methods do you accept?",
    a: "Mada, Visa, Mastercard and Apple Pay online, cash or card on delivery, and 30-day invoicing for approved business accounts.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="mx-auto max-w-3xl border-t border-ink/12">
      {faqs.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q} className="border-b border-ink/12">
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="group flex w-full items-center justify-between gap-6 py-6 text-left"
            >
              <span
                className={`display-md text-[19px] transition-colors ${
                  isOpen ? "text-ocean" : "text-ink group-hover:text-ink/70"
                }`}
              >
                {f.q}
              </span>
              <motion.span
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-colors ${
                  isOpen
                    ? "border-transparent bg-ink text-bone"
                    : "border-ink/15 text-ink"
                }`}
              >
                <Plus className="h-4 w-4" />
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-2xl pb-7 pr-12 text-[15px] leading-[1.8] text-ink/60">
                    {f.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
