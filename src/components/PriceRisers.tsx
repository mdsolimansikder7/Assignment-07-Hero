import ProductCard from "./ProductCard";
import { type Product } from "@/lib/utils";

export default function PriceRisers({ products }: { products: Product[] }) {
  const risers = products
    .filter((p) => p.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  if (risers.length === 0) return null;

  return (
    <section className="container mx-auto px-4 py-6 sm:py-8">
      <h2 className="mb-3 flex items-center gap-2 text-xl font-bold text-gray-900 sm:mb-4 sm:text-2xl">
        <span className="text-base text-green-600 sm:text-lg">▲</span>আজ দাম
        বেড়েছে
      </h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
        {risers.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
