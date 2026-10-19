import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import ProductDetails from "@/components/ProductDetails";
import { categoryLabel, getProduct, products, relatedProducts } from "@/data/products";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return { title: "Product not found" };
  return {
    title: p.name,
    description: p.short,
    openGraph: { title: p.name, description: p.short, images: [{ url: p.images[0] }] },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  const related = relatedProducts(product);

  return (
    <div className="container-x pb-24 pt-28">
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-[#2a2623]/60">
        <Link href="/" className="hover:underline">
          Home
        </Link>
        {" / "}
        <Link href={`/collections?category=${product.category}`} className="hover:underline">
          {categoryLabel(product.category)}
        </Link>
        {" / "}
        <span className="text-[#2a2623]">{product.name}</span>
      </nav>

      <ProductDetails key={product.slug} product={product} />

      {related.length > 0 && (
        <section className="mt-24" aria-labelledby="related-title">
          <h2 id="related-title" className="font-display text-4xl">
            You may also like
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {related.map((p, i) => (
              <ProductCard key={p.slug} product={p} index={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}