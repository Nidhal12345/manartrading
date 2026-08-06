"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { Menu, Phone, X } from "lucide-react";
import Logo from "./Logo";
import LangSwitch from "./LangSwitch";
import { PHONE, PHONE_HREF } from "@/lib/contact";

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

  // every page except a product detail opens on a dark photographic hero
  const overHero = !pathname.startsWith("/shop/");
  const light = overHero && !scrolled;

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-ink/10 bg-white/85 backdrop-blur-xl"
            : "border-b border-transparent"
        }`}
      >
        <nav className="container-x flex h-[78px] items-center justify-between">
          <Logo variant={light ? "light" : "dark"} />

          <div className="hidden items-center gap-8 lg:flex">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`group relative text-[14.5px] font-medium transition-colors ${
                  light
                    ? "text-bone/75 hover:text-white"
                    : "text-ink/65 hover:text-ink"
                }`}
              >
                {l.label}
                <span
                  className={`absolute -bottom-1.5 start-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-500 group-hover:scale-x-100 rtl:origin-right ${
                    isActive(l.href) ? "scale-x-100" : ""
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
              className={`hidden items-center gap-2 text-[14px] font-medium transition-colors sm:flex ${
                light
                  ? "text-bone/75 hover:text-white"
                  : "text-ink/65 hover:text-ink"
              }`}
            >
              <Phone className="h-3.5 w-3.5" />
              <span dir="ltr">{PHONE}</span>
            </a>

            <Link
              href="/shop"
              className={`hidden rounded-full px-5 py-2.5 text-[14px] font-semibold transition-all lg:inline-flex ${
                light
                  ? "bg-bone text-abyss hover:bg-white"
                  : "bg-ink text-bone hover:bg-ocean"
              }`}
            >
              {t("orderNow")}
            </Link>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? t("closeMenu") : t("openMenu")}
              aria-expanded={open}
              className={`grid h-11 w-11 place-items-center rounded-full border transition-colors lg:hidden ${
                light ? "border-white/25 text-bone" : "border-ink/15 text-ink"
              }`}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        <motion.div
          style={{ scaleX: progress }}
          className="h-px origin-left bg-ocean rtl:origin-right"
        />
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[55] bg-abyss lg:hidden"
          >
            <div className="noise" />
            <div className="container-x flex h-[78px] items-center justify-between">
              <Logo variant="light" />
              <div className="flex items-center gap-3">
                <LangSwitch light />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label={t("closeMenu")}
                  className="grid h-11 w-11 place-items-center rounded-full border border-white/25 text-bone"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="container-x mt-10">
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
                    className="flex items-baseline justify-between border-b border-white/12 py-6"
                  >
                    <span
                      className={`display-md ${
                        isActive(l.href) ? "text-aqua" : "text-bone"
                      }`}
                    >
                      {l.label}
                    </span>
                    <span className="numeral text-[12px] text-bone/35" dir="ltr">
                      0{i + 1}
                    </span>
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45 }}
                className="mt-12 space-y-2 text-[14px] text-bone/55"
              >
                <p>{t("addressLine1")}</p>
                <p>{t("addressLine2")}</p>
                <a
                  href={PHONE_HREF}
                  className="mt-4 inline-block text-bone underline underline-offset-4"
                >
                  <span dir="ltr">{PHONE}</span>
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
