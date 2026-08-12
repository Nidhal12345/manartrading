"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { Menu, Phone, X } from "lucide-react";
import Logo from "./Logo";
import LangSwitch from "./LangSwitch";
import { PHONE, PHONE_HREF, whatsappHref } from "@/lib/contact";

export default function Navbar() {
  const t = useTranslations("Nav");
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/", label: t("home") },
    { href: "/shop", label: t("shop") },
    { href: "/about", label: t("about") },
    { href: "/contact", label: t("contact") },
  ] as const;

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });

  // close the drawer on navigation without an extra render pass
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  /* Which heroes are dark paint, and therefore want light nav ink before the
     first scroll. Home, about and contact open on a painted field; the counter
     opens on the tide field and a product detail opens on a breadcrumb strip,
     so everything under /shop needs tar ink from the first pixel. */
  const overDarkHero = !pathname.startsWith("/shop");
  const light = overDarkHero && !scrolled;

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <div
          className={`transition-colors duration-500 ${
            scrolled
              ? "border-b border-tar/12 bg-limewash/95 backdrop-blur-md"
              : "border-b border-transparent"
          }`}
        >
          <nav className="container-x flex h-[74px] items-center justify-between">
            <Logo variant={light ? "light" : "dark"} />

            <div className="hidden items-center gap-8 lg:flex">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`group label relative py-1 transition-colors ${
                    light
                      ? "text-limewash/75 hover:text-limewash"
                      : "text-tar/70 hover:text-tar"
                  }`}
                >
                  {l.label}
                  {/* The active mark is a painted rule, 2px and hard-edged, so
                      it belongs to the waterline family rather than being a
                      generic underline. */}
                  <span
                    className={`absolute -bottom-1 start-0 h-[2px] w-full origin-left bg-oxide transition-transform duration-500 rtl:origin-right ${
                      isActive(l.href)
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden sm:block">
                <LangSwitch light={light} />
              </div>

              <a
                href={PHONE_HREF}
                className={`hidden items-center gap-2 text-[13.5px] font-medium transition-colors sm:flex ${
                  light
                    ? "text-limewash/75 hover:text-limewash"
                    : "text-tar/70 hover:text-tar"
                }`}
              >
                <Phone className="h-3.5 w-3.5" />
                <span dir="ltr">{PHONE}</span>
              </a>

              <Link
                href="/shop"
                className="label hidden bg-oxide px-5 py-3 text-limewash transition-colors hover:bg-oxide-lit lg:inline-flex"
              >
                {t("orderNow")}
              </Link>

              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-label={open ? t("closeMenu") : t("openMenu")}
                aria-expanded={open}
                className={`grid h-11 w-11 place-items-center border transition-colors lg:hidden ${
                  light
                    ? "border-limewash/25 text-limewash"
                    : "border-tar/20 text-tar"
                }`}
              >
                {open ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </nav>

          <motion.div
            style={{ scaleX: progress }}
            className="h-[2px] origin-left bg-oxide rtl:origin-right"
          />
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[55] overflow-y-auto bg-tar lg:hidden"
          >
            <div className="container-x flex h-[74px] items-center justify-between">
              <Logo variant="light" />
              <div className="flex items-center gap-3">
                <LangSwitch light />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label={t("closeMenu")}
                  className="grid h-11 w-11 place-items-center border border-limewash/25 text-limewash"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="container-x mt-8 pb-16">
              {links.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.08 + i * 0.07,
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <Link
                    href={l.href}
                    className="flex items-baseline justify-between border-b border-limewash/12 py-6"
                  >
                    <span
                      className={`display-md ${
                        isActive(l.href) ? "text-ochre" : "text-limewash"
                      }`}
                    >
                      {l.label}
                    </span>
                    <span className="draft-mark text-[12px]" dir="ltr">
                      0{i + 1}
                    </span>
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45 }}
                className="mt-10"
              >
                <a
                  href={whatsappHref()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label flex w-full items-center justify-center bg-oxide px-6 py-4 text-limewash transition-colors hover:bg-oxide-lit"
                >
                  {t("whatsapp")}
                </a>

                <div className="mt-8 space-y-2 text-[14px] text-limewash/60">
                  <p>{t("addressLine1")}</p>
                  <p>{t("addressLine2")}</p>
                  <a
                    href={PHONE_HREF}
                    className="mt-4 inline-block text-limewash underline underline-offset-4"
                  >
                    <span dir="ltr">{PHONE}</span>
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
