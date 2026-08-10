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

  // every page except a product detail opens on a dark painted hero
  const overHero = !pathname.startsWith("/shop/");
  const light = overHero && !scrolled;

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        {/* ---------- cutoff strip ----------
            Section 0. The single most useful thing a fish counter can say above
            the fold, and the thing every competitor buries: when to order by to
            eat it tonight.

            Deliberately static. The rotating trust bars on the competitor sites
            cycle the same claim three or four ways, which trains people to
            ignore the strip entirely. One message, always readable. */}
        <div className="bg-tar text-limewash">
          <div className="container-x flex h-9 items-center justify-between gap-4">
            <p className="flex min-w-0 items-center gap-2.5 text-[12px]">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 shrink-0 bg-oxide"
              />
              <span className="truncate">{t("cutoff")}</span>
            </p>
            <a
              href={whatsappHref()}
              target="_blank"
              rel="noopener noreferrer"
              className="label shrink-0 text-limewash/70 underline-offset-4 transition-colors hover:text-limewash hover:underline"
            >
              {t("whatsapp")}
            </a>
          </div>
        </div>

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
            <div className="container-x flex h-[74px] items-center justify-between pt-9">
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
