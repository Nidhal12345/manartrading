import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

/**
 * Brand mark (public/logo.png) on a painted plate, with the name set in Latin.
 *
 * Two deliberate choices:
 *
 * The plate is square, not a disc. The artwork sits on an opaque white field, so
 * it needs its own ground either way — and a hard-edged plate reads as a painted
 * transom name board, where a circle read as a generic app icon.
 *
 * Latin only. The Arabic wordmark lives on the footer and the 404, where the
 * name has room to be lettered in full.
 */
export default function Logo({
  variant = "dark",
  compact = false,
}: {
  variant?: "dark" | "light";
  compact?: boolean;
}) {
  const light = variant === "light";
  const t = useTranslations("Logo");

  return (
    <Link
      href="/"
      aria-label={t("ariaLabel")}
      className={`group flex items-center gap-3 ${
        light ? "text-limewash" : "text-tar"
      }`}
    >
      <span
        className={`grid h-10 w-10 shrink-0 place-items-center overflow-hidden bg-chalk transition-colors duration-500 ${
          light
            ? "ring-1 ring-limewash/25 group-hover:ring-limewash/60"
            : "ring-1 ring-tar/15 group-hover:ring-tar/45"
        }`}
      >
        <Image
          src="/logo.png"
          alt=""
          width={40}
          height={40}
          priority
          className="h-[32px] w-[32px] object-contain"
        />
      </span>

      {!compact && (
        <span className="leading-none">
          <span className="font-display block text-[21px] uppercase leading-none tracking-[0.01em]">
            Manar
          </span>
          <span
            className={`label mt-1.5 block text-[9px] ${
              light ? "text-limewash/55" : "text-rope"
            }`}
          >
            Trading
          </span>
        </span>
      )}
    </Link>
  );
}
