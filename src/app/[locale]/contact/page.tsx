import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { Clock, Mail, MapPin, MessageCircle, Navigation, Phone } from "lucide-react";

import Photo from "@/components/ui/Photo";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import Faq from "@/components/Faq";
import Reveal from "@/components/Reveal";
import { SectionIntro, TradeName } from "@/components/Decor";
import {
  ADDRESS_LINE_1,
  ADDRESS_LINE_2,
  MAPS_HREF,
  PHONE,
  PHONE_HREF,
  whatsappHref,
} from "@/lib/contact";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Contact" });

  return { title: t("hero.eyebrow"), description: t("hero.copy") };
}

const EMAIL = "hello@manartrading.sa";

/**
 * Contact, split by audience to match the home page fork.
 *
 * The two doors here are the same two doors as section 02 of the home page, in
 * the same two colours, and each one opens WhatsApp with its own opening line
 * already written. That is the real mechanism — it works today, with no backend
 * — and it is why it sits above the form rather than below it.
 *
 * Two honesty notes are printed rather than designed around. The email address,
 * the opening hours and the CR number are recorded as placeholders in
 * PRODUCT.md, so a line under the channel row says which of them is confirmed
 * and which is not; a visitor who drives to a shop on unverified hours has been
 * misled by the design. And the map photograph is a stock harbour, so it is
 * captioned as one instead of carrying a pin that implies a surveyed location.
 */
