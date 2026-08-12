import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";
import { SectionIntro } from "./Decor";

/**
 * How we buy — three steps, hung on the waterline.
 *
 * The copy is kept exactly as it was: plain, specific, no boilerplate, and it
 * makes no claim PRODUCT.md flags as unverified. Only the shell is rebuilt. It
 * has moved into `messages/*.json` because it was hardcoded English in the
 * component, which meant the Arabic site was silently showing English here.
 *
 * The three circular icon badges are gone. A step is a painted plate with its
 * number stencilled on it, and the rule the three sit on is the same waterline
 * the rest of the site is built around — drawn once, across the row, rather than
 * being faked with a hairline that had to be positioned against icon centres.
 */
export default async function HowItWorks() {
  const t = await getTranslations("HowItWorks");

  const steps = ["source", "choose", "deliver"] as const;

  return (
    <section className="relative bg-hull py-24 text-limewash md:py-32">
      <div className="container-x">
        <SectionIntro
          light
          index="02"
          eyebrow={t("eyebrow")}
          title={t("title")}
        />

        <div className="mt-14 grid gap-px bg-limewash/20 md:grid-cols-3 lg:mt-16">
          {steps.map((step, i) => (
            <Reveal key={step} blur={false} delay={i * 0.1} className="h-full">
              <div className="flex h-full flex-col bg-hull p-7 md:p-8">
                {/* The stencilled step number, on its own painted rule — the
                    draft-mark ladder the product pages use for grades. */}
                <div className="flex items-center gap-4">
                  <span className="numeral text-[40px] leading-none text-ochre">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span aria-hidden="true" className="h-px flex-1 bg-limewash/25" />
                </div>

                <h3 className="display-md mt-7 text-limewash">
                  {t(`${step}.title`)}
                </h3>

                <p className="mt-4 text-[15px] leading-[1.8] text-limewash/75 rtl:leading-[2]">
                  {t(`${step}.copy`)}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal blur={false} delay={0.24}>
          <div className="mt-12">
            <Link
              href="/shop"
              className="group inline-flex items-center gap-4 bg-oxide py-4 pe-4 ps-7 text-[15px] font-semibold text-limewash transition-colors hover:bg-oxide-lit focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ochre"
            >
              {t("cta")}
              <ArrowUpRight
                aria-hidden="true"
                className="h-4 w-4 shrink-0 transition-transform duration-500 group-hover:rotate-45 rtl-flip"
              />
            </Link>
          </div>
        </Reveal>
      </div>

      {/* Cobalt sits above the limewash ground here, so the paint that runs is
          cobalt — the same edge as the hero, one field further down the page. */}
      <div
        aria-hidden="true"
        className="waterline absolute inset-x-0 bottom-0"
        style={{ ["--waterline" as string]: "var(--color-hull)" }}
      />
    </section>
  );
}
