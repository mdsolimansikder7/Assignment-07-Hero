import ProductCard from "./ProductCard";
import { type Product } from "@/lib/utils";

export default function PriceFallers({ products }: { products: Product[] }) {
  const fallers = products
    .filter((p) => p.change.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);

  if (fallers.length === 0) return null;

  return (
    <section className="container mx-auto px-4 py-6 sm:py-8">
      <h2 className="mb-3 flex items-center gap-2 text-xl font-bold text-gray-900 sm:mb-4 sm:text-2xl">
        <span className="text-base text-red-600 sm:text-lg">▼</span>আজ দাম
        কমেছে
      </h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
        {fallers.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
