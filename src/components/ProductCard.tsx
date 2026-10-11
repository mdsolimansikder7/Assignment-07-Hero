import Link from "next/link";
import { formatPrice, toBengaliNumber, type Product } from "@/lib/utils";

const unitWords: Record<string, string> = {
  kg: "কেজি",
  litre: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
};

export default function ProductCard({ product }: { product: Product }) {
  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";

  return (
    <Link
      href={`/product-details/${product.id}`}
      className="block rounded-2xl border border-gray-200 bg-[#FAFCFA] p-3.5 transition hover:border-green-600 hover:shadow-md sm:p-4"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-xl sm:h-12 sm:w-12 sm:text-2xl">
          {product.image}
        </div>
        <div className="min-w-0">
          <h3 className="truncate text-base font-bold leading-tight text-gray-900 sm:text-lg">
            {product.nameBn}
          </h3>
          <p className="text-xs text-gray-500">
            প্রতি {unitWords[product.unit] || product.unit}
          </p>
        </div>
      </div>
      <p className="mt-3 text-xs text-gray-500">আজকের দাম</p>
      <div className="flex items-center justify-between gap-2">
        <p className="text-gray-900">
          <span className="text-lg font-bold sm:text-xl">
            {formatPrice(product.today)}
          </span>{" "}
          টাকা
        </p>
        <span
          className={`inline-flex shrink-0 items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-1 text-sm font-medium sm:px-3 sm:text-[15px] ${
            isUp
              ? "bg-green-50 text-green-700"
              : isDown
              ? "bg-red-50 text-red-700"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          <span className="text-[10px]">
            {isUp ? "▲" : isDown ? "▼" : "—"}
          </span>
          {toBengaliNumber(Math.abs(product.change.pct).toFixed(1))}%
        </span>
      </div>
    </Link>
  );
}
