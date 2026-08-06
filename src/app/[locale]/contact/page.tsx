import Photo from "@/components/ui/Photo";
import type { Metadata } from "next";
import {
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
} from "lucide-react";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import Faq from "@/components/Faq";
import Reveal from "@/components/Reveal";
import { SectionIntro } from "@/components/Decor";
import {
  ADDRESS_LINE_1,
  ADDRESS_LINE_2,
  MAPS_HREF,
  PHONE,
  PHONE_HREF,
  whatsappHref,
} from "@/lib/contact";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Call, message or visit Manar Trading on Hijrah Road in Medina. Same-day seafood delivery across Saudi Arabia, and quotes on WhatsApp for restaurants and hotels.",
};

const channels = [
  {
    icon: Phone,
    label: "Call the counter",
    value: PHONE,
    href: PHONE_HREF,
    note: "Fastest answer during opening hours",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp orders",
    value: PHONE,
    href: whatsappHref(),
    note: "Send your list — we quote by the kilo",
  },
  {
    icon: Mail,
    label: "Email us",
    value: "hello@manartrading.sa",
    href: "mailto:hello@manartrading.sa",
    note: "Quotes and paperwork",
  },
  {
    icon: MapPin,
    label: "Visit the shop",
    value: ADDRESS_LINE_1,
    href: "#map",
    note: ADDRESS_LINE_2,
  },
];

const hours = [
  { d: "Saturday – Wednesday", h: "6:00 – 23:00" },
  { d: "Thursday", h: "6:00 – 00:00" },
  { d: "Friday", h: "14:00 – 23:00" },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        image="marketCounter"
        eyebrow="Get in touch"
        title="Tell us what you need and when you need it"
        copy="Orders, restaurant supply, bulk quotes or just a question about what is good this week — there is always a person at the other end."
        crumbs={[{ href: "/", label: "Home" }, { label: "Contact" }]}
      />

      {/* ---------- channels ---------- */}
      <section className="border-b border-ink/10 bg-white">
        <div className="container-x grid gap-px bg-ink/12 sm:grid-cols-2 lg:grid-cols-4">
          {channels.map((c) => (
            <a
              key={c.label}
              href={c.href}
              className="group bg-white px-6 py-8 transition-colors hover:bg-bone"
            >
              <c.icon className="h-4.5 w-4.5 text-ocean" />
              <p className="label mt-5 text-ink/40">{c.label}</p>
              <p className="mt-2 font-display text-[18px] text-ink">
                {c.value}
              </p>
              <p className="mt-1 text-[12.5px] text-ink/50">{c.note}</p>
            </a>
          ))}
        </div>
      </section>

      {/* ---------- form + info ---------- */}
      <section className="py-20 lg:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-[1.15fr_1fr]">
          <Reveal>
            <ContactForm />
          </Reveal>

          <div className="space-y-8">
            <Reveal delay={0.1}>
              <div>
                <h3 className="display-md flex items-center gap-3 text-[21px] text-ink">
                  <Clock className="h-5 w-5 text-ocean" />
                  Opening hours
                </h3>
                <ul className="mt-6 border-t border-ink/12">
                  {hours.map((h) => (
                    <li
                      key={h.d}
                      className="flex items-center justify-between border-b border-ink/12 py-4 text-[14.5px]"
                    >
                      <span className="text-ink/60">{h.d}</span>
                      <span className="numeral text-ink">{h.h}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-[13.5px] leading-relaxed text-ink/55">
                  The freshest selection is on the counter between 6 and 10 AM,
                  straight after the boats unload.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.18}>
              <div id="map" className="relative overflow-hidden">
                <div className="relative aspect-[4/3] bg-abyss">
                  <Photo
                    image="harbour"
                    res={1000}
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-abyss/45" />

                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full">
                    <span className="relative grid h-12 w-12 place-items-center rounded-full bg-bone text-abyss">
                      <MapPin className="h-5 w-5" />
                      <span className="absolute inset-0 animate-ping rounded-full bg-bone/40" />
                    </span>
                  </div>

                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
                    <div>
                      <p className="font-display text-[17px] text-bone">
                        {ADDRESS_LINE_1}
                      </p>
                      <p className="mt-1 text-[13.5px] text-bone/65">
                        {ADDRESS_LINE_2}
                      </p>
                    </div>
                    <a
                      href={MAPS_HREF}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-white/30 text-bone transition-colors hover:bg-bone hover:text-abyss"
                      aria-label="Open directions in Google Maps"
                    >
                      <Navigation className="h-4.5 w-4.5" />
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- faq ---------- */}
      <section className="border-t border-ink/10 bg-bone py-24">
        <div className="container-x">
          <SectionIntro
            eyebrow="Good to know"
            title="Questions we get every week"
            copy="If yours is not here, call the counter — we would rather answer it properly."
          />
          <div className="mt-14">
            <Faq />
          </div>
        </div>
      </section>
    </>
  );
}
