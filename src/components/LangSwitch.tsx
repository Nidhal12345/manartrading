"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Check, ChevronDown, Globe } from "lucide-react";
import { useEffect, useRef, useState } from "react";

/** Dropdown to switch between the site's two languages (Arabic / English). */
export default function LangSwitch({ light = false }: { light?: boolean }) {
  const locale = useLocale();
  const t = useTranslations("Nav");
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // close on outside click and on Escape
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("touchstart", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("touchstart", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const options = [
    { code: "ar", label: "العربية" },
    { code: "en", label: "English" },
  ] as const;

  const current = options.find((o) => o.code === locale)!;
  const select = (code: (typeof options)[number]["code"]) => {
    setOpen(false);
    if (code !== locale) router.replace(pathname, { locale: code });
  };

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t("switchLanguage")}
        className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-[13px] font-semibold transition-colors ${
          light
            ? "border-white/25 text-bone hover:border-white/60"
            : "border-ink/15 text-ink hover:border-ink"
        }`}
      >
        <Globe className="h-3.5 w-3.5" />
        <span className="leading-none">
          {current.code === "ar" ? "ع" : "EN"}
        </span>
        <ChevronDown
          className={`h-3 w-3 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            aria-label={t("switchLanguage")}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className={`absolute end-0 top-full z-50 mt-2 min-w-[148px] overflow-hidden rounded-2xl border py-1.5 shadow-xl backdrop-blur-xl ${
              light
                ? "border-white/15 bg-[#06202f]/90 text-bone"
                : "border-ink/10 bg-white/95 text-ink"
            }`}
          >
            {options.map((o) => (
              <li key={o.code} role="option" aria-selected={o.code === locale}>
                <button
                  type="button"
                  onClick={() => select(o.code)}
                  className={`flex w-full items-center justify-between gap-4 px-4 py-2 text-left text-[13.5px] transition-colors rtl:text-right ${
                    o.code === locale
                      ? light
                        ? "text-aqua"
                        : "text-ocean"
                      : light
                        ? "text-bone/80 hover:bg-white/10 hover:text-white"
                        : "text-ink/75 hover:bg-ink/5 hover:text-ink"
                  }`}
                >
                  <span className="leading-none">{o.label}</span>
                  {o.code === locale && <Check className="h-3.5 w-3.5" />}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
