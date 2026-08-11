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

/**
 * The footer is the deepest tar field on the site — below the waterline, where
 * the hull is tarred rather than painted. It carries no photograph: the dark
 * water shot that used to sit here at 20% opacity was doing nothing except
 * making the type harder to read.
 */
export default async function Footer() {
  const t = await getTranslations("Footer");

  return (
    <footer className="relative bg-tar text-limewash">
      {/* newsletter */}
      <div className="border-b border-limewash/12">
        <div className="container-x grid gap-10 py-16 md:grid-cols-2 md:items-end">
          <div>
            <span className="label text-ochre">{t("newsletterLabel")}</span>
            <h3 className="display-md mt-5 max-w-[18ch] text-limewash">
              {t("newsletterTitle")}
            </h3>
          </div>
          <form className="flex w-full gap-3 md:justify-end">
            <div className="relative flex-1 md:max-w-sm">
              <Mail className="pointer-events-none absolute start-0 top-1/2 h-4 w-4 -translate-y-1/2 text-limewash/40" />
              <input
                type="email"
                required
                placeholder={t("emailPlaceholder")}
                aria-label={t("emailAria")}
                className="w-full border-b border-limewash/25 bg-transparent py-4 pe-4 ps-7 text-[15px] text-limewash outline-none transition placeholder:text-limewash/35 focus:border-ochre"
              />
            </div>
            <button
              type="submit"
              className="group grid h-[52px] w-[52px] shrink-0 place-items-center bg-oxide text-limewash transition-colors hover:bg-oxide-lit"
              aria-label={t("subscribeAria")}
            >
              <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5" />
            </button>
          </form>
        </div>
      </div>

      {/* columns */}
      <div className="container-x grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.3fr]">
        <div>
          <Logo variant="light" />
          <p className="mt-6 max-w-xs text-[14.5px] leading-relaxed text-limewash/60">
            {t("companyTagline")}
          </p>
          <div className="mt-7 flex gap-2.5">
            {socials.map((s) => (
              <a
                key={s.label}
                href="#"
                aria-label={t("socialAria", { network: s.label })}
                className="grid h-10 w-10 place-items-center border border-limewash/20 text-limewash/70 transition-colors hover:border-limewash/60 hover:text-limewash"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                  <path d={s.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="label text-limewash/45">{t("companyColumn")}</h4>
          <ul className="mt-6 space-y-3.5 text-[14.5px] text-limewash/75">
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
                  className="transition-colors hover:text-ochre"
                >
                  {t(`links.${l.key}`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="label text-limewash/45">{t("popularColumn")}</h4>
          <ul className="mt-6 space-y-3.5 text-[14.5px] text-limewash/75">
            {products.slice(0, 5).map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/shop/${p.slug}`}
                  className="transition-colors hover:text-ochre"
                >
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="label text-limewash/45">{t("visitColumn")}</h4>
          <ul className="mt-6 space-y-4 text-[14.5px] text-limewash/75">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-ochre" />
              <span>
                {t("addressLine1")}
                <br />
                {t("addressLine2")}
              </span>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-ochre" />
              <a href={PHONE_HREF} className="hover:text-ochre">
                <span dir="ltr">{PHONE}</span>
              </a>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-ochre" />
              <a href="mailto:hello@manartrading.sa" className="hover:text-ochre">
                hello@manartrading.sa
              </a>
            </li>
            <li className="flex gap-3">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-ochre" />
              <span>{t("hours")}</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Oversized wordmark, set as hull lettering: the name painted across the
          transom at the size it would actually be painted. */}
      <div className="container-x">
        <Link
          href="/contact"
          className="group flex items-center justify-between border-t border-limewash/12 py-10"
        >
          <span className="font-display text-[13vw] uppercase leading-[0.82] tracking-[0.01em] text-limewash/12 transition-colors duration-700 group-hover:text-limewash/25">
            {t("wordmark")}
          </span>
          <ArrowUpRight className="hidden h-10 w-10 shrink-0 text-limewash/25 transition-all duration-500 group-hover:rotate-45 group-hover:text-limewash/70 sm:block rtl:-scale-x-100" />
        </Link>
      </div>

      <div className="border-t border-limewash/12">
        <div className="container-x flex flex-col gap-3 py-6 text-[12.5px] text-limewash/45 sm:flex-row sm:items-center sm:justify-between">
          <p>{t("rights", { year })}</p>
          <p className="flex gap-6">
            <a href="#" className="hover:text-ochre">
              {t("privacy")}
            </a>
            <a href="#" className="hover:text-ochre">
              {t("terms")}
            </a>
            <a href="#" className="hover:text-ochre">
              {t("shipping")}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