export default async function ContactPage() {
  const t = await getTranslations("Contact");
  const nav = await getTranslations("Nav");
  const isRtl = (await getLocale()) === "ar";

  const channels = [
    {
      key: "call",
      icon: Phone,
      value: PHONE,
      href: PHONE_HREF,
      ltr: true,
    },
    {
      key: "whatsapp",
      icon: MessageCircle,
      value: PHONE,
      href: whatsappHref(),
      ltr: true,
    },
    { key: "email", icon: Mail, value: EMAIL, href: `mailto:${EMAIL}`, ltr: true },
    { key: "visit", icon: MapPin, value: ADDRESS_LINE_1, href: "#map", ltr: false },
  ] as const;

  const paths = [
    {
      key: "table",
      index: "01",
      field: "bg-hull",
      hover: "group-hover:bg-hull-lit",
      waterline: "var(--color-hull)",
    },
    {
      key: "kitchen",
      index: "02",
      field: "bg-verdigris-deep",
      hover: "group-hover:bg-verdigris",
      waterline: "var(--color-verdigris-deep)",
    },
  ] as const;

  const hours = [
    { d: "satWed", h: "satWedTime" },
    { d: "thu", h: "thuTime" },
    { d: "fri", h: "friTime" },
  ] as const;

  return (
    <>
      <PageHero
        image="marketCounter"
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        copy={t("hero.copy")}
        crumbs={[{ href: "/", label: nav("home") }, { label: nav("contact") }]}
      />

      {/* ---------- channels ---------- */}
      <section className="bg-chalk">
        <div className="container-x">
          <div className="grid gap-px bg-tar/15 sm:grid-cols-2 lg:grid-cols-4">
            {channels.map((c) => (
              <a
                key={c.key}
                href={c.href}
                className="group bg-chalk px-6 py-8 transition-colors hover:bg-limewash focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-oxide"
              >
                <c.icon aria-hidden="true" className="h-4.5 w-4.5 text-oxide" />
                <p className="label mt-5 text-rope">
                  {t(`channels.${c.key}.label`)}
                </p>
                <p className="mt-2.5 font-display text-[19px] leading-tight text-tar transition-colors group-hover:text-oxide">
                  <span dir={c.ltr ? "ltr" : undefined}>{c.value}</span>
                </p>
                <p className="mt-1.5 text-[12.5px] leading-relaxed text-tar/55">
                  {t(`channels.${c.key}.note`)}
                </p>
              </a>
            ))}
          </div>

          {/* Which of the four are real, stated on the page rather than left for
              the customer to find out at the door. */}
          <p className="border-s-4 border-ochre py-6 ps-5 text-[13px] leading-relaxed text-tar/65">
            {t("unconfirmed")}
          </p>
        </div>
      </section>

      {/* ---------- the two paths ---------- */}
      <section className="border-t-2 border-tar bg-limewash py-20 lg:py-28">
        <div className="container-x">
          <SectionIntro
            index="01"
            eyebrow={t("paths.eyebrow")}
            title={t("paths.title")}
            copy={t("paths.copy")}
          />

          <div className="mt-14 grid gap-7 lg:grid-cols-2 lg:gap-8">
            {paths.map((p, i) => (
              <Reveal key={p.key} blur={false} delay={i * 0.1}>
                <article className="group relative flex h-full flex-col">
                  <div
                    className={`flex flex-1 flex-col p-8 text-limewash transition-colors duration-500 md:p-10 ${p.field} ${p.hover}`}
                  >
                    <div className="flex items-baseline justify-between gap-5">
                      <span className="draft-mark text-[12.5px]">{p.index}</span>
                      <TradeName
                        latin={t(`paths.${p.key}.latin`)}
                        arabic={t(`paths.${p.key}.arabic`)}
                        isRtl={isRtl}
                        className="text-[14px] leading-none text-limewash/55"
                      />
                    </div>

                    <h3 className="display-md mt-9 max-w-[16ch] text-limewash">
                      {t(`paths.${p.key}.title`)}
                    </h3>

                    <p className="mt-5 max-w-sm text-[15.5px] leading-[1.8] text-limewash/75 rtl:leading-[2]">
                      {t(`paths.${p.key}.copy`)}
                    </p>

                    <div className="mt-auto pt-11">
                      <a
                        href={whatsappHref(t(`paths.${p.key}.message`))}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-flex items-center gap-3 border-b-2 border-limewash/35 pb-2 text-[15px] font-semibold text-limewash transition-colors hover:border-ochre hover:text-ochre focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ochre"
                      >
                        <MessageCircle
                          aria-hidden="true"
                          className="h-4 w-4 shrink-0"
                        />
                        {t(`paths.${p.key}.cta`)}
                      </a>
                    </div>
                  </div>

                  <div
                    aria-hidden="true"
                    className="waterline absolute inset-x-0 bottom-0"
                    style={{ ["--waterline" as string]: p.waterline }}
                  />
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- form + hours + map ---------- */}
      <section className="bg-limewash pb-20 lg:pb-28">
        <div className="container-x grid gap-12 lg:grid-cols-[1.15fr_1fr]">
          <Reveal>
            <ContactForm />
          </Reveal>

          <div className="space-y-10">
            <Reveal delay={0.1}>
              <div>
                <h3 className="display-md flex items-center gap-3 text-[22px] text-tar">
                  <Clock aria-hidden="true" className="h-5 w-5 shrink-0 text-oxide" />
                  {t("hours.title")}
                </h3>
                <dl className="mt-7 border-t-2 border-tar">
                  {hours.map((h) => (
                    <div
                      key={h.d}
                      className="flex items-center justify-between border-b border-tar/15 py-4 text-[14.5px]"
                    >
                      <dt className="text-tar/65">{t(`hours.${h.d}`)}</dt>
                      <dd className="numeral text-[16px] text-tar" dir="ltr">
                        {t(`hours.${h.h}`)}
                      </dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-5 text-[13.5px] leading-relaxed text-rope">
                  {t("hours.note")}
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.18}>
              <figure id="map" className="scroll-mt-24">
                <h3 className="display-md flex items-center gap-3 text-[22px] text-tar">
                  <MapPin aria-hidden="true" className="h-5 w-5 shrink-0 text-oxide" />
                  {t("visit.title")}
                </h3>

                <div className="relative mt-7 aspect-[4/3] overflow-hidden bg-tar">
                  <Photo
                    image="harbour"
                    res={1000}
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className="object-cover opacity-80"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-[linear-gradient(180deg,rgba(26,20,16,0.15),rgba(26,20,16,0.72))]"
                  />

                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
                    <div>
                      <p className="font-display text-[18px] text-limewash">
                        {ADDRESS_LINE_1}
                      </p>
                      <p className="mt-1 text-[13.5px] text-limewash/65">
                        {ADDRESS_LINE_2}
                      </p>
                    </div>
                    <a
                      href={MAPS_HREF}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="grid h-12 w-12 shrink-0 place-items-center bg-oxide text-limewash transition-colors hover:bg-oxide-lit focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ochre"
                      aria-label={t("visit.directions")}
                    >
                      <Navigation aria-hidden="true" className="h-4.5 w-4.5 rtl-flip" />
                    </a>
                  </div>

                  <div
                    aria-hidden="true"
                    className="waterline absolute inset-x-0 bottom-0"
                  />
                </div>

                <figcaption className="label mt-5 text-rope">
                  {t("visit.caption")}
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- faq ---------- */}
      <section className="border-t-2 border-tar bg-chalk py-24">
        <div className="container-x">
          <SectionIntro
            index="02"
            eyebrow={t("faq.eyebrow")}
            title={t("faq.title")}
            copy={t("faq.copy")}
          />
          <div className="mt-14">
            <Faq />
          </div>
        </div>
      </section>
    </>
  );
}
