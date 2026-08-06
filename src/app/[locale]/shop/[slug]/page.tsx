import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { notFound } from "next/navigation";

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
    description: `${product.tagline} ${product.name} from the ${product.waters}, ${product.price} SAR per kg. Cut to order and delivered same day by Manar Trading.`,
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

  return (
    <>
      <div className="border-b border-ink/10 pt-[78px]">
        <nav
          aria-label="Breadcrumb"
          className="container-x label flex items-center gap-2.5 py-4 text-ink/40"
        >
          <Link href="/" className="transition-colors hover:text-ocean">
            Home
          </Link>
          <span className="text-ink/20">/</span>
          <Link href="/shop" className="transition-colors hover:text-ocean">
            Shop
          </Link>
          <span className="text-ink/20">/</span>
          <span className="text-ink/80">{product.name}</span>
        </nav>
      </div>

      <ProductDetail product={product} />

      <section className="border-t border-ink/10 bg-bone py-20 lg:py-28">
        <div className="container-x">
          <SectionIntro
            eyebrow="You might also like"
            title="Landed the same morning"
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p, i) => (
              <ProductCard key={p.slug} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
