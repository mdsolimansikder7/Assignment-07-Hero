"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import SortDropdown from "@/components/SortDropdown";
import { toBengaliNumber, type Product, type Category } from "@/lib/utils";

const API = "https://openapi.programming-hero.com/api/bazardor";

function CategorySkeleton() {
  return (
    <>
      <section className="container mx-auto px-4 pt-5 sm:pt-6">
        <div className="skeleton h-24 w-full rounded-2xl" />
      </section>
      <section className="container mx-auto px-4 py-6 sm:py-8">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="skeleton h-5 w-48" />
          <div className="skeleton h-10 w-44" />
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="skeleton h-28 w-full rounded-2xl" />
          ))}
        </div>
      </section>
    </>
  );
}

export default function CategoryPage() {
  const params = useParams();
  const id = params?.id as string | undefined;

  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    setError(false);

    Promise.all([
      fetch(`${API}/products`).then((res) => {
        if (!res.ok) throw new Error("Products fetch failed");
        return res.json();
      }),
      fetch(`${API}/categories/${encodeURIComponent(id)}`).then((res) => {
        if (!res.ok) throw new Error("Category fetch failed");
        return res.json();
      }),
    ])
      .then(([allProducts, categoryData]) => {
        const categoryProducts: Product[] = Array.isArray(allProducts)
          ? allProducts.filter((p: Product) => p.category === id)
          : [];

        if (categoryProducts.length === 0) {
          setError(true);
        } else {
          setProducts(categoryProducts);
          setCategory(categoryData);
        }
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [id]);

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === "price-asc") return a.today - b.today;
    if (sortBy === "price-desc") return b.today - a.today;
    if (sortBy === "rise") return b.change.pct - a.change.pct;
    if (sortBy === "fall") return a.change.pct - b.change.pct;
    return 0;
  });

  if (loading) {
    return <CategorySkeleton />;
  }

  if (error || products.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-12 text-center">
        <div className="flex w-full max-w-sm flex-col items-center rounded-3xl border border-green-100 bg-white/80 p-8 text-center shadow-xl backdrop-blur sm:p-10">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-green-50 to-green-100 text-3xl shadow-inner sm:h-20 sm:w-20 sm:text-4xl">
            😢
          </span>
          <h2 className="mt-6 text-lg font-bold text-gray-900 sm:text-xl">
            কোনো পণ্য পাওয়া যায়নি
          </h2>
          <p className="mt-1.5 text-sm text-gray-500">
            এই ক্যাটাগরিতে কোনো পণ্য নেই অথবা ক্যাটাগরিটি সঠিক নয়।
          </p>
          <Link
            href="/"
            className="mt-5 rounded-lg bg-green-700 px-5 py-2.5 font-semibold text-white shadow-md transition hover:bg-green-800"
          >
            হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="container mx-auto px-4 pt-5 sm:pt-6">
        <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-[#FAFCFA] p-4 sm:gap-4 sm:p-6">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center text-4xl sm:h-auto sm:w-auto sm:text-5xl">
            {category?.icon}
          </span>
          <div className="min-w-0">
            <h1 className="text-2xl font-bold leading-tight text-gray-900 sm:text-3xl">
              {category?.nameBn}
            </h1>
            <p className="mt-0.5 text-sm text-gray-600 sm:text-base">
              {toBengaliNumber(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
            </p>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-6 sm:py-8">
        <div className="mb-3 mt-3 flex flex-col gap-3 sm:mb-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-gray-600 sm:text-base">
            মোট {toBengaliNumber(products.length)}টি পণ্য দেখানো চলছে
          </p>
          <SortDropdown value={sortBy} onChange={setSortBy} />
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
}