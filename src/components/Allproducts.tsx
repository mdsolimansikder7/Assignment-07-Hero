"use client";

import { useState } from "react";
import ProductCard from "./ProductCard";
import SortDropdown from "./SortDropdown";
import { toBengaliNumber, type Product } from "@/lib/utils";

export default function AllProducts({ products }: { products: Product[] }) {
  const [sortBy, setSortBy] = useState("default");

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === "price-asc") return a.today - b.today;
    if (sortBy === "price-desc") return b.today - a.today;
    if (sortBy === "rise") return b.change.pct - a.change.pct;
    if (sortBy === "fall") return a.change.pct - b.change.pct;
    return 0;
  });

  return (
    <section
      id="সব-পণ্য"
      className="container mx-auto scroll-mt-40 px-4 py-6 sm:py-8"
    >
      <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">সব পণ্য</h2>
      <p className="mt-1 text-sm text-gray-600 sm:text-base">
        সব নিত্যপ্রয়োজনীয় পণ্যের আজকের দাম ও দামের পরিবর্তন এক জায়গায়।
      </p>
      <div className="mb-3 mt-4 flex flex-col gap-3 sm:mb-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-gray-600 sm:text-base">
          মোট {toBengaliNumber(products.length)}টি পণ্য দেখানো চলছে
        </p>
        <SortDropdown value={sortBy} onChange={setSortBy} />
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}