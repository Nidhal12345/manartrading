import Photo from "./ui/Photo";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight, Clock, Mail, MapPin, Phone, Send } from "lucide-react";
import Logo from "./Logo";
import { PHONE, PHONE_HREF } from "@/lib/contact";
import { products } from "@/data/products";
import { getTranslations } from "next-intl/server";

const year = new Date().getFullYear();

/* lucide dropped brand marks, so these live here */
const socials = [
  {
    label: "Instagram",
    path: "M12 2.2c3.2 0 3.6 0 4.9.07 1.2.05 1.8.25 2.2.42.6.2 1 .47 1.4.9.44.43.7.83.9 1.4.17.42.37 1.03.42 2.2.06 1.3.07 1.7.07 4.9s0 3.6-.07 4.9c-.05 1.2-.25 1.8-.42 2.2-.2.6-.47 1-.9 1.4-.43.44-.83.7-1.4.9-.42.17-1.03.37-2.2.42-1.3.06-1.7.07-4.9.07s-3.6 0-4.9-.07c-1.2-.05-1.8-.25-2.2-.42-.6-.2-1-.47-1.4-.9-.44-.43-.7-.83-.9-1.4-.17-.42-.37-1.03-.42-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.9c.05-1.2.25-1.8.42-2.2.2-.6.47-1 .9-1.4.43-.44.83-.7 1.4-.9.42-.17 1.03-.37 2.2-.42C8.4 2.2 8.8 2.2 12 2.2Zm0 3.15A6.65 6.65 0 1 0 18.65 12 6.65 6.65 0 0 0 12 5.35Zm0 10.97A4.32 4.32 0 1 1 16.32 12 4.32 4.32 0 0 1 12 16.32Zm6.9-11.23a1.55 1.55 0 1 1-1.55-1.55 1.55 1.55 0 0 1 1.55 1.55Z",
  },
  {
    label: "X",
    path: "M17.3 3h3.3l-7.2 8.24L21.8 21h-6.6l-4.4-5.7L5.7 21H2.4l7.7-8.8L2.6 3h6.8l4 5.3L17.3 3Zm-1.15 16.1h1.83L7.94 4.8H6l10.15 14.3Z",
  },
  {
    label: "Facebook",
    path: "M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.5-3.9 3.77-3.9 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.45 2.89h-2.33v6.99A10 10 0 0 0 22 12Z",
  },
];

export default async function Footer() {
  const t = await getTranslations("Footer");

  return (
    <footer className="relative overflow-hidden bg-abyss text-bone">
      <Photo
        image="darkWater"
        res={1600}
        sizes="100vw"
        className="object-cover opacity-20"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,20,31,0.9),rgba(4,20,31,0.98))]" />
      <div className="noise" />

      {/* newsletter */}
      <div className="relative border-b border-white/10">
        <div className="container-x grid gap-10 py-16 md:grid-cols-2 md:items-end">
          <div>
            <span className="label text-aqua">{t("newsletterLabel")}</span>
            <h3 className="display-md mt-5 max-w-[16ch] text-bone">
              {t("newsletterTitle")}
            </h3>
          </div>
          <form className="flex w-full gap-3 md:justify-end">
            <div className="relative flex-1 md:max-w-sm">
              <Mail className="pointer-events-none absolute start-0 top-1/2 h-4 w-4 -translate-y-1/2 text-bone/35" />
              <input
                type="email"
                required
                placeholder={t("emailPlaceholder")}
                aria-label={t("emailAria")}
                className="w-full border-b border-white/20 bg-transparent py-4 ps-7 pe-4 text-[15px] text-bone outline-none transition placeholder:text-bone/30 focus:border-aqua"
              />
            </div>
            <button
              type="submit"
              className="group grid h-[52px] w-[52px] shrink-0 place-items-center rounded-full bg-bone text-abyss transition-transform hover:scale-105"
              aria-label={t("subscribeAria")}
            >
              <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5" />
            </button>
          </form>
        </div>
      </div>

      {/* columns */}
      <div className="container-x relative grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.3fr]">
        <div>
          <Logo variant="light" />
          <p className="mt-6 max-w-xs text-[14.5px] leading-relaxed text-bone/55">
            {t("companyTagline")}
          </p>
          <div className="mt-7 flex gap-2.5">
            {socials.map((s) => (
              <a
                key={s.label}
                href="#"
                aria-label={t("socialAria", { network: s.label })}
                className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-bone/70 transition-all hover:-translate-y-0.5 hover:border-aqua/60 hover:text-white"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-4 w-4"
                >
                  <path d={s.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="label text-bone/45">{t("companyColumn")}</h4>
          <ul className="mt-6 space-y-3.5 text-[14.5px] text-bone/70">
            {(
              [
                { href: "/", key: "home" },
                { href: "/shop", key: "shop" },
                { href: "/about", key: "about" },
                { href: "/contact", key: "contact" },
              ] as const
            ).map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="transition-colors hover:text-aqua"
                >
                  {t(`links.${l.key}`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="label text-bone/45">{t("popularColumn")}</h4>
          <ul className="mt-6 space-y-3.5 text-[14.5px] text-bone/70">
            {products.slice(0, 5).map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/shop/${p.slug}`}
                  className="transition-colors hover:text-aqua"
                >
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="label text-bone/45">{t("visitColumn")}</h4>
          <ul className="mt-6 space-y-4 text-[14.5px] text-bone/70">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-aqua" />
              <span>
                {t("addressLine1")}
                <br />
                {t("addressLine2")}
              </span>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-aqua" />
              <a href={PHONE_HREF} className="hover:text-aqua">
                <span dir="ltr">{PHONE}</span>
              </a>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-aqua" />
              <a
                href="mailto:hello@manartrading.sa"
                className="hover:text-aqua"
              >
                hello@manartrading.sa
              </a>
            </li>
            <li className="flex gap-3">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-aqua" />
              <span>{t("hours")}</span>
            </li>
          </ul>
        </div>
      </div>

      {/* oversized wordmark */}
      <div className="container-x relative">
        <Link
          href="/contact"
          className="group flex items-center justify-between border-t border-white/10 py-10"
        >
          <span className="font-display text-[13vw] leading-[0.85] tracking-[-0.05em] text-bone/10 transition-colors duration-700 group-hover:text-bone/20">
            {t("wordmark")}
          </span>
          <ArrowUpRight className="hidden h-10 w-10 shrink-0 text-bone/25 transition-all duration-500 group-hover:rotate-45 group-hover:text-bone/60 sm:block rtl:-scale-x-100" />
        </Link>
      </div>

      <div className="relative border-t border-white/10">
        <div className="container-x flex flex-col gap-3 py-6 text-[12.5px] text-bone/40 sm:flex-row sm:items-center sm:justify-between">
          <p>{t("rights", { year })}</p>
          <p className="flex gap-6">
            <a href="#" className="hover:text-aqua">
              {t("privacy")}
            </a>
            <a href="#" className="hover:text-aqua">
              {t("terms")}
            </a>
            <a href="#" className="hover:text-aqua">
              {t("shipping")}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
