import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

import { Link } from "@/i18n/navigation";
import ProductDetail from "@/components/ProductDetail";
import ProductCard from "@/components/ProductCard";
import { SectionIntro } from "@/components/Decor";
import { getProduct, products, relatedProducts } from "@/data/products";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Product not found" };

  return {
    title: `${product.name} (${product.arabic})`,
    description: `${product.tagline} ${product.name} from the ${product.waters}. Cut to order and delivered same day by Manar Trading.`,
    openGraph: {
      title: `${product.name} · Manar Trading`,
      description: product.tagline,
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = relatedProducts(slug);
  const t = await getTranslations("Product");
  const nav = await getTranslations("Nav");
  const shop = await getTranslations("Shop");

  return (
    <>
      {/* The breadcrumb rail clears the 112px fixed header and sits on the
          site's 2px rule rather than a hairline, so it reads as the top edge of
          a painted plate. */}
      <div className="border-b-2 border-tar/15 pt-[112px]">
        <nav
          aria-label="Breadcrumb"
          className="container-x label flex flex-wrap items-center gap-2.5 py-4 text-rope"
        >
          <Link href="/" className="transition-colors hover:text-oxide">
            {nav("home")}
          </Link>
          <span aria-hidden="true" className="text-tar/25">
            /
          </span>
          <Link href="/shop" className="transition-colors hover:text-oxide">
            {shop("crumb")}
          </Link>
          <span aria-hidden="true" className="text-tar/25">
            /
          </span>
          <span className="text-tar">{product.name}</span>
        </nav>
      </div>

      <ProductDetail product={product} />

      <section className="border-t-2 border-tar bg-chalk py-20 lg:py-28">
        <div className="container-x">
          <SectionIntro
            eyebrow={t("related.eyebrow")}
            title={t("related.title")}
          />
          <div className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p, i) => (
              <ProductCard key={p.slug} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
