"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";

/**
 * The questions a buyer actually arrives with, answered.
 *
 * This section replaces the three fabricated testimonials that stood on the home
 * page. That is a deliberate trade: answered questions are proof a business at
 * this stage can honestly give, where attributed quotes it has not collected are
 * not. Competitor sites all run a trust section here; this is the version that
 * does not require inventing anybody.
 *
 * Four of the six answers were rewritten because the originals asserted figures
 * PRODUCT.md records as unverified — named cut-off times per city, "about 60% of
 * our volume", a 20 kg trade tier, HACCP-style batch documentation, and a list of
 * accepted card schemes. Where the real answer is not settled yet the copy says
 * to ask, which is worth more than a number that turns out to be wrong on the
 * first order.
 *
 * The accordion is a real disclosure widget: each button owns its panel through
 * `aria-controls`, and the panel is labelled back by its button. Panels unmount on
 * close, so a screen reader never reaches a hidden answer.
 */
const KEYS = [
  "delivery",
  "weight",
  "cuts",
  "trade",
  "problem",
  "payment",
] as const;

export default function Faq() {
  const t = useTranslations("Faq");
  const [open, setOpen] = useState<number | null>(0);
  const uid = useId();

  return (
    <div className="border-t-2 border-tar">
      {KEYS.map((key, i) => {
        const isOpen = open === i;
        const buttonId = `${uid}-q${i}`;
        const panelId = `${uid}-a${i}`;

        return (
          <div key={key} className="border-b border-tar/15">
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex w-full items-start justify-between gap-6 py-6 text-start"
              >
                <span
                  className={`display-md text-[19px] transition-colors ${
                    isOpen ? "text-oxide" : "text-tar group-hover:text-oxide"
                  }`}
                >
                  {t(`${key}.q`)}
                </span>

                {/* A painted square that becomes a cross, not a rotating pill. */}
                <motion.span
                  aria-hidden="true"
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className={`mt-0.5 grid h-9 w-9 shrink-0 place-items-center border-2 transition-colors ${
                    isOpen
                      ? "border-oxide bg-oxide text-limewash"
                      : "border-tar/20 text-tar group-hover:border-tar"
                  }`}
                >
                  <Plus className="h-4 w-4" />
                </motion.span>
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-2xl pb-7 pe-12 text-[15px] leading-[1.8] text-tar/70 rtl:leading-[2]">
                    {t(`${key}.a`)}
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
