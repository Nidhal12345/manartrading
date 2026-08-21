import type { Metadata, Viewport } from "next";
import { fontVariables } from "../fonts";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Analytics } from "@vercel/analytics/next"
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MotionProvider from "@/components/MotionProvider";
import SmoothScroll from "@/components/providers/SmoothScroll";
import Preloader from "@/components/Preloader";
import "../globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    metadataBase: new URL("https://manartrading.sa"),
    title: {
      default: t("title"),
      template: t("titleTemplate"),
    },
    description: t("description"),
    keywords: [
      "fresh fish Saudi Arabia",
      "Manar Trading",
      "Hamour",
      "Kanad",
      "seafood supplier Jeddah",
      "Red Sea fish",
    ],
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      type: "website",
      locale: locale === "ar" ? "ar_SA" : "en_SA",
      siteName: t("siteName"),
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#1a1410",
  width: "device-width",
  initialScale: 1,
};

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const isRtl = locale === "ar";
  const t = await getTranslations({ locale, namespace: "SkipLink" });

  return (
    <html
      lang={locale}
      dir={isRtl ? "rtl" : "ltr"}
      className={`${fontVariables} ${isRtl ? "font-arabic" : ""
        } h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-limewash">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[100] focus:bg-oxide focus:px-5 focus:py-3 focus:text-sm focus:font-bold focus:text-limewash"
        >
          {t("skipToContent")}
        </a>


        <NextIntlClientProvider>
          <MotionProvider>
            <SmoothScroll />
            <Preloader />
            <Navbar />
            <main id="main" className="flex-1">
              {children}
            </main>
            <Footer />
          </MotionProvider>
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
