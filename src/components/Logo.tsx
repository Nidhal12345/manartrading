import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

/** Brand mark (public/logo.png) followed by the name in serif. */
export default function Logo({
  variant = "dark",
  compact = false,
}: {
  variant?: "dark" | "light";
  compact?: boolean;
}) {
  const main = variant === "light" ? "text-bone" : "text-ink";
  const sub = variant === "light" ? "text-bone/50" : "text-ink/45";
  const t = useTranslations("Logo");

  return (
    <Link
      href="/"
      aria-label={t("ariaLabel")}
      className={`group flex items-center gap-3 ${main}`}
    >
      {/* the artwork is on an opaque white field, so it rides in its own white
          disc — that reads deliberately on the dark hero and on the white
          scrolled header alike */}
      <span className="grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-full bg-white ring-1 ring-black/5 transition-transform duration-500 group-hover:scale-105">
        <Image
          src="/logo.png"
          alt=""
          width={40}
          height={40}
          priority
          className="h-[34px] w-[34px] object-contain"
        />
      </span>

      {!compact && (
        <span className="leading-none">
          <span className="block font-display text-[19px] tracking-[-0.02em]">
            Manar
          </span>
          <span className={`label mt-1 block text-[9px] ${sub}`}>Trading</span>
        </span>
      )}
    </Link>
  );
}
