import Link from "next/link";
import { notFound } from "next/navigation";
import { formatPrice, toBengaliNumber, type Product } from "@/lib/utils";

const API = "https://openapi.programming-hero.com/api/bazardor";

async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${API}/products`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch products: ${res.status}`);
  }
  return res.json();
}

const unitWords: Record<string, string> = {
  kg: "কেজি",
  litre: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
};

// Shows whole numbers as-is and decimals with 2 digits (e.g. ৬৩.৫০)
function formatAvg(n: number): string {
  return toBengaliNumber(Number.isInteger(n) ? String(n) : n.toFixed(2));
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const products = await getProducts();
  const product = products.find((p) => String(p.id) === id);

  if (!product) {
    notFound();
  }

  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";
  const unit = unitWords[product.unit] || product.unit;
  const pctText = toBengaliNumber(Math.abs(product.change.pct).toFixed(1));

  // Up = green, down = red, flat = gray
  const badgeClass = isUp
    ? "bg-green-50 text-green-700"
    : isDown
    ? "bg-red-50 text-red-700"
    : "bg-gray-100 text-gray-600";
  const textClass = isUp
    ? "text-green-600"
    : isDown
    ? "text-red-600"
    : "text-gray-500";
  const arrow = isUp ? "▲" : isDown ? "▼" : "—";
  const changeWord = isUp ? "বেড়েছে" : isDown ? "কমেছে" : "অপরিবর্তিত";

  // Summary calculations from market data
  const markets = product.markets;
  const minMarket = markets.reduce((a, b) => (b.min < a.min ? b : a));
  const maxMarket = markets.reduce((a, b) => (b.max > a.max ? b : a));
  const avgPrice =
    markets.reduce((sum, m) => sum + (m.min + m.max) / 2, 0) / markets.length;

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      {/* Breadcrumb */}
      <nav className="mb-4 flex items-center gap-1.5 text-sm text-gray-500">
        <Link href="/" className="transition hover:text-green-700">
          হোম
        </Link>
        <span>/</span>
        <Link
          href={`/category/${product.category}`}
          className="transition hover:text-green-700"
        >
          {product.categoryNameBn}
        </Link>
        <span>/</span>
        <span className="text-gray-800">{product.nameBn}</span>
      </nav>

      {/* Header */}
      <section className="rounded-2xl border border-gray-200 bg-[#FAFCFA] p-4 sm:p-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-4">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gray-100 text-4xl sm:h-24 sm:w-24 sm:text-5xl">
              {product.image}
            </div>
            <div className="min-w-0">
              <h1 className="text-2xl font-bold leading-tight text-gray-900 sm:text-3xl">
                {product.nameBn}
              </h1>
              <p className="mt-0.5 text-sm text-gray-600 sm:text-base">
                প্রতি {unit}
              </p>
              <span className="mt-2 inline-flex items-center rounded-full bg-gray-100 px-2.5 py-1 text-sm font-medium text-gray-700">
                {product.categoryNameBn}
              </span>
              <p className="mt-2 text-sm text-gray-600 sm:text-base">
                গতকালের তুলনায় আজ দাম{" "}
                <span className={`font-bold ${textClass}`}>{changeWord}</span>{" "}
                {pctText}%
              </p>
            </div>
          </div>

          {/* Today's price box */}
          <div className="shrink-0 rounded-2xl bg-gray-100 px-5 py-4 text-center sm:px-8">
            <p className="text-sm text-gray-600">আজকের দাম</p>
            <p className="text-3xl font-bold text-gray-900 sm:text-4xl">
              {formatPrice(product.today)}
            </p>
            <p className="text-sm text-gray-600">টাকা / {unit}</p>
            <span
              className={`mt-2 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-sm font-semibold ${badgeClass}`}
            >
              {arrow} {pctText}%
            </span>
          </div>
        </div>
      </section>

      {/* Price summary */}
      <section className="mt-6 rounded-2xl border border-gray-200 bg-[#FAFCFA] p-4 sm:p-6">
        <h2 className="mb-4 text-xl font-bold text-gray-900 sm:text-2xl">
          দামের সারসংক্ষেপ
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
          <div className="rounded-2xl border border-gray-200 bg-white p-4">
            <p className="text-sm text-gray-500">সর্বনিম্ন দাম</p>
            <p className="mt-1 text-xl font-bold text-green-600">
              {formatPrice(minMarket.min)}{" "}
              <span className="text-sm font-normal">টাকা</span>
            </p>
            <p className="mt-1 text-xs text-gray-500">
              {minMarket.market} — সবচেয়ে কম দামের বাজার
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-4">
            <p className="text-sm text-gray-500">সর্বাধিক দাম</p>
            <p className="mt-1 text-xl font-bold text-red-600">
              {formatPrice(maxMarket.max)}{" "}
              <span className="text-sm font-normal">টাকা</span>
            </p>
            <p className="mt-1 text-xs text-gray-500">
              {maxMarket.market} — সবচেয়ে বেশি দামের বাজার
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-4">
            <p className="text-sm text-gray-500">গড় দাম</p>
            <p className="mt-1 text-xl font-bold text-gray-900">
              {formatAvg(avgPrice)}{" "}
              <span className="text-sm font-normal">টাকা</span>
            </p>
            <p className="mt-1 text-xs text-gray-500">
              প্রতি {unit}-এর হিসাবে
            </p>
          </div>
        </div>
      </section>

      {/* Markets table */}
      <section className="mt-8">
        <h2 className="mb-3 text-xl font-bold text-gray-900 sm:text-2xl">
          বাজারভিত্তিক আজকের দাম
        </h2>
        <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-[#FAFCFA]">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-left text-gray-500">
                <th className="px-4 py-3 font-normal">বাজার</th>
                <th className="px-4 py-3 font-normal">বিভাগ</th>
                <th className="px-4 py-3 text-right font-normal">সর্বনিম্ন</th>
                <th className="px-4 py-3 text-right font-normal">সর্বাধিক</th>
                <th className="px-4 py-3 text-right font-normal">গড়</th>
              </tr>
            </thead>
            <tbody>
              {markets.map((m, i) => (
                <tr
                  key={m.market}
                  className={`${
                    i > 0 ? "border-t border-gray-200" : ""
                  } ${i % 2 === 1 ? "bg-gray-50/60" : ""}`}
                >
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {m.market}
                  </td>
                  <td className="px-4 py-3 text-gray-600">{m.division}</td>
                  <td className="px-4 py-3 text-right text-gray-700">
                    {formatPrice(m.min)} টাকা
                  </td>
                  <td className="px-4 py-3 text-right text-gray-700">
                    {formatPrice(m.max)} টাকা
                  </td>
                  <td className="px-4 py-3 text-right font-bold text-gray-900">
                    {formatAvg((m.min + m.max) / 2)} টাকা
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}